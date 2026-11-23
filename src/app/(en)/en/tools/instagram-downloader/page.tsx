import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumb, FaqAccordion, ToolShell } from "@/components/ui";
import InstagramToolEn from "./InstagramToolEn";

const faqs = [
  { q: "Does this tool ask for my Instagram login?", a: "Never. This tool only processes public content with yt-dlp on the server. If a post is private or followers-only, the tool explains that and stops — we provide no way to enter Instagram credentials, and you should never give them to any website." },
  { q: "Which formats are supported?", a: "Public video posts, Reels, and IGTV with links in the form instagram.com/p/…, /reel/…, or /tv/…. Story links usually need a login, so they are not supported by our no-credentials design." },
  { q: "Are the videos watermark-free?", a: "Instagram does not burn a watermark into the original video the way the TikTok app does, so the file you receive is the original file the creator uploaded. We add no watermark of any kind." },
  { q: "Why did my download fail even though the link is correct?", a: "Instagram periodically limits access from server IP addresses. If you see a message that the source is unreachable, wait a few minutes and try again. We show that message as it is instead of hiding it." },
  { q: "Is my link stored?", a: "No. We only record anonymous metadata (event type and a hashed id) for statistics and abuse prevention. Download links are signed and expire in 10 minutes." },
  { q: "May I download other people's videos?", a: "Downloading for personal archiving is generally different from re-uploading. Re-uploading someone else's work without permission violates copyright and Instagram's terms. Use this tool for your own content or content whose permission is clear." },
  { q: "Why is there a simple arithmetic challenge?", a: "After several failed attempts in a row or too many requests, we show a light arithmetic challenge to hold off bots. A human passes it in seconds." },
];
const steps = [
  "Open the Instagram app and find the public video or Reel you want to save.",
  "Tap the share icon (paper plane), then choose Copy Link.",
  "Paste that link into the box on this page and press Get Video Info.",
  "Check the preview and the owner's name to make sure it is the right video.",
  "Press Download Video. The original MP4 file from Instagram's server will stream through our server without being stored.",
  "Use the file only as its rights allow: personal archiving and your own content are safe uses.",
];
// Rendered title gains " | CekAPK" from the EN layout template, matching
// the brief's suggested title exactly.
export const metadata: Metadata = pageMetadata({ title: "Instagram Video Downloader — Download Public Reels Without Login", description: "Download public Instagram Reels and videos as MP4 without logging in. Preview the video, copy its link, and download responsibly with CekAPK.", path: "/en/tools/instagram-downloader", languages: { "id-ID": `${site.url}/tools/pengunduh-instagram`, "en-US": `${site.url}/en/tools/instagram-downloader`, "x-default": `${site.url}/tools/pengunduh-instagram` }, locale: "en_US", ogImage: "dynamic" });
export default function InstagramToolEnPage() {
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "English Home", path: "/en" }, { name: "Tools", path: "/en/tools" }, { name: "Instagram Video Downloader", path: "/en/tools/instagram-downloader" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={howToJsonLd({ title: "Instagram Video Downloader — Download Public Reels Without Login", path: "/en/tools/instagram-downloader", steps })} />
      <Breadcrumb items={[{ name: "English Home", path: "/en" }, { name: "Tools", path: "/en/tools" }, { name: "Instagram Video Downloader", path: "/en/tools/instagram-downloader" }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Instagram Video Downloader</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Paste a link to a public Instagram post, Reel, or video, preview the official result, then download the original MP4 file. This tool never asks for your Instagram login — if content is not public, we will say so plainly.</p>
      </header>
      <ToolShell title="Instagram Downloader">
        <InstagramToolEn />
      </ToolShell>
      <section aria-label="How to use" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">How to Use This Instagram Downloader</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/80">{steps.map((s) => (<li key={s}>{s}</li>))}</ol>
      </section>
      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Why This Tool Is Built Differently</h2>
        <p>Many Instagram downloader sites show fake login forms or ask for your password. That is dangerous and never necessary for public content. This tool works like the Insta Grab project that shaped its design: extraction runs on the server with yt-dlp, with no visitor credentials at all. When Instagram limits access from the server, you get a message that explains it — not a deceptive ad or a fake download button.</p>
        <p>The video streams directly from Instagram&apos;s CDN through our server in the same request, signed with a token that expires in 10 minutes. We do not store video files, we do not store your full link, and we only record anonymous metadata to hold off abuse. The result is the original file exactly as the creator uploaded it.</p>
        <p>Remember that being able to download something is not permission to re-upload it. Creators&apos; work is protected by copyright; keep it for personal archiving and ask permission before reusing anyone&apos;s work.</p>
      </section>
      <section aria-label="Frequently asked questions" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Frequently Asked Questions</h2>
        <FaqAccordion faqs={faqs} />
      </section>
      <section className="rounded-2xl bg-primary-soft p-5">
        <h2 className="font-bold text-ink">Next tool: TikTok Downloader</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink/80">Need to save a TikTok video without a watermark? Our TikTok tool uses the same security pattern.</p>
        <Link href="/en/tools/tiktok-downloader" className="mt-2 inline-flex min-h-[44px] items-center font-semibold text-linkblue">Open TikTok Downloader →</Link>
      </section>
    </div>
  );
}
