import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Kontak", description: `Hubungi tim ${site.name}: pertanyaan, koreksi, laporan keamanan, dan DMCA.`, path: "/kontak", languages: { "id-ID": "/kontak", "en-US": "/en/contact", "x-default": "/kontak" }, locale: "id_ID" });
export default function KontakPage() {
  return (
    <div className="space-y-4 py-8">
      <h1 className="text-2xl font-extrabold text-ink">Kontak</h1>
      <p className="leading-relaxed text-ink/80">Untuk pertanyaan umum dan koreksi konten: <a className="font-semibold text-linkblue" href={`mailto:${site.emailKontak}`}>{site.emailKontak}</a></p>
      <p className="leading-relaxed text-ink/80">Untuk klaim hak cipta (DMCA) dan laporan keamanan APK: <a className="font-semibold text-linkblue" href={`mailto:${site.emailDmca}`}>{site.emailDmca}</a> - target peninjauan 2 hari kerja.</p>
      <p className="text-sm text-muted">Kedua alamat email di atas aktif dan dipantau. Email percobaan ke {site.emailKontak} sudah diterima (5 November 2026). Bila emailmu tidak dibalas dalam 2 hari kerja, silakan kirim ulang dengan subjek yang sama.</p>
    </div>
  );
}
