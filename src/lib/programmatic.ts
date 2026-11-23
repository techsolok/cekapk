// Generator programmatic TERKONTROL (FR-ADM-04 + FR-SEO-01, PRD 12.3):
// membuat DRAF dari data terstruktur. TIDAK PERNAH menerbitkan. Daftar negatif = blokir total,
// quality gate menentukan apakah draf LAYAK diajukan terbit oleh Admin manusia.
import { checkQualityGate, type AppDraft } from "./quality-gate";
import { exclusionReason } from "./negative-list";
import { categories } from "./data/categories";

export interface ProgrammaticInput {
  name: string; developer: string; categorySlug: string;
  officialUrl: string; priceLabel: string; description: string;
  uniqueValue: string; // nilai unik nyata: data izin / perbandingan / FAQ berbasis pertanyaan nyata
}
export function slugify(name: string): string {
  return name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
export interface DraftResult {
  ok: boolean; // ok = boleh DISIMPAN sebagai draf (daftar negatif bersih)
  publishable: boolean; // publishable = quality gate lolos (tetap butuh klik Admin)
  errors: string[];
  slug: string;
  content: Record<string, unknown>;
}
export function buildProgrammaticDraft(input: ProgrammaticInput): DraftResult {
  const slug = slugify(input.name);
  const neg = exclusionReason(input.name) ?? exclusionReason(slug);
  const category = categories.find((c) => c.slug === input.categorySlug);
  const words = input.description.split(/\s+/).filter(Boolean).length + input.uniqueValue.split(/\s+/).filter(Boolean).length;
  const gateInput: AppDraft = {
    name: input.name, descriptionWords: words, hasFactBox: !!(input.developer && category && input.priceLabel),
    legalStatus: "play_store", officialUrl: input.officialUrl || null, hasUniqueValue: input.uniqueValue.trim().length >= 40,
  };
  const gate = checkQualityGate(gateInput);
  const errors = [...gate.errors];
  if (!category) errors.push("Kategori tidak dikenal.");
  if (neg) errors.push(neg);
  const content = {
    generator: "programmatic-fase3", name: input.name, developer: input.developer, slug,
    categorySlug: input.categorySlug, categoryName: category?.name ?? input.categorySlug,
    legalStatus: "play_store", officialUrl: input.officialUrl, priceLabel: input.priceLabel,
    description: input.description, uniqueValue: input.uniqueValue,
    note: "DRAF generator - wajib dilengkapi editor (fitur, izin, pro/kontra, FAQ) sebelum terbit.",
  };
  return { ok: !neg && !!category, publishable: gate.ok && !neg, errors, slug, content };
}
