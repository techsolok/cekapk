// Tipe konten Bahasa Inggris (Fase 5, FR-I18N-01): terjemahan EDITORIAL yang ditulis
// manusia untuk 20 halaman teratas - bukan hasil generator, bukan terjemahan mesin mentah.
export interface EnAppContent {
  slug: string;
  taglineEn: string;
  seoTitleEn?: string;             // Phase 2A: English metadata title override (template title is misleading for info_only apps)
  seoDescriptionEn?: string;       // Phase 2A: English metadata description override (also feeds OG + Twitter via pageMetadata)
  // EN apps Nov 2026: the genuine English review date. The EN app template
  // and sitemap use it when present; apps without it keep showing the
  // Indonesian verifiedAt (unchanged rendering). Never copy verifiedAt here.
  verifiedAtEn?: string;
  introEn: string[];
  whatEn: string[];
  safetyEn: string[];
  goodFor: string[];
  watchOut: string[];
  faqs: { q: string; a: string }[];
}
export interface EnGuideSection {
  heading: string;
  paragraphs?: string[];
  table?: { headers: string[]; rows: string[][] };
  checklist?: string[];
  steps?: { title: string; desc: string }[];
}
export interface EnGuideContent {
  slug: string;
  titleEn: string;
  // UI-05 Phase A: purpose-written English meta description (<=160 chars).
  // Used by the EN guide template instead of the raw first intro paragraph.
  // Guides without it keep the previous behaviour (introEn[0]).
  metaDescriptionEn?: string;
  introEn: string[];
  bodyEn: string[];
  faqs: { q: string; a: string }[];
  // Optional structured content (SEO-16, APKPure guide first). Guides without
  // sectionsEn render exactly as before (flat intro + body paragraphs).
  sectionsEn?: EnGuideSection[];
  relatedAppsEn?: string[];
  sourcesEn?: { label: string; url: string }[];
  verifiedAtEn?: string;
}
export function countEnAppWords(c: EnAppContent): number {
  const text = [c.taglineEn, ...c.introEn, ...c.whatEn, ...c.safetyEn, ...c.goodFor, ...c.watchOut, ...c.faqs.flatMap((f) => [f.q, f.a])].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
export function countEnGuideWords(c: EnGuideContent): number {
  const sectionText = (c.sectionsEn ?? []).flatMap((s) => [
    s.heading,
    ...(s.paragraphs ?? []),
    ...(s.checklist ?? []),
    ...(s.steps ?? []).flatMap((st) => [st.title, st.desc]),
    ...(s.table ? [s.table.headers.join(" "), ...s.table.rows.map((r) => r.join(" "))] : []),
  ]);
  const text = [c.titleEn, ...c.introEn, ...c.bodyEn, ...sectionText, ...c.faqs.flatMap((f) => [f.q, f.a])].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
