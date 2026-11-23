# CekAPK — Phase 2A Correction 1: Release Notes

**Date:** 8 November 2026
**Environment:** Development / staging ONLY
**Production deployment:** NOT AUTHORIZED — production was not modified in any way (no SSH, no PM2 restart, no deploy). This release is for owner review only.

## What changed

Four corrections from the read-only Phase 2A audit. No functionality, routes, pages, SEO architecture, trust pages, downloader tools, app content, design system, or deployment configuration was removed or changed beyond what is listed here.

### Correction A — Kucing APK metadata (misleading title/description)

The app template generated the same title/description for every app. For Kucing APK — the only `info_only` app, with no official version and no official source — that produced false claims. Fixed with per-app metadata overrides (new optional fields `seoTitle`/`seoDescription` on the app record, `seoTitleEn`/`seoDescriptionEn` on the English record), so the template is unchanged for the other 49 apps.

| URL | Before (rendered) | After (rendered) |
|---|---|---|
| /aplikasi/kucing-apk — title | Kucing APK Terbaru 2026 - Info, Versi & Link Resmi \| CekAPK | Kucing APK: Fakta, Risiko & Alternatif Anime Legal \| CekAPK |
| /aplikasi/kucing-apk — meta | Aplikasi anime tidak resmi yang banyak dicari - ini fakta dan risiko jujurnya. Info lengkap Kucing APK: versi resmi, izin aplikasi, keamanan, dan link ke sumber resmi. Dicek 2026-10-18. | Kenali Kucing APK, status developer yang tidak terverifikasi, risiko keamanan, dan alternatif anime legal. CekAPK tidak menyediakan file unduhan aplikasi ini. |
| /en/aplikasi/kucing-apk — title | Kucing APK for Android - Safety, Permissions & Official Download \| CekAPK | Kucing APK: Safety Risks & Legal Alternatives \| CekAPK |
| /en/aplikasi/kucing-apk — meta | An unofficial anime app many people search for - here are the honest facts and risks. What Kucing APK is, how it works, its safety and privacy picture, and the official download link. Checked 2026-10-18. | Learn about Kucing APK, its unverified developer, potential security risks and legal alternatives. CekAPK does not host or link to a download for this app. |

Note on the brief's suggested titles: the brief wrote them with " | CekAPK" included. The code passes the title *without* the suffix because both layouts apply the `%s | CekAPK` template — the rendered titles above match the brief exactly.

OG + Twitter title/description follow the same values automatically (pageMetadata derives them from title/description). The ID app OG image eyebrow also changed for info-only apps: "Anime & Hiburan Legal • Info & Link Resmi" → "Anime & Hiburan Legal • CekAPK". The EN OG image was already neutral ("• CekAPK") — unchanged.

Preserved: the unverified-developer warning, the legal-alternatives section (Bstation, Crunchyroll, YouTube), the safety content, the no-download box, canonical + reciprocal hreflang (unchanged and verified in the smoke test).

### Correction B — Empty APK library metadata (/perpustakaan)

| | Before (rendered) | After (rendered) |
|---|---|---|
| Title | Perpustakaan APK Legal - File Open-Source Terverifikasi \| CekAPK | Perpustakaan APK CekAPK: Status Verifikasi & Kandidat Open-Source \| CekAPK |
| Meta | File APK open-source yang lolos pipeline verifikasi: hash SHA-256, tanda tangan developer cocok, scan bersih, izin diaudit. Selain itu kami hanya menautkan ke sumber resmi. | Belum ada file APK yang tersedia. Pelajari standar verifikasi CekAPK dan kandidat aplikasi open-source yang hanya ditautkan ke sumber resmi. |

The zero-verified-files disclosure ("Belum ada file yang selesai diverifikasi saat ini…") is unchanged and prominent. No fake downloads or sample buttons were added. Candidate links still point to official sources (F-Droid). The verification pipeline is untouched. One body wording fix: step 5 of the methodology list said "hash dicek ulang secara berkala" — no periodic re-check exists — now "hash dicek ulang setiap kali diterbitkan dan setiap kali diunduh", matching the methodology page (Phase 1 rev3).

### Correction C — App information freshness audit

Full report: `APP-FRESHNESS-AUDIT-2026-11-08.md` (separate file). Summary:

- **Audited:** Instagram, WhatsApp, TikTok (ID + EN), Minecraft, Kucing APK — fields: version, developer, package ID, last verified date, official source URL, permissions, security claims, download availability.
- **Verified:** developer + package ID + official URL for all four Play Store apps were verified live against the Play Store on 6 Nov 2026 (`play-package-ids.md`); no numeric safety scores exist anywhere (SafetyScore null by design); download availability is accurate (Play Store buttons for the four, no button + explicit warning for Kucing).
- **Stale/unverified:** all six pages carry `verifiedAt` 2026-10-18 (21 days old — current under the 90-day rule, re-check due ~16 Jan 2027; dates were NOT changed, nothing was freshly verified); permissions are editorial summaries (the page itself discloses this); the version note is a channel statement, not a measured version number (no version number is printed anywhere).
- **Unsupported claims fixed:** (1) "Halaman ini dicek ulang berkala; fakta versi selalu versi resmi terbaru dari sumbernya." → "Halaman ini ditandai untuk dicek ulang setelah 90 hari." (2) The "Cara Instal dari Sumber Resmi" Play Store steps rendered on the Kucing page → now conditional on `officialUrl`; info-only apps show an accurate no-official-install note. (3) The changelog's "diperbarui langsung oleh developer-nya lewat Play Store" on the Kucing page → conditional wording for info-only apps. (4) Perpustakaan step 5 periodic-hash claim (see B above).
- **Claims checked and kept:** the 90-day stale-list wording ("masuk antrean cek ulang") describes the admin stale list, which populates automatically — real mechanism, not a re-check claim; the Play Store changelog sentence for Play Store apps describes distribution behaviour, not a measurement.

### Correction D — English Open Graph locale

`pageMetadata` (`src/lib/seo.tsx`) now derives the default `og:locale` from the path: `/en/*` → `en_US`, everything else → `id_ID`. Explicit `locale` params still win (all existing ones already agree with the rule). Effect:

| Pages | Before | After |
|---|---|---|
| /en (home), /en/aplikasi/* (11), /en/panduan/* (6) | og:locale id_ID (wrong) | og:locale en_US |
| /en/tools, /en/tools/*, all 6 EN trust pages (already explicit) | en_US | en_US (unchanged) |
| All Indonesian pages | id_ID | id_ID (unchanged) |

Canonical, hreflang, x-default, page language, and URL routing are unchanged.

## Modified files (12)

1. `src/lib/data/content-types.ts` — PillarApp: optional `seoTitle` / `seoDescription`.
2. `src/lib/data/i18n-en-types.ts` — EnAppContent: optional `seoTitleEn` / `seoDescriptionEn`.
3. `src/lib/data/apps-parts/part4.ts` — Kucing ID record: `seoTitle` + `seoDescription`.
4. `src/lib/data/i18n-en-apps-b.ts` — Kucing EN record: `seoTitleEn` + `seoDescriptionEn`.
5. `src/app/(id)/aplikasi/[slug]/page.tsx` — metadata override; freshness sentence; install section conditional; changelog conditional.
6. `src/app/(en)/en/aplikasi/[slug]/page.tsx` — metadata override.
7. `src/app/(id)/aplikasi/[slug]/opengraph-image.tsx` — neutral eyebrow for info-only apps.
8. `src/app/(id)/perpustakaan/page.tsx` — title/description; step 5 wording.
9. `src/lib/seo.tsx` — og:locale path-based default.
10. `scripts/check-seo.mjs` — 15 new Phase 2A checks; footer check label corrected (About is in Explore, not Legal — the check itself was already correct).
11. `APP-FRESHNESS-AUDIT-2026-11-08.md` — new, separate freshness audit report.
12. `PHASE2A-CORRECTION1-2026-11-08.md` — this file.

## Test results

- **Build:** `npm run build` — Compiled successfully in 9.9s; 127 static pages. (Only the known pre-existing "Unsupported metadata themeColor" warning, once per EN page.)
- **SEO checks:** `npm run check:seo` — **68/68 PASS** (53 before + 15 new Phase 2A checks). One check failed on the first run — a faulty regex in the new OG-image check itself, not the code; the check was corrected and the suite re-ran clean.
- **Link audit:** `npm run check:links` — 114 sitemap URLs, 152 checked, **0 broken, 0 orphans**, 0 missing canonical, 0 img-alt missing.
- **Smoke test:** `/tmp/smoke-phase2a.py` against a local production server — **76/76 PASS**. Covers: Kucing ID/EN titles, meta, OG, Twitter, locale, canonical, hreflang, no misleading phrases in metadata, warning/alternatives/no-download content preserved, install/changelog conditionals, library metadata + zero-files disclosure, og:locale on EN home/apps/guides/tools vs ID pages, WhatsApp page unchanged, TikTok tools (ID + EN) + Instagram tool responding, all 12 Phase 1 trust pages HTTP 200, sample pages HTTP 200, sitemaps + robots.txt. Two apparent failures during the run were smoke-script artifacts (the OG image URL carries a build-hash suffix; React inserts a comment separator inside interpolated text) — diagnosed, script corrected, site confirmed correct both times.
- **No-index/nofollow:** no unintended directives introduced (verified by check:seo + check:links; robots.txt unchanged).
- **Regression spot-checks:** WhatsApp page title, install section, and changelog are byte-identical in behaviour to before; TikTok download tools respond; all Phase 1 trust pages load.

## Production statement

**Production was not modified.** No SSH session, no PM2 restart, no file copied to the server, no database change, no environment file touched. The deployment ZIP below is a complete snapshot of the project for owner review only. It must not be deployed without explicit owner approval.

## Deployment ZIP (owner review only — do not deploy yet)

- Filename: `CekAPK-Deploy-Phase2A-Correction1-2026-11-08.zip`
- Size: 607,555 bytes (285 files)
- SHA-256: `964b68514aadcd0b6b016a21ae9bb7ed34b2b5f2d563f5571567dae022354359`
- Contents verified: all 12 modified/new files present; no `.env.local`, no node_modules, no .next, no .git; the only env file inside is the sanitized placeholder-only `.env.example` (all credential lines verified placeholder-only).
