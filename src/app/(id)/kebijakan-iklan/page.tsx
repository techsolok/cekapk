import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Kebijakan Iklan & Konten Bersponsor", description: "Bagaimana CekAPK menangani konten bersponsor, postingan berbayar, dan iklan — diberi label jelas dan independen secara editorial.", path: "/kebijakan-iklan", languages: { "id-ID": "/kebijakan-iklan", "en-US": "/en/advertising-policy", "x-default": "/kebijakan-iklan" }, locale: "id_ID" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">Kebijakan Iklan &amp; Konten Bersponsor</h1>
      <p className="text-sm text-muted">Terakhir diperbarui: 8 November 2026 - Berlaku untuk {site.name}.</p>
      <p className="leading-relaxed text-ink/80">{site.name} saat ini tidak menjalankan postingan bersponsor dan tidak menampilkan iklan berbayar. Kebijakan ini menjelaskan bagaimana konten bersponsor dan iklan akan ditangani bila diperkenalkan di masa mendatang, agar pembaca mengetahui aturannya sejak awal.</p>

      <h2 className="text-lg font-bold text-ink">Identifikasi yang Jelas</h2>
      <p className="leading-relaxed text-ink/80">Setiap artikel bersponsor, penempatan berbayar, atau iklan akan diidentifikasi dengan jelas sebagai bersponsor atau sebagai iklan, dengan cara yang tidak mungkin terlewat oleh pembaca. Konten bersponsor tidak akan pernah disajikan seolah-olah itu artikel editorial biasa.</p>

      <h2 className="text-lg font-bold text-ink">Konten Bersponsor Bukan Opini Editorial</h2>
      <p className="leading-relaxed text-ink/80">Konten berbayar tidak otomatis mewakili opini editorial {site.name}. Artikel bersponsor mencerminkan pesan pengiklan, dan akan diberi label demikian; panduan, ulasan, dan penilaian keamanan kami ditulis secara independen dan tidak diperjualbelikan.</p>

      <h2 className="text-lg font-bold text-ink">Ulasan dan Skor Keamanan Tidak Bisa Dibeli</h2>
      <p className="leading-relaxed text-ink/80">Pengiklan tidak dapat membeli ulasan positif yang dijamin, liputan yang menguntungkan, atau skor keamanan. Deskripsi aplikasi ditulis dari sumber resmi, dan skor keamanan hanya dihitung dari pipeline verifikasi kami. Tidak ada pembayaran yang mengubah peringkat, skor, atau rekomendasi atas sebuah aplikasi.</p>

      <h2 className="text-lg font-bold text-ink">Hubungan Afiliasi</h2>
      <p className="leading-relaxed text-ink/80">Bila hubungan afiliasi diperkenalkan — tautan yang memberi komisi kepada {site.name} saat pembaca membeli sesuatu — hal itu akan diungkapkan dengan jelas di halaman tempat tautan itu muncul dan di kebijakan ini. Saat ini kami tidak memakai tautan afiliasi.</p>

      <h2 className="text-lg font-bold text-ink">Tautan Bersponsor</h2>
      <p className="leading-relaxed text-ink/80">Tautan bersponsor akan memakai atribut tautan yang sesuai, termasuk rel=&quot;sponsored&quot; bila berlaku, agar mesin pencari dan pembaca dapat membedakan tautan berbayar dari tautan editorial.</p>

      <h2 className="text-lg font-bold text-ink">Apa yang Tidak Akan Kami Terima</h2>
      <p className="leading-relaxed text-ink/80">{site.name} berhak menolak promosi apa pun yang tidak aman, menyesatkan, ilegal, atau tidak relevan bagi pembaca kami — termasuk perangkat lunak bajakan, judi, konten dewasa, dan produk yang bertentangan dengan misi keamanan kami. Kami dapat menolak sponsorship dengan alasan apa pun, tanpa penjelasan.</p>

      <h2 className="text-lg font-bold text-ink">Independensi Editorial dan Kepercayaan Pembaca</h2>
      <p className="leading-relaxed text-ink/80">Independensi editorial dan kepercayaan pembaca lebih penting daripada pendapatan iklan. Bila sebuah sponsorship mengharuskan kami mengubah penilaian yang jujur, menyembunyikan risiko, atau menyesatkan pembaca, kami tidak akan menerimanya. Pertanyaan tentang iklan atau sponsorship dapat dikirim ke {site.emailKontak}.</p>
    </article>
  );
}
