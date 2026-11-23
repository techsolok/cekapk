import Link from "next/link";
import { site } from "@/lib/site";
export default function Footer({ locale = "id" }: { locale?: "id" | "en" }) {
  const en = locale === "en";
  if (en) {
    return (
      <footer className="border-t border-mist bg-mist/60 pb-24 sm:pb-8">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <p className="font-bold text-ink">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">English edition of CekAPK: honest Android app guides on safety and official sources, a legal APK library, and free online tools.</p>
          </div>
          <nav aria-label="Explore">
            <p className="font-semibold text-ink">Explore</p>
            <ul className="mt-2 space-y-2 text-sm text-ink/70">
              <li><Link href="/en">English home</Link></li>
              <li><Link href="/en/aplikasi">Apps in English</Link></li>
              <li><Link href="/en/tools">Tools</Link></li>
              <li><Link href="/en/panduan/apa-itu-apk-hijau">What Is &lsquo;APK Hijau&rsquo;?</Link></li>
              <li><Link href="/en/panduan/apa-itu-apk-ijo">What Is &lsquo;APK Ijo&rsquo;?</Link></li>
              <li><Link href="/en/panduan/cara-instal-apk-aman">How to Install Apps Safely</Link></li>
              <li><Link href="/en/panduan/cara-cek-izin-aplikasi">How to Check App Permissions</Link></li>
              <li><Link href="/en/panduan/cara-mengenali-apk-palsu">How to Spot Fake APKs</Link></li>
              <li><Link href="/en/panduan/apakah-apkpure-aman">Is APKPure Safe?</Link></li>
              <li><Link href="/en/about">About CekAPK</Link></li>
              <li><Link href="/">Indonesian edition (full catalog, guides &amp; security)</Link></li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <p className="font-semibold text-ink">Legal</p>
            <ul className="mt-2 space-y-2 text-sm text-ink/70">
              <li><Link href="/en/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/en/terms-of-use">Terms of Use</Link></li>
              <li><Link href="/en/dmca">DMCA &amp; Content Removal</Link></li>
              <li><Link href="/en/advertising-policy">Advertising &amp; Sponsored Content</Link></li>
              <li><Link href="/en/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <p className="mx-auto max-w-5xl px-4 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. {site.name} is not affiliated with Google, TikTok, Mojang/Microsoft, or any app developer unless stated in writing.
        </p>
      </footer>
    );
  }
  return (
    <footer className="border-t border-mist bg-mist/60 pb-24 sm:pb-8">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-bold text-ink">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{site.description}</p>
        </div>
        <nav aria-label="Jelajahi">
          <p className="font-semibold text-ink">Jelajahi</p>
          <ul className="mt-2 space-y-2 text-sm text-ink/70">
            <li><Link href="/tools">Tools Online</Link></li>
            <li><Link href="/aplikasi">Katalog Aplikasi</Link></li>
            <li><Link href="/kategori">Kategori</Link></li>
            <li><Link href="/keamanan">Keamanan APK</Link></li>
            <li><Link href="/panduan">Panduan</Link></li>
            <li><Link href="/perpustakaan">Perpustakaan APK Legal</Link></li>
            <li><Link href="/tentang">Tentang Kami</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
            <li><Link href="/metodologi-verifikasi">Metodologi Verifikasi</Link></li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="font-semibold text-ink">Legal</p>
          <ul className="mt-2 space-y-2 text-sm text-ink/70">
            <li><Link href="/privasi">Kebijakan Privasi</Link></li>
            <li><Link href="/ketentuan">Ketentuan Penggunaan</Link></li>
            <li><Link href="/dmca">DMCA & Penghapusan Konten</Link></li>
            <li><Link href="/kebijakan-iklan">Kebijakan Iklan & Konten Bersponsor</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto max-w-5xl px-4 text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. {site.name} tidak berafiliasi dengan Google, TikTok, Mojang/Microsoft, atau developer aplikasi mana pun kecuali dinyatakan secara tertulis.
      </p>
    </footer>
  );
}
