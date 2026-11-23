import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Kebijakan Privasi", description: `Cara ${site.name} mengumpulkan, memakai, dan melindungi data pengunjung sesuai UU PDP Indonesia.`, path: "/privasi", languages: { "id-ID": "/privasi", "en-US": "/en/privacy-policy", "x-default": "/privasi" }, locale: "id_ID" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">Kebijakan Privasi</h1>
      <p className="text-sm text-muted">Terakhir diperbarui: 8 November 2026 - Berlaku untuk {site.name}.</p>
      <p className="leading-relaxed text-ink/80">Kami mengumpulkan data seminimal mungkin. Kami tidak menjual data pribadi. Data pribadi diproses sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP) Republik Indonesia sejauh berlaku; undang-undang privasi lain juga dapat berlaku tergantung pada lokasimu dan hukum yang berlaku. Kamu berhak meminta akses, koreksi, dan penghapusan data pribadimu melalui halaman Kontak ({site.emailKontak}).</p>

      <h2 className="text-lg font-bold text-ink">Tool pengunduh (TikTok &amp; Instagram)</h2>
      <p className="leading-relaxed text-ink/80">Saat kamu menempel tautan, server kami mengambil info/video dari tautan itu hanya untuk memberikan hasil yang kamu minta. Kami tidak menyimpan video atau foto yang kamu proses. Log teknis tool hanya menyimpan metadata anonim (waktu, berhasil/gagal) dan tidak pernah menulis alamat URL penuh ke log; URL penuh yang tersimpan sementara dihapus dalam 24 jam.</p>

      <h2 className="text-lg font-bold text-ink">Pemeriksa Izin (tangkapan layar)</h2>
      <p className="leading-relaxed text-ink/80">Tangkapan layar yang kamu unggah diproses di server kami sendiri dengan Tesseract OCR (bahasa Indonesia + Inggris) — gambar tidak dikirim ke layanan OCR atau AI pihak ketiga, dan tidak dipakai untuk melatih model. Gambar ditulis ke berkas sementara hanya selama proses OCR berjalan (hitungan detik), lalu dihapus. Yang kami catat hanyalah metadata anonim: berapa izin ditemukan dan berapa yang berisiko tinggi — tanpa isi gambar dan tanpa nama aplikasi. Unggahan dibatasi maksimal 8 MB dan hanya PNG, JPG, atau WebP; format lain ditolak di server.</p>

      <h2 className="text-lg font-bold text-ink">Perpustakaan APK &amp; laporan</h2>
      <p className="leading-relaxed text-ink/80">Berkas di Perpustakaan APK Legal hanya berasal dari admin dan hanya diterbitkan setelah lolos pipeline verifikasi (lihat halaman Metodologi Verifikasi). Untuk berkas yang diterbitkan, kami menampilkan hash SHA-256, sidik jari tanda tangan, hasil pemindaian, dan izinnya — itu data tentang berkas, bukan tentang pengunjung. Laporan keamanan atau DMCA yang kamu kirim lewat email hanya dipakai untuk menangani laporan itu, dengan target peninjauan 2 hari kerja.</p>

      <h2 className="text-lg font-bold text-ink">Log server, cookie, analitik &amp; iklan</h2>
      <p className="leading-relaxed text-ink/80">Log server menyimpan metadata teknis anonim untuk keamanan dan perbaikan (waktu, keberhasilan tool) — bukan isi unggahanmu. Situs ini memakai Google Analytics 4 (GA4) untuk memahami kunjungan situs dan meningkatkan halaman, tetapi analitik bersifat opsional: GA4 hanya aktif setelah kamu menyetujuinya melalui spanduk persetujuan ("Terima analitik"). Jika kamu menolak atau belum memilih, GA4 tidak dimuat dan tidak ada data analitik yang dikumpulkan. Pilihanmu disimpan di browser, dan kamu dapat mengubahnya kapan saja melalui tombol "Pengaturan cookie" yang muncul di kanan bawah setelah kamu memilih. Situs ini tidak menampilkan iklan pihak ketiga, jadi tidak ada pelacak iklan yang mengumpulkan datamu. Cookie fungsional yang penting dapat dipakai saat ini untuk fungsi situs (misalnya pilihan tema gelap/terang); cookie iklan saat ini tidak beroperasi. Kamu dapat menghapus cookie kapan pun melalui pengaturan browser.</p>

      <h2 className="text-lg font-bold text-ink">Iklan di Masa Mendatang (Google AdSense dan Penyedia Iklan Pihak Ketiga)</h2>
      <p className="leading-relaxed text-ink/80">Bagian ini menjelaskan kemungkinan di masa mendatang, bukan praktik saat ini: {site.name} saat ini tidak menampilkan iklan, dan tidak ada cookie iklan yang beroperasi di situs ini. Di masa mendatang, {site.name} dapat menggunakan Google AdSense atau penyedia iklan pihak ketiga lainnya. Bila iklan ditampilkan, penyedia iklan dapat menggunakan cookie atau teknologi serupa, dan dapat memasang cookie mereka sendiri, tunduk pada persyaratan persetujuan yang berlaku; Google dan mitranya dapat menggunakan informasi untuk menayangkan, mempersonalisasi, mengukur, dan membatasi iklan, sebagaimana berlaku. Pengguna dapat mengatur personalisasi iklan melalui Pengaturan Iklan Google (My Ad Center) di https://myadcenter.google.com/ atau www.aboutads.info/choices. Penyedia pihak ketiga memproses data sesuai kebijakan privasi mereka masing-masing; dokumentasi privasi iklan Google tersedia di https://policies.google.com/technologies/ads. Bila iklan diaktifkan untuk pengunjung di wilayah yang mewajibkan persetujuan, {site.name} akan menerapkan platform pengelolaan persetujuan (consent management platform) bersertifikat Google dan mengonfigurasikannya sebelum menayangkan iklan di wilayah tersebut.</p>

      <h2 className="text-lg font-bold text-ink">Permintaan data &amp; penghapusan</h2>
      <p className="leading-relaxed text-ink/80">Untuk meminta akses, koreksi, atau penghapusan data pribadimu, kirim email ke {site.emailKontak} dengan subjek &quot;Permintaan Data Pribadi&quot; dan jelaskan data yang dimaksud. Kami menargetkan balasan dalam 2 hari kerja. Permintaan akan kami tinjau dan tangani. Karena tool kami tidak menyimpan unggahanmu, biasanya tidak ada file pengunjung yang perlu dihapus. Namun, catatan tertentu — termasuk email dan laporan yang kamu kirim sendiri — mungkin perlu disimpan bila diwajibkan atau diizinkan oleh hukum yang berlaku, demi keamanan, atau untuk kebutuhan operasional yang sah.</p>
    </article>
  );
}
