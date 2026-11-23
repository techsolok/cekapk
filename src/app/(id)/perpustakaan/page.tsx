import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { libraryCandidates } from "@/lib/library/catalog";
import { getDb } from "@/db";
import { libraryFiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const metadata: Metadata = pageMetadata({ title: "Perpustakaan APK CekAPK: Status Verifikasi & Kandidat Open-Source", description: "Belum ada file APK yang tersedia. Pelajari standar verifikasi CekAPK dan kandidat aplikasi open-source yang hanya ditautkan ke sumber resmi.", path: "/perpustakaan" });
export const dynamic = "force-dynamic";

interface LibRow { id: number; name: string; version: string; packageName: string; safetyScore: number | null; sizeBytes: number; licence: string }
export default async function LibraryPage() {
  let published: LibRow[] = [];
  if (process.env.DATABASE_URL) {
    try {
      const rows = await getDb().select().from(libraryFiles).where(eq(libraryFiles.status, "published")).orderBy(desc(libraryFiles.publishedAt));
      published = rows.map((r) => ({ id: r.id, name: r.name, version: r.version, packageName: r.packageName, safetyScore: r.safetyScore, sizeBytes: r.sizeBytes, licence: r.licence }));
    } catch { published = []; }
  }
  return (
    <div className="space-y-8 py-8">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Perpustakaan APK Legal</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Hanya file yang developer-nya mengizinkan distribusi ulang (open-source) dan lolos seluruh pipeline verifikasi kami: hash SHA-256 dihitung, tanda tangan digital dicocokkan dengan fingerprint resmi developer, pemindaian keamanan bersih, izin diaudit, lalu direview manusia. Satu langkah gagal, file tidak tampil di sini.</p>
      </header>
      <section aria-label="File terverifikasi">
        <h2 className="text-lg font-bold text-ink">File Terverifikasi yang Bisa Diunduh</h2>
        {published.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-ink/75">Belum ada file yang selesai diverifikasi saat ini. Perpustakaan ini sengaja dimulai dari kosong dan terisi hanya oleh file yang lolos pipeline - bukan oleh file yang dikumpulkan dari internet. Kandidat pertamanya ada di bawah; masing-masing tetap paling aman diunduh dari sumber resminya.</p>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {published.map((f) => (
              <li key={f.id}>
                <Link href={`/perpustakaan/${f.id}`} className="block h-full rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                  <span className="font-semibold text-ink">{f.name} {f.version}</span>
                  <span className="mt-0.5 block text-xs text-muted">{f.packageName} · {(f.sizeBytes / 1048576).toFixed(1)} MB · {f.licence}</span>
                  {f.safetyScore !== null && <span className="mt-1 block text-sm font-semibold text-primary-dark">Skor keamanan {f.safetyScore}/100</span>}
                  <span className="mt-1 block text-sm text-ink/65">Lihat hash, hasil scan, dan izin sebelum unduh →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section aria-label="Kandidat open-source">
        <h2 className="text-lg font-bold text-ink">Kandidat Open-Source (Unduh dari Sumber Resmi)</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {libraryCandidates.map((c) => (
            <li key={c.packageName} className="rounded-2xl border border-mist p-4">
              <p className="font-semibold text-ink">{c.name}</p>
              <p className="text-xs text-muted">{c.packageName} · {c.developer} · {c.licence}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/75">{c.note}</p>
              <a href={c.fdroidUrl} target="_blank" rel="noopener" className="mt-2 inline-flex min-h-[40px] items-center font-semibold text-linkblue">Buka di F-Droid →</a>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl bg-primary-soft p-5">
        <h2 className="font-bold text-ink">Cara kami memverifikasi setiap file</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink/85">
          <li>Hash SHA-256 dihitung dan ditampilkan - cocokkan setelah kamu mengunduh.</li>
          <li>Fingerprint sertifikat penanda tangan dicocokkan dengan fingerprint resmi developer.</li>
          <li>Pemindaian multi-engine: satu deteksi berbahaya berarti tidak terbit.</li>
          <li>Semua izin dijelaskan dalam Bahasa Indonesia; izin berbahaya wajib ada alasannya.</li>
          <li>Review manual manusia, lalu hash dicek ulang setiap kali diterbitkan dan setiap kali diunduh.</li>
        </ol>
      </section>
    </div>
  );
}
