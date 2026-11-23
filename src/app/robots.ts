import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
// SEO teknis - PRD 12.1. AI-crawler groups dibuat eksplisit Allow agar niatnya
// terdokumentasi dan tidak hilang bila aturan "*" berubah di masa depan.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/aplikasi?q=", "/en/aplikasi?q=", "/tools/pengunduh-tiktok?url=", "/en/tools/tiktok-downloader?url=", "/api/"] },
    ],
    sitemap: [`${site.url}/sitemap.xml`, "statis", "kategori", "aplikasi", "panduan", "tools", "bandingkan", "en"].map((s) => (s.startsWith("http") ? s : `${site.url}/sitemap/${s}.xml`)),
  };
}
