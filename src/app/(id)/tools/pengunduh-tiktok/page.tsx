import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, faqJsonLd, howToJsonLd, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { hasEnTool, getEnToolPath } from "@/lib/data/i18n-en";
import { Breadcrumb, FaqAccordion } from "@/components/ui";
import TiktokTool from "@/components/TiktokTool";

const faqs = [
  { q: "Apakah pengunduh TikTok ini gratis?", a: "Ya, gratis dan tanpa akun. Tool ini didukung situs kami secara umum, bukan dengan mengunci hasil atau meminta bayaran per video. Bila suatu hari ada batas pemakaian wajar per jam, itu untuk mencegah penyalahgunaan server, bukan untuk menjual akses." },
  { q: "Kenapa pilihan tanpa watermark kadang tidak muncul?", a: "Karena kami hanya menampilkan berkas yang benar-benar disediakan sumber publik video itu. Untuk sebagian video, halaman publik TikTok menyediakan alamat unduhan tanpa watermark dari TikTok sendiri; untuk yang lain hanya versi standar. Bila tanpa watermark tidak disediakan sumbernya, kami tidak akan mengklaim sebaliknya." },
  { q: "Apakah video hasil unduhan boleh diunggah ulang?", a: "Hanya bila video itu milikmu sendiri atau pemiliknya memberimu izin. Mengunduh video orang lain untuk arsip pribadi berbeda dengan menerbitkannya kembali sebagai kontenmu - yang kedua melanggar hak cipta dan ketentuan TikTok, dan akunmu bisa dikenai sanksi oleh platform." },
  { q: "Apakah tool ini menyimpan video saya?", a: "Tidak. Saat kamu menekan tombol unduh, berkas mengalir dari server TikTok ke perangkatmu melewati server kami tanpa ditulis ke penyimpanan kami. Yang kami catat hanya metadata anonim untuk statistik dan keamanan: waktu, berhasil atau gagal, dan jenis kesalahan - tanpa link lengkapmu." },
  { q: "Kenapa video privat atau dari akun tertutup tidak bisa diproses?", a: "Karena tool ini hanya bekerja dengan data publik, sama seperti yang bisa dilihat siapa pun tanpa masuk. Video privat, hanya-teman, atau yang sudah dihapus memang tidak menyediakan data publik, dan kami tidak memakai akun, kata sandi, atau cara apa pun untuk menerobos pengaturan privasi pemiliknya." },
  { q: "Bisakah mengunduh audio TikTok saja (MP3)?", a: "Bila sumber publik videonya menyediakan aliran audio, pilihan Unduh Audio (MP3) akan tampil di hasil. Ketersediaannya mengikuti data yang disediakan TikTok untuk video itu, jadi tidak semua video menampilkannya." },
];

export const metadata: Metadata = pageMetadata({
  title: "Pengunduh Video TikTok - Gratis, Tanpa Instal Aplikasi",
  description: "Unduh video TikTok publik dari link: pratinjau, pilihan tanpa watermark bila disediakan sumbernya, dan audio MP3. Gratis, tanpa instal, tanpa akun - beserta penjelasan batasannya.",
  path: "/tools/pengunduh-tiktok",
  ...(hasEnTool("pengunduh-tiktok") ? { languages: { "id-ID": `${site.url}/tools/pengunduh-tiktok`, "en-US": `${site.url}${getEnToolPath("pengunduh-tiktok")}`, "x-default": `${site.url}/tools/pengunduh-tiktok` } } : {}),
  ogImage: "dynamic",
});

const steps = [
  "Buka aplikasi TikTok, cari video publik yang ingin kamu simpan.",
  "Ketuk tombol Bagikan, lalu pilih Salin Tautan.",
  "Kembali ke halaman ini, ketuk tombol Tempel (atau tempel manual), lalu tekan Ambil Video.",
  "Periksa pratinjaunya - judul dan kreatornya harus sesuai dengan video yang kamu maksud.",
  "Tekan pilihan unduhan yang kamu butuhkan. Berkas tersimpan di folder Unduhan HP-mu.",
];

export default function TiktokToolPage() {
  return (
    <div className="space-y-10 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Pengunduh TikTok", path: "/tools/pengunduh-tiktok" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={howToJsonLd({ title: "Pengunduh Video TikTok - Gratis, Tanpa Instal Aplikasi", path: "/tools/pengunduh-tiktok", steps })} />
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Pengunduh TikTok", path: "/tools/pengunduh-tiktok" }]} />
      <header className="text-center">
        <h1 className="text-2xl font-extrabold leading-tight text-ink sm:text-3xl">Pengunduh Video TikTok</h1>
        <p className="mx-auto mt-2 max-w-xl leading-relaxed text-ink/70">Tempel link video TikTok publik, lihat pratinjaunya, lalu unduh berkas yang disediakan sumbernya - tanpa watermark bila TikTok sendiri menyediakannya untuk video itu.</p>
      </header>

      <TiktokTool />

      <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-ink/85">
        <strong>Batasan jujur:</strong> gunakan tool ini hanya untuk video milikmu sendiri atau yang pemiliknya mengizinkan. Tool hanya memproses video <strong>publik</strong> - video privat, khusus teman, atau yang sudah dihapus tidak bisa dan tidak akan kami tembus. Kami tidak berafiliasi dengan TikTok atau ByteDance.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Cara Menggunakan di HP</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/85">
          {steps.map((s) => (<li key={s}>{s}</li>))}
        </ol>
        <p className="leading-relaxed text-ink/85">Cara ini bekerja di semua HP Android dan iPhone tanpa memasang aplikasi apa pun, jadi penyimpananmu tidak berkurang dan tidak ada aplikasi tambahan yang meminta izin aneh-aneh. Link pendek dari tombol bagikan (yang diawali vt.tiktok.com atau vm.tiktok.com) juga didukung - server kami akan mengikuti arahannya ke video aslinya.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Cara Menggunakan di PC atau Laptop</h2>
        <p className="leading-relaxed text-ink/85">Di komputer, salin alamat video dari bilah alamat browser saat video terbuka, atau dari tombol Bagikan di situs TikTok. Tempel ke kotak di atas dan prosesnya sama seperti di HP. Mengunduh lewat PC berguna bila kamu mengedit video milikmu sendiri dengan editor desktop - misalnya untuk keperluan dokumentasi, portofolio, atau cadangan konten yang kamu buat sebagai kreator.</p>
        <p className="leading-relaxed text-ink/85">Sebagai kreator, kebiasaan yang benar adalah menyimpan berkas master videomu sendiri sejak awal sebelum diunggah. Tool seperti ini adalah cadangan ketika berkas asli hilang, bukan pengganti arsip yang rapi.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Soal Tanpa Watermark: Apa yang Sebenarnya Terjadi</h2>
        <p className="leading-relaxed text-ink/85">Watermark TikTok ditambahkan platform pada berkas yang dibagikan keluar aplikasi. Untuk sebagian video, halaman publik TikTok sendiri menyediakan alamat berkas tanpa watermark - alamat yang sama yang dipakai mekanisme unduhan resmi tertentu. Tool ini memeriksa data publik video dan menampilkan pilihan tanpa watermark <em>hanya</em> bila alamat itu benar-benar ada untuk video tersebut.</p>
        <p className="leading-relaxed text-ink/85">Situs yang menjanjikan tanpa watermark untuk semua video tanpa kecuali biasanya tidak menceritakan keseluruhan gambarannya: sebagian memotong dan memperbesar video sampai watermark hilang (dan kualitas rusak), sebagian memakai sumber yang tidak jelas. Kami memilih menampilkan yang nyata: ada berarti ada, tidak ada berarti kami katakan tidak tersedia dari sumbernya.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Keamanan dan Privasi Saat Memakai Tool Ini</h2>
        <p className="leading-relaxed text-ink/85">Tool ini tidak pernah meminta kata sandi TikTok, kode verifikasi, atau pemasangan aplikasi. Situs pengunduh mana pun yang meminta kata sandimu harus langsung ditutup - kata sandi hanya boleh dimasukkan di aplikasi dan situs resmi TikTok. Di halaman ini, link yang kamu tempel dipakai server kami hanya untuk mengambil data publik video itu; berkas unduhan mengalir tanpa disimpan, dan catatan server hanya berisi metadata anonim.</p>
        <p className="leading-relaxed text-ink/85">Untuk melindungi semua pengguna, tool dibatasi jumlah pemakaiannya per jaringan dan ada tantangan hitungan sederhana bila permintaan dari jaringanmu terlalu sering. Batasan ini normal untuk layanan gratis dan akan hilang sendiri setelah jeda singkat.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Alternatif Resmi yang Perlu Kamu Tahu</h2>
        <p className="leading-relaxed text-ink/85">Untuk videomu sendiri, cara paling langsung adalah tombol Simpan video di aplikasi TikTok - berkasnya memang diberi watermark, tetapi itu berkas resmi dari akunmu. Kreator juga bisa mengunduh data dan konten akunnya lewat pengaturan TikTok. Untuk menonton ulang tanpa mengunduh, fitur favorit dan koleksi di dalam aplikasi lebih hemat penyimpanan daripada menumpuk berkas di galeri.</p>
        <p className="leading-relaxed text-ink/85">Butuh info lengkap tentang aplikasinya sendiri - izin, keamanan, dan cara mengatasi error? Baca halaman <Link className="font-semibold text-linkblue" href="/aplikasi/tiktok">info TikTok</Link> kami. Dan bila kamu sering menemukan tautan unduhan mencurigakan di luar sana, panduan <Link className="font-semibold text-linkblue" href="/panduan/cara-mengenali-apk-palsu">cara mengenali aplikasi palsu</Link> akan membantumu melindungi HP-mu.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Masalah Umum dan Solusinya</h2>
        <p className="leading-relaxed text-ink/85"><strong>Link dari tombol bagikan tidak bekerja.</strong> Pastikan link tersalin utuh tanpa terpotong, dan video masih publik. Link pendek vt.tiktok.com didukung, tetapi bila video sudah dihapus setelah link dibagikan, tidak ada tool mana pun yang bisa mengambilnya kembali - pesan kami akan menyatakan video tidak ditemukan, dan itu jawaban yang benar.</p>
        <p className="leading-relaxed text-ink/85"><strong>Unduhan berhenti di tengah.</strong> Berkas video mengalir langsung dari server TikTok; jaringan yang terputus akan memutus unduhan. Ulangi dari hasil yang sama selama sesi masih aktif (10 menit), atau proses ulang link-nya. Untuk video panjang, gunakan Wi-Fi yang stabil.</p>
        <p className="leading-relaxed text-ink/85"><strong>Diminta menjawab tantangan hitungan.</strong> Itu berarti permintaan dari jaringanmu melewati batas wajar per menit kami - umum terjadi di jaringan kantor, kampus, atau warnet yang dipakai banyak orang bersama. Jawab tantangannya dan lanjutkan; itu pengganti CAPTCHA yang ringan dan tidak melacakmu.</p>
        <p className="leading-relaxed text-ink/85"><strong>Hasil unduhan tidak bisa dibuka.</strong> Unduh ulang berkasnya sampai selesai penuh sebelum dibuka, dan gunakan pemutar video standar. Berkas yang terpotong karena koneksi akan terlihat rusak, dan itu bukan berkas yang salah dari sumbernya.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Pertanyaan Umum</h2>
        <FaqAccordion faqs={faqs} />
      </section>
    </div>
  );
}
