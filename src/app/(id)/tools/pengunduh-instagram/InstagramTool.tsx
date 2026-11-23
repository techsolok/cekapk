"use client";
import { useState } from "react";
import { Icon } from "@/components/home";

interface IgMedia { id: string; title: string; uploader: string; thumbnail: string; token?: string }
type Phase = "idle" | "loading" | "done" | "error" | "challenge";
export default function InstagramTool() {
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
      if (!d.ok && d.challenge) { setChallengeQ(d.challenge.question); setChallengeToken(d.challenge.token); setPhase("challenge"); setError(d.message ?? ""); return; }
      if (!d.ok) { setError(d.message ?? "Gagal memproses tautan."); setPhase("error"); return; }
      setMedia(d.media); setPhase("done");
      if (d.media) {
        fetch("/api/tools/tiktok/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tool: "instagram", event: "info_success" }) }).catch(() => {});
        setNote("Selesai. Tautan unduhan berlaku 10 menit.");
      }
    } catch { setError("Tidak bisa menghubungi server. Periksa koneksimu lalu coba lagi."); setPhase("error"); }
  }
  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="ig-url" className="font-semibold text-ink">Tempel tautan Instagram di sini</label>
          <input id="ig-url" type="text" inputMode="url" autoComplete="off" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.instagram.com/reel/…" className="mt-1 min-h-[52px] w-full rounded-xl border border-ink/15 bg-paper px-4 text-base text-ink shadow-sm outline-none focus:border-primary" required />
          <p className="mt-1 text-xs leading-relaxed text-muted">Didukung: kiriman video, Reels, dan IGTV publik.</p>
        </div>
        {phase === "challenge" && (
          <div className="rounded-xl bg-amber-50 p-3">
            <label htmlFor="ig-challenge" className="flex items-center gap-2 text-sm font-semibold text-ink"><Icon name="alert" className="h-4 w-4 shrink-0 text-warn" />Tantangan ringan: berapa {challengeQ}</label>
            <input id="ig-challenge" type="text" inputMode="numeric" value={challengeA} onChange={(e) => setChallengeA(e.target.value)} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 bg-paper px-3" placeholder="Jawabanmu" />
          </div>
        )}
        <button type="submit" disabled={phase === "loading"} className="min-h-[52px] w-full rounded-xl bg-primary px-5 font-semibold text-white shadow-sm disabled:opacity-60">{phase === "loading" ? "Memproses…" : "Ambil Info Video"}</button>
      </form>
      {error && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm leading-relaxed text-red-800"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
      {phase === "done" && media && (
        <div className="space-y-3 rounded-2xl border border-mist p-4">
          <div className="flex gap-3">
            {media.thumbnail && <img src={media.thumbnail} alt="Pratinjau dari Instagram" className="h-24 w-16 rounded-lg object-cover" loading="lazy" />}
            <div className="min-w-0">
              <p className="font-semibold leading-snug text-ink">{media.title}</p>
              {media.uploader && <p className="mt-0.5 text-sm text-muted">@{media.uploader}</p>}
              <p className="text-xs text-muted">Hasil resmi dari Instagram, tanpa watermark tambahan dari kami.</p>
            </div>
          </div>
          <p className="text-xs text-muted">Tautan pratinjau berasal dari Instagram sendiri dan tidak disimpan di server kami.</p>
          {media.token && <a href={`/api/tools/instagram/download?token=${encodeURIComponent(media.token)}`} className="flex min-h-[52px] items-center justify-center rounded-xl bg-primary px-5 font-semibold text-white shadow-sm"><Icon name="download" className="mr-2 h-5 w-5 shrink-0" />Unduh Video</a>}
          {note && <p className="text-sm text-ink/70" role="status">{note}</p>}
        </div>
      )}
      <p className="text-xs leading-relaxed text-muted">Hanya konten publik. Unduh hanya konten milikmu atau yang izinnya jelas, dan hormati hak cipta pembuatnya.</p>
    </div>
  );
}
