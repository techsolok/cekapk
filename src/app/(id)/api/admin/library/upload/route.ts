import { NextResponse } from "next/server";
import { getSessionAdmin } from "@/lib/auth";
import { getDb } from "@/db";
import { libraryFiles } from "@/db/schema";
import { runPipeline, type PermissionDecl } from "@/lib/library/pipeline";
import { saveLibraryFile } from "@/lib/library/store";

export const dynamic = "force-dynamic";
// Unggah file Library Legal: file disimpan di storage server, pipeline 14 langsung berjalan,
// hasilnya tersimpan sebagai DRAF. Terbit hanya lewat endpoint publish setelah review manual.
export async function POST(req: Request) {
  const admin = await getSessionAdmin().catch(() => null);
  if (!admin) return NextResponse.json({ ok: false, message: "Harus masuk sebagai admin/editor." }, { status: 401 });
  let form: FormData;
  try { form = await req.formData(); } catch { return NextResponse.json({ ok: false, message: "Formulir tidak valid." }, { status: 400 }); }
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ ok: false, message: "Berkas APK wajib dilampirkan." }, { status: 400 });
  if (file.size > 200 * 1024 * 1024) return NextResponse.json({ ok: false, message: "Berkas terlalu besar (maks 200 MB)." }, { status: 413 });
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const name = get("name"), packageName = get("packageName"), version = get("version");
  if (!name || !packageName || !version) return NextResponse.json({ ok: false, message: "Nama, package name, dan versi wajib diisi." }, { status: 400 });
  let permissions: PermissionDecl[] = [];
  try { permissions = JSON.parse(get("permissions") || "[]") as PermissionDecl[]; } catch { return NextResponse.json({ ok: false, message: "Format JSON izin tidak valid." }, { status: 400 }); }
  const data = Buffer.from(await file.arrayBuffer());
  const result = await runPipeline(data, {
    expectedFingerprint: get("expectedFingerprint"),
    sourceType: get("sourceType") === "developer" ? "developer" : "open_source",
    permissions, vtApiKey: process.env.VT_API_KEY,
  });
  const storagePath = await saveLibraryFile(`${packageName}-${version}.apk`, data);
  const inserted = await getDb().insert(libraryFiles).values({
    appSlug: get("appSlug") || null, name, packageName, version,
    sizeBytes: result.sizeBytes, sha256: result.sha256,
    signerFingerprint: result.signerFingerprint, expectedFingerprint: get("expectedFingerprint"),
    sourceName: get("sourceName"), sourceUrl: get("sourceUrl"),
    sourceType: get("sourceType") === "developer" ? "developer" : "open_source",
    licence: get("licence"), storagePath, permissions, pipeline: result.steps,
    safetyScore: result.safetyScore, safetyBreakdown: result.safetyBreakdown,
    scanStatus: result.scanStatus, status: "draft", uploadedBy: admin.email, lastCheckedAt: new Date(),
  }).returning({ id: libraryFiles.id });
  return NextResponse.json({ ok: true, id: inserted[0].id, status: "draft", pipeline: result.steps, safetyScore: result.safetyScore, sha256: result.sha256 });
}
