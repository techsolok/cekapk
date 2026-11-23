import { Meilisearch } from "meilisearch";
export const SEARCH_INDEX = process.env.MEILI_INDEX ?? "konten";
export function meiliConfigured(): boolean { return !!process.env.MEILI_HOST; }
export function getMeili(): Meilisearch {
  return new Meilisearch({ host: process.env.MEILI_HOST ?? "http://127.0.0.1:7700", apiKey: process.env.MEILI_API_KEY });
}
