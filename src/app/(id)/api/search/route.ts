import { NextResponse } from "next/server";
import { pillarApps } from "@/lib/data/apps";
import { buildSearchDocuments, localSearch, type SearchDoc } from "@/lib/search/documents";
import { getMeili, meiliConfigured, SEARCH_INDEX } from "@/lib/search/meili";

export const dynamic = "force-dynamic";
// Pencarian instan (FR-HOME-02): Meilisearch bila dikonfigurasi (toleran typo + alias di dokumen),
// fallback lokal dengan tabel alias bila belum/tidak terjangkau. Hasil maksimal 8.
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  if (q.trim().length < 2) return NextResponse.json({ results: [], source: "kosong" });
  if (meiliConfigured()) {
    try {
      const index = getMeili().index(SEARCH_INDEX);
      const res = await index.search(q, { limit: 8, attributesToRetrieve: ["id", "type", "name", "developer", "category", "url"] });
      const results = (res.hits as unknown as SearchDoc[]).map((h) => ({ name: h.name, url: h.url, type: h.type, developer: h.developer, category: h.category }));
      return NextResponse.json({ results, source: "meilisearch" });
    } catch { /* jatuh ke fallback lokal */ }
  }
  const docs = buildSearchDocuments(pillarApps);
  const results = localSearch(docs, q).map((d) => ({ name: d.name, url: d.url, type: d.type, developer: d.developer, category: d.category }));
  return NextResponse.json({ results, source: "lokal" });
}
