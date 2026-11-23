import { exclusionReason } from "./negative-list";
// Quality Gate - FR-APP-01 (P0) & FR-SEO-01 (P0), PRD section 7.2 & 12.3.
// Sebuah halaman aplikasi TIDAK BOLEH terbit bila satu pun cek ini gagal.
export interface AppDraft {
  name: string;
  descriptionWords: number;
  hasFactBox: boolean;
  legalStatus: "play_store" | "open_source" | "developer_direct" | "info_only" | null;
  officialUrl: string | null;
  hasUniqueValue: boolean; // data versi / hasil cek izin / perbandingan / FAQ nyata
}
export function checkQualityGate(d: AppDraft): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  const neg = exclusionReason(d.name);
  if (neg) errors.push(neg);
  if (d.descriptionWords < 600) errors.push(`Deskripsi hanya ${d.descriptionWords} kata - minimum 600 kata unik (pilar: 800).`);
  if (!d.hasFactBox) errors.push("Kotak fakta cepat belum lengkap.");
  if (!d.legalStatus) errors.push("Status legal belum diisi.");
  if (d.legalStatus !== "info_only" && !d.officialUrl) errors.push("URL resmi (Play Store / developer) wajib ada.");
  if (!d.hasUniqueValue) errors.push("Belum ada nilai unik (versi/izin/perbandingan/FAQ nyata).");
  return { ok: errors.length === 0, errors };
}
