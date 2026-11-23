import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumb } from "@/components/ui";
export const metadata: Metadata = pageMetadata({ title: "Metodologi Verifikasi APK - Cara Kami Memeriksa File Sebelum Terbit", description: "Langkah demi langkah cara CekAPK memverifikasi file APK legal: hash SHA-256, struktur, tanda tangan developer, pemindaian VirusTotal, audit izin, dan review manual. Tanpa hasil lengkap, file tidak terbit.", path: "/metodologi-verifikasi" });
export default function MetodologiPage() {
  return (
    <article className="space-y-4 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Keamanan", path: "/keamanan" }, { name: "Metodologi Verifikasi", path: "/metodologi-verifikasi" }])} />
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Keamanan", path: "/keamanan" }, { name: "Metodologi Verifikasi", path: "/metodologi-verifikasi" }]} />
      <h1 className="text-2xl font-extrabold text-ink">Metodologi Verifikasi APK</h1>
      <p className="text-sm text-muted">Terakhir diperbarui: 8 November 2026. Halaman ini menjelaskan apa yang benar-benar dilakukan sistem kami — bukan yang direncanakan.</p>
      <p className="leading-relaxed text-ink/80">Halaman ini hanya berlaku untuk berkas di <Link className="font-semibold text-linkblue" href="/perpustakaan">Perpustakaan APK Legal</Link>. Halaman info aplikasi di katalog adalah halaman penjelasan, bukan berkas terverifikasi: aplikasi yang belum diuji tidak mendapat skor atau klaim &quot;aman&quot;. Sebuah hasil pemindaian yang bersih berarti nol deteksi oleh mesin yang bernama pada waktu yang tercatat — bukan jaminan sebuah aplikasi sepenuhnya aman.</p>

      <h2 className="text-lg font-bold text-ink">Syarat file: hanya yang legal</h2>
      <p className="leading-relaxed text-ink/80">Hanya berkas dari sumber resmi yang bisa masuk pipeline: aplikasi open-source atau file yang disediakan langsung oleh developer. Kami tidak menerima APK bajakan, mod, judi, atau dewasa, dan tidak mendistribusikan ulang berkas tanpa izin yang terdokumentasi.</p>

      <h2 className="text-lg font-bold text-ink">Lima langkah pipeline (berurutan)</h2>
      <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/80">
        <li><strong>Hash SHA-256.</strong> Hash berkas dihitung dan dicatat. Hash inilah identitas berkas itu — berkas yang hash-nya berubah dianggap berkas yang berbeda.</li>
        <li><strong>Struktur APK.</strong> Berkas harus bisa dibaca sebagai APK: ada AndroidManifest.xml, ada file dex, ada blok tanda tangan (META-INF), dan tidak ada APK di dalam APK. Satu saja tidak ada, file ditolak.</li>
        <li><strong>Tanda tangan developer.</strong> Sidik jari SHA-256 sertifikat penanda tangan diekstrak dari blok tanda tangan dan dicocokkan dengan sidik jari resmi developer yang didaftarkan admin dari sumber resmi. Tidak cocok berarti file ditolak — tanda tangan yang valid membuktikan siapa penandatangannya dan keutuhan berkas, bukan bahwa aplikasinya berperilaku baik.</li>
        <li><strong>Pemindaian multi-engine (VirusTotal).</strong> Hash berkas dicari di VirusTotal. Ambang terbit kami: 0 malicious dan 0 suspicious. Hash yang belum dikenal VirusTotal tidak bisa terbit — file baru wajib dianalisis dulu oleh admin. Bila kunci API VirusTotal belum diatur di server, langkah ini gagal dan file tidak bisa terbit.</li>
        <li><strong>Audit izin.</strong> Izin dari manifest dideklarasikan admin dan dijelaskan dengan bahasa sederhana; setiap izin berbahaya wajib punya penjelasan yang cukup. Pemeriksaan izin bukan deteksi malware.</li>
      </ol>

      <h2 className="text-lg font-bold text-ink">Gerbang terbit &amp; skor</h2>
      <p className="leading-relaxed text-ink/80">Satu langkah gagal berarti file tidak bisa terbit. Skor keamanan hanya dihitung bila semua langkah lolos (sumber 25–30, tanda tangan 25, pemindaian 25, izin 16–20). Setelah itu masih ada review manual oleh admin sebelum status menjadi diterbitkan. Status berkas di sistem kami: draft, diterbitkan, ditandai (flagged), atau ditolak — dan hasil pemindaian bisa berstatus bersih, menunggu, atau gagal.</p>

      <h2 className="text-lg font-bold text-ink">Status saat ini — jujur</h2>
      <p className="leading-relaxed text-ink/80">Per 8 November 2026, kunci API VirusTotal (VT_API_KEY) belum diatur di server, sehingga langkah pemindaian belum bisa lolos untuk berkas apa pun dan Perpustakaan masih kosong — dengan sengaja. Begitu kunci gratis diatur, berkas pertama baru bisa diuji lewat pipeline ini. Hash berkas diperiksa ulang setiap kali diterbitkan dan setiap kali diunduh: bila hash di penyimpanan tidak lagi sama dengan hash yang tercatat, berkas itu ditahan.</p>

      <h2 className="text-lg font-bold text-ink">Koreksi &amp; banding</h2>
      <p className="leading-relaxed text-ink/80">Bila kamu menemukan kesalahan pada sebuah catatan verifikasi, atau merasa sebuah file salah ditandai, laporkan ke {site.emailKontak} (atau {site.emailDmca} untuk klaim hak cipta). Target peninjauan kami 2 hari kerja. Bila sebuah aplikasi merilis versi baru, catatan verifikasi versi lamanya dianggap kedaluwarsa sampai versi baru itu diuji ulang.</p>
      <p className="leading-relaxed text-ink/80">Lihat juga: <Link className="font-semibold text-linkblue" href="/keamanan">Keamanan APK</Link> · <Link className="font-semibold text-linkblue" href="/perpustakaan">Perpustakaan APK Legal</Link> · <Link className="font-semibold text-linkblue" href="/transparansi">Laporan Transparansi</Link> · <Link className="font-semibold text-linkblue" href="/privasi">Kebijakan Privasi</Link></p>
    </article>
  );
}
