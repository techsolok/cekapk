import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { guides } from "@/lib/data/guides";
import { pillarApps } from "@/lib/data/apps";
import { libraryCandidates } from "@/lib/library/catalog";
import { lastCheckedInfo } from "@/lib/last-checked";
import { getDb } from "@/db";
import { libraryFiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const metadata: Metadata = pageMetadata({ title: "Keamanan APK: Skor & Cara Cek Aplikasi Aman", description: "Hub keamanan APK Bahasa Indonesia: cara cek izin aplikasi, panduan instal aman, cara mengenali APK palsu, dan kesegaran cek 50 aplikasi dari sumber resmi.", path: "/keamanan" });
export const dynamic = "force-dynamic";

export default async function KeamananHub() {
  const safety = guides.filter((g) => g.type !== "explainer");
  const explainers = guides.filter((g) => g.type === "explainer");
  let scored: { id: number; name: string; safetyScore: number | null }[] = [];
  if (process.env.DATABASE_URL) {
    try {
      const rows = await getDb().select().from(libraryFiles).where(eq(libraryFiles.status, "published")).orderBy(desc(libraryFiles.safetyScore));
      scored = rows.map((r) => ({ id: r.id, name: r.name, safetyScore: r.safetyScore }));
    } catch { scored = []; }
  }
  const fresh = [...pillarApps].sort((a, b) => b.verifiedAt.localeCompare(a.verifiedAt));
  const freshest = fresh.slice(0, 10);
  const stalest = [...pillarApps].sort((a, b) => a.verifiedAt.localeCompare(b.verifiedAt)).slice(0, 5);
  return (
    <div className="space-y-8 py-8">
      <h1 className="text-2xl font-extrabold text-ink">Keamanan APK</h1>
      <p className="max-w-2xl leading-relaxed text-ink/75">Satu dari tiga pilar situs ini. Prinsip kami sejak Fase 0: sumber resmi dulu, tanda tangan dicocokkan, pemindaian bersih, izin dijelaskan. Halaman ini adalah papan skornya: apa yang sudah terverifikasi, dan seberapa segar pengecekan kami. Cara kerja lengkap pipeline kami ada di <Link className="font-semibold text-linkblue" href="/metodologi-verifikasi">Metodologi Verifikasi</Link>.</p>

      <section aria-label="Skor keamanan file library">
        <h2 className="text-lg font-bold text-ink">Skor Keamanan File Library Terverifikasi</h2>
        {scored.length === 0 ? (
          <div className="mt-3 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-ink/75">
            <p>Belum ada file library yang terbit, jadi belum ada skor angka yang bisa ditampilkan - kami tidak mengarang skor untuk aplikasi yang tidak kami host. Skor muncul di sini hanya untuk file yang lolos seluruh pipeline (hash, tanda tangan, scan, audit izin, review manual) di <Link className="font-semibold text-linkblue" href="/perpustakaan">Perpustakaan APK Legal</Link>. Kandidat open-source yang sedang antre verifikasi: {libraryCandidates.map((c) => c.name).join(", ")}.</p>
            <p className="mt-2">Untuk 50 aplikasi katalog, penilaian keamanan ditulis dengan kata-kata di bagian "Apakah … Aman?" pada masing-masing halaman aplikasi - misalnya <Link className="font-semibold text-linkblue" href="/aplikasi/whatsapp#keamanan">WhatsApp</Link> dan <Link className="font-semibold text-linkblue" href="/aplikasi/dana#keamanan">DANA</Link>.</p>
          </div>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {scored.map((f) => (
              <li key={f.id}><Link href={`/perpustakaan/${f.id}`} className="block rounded-2xl border border-mist bg-paper p-4 shadow-sm"><span className="font-semibold text-ink">{f.name}</span><span className="mt-1 block text-sm font-semibold text-primary-dark">Skor keamanan {f.safetyScore}/100</span></Link></li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Kesegaran pengecekan">
        <h2 className="text-lg font-bold text-ink">Kesegaran Pengecekan Halaman</h2>
        <p className="mt-1 text-sm text-ink/65">Setiap halaman aplikasi menampilkan tanggal cek terakhirnya. Yang paling lama tidak dicek masuk antrean cek ulang begitu usianya melewati 90 hari.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-mist p-4">
            <h3 className="font-semibold text-ink">Paling Baru Dicek</h3>
            <ul className="mt-2 space-y-1 text-sm text-ink/75">{freshest.map((a) => (<li key={a.slug}><Link className="font-medium text-linkblue" href={`/aplikasi/${a.slug}`}>{a.name}</Link> - {a.verifiedAt} ({lastCheckedInfo(a.verifiedAt).days} hari lalu)</li>))}</ul>
          </div>
          <div className="rounded-2xl border border-mist p-4">
            <h3 className="font-semibold text-ink">Paling Lama Tidak Dicek</h3>
            <ul className="mt-2 space-y-1 text-sm text-ink/75">{stalest.map((a) => (<li key={a.slug}><Link className="font-medium text-linkblue" href={`/aplikasi/${a.slug}`}>{a.name}</Link> - {a.verifiedAt} ({lastCheckedInfo(a.verifiedAt).days} hari lalu){lastCheckedInfo(a.verifiedAt).stale ? " · perlu cek ulang" : ""}</li>))}</ul>
          </div>
        </div>
      </section>

      <section aria-label="Periksa izin sekarang" className="rounded-2xl bg-primary-soft p-5">
        <h2 className="font-bold text-ink">Periksa Izin Aplikasi dari Tangkapan Layar</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink/85">Punya aplikasi yang mencurigakan? Unggah tangkapan layar daftar izinnya dan baca penjelasan risikonya dalam bahasa sederhana.</p>
        <Link href="/tools/pemeriksa-izin" className="mt-2 inline-flex min-h-[44px] items-center rounded-xl bg-primary px-4 font-semibold text-white">Buka Pemeriksa Izin</Link>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Panduan Keamanan Praktis</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {safety.map((g) => (<li key={g.slug}><Link href={`/panduan/${g.slug}`} className="block h-full rounded-2xl border border-mist bg-paper p-4 shadow-sm"><span className="block font-semibold leading-snug text-ink">{g.title}</span><span className="mt-1 block text-sm leading-relaxed text-ink/65">{g.metaDescription}</span></Link></li>))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-bold text-ink">Penjelasan Istilah Viral</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {explainers.map((g) => (<li key={g.slug}><Link href={`/panduan/${g.slug}`} className="block h-full rounded-2xl border border-mist bg-paper p-4 shadow-sm"><span className="block font-semibold leading-snug text-ink">{g.title}</span><span className="mt-1 block text-sm leading-relaxed text-ink/65">{g.metaDescription}</span></Link></li>))}
        </ul>
      </section>
      <p className="rounded-2xl bg-primary-soft p-4 text-sm leading-relaxed text-ink/85">Menemukan aplikasi atau tautan yang mencurigakan? Laporkan lewat halaman <Link className="font-semibold text-primary-dark underline" href="/kontak">Kontak</Link>. Cara kami bekerja dan angka-angkanya kami buka di <Link className="font-semibold text-primary-dark underline" href="/transparansi">Laporan Transparansi</Link>.</p>
    </div>
  );
}
