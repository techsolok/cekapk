import { Icon, type IconName } from "@/components/home";

// Shared app-detail chrome (UI-03 Rev 1, Part 4). Used by both app-detail
// templates so the Indonesian and English pages share one visual language:
// navy icon tile + H2, compact mobile pill navigation, sticky desktop TOC.

// Section heading: navy SVG-icon tile + H2 (text-2xl). Page H1 is text-3xl,
// sub-headings inside a section are H3 text-lg — one clear hierarchy.
export function SectionHeading({ icon, title }: { icon: IconName; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy text-white">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h2 className="text-2xl font-extrabold leading-tight text-ink">{title}</h2>
    </div>
  );
}

// Compact mobile section navigation: horizontally scrollable pills, shown
// only below the lg breakpoint. The desktop TOC lives in AppTocAside.
export function AppTocMobile({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  return (
    <nav aria-label={label} className="lg:hidden">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="shrink-0 rounded-full border border-mist bg-paper px-3 py-1.5 text-sm font-medium text-ink/75 hover:border-primary hover:text-primary-dark">
            {t.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// Sticky desktop table of contents: sits beside the content column (lg
// grid), sticks 80px from the top, scrolls internally if it ever outgrows
// the viewport. Hidden below lg, where the mobile pills take over.
export function AppTocAside({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-mist bg-paper p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-muted">{label}</p>
        <ul className="mt-3 space-y-1">
          {items.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="block rounded-lg px-2 py-1.5 text-sm font-medium text-ink/75 hover:bg-primary-soft hover:text-primary-dark">
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
