import { checkDownloadRate, verifyData, clientIp, logEvent, hashId } from "@/lib/tools/tiktok";
export const dynamic = "force-dynamic";
const ALLOWED = ["instagram.com", "cdninstagram.com", "fbcdn.net"];
export async function GET(req: Request) {
  const ip = clientIp(req);
  // SEO-17: the English tool page links here with ?lang=en so plain-text
  // download errors render in English. Default (no lang) stays Indonesian.
  // Message language only — token verification, host allowlist and rate
  // limits are unchanged.
  const reqUrl = new URL(req.url);
  const langEn = reqUrl.searchParams.get("lang") === "en";
  const t = (id: string, en: string) => (langEn ? en : id);
  const data = verifyData<{ u?: string; vid?: string }>(reqUrl.searchParams.get("token") ?? "");
  if (!data?.u) return new Response(t("Token unduhan tidak valid atau sudah kedaluwarsa. Ambil ulang info videonya.", "Download token is invalid or has expired. Fetch the video info again."), { status: 410, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  let target: URL;
  try { target = new URL(data.u); } catch { return new Response(t("URL media tidak valid.", "Media URL is invalid."), { status: 400 }); }
  const host = target.hostname.toLowerCase();
  if (!ALLOWED.some((d) => host === d || host.endsWith("." + d)))
    return new Response(t("Host media tidak diizinkan.", "Media host is not allowed."), { status: 403, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  if (!(await checkDownloadRate(ip))) return new Response(t("Batas unduhan per jam tercapai. Coba lagi nanti.", "Hourly download limit reached. Try again later."), { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  let upstream: Response;
  try {
    upstream = await fetch(target, { headers: { "User-Agent": "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36", Referer: "https://www.instagram.com/" } });
  } catch { return new Response(t("Media tidak bisa dijangkau dari server saat ini.", "The media cannot be reached from the server right now."), { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
  if (!upstream.ok || !upstream.body) return new Response(t(`Media tidak tersedia (HTTP ${upstream.status}).`, `Media is unavailable (HTTP ${upstream.status}).`), { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const headers = new Headers({
    "Content-Type": upstream.headers.get("content-type") ?? "video/mp4",
    "Content-Disposition": `attachment; filename="instagram-${data.vid ?? "video"}.mp4"`,
    "Cache-Control": "no-store",
  });
  const len = upstream.headers.get("content-length"); if (len) headers.set("Content-Length", len);
  logEvent("tool_download", { tool: "instagram", vid: hashId(data.vid ?? "") });
  return new Response(upstream.body, { status: 200, headers });
}
