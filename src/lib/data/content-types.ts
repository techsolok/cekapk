export interface AppSection { heading: string; paragraphs: string[] }
export interface PillarApp {
  slug: string; name: string; developer: string; categorySlug: string; categoryName: string;
  legalStatus: "play_store" | "open_source" | "developer_direct" | "info_only";
  officialUrl: string | null;          // null hanya untuk info_only tanpa sumber resmi (mis. Kucing)
  officialLabel: string;
  priceLabel: string;                  // label harga jujur, mis. "Gratis (ada pembelian dalam aplikasi)"
  sizeLabel: string;                   // "Bervariasi menurut perangkat" bila memang begitu di Play Store
  minAndroid: string;
  languages: string;
  verifiedAt: string;                  // ISO date - tanggal konten ini diverifikasi editor
  versionNote: string;                 // catatan versi TANPA mengarang nomor versi
  seoTitle?: string;                   // Phase 2A: judul metadata pengganti bila judul template menyesatkan (mis. info_only tanpa tautan resmi)
  seoDescription?: string;             // Phase 2A: deskripsi metadata pengganti (dipakai juga untuk OG + Twitter via pageMetadata)
  icon: string; tagline: string;
  intro: string[];
  sections: AppSection[];
  features: { title: string; desc: string }[];
  permissions: { name: string; meaning: string }[];
  permissionsIntro?: string;           // Phase 2: intro line above the permission list (expansion apps only)
  safetyParagraphs: string[];
  pros: string[]; cons: string[];
  alternatives: { name: string; slug: string | null; note: string }[];
  faqs: { q: string; a: string }[];
  relatedTool: { label: string; href: string } | null;
}
export interface Guide {
  slug: string; title: string; type: "howto" | "explainer" | "safety";
  metaDescription: string; intro: string[];
  sections: AppSection[];
  steps: { title: string; desc: string }[] | null;
  faqs: { q: string; a: string }[];
  relatedApps: string[]; // slug aplikasi pilar
  verifiedAt: string;
}
export function countWords(app: PillarApp): number {
  const parts: string[] = [...app.intro, ...app.safetyParagraphs];
  app.sections.forEach((s) => { parts.push(s.heading, ...s.paragraphs); });
  app.features.forEach((f) => parts.push(f.title, f.desc));
  app.permissions.forEach((p) => parts.push(p.name, p.meaning));
  parts.push(...app.pros, ...app.cons);
  app.faqs.forEach((f) => parts.push(f.q, f.a));
  app.alternatives.forEach((a) => parts.push(a.name, a.note));
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}
export function countGuideWords(g: Guide): number {
  const parts: string[] = [...g.intro];
  g.sections.forEach((s) => { parts.push(s.heading, ...s.paragraphs); });
  (g.steps ?? []).forEach((s) => parts.push(s.title, s.desc));
  g.faqs.forEach((f) => parts.push(f.q, f.a));
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}
