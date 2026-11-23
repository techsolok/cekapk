# ID APK Hub — Brand-swap audit & fix (Oct 21, 2026)

## Why this exists
Every deploy document (PRODUCTION-CHECKLIST §1, DEPLOY-DECISION-OCT21,
and the Oct 21 side-chat domain answer) promised the same thing:
the final brand/domain lives in ONE file — `src/lib/site.ts`
(+ `NEXT_PUBLIC_SITE_URL` in .env) — so Ahmad's domain pick would
take effect site-wide with a single edit. Ahmad asked for deploy
prep on Oct 21, so that promise was audited against the code before
he relies on it.

## What the audit found
- TRUE for the domain itself: the URL and the kontak@/dmca@ emails
  exist only in `src/lib/site.ts` (+ `.env.example`). The PWA
  manifest also reads `site.name` correctly.
- NOT true for the brand NAME in prose: "ID APK Hub" was hardcoded
  in 14 user-visible spots across 10 page files, outside site.ts:
  - SEO metadata descriptions (what Google shows): /privasi,
    /ketentuan, /dmca, /disclaimer, /tentang, /kontak, /kategori,
    /en/tools, and the English homepage title + description.
  - Visible body copy: /dmca, /disclaimer, /tentang, the English
    homepage intro paragraph, and the admin login page.
  Changing only site.ts would have shipped a mixed-brand site:
  new name in the header, old "ID APK Hub" in search snippets,
  the legal pages and the English edition.

## The fix (applied Oct 21, 2026)
All 14 spots now read the name from `site.name` (template
interpolation in metadata, `{site.name}` in body copy); the two
files that did not import it (/kategori, /admin/login) now do.
No wording changed in any language; no other content touched.

## Verification
- `grep "ID APK Hub" src/` now returns exactly ONE hit:
  `src/lib/site.ts` — the single intended place.
- `npx tsc --noEmit` passes.
- Full production build passes (115 static pages, same as Fase 5).
- Rendered HTML spot-checked (.next/server/app/tentang.html and
  en.html): the name renders from site.ts correctly.

## Harmless leftovers, deliberately untouched
- `public/sw.js` line 1: a code comment naming the service worker.
- `package.json` description field. Neither is ever shown to a
  visitor or to Google.

## What this means for the domain pick
Whichever name Ahmad picks (recommended in the side chat Oct 21:
UnduhAman), the swap is now genuinely: edit `site.name`, the two
emails and the fallback URL in `src/lib/site.ts`, set
`NEXT_PUBLIC_SITE_URL`, rebuild. Nothing else.
Deploy from `ID-APK-Hub-Fase5-BrandFix.zip` (or the project folder),
NOT the older Fase 5 ZIP, which still contains the hardcoded name.
