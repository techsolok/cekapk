# English Permission Checker + HowTo Schema + Per-Tool OG Images — 18 November 2026

**Brief:** Ahmad, 18 Nov 2026 ~17:33 PKT: "build both English permission Checker and Add How to Schema + tool OG Images".
**Scope:** workspace only. No production access, no deploy, no ZIP until his review and approval. Stop after the package and wait.
**Status:** BUILT + TESTED. Awaiting owner review and approval. NOT deployed.

## §1. What was built

### Part 1 — English Permission Checker (`/en/tools/permission-checker`)

The checker page, its results, guidance, and error messages are now fully in English. The OCR itself already read Indonesian and English (tesseract `ind+eng`); what was missing was everything around it.

**New files:**
- `src/app/(en)/en/tools/permission-checker/page.tsx` — EN page: title "App Permission Checker — Check Android App Permissions" (55 chars), description 125 chars, reciprocal hreflang (id-ID ↔ en-US, x-default → ID), `locale: "en_US"`, `ogImage: "dynamic"`. Breadcrumb + FAQPage (5 FAQs, translated from the ID page) + HowTo (4 steps) JSON-LD. "How to Use" section (4 steps) + "How to Read the Results" section (3 paragraphs, same facts as the ID page).
- `src/app/(en)/en/tools/permission-checker/PermissionCheckerEn.tsx` — EN client component, mirroring the ID component: English labels, button "Check These Permissions", summary line, risk labels high/medium/low, "Advice:" label. Posts `lang=en` to the same API. Server errors stay Indonesian, so the component maps them to English by HTTP status (SEO-17 pattern): 400 → attach-a-screenshot message, 413 → too large, 429 → too many checks, 503 → OCR unavailable, other → check failed.

**Changed files:**
- `src/lib/data/i18n-en.ts` — enTools gains `{ idSlug: "pemeriksa-izin", enPath: "/en/tools/permission-checker" }`. The EN sitemap segment maps enTools automatically, so `/en/tools/permission-checker` is now in sitemap/en.xml with no sitemap change needed. Sitemap total 115 → **116 URLs**.
- `src/lib/tools/permissions-dict.ts` — every one of the **20 entries** gains `nameEn`, `explanationEn`, `adviceEn`, written in English from the same Indonesian source facts (not machine translation). `analyzePermissionsText(rawText, lang)` returns the report in the requested language; the report's field names (`nameId`/`explanation`/`advice`) are unchanged so the API contract does not change — the fields carry the localized strings, explained in a code comment. All 5 warnings have English versions. Matching patterns are untouched (they already covered both languages).
- `src/app/(id)/api/tools/permissions/check/route.ts` — one change: reads `lang` from the form (`form?.get("lang") === "en" ? "en" : "id"`) and passes it to `analyzePermissionsText`. All error messages, rate limits, magic-byte checks, temp-file handling, and logging are untouched. The ID component is untouched.
- `src/app/(id)/tools/pemeriksa-izin/page.tsx` — hreflang via the standard `hasEnTool` pattern (same as the TikTok/Instagram ID pages), HowTo JSON-LD + a visible "Cara Menggunakan" section (4 steps, same facts as the EN steps), `ogImage: "dynamic"`.
- `src/app/(en)/en/tools/page.tsx` (EN hub) — the Permission Checker card now links to `/en/tools/permission-checker` (was `/tools/pemeriksa-izin`); the amber "Available in Indonesian only for now." note is removed; the bottom section no longer says "An English edition is not part of this phase" — it now describes the EN edition, its honest limits, and links to the Indonesian edition.

### Part 2 — HowTo schema + per-tool OG images (all 6 tool pages)

**HowTo JSON-LD** on all six tool pages, mirroring each page's visible ordered list:
- TikTok ID: 5 steps (from the "Cara Menggunakan di HP" section — now a `steps` const the list renders from, single source of truth).
- TikTok EN: 5 steps (existing array).
- Instagram ID: 6 steps (existing array).
- Instagram EN: 6 steps (existing array).
- Permission Checker ID: 4 steps (new visible section).
- Permission Checker EN: 4 steps (new visible section).
- `src/lib/seo.tsx` — `howToJsonLd` extended to accept plain-string steps as well as the guides' `{title, desc}` objects (a plain string becomes a step whose name and text are both that sentence). Guide usage is unchanged.

**Per-tool OG images** — one `opengraph-image.tsx` per tool page (6 new files), each rendering the shared `OgCard` (brand blue, 1200×630) with the page's real title and meta description, eyebrow "Tool • CekAPK". Each tool page's metadata gains `ogImage: "dynamic"` so Next uses the route's OG image instead of `og-default.jpg`. No `pageMetadata` change was needed (the "dynamic" convention already existed from SEO-14).

**check-seo.mjs — one assertion changed + 9 new pins.** The EN hub assertion (UI-04) pinned the old state: the hub linking to `/tools/pemeriksa-izin` AND containing "Indonesian only". That state cannot survive the brief itself — Ahmad asked for the English checker, so the pin had to change. The replacement pins the new state with equal strength: all three EN tool links present, no "Indonesian only" text, no embedded tool. New pins: ID checker page hasEnTool gating + en-US alternate; EN checker page reciprocal alternates + og:locale en_US; dictionary 20/20/20 English fields; API `lang=en` plumbing; EN component English strings + status mapping + `lang=en` post; HowTo on all 6 tool pages; OG dynamic on all 6 tool pages. No assertion was weakened.

## §2. What was deliberately NOT changed

- No URL, canonical, hreflang (beyond the new pair), sitemap-structure, or robots change — the enTools mapping already feeds the sitemap.
- No API behaviour change for Indonesian requests: same endpoint, same rate limits, same error strings, same report shape. The ID component file is byte-identical to the live build.
- No AnalyticsConsent/SiteChrome/GA4 change. No dependency change. No DB/auth change.
- No byline on tool pages (tool pages are not articles — same rule as the author/byline build).
- Instagram component unification was NOT done (separate EN component pattern kept, per UI-04).

## §3. Verification (all local, port 3100)

- **tsc:** 0 errors. (One fix during testing: `form` possibly null in the API route — `form?.get`.)
- **Build:** clean, **135 pages** (was 128: +1 EN checker page + 6 OG routes). BUILD_ID `OiVegd-iPF8tEn8yEaG4e`.
- **check:seo:** ALL PASSED (after fixing one pin regex — my own check, not the code: the regex expected `lang === "en"` but the code reads `get("lang") === "en"`).
- **check:links:** ALL PASSED. **check:negative:** OK.
- **Dictionary unit test** (`/tmp/dict-test.ts`): 20 entries; the same OCR text in English and Indonesian matches the same 6 permissions with the same counts and 3 warnings each, in each language.
- **Rendered suite 46/46 PASS** (`/tmp/checker-checks.cjs`): EN checker page (H1, English label/button, 4 steps, How to Read the Results, 5 FAQs, FAQPage + HowTo JSON-LD, reciprocal hreflang, dynamic OG, no Indonesian strings); ID checker page (hreflang, HowTo 4 steps, Cara Menggunakan, dynamic OG, FAQPage still 5); EN hub (card → EN page, no "Indonesian only" anywhere, old "not part of this phase" gone); all 4 TikTok/Instagram pages (HowTo 5/5/6/6 steps, dynamic OG); sitemap EN entry + total 116 URLs; 3 sampled OG images served as PNG 1200×630 (148–159 KB).
- **API end-to-end** (real image + real tesseract on the local server): the same screenshot posted with `lang=en` returned 5 permissions with English names and the English SMS warning (4 high / 1 low, 3 warnings); the same image without `lang` returned the same 5 permissions in Indonesian with the Indonesian warning and identical counts. The first small-font test image only matched 2/5 — a test-image legibility artifact (tiny bitmap font OCRs poorly), not a code issue; the large-font retest matched 5/5.
- **Visual suite 20/20 PASS** (`/tmp/checker-shots/shots.cjs`; 16 screenshots in `~/workspace/cekapk-checker-screenshots/`): EN checker, EN hub, ID TikTok, ID checker × 1440/390 × light/dark — **0px horizontal overflow everywhere**; EN checker label contrast 15.41:1 light / 11.74:1 dark, submit button 5.41:1 both — all ≥ 4.5:1.

## §4. Honest notes

1. **ID TikTok steps lost 4 bold words.** Extracting the "Cara Menggunakan di HP" list into a `steps` const (so the visible list and the HowTo schema share one source) dropped the `<strong>` emphasis on "Bagikan", "Salin Tautan", "Tempel", and "Ambil Video". The words, order, and meaning are identical — only the bold is gone. Disclosed, not hidden.
2. **OG-image URLs will appear in GSC's "Crawled - currently not indexed" list**, like the existing 43 app/guide OG URLs — harmless noise, already documented in the GSC plan. Six new ones per deploy is expected.
3. **The EN checker page is not in the GSC indexing plan** (the plan was written before it existed). It should be requested once live — it is a new page, not a re-request. Suggested: add it to Day 2's batch tomorrow (Picsart first, then Day 2 as planned, plus this one if quota allows — it would be the 11th, so it may need to wait for Day 3).

## §5. Files in this package (19)

1. `src/lib/data/i18n-en.ts`
2. `src/lib/tools/permissions-dict.ts`
3. `src/app/(id)/api/tools/permissions/check/route.ts`
4. `src/app/(en)/en/tools/permission-checker/page.tsx` (new)
5. `src/app/(en)/en/tools/permission-checker/PermissionCheckerEn.tsx` (new)
6. `src/app/(id)/tools/pemeriksa-izin/page.tsx`
7. `src/app/(en)/en/tools/page.tsx`
8. `src/lib/seo.tsx`
9. `src/app/(id)/tools/pengunduh-tiktok/page.tsx`
10. `src/app/(en)/en/tools/tiktok-downloader/page.tsx`
11. `src/app/(id)/tools/pengunduh-instagram/page.tsx`
12. `src/app/(en)/en/tools/instagram-downloader/page.tsx`
13. `src/app/(id)/tools/pengunduh-tiktok/opengraph-image.tsx` (new)
14. `src/app/(id)/tools/pengunduh-instagram/opengraph-image.tsx` (new)
15. `src/app/(id)/tools/pemeriksa-izin/opengraph-image.tsx` (new)
16. `src/app/(en)/en/tools/tiktok-downloader/opengraph-image.tsx` (new)
17. `src/app/(en)/en/tools/instagram-downloader/opengraph-image.tsx` (new)
18. `src/app/(en)/en/tools/permission-checker/opengraph-image.tsx` (new)
19. `scripts/check-seo.mjs`

## §6. Staging grep expectations (verified from the workspace before packaging)

Run in `/root/cekapk-new` after unzipping. Each must print the number shown:
- `grep -c 'pemeriksa-izin", enPath: "/en/tools/permission-checker"' src/lib/data/i18n-en.ts` → **1**
- `grep -c 'nameEn: "' src/lib/tools/permissions-dict.ts` → **20**
- `grep -c 'explanationEn: "' src/lib/tools/permissions-dict.ts` → **20**
- `grep -c 'adviceEn: "' src/lib/tools/permissions-dict.ts` → **20**
- `grep -c 'get("lang") === "en"' "src/app/(id)/api/tools/permissions/check/route.ts"` → **1**
- `grep -c 'analyzePermissionsText(ocr.text, lang)' "src/app/(id)/api/tools/permissions/check/route.ts"` → **1**
- `grep -rl 'howToJsonLd(' "src/app/(id)/tools" "src/app/(en)/en/tools" | wc -l` → **6**
- `grep -rl 'ogImage: "dynamic"' "src/app/(id)/tools" "src/app/(en)/en/tools" | wc -l` → **6**
- `find "src/app/(id)/tools" "src/app/(en)/en/tools" -name "opengraph-image.tsx" | wc -l` → **6**
- `grep -c '"/en/tools/permission-checker"' "src/app/(en)/en/tools/page.tsx"` → **1**
- `grep -c 'Indonesian only' "src/app/(en)/en/tools/page.tsx"` → **0** (grep exits 1 — expected)
- `grep -c 'EN checker Nov 2026' scripts/check-seo.mjs` → **7**
- `grep -c 'HowTo + OG Nov 2026' scripts/check-seo.mjs` → **2**

## §7. Test suites (recreate if /tmp was cleaned)

- `/tmp/checker-checks.cjs` — 46-check rendered suite (local server, port 3100).
- `/tmp/checker-shots/shots.cjs` — visual suite (playwright-core 1.49.1 in /tmp/checker-shots; chromium-1243). Screenshots in `~/workspace/cekapk-checker-screenshots/` (16 PNGs).
- `/tmp/dict-test.ts` — dictionary unit test (run with `npx tsx`).
- Test images `/tmp/perm-test.png` (small font, 2/5 match — legibility artifact) and `/tmp/perm-test2.png` (large font, 5/5 match).

## §8. Deploy record

_To be filled after deployment._
