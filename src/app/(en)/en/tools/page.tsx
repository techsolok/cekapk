import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumb } from "@/components/ui";
import { Icon, type IconName } from "@/components/home";

export const metadata: Metadata = pageMetadata({
  title: "Free Tools in English - TikTok, Instagram & Permission Checker",
  description: "Explore CekAPK tools: download supported public TikTok videos and Instagram Reels, or check app permissions from a screenshot.",
  path: "/en/tools", languages: { "id-ID": `${site.url}/tools`, "en-US": `${site.url}/en/tools`, "x-default": `${site.url}/tools` }, locale: "en_US",
});

const tools: { href: string; title: string; desc: string; icon: IconName; note?: string }[] = [
  { href: "/en/tools/tiktok-downloader", title: "TikTok Video Downloader", desc: "Download public TikTok videos without watermark or as audio. Verified end to end with real videos, with honest messages for private and not-found links.", icon: "download" },
  { href: "/en/tools/instagram-downloader", title: "Instagram Video Downloader", desc: "Download public Instagram videos and Reels as original MP4 files. No login, no extra watermark, using the same pattern as the Insta Grab project.", icon: "camera" },
  { href: "/en/tools/permission-checker", title: "App Permission Checker", desc: "Upload a screenshot of an app's permission list; the tool reads it and explains each permission's risk — including dangerous combinations used by OTP thieves.", icon: "shield" },
];

export default function EnToolsPage() {
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home (EN)", path: "/en" }, { name: "Tools", path: "/en/tools" }])} />
      <Breadcrumb items={[{ name: "English Home", path: "/en" }, { name: "Tools", path: "/en/tools" }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Free Tools</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Every tool works the same way: no login, no stored files, and honest error messages. Tools are the first pillar of this site, alongside app info and security.</p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="block h-full rounded-2xl border border-mist bg-paper p-5 shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary-dark"><Icon name={t.icon} className="h-5 w-5" /></span>
              <span className="mt-3 block text-lg font-bold text-ink">{t.title}</span>
              <span className="mt-1 block leading-relaxed text-ink/75">{t.desc}</span>
              {t.note && <span className="mt-2 block text-xs font-semibold text-warn">{t.note}</span>}
              <span className="mt-3 inline-flex min-h-[44px] items-center rounded-xl bg-primary px-4 font-semibold text-white">Open Tool</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">TikTok Video Downloader</h2>
        <p className="leading-relaxed text-ink/75">Paste a public TikTok link, preview the video, then download the file the source provides — without watermark when TikTok itself provides it for that video, or as audio when the audio stream is available. The tool never asks for your TikTok password and is not affiliated with TikTok.</p>
        <p className="leading-relaxed text-ink/75"><strong>Honest limits:</strong> only public videos are processed. Private, friends-only, or deleted videos are refused with a plain explanation — we never invent a result. Files stream without being stored on our server, and our logs record anonymous metadata only. Use the tool for your own videos or ones the owner allows; re-uploading someone else&apos;s work without permission violates copyright.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Instagram Video Downloader</h2>
        <p className="leading-relaxed text-ink/75">Paste a link to a public post, Reel, or video, preview the official result, then download the original MP4 file. The tool never asks for your Instagram login — non-public content gets a plain explanation instead of a workaround.</p>
        <p className="leading-relaxed text-ink/75"><strong>Honest limits:</strong> only public video posts, Reels, and IGTV are supported; private or followers-only content cannot be processed without a login, and we provide no way to enter Instagram credentials. If Instagram limits access from our server, the tool says so plainly. Download links are signed and expire in 10 minutes.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">App Permission Checker</h2>
        <p className="leading-relaxed text-ink/75">Most APK scams do not attack through complicated code, but through the permissions you grant yourself. The tool reads a screenshot of an app&apos;s permission list with Indonesian and English OCR, then explains each permission&apos;s risk in plain language — including dangerous combinations such as SMS plus install permission, the classic OTP-theft pattern.</p>
        <p className="leading-relaxed text-ink/75"><strong>Honest limits:</strong> the checker reads what is visible in the screenshot — a permission that does not appear on screen cannot be detected, and the tool is a quick aid, not a replacement for careful manual reading. Screenshots are processed and deleted within seconds, never stored. The same tool is available in <Link className="font-semibold text-linkblue" href="/tools/pemeriksa-izin">Indonesian</Link>.</p>
      </section>
    </div>
  );
}
