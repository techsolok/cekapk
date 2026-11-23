import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Disclaimer", description: `Batasan tanggung jawab dan pernyataan afiliasi ${site.name}.`, path: "/disclaimer" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">Disclaimer</h1>
      <p className="text-sm text-muted">Terakhir diperbarui: 18 Oktober 2026 - Berlaku untuk {site.name}.</p>
      <p className="leading-relaxed text-ink/80">Semua merek, nama aplikasi, dan logo adalah milik pemiliknya masing-masing. {site.name} tidak berafiliasi dengan Google, TikTok/ByteDance, Mojang/Microsoft, Meta, atau developer aplikasi mana pun kecuali dinyatakan secara tertulis.</p>
      <p className="leading-relaxed text-ink/80">Informasi versi, ukuran, dan harga berasal dari sumber resmi dan diverifikasi pada tanggal yang tertera di setiap halaman; developer dapat mengubahnya tanpa pemberitahuan. Skor keamanan adalah penilaian berbasis proses verifikasi kami, bukan jaminan mutlak.</p>
      <p className="leading-relaxed text-ink/80">Artikel penjelasan tentang istilah viral bersifat informatif untuk keselamatan pengguna dan bukan promosi atas aplikasi atau layanan yang dibahas.</p>
    </article>
  );
}
