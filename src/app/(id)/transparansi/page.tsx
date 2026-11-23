import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getDb } from "@/db";
import { libraryFiles, reports } from "@/db/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = pageMetadata({ title: "Laporan Transparansi - Cara Kami Memverifikasi & Menangani Laporan", description: "Angka nyata dari sistem kami: file library yang terbit dan ditahan pipeline, laporan keamanan dan DMCA yang diterima, serta metodologi verifikasi yang kami pakai.", path: "/transparansi" });
export const dynamic = "force-dynamic";

export default async function TransparencyPage() {
  let lib = { published: 0, draft: 0, flagged: 0 };
  let reps = { total: 0, dmca: 0, safety: 0, broken: 0, open: 0 };
  let dbLive = false;
  if (process.env.DATABASE_URL) {
    try {
      const db = getDb();
      const files = await db.select({ status: libraryFiles.status }).from(libraryFiles);
      lib = { published: files.filter((f) => f.status === "published").length, draft: files.filter((f) => f.status === "draft").length, flagged: files.filter((f) => f.status === "flagged").length };
      const all = await db.select({ type: reports.type, status: reports.status }).from(reports);
      reps = { total: all.length, dmca: all.filter((r) => r.type === "dmca").length, safety: all.filter((r) => r.type === "safety").length, broken: all.filter((r) => r.type === "broken").length, open: all.filter((r) => r.status === "open").length };
      dbLive = true;
    } catch { dbLive = false; }
  }
  return (
    <div className="space-y-8 py-8">
      <header>
        <p className="text-sm font-semibold text-primary-dark">Laporan perdana - periode berjalan sejak situs disiapkan (Oktober 2026)</p>
        <h1 className="mt-1 text-2xl font-extrabold text-ink">Laporan Transparansi</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Kepercayaan tidak cukup diklaim; ia harus bisa diperiksa. Halaman ini menampilkan angka dari sistem kami sendiri - termasuk angka nol, apa adanya - dan metodologi di balik setiap keputusan terbit atau tahan.</p>
      </header>
      <section aria-label="Angka library" className="rounded-2xl border border-mist p-5">
        <h2 className="font-bold text-ink">Perpustakaan APK Legal {dbLive ? "(data langsung dari database)" : "(database belum aktif di server ini - angka ditampilkan setelah deploy)"}</h2>
        <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-mist p-3"><dt className="text-xs text-muted">File terbit</dt><dd className="text-2xl font-extrabold text-ink">{lib.published}</dd></div>
          <div className="rounded-xl bg-mist p-3"><dt className="text-xs text-muted">Dalam proses / draf</dt><dd className="text-2xl font-extrabold text-ink">{lib.draft}</dd></div>
          <div className="rounded-xl bg-mist p-3"><dt className="text-xs text-muted">Ditahan (flagged)</dt><dd className="text-2xl font-extrabold text-ink">{lib.flagged}</dd></div>
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">File hanya terbit bila lima langkah pipeline lolos semua: hash SHA-256, struktur APK, kecocokan fingerprint sertifikat developer, pemindaian multi-engine bersih, dan audit izin - ditambah review manual manusia. File yang hash-nya berubah di penyimpanan otomatis ditahan dan unduhannya diblokir.</p>
      </section>
      <section aria-label="Angka laporan" className="rounded-2xl border border-mist p-5">
        <h2 className="font-bold text-ink">Laporan Pengguna & DMCA</h2>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-center sm:grid-cols-5">
          <div className="rounded-xl bg-mist p-3"><dt className="text-xs text-muted">Total laporan</dt><dd className="text-2xl font-extrabold text-ink">{reps.total}</dd></div>
          <div className="rounded-xl bg-mist p-3"><dt className="text-xs text-muted">Keamanan</dt><dd className="text-2xl font-extrabold text-ink">{reps.safety}</dd></div>
          <div className="rounded-xl bg-mist p-3"><dt className="text-xs text-muted">DMCA / hak cipta</dt><dd className="text-2xl font-extrabold text-ink">{reps.dmca}</dd></div>
          <div className="rounded-xl bg-mist p-3"><dt className="text-xs text-muted">File rusak</dt><dd className="text-2xl font-extrabold text-ink">{reps.broken}</dd></div>
          <div className="rounded-xl bg-mist p-3"><dt className="text-xs text-muted">Masih terbuka</dt><dd className="text-2xl font-extrabold text-ink">{reps.open}</dd></div>
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">Target penanganan kami: laporan keamanan ditinjau maks 2 hari kerja; permintaan DMCA yang sah diproses sesuai halaman DMCA kami. Laporan ini diperbarui berkala (per triwulan setelah situs live) dan angka periode sebelumnya akan diarsipkan di halaman ini.</p>
      </section>
      <section aria-label="Metodologi" className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Metodologi Singkat</h2>
        <p>Katalog aplikasi kami tidak menghosting file untuk aplikasi komersial: setiap halaman menautkan ke sumber resmi (Play Store atau developer) dan menyatakan tanggal cek terakhirnya. Skor keamanan angka hanya ada untuk file yang kami host sendiri di Perpustakaan Legal, dihitung dari sumber (30), kecocokan tanda tangan (25), hasil pemindaian (25), dan kewajaran izin (20). Kami tidak pernah mencetak nomor versi, ukuran pasti, rating, atau jumlah unduhan karangan - angka seperti itu berubah per rilis dan per perangkat, dan mengarangnya adalah cara tercepat menghancurkan kepercayaan pembaca.</p>
        <p>Kategori yang ilegal di Indonesia tidak kami bahas sebagai unduhan sama sekali: aplikasi pornografi, judi online, dan APK bajakan berada di daftar negatif permanen kami dan bahkan diblokir oleh generator konten internal kami.</p>
      </section>
    </div>
  );
}
