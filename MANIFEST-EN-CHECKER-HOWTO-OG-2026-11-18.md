# Manifest — CekAPK EN Permission Checker + HowTo + Per-Tool OG Images (18 Nov 2026)

Package: `CekAPK-EN-Checker-HowTo-OG-2026-11-18.zip`
Contents: 19 changed/added source files + report + deploy guide + this manifest (22 entries).
Baseline: live build = Phase 2A + Phase A + Corrections 1+2 + banner fix + UI-02 + UI-03 Rev 1 + UI-04 + UI-05 Phase A + B + C + Bstation SEO rev2 + UI-05 Phase D + Audit-Fix Fase2/Schema/Hijau + UI-05 Phase E + Author/Byline (all deployed and verified live, 18 Nov 2026).
Local build: clean, 135 pages, BUILD_ID OiVegd-iPF8tEn8yEaG4e. check:seo all pass, check:links all pass, check:negative OK. Rendered suite 46/46, visual suite 20/20, API end-to-end EN + ID verified.

## Files

- src/lib/data/i18n-en.ts — enTools gains pemeriksa-izin → /en/tools/permission-checker
- src/lib/tools/permissions-dict.ts — English name/explanation/advice for all 20 entries; lang-aware analysis + English warnings
- src/app/(id)/api/tools/permissions/check/route.ts — reads lang from the form, passes it to the analysis
- src/app/(en)/en/tools/permission-checker/page.tsx — NEW EN checker page (metadata, hreflang, FAQ + HowTo JSON-LD, How to Use, How to Read the Results)
- src/app/(en)/en/tools/permission-checker/PermissionCheckerEn.tsx — NEW EN client component (English UI, error mapping by HTTP status)
- src/app/(id)/tools/pemeriksa-izin/page.tsx — hreflang + HowTo JSON-LD + Cara Menggunakan section + dynamic OG
- src/app/(en)/en/tools/page.tsx — hub card now links to the EN checker page; "Indonesian only" note and "not part of this phase" text removed
- src/lib/seo.tsx — howToJsonLd accepts plain-string steps (guides unchanged)
- src/app/(id)/tools/pengunduh-tiktok/page.tsx — steps const + HowTo JSON-LD + dynamic OG
- src/app/(en)/en/tools/tiktok-downloader/page.tsx — HowTo JSON-LD + dynamic OG
- src/app/(id)/tools/pengunduh-instagram/page.tsx — HowTo JSON-LD + dynamic OG
- src/app/(en)/en/tools/instagram-downloader/page.tsx — HowTo JSON-LD + dynamic OG
- src/app/(id)/tools/pengunduh-tiktok/opengraph-image.tsx — NEW per-tool OG image
- src/app/(id)/tools/pengunduh-instagram/opengraph-image.tsx — NEW per-tool OG image
- src/app/(id)/tools/pemeriksa-izin/opengraph-image.tsx — NEW per-tool OG image
- src/app/(en)/en/tools/tiktok-downloader/opengraph-image.tsx — NEW per-tool OG image
- src/app/(en)/en/tools/instagram-downloader/opengraph-image.tsx — NEW per-tool OG image
- src/app/(en)/en/tools/permission-checker/opengraph-image.tsx — NEW per-tool OG image
- scripts/check-seo.mjs — EN hub assertion updated to the new state (equal strength) + 9 new pins
- EN-CHECKER-HOWTO-OG-2026-11-18.md — report
- EN-CHECKER-HOWTO-OG-DEPLOY-GUIDE-2026-11-18.md — deploy guide
- MANIFEST-EN-CHECKER-HOWTO-OG-2026-11-18.md — this file
