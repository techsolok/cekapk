// VERIFY 5: multi-bahasa tidak merusak versi Indonesia; tool punya batas & mode pemeliharaan tersedia.
import { promises as fs } from "node:fs";
import path from "node:path";
import { enApps, enGuides } from "../src/lib/data/i18n-en";
import { countEnAppWords, countEnGuideWords } from "../src/lib/data/i18n-en-types";
import { getApp } from "../src/lib/data/apps";
import { analyzePermissionsText, PERMISSIONS } from "../src/lib/tools/permissions-dict";
import { checkInfoRate, checkDownloadLimit } from "../src/lib/tools/ratelimit";
import { lastCheckedInfo } from "../src/lib/last-checked";
import { guides } from "../src/lib/data/guides";

let fails = 0;
const ok = (cond: boolean, msg: string) => { console.log((cond ? "LOLOS  " : "GAGAL  ") + msg); if (!cond) fails++; };

async function main() {
  // I18N: 11 aplikasi + 5 panduan, editorial, terpaut ke katalog nyata
  ok(enApps.length === 11, `Edisi EN: ${enApps.length} aplikasi (target 11)`);
  ok(enGuides.length === 5, `Edisi EN: ${enGuides.length} panduan (target 5)`);
  for (const a of enApps) {
    const w = countEnAppWords(a);
    ok(!!getApp(a.slug), `EN ${a.slug}: aplikasi ada di katalog ID`);
    ok(w >= 380 && w <= 650, `EN ${a.slug}: ${w} kata editorial`);
    ok(a.faqs.length === 3, `EN ${a.slug}: 3 FAQ`);
  }
  for (const g of enGuides) {
    const w = countEnGuideWords(g);
    ok(guides.some((x) => x.slug === g.slug), `EN panduan ${g.slug}: panduan ID ada`);
    ok(w >= 320 && w <= 600, `EN panduan ${g.slug}: ${w} kata`);
  }
  const kucing = enApps.find((a) => a.slug === "kucing-apk");
  ok(!!kucing && !/download (the )?(app|apk) (here|now)/i.test(JSON.stringify(kucing)), "EN Kucing: tetap info-only, tanpa tawaran unduh");

  // Tool 3: analisis izin dari teks contoh nyata
  const sample = "Izin aplikasi\nLokasi presisi (GPS dan jaringan)\nKamera - mengambil gambar dan video\nSMS - membaca pesan teks (SMS)\nKontak - membaca kontak Anda\nNotifikasi\nKalender";
  const rep = analyzePermissionsText(sample);
  ok(rep.found.length >= 6, `Pemeriksa Izin: ${rep.found.length} izin terdeteksi dari contoh`);
  ok(rep.warnings.some((w) => w.includes("OTP")), "Pemeriksa Izin: peringatan OTP muncul untuk izin SMS");
  ok(PERMISSIONS.length >= 18, `Kamus izin: ${PERMISSIONS.length} entri`);

  // Rate limit store (fallback memori): limit bekerja
  const ip = "uji-fase5-" + Date.now();
  let last = { allowed: true, needChallenge: false };
  for (let i = 0; i < 4; i++) last = await checkInfoRate(ip, 3, 60_000);
  ok(last.allowed === false, "Rate limit: permintaan ke-4 dengan limit 3 ditolak");
  ok((await checkDownloadLimit(ip, 2)) === true && (await checkDownloadLimit(ip, 2)) === true && (await checkDownloadLimit(ip, 2)) === false, "Rate limit unduhan: limit 2 per jam bekerja");

  // Indikator terakhir dicek
  ok(lastCheckedInfo("2026-10-20", new Date("2026-10-22T00:00:00+07:00")).days === 2, "Terakhir dicek: hitung hari benar");
  ok(lastCheckedInfo("2026-01-01", new Date("2026-10-20T00:00:00+07:00")).stale === true, "Terakhir dicek: >90 hari ditandai stale");

  // Berkas Fase 5
  for (const f of ["src/middleware.ts", "src/app/en/page.tsx", "src/app/panduan/feed.xml/route.ts", "src/app/transparansi/page.tsx", "PRODUCTION-CHECKLIST.md", "src/app/tools/pemeriksa-izin/page.tsx"]) {
    ok(await fs.stat(path.join(process.cwd(), f)).then(() => true).catch(() => false), `Berkas ada: ${f}`);
  }
  const mw = await fs.readFile("src/middleware.ts", "utf8");
  ok(mw.includes("MAINTENANCE_MODE") && mw.includes("503"), "Middleware: mode pemeliharaan 503 tersedia");
  console.log(fails === 0 ? "\nSEMUA PEMERIKSAAN FASE 5 LOLOS" : `\n${fails} PEMERIKSAAN GAGAL`);
  process.exit(fails === 0 ? 0 : 1);
}
main().catch((e) => { console.error(e); process.exit(1); });
