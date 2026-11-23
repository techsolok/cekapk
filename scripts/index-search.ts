// Indeksasi Meilisearch: npm run search:index (butuh MEILI_HOST; MEILI_API_KEY untuk kunci admin)
// Membuat index "konten", mengatur atribut, dan mengunggah dokumen katalog + panduan + tool.
import { buildSearchDocuments } from "../src/lib/search/documents";
import { pillarApps } from "../src/lib/data/apps";
import { getMeili, SEARCH_INDEX } from "../src/lib/search/meili";

async function main() {
  if (!process.env.MEILI_HOST) { console.error("MEILI_HOST belum diatur."); process.exit(1); }
  const client = getMeili();
  const health = await client.health();
  console.log("Meilisearch status:", health.status);
  await client.createIndex(SEARCH_INDEX, { primaryKey: "id" }).catch(() => undefined);
  const index = client.index(SEARCH_INDEX);
  await index.updateSettings({
    searchableAttributes: ["name", "aliases", "developer", "category", "tagline"],
    displayedAttributes: ["id", "type", "name", "developer", "category", "url"],
    filterableAttributes: ["type", "categorySlug"],
    typoTolerance: { enabled: true, minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 } },
  });
  const docs = buildSearchDocuments(pillarApps);
  const task = await index.addDocuments(docs, { primaryKey: "id" });
  console.log(`Dokumen dikirim: ${docs.length} (taskUid ${task.taskUid})`);
  let status = "enqueued";
  for (let i = 0; i < 30 && (status === "enqueued" || status === "processing"); i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const t = await client.tasks.getTask(task.taskUid);
    status = t.status;
  }
  console.log("Status indeksasi:", status);
  const stats = await index.getStats();
  console.log("Jumlah dokumen di index:", stats.numberOfDocuments);
}
main().catch((e) => { console.error(e); process.exit(1); });
