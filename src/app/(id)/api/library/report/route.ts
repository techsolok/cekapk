import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { reports } from "@/db/schema";
export const dynamic = "force-dynamic";
// Laporan masalah / DMCA per file (FR-DL-03). Publik, dengan rate limit sederhana per IP.
const hits = new Map<string, number[]>();
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now(); const arr = (hits.get(ip) ?? []).filter((t) => now - t < 3600000);
  if (arr.length >= 5) return NextResponse.json({ ok: false, message: "Terlalu banyak laporan dari jaringanmu. Coba lagi nanti." }, { status: 429 });
  arr.push(now); hits.set(ip, arr);
  const body = await req.json().catch(() => null) as { fileId?: number; type?: string; message?: string; contact?: string } | null;
  if (!body?.fileId || !body.message || body.message.trim().length < 10)
    return NextResponse.json({ ok: false, message: "Laporan butuh file dan penjelasan minimal 10 karakter." }, { status: 400 });
  const type = ["dmca", "safety", "broken"].includes(body.type ?? "") ? body.type! : "safety";
  try {
    await getDb().insert(reports).values({ type, targetUrl: `/perpustakaan/${body.fileId}`, payload: { message: body.message.slice(0, 2000), contact: (body.contact ?? "").slice(0, 160) }, status: "open" });
  } catch { return NextResponse.json({ ok: false, message: "Database belum aktif di server ini." }, { status: 503 }); }
  return NextResponse.json({ ok: true, message: "Laporan diterima. Target kami: ditinjau maksimal 2 hari kerja (DMCA sesuai halaman DMCA kami)." });
}
