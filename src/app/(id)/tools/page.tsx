import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import { FaqAccordion } from "@/components/ui";
import { Icon, type IconName } from "@/components/home";

export const metadata: Metadata = pageMetadata({ title: "Tools Gratis: Unduh TikTok & Instagram, Cek Izin", description: "Tool online gratis: unduh video TikTok tanpa watermark, unduh video Instagram publik, dan cek risiko izin aplikasi. Tanpa login, tanpa simpan file.", path: "/tools" });

const tools: { href: string; title: string; desc: string; icon: IconName }[] = [
  { href: "/tools/pengunduh-tiktok", title: "Pengunduh Video TikTok", desc: "Unduh video TikTok publik tanpa watermark atau sebagai audio. Diverifikasi ujung ke ujung dengan video asli, pesan kesalahan jujur untuk tautan privat dan tidak ditemukan.", icon: "download" },
  { href: "/tools/pengunduh-instagram", title: "Pengunduh Video Instagram", desc: "Unduh video dan Reels Instagram publik sebagai MP4 asli. Tanpa login, tanpa watermark tambahan, memakai pola yang sama dengan proyek Insta Grab.", icon: "camera" },
  { href: "/tools/pemeriksa-izin", title: "Pemeriksa Izin Aplikasi", desc: "Unggah tangkapan layar daftar izin sebuah aplikasi; tool membacanya dan menjelaskan risiko tiap izin - termasuk kombinasi berbahaya pencuri OTP.", icon: "shield" },
];

const faqs = [
  { q: "Apakah tool di CekAPK gratis dan perlu login?", a: "Gratis dan tanpa login. Ketiga tool di halaman ini bisa dipakai langsung dari browser tanpa akun, tanpa kata sandi, dan tanpa memasang aplikasi apa pun." },
  { q: "Apakah berkas atau tangkapan layar saya disimpan?", a: "Tidak. Berkas unduhan mengalir dari server sumber ke perangkatmu tanpa ditulis ke penyimpanan kami, dan tangkapan layar untuk Pemeriksa Izin hanya dipakai selama proses pembacaan berlangsung lalu dihapus. Yang kami catat hanya metadata anonim untuk statistik dan keamanan." },
  { q: "Kenapa ada video yang tidak bisa diunduh?", a: "Karena tool ini hanya memproses konten publik. Video privat, khusus teman, atau yang sudah dihapus tidak menyediakan data publik, dan kami tidak memakai akun atau cara apa pun untuk menerobos pengaturan privasi pemiliknya. Bila itu yang terjadi, pesan kesalahan akan menjelaskannya apa adanya." },
];

export default function ToolsHubPage() {
  return (
    <div className="space-y-6 py-8">
      <JsonLd data={faqJsonLd(faqs)} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Tools Online Gratis</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Semua tool memakai pola yang sama: tanpa login, tanpa menyimpan berkas pengguna, dan pesan kesalahan yang menjelaskan keadaan apa adanya. Tool adalah pilar pertama situs ini di samping info aplikasi dan keamanan.</p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="block h-full rounded-2xl border border-mist bg-paper p-5 shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary-dark"><Icon name={t.icon} className="h-5 w-5" /></span>
              <span className="mt-3 block text-lg font-bold text-ink">{t.title}</span>
              <span className="mt-1 block leading-relaxed text-ink/75">{t.desc}</span>
              <span className="mt-3 inline-flex min-h-[44px] items-center rounded-xl bg-primary px-4 font-semibold text-white">Buka Tool</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Pengunduh Video TikTok</h2>
        <p className="leading-relaxed text-ink/75">Tool ini mengambil video TikTok publik dari tautannya: kamu melihat pratinjau resmi video itu, lalu mengunduh berkas yang disediakan sumbernya — tanpa watermark bila TikTok sendiri menyediakannya untuk video tersebut, atau sebagai audio bila aliran audionya tersedia. Tool ini tidak pernah meminta kata sandi TikTok atau akses akunmu, dan tidak berafiliasi dengan TikTok.</p>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/75">
          <li>Buka aplikasi TikTok, cari video publik yang ingin kamu simpan, ketuk Bagikan, lalu pilih Salin Tautan.</li>
          <li>Tempel tautan itu ke kotak di halaman <Link className="font-semibold text-linkblue" href="/tools/pengunduh-tiktok">Pengunduh Video TikTok</Link> dan tekan Ambil Video.</li>
          <li>Periksa pratinjaunya — judul dan kreatornya harus sesuai — lalu tekan pilihan unduhan yang kamu butuhkan.</li>
        </ol>
        <p className="leading-relaxed text-ink/75"><strong>Batasan dan keamanan:</strong> tool hanya memproses video publik. Video privat, khusus teman, atau yang sudah dihapus akan ditolak dengan pesan yang jujur, misalnya tautan privat atau tautan tidak ditemukan — kami tidak akan mengarang hasil. Berkas unduhan mengalir tanpa disimpan di server kami, dan catatan server hanya berisi metadata anonim. Gunakan tool ini untuk videomu sendiri atau video yang pemiliknya mengizinkan; mengunggah ulang karya orang lain tanpa izin melanggar hak cipta.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Pengunduh Video Instagram</h2>
        <p className="leading-relaxed text-ink/75">Tool ini mengunduh video dan Reels Instagram publik sebagai berkas MP4 asli dari server Instagram. Karena Instagram tidak membakar watermark ke video asli seperti TikTok versi aplikasi, berkas yang kamu terima adalah berkas asli yang diunggah pembuatnya, tanpa watermark tambahan dari kami. Tool ini tidak pernah meminta login Instagram-mu.</p>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/75">
          <li>Buka aplikasi Instagram, temukan video atau Reel publik, ketuk ikon bagikan, lalu pilih Salin Tautan.</li>
          <li>Tempel tautan itu ke kotak di halaman <Link className="font-semibold text-linkblue" href="/tools/pengunduh-instagram">Pengunduh Video Instagram</Link> dan tekan Ambil Info Video.</li>
          <li>Periksa pratinjau dan keterangan pemiliknya, lalu tekan Unduh Video untuk menyimpan berkas MP4-nya.</li>
        </ol>
        <p className="leading-relaxed text-ink/75"><strong>Batasan dan keamanan:</strong> hanya kiriman video, Reels, dan video publik yang didukung; konten privat atau khusus pengikut tidak bisa diproses tanpa login, dan kami tidak menyediakan cara memasukkan kredensial Instagram — jangan pernah memberikannya ke situs mana pun. Bila Instagram membatasi akses dari server kami, tool akan menampilkan pesan sumber tidak terjangkau apa adanya; tunggu beberapa menit lalu coba lagi. Tautan unduhan ditandatangani dan kedaluwarsa dalam 10 menit.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Pemeriksa Izin Aplikasi</h2>
        <p className="leading-relaxed text-ink/75">Sebagian besar penipuan APK tidak menyerang lewat kode yang rumit, tetapi lewat izin yang kamu berikan sendiri. Tool ini membaca tangkapan layar daftar izin sebuah aplikasi dengan teknologi OCR Bahasa Indonesia dan Inggris, lalu menjelaskan risiko tiap izin dalam bahasa yang sederhana: mana yang berisiko tinggi, sedang, atau rendah, dan saran apa yang sebaiknya kamu lakukan.</p>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/75">
          <li>Buka Pengaturan HP Android-mu, masuk ke Aplikasi, pilih aplikasinya, lalu buka halaman Izin dan ambil tangkapan layarnya.</li>
          <li>Unggah tangkapan layar itu di halaman <Link className="font-semibold text-linkblue" href="/tools/pemeriksa-izin">Pemeriksa Izin Aplikasi</Link>.</li>
          <li>Baca hasilnya izin per izin, dan perhatikan bagian peringatan bila ada kombinasi berbahaya.</li>
        </ol>
        <p className="leading-relaxed text-ink/75"><strong>Batasan dan keamanan:</strong> gambar hanya ditulis ke berkas sementara selama proses pembacaan berlangsung (hitungan detik) lalu dihapus; kami tidak menyimpan isi gambar maupun nama aplikasinya. Pembacaan juga hanya seakurat tangkapan layarnya — izin yang tidak tampil di layar karena belum digulir atau teksnya terpotong tidak akan terbaca, jadi tool ini adalah alat bantu cepat, bukan pengganti pembacaan manual yang teliti. Yang paling penting adalah kombinasi izinnya: SMS ditambah izin memasang aplikasi adalah pola unduhan penipuan klasik, sementara overlay ditambah aksesibilitas adalah pola iklan paksa dan tombol palsu — keduanya dipakai pencuri OTP, dan tool ini menandainya secara khusus.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Pertanyaan Umum</h2>
        <FaqAccordion faqs={faqs} />
      </section>
    </div>
  );
}
