// Daftar negatif - PRD section 12.6. Daftar ini PENJAGA SISTEM, bukan konten.
// Keyword/halaman yang cocok dengan daftar ini TIDAK PERNAH boleh diterbitkan.
// Statusnya di CMS selalu "excluded" (tabel keywords).
export const NEGATIVE_TERMS: readonly string[] = [
  // Judi
  "jayaslot", "rejekibet", "slot online", "judi", "togel", "casino", "kasino",
  "betting", "taruhan online", "situs bet",
  // Dewasa
  "nekopoi", "bokep", "hentai", "porno", "dewasa 18",
  // Bajakan / cracked
  "mod apk", "premium unlocked", "premium gratis full", "apk bajakan",
  "full version gratis", "crack", "cheat", "mod menu", "diamond gratis hack",
] as const;

export const EXCLUDED_BRANDS: readonly string[] = ["jayaslot", "rejekibet", "nekopoi"] as const;

/** Normalisasi sederhana: huruf kecil, tanpa tanda baca berlebih. */
export function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

/** True bila keyword/judul melanggar daftar negatif dan harus diblokir quality gate. */
export function isExcluded(text: string): boolean {
  const n = " " + normalize(text) + " ";
  return NEGATIVE_TERMS.some((t) => n.includes(" " + t) || n.includes(t + " ") || n.trim() === t || n.includes(" " + t + " "));
}

/** Penjelasan singkat untuk admin bila sebuah draf diblokir. */
export function exclusionReason(text: string): string | null {
  const n = normalize(text);
  const hit = NEGATIVE_TERMS.find((t) => n.includes(t));
  return hit ? `Mengandung istilah terlarang daftar negatif PRD 12.6: "${hit}"` : null;
}
