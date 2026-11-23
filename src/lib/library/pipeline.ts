// Pipeline verifikasi Library Legal - PRD 14.1. Urutan wajib:
// hash SHA-256 -> struktur APK -> tanda tangan developer -> pemindaian -> audit izin.
// SATU langkah gagal = file TIDAK BISA terbit (VERIFY 4). Skor keamanan 14.2 hanya
// dihitung bila semua langkah lolos.
import { createHash, X509Certificate } from "node:crypto";
import { listZipEntries, extractZipEntry } from "./zip";

export interface PipelineStep { step: string; ok: boolean; detail: string }
export interface PermissionDecl { name: string; meaning: string; dangerous: boolean }
export interface PipelineResult {
  sha256: string; sizeBytes: number;
  steps: PipelineStep[];
  signerFingerprint: string | null;
  safetyScore: number | null;
  safetyBreakdown: { sumber: number; tandaTangan: number; pemindaian: number; izin: number } | null;
  scanStatus: "clean" | "pending" | "failed";
}

export function sha256Hex(data: Buffer): string { return createHash("sha256").update(data).digest("hex"); }
export function normalizeFingerprint(fp: string): string { return fp.replace(/[^0-9a-fA-F]/g, "").toUpperCase(); }

// Ekstrak fingerprint SHA-256 sertifikat penanda tangan dari blok PKCS#7 (META-INF/*.RSA|DSA|EC).
// Memindai urutan DER SEQUENCE dan mencoba parse X509Certificate - sertifikat yang valid akan terparse.
export function extractSignerFingerprint(apk: Buffer): string | null {
  let entries;
  try { entries = listZipEntries(apk); } catch { return null; }
  const sigEntry = entries.find((e) => /^META-INF\/[^/]+\.(RSA|DSA|EC)$/i.test(e.name));
  if (!sigEntry) return null;
  let blob: Buffer;
  try { blob = extractZipEntry(apk, sigEntry); } catch { return null; }
  for (let i = 0; i + 4 < blob.length; i++) {
    if (blob[i] !== 0x30 || blob[i + 1] !== 0x82) continue;
    const len = blob.readUInt16BE(i + 2);
    const total = len + 4;
    if (total <= 0 || i + total > blob.length) continue;
    try {
      const cert = new X509Certificate(blob.subarray(i, i + total));
      if (cert.subject && cert.issuer) return normalizeFingerprint(cert.fingerprint256);
    } catch { /* bukan sertifikat di offset ini - lanjutkan */ }
  }
  return null;
}

export interface PipelineInput {
  expectedFingerprint: string; // fingerprint resmi dari developer / F-Droid (diisi admin dari sumber resmi)
  sourceType: "open_source" | "developer";
  permissions: PermissionDecl[];
  vtApiKey?: string;
}
export async function runPipeline(apk: Buffer, input: PipelineInput): Promise<PipelineResult> {
  const steps: PipelineStep[] = [];
  const sha256 = sha256Hex(apk);

  // 1) Hash
  steps.push({ step: "hash", ok: /^[0-9a-f]{64}$/.test(sha256), detail: `SHA-256 dihitung: ${sha256.slice(0, 16)}…` });

  // 2) Struktur APK
  let structureOk = false; let signerFingerprint: string | null = null;
  try {
    const entries = listZipEntries(apk);
    const names = entries.map((e) => e.name);
    const hasManifest = names.includes("AndroidManifest.xml");
    const hasDex = names.some((n) => /^classes\d*\.dex$/.test(n));
    const hasSig = names.some((n) => /^META-INF\/[^/]+\.(RSA|DSA|EC)$/i.test(n));
    const nestedApk = names.some((n) => n.toLowerCase().endsWith(".apk"));
    structureOk = hasManifest && hasDex && hasSig && !nestedApk;
    steps.push({ step: "struktur", ok: structureOk, detail: `Entri: ${names.length}. Manifest: ${hasManifest ? "ada" : "TIDAK ADA"}, dex: ${hasDex ? "ada" : "TIDAK ADA"}, blok tanda tangan: ${hasSig ? "ada" : "TIDAK ADA"}${nestedApk ? ", ADA APK DI DALAM APK (ditolak)" : ""}.` });
    signerFingerprint = extractSignerFingerprint(apk);
  } catch (e) {
    steps.push({ step: "struktur", ok: false, detail: `Berkas tidak bisa dibaca sebagai APK: ${String(e).slice(0, 120)}` });
  }

  // 3) Tanda tangan developer
  const expected = normalizeFingerprint(input.expectedFingerprint);
  const sigOk = !!signerFingerprint && expected.length >= 40 && signerFingerprint === expected;
  steps.push({ step: "tanda_tangan", ok: sigOk, detail: signerFingerprint
    ? (sigOk ? "Fingerprint sertifikat COCOK dengan fingerprint resmi developer." : "Fingerprint sertifikat TIDAK cocok dengan fingerprint resmi yang didaftarkan - file ditolak.")
    : "Sertifikat penanda tangan tidak bisa diekstrak dari blok tanda tangan." });

  // 4) Pemindaian keamanan (VirusTotal hash lookup bila kunci tersedia; tanpa kunci = BLOKIR)
  let scanStatus: PipelineResult["scanStatus"] = "pending"; let scanOk = false; let scanDetail = "";
  if (input.vtApiKey) {
    try {
      const r = await fetch(`https://www.virustotal.com/api/v3/files/${sha256}`, { headers: { "x-apikey": input.vtApiKey } });
      if (r.status === 200) {
        const d = await r.json() as { data?: { attributes?: { last_analysis_stats?: { malicious?: number; suspicious?: number } } } };
        const stats = d.data?.attributes?.last_analysis_stats;
        const bad = (stats?.malicious ?? 0) + (stats?.suspicious ?? 0);
        scanOk = bad === 0; scanStatus = scanOk ? "clean" : "failed";
        scanDetail = `VirusTotal: malicious=${stats?.malicious ?? 0}, suspicious=${stats?.suspicious ?? 0} dari puluhan engine. Ambang terbit kami: 0.`;
      } else if (r.status === 404) {
        scanDetail = "Hash belum dikenal VirusTotal. File baru wajib diunggah untuk dianalisis dulu oleh Admin - tidak bisa terbit dari status tidak dikenal.";
      } else {
        scanDetail = `VirusTotal menjawab HTTP ${r.status}. Pemindaian belum tuntas - file belum bisa terbit.`;
      }
    } catch { scanDetail = "VirusTotal tidak terjangkau dari server. Pemindaian belum tuntas - file belum bisa terbit."; }
  } else {
    scanDetail = "VT_API_KEY belum diatur di server. Pemindaian multi-engine adalah syarat terbit (PRD 14.1) - tanpa hasil scan bersih, file TIDAK bisa terbit.";
  }
  steps.push({ step: "pemindaian", ok: scanOk, detail: scanDetail });

  // 5) Audit izin (deklarasi admin + penjelasan bahasa awam; izin berbahaya wajib dijelaskan)
  const perms = input.permissions ?? [];
  const dangerousUnexplained = perms.filter((p) => p.dangerous && p.meaning.trim().length < 20);
  const permOk = perms.length > 0 && dangerousUnexplained.length === 0;
  steps.push({ step: "izin", ok: permOk, detail: perms.length === 0
    ? "Daftar izin belum dideklarasikan admin dari manifest. Audit izin wajib sebelum terbit."
    : dangerousUnexplained.length > 0
      ? `${dangerousUnexplained.length} izin berbahaya belum punya penjelasan awam yang cukup.`
      : `${perms.length} izin dideklarasikan; ${perms.filter((p) => p.dangerous).length} di antaranya berbahaya dan sudah dijelaskan.` });

  // Skor keamanan 14.2 - hanya bila SEMUA lolos
  const allOk = steps.every((s) => s.ok);
  let safetyScore: number | null = null; let breakdown: PipelineResult["safetyBreakdown"] = null;
  if (allOk) {
    breakdown = {
      sumber: input.sourceType === "open_source" ? 30 : 25,
      tandaTangan: 25,
      pemindaian: 25,
      izin: perms.some((p) => p.dangerous) ? 16 : 20,
    };
    safetyScore = breakdown.sumber + breakdown.tandaTangan + breakdown.pemindaian + breakdown.izin;
  }
  return { sha256, sizeBytes: apk.length, steps, signerFingerprint, safetyScore, safetyBreakdown: breakdown, scanStatus };
}

// Gerbang terbit: semua langkah lolos + skor terhitung + review manual oleh manusia.
export function canPublish(rec: { pipeline: PipelineStep[] | null; safetyScore: number | null; reviewedBy: string | null }): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!rec.pipeline || rec.pipeline.length === 0) errors.push("Pipeline belum dijalankan.");
  else for (const s of rec.pipeline) if (!s.ok) errors.push(`Langkah ${s.step} belum lolos: ${s.detail}`);
  if (rec.safetyScore === null) errors.push("Skor keamanan belum terhitung (semua langkah harus lolos).");
  if (!rec.reviewedBy) errors.push("Review manual belum dilakukan admin.");
  return { ok: errors.length === 0, errors };
}

// Cek mingguan (PRD 14.1): hash berkas di storage harus tetap sama dengan yang tampil.
export function weeklyHashCheck(storedFile: Buffer, recordedSha256: string): boolean {
  return sha256Hex(storedFile) === recordedSha256;
}
