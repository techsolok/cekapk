// Dokumen pencarian - satu bentuk untuk Meilisearch dan fallback lokal.
import type { PillarApp } from "../data/content-types";
import { guides } from "../data/guides";
import { searchAliases } from "../data/aliases";

export interface SearchDoc {
  id: string; type: "aplikasi" | "panduan" | "tool";
  name: string; aliases: string[]; developer: string; category: string; categorySlug: string;
  tagline: string; url: string;
}
export function aliasesForSlug(slug: string): string[] {
  return Object.entries(searchAliases).filter(([, v]) => v === slug).map(([k]) => k);
}
export function buildSearchDocuments(apps: PillarApp[]): SearchDoc[] {
  const docs: SearchDoc[] = apps.map((a) => ({
    id: `app-${a.slug}`, type: "aplikasi", name: a.name,
    aliases: [...aliasesForSlug(a.slug), a.name.toLowerCase(), a.slug.replace(/-/g, " ")],
    developer: a.developer, category: a.categoryName, categorySlug: a.categorySlug,
    tagline: a.tagline, url: `/aplikasi/${a.slug}`,
  }));
  for (const g of guides) docs.push({
    id: `guide-${g.slug}`, type: "panduan", name: g.title, aliases: [g.slug.replace(/-/g, " ")],
    developer: "Panduan keamanan", category: "Panduan", categorySlug: "panduan",
    tagline: g.metaDescription, url: `/panduan/${g.slug}`,
  });
  docs.push({
    id: "tool-pengunduh-tiktok", type: "tool", name: "Pengunduh Video TikTok",
    aliases: ["download tiktok", "snaptik", "tiktok downloader", "unduh tiktok", "simpan video tiktok"],
    developer: "Tool online", category: "Tools", categorySlug: "tools",
    tagline: "Unduh video TikTok publik tanpa instal aplikasi.", url: "/tools/pengunduh-tiktok",
  });
  docs.push({
    id: "tool-pengunduh-instagram", type: "tool", name: "Pengunduh Video Instagram",
    aliases: ["download instagram", "pengunduh instagram", "unduh reel", "download reel instagram", "simpan video instagram"],
    developer: "Tool online", category: "Tools", categorySlug: "tools",
    tagline: "Unduh video dan Reels Instagram publik tanpa login.", url: "/tools/pengunduh-instagram",
  });
  docs.push({
    id: "tool-pemeriksa-izin", type: "tool", name: "Pemeriksa Izin Aplikasi",
    aliases: ["cek izin aplikasi", "pemeriksa izin", "izin berbahaya", "cek izin dari screenshot"],
    developer: "Tool online", category: "Tools", categorySlug: "tools",
    tagline: "Periksa risiko izin aplikasi dari tangkapan layar.", url: "/tools/pemeriksa-izin",
  });
  return docs;
}
// Pencocokan lokal (fallback bila Meilisearch belum dikonfigurasi / tidak terjangkau).
export function localSearch(docs: SearchDoc[], query: string, limit = 8): SearchDoc[] {
  const raw = query.trim().toLowerCase();
  if (raw.length < 2) return [];
  const aliasSlug = searchAliases[raw];
  const terms = raw.split(/\s+/);
  const scored = docs.map((d) => {
    const hay = `${d.name} ${d.aliases.join(" ")} ${d.developer} ${d.category} ${d.tagline}`.toLowerCase();
    let score = 0;
    if (aliasSlug && d.url === `/aplikasi/${aliasSlug}`) score += 100;
    if (d.name.toLowerCase() === raw) score += 60;
    if (d.name.toLowerCase().startsWith(raw)) score += 30;
    for (const t of terms) if (hay.includes(t)) score += 10;
    if (d.aliases.some((a) => a.includes(raw) || raw.includes(a))) score += 15;
    return { d, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.d);
}
