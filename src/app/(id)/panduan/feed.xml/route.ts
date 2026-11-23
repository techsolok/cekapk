import { guides } from "@/lib/data/guides";
import { site } from "@/lib/site";
export const dynamic = "force-static";
// RSS panduan (FR-GUIDE-04): item = panduan yang diterbitkan, tanggal dari verifiedAt.
function esc(s: string): string { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
export async function GET() {
  const items = guides.map((g) => `
    <item>
      <title>${esc(g.title)}</title>
      <link>${site.url}/panduan/${g.slug}</link>
      <guid isPermaLink="true">${site.url}/panduan/${g.slug}</guid>
      <pubDate>${new Date(g.verifiedAt + "T00:00:00+07:00").toUTCString()}</pubDate>
      <description>${esc(g.metaDescription)}</description>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} - Panduan Keamanan & Aplikasi</title>
    <link>${site.url}/panduan</link>
    <atom:link href="${site.url}/panduan/feed.xml" rel="self" type="application/rss+xml" />
    <description>Panduan keamanan APK dan aplikasi dalam Bahasa Indonesia dari ${esc(site.name)}.</description>
    <language>id-ID</language>${items}
  </channel>
</rss>`;
  return new Response(xml, { status: 200, headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
