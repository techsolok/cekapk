import Link from "next/link";
import { site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
// SEO-05: header sadar bahasa. Edisi Inggris hanya menautkan ke rute /en yang
// benar-benar ada (/en, /en/tools) — tidak ada /en/kategori atau /en/keamanan,
// jadi tautan itu tidak ditebak; edisi Indonesia ditautkan dengan label jelas.
// UI-05 Phase B: "Apps" Inggris kini ke /en/aplikasi (bukan /en — temuan E4
// audit UI-05); tombol Search dihapus dari header Inggris karena /en bukan
// antarmuka pencarian (tidak ada fitur pencarian Inggris di fase ini).
export default function Header({ locale = "id" }: { locale?: "id" | "en" }) {
  const en = locale === "en";
  const home = en ? "/en" : "/";
  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        <Link href={home} className="flex items-center gap-2 font-bold text-ink" aria-label={site.name}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-lg text-white" aria-hidden>⬇</span>
          <span>{site.name}</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-5 text-sm font-medium text-ink/80 sm:flex" aria-label={en ? "Main" : "Utama"}>
          {en ? (
            <>
              <Link href="/en/tools" className="hover:text-primary-dark">Tools</Link>
              <Link href="/en/aplikasi" className="hover:text-primary-dark">Apps</Link>
              <Link href="/" className="hover:text-primary-dark">Bahasa Indonesia</Link>
            </>
          ) : (
            <>
              <Link href="/tools" className="hover:text-primary-dark">Tools</Link>
              <Link href="/aplikasi" className="hover:text-primary-dark">Aplikasi</Link>
              <Link href="/kategori" className="hover:text-primary-dark">Kategori</Link>
              <Link href="/keamanan" className="hover:text-primary-dark">Keamanan</Link>
              <Link href="/en" className="hover:text-primary-dark">English</Link>
            </>
          )}
        </nav>
        <span className="ml-auto sm:ml-0"><ThemeToggle /></span>
        {!en && (
          <Link href="/aplikasi" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white" aria-label="Cari aplikasi">
            Cari
          </Link>
        )}
      </div>
    </header>
  );
}
