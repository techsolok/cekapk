import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumb, FaqAccordion } from "@/components/ui";
import TiktokTool from "@/components/TiktokTool";

const faqs = [
  { q: "How do I download a TikTok video using CekAPK?", a: "Open TikTok and copy the link of a public video. Visit this page, paste the link into the input field, and press Get Video. Check the preview — the title and creator should match the video you meant — then press the download option you need. The file saves to your device's Downloads folder." },
  { q: "Is CekAPK's TikTok downloader free?", a: "Yes, it is free and needs no account. The tool is supported by our site generally, not by locking results or charging per video. A fair hourly usage limit exists to prevent server abuse, not to sell access." },
  { q: "Do I need to install an application?", a: "No. The tool runs in your browser on Android, iPhone, and desktop computers. Nothing is installed, so your storage is untouched and no extra app asks for strange permissions." },
  { q: "Do I need to log in to TikTok?", a: "No. The tool only reads the video's public page data, and it never asks for a TikTok password, a verification code, or an app install. Any downloader site that asks for your TikTok password should be closed immediately — passwords belong only in TikTok's own app and website." },
  { q: "Which TikTok links are supported?", a: "Full video links from tiktok.com, www.tiktok.com, and m.tiktok.com in the form /video/<number>, and short links from the share button (vt.tiktok.com and vm.tiktok.com) — the server follows those to the original video. Photo posts are not downloadable: the tool accepts the link but the source provides no video file, and it will say so plainly." },
  { q: "Why is my TikTok video not downloading?", a: "First check that the link was copied in full and the video is still public. TikTok sometimes limits access from servers, so if the source is unreachable, wait a few minutes and try again. The no-watermark option appears only when TikTok's public page provides it for that video. Download links are valid for 10 minutes — if yours expired, process the link again." },
  { q: "Can I download private TikTok videos?", a: "No. Private, friends-only, and deleted videos have no public data, and this tool uses no account, password, or workaround to get past the owner's privacy settings. If a video is not public, the tool explains that and stops." },
  { q: "Is it legal to download TikTok videos?", a: "Downloading a video for personal archiving is generally different from publishing it again as your own. Re-uploading someone else's work without permission violates copyright and TikTok's terms, and your account can face action from the platform. Use this tool only for your own videos or content whose permission is clear." },
];
const steps = [
  "Open TikTok and copy the link of a supported video.",
  "Visit the CekAPK TikTok Downloader.",
  "Paste the link into the input field.",
  "Submit the link and wait for the tool to process it.",
  "Preview and download the available result.",
];
// Rendered title gains " | CekAPK" from the EN layout template, matching
// the brief's suggested title exactly.
export const metadata: Metadata = pageMetadata({ title: "TikTok Video Downloader — Download Public Videos Online", description: "Use CekAPK's TikTok video downloader to process supported TikTok video links. Paste a link, preview available details, and download using our online tool.", path: "/en/tools/tiktok-downloader", languages: { "id-ID": `${site.url}/tools/pengunduh-tiktok`, "en-US": `${site.url}/en/tools/tiktok-downloader`, "x-default": `${site.url}/tools/pengunduh-tiktok` }, locale: "en_US", ogImage: "dynamic" });
export default function TiktokToolEnPage() {
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "English Home", path: "/en" }, { name: "Tools", path: "/en/tools" }, { name: "TikTok Video Downloader", path: "/en/tools/tiktok-downloader" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={howToJsonLd({ title: "TikTok Video Downloader — Download Public Videos Online", path: "/en/tools/tiktok-downloader", steps })} />
      <Breadcrumb items={[{ name: "English Home", path: "/en" }, { name: "Tools", path: "/en/tools" }, { name: "TikTok Video Downloader", path: "/en/tools/tiktok-downloader" }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">TikTok Video Downloader</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Paste a link to a public TikTok video, preview the details, then download the file the source provides — no watermark when TikTok itself provides it for that video. Free, no install, no account, and no login.</p>
      </header>

      <TiktokTool lang="en" />

      <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-ink/85">
        <strong>An honest limit:</strong> use this tool only for videos you own or the owner allows. The tool only processes <strong>public</strong> videos — private, friends-only, or deleted videos cannot and will not be worked around. We are not affiliated with TikTok or ByteDance.
      </p>

      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Download TikTok Videos Online</h2>
        <p>CekAPK&apos;s TikTok downloader saves public TikTok videos through your browser. There is nothing to install and no account to create: paste a link, check the preview, and download the file. The tool is free, and it works the same on Android, iPhone, and desktop computers.</p>
        <p>What makes it different is what it refuses to do. It never asks for your TikTok password, it never shows a fake download button, and it never promises a result the source does not provide. If a video is private, deleted, or its source offers no downloadable file, the tool says so in plain English instead of pretending otherwise.</p>
      </section>

      <section aria-label="How to use" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">How to Use the TikTok Video Downloader</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/80">{steps.map((s) => (<li key={s}>{s}</li>))}</ol>
        <p className="leading-relaxed text-ink/80">On your phone, copy the link from TikTok&apos;s Share button, then use the Paste button here (or paste it manually) and press Get Video. On a computer, copy the video&apos;s address from the browser address bar or from the Share button on TikTok&apos;s website — the process is the same. Short links from the share button (vt.tiktok.com or vm.tiktok.com) are supported; the server follows them to the original video.</p>
      </section>

      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Supported TikTok Links</h2>
        <p>The tool accepts full video links from tiktok.com, www.tiktok.com, and m.tiktok.com in the form /video/ followed by the video number, and short links from vt.tiktok.com and vm.tiktok.com. A link must point to a video — photo posts are not downloadable. The tool accepts a photo-post link but the source provides no video file for it, so it will explain that plainly instead of failing silently.</p>
        <p>Links must be copied in full. A link cut short by a messaging app, or a video that was deleted after the link was shared, cannot be recovered by any tool — the honest answer in that case is that the video was not found.</p>
      </section>

      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">How the Download Process Works</h2>
        <p>When you submit a link, our server reads the video&apos;s public page — the same information anyone can see without logging in — and collects the title, creator, thumbnail, and the download files TikTok itself provides for that video. It then shows you the preview and the available options.</p>
        <p>Each download option carries a signed token that is valid for 10 minutes. The file streams from TikTok&apos;s servers through ours to your device and is never written to our storage. TikTok&apos;s content servers require a session cookie from the page request, so the server keeps a short in-memory session (10 minutes) for that purpose only — media addresses are never handed to your browser, and the download token contains only a session reference. Our logs record anonymous metadata only: the time, whether it succeeded or failed, and the error type. Your full link is never written to the logs.</p>
        <p>No TikTok login is involved at any step. There is no place to enter a password, because the tool never needs one.</p>
      </section>

      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Features of CekAPK TikTok Downloader</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>No-watermark video</strong> — offered whenever TikTok&apos;s public page provides a no-watermark file for that video.</li>
          <li><strong>Standard video</strong> — the regular version with watermark, when the source provides it.</li>
          <li><strong>Audio only (MP3)</strong> — offered when the video&apos;s public source provides an audio stream.</li>
          <li><strong>Preview before downloading</strong> — title, creator, and thumbnail, so you can confirm it is the right video.</li>
          <li><strong>Free, no install, no account</strong> — the tool runs in the browser on any device.</li>
          <li><strong>Honest errors</strong> — private, deleted, and unsupported videos get a plain explanation, not a fake button.</li>
          <li><strong>Abuse protection without tracking</strong> — fair usage limits per network and a light arithmetic challenge instead of a tracking CAPTCHA.</li>
        </ul>
        <p>The options shown are only the ones the video&apos;s public source actually provides. If no-watermark is not available from the source, we do not show it instead of promising a fake one — and we do not crop or enlarge the video to hide a watermark, which would only damage its quality.</p>
      </section>

      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Supported and Unsupported Content</h2>
        <p><strong>Supported:</strong> public TikTok videos, with the download options the source provides — no-watermark video, standard video, and audio (MP3) when available.</p>
        <p><strong>Not supported:</strong> private videos, friends-only videos, deleted videos, videos from closed accounts, and photo posts (which have no video file to download). The tool has no way around these limits by design: it reads only public data, uses no account or password, and never tries to bypass the owner&apos;s privacy settings.</p>
        <p>For your own videos, the most direct option is TikTok&apos;s own Save video button in the app — the file carries a watermark, but it is the official file from your account. Creators can also download their account data and content from TikTok&apos;s settings. This tool is a backup for when the original file is lost, not a replacement for keeping your own archive.</p>
      </section>

      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Troubleshooting Download Problems</h2>
        <p><strong>The share link does not work.</strong> Make sure the link was copied in full, without being cut short, and that the video is still public. Short vt.tiktok.com links are supported, but if the video was deleted after the link was shared, no tool can bring it back — our message will say the video was not found, and that is the correct answer.</p>
        <p><strong>The download stops halfway.</strong> The file streams directly from TikTok&apos;s servers, so a broken connection breaks the download. Try again from the same result while the session is still active (10 minutes), or process the link again. For long videos, use a stable Wi-Fi connection.</p>
        <p><strong>You are asked to answer an arithmetic challenge.</strong> That means requests from your network passed our fair per-minute limit — common on shared office, campus, or public Wi-Fi networks used by many people at once. Answer it and continue; it is a light replacement for a CAPTCHA and it does not track you.</p>
        <p><strong>The downloaded file will not open.</strong> Re-download the file until it finishes completely before opening it, and use a standard video player. A file cut short by the connection will look broken, and that is not the wrong file from the source.</p>
      </section>

      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">Responsible Use and Copyright Considerations</h2>
        <p>Downloading a video is not permission to re-publish it. A video you download for personal archiving is one thing; posting someone else&apos;s work as your own is another — it violates copyright and TikTok&apos;s terms, and your account can face action from the platform. Use this tool only for your own videos or content whose permission is clear.</p>
        <p>If you often come across suspicious download links elsewhere, our guide on <Link className="font-semibold text-linkblue" href="/en/panduan/cara-mengenali-apk-palsu">how to recognise fake apps</Link> will help you protect your phone. For the app itself — permissions, safety, and error fixes — see our <Link className="font-semibold text-linkblue" href="/en/aplikasi/tiktok">TikTok app info</Link> page.</p>
      </section>

      <section aria-label="Frequently asked questions" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Frequently Asked Questions</h2>
        <FaqAccordion faqs={faqs} />
      </section>

      <section className="rounded-2xl bg-primary-soft p-5">
        <h2 className="font-bold text-ink">Next tool: Instagram Downloader</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink/80">Need to save a public Instagram Reel or video? Our Instagram downloader uses the same security pattern — no login, preview first, original file only.</p>
        <Link href="/en/tools/instagram-downloader" className="mt-2 inline-flex min-h-[44px] items-center font-semibold text-linkblue">Open Instagram Downloader →</Link>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">Or browse <Link className="font-semibold text-linkblue" href="/en/tools">all free tools</Link>.</p>
      </section>
    </div>
  );
}
