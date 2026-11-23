// TikTok downloader section for the homepage (UI-03, Nov 2026).
// A working entry point, not a decorative input: the visitor pastes a
// TikTok video URL here; the form validates it with the SAME rules as the
// server (src/lib/tools/tiktok.ts normalizeLink — same hosts, same
// /video|photo/<6+ digits> pattern, same short-link rule) and, when valid,
// hands the URL to the existing downloader workflow by redirecting to the
// localized tool page with ?url=, which TiktokTool reads on mount and
// submits through the unchanged /api/tools/tiktok/info flow (same
// validation, rate limiting and challenge handling — no new endpoint).
// Empty/invalid URLs are rejected here with localized messages and never
// reach the tool page.
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "./home";

type Lang = "id" | "en";

// Mirror of the server-side rule in src/lib/tools/tiktok.ts (normalizeLink).
const HOSTS = new Set(["www.tiktok.com", "tiktok.com", "m.tiktok.com", "vt.tiktok.com", "vm.tiktok.com"]);
export function isSupportedTikTokUrl(raw: string): boolean {
  let u: URL;
  try { u = new URL(raw.trim()); } catch { return false; }
  if (!HOSTS.has(u.hostname)) return false;
  if (/\/(video|photo)\/\d{6,}/.test(u.pathname)) return true;
  if ((u.hostname === "vt.tiktok.com" || u.hostname === "vm.tiktok.com") && u.pathname.length > 2) return true;
  return false;
}

const STR: Record<Lang, {
  title: string; intro: string; placeholder: string; paste: string; download: string;
  redirecting: string; emptyError: string; invalidError: string; fullTool: string; toolHref: string;
}> = {
  id: {
    title: "Download Video TikTok",
    intro: "Tempel tautan video TikTok publik di bawah ini — tanpa watermark bila disediakan sumbernya, atau sebagai audio MP3. Gratis, tanpa instal, tanpa akun.",
    placeholder: "Tempel URL video TikTok di sini...",
    paste: "Tempel",
    download: "Unduh",
    redirecting: "Membuka pengunduh…",
    emptyError: "Tempel dulu tautan video TikTok.",
    invalidError: "Link ini tidak valid. Tempel link video TikTok yang lengkap, contohnya https://www.tiktok.com/@akun/video/1234567890 atau link pendek vt.tiktok.com.",
    fullTool: "Buka pengunduh TikTok lengkap",
    toolHref: "/tools/pengunduh-tiktok",
  },
  en: {
    title: "TikTok Video Downloader",
    intro: "Paste a public TikTok video link below — no watermark when the source provides it, or as MP3 audio. Free, no install, no account.",
    placeholder: "Paste TikTok video URL here...",
    paste: "Paste",
    download: "Download",
    redirecting: "Opening downloader…",
    emptyError: "Paste a TikTok video link first.",
    invalidError: "That link is not valid. Paste a complete TikTok video link, for example https://www.tiktok.com/@account/video/1234567890 or a short vt.tiktok.com link.",
    fullTool: "Open the full TikTok downloader",
    toolHref: "/en/tools/tiktok-downloader",
  },
};

export default function TikTokHomeDownloader({ lang = "id" }: { lang?: Lang }) {
  const t = STR[lang];
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  async function pasteFromClipboard() {
    try { const text = await navigator.clipboard.readText(); if (text) { setUrl(text.trim()); setError(""); } } catch { /* izin clipboard ditolak - pengguna menempel manual */ }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (redirecting) return;
    const value = url.trim();
    if (!value) { setError(t.emptyError); return; }
    if (!isSupportedTikTokUrl(value)) { setError(t.invalidError); return; }
    setError("");
    setRedirecting(true);
    router.push(`${t.toolHref}?url=${encodeURIComponent(value)}`);
  }

  return (
    // UI-03 Rev 1 (Part 3): scroll-mb reserves the mobile consent banner's
    // footprint (banner ~317px + 72px gap above the bottom nav) for any
    // scroll-into-view / anchor jump to this section, so the input and
    // buttons land fully above the banner instead of behind it.
    <section aria-labelledby="tiktok-home-judul" className="scroll-mb-[420px] rounded-3xl bg-primary-soft px-5 py-7 sm:px-8">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-white">
          <Icon name="download" className="h-5 w-5" />
        </span>
        <h2 id="tiktok-home-judul" className="scroll-mb-[420px] text-2xl font-extrabold text-ink">{t.title}</h2>
      </div>
      <p className="mt-3 max-w-2xl leading-relaxed text-secondary">{t.intro}</p>
      <form onSubmit={submit} noValidate className="mt-5">
        <label htmlFor="tt-home-url" className="sr-only">{t.title}</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="tt-home-url"
            type="url"
            inputMode="url"
            enterKeyHint="go"
            value={url}
            onChange={(e) => { setUrl(e.target.value); if (error) setError(""); }}
            placeholder={t.placeholder}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "tt-home-error" : undefined}
            className="min-h-[52px] w-full min-w-0 rounded-xl border border-ink/15 bg-paper px-4 text-base text-ink outline-none focus:border-primary"
          />
          <button type="button" onClick={pasteFromClipboard} className="min-h-[52px] shrink-0 rounded-xl border border-ink/15 bg-paper px-4 font-semibold text-ink">
            {t.paste}
          </button>
          <button type="submit" disabled={redirecting} className="min-h-[52px] shrink-0 rounded-xl bg-primary px-6 font-semibold text-white disabled:opacity-50">
            {redirecting ? t.redirecting : t.download}
          </button>
        </div>
        {error ? (
          <p id="tt-home-error" role="alert" className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-relaxed text-ink">
            {error}
          </p>
        ) : null}
      </form>
      <p className="mt-4">
        <Link href={t.toolHref} className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary-dark">
          {t.fullTool} <Icon name="arrow" className="ml-1 h-4 w-4" />
        </Link>
      </p>
    </section>
  );
}
