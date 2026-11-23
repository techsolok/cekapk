// VERIFY 1 (Fase-Build-Prompt-Pack): pemeriksaan otomatis terhadap PRD.
// (a) quality gate memblokir draf buruk; (b) tombol pilar ke sumber resmi / tidak ada untuk info_only tanpa resmi;
// (c) Minecraft tanpa unduhan bajakan, Kucing tanpa tombol unduh; (d) kata unik tiap pilar >= 800; (e) daftar negatif.
import { pillarApps } from "../src/lib/data/apps";
import { guides } from "../src/lib/data/guides";
import { countWords, countGuideWords } from "../src/lib/data/content-types";
import { checkQualityGate } from "../src/lib/quality-gate";
import { isExcluded } from "../src/lib/negative-list";

let fails = 0;
const ok = (cond: boolean, msg: string) => { console.log((cond ? "LOLOS  " : "GAGAL  ") + msg); if (!cond) fails++; };

// (a) gate blocks bad drafts
ok(!checkQualityGate({ name: "Aplikasi Bagus", descriptionWords: 300, hasFactBox: true, legalStatus: "play_store", officialUrl: "https://play.google.com", hasUniqueValue: true }).ok, "gate memblokir deskripsi <600 kata");
ok(!checkQualityGate({ name: "Aplikasi Bagus", descriptionWords: 900, hasFactBox: true, legalStatus: null, officialUrl: null, hasUniqueValue: true }).ok, "gate memblokir status legal kosong");
ok(!checkQualityGate({ name: "Super Slot Judi Online", descriptionWords: 900, hasFactBox: true, legalStatus: "play_store", officialUrl: "https://play.google.com", hasUniqueValue: true }).ok, "gate memblokir nama dari daftar negatif");
// negative list sanity
ok(isExcluded("download jayaslot apk"), "daftar negatif menangkap jayaslot");
ok(!isExcluded("tiktok"), "daftar negatif tidak menangkap tiktok");

// per-app checks
for (const a of pillarApps) {
  const words = countWords(a);
  const gate = checkQualityGate({ name: a.name, descriptionWords: words, hasFactBox: true, legalStatus: a.legalStatus, officialUrl: a.officialUrl, hasUniqueValue: true });
  ok(words >= 800, `${a.name}: ${words} kata unik (min 800)`);
  ok(gate.ok, `${a.name}: lolos quality gate${gate.ok ? "" : " - " + gate.errors.join("; ")}`);
  ok(a.faqs.length >= 5 && a.faqs.length <= 8, `${a.name}: FAQ ${a.faqs.length} (rentang 5-8)`);
  if (a.legalStatus === "info_only") ok(a.officialUrl === null, `${a.name}: info_only tanpa tombol unduh`);
  else ok(!!a.officialUrl && a.officialUrl.startsWith("https://play.google.com/"), `${a.name}: tombol ke sumber resmi`);
}
// (c) specific rules
const mc = pillarApps.find((a) => a.slug === "minecraft")!;
ok(mc.priceLabel.toLowerCase().includes("berbayar"), "Minecraft: dilabeli berbayar, tanpa klaim gratis");
const kucing = pillarApps.find((a) => a.slug === "kucing-apk")!;
ok(kucing.legalStatus === "info_only" && kucing.officialUrl === null, "Kucing: info_only dan tanpa URL unduhan");
// guides
for (const g of guides) {
  const w = countGuideWords(g);
  ok(w >= 700, `Panduan ${g.slug}: ${w} kata (min 700)`);
  ok(!isExcluded(g.title), `Panduan ${g.slug}: judul bersih dari daftar negatif`);
}
console.log(fails === 0 ? "\nSEMUA PEMERIKSAAN FASE 1 LOLOS" : `\n${fails} PEMERIKSAAN GAGAL`);
process.exit(fails === 0 ? 0 : 1);
