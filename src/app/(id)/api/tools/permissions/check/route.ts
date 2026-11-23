import { NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { analyzePermissionsText } from "@/lib/tools/permissions-dict";
import { checkRate, issueChallenge, clientIp, logEvent } from "@/lib/tools/tiktok";
export const dynamic = "force-dynamic";
// Pemeriksa Izin: gambar diterima -> OCR tesseract (ind+eng) di server -> analisis kamus izin.
// Gambar DIPROSES SEMENTARA lalu dihapus; tidak disimpan dan tidak dipakai untuk hal lain.
export async function POST(req: Request) {
  const ip = clientIp(req);
  const rate = await checkRate(ip, 6, 60_000);
  if (rate.needChallenge) {
    const chal = issueChallenge(ip);
    return NextResponse.json({ ok: false, kind: "tantangan", message: "Terlalu sering. Jawab tantangan ini lewat tool unduhan kami untuk melanjutkan, atau tunggu beberapa menit.", challenge: { a: chal.a, b: chal.b, token: chal.token, question: `${chal.a} + ${chal.b} = ?` } }, { status: 429 });
  }
  if (!rate.allowed) return NextResponse.json({ ok: false, message: "Terlalu banyak pemeriksaan dalam waktu singkat. Tunggu sebentar." }, { status: 429 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("image");
  if (!(file instanceof File)) return NextResponse.json({ ok: false, message: "Lampirkan tangkapan layar dulu (PNG/JPG/WebP)." }, { status: 400 });
  if (!/^image\/(png|jpeg|webp)$/.test(file.type)) return NextResponse.json({ ok: false, message: "Format harus PNG, JPG, atau WebP." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ ok: false, message: "Gambar terlalu besar (maks 8 MB)." }, { status: 413 });
  // SEO-03: jangan percaya MIME dari client saja — periksa magic bytes.
  const bytes = Buffer.from(await file.arrayBuffer());
  const isPng = bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const isJpeg = bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isWebp = bytes.length > 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  if (!isPng && !isJpeg && !isWebp) return NextResponse.json({ ok: false, message: "File bukan gambar PNG/JPG/WebP yang valid." }, { status: 400 });
  const tmp = path.join(os.tmpdir(), `izin-${Date.now()}-${Math.random().toString(36).slice(2)}.img`);
  await fs.writeFile(tmp, bytes);
  const bin = process.env.TESSERACT_BIN || "tesseract";
  const ocr = await new Promise<{ code: number; text: string; err: string }>((resolve) => {
    const child = spawn(bin, [tmp, "stdout", "-l", "ind+eng", "--psm", "6"], { timeout: 60000 });
    let out = ""; let err = "";
    child.stdout.on("data", (d) => { out += d.toString(); if (out.length > 500_000) child.kill(); });
    child.stderr.on("data", (d) => { err += d.toString(); });
    child.on("error", () => resolve({ code: -1, text: "", err: "spawn" }));
    child.on("close", (c) => resolve({ code: c ?? -1, text: out, err }));
  });
  await fs.unlink(tmp).catch(() => {});
  if (ocr.code === -1) return NextResponse.json({ ok: false, message: "Mesin OCR belum tersedia di server. Administrator perlu memasang tesseract-ocr." }, { status: 503 });
  // English edition (Nov 2026): the EN client sends lang=en; anything else
  // stays Indonesian. Only the report content is localized — error messages
  // above stay Indonesian and the EN client maps them by HTTP status.
  const lang = form?.get("lang") === "en" ? "en" : "id";
  const report = analyzePermissionsText(ocr.text, lang);
  logEvent("permissions_check", { found: report.found.length, tinggi: report.counts.tinggi });
  return NextResponse.json({ ok: true, report });
}
