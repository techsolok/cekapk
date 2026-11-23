import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { AppCard } from "@/components/ui";
import { enApps } from "@/lib/data/i18n-en";
import { getApp } from "@/lib/data/apps";
import { categoryNameEn } from "@/lib/data/i18n-en-factbox";

// UI-03 Rev 1 (C3): English application discovery + search hub. The 19 apps
// with an English edition are listed here; the full 50-app catalog lives in
// the Indonesian edition (linked below). ?q= filters by name, developer,
// English tagline and English category name — this page is the English
// WebSite SearchAction destination, so it must really filter, exactly like
// the Indonesian hub. Robots.txt keeps /en/aplikasi?q= out of the index.
export const metadata: Metadata = pageMetadata({
  title: "English Android App Guides - Safety & Official Links",
  description: "English guides for 19 Android apps: honest safety notes, permissions explained, and official Google Play links. The full 50-app catalog is in Indonesian.",
  path: "/en/aplikasi",
  languages: { "id-ID": `${site.url}/aplikasi`, "en-US": `${site.url}/en/aplikasi`, "x-default": `${site.url}/aplikasi` },
});

export default async function EnAplikasiHub({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const q = ((await searchParams)?.q ?? "").trim();
  const query = q.toLowerCase();
  const catalog = enApps
    .map((en) => ({ en, base: getApp(en.slug) }))
    .filter((x): x is { en: (typeof enApps)[number]; base: NonNullable<ReturnType<typeof getApp>> } => Boolean(x.base));
  const apps = !query
    ? catalog
    : catalog.filter(({ en, base }) =>
        `${base.name} ${base.developer} ${en.taglineEn} ${categoryNameEn(base.categorySlug, base.categoryName)}`.toLowerCase().includes(query));
  return (
    <div className="space-y-6 py-8">
      <h1 className="text-2xl font-extrabold text-ink">Apps in English</h1>
      {/* UI-05 Phase D (Task A): on-page search. GET form reuses the existing
          server-side ?q= filter, which searches English-only fields (name,
          developer, English tagline, English category name) across the 19 apps
          with an English edition — no new URL scheme, no client JS, no new
          data. Robots already disallows /en/aplikasi?q=, canonical stays
          /en/aplikasi. The other 31 catalog apps are Indonesian-only and are
          not searchable here; the intro below already says so. */}
      <form method="get" action="/en/aplikasi" role="search" className="space-y-2">
        <label htmlFor="search-catalog" className="block text-sm font-semibold text-ink">Search the app catalog</label>
        <div className="flex gap-2">
          <input id="search-catalog" name="q" type="search" defaultValue={q} placeholder="Search apps… e.g. TikTok, DANA, Roblox"
            className="min-h-[52px] min-w-0 flex-1 rounded-2xl border border-ink/10 bg-paper px-4 text-base text-ink shadow-sm outline-none focus:border-primary" />
          <button type="submit" className="min-h-[52px] shrink-0 rounded-xl bg-primary px-6 font-semibold text-white shadow-sm">Search</button>
        </div>
        {query ? (
          <p><Link className="text-sm font-semibold text-linkblue" href="/en/aplikasi">Clear search</Link></p>
        ) : null}
      </form>
      {query ? (
        <p className="max-w-2xl leading-relaxed text-ink/75">
          Search results for &ldquo;{q}&rdquo;: {apps.length} {apps.length === 1 ? "app" : "apps"} found.{" "}
          <Link className="font-semibold text-linkblue" href="/en/aplikasi">Show all {catalog.length} apps</Link>
        </p>
      ) : (
        <p className="max-w-2xl leading-relaxed text-ink/75">
          Every app guide here is written by an editor, dated, and links only to official sources. The full catalog of 50 apps lives in the Indonesian edition —{" "}
          <Link className="font-semibold text-linkblue" href="/aplikasi">browse the Indonesian catalog</Link>.
        </p>
      )}
      {apps.length === 0 ? (
        <p className="rounded-2xl bg-mist p-4 text-sm leading-relaxed text-ink/75">No apps match &ldquo;{q}&rdquo;. Try another word, or <Link className="font-semibold text-linkblue" href="/en/aplikasi">see all {catalog.length} English guides</Link>.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {apps.map(({ en, base }) => (<li key={en.slug}><AppCard name={base.name} slug={base.slug} developer={base.developer} status={base.legalStatus} locale="en" /></li>))}
        </ul>
      )}
    </div>
  );
}
