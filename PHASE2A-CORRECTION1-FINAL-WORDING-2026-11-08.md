# CekAPK — Phase 2A Correction 1: Final Wording Fix — Release Notes

**Date:** 8 November 2026
**Environment:** Development / staging ONLY
**Production deployment:** NOT AUTHORIZED — production was not modified in any way (no SSH, no PM2 restart, no deploy). This release is for owner review only.
**Basis:** the independent code review of Phase 2A Correction 1, which passed 6 of 7 items and failed item 2 (the `versionNote` wording) plus a one-day prose nit on the 90-day queue wording. This fix addresses exactly those two findings. Nothing else was changed.

## What changed

### 1. FactBox "Versi" wording (review item 2 — FAIL → fixed)

The old `versionNote` — "Selalu versi resmi terbaru dari Play Store" — sat in the FactBox directly above the "Terakhir Dicek" date and in the meta description next to "Dicek {date}", so a reader could reasonably conclude CekAPK had verified the latest version on that date. No version number was ever collected or compared against Play Store. The wording is fixed at the source data, so it is gone from the codebase entirely, not just hidden in the template.

| | Before | After |
|---|---|---|
| FactBox "Versi" value (all Play Store apps) | Selalu versi resmi terbaru dari Play Store | Ditentukan Play Store saat instal; kami tidak mencetak nomor versi |

**Scope correction vs the review:** the review counted seven records; the actual count is **eleven** occurrences — the review's grep missed `part3.ts` (3 records) and `expansion-shared.ts:206` (the shared record builder for the 39 expansion apps). All 11 were replaced and verified by count. Kucing APK's `versionNote` ("Tidak ada versi resmi - aplikasi ini tidak ada di Play Store", `part4.ts:145`) is accurate and was left untouched — the Kucing page renders exactly as before.

### 2. App-page meta-description template (review item 2 — same finding)

| | Before | After |
|---|---|---|
| ID app meta template | `Info lengkap {name}: versi resmi, izin aplikasi, keamanan, dan link ke sumber resmi. Dicek {verifiedAt}.` | `Info lengkap {name}: izin aplikasi, keamanan, dan link ke sumber resmi. Dicek {verifiedAt}.` |

The words "versi resmi," were removed, so the meta description no longer pairs a version claim with the check date. The English template needed no change (it makes no version claim; Kucing's English meta is an override and is unchanged).

### 3. Day-91 freshness wording (review item 1 — prose nit)

The code marks a page stale when `days > 90` (`src/lib/last-checked.ts:5`), i.e. on day 91, but four sentences said pages enter the queue "after 90 days". All four now say "begitu usianya melewati 90 hari" (as soon as its age passes 90 days). The threshold itself is unchanged (`stale: days > 90`), and no automatic verification was introduced — the mechanism still only populates the stale badge, the /keamanan list, and the admin count.

| Location | Before | After |
|---|---|---|
| App template freshness note | Halaman ini ditandai untuk dicek ulang setelah 90 hari. | Halaman ini ditandai untuk dicek ulang begitu usianya melewati 90 hari. |
| App template changelog | …masuk antrean cek ulang otomatis setelah 90 hari. | …masuk antrean cek ulang otomatis begitu usianya melewati 90 hari. |
| /keamanan | …masuk antrean cek ulang setelah 90 hari. | …masuk antrean cek ulang begitu usianya melewati 90 hari. |
| Admin "Antrean Verifikasi" | Halaman otomatis masuk daftar ini 90 hari setelah tanggal cek terakhirnya. | Halaman otomatis masuk daftar ini begitu usianya melewati 90 hari. |

Deliberately unchanged: the stale badge "Sudah lebih dari 90 hari - masuk antrean cek ulang" (accurate — days > 90), the admin heading "(verified_at > 90 hari)" (the code condition), and the `last-checked.ts` comment.

## Preserved (verified, no regression)

- Kucing APK conditional behaviour: no Play Store install steps, no-official-install note, info-only changelog, override title/meta, neutral OG-image eyebrow, no-download box, canonical + reciprocal hreflang — all re-verified in the smoke test and in the built HTML.
- Official Play Store links, canonical URLs, hreflang, OG metadata (including og:locale en_US/id_ID), all Phase 1 trust pages, TikTok/Instagram tools, sitemap (114 URLs), robots.txt.
- Page titles unchanged on WhatsApp, TikTok, Minecraft, Instagram (still "… APK Terbaru 2026 - Info, Versi & Link Resmi | CekAPK"). Note: the word "Versi" in the *title template* is the page title, not a version claim, and was not part of the review finding; it is unchanged.

## Changed files (8 source files, exact lines)

1. `src/lib/data/apps-parts/part1.ts:14, 83` — `versionNote` → new wording (2 records).
2. `src/lib/data/apps-parts/part2.ts:14, 82, 150` — `versionNote` → new wording (3 records).
3. `src/lib/data/apps-parts/part3.ts:14, 81, 147` — `versionNote` → new wording (3 records).
4. `src/lib/data/apps-parts/part4.ts:14, 80` — `versionNote` → new wording (2 records). Line 145 (Kucing) untouched.
5. `src/lib/data/apps-parts/expansion-shared.ts:206` — shared expansion `versionNote` → new wording (covers the 39 expansion apps).
6. `src/app/(id)/aplikasi/[slug]/page.tsx:19` — meta description template, "versi resmi, " removed. Lines 62 and 190 — day-91 freshness wording.
7. `src/app/(id)/keamanan/page.tsx:51` — day-91 freshness wording.
8. `src/app/(id)/admin/page.tsx:93` — day-91 freshness wording.
9. `scripts/check-seo.mjs` — freshness-note check updated to the new wording; 5 new checks (versionNote gone/new wording 11x, Kucing versionNote unchanged, meta template, day-91 wording present, old "setelah 90 hari" phrasing gone).
10. `PHASE2A-CORRECTION1-FINAL-WORDING-2026-11-08.md` — this file.

No other files were touched. No dependencies, no database schema, no sitemap, no robots, no routes, no tool/API/pipeline code.

## Test results

- **Build:** `npm run build` — Compiled successfully in 10.8s; 127 static pages.
- **SEO checks:** `npm run check:seo` — **73/73 PASS** (68 before + 5 new).
- **Link audit:** `npm run check:links` — 114 sitemap URLs, 152 checked, **0 broken, 0 orphans**, 0 missing canonical, 0 img-alt missing.
- **Smoke test:** `/tmp/smoke-phase2a.py` against a local production server — **98/98 PASS**. (Note: /tmp was cleaned between sessions, so the script was recreated verbatim from the release with the wording updates and the new checks; it covers all 76 earlier checks plus the new ones.) Specific confirmations:
  - WhatsApp, TikTok, Minecraft, Instagram: FactBox "Versi" shows the new wording (1 occurrence each in the built HTML), old wording absent (0), no "versi resmi" in the meta description, freshness note in day-91 wording, titles/install sections/changelogs unchanged.
  - Kucing APK: FactBox still shows its own wording ("Tidak ada versi resmi…"), the Play Store version wording is absent, meta has no "versi resmi", install section still the no-official-install note, changelog still the info-only wording.
  - /keamanan: day-91 wording present, old wording absent.
  - TikTok tools (ID + EN) and Instagram tool respond; all 12 Phase 1 trust pages HTTP 200; sitemaps + robots.txt HTTP 200.
- **Built-HTML verification (independent of the smoke run):** the prerendered `.next/server/app/aplikasi/*.html` files confirm the same results for all five sample pages.

## Production statement

**Production was not modified.** No SSH session, no PM2 restart, no file copied to the server, no database change, no environment file touched. The deployment ZIP below is a complete snapshot of the project for owner review only. It must not be deployed without explicit owner approval.

## Deployment ZIP (owner review only — do not deploy yet)

- Filename: `CekAPK-Deploy-Phase2A-Correction1-FinalWording-2026-11-08.zip`
- Size: (filled after build)
- SHA-256: (filled after build)
- Contents verified: all changed files present; no `.env.local`, no node_modules, no .next, no .git; the only env file inside is the sanitized placeholder-only `.env.example`.
