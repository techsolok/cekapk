import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories } from "@/lib/data/categories";
import { pillarApps } from "@/lib/data/apps";
import { guides } from "@/lib/data/guides";
import { comparisons } from "@/lib/data/comparisons";
import { enApps, enGuides, enTools, enTrust } from "@/lib/data/i18n-en";
// Sitemap tersegmentasi - PRD 12.1. Data nyata Fase 1: aplikasi pilar + panduan.
export async function generateSitemaps() {
  return [{ id: "statis" }, { id: "kategori" }, { id: "aplikasi" }, { id: "panduan" }, { id: "tools" }, { id: "bandingkan" }, { id: "en" }];
}
export default async function sitemap({ id }: { id: string }): Promise<MetadataRoute.Sitemap> {
  // SEO-10: lastModified hanya diisi bila ada tanggal perubahan nyata (verifiedAt).
  // Halaman tanpa tanggal TIDAK mendapat lastmod — sebelumnya u() mengisi
  // new Date() sehingga setiap regenerasi sitemap "menyegarkan" semua lastmod.
  const u = (path: string, priority: number, lastMod?: string, freq: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly") =>
    ({ url: site.url + path, ...(lastMod ? { lastModified: new Date(lastMod) } : {}), changeFrequency: freq, priority });
  switch (id) {
    case "kategori": return [u("/kategori", 0.6), ...categories.map((c) => u(`/kategori/${c.slug}`, 0.7))];
    case "aplikasi": { const latestCheck = pillarApps.map((a) => a.verifiedAt).filter((d): d is string => Boolean(d)).sort().at(-1); return [u("/aplikasi", 0.8, latestCheck), ...pillarApps.map((a) => u(`/aplikasi/${a.slug}`, 0.9, a.verifiedAt))]; }
    case "panduan": return [u("/panduan", 0.8), u("/keamanan", 0.8), ...guides.map((g) => u(`/panduan/${g.slug}`, 0.8, g.verifiedAt))];
    case "tools": return [u("/tools", 0.7), u("/tools/pengunduh-tiktok", 0.9), u("/tools/pengunduh-instagram", 0.9), u("/tools/pemeriksa-izin", 0.9)];
    case "en": return [u("/en", 0.7), u("/en/tools", 0.7), u("/en/aplikasi", 0.7), ...enTools.map((t) => u(t.enPath, 0.7, undefined, "monthly")), ...enTrust.map((t) => u(t.enPath, 0.3, undefined, "monthly")), ...enApps.map((a) => u(`/en/aplikasi/${a.slug}`, 0.7, a.verifiedAtEn, "monthly")), ...enGuides.map((g) => u(`/en/panduan/${g.slug}`, 0.7, g.verifiedAtEn, "monthly"))];
    case "bandingkan": return [u("/bandingkan", 0.7), ...comparisons.map((c) => u(`/bandingkan/${c.slug}`, 0.7, c.verifiedAt, "monthly"))];
    default: return [u("/", 1, undefined, "daily"), u("/perpustakaan", 0.7), u("/metodologi-verifikasi", 0.5, "2026-11-08", "monthly"), u("/transparansi", 0.4, undefined, "monthly"), u("/tentang", 0.4, undefined, "monthly"), u("/kontak", 0.4, "2026-11-06", "monthly"),
      u("/privasi", 0.3, "2026-11-08", "monthly"), u("/ketentuan", 0.3, "2026-11-07", "monthly"), u("/dmca", 0.3, "2026-11-08", "monthly"), u("/disclaimer", 0.3, undefined, "monthly"), u("/kebijakan-iklan", 0.3, "2026-11-08", "monthly")];
  }
}
