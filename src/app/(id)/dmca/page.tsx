import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "DMCA & Penghapusan Konten", description: `Cara pemilik hak cipta meminta penghapusan konten di ${site.name} - target respons 2 hari kerja.`, path: "/dmca", languages: { "id-ID": "/dmca", "en-US": "/en/dmca", "x-default": "/dmca" }, locale: "id_ID" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">DMCA &amp; Penghapusan Konten</h1>
      <p className="text-sm text-muted">Terakhir diperbarui: 8 November 2026 - Berlaku untuk {site.name}.</p>
      <p className="leading-relaxed text-ink/80">{site.name} menghormati hak cipta. Kebijakan kami adalah tidak meng-host karya berhak cipta tanpa izin; halaman aplikasi kami bersifat informatif dan tombol unduhan mengarah ke sumber resmi atau ke berkas yang telah melalui pipeline verifikasi kami.</p>

      <h2 className="text-lg font-bold text-ink">Proses Pelaporan Sukarela Kami</h2>
      <p className="leading-relaxed text-ink/80">Halaman ini menjelaskan prosedur pelaporan dan peninjauan sukarela {site.name} untuk keluhan hak cipta. Ini bukan pernyataan bahwa {site.name} telah memenuhi setiap unsur proses statutory DMCA formal Amerika Serikat, dan halaman ini bukan nasihat hukum. Bila kamu memerlukan proses statutory formal, konsultasikan dengan penasihat hukum.</p>

      <h2 className="text-lg font-bold text-ink">Siapa yang Boleh Mengajukan Keluhan</h2>
      <p className="leading-relaxed text-ink/80">Keluhan hak cipta dapat diajukan oleh pemilik hak cipta, atau oleh agen yang diberi wewenang untuk bertindak atas nama pemiliknya. Bila kamu melapor atas nama orang lain, sebutkan hubunganmu dengan pemilik dan wewenangmu untuk bertindak atas nama mereka.</p>

      <h2 className="text-lg font-bold text-ink">Informasi yang Membantu Kami Meninjau Laporanmu</h2>
      <p className="leading-relaxed text-ink/80">Kirim laporanmu ke <a className="font-semibold text-linkblue" href={`mailto:${site.emailDmca}`}>{site.emailDmca}</a> dan sertakan informasi berikut agar kami dapat meninjaunya: (1) identifikasimu dan detail kontak, (2) identifikasi karya berhak cipta yang diklaim dilanggar — cukup detail agar kami dapat menemukannya, (3) URL persis di situs kami tempat materi yang diduga melanggar itu muncul, dan (4) pernyataan itikad baik bahwa kamu yakin penggunaan itu tidak diizinkan oleh pemilik hak cipta, agennya, atau hukum. Daftar ini adalah panduan praktis kami untuk meninjau laporan — bukan daftar lengkap persyaratan pemberitahuan statutory DMCA. Laporan yang tidak mencantumkan URL persis atau identifikasi karya yang jelas sulit kami proses.</p>

      <h2 className="text-lg font-bold text-ink">Cara Kami Meninjau Laporan</h2>
      <p className="leading-relaxed text-ink/80">Target internal kami adalah meninjau dalam 2 hari kerja — ini target internal kami, bukan tenggat hukum. Kami memeriksa URL yang dilaporkan, karya yang diidentifikasi, dan apakah materi itu di-host oleh kami atau hanya ditautkan ke sumber resmi. Bila laporan sah, kami bertujuan mengambil tindakan yang sesuai dalam target internal itu; kasus yang memerlukan penyelidikan tambahan dapat memakan waktu lebih lama. Kami akan memberi tahu pelapor tentang hasilnya; bila laporan tidak sah, atau bila materi itu hanya halaman informatif yang menautkan ke sumber resmi, kami menjelaskan alasannya. Jumlah laporan hak cipta yang diterima ditampilkan sebagai angka agregat di halaman Transparansi kami; tidak ada informasi pribadi pelapor yang dipublikasikan di sana.</p>

      <h2 className="text-lg font-bold text-ink">Materi yang Di-host atau Ditautkan Pihak Ketiga</h2>
      <p className="leading-relaxed text-ink/80">Bila materi yang dikeluhkan berada di server pihak ketiga, atau halaman kami hanya menautkan ke materi itu, tindakan terhadap materi tersebut mungkin memerlukan host eksternal atau pemilik hak cipta. Kami dapat meninjau halaman dan tautan kami sendiri — termasuk menghapus tautan yang bermasalah — tetapi kami tidak dapat menjanjikan penghapusan materi dari server pihak ketiga.</p>

      <h2 className="text-lg font-bold text-ink">Menanggapi Keputusan Penghapusan atau Melaporkan Penghapusan yang Keliru</h2>
      <p className="leading-relaxed text-ink/80">Bila kontenmu dihapus dan kamu yakin itu keliru, atau kamu berhak atas materi tersebut, kirim tanggapan ke <a className="font-semibold text-linkblue" href={`mailto:${site.emailDmca}`}>{site.emailDmca}</a> dengan: identifikasimu dan detail kontak, identifikasi materi dan tempatnya muncul di situs kami, serta penjelasan mengapa penghapusan itu keliru atau mengapa kamu berhak memakai materi itu. Kami meninjau setiap tanggapan secara individual; tidak ada pemulihan otomatis. Prosedur statutory 10–14 hari kerja tidak berlaku di sini — kami meninjau tanggapan dengan target internal 2 hari kerja yang sama, dan keputusan dibuat per kasus.</p>

      <h2 className="text-lg font-bold text-ink">Pemberitahuan Palsu atau Ceroboh</h2>
      <p className="leading-relaxed text-ink/80">Pemberitahuan palsu atau ceroboh dapat merugikan pihak lain; pastikan klaimmu benar sebelum mengirim. Kami tidak menerima pemberitahuan yang tidak mengidentifikasi karya tertentu atau URL tertentu di situs kami.</p>
    </article>
  );
}
