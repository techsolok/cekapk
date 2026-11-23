import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Ketentuan Penggunaan", description: `Aturan memakai situs, tool, dan konten ${site.name} — termasuk pengunduh, hak cipta, dan batasan layanan.`, path: "/ketentuan", languages: { "id-ID": "/ketentuan", "en-US": "/en/terms-of-use", "x-default": "/ketentuan" }, locale: "id_ID" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">Ketentuan Penggunaan</h1>
      <p className="text-sm text-muted">Terakhir diperbarui: 7 November 2026 - Berlaku untuk {site.name}.</p>

      <h2 className="text-lg font-bold text-ink">1. Penerimaan Ketentuan</h2>
      <p className="leading-relaxed text-ink/80">Dengan memakai situs ini kamu menyetujui ketentuan berikut. Bila kamu tidak setuju, jangan memakai situs atau tool-nya. Ketentuan ini berlaku untuk situs web, tool online, dan seluruh konten yang diterbitkan di {site.name}.</p>

      <h2 className="text-lg font-bold text-ink">2. Penggunaan yang Diizinkan</h2>
      <p className="leading-relaxed text-ink/80">Kamu boleh memakai situs dan tool-nya untuk keperluan pribadi yang sah: membaca info dan panduan keamanan aplikasi, memeriksa izin sebuah APK dari tangkapan layar, dan mengunduh konten milikmu sendiri atau yang pemiliknya mengizinkan kamu mengunduhnya. Tool disediakan gratis dan tidak memerlukan akun atau login.</p>

      <h2 className="text-lg font-bold text-ink">3. Penggunaan yang Dilarang</h2>
      <p className="leading-relaxed text-ink/80">Kamu tidak boleh memakai situs atau tool-nya untuk melanggar hak cipta atau hak lainnya, mengunduh konten yang bukan milikmu dan tidak ada izin untuk mengunduhnya, menyebarkan malware atau berkas berbahaya, menyalahgunakan, membebani, atau menyerang layanan, melewati batas laju (rate limit) atau kontrol keamanan, atau mengaku konten {site.name} sebagai milikmu. Kami tidak menyediakan, meng-host, atau menautkan ke APK bajakan, aplikasi mod/premium-unlocked, aplikasi judi, atau konten dewasa.</p>

      <h2 className="text-lg font-bold text-ink">4. Tanggung Jawab atas Konten yang Diunduh</h2>
      <p className="leading-relaxed text-ink/80">Kamu bertanggung jawab atas penggunaan hasil unduhanmu. Unduh hanya konten milikmu sendiri atau yang pemiliknya mengizinkan kamu mengunduhnya, dan hormati hak kreator serta ketentuan platform asal konten itu. Kami tidak bertanggung jawab atas cara konten unduhan dipakai setelah keluar dari layanan kami.</p>

      <h2 className="text-lg font-bold text-ink">5. Hak Cipta dan Kekayaan Intelektual</h2>
      <p className="leading-relaxed text-ink/80">Semua nama aplikasi, merek dagang, dan logo di situs ini adalah milik pemiliknya masing-masing. Teks, panduan, dan ulasan orisinal yang diterbitkan di {site.name} adalah karya kami; kamu boleh menautkannya dan mengutip potongan singkat dengan atribusi, tetapi tidak boleh menyalin sebagian besar isinya atau menerbitkannya ulang sebagai milikmu. Bila kamu yakin ada konten di situs ini yang melanggar hak ciptamu, lihat halaman DMCA &amp; Penghapusan Konten.</p>

      <h2 className="text-lg font-bold text-ink">6. Informasi APK dan Sumber Unduhan Resmi</h2>
      <p className="leading-relaxed text-ink/80">Halaman aplikasi di situs ini bersifat informatif. Bila ada jalur unduhan resmi yang aman — biasanya Google Play Store atau situs developer sendiri — kami mengarah ke sana. Bila tidak ada jalur resmi yang aman, kami mengatakannya dengan jelas dan, bila memungkinkan, menyarankan alternatif legal alih-alih menyediakan berkas. Keputusan menginstal dari sumber resmi adalah tanggung jawab pengguna, dan kami menampilkan status serta risiko sejujur yang kami ketahui, beserta tanggal verifikasi di setiap halaman aplikasi.</p>

      <h2 className="text-lg font-bold text-ink">7. Batasan Layanan Pengunduh</h2>
      <p className="leading-relaxed text-ink/80">Tool pengunduh hanya bekerja untuk konten publik yang disediakan platform sumbernya, dan hanya untuk tautan yang bisa kami jangkau. Tool dapat gagal atau memberi hasil terbatas bila tautan bersifat privat, sudah dihapus, dibatasi wilayah, atau bila platform sumber memblokir akses otomatis. Kami tidak menyimpan media yang kamu proses, tidak menjamin tautan tertentu akan berhasil, dan tidak menyimpan salinan berkas unduhan. Ketersediaan unduhan bergantung pada sumbernya, bukan pada kami.</p>

      <h2 className="text-lg font-bold text-ink">8. Ketersediaan Layanan dan Perubahan</h2>
      <p className="leading-relaxed text-ink/80">Situs dan tool-nya dapat berubah, berhenti sementara, atau tidak tersedia — untuk pemeliharaan, karena perubahan platform di luar kendali kami, atau untuk pencegahan penyalahgunaan. Konten situs dapat berubah dan aplikasi dapat diperbarui developer-nya kapan pun. Kami berusaha menjaga tanggal verifikasi tetap akurat dan menampilkannya di setiap halaman aplikasi. Kami dapat memperbarui, menangguhkan, atau menghapus halaman, tool, atau berkas apa pun kapan pun.</p>

      <h2 className="text-lg font-bold text-ink">9. Keamanan dan Pencegahan Penyalahgunaan</h2>
      <p className="leading-relaxed text-ink/80">Agar layanan tetap bisa dipakai semua orang, kami menerapkan batas laju, tantangan otomatis, dan deteksi penyalahgunaan pada tool dan API. Penyalahgunaan — termasuk ekstraksi massal atau otomatis, upaya melewati kontrol ini, atau mengunggah berkas berbahaya — dapat membuat aksesmu dibatasi atau diblokir. Berkas di Perpustakaan APK Legal hanya diterbitkan setelah pipeline verifikasi (hash, kecocokan tanda tangan, pemindaian, dan audit izin); berkas yang gagal di satu langkah tidak diterbitkan.</p>

      <h2 className="text-lg font-bold text-ink">10. Tautan dan Layanan Pihak Ketiga</h2>
      <p className="leading-relaxed text-ink/80">Situs ini menautkan ke layanan pihak ketiga — toko aplikasi, situs developer, dan platform yang dibaca tool kami (seperti TikTok dan Instagram). Kami tidak mengendalikan layanan itu, kontennya, atau ketentuannya; menggunakannya tunduk pada kebijakan mereka masing-masing. Tautan ke layanan pihak ketiga bukan dukungan atas segala hal yang dilakukan layanan itu.</p>

      <h2 className="text-lg font-bold text-ink">11. Pelaporan dan Penanganan Keluhan</h2>
      <p className="leading-relaxed text-ink/80">Bila kamu menemukan kesalahan, tautan resmi yang rusak, atau aplikasi yang seharusnya tidak kami rekomendasikan, laporkan melalui halaman Kontak. Keluhan hak cipta mengikuti proses di halaman DMCA &amp; Penghapusan Konten; laporan keamanan tentang berkas APK dikirim ke alamat yang sama. Target kami: meninjau dalam 2 hari kerja. Koreksi yang diterima akan dicatat di halaman terkait, dan halaman yang terbukti tidak lagi memenuhi standar akan diperbaiki atau ditarik.</p>

      <h2 className="text-lg font-bold text-ink">12. Batasan Tanggung Jawab</h2>
      <p className="leading-relaxed text-ink/80">Situs, tool, dan konten disediakan &quot;sebagaimana adanya&quot;, tanpa jaminan apa pun, sejauh diizinkan oleh hukum yang berlaku. Sejauh diizinkan oleh hukum yang berlaku, {site.name} tidak bertanggung jawab atas kerugian yang timbul dari penggunaan situs, dari konten yang kamu unduh atau instal, dari layanan pihak ketiga, atau dari tidak tersedianya layanan untuk sementara. Tidak ada ketentuan di sini yang membatasi tanggung jawab yang tidak dapat dibatasi menurut hukum yang berlaku. Skor keamanan adalah penilaian berbasis proses verifikasi kami, bukan jaminan mutlak.</p>

      <h2 className="text-lg font-bold text-ink">13. Kontak dan Perubahan Ketentuan</h2>
      <p className="leading-relaxed text-ink/80">Pertanyaan tentang ketentuan ini dapat dikirim ke {site.emailKontak}. Kami dapat memperbarui ketentuan ini bila situs, tool, atau hukum berubah; tanggal &quot;Terakhir diperbarui&quot; di atas menunjukkan versi yang berlaku. Terus memakai situs setelah pembaruan berarti kamu menerima ketentuan yang diperbarui.</p>
    </article>
  );
}
