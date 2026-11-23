import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { comparisons } from "@/lib/data/comparisons";
export const metadata: Metadata = pageMetadata({ title: "Perbandingan Aplikasi - Data Nyata, Bukan Tebakan", description: "Perbandingan dua aplikasi populer berdasarkan fakta yang bisa diverifikasi: fitur, privasi, batas file, dan kecocokan untuk kebutuhanmu.", path: "/bandingkan" });
export default function CompareHubPage() {
  return (
    <div className="space-y-6 py-8">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Perbandingan Aplikasi</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Setiap perbandingan ditulis editor kami dari data kedua aplikasi, dengan pemenang per aspek dan rekomendasi jujur berdasarkan kebutuhan - bukan skor karangan.</p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {comparisons.map((c) => (
          <li key={c.slug}>
            <Link href={`/bandingkan/${c.slug}`} className="block h-full rounded-2xl border border-mist bg-paper p-4 shadow-sm">
              <span className="font-semibold text-ink">{c.aName} vs {c.bName}</span>
              <span className="mt-1 block text-sm text-ink/65">{c.title}</span>
              <span className="mt-1 block text-xs text-muted">Terakhir dicek {c.verifiedAt}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
