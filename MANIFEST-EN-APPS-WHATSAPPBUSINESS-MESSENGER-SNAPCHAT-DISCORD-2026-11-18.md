# Manifest — CekAPK-EN-Apps-WhatsAppBusiness-Messenger-Snapchat-Discord-2026-11-18.zip

Patch package. Workspace only; deploy only on the owner's explicit say-so.
The ZIP's own SHA-256 is NOT in this file (self-reference) — it lives in
the delivery message.

## Changed files (4)

- `src/lib/data/i18n-en-apps-b.ts` — 4 new EnAppContent records
  (whatsapp-business, messenger, snapchat, discord), each with
  verifiedAtEn "2026-11-18" and a purpose-written seoDescriptionEn
  (≤160 chars). No seoTitleEn overrides.
- `src/app/(en)/en/aplikasi/page.tsx` — EN hub: "19 Android apps" in the
  metadata description; comments corrected (19 apps, other 31).
- `scripts/check-seo.mjs` — count pin 15 → 19 (same strength, exact count
  + zero orphans); 1 new pin for the 4 batch-2 records; hub-description
  pin now says 19. No other assertion touched or weakened.
- `en-coverage-matrix.md` — 19 complete / 31 untranslated; 8 of 39
  expansion apps translated; shortlist #2 done 18 Nov 2026.

## Docs in this package (3)

- `EN-APPS-WHATSAPPBUSINESS-MESSENGER-SNAPCHAT-DISCORD-2026-11-18.md` — report (§1–§6; §7 deploy record to fill after deployment).
- `EN-APPS-WHATSAPPBUSINESS-MESSENGER-SNAPCHAT-DISCORD-DEPLOY-GUIDE-2026-11-18.md` — Steps 1–5 + rollback.
- `MANIFEST-EN-APPS-WHATSAPPBUSINESS-MESSENGER-SNAPCHAT-DISCORD-2026-11-18.md` — this file.

## Verification (local, before packaging)

- tsc 0; build clean, 143 pages, BUILD_ID `E7Wtmdgww4S8uOoSRiGGw`.
- check:seo ALL PASSED (incl. new pin); check:links ALL PASSED (124 URLs,
  0 broken); check:negative OK.
- Rendered suite `/tmp/enapps2-checks.cjs`: 241/241 PASS.
- Visual suite `/tmp/enapps2-shots/shots.cjs`: 80/80 PASS; 16 screenshots
  in `~/workspace/cekapk-enapps2-screenshots/`.
- Word counts (countEnAppWords): WhatsApp Business 569, Messenger 502,
  Snapchat 515, Discord 442 — 2,028 new English words total.
