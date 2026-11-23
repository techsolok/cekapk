// TikTok downloader tool — shared by the Indonesian page
// (/tools/pengunduh-tiktok) and the English pages (/en/tools and
// /en/tools/tiktok-downloader). SEO-18: the component takes a `lang`
// prop ("id" | "en", default "id"). All UI strings come from the table
// below; server error messages arrive in Indonesian, so the English
// interface maps the machine-readable `error.type` to English text and
// maps download-option labels by `kind` instead of displaying the
// server's Indonesian labels. Backend, rate limits, challenge flow and
// download tokens are unchanged.
"use client";
import { useEffect, useRef, useState } from "react";
import { ToolShell } from "./ui";
import { Icon } from "./home";

interface MediaOption { kind: string; label: string; ext: string; token: string }
interface VideoInfo { videoId: string; title: string; author: string; authorUrl: string; thumbnail: string | null; options: MediaOption[] }
type State =
  | { phase: "idle" }
  | { phase: "loading"; slow: boolean }
  | { phase: "success"; info: VideoInfo }
  | { phase: "error"; message: string; type: string }
  | { phase: "challenge"; a: number; b: number; token: string; pendingUrl: string };

type Lang = "id" | "en";
const STR: Record<Lang, {
  shellTitle: string; label: string; placeholder: string; hint: string; paste: string; submit: string; submitting: string;
  footnote: string; loading: string; loadingSlow: string;
  challengeTitle: string; challengeText: (a: number, b: number) => string; challengeAria: string; challengeSubmit: string;
  errorTitle: string; tryAnother: string; networkError: string; fallbackError: string;
  previewAlt: string; by: string; successNote: string; processAnother: string;
}> = {
  id: {
    shellTitle: "Pengunduh Video TikTok",
    label: "Tempel link video TikTok",
    placeholder: "https://www.tiktok.com/@akun/video/1234567890",
    hint: "Didukung: tautan video tiktok.com dan tautan pendek vt.tiktok.com.",
    paste: "Tempel",
    submit: "Ambil Video",
    submitting: "Memproses…",
    footnote: "Gratis, tanpa instal aplikasi, tanpa akun. Kami tidak menyimpan video yang kamu proses - berkas mengalir langsung dari TikTok ke perangkatmu lewat server kami.",
    loading: "Sedang menghubungi TikTok…",
    loadingSlow: "Sumber agak lambat merespons. Tetap di halaman ini - hasil atau pesan penjelasannya akan muncul di sini, bukan spinner tanpa akhir.",
    challengeTitle: "Satu langkah keamanan",
    challengeText: (a, b) => `Permintaan dari jaringanmu sangat sering, jadi jawab dulu: berapa ${a} + ${b}?`,
    challengeAria: "Jawaban tantangan",
    challengeSubmit: "Kirim & Lanjutkan",
    errorTitle: "Belum berhasil",
    tryAnother: "Coba Link Lain",
    networkError: "Koneksi ke server kami gagal. Periksa internetmu lalu coba lagi.",
    fallbackError: "Terjadi kesalahan. Coba lagi.",
    previewAlt: "Pratinjau video TikTok",
    by: "oleh",
    successNote: "Pilihan yang tampil adalah yang benar-benar disediakan sumber publik video ini - bila tanpa watermark tidak tersedia dari sumbernya, kami tidak menampilkannya daripada menjanjikan yang palsu. Tautan unduhan berlaku 10 menit. Gunakan hanya untuk videomu sendiri atau yang pemiliknya mengizinkan.",
    processAnother: "Proses Video Lain",
  },
  en: {
    shellTitle: "TikTok Video Downloader",
    label: "Paste the TikTok video link",
    placeholder: "https://www.tiktok.com/@account/video/1234567890",
    hint: "Supported: tiktok.com video links and vt.tiktok.com short links.",
    paste: "Paste",
    submit: "Get Video",
    submitting: "Processing…",
    footnote: "Free, no app install, no account. We don't store the videos you process — files stream directly from TikTok to your device through our server.",
    loading: "Contacting TikTok…",
    loadingSlow: "The source is responding slowly. Stay on this page — the result or an explanatory message will appear here, not an endless spinner.",
    challengeTitle: "One security step",
    challengeText: (a, b) => `Requests from your network are very frequent, so answer first: what is ${a} + ${b}?`,
    challengeAria: "Challenge answer",
    challengeSubmit: "Send & Continue",
    errorTitle: "Not successful yet",
    tryAnother: "Try Another Link",
    networkError: "Could not reach our server. Check your internet connection and try again.",
    fallbackError: "Something went wrong. Please try again.",
    previewAlt: "TikTok video preview",
    by: "by",
    successNote: "The options shown are only the ones the video's public source actually provides — if no-watermark is not available from the source, we don't show it instead of promising a fake one. Download links are valid for 10 minutes. Use only for your own videos or ones the owner allows.",
    processAnother: "Process Another Video",
  },
};

// English text for every error type the info API can return (see
// ERROR_MESSAGES in src/lib/tools/tiktok.ts). Unknown types fall back
// to the generic English message, never to the Indonesian text.
const ERR_EN: Record<string, string> = {
  link_tidak_valid: "That link is not valid. Paste a complete TikTok video link, for example https://www.tiktok.com/@account/video/1234567890 or a short vt.tiktok.com link.",
  tidak_ditemukan: "Video not found. It may be private, friends-only, deleted, or the account may be closed. This tool can only process public videos.",
  sumber_tidak_terjangkau: "TikTok cannot be reached from our server right now. This can happen when TikTok limits server access. Try again in a few minutes — if it still fails, download your video directly from the TikTok app.",
  ekstraksi_gagal: "The video was found, but the source does not provide a downloadable file from its public page (for example, a photo post or a repost). Try a different ordinary public video.",
  terlalu_sering: "Too many requests from your network. Wait a moment and try again — this limit protects the tool from abuse.",
  tantangan_gagal: "The security challenge answer was not correct yet. Check the calculation and try again.",
};
// English download-option labels, keyed by the machine-readable kind
// (the server sends Indonesian labels).
const OPT_EN: Record<string, string> = {
  tanpa_watermark: "Download Video (No Watermark)",
  standar: "Download Video (Standard, With Watermark)",
  audio: "Download Audio (MP3)",
};

export default function TiktokTool({ lang = "id" }: { lang?: Lang }) {
  const t = STR[lang];
  const [url, setUrl] = useState("");
  const [state, setState] = useState<State>({ phase: "idle" });
  const [answer, setAnswer] = useState("");
  const slowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSubmitted = useRef(false);

  async function submit(targetUrl: string, challenge?: { token: string; answer: number }) {
    setState({ phase: "loading", slow: false });
    slowTimer.current = setTimeout(() => setState((s) => (s.phase === "loading" ? { phase: "loading", slow: true } : s)), 1000);
    try { fetch("/api/tools/tiktok/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "tool_start" }) }).catch(() => {}); } catch { /* abaikan */ }
    try {
      const r = await fetch("/api/tools/tiktok/info", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl, challengeToken: challenge?.token, challengeAnswer: challenge?.answer }),
      });
      const data = await r.json();
      if (data?.error?.needChallenge && data.error.challenge) {
        setState({ phase: "challenge", a: data.error.challenge.a, b: data.error.challenge.b, token: data.error.challenge.token, pendingUrl: targetUrl });
        return;
      }
      if (data.ok) setState({ phase: "success", info: data.data as VideoInfo });
      else setState({ phase: "error", message: lang === "en" ? (ERR_EN[data?.error?.type] ?? t.fallbackError) : (data?.error?.message ?? t.fallbackError), type: data?.error?.type ?? "tidak_dikenal" });
    } catch {
      setState({ phase: "error", message: t.networkError, type: "jaringan" });
    } finally { if (slowTimer.current) clearTimeout(slowTimer.current); }
  }
  // UI-03: the homepage downloader hands the URL here as ?url=. Read it on
  // mount (plain window.location.search, so the tool pages stay statically
  // prerendered — no useSearchParams/Suspense needed) and submit it once
  // through the unchanged info flow; the server re-validates and returns
  // the existing localized errors for bad links.
  useEffect(() => {
    if (autoSubmitted.current) return;
    const param = new URLSearchParams(window.location.search).get("url");
    if (param && param.trim()) {
      autoSubmitted.current = true;
      setUrl(param.trim());
      submit(param.trim());
    }
    // Mount-only: submit is this component's own handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function pasteFromClipboard() {
    try { const t = await navigator.clipboard.readText(); if (t) setUrl(t.trim()); } catch { /* izin clipboard ditolak - pengguna menempel manual */ }
  }
  function reset() { setUrl(""); setAnswer(""); setState({ phase: "idle" }); }

  return (
    <ToolShell title={t.shellTitle}>
      <form onSubmit={(e) => { e.preventDefault(); if (url.trim()) submit(url.trim()); }} className="space-y-3">
        <label htmlFor="tt-url" className="block font-semibold text-ink">{t.label}</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input id="tt-url" type="url" inputMode="url" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder={t.placeholder}
            className="min-h-[52px] w-full rounded-xl border border-ink/15 bg-paper px-3 text-base text-ink shadow-sm outline-none focus:border-primary" />
          <button type="button" onClick={pasteFromClipboard} className="min-h-[52px] shrink-0 rounded-xl border border-ink/15 bg-paper px-4 font-semibold text-ink shadow-sm">{t.paste}</button>
          <button type="submit" disabled={state.phase === "loading" || !url.trim()} className="min-h-[52px] shrink-0 rounded-xl bg-primary px-6 font-semibold text-white shadow-sm disabled:opacity-50">
            {state.phase === "loading" ? t.submitting : t.submit}
          </button>
        </div>
        <p className="text-xs leading-relaxed text-muted">{t.hint}</p>
        <p className="text-xs leading-relaxed text-muted">{t.footnote}</p>
      </form>

      {state.phase === "loading" && (
        <div className="mt-4 rounded-xl bg-paper p-4" role="status">
          <p className="font-medium text-ink">{t.loading}</p>
          {state.slow && <p className="mt-1 text-sm text-ink/65">{t.loadingSlow}</p>}
        </div>
      )}

      {state.phase === "challenge" && (
        <form onSubmit={(e) => { e.preventDefault(); submit(state.pendingUrl, { token: state.token, answer: Number(answer) }); }} className="mt-4 space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-ink">{t.challengeTitle}</p>
          <p className="text-sm text-ink/75">{t.challengeText(state.a, state.b)}</p>
          <div className="flex gap-2">
            <input aria-label={t.challengeAria} type="number" value={answer} onChange={(e) => setAnswer(e.target.value)} className="min-h-[48px] w-28 rounded-xl border border-ink/15 bg-paper px-3" />
            <button type="submit" className="min-h-[48px] rounded-xl bg-primary px-5 font-semibold text-white">{t.challengeSubmit}</button>
          </div>
        </form>
      )}

      {state.phase === "error" && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
          <p className="flex items-center gap-2 font-semibold text-ink"><Icon name="alert" className="h-5 w-5 shrink-0 text-danger" />{t.errorTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink/80">{state.message}</p>
          <button type="button" onClick={reset} className="mt-3 min-h-[44px] rounded-lg border border-ink/15 bg-paper px-4 text-sm font-semibold text-ink">{t.tryAnother}</button>
        </div>
      )}

      {state.phase === "success" && (
        <div className="mt-4 space-y-3 rounded-xl bg-paper p-4">
          <div className="flex gap-3">
            {state.info.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={state.info.thumbnail} alt={t.previewAlt} className="h-28 w-[70px] shrink-0 rounded-lg object-cover" loading="lazy" />
            )}
            <div className="min-w-0">
              <p className="font-semibold leading-snug text-ink">{state.info.title}</p>
              <p className="mt-1 text-sm text-muted">{t.by} <a href={state.info.authorUrl} target="_blank" rel="noopener" className="font-medium text-linkblue">{state.info.author}</a></p>
            </div>
          </div>
          <div className="grid gap-2">
            {state.info.options.map((o) => (
              <a key={o.token} href={`/api/tools/tiktok/download?t=${encodeURIComponent(o.token)}${lang === "en" ? "&lang=en" : ""}`} className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-5 font-semibold text-white shadow-sm">
                <Icon name="download" className="mr-2 h-5 w-5 shrink-0" />
                {lang === "en" ? (OPT_EN[o.kind] ?? o.label) : o.label}
              </a>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-muted">{t.successNote}</p>
          <button type="button" onClick={reset} className="min-h-[44px] rounded-lg border border-ink/15 px-4 text-sm font-semibold text-ink">{t.processAnother}</button>
        </div>
      )}
    </ToolShell>
  );
}
