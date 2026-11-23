import Link from "next/link";
import type { ReactNode } from "react";

// Komponen khusus beranda (UI-02, Nov 2026). Dipakai bersama oleh beranda ID
// dan EN. Sengaja TIDAK mengubah src/components/ui.tsx: AppCard di sana dipakai
// halaman detail aplikasi (RelatedApps), jadi beranda memakai kartunya sendiri.

// ---------- Ikon SVG garis (tanpa emoji) ----------
export type IconName = "shield" | "download" | "camera" | "grid" | "wrench" | "book" | "arrow" | "userx" | "eyeoff" | "check" | "list" | "info" | "clock" | "plus" | "minus" | "external" | "help" | "smartphone" | "alert" | "file" | "x" | "star";
const ICON_PATHS: Record<IconName, ReactNode> = {
  shield: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>),
  download: (<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></>),
  camera: (<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>),
  grid: (<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>),
  wrench: (<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />),
  book: (<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>),
  arrow: (<><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>),
  userx: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M17 8l5 5" /><path d="M22 8l-5 5" /></>),
  eyeoff: (<><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><path d="M2 2l20 20" /></>),
  check: (<path d="M20 6L9 17l-5-5" />),
  list: (<><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></>),
  info: (<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>),
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  plus: (<><path d="M12 5v14" /><path d="M5 12h14" /></>),
  minus: (<path d="M5 12h14" />),
  external: (<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" /></>),
  help: (<><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>),
  smartphone: (<><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></>),
  alert: (<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>),
  file: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /></>),
  x: (<><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>),
  star: (<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />),
};
export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

// ---------- Ubin huruf awal (pengganti emoji; ikon asli berhak cipta, tidak dipakai) ----------
const TILE_STYLES = [
  "bg-brand-50 text-brand-800",
  "bg-brand-100 text-brand-700",
  "bg-primary-soft text-primary-dark",
  "bg-mist text-ink",
  "bg-brand-200 text-brand-900",
] as const;
export function tileStyle(key: string): string {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TILE_STYLES[h % TILE_STYLES.length];
}
export function LetterTile({ label, className = "h-12 w-12 text-xl" }: { label: string; className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-xl font-extrabold ${tileStyle(label)} ${className}`} aria-hidden="true">
      {label.charAt(0).toUpperCase()}
    </span>
  );
}

// ---------- Tanggal cek (format pendek, dari verifiedAt yang sebenarnya) ----------
const ID_MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function formatCheckedId(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${ID_MONTHS[m - 1]} ${y}`;
}
export function formatCheckedEn(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${EN_MONTHS[m - 1]} ${d}, ${y}`;
}
// Urutan jujur "terbaru diperiksa": verifiedAt menurun, lalu nama menaik.
export function sortByVerifiedDesc<T extends { verifiedAt: string; name: string }>(apps: T[]): T[] {
  return [...apps].sort((a, b) => b.verifiedAt.localeCompare(a.verifiedAt) || a.name.localeCompare(b.name));
}

// ---------- Hero: panel navy + slot konten ----------
export function HeroPanel({ eyebrow, title, sub, children }: { eyebrow?: ReactNode; title: ReactNode; sub: ReactNode; children?: ReactNode }) {
  return (
    <section aria-label="Pengenalan" className="rounded-3xl bg-navy px-5 py-8 text-white sm:px-8 sm:py-10">
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-widest text-white/60">{eyebrow}</p> : null}
      <h1 className="mt-2 text-[32px] font-extrabold leading-[1.25] tracking-[-0.01em] sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-white/75">{sub}</p>
      {children}
    </section>
  );
}
export function HeroStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-4">
      {stats.map((s) => (
        <li key={s.label}>
          <p className="text-2xl font-extrabold text-white">{s.value}</p>
          <p className="mt-0.5 text-sm text-white/60">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
export function ChipRow({ label, chips }: { label: string; chips: { label: string; href: string }[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-white/60">{label}</span>
      <ul className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="inline-flex min-h-[40px] items-center rounded-full border border-white/25 px-4 text-sm font-semibold text-white hover:bg-white/10">
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- Judul seksi ----------
export function SectionHeading({ eyebrow, title, id, href, hrefLabel }: { eyebrow: string; title: string; id: string; href?: string; hrefLabel?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary-dark">{eyebrow}</p>
        <h2 id={id} className="mt-1 text-2xl font-bold text-ink">{title}</h2>
      </div>
      {href && hrefLabel ? (
        <Link href={href} className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary-dark">
          {hrefLabel} <Icon name="arrow" className="ml-1 h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

// ---------- Kartu aplikasi beranda ----------
export function HomeAppCard({ name, href, sub, meta, badge }: { name: string; href: string; sub: string; meta?: string; badge?: ReactNode }) {
  return (
    <Link href={href} className="flex h-full items-start gap-3 rounded-2xl border border-border bg-paper p-4 shadow-sm hover:border-primary">
      <LetterTile label={name} />
      <span className="min-w-0">
        <span className="block truncate font-semibold text-ink">{name}</span>
        <span className="mt-0.5 block text-sm leading-relaxed text-secondary">{sub}</span>
        {meta ? <span className="mt-1 block text-xs text-muted">{meta}</span> : null}
        {badge ? <span className="mt-2 block">{badge}</span> : null}
      </span>
    </Link>
  );
}

// ---------- Kartu kategori ----------
export function CategoryCard({ name, href, blurb, countLabel }: { name: string; href: string; blurb: string; countLabel: string }) {
  return (
    <Link href={href} className="flex h-full min-h-[88px] items-center gap-3 rounded-2xl border border-border bg-paper p-4 shadow-sm hover:border-primary">
      <LetterTile label={name} />
      <span className="min-w-0">
        <span className="block font-semibold text-ink">{name}</span>
        <span className="mt-0.5 block text-sm leading-snug text-secondary">{blurb}</span>
        <span className="mt-1 block text-xs font-semibold text-primary-dark">{countLabel}</span>
      </span>
    </Link>
  );
}

// ---------- Kartu tool ----------
export function ToolCard({ icon, title, desc, href, cta }: { icon: IconName; title: string; desc: string; href: string; cta: string }) {
  return (
    <Link href={href} className="block h-full rounded-2xl border border-border bg-paper p-5 shadow-sm hover:border-primary">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary-dark">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span className="mt-3 block text-lg font-bold text-ink">{title}</span>
      <span className="mt-1 block text-sm leading-relaxed text-secondary">{desc}</span>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">
        {cta} <Icon name="arrow" className="h-4 w-4" />
      </span>
    </Link>
  );
}

// ---------- Strip kepercayaan (3 nilai, dari perilaku nyata situs) ----------
export function TrustStrip({ items }: { items: { icon: IconName; title: string; text: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <li key={it.title} className="flex gap-3 rounded-2xl border border-border bg-paper p-4 shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-dark">
            <Icon name={it.icon} className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-bold text-ink">{it.title}</span>
            <span className="mt-0.5 block text-sm leading-relaxed text-secondary">{it.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

// ---------- Langkah verifikasi (teks sama seperti sebelumnya, kartu bernomor) ----------
export function VerifySteps({ steps, href, hrefLabel }: { steps: { title: string; text: string }[]; href: string; hrefLabel: string }) {
  return (
    <div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-border bg-paper p-5 shadow-sm">
            <span className="text-sm font-extrabold text-primary-dark">0{i + 1}</span>
            <span className="mt-1 block font-bold text-ink">{s.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-secondary">{s.text}</span>
          </li>
        ))}
      </ol>
      <Link href={href} className="mt-4 inline-flex min-h-[48px] items-center font-semibold text-primary-dark">
        {hrefLabel} <Icon name="arrow" className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}

// ---------- CTA penutup (panel navy; Footer bersama tidak diubah) ----------
export function ClosingCta({ title, text, primary, secondary }: { title: string; text: string; primary: { label: string; href: string }; secondary: { label: string; href: string } }) {
  return (
    <section aria-label={title} className="rounded-3xl bg-navy px-5 py-8 text-white sm:px-8">
      <h2 className="text-2xl font-extrabold leading-snug">{title}</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-white/75">{text}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href={primary.href} className="inline-flex min-h-[48px] items-center rounded-xl bg-white px-5 font-semibold text-navy">
          {primary.label}
        </Link>
        <Link href={secondary.href} className="inline-flex min-h-[48px] items-center rounded-xl border border-white/30 px-5 font-semibold text-white hover:bg-white/10">
          {secondary.label}
        </Link>
      </div>
    </section>
  );
}
