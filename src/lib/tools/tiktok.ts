// Tool Pengunduh TikTok - logika server (FR-TOOL-01 s.d. 03, PRD 7.3).
// Prinsip: TANPA menyimpan file pengguna (streaming pass-through), log hanya metadata anonim.
import { createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";

const SECRET = process.env.TOOL_TOKEN_SECRET ?? "dev-secret-ganti-di-produksi";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export type ToolErrorType = "link_tidak_valid" | "tidak_ditemukan" | "sumber_tidak_terjangkau" | "ekstraksi_gagal" | "terlalu_sering" | "tantangan_gagal";
export class ToolError extends Error { constructor(public type: ToolErrorType, message: string) { super(message); } }

export const ERROR_MESSAGES: Record<ToolErrorType, string> = {
  link_tidak_valid: "Link ini tidak valid. Tempel link video TikTok yang lengkap, contohnya https://www.tiktok.com/@akun/video/1234567890 atau link pendek vt.tiktok.com.",
  tidak_ditemukan: "Video tidak ditemukan. Kemungkinan video ini privat, hanya untuk teman, sudah dihapus, atau akunnya ditutup. Tool hanya bisa memproses video publik.",
  sumber_tidak_terjangkau: "TikTok tidak bisa dijangkau dari server kami saat ini. Ini bisa terjadi bila TikTok membatasi akses server. Coba lagi beberapa menit - bila tetap gagal, unduh videomu langsung dari aplikasi TikTok.",
  ekstraksi_gagal: "Video ditemukan tetapi sumber tidak menyediakan berkas yang bisa diunduh dari halaman publiknya (misalnya postingan foto atau siaran ulang). Coba video publik biasa yang lain.",
  terlalu_sering: "Terlalu banyak permintaan dari jaringanmu. Tunggu sebentar lalu coba lagi - batas ini melindungi tool dari penyalahgunaan.",
  tantangan_gagal: "Jawaban tantangan keamanan belum benar. Periksa hitungannya lalu coba lagi.",
};

export function hashId(id: string): string { return createHash("sha256").update(id).digest("hex").slice(0, 10); }
export function logEvent(event: string, meta: Record<string, string | number | boolean> = {}) {
  // HANYA metadata anonim: tanpa URL penuh, tanpa isi video. URL mentah tidak pernah ditulis ke log.
  console.info(JSON.stringify({ ts: new Date().toISOString(), tool: "tiktok", event, ...meta }));
}

// ---------- Validasi & normalisasi ----------
const HOSTS = new Set(["www.tiktok.com", "tiktok.com", "m.tiktok.com", "vt.tiktok.com", "vm.tiktok.com"]);
export interface NormalizedLink { kind: "video" | "short"; videoId: string | null; url: string }
export function normalizeLink(raw: string): NormalizedLink {
  let u: URL;
  try { u = new URL(raw.trim()); } catch { throw new ToolError("link_tidak_valid", ERROR_MESSAGES.link_tidak_valid); }
  if (!HOSTS.has(u.hostname)) throw new ToolError("link_tidak_valid", ERROR_MESSAGES.link_tidak_valid);
  const m = u.pathname.match(/\/(video|photo)\/(\d{6,})/);
  if (m) return { kind: "video", videoId: m[2], url: `https://www.tiktok.com${u.pathname}` };
  if ((u.hostname === "vt.tiktok.com" || u.hostname === "vm.tiktok.com") && u.pathname.length > 2)
    return { kind: "short", videoId: null, url: u.toString() };
  throw new ToolError("link_tidak_valid", ERROR_MESSAGES.link_tidak_valid);
}
async function fetchWithTimeout(url: string, init: RequestInit = {}, ms = 15000): Promise<Response> {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
  try { return await fetch(url, { ...init, signal: ctl.signal, headers: { "User-Agent": UA, ...(init.headers ?? {}) } }); }
  finally { clearTimeout(t); }
}
export async function resolveShort(url: string): Promise<string> {
  const r = await fetchWithTimeout(url, { redirect: "follow" });
  const finalUrl = r.url || url;
  const m = finalUrl.match(/\/(video|photo)\/(\d{6,})/);
  if (!m) throw new ToolError("tidak_ditemukan", ERROR_MESSAGES.tidak_ditemukan);
  return `https://www.tiktok.com${new URL(finalUrl).pathname}`;
}

// ---------- Ekstraksi ----------
export interface MediaOption { kind: "tanpa_watermark" | "standar" | "audio"; label: string; ext: string }
export interface VideoInfo { videoId: string; title: string; author: string; authorUrl: string; thumbnail: string | null; options: (MediaOption & { token: string })[] }
function unesc(s: string): string { try { return JSON.parse(`"${s.replace(/"/g, '\\"')}"`); } catch { return s.replace(/\\u002F/g, "/").replace(/\\\//g, "/"); } }
function grab(html: string, key: string): string | null {
  const m = html.match(new RegExp(`"${key}":"((?:[^"\\\\]|\\\\.)*)"`));
  return m ? unesc(m[1]) : null;
}
export function signToken(payload: object): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}
export function signData(payload: Record<string, unknown>): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${mac}`;
}
export function verifyData<T extends Record<string, unknown>>(token: string): T | null {
  const [body, mac] = (token ?? "").split(".");
  if (!body || !mac) return null;
  const expect = createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(mac); const b = Buffer.from(expect);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T & { exp?: number };
  if (!data.exp || Date.now() > data.exp) return null;
  return data;
}
export function verifyToken(token: string): { sid: string; kind: string; vid: string } | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expect = createHmac("sha256", SECRET).update(body).digest("base64url");
  if (sig !== expect) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString()) as { sid: string; kind: string; vid: string; exp: number };
    if (Date.now() > data.exp) return null;
    if (!data.sid) return null;
    return data;
  } catch { return null; }
}

// ---------- Sesi media (cookie TikTok wajib untuk CDN) ----------
// CDN TikTok menolak (403) permintaan tanpa cookie sesi dari pengambilan halaman.
// Karena itu media TIDAK pernah diberikan ke klien: server menyimpan sesi singkat
// (10 menit, hanya di memori) dan token unduhan hanya berisi referensi sesi.
interface MediaSession { pageUrl: string; cookies: string; media: Record<string, string>; exp: number }
const sessions = new Map<string, MediaSession>();
function saveSession(pageUrl: string, cookies: string, media: Record<string, string>): string {
  const now = Date.now();
  for (const [k, v] of sessions) if (v.exp < now) sessions.delete(k);
  const sid = randomBytes(16).toString("hex");
  sessions.set(sid, { pageUrl, cookies, media, exp: now + 10 * 60 * 1000 });
  return sid;
}
export function getSession(sid: string): MediaSession | null {
  const s = sessions.get(sid);
  if (!s) return null;
  if (s.exp < Date.now()) { sessions.delete(sid); return null; }
  return s;
}
function cookieHeader(res: Response): string {
  const raw = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
  return raw.map((c) => c.split(";")[0]).filter(Boolean).join("; ");
}

export async function fetchVideoInfo(link: NormalizedLink): Promise<VideoInfo> {
  let pageUrl = link.url;
  if (link.kind === "short") {
    try { pageUrl = await resolveShort(link.url); }
    catch (e) { if (e instanceof ToolError) throw e; throw new ToolError("sumber_tidak_terjangkau", ERROR_MESSAGES.sumber_tidak_terjangkau); }
  }
  const idMatch = pageUrl.match(/\/(\d{6,})\/?$/);
  const videoId = link.videoId ?? (idMatch ? idMatch[1] : "");
  let oembed: { title?: string; author_name?: string; author_url?: string; thumbnail_url?: string } | null = null;
  let oembedOk = false;
  try {
    const r = await fetchWithTimeout(`https://www.tiktok.com/oembed?url=${encodeURIComponent(pageUrl)}`);
    if (r.ok) { oembed = await r.json(); oembedOk = true; }
  } catch { /* lanjut ke pemeriksaan halaman */ }
  let html = ""; let cookies = "";
  try {
    const r = await fetchWithTimeout(pageUrl);
    if (r.ok) { html = await r.text(); cookies = cookieHeader(r); }
  } catch { throw new ToolError("sumber_tidak_terjangkau", ERROR_MESSAGES.sumber_tidak_terjangkau); }
  const downloadAddr = html ? grab(html, "downloadAddr") : null;
  const playAddr = html ? grab(html, "playAddr") : null;
  const musicMatch = html.match(/"music":\{[^}]*?"playUrl":"((?:[^"\\]|\\.)*)"/);
  const musicUrl = musicMatch ? unesc(musicMatch[1]) : null;
  if (!oembedOk && !playAddr && !downloadAddr) throw new ToolError("tidak_ditemukan", ERROR_MESSAGES.tidak_ditemukan);
  const media: Record<string, string> = {};
  if (downloadAddr) media.tanpa_watermark = downloadAddr;
  if (playAddr && playAddr !== downloadAddr) media.standar = playAddr;
  if (musicUrl) media.audio = musicUrl;
  if (Object.keys(media).length === 0) throw new ToolError("ekstraksi_gagal", ERROR_MESSAGES.ekstraksi_gagal);
  const sid = saveSession(pageUrl, cookies, media);
  const options: (MediaOption & { token: string })[] = [];
  const labelFor: Record<string, string> = { tanpa_watermark: "Unduh Video (Tanpa Watermark)", standar: "Unduh Video (Standar, dengan Watermark)", audio: "Unduh Audio (MP3)" };
  for (const kind of ["tanpa_watermark", "standar", "audio"] as const) {
    if (!media[kind]) continue;
    options.push({ kind, label: labelFor[kind], ext: kind === "audio" ? "mp3" : "mp4",
      token: signToken({ sid, kind, vid: videoId, exp: Date.now() + 10 * 60 * 1000 }) });
  }
  const nickname = html ? grab(html, "nickname") : null;
  const desc = html ? grab(html, "desc") : null;
  const cover = html ? (grab(html, "dynamicCover") ?? grab(html, "originCover")) : null;
  return {
    videoId,
    title: (oembed?.title || desc || "").trim() || `Video TikTok ${videoId}`,
    author: oembed?.author_name || nickname || "Kreator TikTok",
    authorUrl: oembed?.author_url || pageUrl,
    thumbnail: oembed?.thumbnail_url || cover,
    options,
  };
}

// ---------- Rate limit + tantangan ----------
// Rate limit kini disimpan di store bersama (Redis Upstash bila dikonfigurasi, fallback
// memori) lewat src/lib/tools/ratelimit.ts - lihat FR-MNT-01. Tantangan tetap lokal per IP.
import { checkInfoRate, checkDownloadLimit } from "./ratelimit";
export async function checkRate(ip: string, limit = 12, windowMs = 60_000): Promise<{ allowed: boolean; needChallenge: boolean }> {
  return checkInfoRate(ip, limit, windowMs);
}
export async function checkDownloadRate(ip: string): Promise<boolean> { return checkDownloadLimit(ip); }

export function issueChallenge(ip: string): { a: number; b: number; token: string } {
  const a = 2 + Math.floor(Math.random() * 8); const b = 3 + Math.floor(Math.random() * 7);
  const token = signToken({ chal: true, ip, sum: a + b, exp: Date.now() + 5 * 60 * 1000 });
  return { a, b, token };
}
export function verifyChallenge(ip: string, token: string, answer: number): boolean {
  const [body, sig] = (token || "").split(".");
  if (!body || !sig) return false;
  if (createHmac("sha256", SECRET).update(body).digest("base64url") !== sig) return false;
  try {
    const d = JSON.parse(Buffer.from(body, "base64url").toString()) as { chal: boolean; ip: string; sum: number; exp: number };
    return d.chal === true && d.ip === ip && Date.now() <= d.exp && d.sum === answer;
  } catch { return false; }
}
export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}
export { UA };
