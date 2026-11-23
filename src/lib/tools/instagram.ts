// Tool 2: Pengunduh Instagram (pola Insta Grab Ahmad): ekstraksi yt-dlp lewat proses anak;
// TANPA login/cookie (konten publik saja, by design). Rate limit + tantangan memakai
// infrastruktur yang sama dengan tool TikTok (src/lib/tools/tiktok.ts).
import { spawn } from "node:child_process";
import { signData } from "./tiktok";

export type IgKind = "sukses" | "tautan_privat" | "tautan_tidak_ditemukan" | "sumber_tidak_terjangkau" | "ditolak";
export interface IgInfo {
  ok: boolean; kind: IgKind; message: string;
  media?: { id: string; title: string; uploader: string; thumbnail: string; token: string };
}
const MSG: Record<Exclude<IgKind, "sukses">, string> = {
  tautan_privat: "Konten ini privat atau hanya untuk pengikut. Tool ini hanya memproses konten publik dan tidak pernah meminta login Instagram.",
  tautan_tidak_ditemukan: "Tautan tidak ditemukan. Mungkin kiriman sudah dihapus atau alamatnya tidak lengkap - salin ulang tautan dari aplikasi Instagram.",
  sumber_tidak_terjangkau: "Instagram tidak bisa dijangkau dari server saat ini atau membatasi akses. Coba lagi beberapa menit lagi.",
  ditolak: "Format tautan tidak valid. Tempel tautan kiriman, Reel, atau video Instagram publik, bukan teks biasa atau tautan dari situs lain.",
};
export function extractShortcode(raw: string): string | null {
  let value = (raw ?? "").trim();
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) value = "https://" + value;
  let u: URL;
  try { u = new URL(value); } catch { return null; }
  const host = u.hostname.toLowerCase().replace(/^www\./, "");
  if (host !== "instagram.com") return null;
  const m = u.pathname.match(/^\/(p|reel|reels|tv)\/([A-Za-z0-9_-]{5,})/);
  return m ? m[2] : null;
}
export function ytdlpBin(): string { return process.env.YTDLP_BIN || "yt-dlp"; }

interface YtJson { id?: string; title?: string; uploader?: string; thumbnail?: string; url?: string; formats?: { url?: string; vcodec?: string; acodec?: string; height?: number }[] }
export function pickBestFormat(j: YtJson): string | null {
  const fmts = (j.formats ?? []).filter((f) => f.url && f.vcodec && f.vcodec !== "none" && f.acodec && f.acodec !== "none");
  fmts.sort((a, b) => (b.height ?? 0) - (a.height ?? 0));
  return fmts[0]?.url ?? j.url ?? null;
}
export function classifyYtError(stderr: string): Exclude<IgKind, "sukses" | "ditolak"> {
  const t = (stderr || "").toLowerCase();
  if (/private|login required|sign in|cookies|age.?gate|auth/.test(t)) return "tautan_privat";
  if (/not found|404|does not exist|no longer|removed|unavailable/.test(t)) return "tautan_tidak_ditemukan";
  return "sumber_tidak_terjangkau";
}
export async function fetchInfo(rawUrl: string): Promise<IgInfo> {
  const code = extractShortcode(rawUrl);
  if (!code) return { ok: false, kind: "ditolak", message: MSG.ditolak };
  const canonical = `https://www.instagram.com/p/${code}/`;
  const out = await new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(ytdlpBin(), ["--dump-json", "--no-warnings", "--no-playlist", "--socket-timeout", "15", canonical], { timeout: 45000 });
    let stdout = ""; let stderr = "";
    child.stdout.on("data", (d) => { stdout += d.toString(); if (stdout.length > 2_000_000) child.kill(); });
    child.stderr.on("data", (d) => { stderr += d.toString(); });
    child.on("error", () => resolve({ code: -1, stdout: "", stderr: "spawn-error" }));
    child.on("close", (c) => resolve({ code: c ?? -1, stdout, stderr }));
  });
  if (out.code === -1)
    return { ok: false, kind: "sumber_tidak_terjangkau", message: "Mesin ekstraksi (yt-dlp) belum tersedia di server. Administrator perlu memasangnya atau mengatur YTDLP_BIN." };
  if (out.code !== 0 || !out.stdout.trim()) {
    const kind = classifyYtError(out.stderr);
    return { ok: false, kind, message: MSG[kind] };
  }
  let j: YtJson;
  try { j = JSON.parse(out.stdout.trim().split("\n").pop()!) as YtJson; } catch { return { ok: false, kind: "sumber_tidak_terjangkau", message: MSG.sumber_tidak_terjangkau }; }
  const mediaUrl = pickBestFormat(j);
  if (!mediaUrl) return { ok: false, kind: "sumber_tidak_terjangkau", message: MSG.sumber_tidak_terjangkau };
  const token = signData({ u: mediaUrl, vid: "ig-" + code, kind: "video", exp: Date.now() + 10 * 60 * 1000 });
  return { ok: true, kind: "sukses", message: "Berhasil.", media: { id: code, title: (j.title || "Video Instagram").slice(0, 120), uploader: j.uploader || "", thumbnail: j.thumbnail || "", token } };
}
