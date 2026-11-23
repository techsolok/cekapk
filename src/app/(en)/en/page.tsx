import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { enApps, enGuides } from "@/lib/data/i18n-en";
import { getApp } from "@/lib/data/apps";
import { FaqAccordion } from "@/components/ui";
import {
  HeroPanel, HeroStats, ChipRow, SectionHeading, HomeAppCard,
  ToolCard, TrustStrip, VerifySteps, ClosingCta, sortByVerifiedDesc, formatCheckedEn,
} from "@/components/home";
import TikTokHomeDownloader from "@/components/TiktokHomeDownloader";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} in English - Safe App Info & Free Tools`,
  description: `English edition of ${site.name}: honest Android app guides on safety and official sources, a legal APK library, and free online tools for Android users.`,
  path: "/en", languages: { "id-ID": `${site.url}/`, "en-US": `${site.url}/en`, "x-default": `${site.url}/` },
});

// Recently verified (EN): English app guides, sorted by the English
// edition's check date (verifiedAtEn when present, else the Indonesian
// verifiedAt), then name order.
const recentlyVerifiedEn = sortByVerifiedDesc(
  enApps.map((a) => ({ name: getApp(a.slug)?.name ?? a.slug, slug: a.slug, verifiedAt: a.verifiedAtEn ?? getApp(a.slug)?.verifiedAt ?? "2026-10-18" })),
).slice(0, 6);

const enFaqs = [
  { q: `What is ${site.name}?`, a: `${site.name} is an Indonesian site for honest Android app information, free online tools, and APK safety checks before you install. We do not host pirated APKs, mods, or gambling and adult apps.` },
  { q: "Is downloading from here safe?", a: "Our app buttons point to Google Play or the developer's official site. The legal APK library only publishes open-source files that pass a public verification pipeline — a digital signature match and a clean multi-engine scan — and the SHA-256 hash is always shown." },
  { q: "Why do some apps only have an info page?", a: "Because the app is paid, unofficial, or risky. For those we explain the facts and point to legal alternatives instead of offering a download." },
];

const enVerifySteps = [
  { title: "Official sources first.", text: "We always prioritise Google Play or the official developer." },
  { title: "Developer signature matched", text: "against the developer's own signature." },
  { title: "Multi-engine security scan", text: "— one malicious detection means no publish." },
  { title: "Permissions explained", text: "in plain language, so you know what you are allowing." },
];

export default function EnHomePage() {
  return (
    <div className="space-y-14 py-8">
      <p className="text-sm font-semibold text-primary-dark">English edition · <Link className="underline" href="/">Baca dalam Bahasa Indonesia</Link></p>

      <HeroPanel
        eyebrow="English edition"
        title="Know an app before you install it."
        sub={`${site.name} is an Indonesian site built on one rule: official sources first. We write editorial guides to popular Android apps — what they do, what permissions they ask for, and how to stay safe — host only open-source files that pass a public verification pipeline (hash, developer signature, multi-engine scan, permission audit), and offer free tools that never ask for your login. This English edition covers our most-read pages; the full catalog of 50 apps lives in the Indonesian edition.`}
      >
        <ChipRow
          label="Most read:"
          chips={[
            { label: "TikTok", href: "/en/aplikasi/tiktok" },
            { label: "WhatsApp", href: "/en/aplikasi/whatsapp" },
            { label: "Canva", href: "/en/aplikasi/canva" },
          ]}
        />
        <HeroStats
          stats={[
            { value: `${enApps.length}`, label: "App guides in English" },
            { value: `${enGuides.length}`, label: "Safety guides in English" },
            { value: "3", label: "Free tools" },
            { value: "0", label: "pirated APK files hosted" },
          ]}
        />
      </HeroPanel>

      {/* UI-03: TikTok downloader on the homepage, directly below the hero. */}
      <TikTokHomeDownloader lang="en" />

      <TrustStrip
        items={[
          { icon: "shield", title: "Official sources first", text: "Download buttons point to Google Play or the developer's official site — never to random files." },
          { icon: "userx", title: "No login", text: "Every tool and guide works without an account or a password." },
          { icon: "eyeoff", title: "Your files aren't stored", text: "Downloads stream to your device; screenshots are deleted after reading." },
        ]}
      />

      <section aria-labelledby="apps-judul">
        <SectionHeading eyebrow="Guides" title={`App Guides in English (${enApps.length})`} id="apps-judul" />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {enApps.map((a) => {
            const base = getApp(a.slug);
            return (
              <li key={a.slug}>
                <HomeAppCard name={base?.name ?? a.slug} href={`/en/aplikasi/${a.slug}`} sub={a.taglineEn} />
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="baru-judul">
        <SectionHeading eyebrow="Recently verified" title="Recently Verified" id="baru-judul" />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {recentlyVerifiedEn.map((a) => {
            const base = getApp(a.slug);
            return (
              <li key={a.slug}>
                <HomeAppCard
                  name={a.name}
                  href={`/en/aplikasi/${a.slug}`}
                  sub={base?.developer ?? ""}
                  meta={`Checked ${formatCheckedEn(a.verifiedAt)}`}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="tools-judul">
        <SectionHeading eyebrow="Free" title="Free Tools" id="tools-judul" href="/en/tools" hrefLabel="Open the tools" />
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          <li>
            <ToolCard icon="download" title="TikTok Video Downloader" desc="Download public TikTok videos without watermark, or as audio — no login." href="/en/tools/tiktok-downloader" cta="Open Tool" />
          </li>
          <li>
            <ToolCard icon="camera" title="Instagram Video Downloader" desc="Download public Instagram videos and Reels as original MP4 files — no login." href="/en/tools/instagram-downloader" cta="Open Tool" />
          </li>
          <li>
            <ToolCard icon="shield" title="App Permission Checker" desc="Upload a screenshot of an app's permission list; the tool explains each risk." href="/en/tools/permission-checker" cta="Open Tool" />
          </li>
        </ul>
      </section>

      <section aria-labelledby="aman-judul">
        <SectionHeading eyebrow="Safety" title="How we verify app information" id="aman-judul" />
        <div className="mt-5">
          <VerifySteps steps={enVerifySteps} href="/en/about" hrefLabel="About CekAPK" />
        </div>
      </section>

      <section aria-labelledby="panduan-judul">
        <SectionHeading eyebrow="Guides" title={`Safety Guides in English (${enGuides.length})`} id="panduan-judul" />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {enGuides.map((g) => (
            <li key={g.slug}>
              <Link href={`/en/panduan/${g.slug}`} className="block h-full rounded-2xl border border-border bg-paper p-5 shadow-sm hover:border-primary">
                <span className="block font-semibold leading-snug text-ink">{g.titleEn}</span>
                <span className="mt-1 block text-sm leading-relaxed text-secondary">{g.introEn[0].slice(0, 140)}…</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">Read the guide →</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">Looking for an app that is not translated yet? The Indonesian page is one click away on every guide, and the facts (developer, official link, check date) are identical in both languages.</p>
      </section>

      <section aria-labelledby="faq-judul">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" id="faq-judul" />
        <div className="mt-5"><FaqAccordion faqs={enFaqs} /></div>
      </section>

      <ClosingCta
        title="Start from official sources."
        text="Find the app, read the facts, then install from the Play Store — not from a random link."
        primary={{ label: "Browse the Full Catalog", href: "/en/aplikasi" }}
        secondary={{ label: "Open Free Tools", href: "/en/tools" }}
      />
    </div>
  );
}
