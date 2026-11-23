# MANIFEST — CekAPK UI-05 Phase E (2026-11-18)

**ZIP:** `CekAPK-UI05-PhaseE-2026-11-18.zip`
**Entries:** 5
**Base build:** audit-fix (Nov 18, 2026) — workspace and production in sync before this package.
**Local build:** BUILD_ID `U-GwRn-V_Ka50a0211mPl` (128 pages, clean).

## Files

| File | Purpose |
|---|---|
| `src/lib/data/i18n-en-apps-b.ts` | 5 English guides expanded: sectionsEn, FAQs, relatedAppsEn, verifiedAtEn 2026-11-18, bodyEn emptied (content moved into sections) |
| `src/app/sitemap.ts` | EN sitemap segment: guide lastmod now from `verifiedAtEn` |
| `UI-05-PHASEE-2026-11-18.md` | Implementation report (§1–§7) |
| `UI-05-PHASEE-DEPLOY-GUIDE-2026-11-18.md` | Safe-deploy steps + staging grep expectations |
| `MANIFEST-UI-05-PHASEE-2026-11-18.md` | This file |

## Verification (local, before packaging)

- tsc: 0 errors. Build: clean, 128 pages.
- check:seo: ALL PASSED. check:links: 115 sitemap URLs / 155 checked / 0 broken / 0 orphans. check:negative: OK.
- Rendered suite: 104/104 PASS (`/tmp/phasee-checks.cjs`).
- Visual suite: 20 screenshots, 0px overflow, date-line contrast 4.76 light / 7.37 dark (`~/workspace/cekapk-phasee-screenshots/`).

## Staging grep expectations (include APKPure's pre-existing 1)

- `sectionsEn:` in `src/lib/data/i18n-en-apps-b.ts` → **6**
- `verifiedAtEn: "2026-11-18"` in `src/lib/data/i18n-en-apps-b.ts` → **5**
- `verifiedAtEn:` total in `src/lib/data/i18n-en-apps-b.ts` → **6**
- `g.verifiedAtEn` in `src/app/sitemap.ts` → **1**
- `bodyEn: [],` in `src/lib/data/i18n-en-apps-b.ts` → **6**
- `relatedAppsEn:` in `src/lib/data/i18n-en-apps-b.ts` → **6**

## Word counts (countEnGuideWords)

- apa-itu-apk-hijau: 953 | apa-itu-apk-ijo: 763 | cara-instal-apk-aman: 835 | cara-cek-izin-aplikasi: 843 | cara-mengenali-apk-palsu: 887 | apakah-apkpure-aman: 3,131 (unchanged)
