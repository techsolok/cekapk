import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { author } from "@/lib/data/author";

export const metadata: Metadata = pageMetadata({ title: "Tentang Kami", description: "CekAPK adalah situs Bahasa Indonesia untuk info aplikasi Android yang jujur, tool online gratis, dan cek keamanan APK. Baca kebijakan editorial kami.", path: "/tentang", languages: { "id-ID": "/tentang", "en-US": "/en/about", "x-default": "/tentang" }, locale: "id_ID" });

export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">Tentang Kami</h1>
      <p className="text-sm text-muted">Terakhir diperbarui: 18 November 2026 - Berlaku untuk {site.name}.</p>
      <p className="leading-relaxed text-ink/80">{site.name} dibuat untuk satu masalah sederhana: pengguna Indonesia sering diarahkan ke situs APK yang berat, penuh tombol unduh palsu, dan berisiko. Kami membangun alternatifnya - ringan untuk HP kelas pemula, 100% Bahasa Indonesia, dan jujur soal keamanan.</p>
      <p className="leading-relaxed text-ink/80">Kebijakan editorial kami: deskripsi ditulis orisinal dari fakta sumber resmi, tanggal verifikasi selalu ditampilkan, rating tidak pernah dikarang, dan halaman yang tidak memenuhi standar kualitas tidak diterbitkan. Koreksi dapat diajukan melalui halaman Kontak dan akan dicatat di halaman terkait.</p>

      <h2 className="text-xl font-bold text-ink">Kenapa Situs Ini Ada</h2>
      <p className="leading-relaxed text-ink/80">Mencari aplikasi Android seharusnya sederhana: kamu ingin tahu apa fungsi sebuah aplikasi, apakah ia aman, dan dari mana mengunduhnya secara resmi. Kenyataannya, banyak situs APK justru mempersulit hal itu — halaman yang lambat dan penuh iklan, tombol unduh yang menyesatkan, deskripsi yang disalin mentah-mentah, dan klaim keamanan tanpa bukti. Pengguna yang paling dirugikan adalah mereka yang HP-nya pas-pasan dan kuotanya terbatas, karena setiap halaman berat dan setiap unduhan yang salah menghabiskan keduanya.</p>
      <p className="leading-relaxed text-ink/80">{site.name} dibangun dengan tiga janji yang bisa kamu periksa sendiri di setiap halaman: ringan, berbahasa Indonesia sepenuhnya, dan jujur soal apa yang kami ketahui dan apa yang tidak kami ketahui. Bila sebuah informasi tidak bisa kami verifikasi dari sumber resmi, kami menuliskannya sebagai belum terverifikasi — bukan mengarang angka atau klaim agar halaman terlihat meyakinkan.</p>

      <h2 className="text-xl font-bold text-ink">Kebijakan Editorial Kami</h2>
      <p className="leading-relaxed text-ink/80">Setiap deskripsi aplikasi di situs ini ditulis orisinal dari fakta yang berasal dari sumber resmi, seperti halaman Play Store dan situs penerbit aplikasi. Kami tidak menyalin deskripsi dari situs lain, dan kami tidak mengarang nomor versi, peringkat, atau tanggal rilis. Setiap halaman aplikasi menampilkan tanggal terakhir dicek oleh editor, dan halaman yang sudah lama tidak diverifikasi akan diberi penanda agar kamu tahu informasinya mungkin sudah berubah.</p>
      <p className="leading-relaxed text-ink/80">Standar kualitas kami juga berlaku untuk apa yang tidak kami terbitkan. Halaman yang tidak memenuhi standar — karena faktanya tidak bisa diverifikasi, sumbernya tidak jelas, atau aplikasinya sendiri bermasalah — tidak diterbitkan sama sekali. Kami lebih memilih katalog yang lebih kecil tetapi bisa dipercaya daripada katalog besar yang penuh halaman meragukan.</p>

      <h2 className="text-xl font-bold text-ink">Bagaimana Verifikasi Bekerja</h2>
      <p className="leading-relaxed text-ink/80">Untuk aplikasi yang berkasnya kami sediakan di perpustakaan, verifikasi mengikuti jalur yang ketat: sumber resmi didahulukan, tanda tangan digital berkas dicocokkan dengan sidik jari resmi yang terdaftar, berkas dipindai lewat beberapa mesin pemindai, dan izin-izinnya dijelaskan dengan bahasa sederhana — termasuk peringatan untuk kombinasi izin yang berbahaya. Skor keamanan hanya dihitung bila semua langkah itu lolos; berkas yang gagal di satu langkah tidak bisa diterbitkan. Kamu bisa melihat metodologi lengkapnya di halaman <Link className="font-semibold text-linkblue" href="/keamanan">Keamanan</Link>, dan angka-angka nyata soal berkas yang diterbitkan, ditolak, dan dilaporkan di halaman <Link className="font-semibold text-linkblue" href="/transparansi">Transparansi</Link>.</p>
      <p className="leading-relaxed text-ink/80">Untuk halaman info aplikasi yang tidak menyediakan berkas — yang hanya mengarah ke Play Store atau situs resmi — verifikasi berarti memeriksa fakta dari sumber resmi dan menampilkannya apa adanya, termasuk status yang kurang menyenangkan seperti aplikasi berbayar atau aplikasi yang hanya tersedia sebagai info karena tidak ada jalur unduhan resmi yang aman. Tidak ada skor keamanan yang ditampilkan untuk aplikasi yang berkasnya tidak kami periksa langsung, karena skor tanpa pemeriksaan adalah klaim kosong.</p>

      <h2 className="text-xl font-bold text-ink">Koreksi dan Masukan</h2>
      <p className="leading-relaxed text-ink/80">Kami bisa salah, dan kami ingin tahu bila itu terjadi. Bila kamu menemukan fakta yang keliru, tautan resmi yang sudah berubah, atau aplikasi yang seharusnya tidak kami rekomendasikan, ajukan koreksi melalui halaman <Link className="font-semibold text-linkblue" href="/kontak">Kontak</Link>. Koreksi yang diterima akan dicatat di halaman terkait, dan halaman yang terbukti tidak lagi memenuhi standar akan diperbaiki atau ditarik. Laporan soal berkas yang mencurigakan juga ditangani lewat jalur yang sama.</p>

      <h2 className="text-xl font-bold text-ink">Apa yang Tidak Pernah Kami Lakukan</h2>
      <p className="leading-relaxed text-ink/80">Situs ini tidak pernah menyediakan aplikasi bajakan, aplikasi modifikasi, aplikasi judi, atau aplikasi dewasa — dalam bentuk apa pun, termasuk sebagai tautan. Kami tidak mempromosikan aplikasi yang melanggar hukum Indonesia, tidak menyamarkan aplikasi berbayar sebagai gratis, dan tidak memakai tombol unduh yang menyesatkan. Bila sebuah aplikasi populer ternyata hanya tersedia lewat jalur yang tidak resmi atau melanggar hukum, halaman kami akan menjelaskannya sebagai info saja dan mengarahkanmu ke alternatif legal, bukan menyediakan berkasnya.</p>
      <p className="leading-relaxed text-ink/80">Prinsip ini juga berlaku untuk tool gratis kami: tidak ada yang meminta kata sandimu, tidak ada berkasmu yang disimpan, dan tidak ada hasil yang dikarang. Itulah standar yang kami pegang untuk setiap halaman, tool, dan berkas di situs ini.</p>

      <h2 className="text-xl font-bold text-ink">Tentang Penulis</h2>
      <div className="flex items-start gap-4">
        <Image src={author.photo} alt={author.name} width={96} height={96} className="h-24 w-24 shrink-0 rounded-full object-cover" />
        <div>
          <p className="font-bold text-ink">{author.name} — {author.role.id}</p>
          <p className="leading-relaxed text-ink/80">{author.bio.id}</p>
        </div>
      </div>
    </article>
  );
}
