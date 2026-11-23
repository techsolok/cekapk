# Manifest — EN App Pages: Chrome, Facebook, Gmail, Maps (18 Nov 2026)

Package: `CekAPK-EN-Apps-Chrome-Facebook-Gmail-Maps-2026-11-18.zip`
Built: 18 Nov 2026, workspace only. The ZIP's own SHA-256 is in the delivery message and in MEMORY.md (a manifest cannot contain its own hash).

## Changed files (8)

1. `src/lib/data/i18n-en-apps-b.ts` — 4 new EN app records (google-chrome, facebook, gmail, google-maps), each with verifiedAtEn "2026-11-18".
2. `src/lib/data/i18n-en-types.ts` — optional `verifiedAtEn?: string` added to `EnAppContent`.
3. `src/app/(en)/en/aplikasi/[slug]/page.tsx` — EN app template displays `checkedAt` (verifiedAtEn when present, else the Indonesian verifiedAt).
4. `src/app/sitemap.ts` — EN segment: EN app lastmod from `a.verifiedAtEn`.
5. `src/app/(en)/en/page.tsx` — "Recently Verified" sorts by the English check date; stale "11 apps" comment corrected.
6. `src/app/(en)/en/aplikasi/page.tsx` — hub metadata description "11" → "15 Android apps"; stale comments corrected (11 → 15 apps, other 39 → 35).
7. `scripts/check-seo.mjs` — EN-app count pin 11 → 15 (same strength); coverage comment corrected; 4 new pins for the verifiedAtEn wiring.
8. `en-coverage-matrix.md` — coverage updated: 15 apps complete / 35 untranslated; shortlist #1 marked done 18 Nov 2026; Tools row corrected to 3 complete.

## Documentation in this ZIP (3)

9. `EN-APPS-CHROME-FACEBOOK-GMAIL-MAPS-2026-11-18.md` — report (§1–§7).
10. `EN-APPS-CHROME-FACEBOOK-GMAIL-MAPS-DEPLOY-GUIDE-2026-11-18.md` — Steps 1–5 + rollback.
11. `MANIFEST-EN-APPS-CHROME-FACEBOOK-GMAIL-MAPS-2026-11-18.md` — this file.

## Verification (local, before packaging)

- tsc 0; build clean, 139 pages (BUILD_ID YgsRhUqYtdv1bftKsmW0Y).
- check:seo ALL PASSED; check:links 120 URLs / 164 checked / 0 broken / 0 orphans / 0 missing canonical; check:negative OK.
- Rendered suite `/tmp/enapps-checks.cjs`: 297/297 PASS.
- Visual suite `/tmp/enapps-shots/shots.cjs`: 96/96 PASS; 16 screenshots in `~/workspace/cekapk-enapps-screenshots/`.
- Word counts: google-chrome 699, facebook 567, gmail 614, google-maps 582 (2,462 total).
