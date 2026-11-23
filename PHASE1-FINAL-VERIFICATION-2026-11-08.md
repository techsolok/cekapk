# CekAPK Phase 1 — Final Verification Report (rev2 ZIP)

**Date:** 8 November 2026, ~11:15 PKT
**Artifact verified:** `CekAPK-Deploy-Phase1-Trust-Pages-2026-11-08-rev2.zip`
**SHA-256:** `da22500051c2c50d21e4834b7e60a717a63a4382e9be12a8771454f1b460911d`
**Size:** 590,467 bytes, 282 files
**Scope:** the exact rev2 ZIP on disk, verified against the current source tree and by fresh test runs. Nothing deployed to production.

## 1. Archive identity and structure — PASS

- SHA-256 on disk matches the reported value `da225000...` exactly.
- 282 files; every key file (both privacy pages, both DMCA pages, both sponsored-content pages, sitemap.ts, transparansi, metodologi-verifikasi, pipeline.ts, check scripts, Phase 1 notes) is **byte-identical between the ZIP and the source tree**.
- Secret-file exclusions: **no `.env.local`**, no `.env` / `.env.production` / `.env.development` / `.env.test`, no `.pem` / `.key` / `.p12`, no `id_rsa*`. The only environment file in the ZIP is the sanitized `.env.example` (placeholders only — verified key-by-key in the earlier correction).
- No `node_modules`, `.next`, `.git`, or other ZIPs inside the archive.

## 2. UTF-8 encoding — PASS

- All **187 text files** in the ZIP decode as strict UTF-8 with **zero failures**.
- **No UTF-8 BOM** in any file.
- The eight trust/policy pages checked individually: valid UTF-8, no BOM. Their non-ASCII characters are ordinary typographic characters (em dashes) — 4–13 per page, all valid UTF-8.

## 3. Build and automated checks — PASS (fresh re-run, 8 Nov ~11:14 PKT)

| Check | Result |
|---|---|
| `npm run build` | Clean — compiled successfully in 6.6s (only the known pre-existing `themeColor` metadata warning, once per EN page, from the root layout — not from Phase 1 pages) |
| `npm run check:seo` | **53/53 PASS** |
| `npm run check:links` | **114 sitemap URLs, 152 checked, 0 broken, 0 orphans, 0 content-not-in-sitemap, 0 no-canonical, 0 missing img alt** |

## 4. Smoke tests — PASS (fresh re-run against a local production server)

- Privacy suite: **30/30** — both privacy pages HTTP 200, exact titles, canonical, 3 hreflang alternates each, My Ad Center URL present, legacy URL absent, 8 Nov 2026 date, all four refinements in both editions, no GA/ads claims.
- Final suite: **40/40** — both DMCA pages (new "aim" wording, reporter informed, aggregate-count Transparency wording, old promises absent, mailto + voluntary disclaimer kept), both sponsored-content pages (8 Nov 2026 dates), sitemap entries.
- **Combined: 70/70.**

## 5. Verification-pipeline claims vs implementation — 13 of 14 claims match; 1 wording gap found

Each claim on `/metodologi-verifikasi` (and the related `/transparansi` sentence) was checked against `src/lib/library/pipeline.ts`, the publish/download routes, and `src/db/schema.ts`.

| # | Claim on the page | Implementation | Verdict |
|---|---|---|---|
| 1 | Scope: only Library files are verified; catalog app pages are explanations, untested apps get no score or "safe" claim | Scores render only on `/perpustakaan`, `/perpustakaan/[id]`, `/keamanan`, admin panel, and only when non-null; catalog app pages never render a score | MATCH |
| 2 | A clean scan means 0 detections — not a guarantee of safety | `scanOk = malicious + suspicious === 0` | MATCH |
| 3 | Only legal sources enter the pipeline: open-source or developer-supplied | `PipelineInput.sourceType: "open_source" \| "developer"` | MATCH |
| 4 | Step 1 — SHA-256 computed and recorded; a changed hash is a different file | `sha256Hex()` computed, stored in `library_files.sha256`; `weeklyHashCheck()` compares stored vs recorded | MATCH |
| 5 | Step 2 — structure: AndroidManifest.xml, dex file, META-INF signature block, no nested APK | `structureOk = hasManifest && hasDex && hasSig && !nestedApk` | MATCH |
| 6 | Step 3 — signer fingerprint extracted from the signature block and matched to the admin-registered official fingerprint; mismatch = rejected | `extractSignerFingerprint()` (PKCS#7 → X509 → SHA-256 fingerprint); `sigOk = fingerprint === expected` (expected from admin, from the official source) | MATCH |
| 7 | Step 4 — VirusTotal hash lookup; threshold 0 malicious and 0 suspicious; unknown hash cannot publish; no API key = step fails = cannot publish | `GET /v3/files/{sha256}`; `scanOk = bad === 0`; HTTP 404 → cannot publish; no `VT_API_KEY` → `scanOk` stays false with an explicit blocking detail | MATCH |
| 8 | Step 5 — permissions declared by admin in plain language; every dangerous permission must have an adequate explanation; permission check is not malware detection | `permOk = perms.length > 0 && dangerousUnexplained.length === 0` (dangerous = explanation < 20 chars) | MATCH |
| 9 | One failed step = file cannot publish | `canPublish()` requires every pipeline step `ok` + non-null `safetyScore` + `reviewedBy`; gate failure → HTTP 422 | MATCH |
| 10 | Score only when all steps pass (source 25–30, signature 25, scan 25, permissions 16–20) | Score computed only inside `if (allOk)`; breakdown = source 30 open-source / 25 developer, signature 25, scan 25, permissions 20 (no dangerous) / 16 (dangerous present) | MATCH |
| 11 | Manual admin review still required before publication | `canPublish()` requires `reviewedBy` non-null | MATCH |
| 12 | File statuses: draft, published, flagged, rejected; scan statuses: clean, pending, failed | Schema comment: `draft\|published\|flagged\|rejected`; `PipelineResult.scanStatus: "clean" \| "pending" \| "failed"` | MATCH |
| 13 | **"Hash berkas yang sudah terbit diperiksa ulang setiap minggu"** | `weeklyHashCheck()` exists and **is** used — at publish (mismatch → status `flagged` + HTTP 409) and the download route re-verifies the hash on every download (mismatch → HTTP 409 + file flagged). `lastCheckedAt` is set at upload and publish. **But no weekly scheduled job exists in the code** — no cron, no scheduled route, no recurring invocation. | **GAP — wording overstates the cadence** |
| 14 | Status as of 6 Nov 2026: VT_API_KEY not set on the server, so the scan step cannot pass for any file and the Library is intentionally empty | The key remains unset (still on the owner's open list; nothing since 6 Nov set it); the public Library starts empty by design | MATCH (dated claim, still true) |

**Transparency page sentence** ("File hanya terbit bila lima langkah pipeline lolos semua … ditambah review manual manusia") also matches `canPublish()` exactly. Its report counts are aggregate only (Total / Safety / DMCA / Broken / Still open, selecting only `{type, status}`) — no complainant personal information is published, consistent with the rev2 DMCA wording.

### The one gap, in plain terms

The pipeline re-checks a published file's hash **at publish time and at every download** — both paths flag the file and block with HTTP 409 on a mismatch. What does not exist is an automated **weekly** re-check. The methodology page's sentence "Hash berkas yang sudah terbit diperiksa ulang setiap minggu" therefore describes an intended cadence, not an implemented schedule. Everything else on the page matches the code exactly.

**Recommended fix (one sentence, no code change):** replace that sentence with "Hash berkas diperiksa ulang setiap kali diterbitkan dan setiap kali diunduh: bila hash di penyimpanan tidak lagi sama dengan hash yang tercatat, berkas itu ditahan." The alternative — implementing a real weekly job — is a larger change and is not needed for this deployment.

## 6. Overall verdict

- **Archive, secrets, encoding, build, SEO checks, link checks, smoke tests: PASS.**
- **Pipeline claims: 13 of 14 match; 1 wording gap** (weekly re-check cadence) — minor, confined to one sentence on the methodology page, and fixable without any code change.
- **Production: UNCHANGED.** Nothing has been deployed; the rev2 ZIP awaits the owner's deployment approval.

## 7. Addendum — gap fixed in rev3 (8 Nov 2026, ~11:17 PKT)

The owner chose the one-sentence fix. The methodology page now reads: "Hash berkas diperiksa ulang setiap kali diterbitkan dan setiap kali diunduh: bila hash di penyimpanan tidak lagi sama dengan hash yang tercatat, berkas itu ditahan." Page dates moved 6 → 8 November 2026 (the VT key is still unset on 8 Nov, so the status claim stays true); sitemap `/metodologi-verifikasi` lastmod 2026-11-08. Fresh verification after the fix: build clean, check:seo **53/53**, check:links **0 broken / 0 orphans**, smoke **79/79** (30 privacy + 40 final + 9 methodology — new sentence present, old sentence absent, dates correct, 5 steps intact, VT-key status kept). New ZIP `CekAPK-Deploy-Phase1-Trust-Pages-2026-11-08-rev3.zip`, SHA-256 `e4d0b8f64d212e9346fc9ff045fa40adec909f3319c72ff6e3dd83e2733ad964` (283 files; 14/14 content checks pass inside the ZIP, including all prior corrections). **Pipeline claims now 14/14.** Production still unchanged; the rev3 ZIP awaits the owner's deployment approval.

## 8. Recommendation

Deploy the **rev3 ZIP** — it contains every Phase 1 correction plus the methodology wording fix, and it passed the full verification suite again after the fix (see §7). The gap did not affect any Phase 1 trust page, the pipeline itself, or any download/verification behaviour.

## 9. Addendum — deployed and verified live (8 Nov 2026, ~11:48–11:50 PKT)

Ahmad deployed the rev3 ZIP. Live verification (direct page reads + a read-only browser check of the remaining pages, footers, and sitemaps) confirmed **13/13 checks pass**: /metodologi-verifikasi shows the rev3 sentence and 8 Nov dates; /privasi and /en/privacy-policy show the My Ad Center URL and all four refinements; /dmca and /en/dmca show the "aim" wording and aggregate-count Transparency wording; /kebijakan-iklan and /en/advertising-policy show 8 Nov dates; /en/terms-of-use (13 sections), /en/about, /en/contact, /ketentuan (13 sections), /kontak, /tentang all load; EN footer Legal links to the 5 EN trust pages with About in Explore and no Indonesian legal links; ID footer Legal links to /kebijakan-iklan; /sitemap/en.xml lists all 6 EN trust pages; /sitemap/statis.xml lists /kebijakan-iklan, /metodologi-verifikasi, and /privasi, all lastmod 2026-11-08. **Correction to the verification itself:** the browser check first flagged 4 items as FAIL (three titles and the footer). All four were errors in the checklist's expected values, not deployment defects — each live value matches the source exactly (verified against the page metadata and `Footer.tsx`). Remaining owner steps: fresh post-deploy snapshot in hPanel and GSC indexing requests for the 7 new URLs.
