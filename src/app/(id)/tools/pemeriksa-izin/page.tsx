import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { hasEnTool, getEnToolPath } from "@/lib/data/i18n-en";
import { Breadcrumb, FaqAccordion, ToolShell } from "@/components/ui";
import PermissionChecker from "./PermissionChecker";

const faqs = [
  { q: "Dari mana tangkapan layar yang paling bagus untuk tool ini?", a: "Halaman Izin di Pengaturan Android: buka Pengaturan → Aplikasi → pilih aplikasinya → Izin. Di sana semua izin yang diberikan dan ditolak terlihat dalam teks yang jelas, sehingga pembacaan OCR akurat. Tangkapan dari halaman Play Store bagian 'Izin aplikasi' juga bisa." },
  { q: "Apakah tangkapan layar saya disimpan?", a: "Tidak. Gambar ditulis ke berkas sementara di server hanya selama proses OCR berjalan (hitungan detik), lalu dihapus. Kami hanya mencatat metadata anonim: berapa izin ditemukan dan berapa yang berisiko tinggi - tanpa isi gambar dan tanpa nama aplikasinya." },
  { q: "Kenapa ada izin yang tidak terdeteksi padahal aplikasinya memintanya?", a: "OCR membaca apa yang terlihat di tangkapan. Izin yang tidak tampil di layar (halaman belum digulir, teks terpotong, resolusi rendah) tidak akan terbaca. Tool ini alat bantu cepat, bukan pengganti pembacaan manual yang teliti." },
  { q: "Izin mana yang paling berbahaya?", a: "Membaca/mengirim SMS (jalur pencurian OTP), memasang aplikasi lain dari luar Play Store, tampil di atas aplikasi lain, dan layanan aksesibilitas. Kombinasi beberapa izin tinggi pada aplikasi sederhana adalah tanda bahaya paling jelas." },
  { q: "Apa yang harus saya lakukan bila menemukan izin mencurigakan?", a: "Cabut izinnya dari Pengaturan → Aplikasi → Izin. Bila aplikasi berasal dari luar Play Store dan meminta izin SMS/instal/aksesibilitas, pilihan teraman adalah menghapus aplikasinya dan mengganti kata sandi penting bila OTP pernah terbaca." },
];
export const metadata: Metadata = pageMetadata({ title: "Pemeriksa Izin Aplikasi dari Tangkapan Layar - Cek Risiko Izin Android", description: "Unggah tangkapan layar daftar izin sebuah aplikasi; tool ini membaca izinnya dan menjelaskan mana yang berisiko tinggi, sedang, atau rendah dalam Bahasa Indonesia yang sederhana.", path: "/tools/pemeriksa-izin", ...(hasEnTool("pemeriksa-izin") ? { languages: { "id-ID": `${site.url}/tools/pemeriksa-izin`, "en-US": `${site.url}${getEnToolPath("pemeriksa-izin")}`, "x-default": `${site.url}/tools/pemeriksa-izin` } } : {}), ogImage: "dynamic" });
const steps = [
  "Buka Pengaturan → Aplikasi, pilih aplikasinya, lalu buka Izin, dan ambil tangkapan layar daftarnya.",
  "Unggah tangkapan layar itu di halaman ini.",
  "Tekan Periksa Izin Ini dan tunggu beberapa detik.",
  "Baca tingkat risiko tiap izin, sarannya, dan peringatan kombinasinya.",
];
export default function PermissionToolPage() {
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Pemeriksa Izin", path: "/tools/pemeriksa-izin" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={howToJsonLd({ title: "Pemeriksa Izin Aplikasi dari Tangkapan Layar - Cek Risiko Izin Android", path: "/tools/pemeriksa-izin", steps })} />
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Tools", path: "/tools" }, { name: "Pemeriksa Izin", path: "/tools/pemeriksa-izin" }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Pemeriksa Izin Aplikasi</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Sebagian besar penipuan APK tidak menyerang lewat kode yang rumit, tetapi lewat izin yang kamu berikan sendiri. Unggah tangkapan layar daftar izin sebuah aplikasi, dan tool ini akan membacanya lalu menjelaskan risikonya satu per satu dalam bahasa yang sederhana.</p>
      </header>
      <ToolShell title="Pemeriksa Izin"><PermissionChecker /></ToolShell>
      <section aria-label="Cara menggunakan" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Cara Menggunakan Pemeriksa Izin</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/80">{steps.map((s) => (<li key={s}>{s}</li>))}</ol>
      </section>
      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Cara Membaca Hasilnya</h2>
        <p>Izin berlabel <strong>risiko tinggi</strong> memberi aplikasi kekuasaan besar atas HP dan datamu: membaca SMS berisi OTP, memasang aplikasi lain, menggambar di atas aplikasi lain, atau mengendalikan layar lewat aksesibilitas. Izin seperti ini kadang sah untuk aplikasi yang tepat - aplikasi SMS memang butuh SMS - tetapi hampir tidak pernah sah untuk senter, wallpaper, game kasual, atau aplikasi "pembersih".</p>
        <p>Izin <strong>risiko sedang</strong> bersifat kontekstual: tanyakan selalu "apakah fitur utama aplikasi ini masuk akal tanpa izin itu?" Peta tanpa lokasi tidak berfungsi; aplikasi resep masakan dengan lokasi presisi patut dipertanyakan. Izin <strong>risiko rendah</strong> adalah izin umum seperti internet dan notifikasi yang dimiliki hampir semua aplikasi modern.</p>
        <p>Yang paling penting bukan satu izin, melainkan kombinasinya. SMS ditambah izin memasang aplikasi adalah pola unduhan penipuan klasik; overlay ditambah aksesibilitas adalah pola iklan paksa dan tombol palsu. Tool ini menandai kombinasi berbahaya itu secara khusus di bagian peringatan.</p>
      </section>
      <section aria-label="Pertanyaan umum" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Pertanyaan yang Sering Diajukan</h2>
        <FaqAccordion faqs={faqs} />
      </section>
    </div>
  );
}
