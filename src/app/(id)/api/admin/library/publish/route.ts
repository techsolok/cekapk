import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSessionAdmin } from "@/lib/auth";
import { getDb } from "@/db";
import { libraryFiles } from "@/db/schema";
import { canPublish, weeklyHashCheck, type PipelineStep } from "@/lib/library/pipeline";
import { readLibraryFile } from "@/lib/library/store";
export const dynamic = "force-dynamic";
// Terbitkan file library: gerbang canPublish + hash berkas di storage diverifikasi ulang saat itu juga.
export async function POST(req: Request) {
  const admin = await getSessionAdmin().catch(() => null);
  if (!admin) return NextResponse.json({ ok: false, message: "Harus masuk." }, { status: 401 });
  if (admin.role !== "admin") return NextResponse.json({ ok: false, message: "Hanya Admin yang boleh menerbitkan." }, { status: 403 });
  const { id } = await req.json().catch(() => ({})) as { id?: number };
  if (!id) return NextResponse.json({ ok: false, message: "ID file wajib ada." }, { status: 400 });
  const db = getDb();
  const rows = await db.select().from(libraryFiles).where(eq(libraryFiles.id, id)).limit(1);
  const rec = rows[0];
  if (!rec) return NextResponse.json({ ok: false, message: "File tidak ditemukan." }, { status: 404 });
  const gate = canPublish({ pipeline: rec.pipeline as PipelineStep[] | null, safetyScore: rec.safetyScore, reviewedBy: rec.reviewedBy });
  if (!gate.ok) return NextResponse.json({ ok: false, errors: gate.errors }, { status: 422 });
  try {
    const stored = await readLibraryFile(rec.storagePath);
    if (!weeklyHashCheck(stored, rec.sha256)) {
      await db.update(libraryFiles).set({ status: "flagged" }).where(eq(libraryFiles.id, id));
      return NextResponse.json({ ok: false, message: "Hash berkas di storage TIDAK cocok dengan hash terbit - file ditandai flagged dan tidak diterbitkan." }, { status: 409 });
    }
  } catch { return NextResponse.json({ ok: false, message: "Berkas di storage tidak bisa dibaca." }, { status: 500 }); }
  await db.update(libraryFiles).set({ status: "published", publishedAt: new Date(), lastCheckedAt: new Date() }).where(eq(libraryFiles.id, id));
  return NextResponse.json({ ok: true, status: "published", safetyScore: rec.safetyScore });
}
