# EN Homepage — Permission Checker Card Fix — 2026-11-18

## §1. What changed (1 line of content + 1 new check:seo pin)

The English homepage (`/en`) "Free Tools" section carried a stale Permission
Checker card left over from before the EN checker deploy (Nov 18, 2026):
it said the tool "Runs in Indonesian for now." and linked to the Indonesian
page `/tools/pemeriksa-izin`, even though the English tool page
`/en/tools/permission-checker` has been live since ~18:06 PKT the same day.

**File 1 — `src/app/(en)/en/page.tsx:122` (the only change to site content):**

- Before: `desc="Upload a screenshot of an app's permission list; the tool explains each risk. Runs in Indonesian for now." href="/tools/pemeriksa-izin"`
- After: `desc="Upload a screenshot of an app's permission list; the tool explains each risk." href="/en/tools/permission-checker"`

The other two cards (TikTok, Instagram) already linked to their EN pages;
the Indonesian homepage card is untouched (it correctly links to the ID
checker). No other occurrence of "Runs in Indonesian for now" exists
anywhere in `src/` (verified by grep).

**File 2 — `scripts/check-seo.mjs` (1 new pin, NO assertion changed or
weakened):**

- New pin: `EN homepage: Permission Checker card links to the English tool
  page, no 'Indonesian for now' (EN checker card fix Nov 2026)` — it reads
  the already-declared `enHome` variable (the SEO-16 homepage read) and
  asserts the card href is `/en/tools/permission-checker` and the stale
  phrase is absent. Placed directly after the existing EN-homepage coverage
  pin.
- Honest note: the first attempt declared a second `const enHome` and
  `check:seo` crashed with `SyntaxError: Identifier 'enHome' has already
  been declared`. Fixed by reusing the existing declaration; no file other
  than check-seo.mjs was touched to fix it.

## §2. Verification (all local, all pass)

- **tsc:** 0 errors.
- **Build:** clean, 139 pages (unchanged page count — a homepage copy/link
  change adds no routes), BUILD_ID `gPDcJxyV81Sl6m6A61Doi`.
- **check:seo:** ALL PASSED (including the new pin).
- **check:links:** ALL PASSED (120 sitemap URLs, 0 broken).
- **check:negative:** OK.
- **Rendered (prerendered `.next/server/app/en.html`):** the card renders
  `href="/en/tools/permission-checker"`; the string "Runs in Indonesian for
  now" occurs **0** times in the rendered homepage.

## §3. Staging grep expectations (verified from the workspace, in order)

1. `"/en/tools/permission-checker"` in `src/app/(en)/en/page.tsx` → **1**
2. `Runs in Indonesian for now` in `src/app/(en)/en/page.tsx` → **0**
   (grep exits 1 — expected)
3. `EN checker card fix Nov 2026` in `scripts/check-seo.mjs` → **1**

## §4. Package

- `CekAPK-EN-Checker-Card-Fix-2026-11-18.zip` — 5 entries (2 changed
  files + this report + deploy guide + manifest). SHA-256 and byte size
  are in the delivery message (the manifest cannot contain the ZIP's own
  SHA — self-reference).
- Clean-extraction byte-compare: all changed files byte-identical to the
  workspace.

## §5. Deploy guide

See `EN-CHECKER-CARD-FIX-DEPLOY-GUIDE-2026-11-18.md` (Steps 1–5, same
safe-deploy format as the EN checker deploy; rollback = `/root/cekapk-old`).

## §6. Deploy record

_To be filled after deployment._
