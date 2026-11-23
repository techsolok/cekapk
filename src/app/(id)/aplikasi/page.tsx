import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { AppCard } from "@/components/ui";
import { pillarApps } from "@/lib/data/apps";
import { searchAliases } from "@/lib/data/aliases";
// UI-03 Rev 1: reciprocal hreflang — the English hub /en/aplikasi is the
// en-US alternate of this page (its own metadata declares the reverse).
export const metadata: Metadata = pageMetadata({ title: "Katalog Aplikasi Android - Info & Link Resmi", description: "Katalog info aplikasi Android dalam Bahasa Indonesia: fakta terverifikasi, izin dijelaskan, penilaian keamanan jujur, dan tombol ke sumber resmi.", path: "/aplikasi", languages: { "id-ID": `${site.url}/aplikasi`, "en-US": `${site.url}/en/aplikasi`, "x-default": `${site.url}/aplikasi` } });
// SEO-15: /aplikasi?q= adalah target SearchAction di schema WebSite, jadi harus
// benar-benar mengembalikan hasil pencarian — bukan seluruh katalog tanpa filter.
// Robots.txt tetap melarang crawl /aplikasi?q= agar URL parameter tidak terindeks.
export default async function AplikasiHub({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const q = ((await searchParams)?.q ?? "").trim();
  const query = q.toLowerCase();
  const aliasSlug = query ? searchAliases[query] : undefined;
  const apps = !query
    ? pillarApps
    : pillarApps.filter((a) => aliasSlug === a.slug || `${a.name} ${a.developer} ${a.tagline} ${a.categoryName}`.toLowerCase().includes(query));
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-2xl font-extrabold text-ink">Katalog Aplikasi</h1>
      {/* UI-05 Phase D (Task A): on-page search. GET form reuses the existing
          server-side ?q= filter (name, developer, tagline, category + aliases)
          — no new URL scheme, no client JS, no new data. Robots already
          disallows /aplikasi?q=, canonical stays /aplikasi. */}
      <form method="get" action="/aplikasi" role="search" className="space-y-2">
        <label htmlFor="cari-katalog" className="block text-sm font-semibold text-ink">Cari aplikasi di katalog</label>
        <div className="flex gap-2">
          <input id="cari-katalog" name="q" type="search" defaultValue={q} placeholder="Cari aplikasi… misalnya TikTok, DANA, Roblox"
            className="min-h-[52px] min-w-0 flex-1 rounded-2xl border border-ink/10 bg-paper px-4 text-base text-ink shadow-sm outline-none focus:border-primary" />
          <button type="submit" className="min-h-[52px] shrink-0 rounded-xl bg-primary px-6 font-semibold text-white shadow-sm">Cari</button>
        </div>
        {query ? (
          <p><Link className="text-sm font-semibold text-linkblue" href="/aplikasi">Bersihkan pencarian</Link></p>
        ) : null}
      </form>
      {query ? (
        <p className="max-w-2xl leading-relaxed text-ink/75">
          Hasil pencarian untuk &ldquo;{q}&rdquo;: {apps.length} aplikasi ditemukan.{" "}
          <Link className="font-semibold text-linkblue" href="/aplikasi">Tampilkan semua {pillarApps.length} aplikasi</Link>
        </p>
      ) : (
        <p className="max-w-2xl leading-relaxed text-ink/75">Setiap halaman aplikasi di sini ditulis editor, dicek tanggalnya, dan hanya menautkan ke sumber resmi. Aplikasi berbayar dan tidak resmi kami sajikan sebagai info jujur plus alternatif legal - bukan unduhan.</p>
      )}
      {apps.length === 0 ? (
        <p className="rounded-2xl bg-mist p-4 text-sm leading-relaxed text-ink/75">Tidak ada aplikasi yang cocok dengan &ldquo;{q}&rdquo;. Coba kata lain, atau <Link className="font-semibold text-linkblue" href="/aplikasi">lihat seluruh katalog</Link>.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {apps.map((a) => (<li key={a.slug}><AppCard name={a.name} slug={a.slug} developer={a.developer} status={a.legalStatus} /></li>))}
        </ul>
      )}
    </div>
  );
}
