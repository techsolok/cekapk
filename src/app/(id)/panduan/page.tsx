import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { guides } from "@/lib/data/guides";
export const metadata: Metadata = pageMetadata({ title: "Panduan Aplikasi & Keamanan APK", description: "Panduan Bahasa Indonesia: apa itu APK hijau dan ijo, cara instal aplikasi dengan aman, cara cek izin aplikasi, dan cara mengenali APK palsu.", path: "/panduan" });
const typeLabel: Record<string, string> = { howto: "Cara", explainer: "Penjelasan", safety: "Keamanan" };
export default function PanduanHub() {
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-2xl font-extrabold text-ink">Panduan</h1>
        <p className="mt-2 text-sm text-muted">Ikuti panduan baru lewat <a className="font-semibold text-linkblue" href="/panduan/feed.xml">RSS feed panduan</a>.</p>
      <p className="max-w-2xl leading-relaxed text-ink/75">Penjelasan jujur dan langkah praktis seputar aplikasi Android dan keamanan APK - ditulis untuk pengguna Indonesia, tanpa tombol palsu dan tanpa menakut-nakuti.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/panduan/${g.slug}`} className="block h-full rounded-2xl border border-mist bg-paper p-4 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary-dark">{typeLabel[g.type]}</span>
              <span className="mt-1 block font-semibold leading-snug text-ink">{g.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink/65">{g.metaDescription}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
