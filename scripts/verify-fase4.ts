// VERIFY 4: file yang gagal SATU langkah pipeline tidak bisa terbit; tool IG punya 4 kelas hasil;
// perbandingan terpaut ke katalog; aset PWA + mode gelap terpasang.
import { promises as fs } from "node:fs";
import path from "node:path";
import { runPipeline, extractSignerFingerprint, canPublish, weeklyHashCheck, normalizeFingerprint, type PermissionDecl } from "../src/lib/library/pipeline";
import { extractShortcode, classifyYtError, pickBestFormat } from "../src/lib/tools/instagram";
import { comparisons } from "../src/lib/data/comparisons";
import { getApp } from "../src/lib/data/apps";

let fails = 0;
const ok = (cond: boolean, msg: string) => { console.log((cond ? "LOLOS  " : "GAGAL  ") + msg); if (!cond) fails++; };

async function main() {
  const apk = await fs.readFile("/tmp/apktest/uji.apk");
  const expected = (await fs.readFile("/tmp/apktest/fingerprint.txt", "utf8")).trim();
  const perms: PermissionDecl[] = [
    { name: "Internet", meaning: "Dipakai untuk mengambil data podcast dari server penerbit episode dan memperbarui daftar langgananmu secara berkala.", dangerous: false },
    { name: "Penyimpanan", meaning: "Menyimpan episode yang kamu unduh supaya bisa diputar tanpa koneksi; aplikasi tidak membaca berkas lain di luar folder unduhannya.", dangerous: true },
  ];
  const fp = extractSignerFingerprint(apk);
  ok(!!fp && fp === normalizeFingerprint(expected), `Ekstraksi fingerprint sertifikat cocok dengan openssl (${fp?.slice(0, 16)}…)`);

  const res = await runPipeline(apk, { expectedFingerprint: expected, sourceType: "open_source", permissions: perms });
  const by = Object.fromEntries(res.steps.map((s) => [s.step, s.ok]));
  ok(by.hash === true, "Pipeline: hash lolos");
  ok(by.struktur === true, "Pipeline: struktur APK lolos (manifest + dex + blok tanda tangan)");
  ok(by.tanda_tangan === true, "Pipeline: tanda tangan cocok dengan fingerprint resmi");
  ok(by.izin === true, "Pipeline: audit izin lolos (izin berbahaya sudah dijelaskan)");
  ok(by.pemindaian === false && res.safetyScore === null, "Pipeline: tanpa kunci VirusTotal, langkah scan MENAHAN terbit dan skor tidak dihitung");
  ok(canPublish({ pipeline: res.steps, safetyScore: res.safetyScore, reviewedBy: "admin@uji" }).ok === false, "Gerbang: file dengan 1 langkah gagal TIDAK bisa terbit (VERIFY 4)");

  const wrong = await runPipeline(apk, { expectedFingerprint: "AA".repeat(32), sourceType: "open_source", permissions: perms });
  ok(wrong.steps.find((s) => s.step === "tanda_tangan")?.ok === false, "Pipeline: fingerprint salah -> langkah tanda tangan GAGAL");
  const broken = await runPipeline(await fs.readFile("/tmp/apktest/uji-rusak.apk"), { expectedFingerprint: expected, sourceType: "open_source", permissions: perms });
  ok(broken.steps.find((s) => s.step === "struktur")?.ok === false, "Pipeline: APK tanpa dex -> langkah struktur GAGAL");

  const fabricated = { pipeline: res.steps.map((s) => ({ ...s, ok: true })), safetyScore: 96, reviewedBy: "admin@uji" };
  ok(canPublish(fabricated).ok === true, "Gerbang: semua langkah lolos + skor + review manual -> BOLEH terbit");
  ok(canPublish({ ...fabricated, reviewedBy: null }).ok === false, "Gerbang: tanpa review manual -> TIDAK bisa terbit");
  ok(weeklyHashCheck(apk, res.sha256) === true, "Cek berkala: hash berkas utuh cocok");
  const tampered = Buffer.from(apk); tampered[tampered.length - 30] = tampered[tampered.length - 30] ^ 0xff;
  ok(weeklyHashCheck(tampered, res.sha256) === false, "Cek berkala: berkas diubah -> hash TIDAK cocok (akan ditandai flagged)");

  // Tool Instagram: klasifikasi
  ok(extractShortcode("https://www.instagram.com/reel/C8abcDEF12_/") === "C8abcDEF12_", "IG: shortcode Reel diekstrak");
  ok(extractShortcode("halo ini teks biasa") === null, "IG: teks acak ditolak");
  ok(extractShortcode("https://www.tiktok.com/@a/video/1") === null, "IG: tautan situs lain ditolak");
  ok(classifyYtError("ERROR: Private video") === "tautan_privat", "IG: error privat terklasifikasi");
  ok(classifyYtError("ERROR: Video unavailable - not found 404") === "tautan_tidak_ditemukan", "IG: error tidak ditemukan terklasifikasi");
  ok(pickBestFormat({ formats: [{ url: "a", vcodec: "avc", acodec: "aac", height: 360 }, { url: "b", vcodec: "avc", acodec: "aac", height: 720 }, { url: "c", vcodec: "avc", acodec: "none", height: 1080 }] }) === "b", "IG: format terbaik ber-audio dipilih (720p di atas 360p, 1080p tanpa audio dilewati)");

  // Perbandingan
  ok(comparisons.length >= 1 && comparisons[0].rows.length >= 10, `Perbandingan: ${comparisons.length} halaman, tabel ${comparisons[0].rows.length} baris`);
  ok(!!getApp(comparisons[0].aSlug) && !!getApp(comparisons[0].bSlug), "Perbandingan: kedua aplikasi ada di katalog");

  // PWA + mode gelap
  for (const f of ["src/app/manifest.ts", "public/sw.js", "public/icons/icon-192.png", "public/icons/icon-512.png", "src/components/ThemeToggle.tsx", "src/components/PwaRegister.tsx", "src/app/offline/page.tsx"])
    ok(await fs.stat(path.join(process.cwd(), f)).then(() => true).catch(() => false), `Berkas ada: ${f}`);
  const sw = await fs.readFile("public/sw.js", "utf8");
  ok(sw.includes('"/api/"') && sw.includes("/offline"), "SW: /api tidak di-cache + fallback offline terdaftar");
  const globals = await fs.readFile("src/app/globals.css", "utf8");
  ok(globals.includes(".dark") && globals.includes("--paper"), "Mode gelap: variabel .dark terdefinisi");

  console.log(fails === 0 ? "\nSEMUA PEMERIKSAAN FASE 4 LOLOS" : `\n${fails} PEMERIKSAAN GAGAL`);
  process.exit(fails === 0 ? 0 : 1);
}
main().catch((e) => { console.error(e); process.exit(1); });
