import { verifyToken, getSession, checkDownloadRate, clientIp, logEvent, hashId, UA } from "@/lib/tools/tiktok";

export const dynamic = "force-dynamic";
// Ambil media dengan batas waktu 20 detik + 1 kali ulangan (sumber kadang lambat dari jaringan server).
async function fetchMedia(mediaUrl: string, session: { pageUrl: string; cookies: string }): Promise<Response> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20_000);
    try {
      return await fetch(mediaUrl, { signal: ctl.signal, headers: { "User-Agent": UA, Referer: session.pageUrl, ...(session.cookies ? { Cookie: session.cookies } : {}) } });
    } catch (e) { if (attempt === 1) throw e; }
    finally { clearTimeout(t); }
  }
  throw new Error("unreachable");
}
// Proxy streaming sesi: berkas mengalir lewat server TANPA disimpan (FR-TOOL-01/02).
// CDN TikTok mensyaratkan cookie sesi dari pengambilan halaman - sesi disimpan server 10 menit.
export async function GET(req: Request) {
  const ip = clientIp(req);
  // SEO-18: the English tool pages link here with ?lang=en so plain-text
  // download errors render in English. Default (no lang) stays Indonesian.
  // Message language only — token verification, session lookup, rate
  // limits and streaming are unchanged.
  const reqUrl = new URL(req.url);
  const langEn = reqUrl.searchParams.get("lang") === "en";
  const t = (id: string, en: string) => (langEn ? en : id);
  const token = reqUrl.searchParams.get("t") ?? "";
  const data = verifyToken(token);
  if (!data) return new Response(t("Tautan unduhan sudah kedaluwarsa atau tidak sah. Kembali ke tool dan tempel link lagi.", "Download link has expired or is invalid. Go back to the tool and paste the link again."), { status: 410, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const session = getSession(data.sid);
  const mediaUrl = session?.media[data.kind];
  if (!session || !mediaUrl) return new Response(t("Sesi unduhan sudah berakhir. Kembali ke tool dan proses link-nya sekali lagi.", "Download session has ended. Go back to the tool and process the link once more."), { status: 410, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  if (!(await checkDownloadRate(ip))) return new Response(t("Batas unduhan per jam tercapai. Coba lagi nanti.", "Hourly download limit reached. Try again later."), { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  let upstream: Response;
  try {
    upstream = await fetchMedia(mediaUrl, session);
  } catch { return new Response(t("Sumber video tidak terjangkau saat ini. Coba lagi - untuk sebagian video, aliran audio dari sumber memang tidak stabil dari jaringan server.", "The video source cannot be reached right now. Try again — for some videos, the audio stream from the source is genuinely unstable from the server network."), { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
  if (!upstream.ok || !upstream.body) return new Response(t("Sumber video menolak permintaan ini. Coba proses ulang link-nya di tool.", "The video source refused this request. Try processing the link again in the tool."), { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const ext = data.kind === "audio" ? "mp3" : "mp4";
  const headers = new Headers();
  headers.set("Content-Type", upstream.headers.get("content-type") ?? (ext === "mp3" ? "audio/mpeg" : "video/mp4"));
  const len = upstream.headers.get("content-length"); if (len) headers.set("Content-Length", len);
  headers.set("Content-Disposition", `attachment; filename="tiktok-${data.vid}-${data.kind}.${ext}"`);
  headers.set("Cache-Control", "no-store");
  logEvent("tool_download", { vid: hashId(data.vid), kind: data.kind });
  return new Response(upstream.body, { status: 200, headers });
}
