import Link from "next/link";
import Image from "next/image";
import { author } from "@/lib/data/author";
// Komponen design system - PRD 9.2 (dibangun sekali, dipakai semua halaman)
export function TrustBadge({ status, locale = "id" }: { status: "play_store" | "open_source" | "developer_direct" | "info_only"; locale?: "id" | "en" }) {
  // UI-03 Rev 1: English labels for the EN edition (same statuses, same colours).
  const map = locale === "en" ? {
    play_store: { label: "Official on Google Play", cls: "bg-primary-soft text-primary-dark" },
    open_source: { label: "Open Source", cls: "bg-primary-soft text-primary-dark" },
    developer_direct: { label: "Official developer source", cls: "bg-primary-soft text-primary-dark" },
    info_only: { label: "Info only — not hosted here", cls: "bg-amber-100 text-warn" },
  } as const : {
    play_store: { label: "Resmi di Play Store", cls: "bg-primary-soft text-primary-dark" },
    open_source: { label: "Open-Source", cls: "bg-primary-soft text-primary-dark" },
    developer_direct: { label: "Sumber Developer Resmi", cls: "bg-primary-soft text-primary-dark" },
    info_only: { label: "Info Saja - Tidak Kami Host", cls: "bg-amber-100 text-warn" },
  } as const;
  const m = map[status];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${m.cls}`}>{m.label}</span>;
}
export function SafetyScore({ score, locale = "id" }: { score: number | null; locale?: "id" | "en" }) {
  if (score === null) return <p className="text-sm text-ink/70">{locale === "en" ? "Not verified — we don't host this file. Always download from the official source." : "Belum diverifikasi - kami tidak menyediakan file ini. Selalu unduh dari sumber resmi."}</p>;
  return (
    <div aria-label={`Skor keamanan ${score} dari 100`}>
      <p className="text-2xl font-bold text-ink">{score}<span className="text-sm font-medium text-muted">/100</span></p>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-mist" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-primary" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
export function OfficialButton({ href, label }: { href: string; label: string }) {
  return <a href={href} target="_blank" rel="noopener" className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-5 font-semibold text-white">{label}</a>;
}
export function AppCard({ name, slug, developer, status, locale = "id" }: { name: string; slug: string; developer: string; status: "play_store" | "open_source" | "developer_direct" | "info_only"; locale?: "id" | "en" }) {
  // UI-03 Rev 1: locale-aware href (EN cards link to /en/aplikasi/[slug]);
  // the tile shows the app's initial letter (UI-02 pattern) instead of an emoji.
  return (
    <Link href={locale === "en" ? `/en/aplikasi/${slug}` : `/aplikasi/${slug}`} className="flex items-center gap-3 rounded-2xl border border-mist bg-paper p-3 shadow-sm">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-xl font-extrabold text-primary-dark" aria-hidden>{name.charAt(0).toUpperCase()}</span>
      <span className="min-w-0">
        <span className="block truncate font-semibold text-ink">{name}</span>
        <span className="block truncate text-xs text-muted">{developer}</span>
        <span className="mt-1 block"><TrustBadge status={status} locale={locale} /></span>
      </span>
    </Link>
  );
}
export function Breadcrumb({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1 ? <span aria-current="page" className="font-medium text-ink">{it.name}</span> : <Link href={it.path} className="hover:text-primary-dark">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-mist rounded-2xl border border-mist">
      {faqs.map((f) => (
        <details key={f.q} className="group p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-ink">
            <span>{f.q}</span>
            <svg className="h-5 w-5 shrink-0 text-ink/50 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </summary>
          <p className="mt-2 leading-relaxed text-ink/75">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

// FactBox - kotak fakta cepat PRD 7.2 langkah 2
export function FactBox({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-mist bg-mist sm:grid-cols-3">
      {rows.map((r) => (
        <div key={r.label} className="bg-paper p-3">
          <dt className="text-xs font-medium text-muted">{r.label}</dt>
          <dd className="mt-0.5 text-sm font-semibold text-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function RelatedApps({ apps, locale = "id" }: { apps: { name: string; slug: string; developer: string; status: "play_store" | "open_source" | "developer_direct" | "info_only" }[]; locale?: "id" | "en" }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {apps.map((a) => (<li key={a.slug}><AppCard name={a.name} slug={a.slug} developer={a.developer} status={a.status} locale={locale} /></li>))}
    </ul>
  );
}
// DownloadInterstitial - komponen design system PRD 9.2 (dipakai Library Legal di Fase 4, FR-DL-01)
export function DownloadInterstitial({ fileName, version, size, sha256 }: { fileName: string; version: string; size: string; sha256: string }) {
  return (
    <div className="rounded-2xl border border-mist p-4">
      <p className="font-semibold text-ink">Unduh {fileName}</p>
      <dl className="mt-2 space-y-1 text-sm text-ink/75">
        <div className="flex gap-2"><dt className="font-medium">Versi:</dt><dd>{version}</dd></div>
        <div className="flex gap-2"><dt className="font-medium">Ukuran:</dt><dd>{size}</dd></div>
        <div className="flex gap-2 break-all"><dt className="font-medium">SHA-256:</dt><dd className="font-mono text-xs">{sha256}</dd></div>
      </dl>
      <p className="mt-2 text-sm text-muted">File ini lolos pipeline verifikasi: tanda tangan developer cocok dan pemindaian keamanan bersih.</p>
    </div>
  );
}
// ToolShell - kerangka semua tool PRD 9.2 / FR-TOOL-05 (dipakai Tool TikTok di Fase 2)
export function ToolShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="rounded-2xl border border-mist bg-mist/50 p-4 shadow-sm sm:p-5">
      {children}
    </section>
  );
}
// AuthorByline - byline penulis panduan (audit H1 author/byline, Nov 2026).
// Dipakai template panduan ID + EN. Foto via next/image (optimasi AVIF/WebP).
export function AuthorByline({ date, lang }: { date: string; lang: "id" | "en" }) {
  return (
    <div className="flex items-center gap-3">
      <Image src={author.photo} alt={author.name} width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover" />
      <div>
        <p className="text-sm font-semibold text-ink">
          {lang === "en" ? "Written by" : "Ditulis oleh"}{" "}
          <Link href={author.profilePath[lang]} className="text-linkblue hover:underline">{author.name}</Link>
          {" · "}{author.role[lang]}
        </p>
        <p className="text-sm text-muted">
          {lang === "en" ? "Last checked" : "Terakhir dicek"}: {date}
          {lang === "en" ? " — English edition" : " - Panduan Bahasa Indonesia"}
        </p>
      </div>
    </div>
  );
}
