// VERIFY 3 (Fase-Build-Prompt-Pack): katalog 50, gate, daftar negatif, urutan workbook + keuangan terakhir,
// halaman keuangan siap peringatan APK palsu, generator programmatic tidak pernah auto-publish.
import { pillarApps } from "../src/lib/data/apps";
import { countWords } from "../src/lib/data/content-types";
import { checkQualityGate } from "../src/lib/quality-gate";
import { isExcluded } from "../src/lib/negative-list";
import { buildProgrammaticDraft } from "../src/lib/programmatic";
import { buildSearchDocuments, localSearch } from "../src/lib/search/documents";

let fails = 0;
const ok = (cond: boolean, msg: string) => { console.log((cond ? "LOLOS  " : "GAGAL  ") + msg); if (!cond) fails++; };

ok(pillarApps.length === 50, `Katalog tepat 50 aplikasi (aktual: ${pillarApps.length})`);
ok(new Set(pillarApps.map((a) => a.slug)).size === 50, "Semua slug unik");
for (const a of pillarApps) {
  const w = countWords(a);
  const gate = checkQualityGate({ name: a.name, descriptionWords: w, hasFactBox: true, legalStatus: a.legalStatus, officialUrl: a.officialUrl, hasUniqueValue: true });
  ok(w >= 600 && gate.ok, `${a.name}: ${w} kata + gate lolos`);
  ok(!isExcluded(a.name) && !isExcluded(a.slug), `${a.name}: bersih dari daftar negatif`);
  if (a.legalStatus !== "info_only") ok(!!a.officialUrl && a.officialUrl.startsWith("https://play.google.com/"), `${a.name}: tombol resmi Play Store`);
}
// Urutan workbook: 20 entitas sisa hadir; keuangan (DANA/OVO/GoPay) adalah tiga terakhir dari blok workbook (sebelum ekspansi C)
const idx = (s: string) => pillarApps.findIndex((a) => a.slug === s);
for (const s of ["roblox", "mobile-legends", "free-fire", "pubg-mobile", "genshin-impact", "google-chrome", "kinemaster", "alight-motion", "picsart", "lightroom", "crunchyroll", "vidio", "iqiyi", "netflix", "shopee", "tokopedia", "google-drive"]) ok(idx(s) > 10, `Entitas workbook hadir: ${s}`);
ok(idx("dana") > idx("google-drive") && idx("ovo") > idx("dana") && idx("gopay") > idx("ovo"), "Keuangan terakhir di blok workbook (DANA → OVO → GoPay)");
for (const s of ["dana", "ovo", "gopay"]) {
  const a = pillarApps.find((x) => x.slug === s)!;
  ok(a.categorySlug === "keuangan", `${a.name}: kategori keuangan (peringatan APK palsu di atas fold aktif di template)`);
}
// Dokumen pencarian: 50 aplikasi + 5 panduan + 1 tool
const docs = buildSearchDocuments(pillarApps);
ok(docs.length === 58, `Dokumen pencarian: ${docs.length} (50 aplikasi + 5 panduan + 3 tool - tool ke-3 ditambah Fase 5)`);
// Alias + typo lokal
ok(localSearch(docs, "dompet digital")[0]?.url === "/aplikasi/dana", "Alias 'dompet digital' → DANA");
ok(localSearch(docs, "wa bisnis")[0]?.url === "/aplikasi/whatsapp-business", "Alias 'wa bisnis' → WhatsApp Business");
ok(localSearch(docs, "roblox").length > 0, "Pencarian lokal menemukan Roblox");
// Generator programmatic: draf saja + daftar negatif memblokir total
const good = buildProgrammaticDraft({ name: "Aplikasi Uji Coba", developer: "PT Uji", categorySlug: "utilitas", officialUrl: "https://play.google.com/store/search?q=Uji&c=apps", priceLabel: "Gratis", description: "kata ".repeat(650), uniqueValue: "Hasil cek izin editor: aplikasi meminta internet dan penyimpanan, dijelaskan lengkap di draf ini." });
ok(good.ok && good.publishable, "Generator: draf valid tersimpan sebagai draf (publishable dinilai gate, tetap butuh Admin)");
const bad = buildProgrammaticDraft({ name: "Super Slot Judi Online", developer: "X", categorySlug: "utilitas", officialUrl: "https://play.google.com/", priceLabel: "Gratis", description: "kata ".repeat(650), uniqueValue: "x".repeat(50) });
ok(!bad.ok, "Generator: nama daftar negatif DIBLOKIR total, bahkan sebagai draf");
const thin = buildProgrammaticDraft({ name: "Aplikasi Tipis", developer: "PT Tipis", categorySlug: "utilitas", officialUrl: "https://play.google.com/", priceLabel: "Gratis", description: "hanya sepuluh kata saja di sini untuk uji gate programmatic", uniqueValue: "pendek" });
ok(thin.ok && !thin.publishable, "Generator: draf tipis boleh disimpan TAPI tidak publishable (gate menahan)");
console.log(fails === 0 ? "\nSEMUA PEMERIKSAAN FASE 3 (konten) LOLOS" : `\n${fails} PEMERIKSAAN GAGAL`);
process.exit(fails === 0 ? 0 : 1);
