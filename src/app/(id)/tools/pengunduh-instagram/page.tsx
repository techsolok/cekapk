import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { hasEnTool, getEnToolPath } from "@/lib/data/i18n-en";
import { Breadcrumb, FaqAccordion, ToolShell } from "@/components/ui";
import InstagramTool from "./InstagramTool";

const faqs = [
  { q: "Apakah tool ini meminta login Instagram?", a: "Tidak pernah. Tool ini hanya memproses konten publik dengan yt-dlp di sisi server. Kalau sebuah kiriman privat atau khusus pengikut, tool akan menjelaskannya dan berhenti - kami tidak menyediakan cara memasukkan kredensial Instagram, dan kamu jangan pernah memberikannya ke situs mana pun." },
  { q: "Format apa saja yang didukung?", a: "Kiriman video, Reels, dan IGTV publik dengan tautan berbentuk instagram.com/p/…, /reel/…, atau /tv/…. Tautan Story umumnya butuh login sehingga tidak didukung oleh design kami yang tanpa kredensial." },
  { q: "Apakah videonya tanpa watermark?", a: "Instagram tidak membakar watermark ke video asli seperti TikTok versi aplikasi, jadi file yang kamu terima adalah file asli yang diunggah pembuatnya. Kami tidak menambahkan watermark apa pun." },
  { q: "Kenapa unduhan saya gagal padahal tautannya benar?", a: "Instagram membatasi akses dari alamat IP server secara berkala. Kalau muncul pesan sumber tidak terjangkau, tunggu beberapa menit lalu coba lagi. Kami menampilkan pesan itu apa adanya, bukan menyembunyikannya." },
  { q: "Apakah tautan saya disimpan?", a: "Tidak. Kami hanya mencatat metadata anonim (jenis kejadian dan hash id) untuk statistik dan pencegahan penyalahgunaan. Tautan unduhan ditandatangani dan kedaluwarsa dalam 10 menit." },
  { q: "Bolehkah saya mengunduh video orang lain?", a: "Unduh untuk arsip pribadi umumnya berbeda dengan mengunggah ulang. Mengunggah ulang karya orang lain tanpa izin melanggar hak cipta dan ketentuan Instagram. Gunakan tool ini untuk kontenmu sendiri atau yang izinnya jelas." },
  { q: "Kenapa ada tantangan hitungan sederhana?", a: "Setelah beberapa kali percobaan gagal beruntun atau terlalu banyak permintaan, kami menampilkan tantangan aritmetika ringan untuk menahan bot. Pengguna manusia melewatinya dalam hitungan detik." },
];
const steps = [
  "Buka aplikasi Instagram dan temukan video, Reel, atau kiriman video publik yang ingin kamu simpan.",
  "Ketuk ikon bagikan (pesawat kertas), lalu pilih Salin Tautan.",
  "Tempel tautan itu ke kotak di halaman ini lalu tekan Ambil Info Video.",
  "Lihat pratinjau dan keterangan pemiliknya untuk memastikan itu video yang benar.",
  "Tekan Unduh Video. File MP4 asli dari server Instagram akan mengalir lewat server kami tanpa disimpan.",
  "Gunakan file hanya sesuai haknya: arsip pribadi dan konten milikmu sendiri adalah penggunaan yang aman.",
];
export const metadata: Metadata = pageMetadata({ title: "Pengunduh Video Instagram - Reel & Video Publik Tanpa Login", description: "Unduh video dan Reels Instagram publik sebagai MP4 asli lewat server kami. Tanpa login, tanpa watermark tambahan, dengan pratinjau resmi dan pesan kesalahan yang jujur.", path: "/tools/pengunduh-instagram", ...(hasEnTool("pengunduh-instagram") ? { languages: { "id-ID": `${site.url}/tools/pengunduh-instagram`, "en-US": `${site.url}${getEnToolPath("pengunduh-instagram")}`, "x-default": `${site.url}/tools/pengunduh-instagram` } } : {}), ogImage: "dynamic" });
export default function InstagramToolPage() {
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Pengunduh Instagram", path: "/tools/pengunduh-instagram" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={howToJsonLd({ title: "Pengunduh Video Instagram - Reel & Video Publik Tanpa Login", path: "/tools/pengunduh-instagram", steps })} />
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Pengunduh Instagram", path: "/tools/pengunduh-instagram" }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Pengunduh Video Instagram</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Tempel tautan kiriman, Reel, atau video Instagram yang bersifat publik, lihat pratinjau resminya, lalu unduh file MP4 aslinya. Tool ini tidak pernah meminta login Instagram-mu - kalau sebuah konten tidak publik, kami akan mengatakannya terus terang.</p>
      </header>
      <ToolShell title="Pengunduh Instagram">
        <InstagramTool />
      </ToolShell>
      <section aria-label="Cara memakai" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Cara Memakai Pengunduh Instagram Ini</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/80">{steps.map((s) => (<li key={s}>{s}</li>))}</ol>
      </section>
      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Kenapa Tool Ini Dibuat Berbeda</h2>
        <p>Banyak situs pengunduh Instagram menampilkan formulir login palsu atau meminta kata sandimu. Itu berbahaya dan tidak pernah diperlukan untuk konten publik. Tool ini bekerja seperti proyek Insta Grab yang menjadi pola desainnya: ekstraksi berjalan di server dengan yt-dlp, tanpa kredensial pengunjung sama sekali. Bila Instagram membatasi akses dari server, kamu menerima pesan yang menjelaskan hal itu, bukan iklan yang menipu atau tombol unduh palsu.</p>
        <p>Video dialirkan langsung dari CDN Instagram lewat server kami dalam satu permintaan yang sama, ditandatangani token yang kedaluwarsa dalam 10 menit. Kami tidak menyimpan file video, tidak menyimpan tautan lengkapmu, dan hanya mencatat metadata anonim untuk menahan penyalahgunaan. Hasilnya adalah file asli persis seperti yang diunggah pembuatnya.</p>
        <p>Ingat bahwa kemudahan mengunduh bukan izin mengunggah ulang. Karya kreator dilindungi hak cipta; simpan untuk arsip pribadi dan minta izin sebelum memakai ulang karya siapa pun.</p>
      </section>
      <section aria-label="Pertanyaan umum" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Pertanyaan yang Sering Diajukan</h2>
        <FaqAccordion faqs={faqs} />
      </section>
      <section className="rounded-2xl bg-primary-soft p-5">
        <h2 className="font-bold text-ink">Tool berikutnya: Pengunduh TikTok</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink/80">Butuh menyimpan video TikTok tanpa watermark? Tool TikTok kami memakai pola keamanan yang sama.</p>
        <Link href="/tools/pengunduh-tiktok" className="mt-2 inline-flex min-h-[44px] items-center font-semibold text-linkblue">Buka Pengunduh TikTok →</Link>
      </section>
    </div>
  );
}
