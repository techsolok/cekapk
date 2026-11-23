import type { Metadata } from "next";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { FaqAccordion, TrustBadge } from "@/components/ui";
import { categories } from "@/lib/data/categories";
import { pillarApps } from "@/lib/data/apps";
import { guides } from "@/lib/data/guides";
import { site } from "@/lib/site";
import { organizationJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";
import {
  HeroPanel, HeroStats, ChipRow, SectionHeading, HomeAppCard, CategoryCard,
  ToolCard, TrustStrip, VerifySteps, ClosingCta, sortByVerifiedDesc, formatCheckedId,
} from "@/components/home";
import TikTokHomeDownloader from "@/components/TiktokHomeDownloader";

export const metadata: Metadata = {
  // Homepage SEO title (exact, 3 Nov 2026): absolute so the layout template
  // does NOT append "| CekAPK" a second time.
  title: { absolute: "Info Aplikasi Android, Cek Keamanan APK & Tools | CekAPK" },
  description: site.description,
  alternates: { canonical: site.url + "/", languages: { "id-ID": site.url + "/", "en-US": site.url + "/en", "x-default": site.url + "/" } },
  openGraph: { title: "Info Aplikasi Android, Cek Keamanan APK & Tools | CekAPK", description: site.description, url: site.url + "/", siteName: site.name, locale: site.locale, type: "website", images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: `${site.name} - ${site.tagline}` }] },
  twitter: { card: "summary_large_image", title: "Info Aplikasi Android, Cek Keamanan APK & Tools | CekAPK", description: site.description, images: ["/og-default.jpg"] },
};

const faqs = [
  { q: `Apa itu ${site.name}?`, a: `${site.name} adalah situs Bahasa Indonesia untuk menemukan info aplikasi Android yang jujur, memakai tool online gratis, dan mengecek keamanan sebuah APK sebelum menginstal. Kami tidak menyediakan APK bajakan, mod, atau aplikasi judi dan dewasa.` },
  { q: "Apakah mengunduh dari sini aman?", a: "Untuk aplikasi, tombol kami mengarah ke Google Play atau situs developer resmi. Perpustakaan kami hanya menerbitkan file aplikasi legal yang sudah lolos verifikasi tanda tangan digital dan pemindaian keamanan - dan hash SHA-256 selalu ditampilkan. File yang belum lolos tidak kami tampilkan." },
  { q: "Kenapa aplikasi tertentu hanya ada halaman info?", a: "Karena aplikasi itu berbayar, tidak resmi, atau berisiko. Untuk yang seperti itu kami menjelaskan faktanya dan memberi alternatif legal, bukan file unduhan." },
];
const trending = ["tiktok", "whatsapp", "capcut", "minecraft", "kucing-apk", "spotify", "google-chrome", "canva", "bstation"].map((s) => pillarApps.find((a) => a.slug === s)!).filter(Boolean);

// Urutan jujur "terbaru diperiksa": verifiedAt menurun (20 Okt 2026 dulu, lalu 18 Okt 2026).
const recentlyVerified = sortByVerifiedDesc(pillarApps).slice(0, 12);
const categoryCounts: Record<string, number> = {};
for (const a of pillarApps) categoryCounts[a.categorySlug] = (categoryCounts[a.categorySlug] ?? 0) + 1;

const tools = [
  { icon: "download" as const, title: "Pengunduh Video TikTok", desc: "Unduh video TikTok publik tanpa watermark atau sebagai audio — tanpa login.", href: "/tools/pengunduh-tiktok" },
  { icon: "camera" as const, title: "Pengunduh Video Instagram", desc: "Unduh video dan Reels Instagram publik sebagai MP4 asli — tanpa login.", href: "/tools/pengunduh-instagram" },
  { icon: "shield" as const, title: "Pemeriksa Izin Aplikasi", desc: "Unggah tangkapan layar daftar izin; tool menjelaskan risiko tiap izin.", href: "/tools/pemeriksa-izin" },
];

const verifySteps = [
  { title: "Sumber resmi dulu.", text: "Prioritas kami selalu Google Play atau developer resmi." },
  { title: "Tanda tangan digital dicocokkan", text: "dengan developer aslinya." },
  { title: "Pemindaian keamanan", text: "multi-engine - satu deteksi berbahaya berarti tidak terbit." },
  { title: "Izin aplikasi dijelaskan", text: "dengan bahasa awam, supaya kamu tahu apa yang kamu izinkan." },
];

export default function HomePage() {
  return (
    <div className="space-y-14 py-8">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />

      <HeroPanel
        title={<>Temukan aplikasi Android,<br className="hidden sm:block" /> dengan aman.</>}
        sub="Info aplikasi yang jujur, tool online gratis, dan cek keamanan APK - semuanya dalam Bahasa Indonesia, ringan untuk semua HP."
      >
        <div className="mt-6 max-w-xl"><SearchBox /></div>
        <ChipRow
          label="Paling dicari:"
          chips={[
            { label: "TikTok", href: "/aplikasi/tiktok" },
            { label: "WhatsApp", href: "/aplikasi/whatsapp" },
            { label: "DANA", href: "/aplikasi/dana" },
            { label: "Roblox", href: "/aplikasi/roblox" },
          ]}
        />
        <HeroStats
          stats={[
            { value: "50", label: "Aplikasi di katalog" },
            { value: "10", label: "Kategori" },
            { value: "3", label: "Tool gratis" },
            { value: "0", label: "file APK bajakan di-host" },
          ]}
        />
      </HeroPanel>

      {/* UI-03: TikTok downloader on the homepage, directly below the hero. */}
      <TikTokHomeDownloader lang="id" />

      <TrustStrip
        items={[
          { icon: "shield", title: "Sumber resmi dulu", text: "Tautan unduhan mengarah ke Play Store atau situs developer resmi — bukan ke berkas acak." },
          { icon: "userx", title: "Tanpa login", text: "Semua tool dan panduan bisa dipakai tanpa akun, tanpa kata sandi." },
          { icon: "eyeoff", title: "Berkasmu tidak disimpan", text: "Unduhan mengalir ke perangkatmu; tangkapan layar dihapus setelah dibaca." },
        ]}
      />

      <section aria-labelledby="tren-judul">
        <SectionHeading eyebrow="Populer" title="Sedang Banyak Dicari di Indonesia" id="tren-judul" href="/aplikasi" hrefLabel="Lihat semua aplikasi" />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((a) => (
            <li key={a.slug}>
              <HomeAppCard name={a.name} href={`/aplikasi/${a.slug}`} sub={a.tagline} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="kategori-judul">
        <SectionHeading eyebrow="Jelajahi" title="Kategori Aplikasi" id="kategori-judul" href="/kategori" hrefLabel="Lihat semua kategori" />
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const n = categoryCounts[c.slug] ?? 0;
            return (
              <li key={c.slug}>
                <CategoryCard name={c.name} href={`/kategori/${c.slug}`} blurb={c.blurb} countLabel={`${n} aplikasi`} />
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="tools-judul">
        <SectionHeading eyebrow="Gratis" title="Tool Gratis" id="tools-judul" href="/tools" hrefLabel="Lihat semua tool" />
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {tools.map((t) => (
            <li key={t.href}>
              <ToolCard icon={t.icon} title={t.title} desc={t.desc} href={t.href} cta="Buka Tool" />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="baru-judul">
        <SectionHeading eyebrow="Katalog 50 Aplikasi" title="Terbaru Diperiksa" id="baru-judul" href="/aplikasi" hrefLabel="Lihat katalog aplikasi" />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {recentlyVerified.map((a) => (
            <li key={a.slug}>
              <HomeAppCard
                name={a.name}
                href={`/aplikasi/${a.slug}`}
                sub={a.developer}
                meta={`Dicek ${formatCheckedId(a.verifiedAt)}`}
                badge={<TrustBadge status={a.legalStatus} />}
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="aman-judul">
        <SectionHeading eyebrow="Keamanan" title="Cara kami mengecek keamanan APK" id="aman-judul" />
        <div className="mt-5">
          <VerifySteps steps={verifySteps} href="/keamanan" hrefLabel="Pelajari cara cek APK aman" />
        </div>
      </section>

      <section aria-labelledby="panduan-judul">
        <SectionHeading eyebrow="Panduan" title="Panduan Keamanan Terbaru" id="panduan-judul" href="/panduan" hrefLabel="Lihat semua panduan" />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/panduan/${g.slug}`} className="block h-full rounded-2xl border border-border bg-paper p-5 shadow-sm hover:border-primary">
                <span className="block font-semibold leading-snug text-ink">{g.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-secondary">{g.metaDescription}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">Baca panduan →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq-judul">
        <SectionHeading eyebrow="FAQ" title="Pertanyaan Umum" id="faq-judul" />
        <div className="mt-5"><FaqAccordion faqs={faqs} /></div>
      </section>

      <ClosingCta
        title="Mulai dari sumber resmi."
        text="Cari aplikasinya, baca faktanya, lalu pasang dari Play Store — bukan dari tautan acak."
        primary={{ label: "Jelajahi Katalog Aplikasi", href: "/aplikasi" }}
        secondary={{ label: "Pelajari Keamanan APK", href: "/keamanan" }}
      />
    </div>
  );
}
