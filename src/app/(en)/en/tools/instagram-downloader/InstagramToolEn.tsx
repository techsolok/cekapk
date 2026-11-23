// English Instagram downloader (SEO-17). Same backend as the Indonesian
// tool: POST /api/tools/instagram/info, HMAC download token via
// /api/tools/instagram/download, same rate limits and challenge flow.
// Only the UI strings are English; server error messages arrive in
// Indonesian, so the client maps the machine-readable `kind` to English
// text instead of displaying the server message.
"use client";
import { useState } from "react";
import { Icon } from "@/components/home";

interface IgMedia { id: string; title: string; uploader: string; thumbnail: string; token?: string }
type Phase = "idle" | "loading" | "done" | "error" | "challenge";

// English text for every error kind the API can return. Unknown kinds
// fall back to a generic English message, never to the Indonesian text.
const ERR_EN: Record<string, string> = {
  ditolak: "That link format is not valid. Paste a link to a public Instagram post, Reel, or video — not plain text or a link from another site.",
  tautan_privat: "This content is private or followers-only. This tool only processes public content and never asks for your Instagram login.",
  tautan_tidak_ditemukan: "Link not found. The post may have been deleted or the address is incomplete — copy the link again from the Instagram app.",
  sumber_tidak_terjangkau: "Instagram cannot be reached from the server right now, or it is limiting access. Try again in a few minutes.",
  terlalu_sering: "Too many requests in a short time. Wait a moment and try again.",
  tantangan: "For security, answer this arithmetic challenge first, then press the button again.",
};
const FALLBACK_ERROR = "Something went wrong. Please try again.";
export default function InstagramToolEn() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [challengeQ, setChallengeQ] = useState("");
  const [challengeToken, setChallengeToken] = useState("");
  const [challengeA, setChallengeA] = useState("");
  const [media, setMedia] = useState<IgMedia | null>(null);
  const [note, setNote] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("loading"); setError(""); setNote("");
    try {
      const r = await fetch("/api/tools/instagram/info", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, challengeToken, challengeAnswer: Number(challengeA) }) });
      const d = await r.json();
      if (!d.ok && d.challenge) { setChallengeQ(d.challenge.question); setChallengeToken(d.challenge.token); setPhase("challenge"); setError(ERR_EN[d.kind] ?? ERR_EN.tantangan); return; }
      if (!d.ok) { setError(ERR_EN[d.kind] ?? FALLBACK_ERROR); setPhase("error"); return; }
      setMedia(d.media); setPhase("done");
      if (d.media) {
        fetch("/api/tools/tiktok/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tool: "instagram", event: "info_success" }) }).catch(() => {});
        setNote("Done. The download link is valid for 10 minutes.");
      }
    } catch { setError("Could not reach the server. Check your connection and try again."); setPhase("error"); }
  }
  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="ig-url" className="font-semibold text-ink">Paste your Instagram link here</label>
          <input id="ig-url" type="text" inputMode="url" autoComplete="off" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.instagram.com/reel/…" className="mt-1 min-h-[52px] w-full rounded-xl border border-ink/15 bg-paper px-4 text-base text-ink shadow-sm outline-none focus:border-primary" required />
          <p className="mt-1 text-xs leading-relaxed text-muted">Supported: public video posts, Reels, and IGTV.</p>
        </div>
        {phase === "challenge" && (
          <div className="rounded-xl bg-amber-50 p-3">
            <label htmlFor="ig-challenge" className="flex items-center gap-2 text-sm font-semibold text-ink"><Icon name="alert" className="h-4 w-4 shrink-0 text-warn" />Quick check: {challengeQ}</label>
            <input id="ig-challenge" type="text" inputMode="numeric" value={challengeA} onChange={(e) => setChallengeA(e.target.value)} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 bg-paper px-3" placeholder="Your answer" />
          </div>
        )}
        <button type="submit" disabled={phase === "loading"} className="min-h-[52px] w-full rounded-xl bg-primary px-5 font-semibold text-white shadow-sm disabled:opacity-60">{phase === "loading" ? "Processing…" : "Get Video Info"}</button>
      </form>
      {error && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm leading-relaxed text-red-800"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
      {phase === "done" && media && (
        <div className="space-y-3 rounded-2xl border border-mist p-4">
          <div className="flex gap-3">
            {media.thumbnail && <img src={media.thumbnail} alt="Preview from Instagram" className="h-24 w-16 rounded-lg object-cover" loading="lazy" />}
            <div className="min-w-0">
              <p className="font-semibold leading-snug text-ink">{media.title}</p>
              {media.uploader && <p className="mt-0.5 text-sm text-muted">@{media.uploader}</p>}
              <p className="text-xs text-muted">Official result from Instagram, with no extra watermark from us.</p>
            </div>
          </div>
          <p className="text-xs text-muted">Preview links come from Instagram itself and are not stored on our server.</p>
          {media.token && <a href={`/api/tools/instagram/download?token=${encodeURIComponent(media.token)}&lang=en`} className="flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-5 font-semibold text-white shadow-sm"><Icon name="download" className="mr-2 h-5 w-5 shrink-0" />Download Video</a>}
          {note && <p className="text-sm text-ink/70" role="status">{note}</p>}
        </div>
      )}
      <p className="text-xs leading-relaxed text-muted">Public content only. Download only your own content or content you clearly have permission for, and respect the creator&apos;s copyright.</p>
    </div>
  );
}
