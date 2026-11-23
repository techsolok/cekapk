import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { libraryFiles } from "@/db/schema";
import { readLibraryFile } from "@/lib/library/store";
import { sha256Hex } from "@/lib/library/pipeline";
export const dynamic = "force-dynamic";
// Unduhan Library Legal (FR-DL-02): hanya file published, hash diverifikasi sebelum streaming,
// Content-Disposition attachment. Wajib lewat interstitial (?ack=1 dari halaman detail).
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = new URL(req.url);
  if (url.searchParams.get("ack") !== "1")
    return new Response("Buka halaman detail file ini dulu untuk melihat hash, hasil scan, dan izinnya sebelum mengunduh.", { status: 403, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  let rec;
  try {
    const rows = await getDb().select().from(libraryFiles).where(eq(libraryFiles.id, Number(id))).limit(1);
    rec = rows[0];
  } catch { return new Response("Perpustakaan belum aktif di server ini.", { status: 503 }); }
  if (!rec || rec.status !== "published")
    return new Response("File tidak tersedia (belum terbit atau sedang ditahan).", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const data = await readLibraryFile(rec.storagePath).catch(() => null);
  if (!data) return new Response("Berkas tidak ditemukan di storage.", { status: 500 });
  if (sha256Hex(data) !== rec.sha256)
    return new Response("Hash berkas tidak cocok dengan catatan verifikasi. Unduhan diblokir demi keamanan dan file ditandai untuk diperiksa.", { status: 409, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(new Uint8Array(data), { status: 200, headers: {
    "Content-Type": "application/vnd.android.package-archive",
    "Content-Disposition": `attachment; filename="${rec.packageName}-${rec.version}.apk"`,
    "Content-Length": String(data.length), "Cache-Control": "no-store",
    "X-Sha256": rec.sha256,
  } });
}
