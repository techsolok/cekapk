# Manifest — CekAPK-EN-Checker-Card-Fix-2026-11-18.zip

Patch package. Workspace only; deploy only on the owner's explicit say-so.
The ZIP's own SHA-256 is NOT in this file (self-reference) — it lives in
the delivery message.

## Changed files (2)

- `src/app/(en)/en/page.tsx` — Permission Checker ToolCard: desc drops
  "Runs in Indonesian for now."; href `/tools/pemeriksa-izin` →
  `/en/tools/permission-checker`.
- `scripts/check-seo.mjs` — 1 new pin (EN checker card fix Nov 2026),
  reusing the existing `enHome` read. No assertion changed or weakened.

## Docs in this package (3)

- `EN-CHECKER-CARD-FIX-2026-11-18.md` — report (§1–§6).
- `EN-CHECKER-CARD-FIX-DEPLOY-GUIDE-2026-11-18.md` — Steps 1–5 + rollback.
- `MANIFEST-EN-CHECKER-CARD-FIX-2026-11-18.md` — this file.

## Verification (local, before packaging)

- tsc 0; build clean, 139 pages, BUILD_ID `gPDcJxyV81Sl6m6A61Doi`.
- check:seo ALL PASSED (incl. new pin); check:links ALL PASSED (120 URLs,
  0 broken); check:negative OK.
- Rendered `.next/server/app/en.html`: card href
  `/en/tools/permission-checker` present; "Runs in Indonesian for now"
  occurs 0 times.
