"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const itemsId = [
  { href: "/", label: "Beranda", icon: "🏠" },
  { href: "/tools", label: "Tools", icon: "🛠️" },
  { href: "/kategori", label: "Kategori", icon: "🗂️" },
  { href: "/keamanan", label: "Keamanan", icon: "🛡️" },
];
// SEO-05: edisi Inggris hanya memakai rute /en yang ada. UI-03 Rev 1:
// "Apps" kini menautkan ke hub aplikasi Inggris /en/aplikasi (sebelumnya
// menduplikasi "Home" ke /en — temuan F4 audit UI-01).
// UI-05 Phase B: "Home" aktif hanya di /en persis — sebelumnya
// startsWith("/en") membuat Home aktif di semua halaman Inggris.
const itemsEn = [
  { href: "/en", label: "Home", icon: "🏠" },
  { href: "/en/tools", label: "Tools", icon: "🛠️" },
  { href: "/en/aplikasi", label: "Apps", icon: "📱" },
  { href: "/", label: "Indonesia", icon: "🌐" },
];
export default function BottomNav({ locale = "id" }: { locale?: "id" | "en" }) {
  const items = locale === "en" ? itemsEn : itemsId;
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-mist bg-paper pb-[env(safe-area-inset-bottom)] sm:hidden" aria-label={locale === "en" ? "Bottom navigation" : "Navigasi bawah"}>
      <ul className="grid grid-cols-4">
        {items.map((it) => {
          // Home ("/" dan "/en") aktif hanya di rutenya sendiri; item seksi
          // tetap aktif di rute turunannya (mis. /en/tools/* → Tools).
          const active = path === it.href || (it.href !== "/" && it.href !== "/en" && path.startsWith(`${it.href}/`));
          return (
            <li key={`${it.href}-${it.label}`}>
              <Link href={it.href} aria-current={active ? "page" : undefined}
                className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${active ? "text-primary-dark" : "text-muted"}`}>
                <span className="text-xl" aria-hidden>{it.icon}</span>{it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
