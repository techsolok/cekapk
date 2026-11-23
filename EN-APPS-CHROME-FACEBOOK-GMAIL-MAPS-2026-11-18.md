# EN App Pages — Google Chrome, Facebook, Gmail, Google Maps (18 Nov 2026)

## §1. What changed

Four new English app pages, the priority shortlist #1 from `en-coverage-matrix.md`. English coverage goes from 11 to **15 apps** (35 of 50 apps remain Indonesian-only). Every record is original editorial English written from the verified Indonesian source facts — not machine translation, not copied Indonesian text. Play facts re-verified against the live Play Store on 18 Nov 2026 (see §3).

### Per-app content (all in `src/lib/data/i18n-en-apps-b.ts`, appended to `enAppsB`)

| App | Slug | Words | seoDescriptionEn (chars) | verifiedAtEn |
|---|---|---|---|---|
| Google Chrome | `google-chrome` | 699 | 131 | 2026-11-18 |
| Facebook | `facebook` | 567 | 126 | 2026-11-18 |
| Gmail | `gmail` | 614 | 134 | 2026-11-18 |
| Google Maps | `google-maps` | 582 | 135 | 2026-11-18 |

Total new English words: **2,462**. Each record has: taglineEn, 2 intro paragraphs, 2 "what it does" paragraphs, 2 safety paragraphs, 3–4 "good for", 3–4 "watch out for", 3 FAQs, purpose-written seoDescriptionEn (≤160 chars), verifiedAtEn "2026-11-18". No seoTitleEn overrides — the template title (`{name} for Android - Safety, Permissions & Official Download`) is accurate for all four (all are Play Store apps with an official download).

Content notes per app:
- **Chrome**: sync via Google account, password manager with leak check, built-in translation, Incognito limits (not anonymous), site-notification abuse, "update only via Play Store" (fake "Chrome outdated" warnings = malware). FAQs: Incognito, how to update Chrome, notification ads.
- **Facebook**: Feed/Stories, Groups, Marketplace, Pages for business; privacy settings + Marketplace scam rules; confirm developer Meta Platforms, Inc. FAQs: Marketplace scams, is it free, locking down privacy. Alternatives link to Instagram, TikTok, WhatsApp (all have EN editions).
- **Gmail**: email as the recovery key for almost every account; inbox categories, search, spam/phishing filtering, Confidential mode, Drive attachments; phishing checks + 2FA + forwarding-rule audit. FAQs: spotting phishing, full-storage consequences, is it free.
- **Google Maps**: turn-by-turn navigation, live traffic, place info/reviews, offline maps, live location sharing, public transport; location-sharing safety rules; dishonest reviews. FAQs: sharing location safely, offline use, is it free. Alternatives link to Google Chrome (EN, new) and Grab/Gojek (ID pages).

### Template & plumbing changes (no other app, guide, tool, ID page, API, DB, or auth touched)

1. **`src/lib/data/i18n-en-types.ts`** — added optional `verifiedAtEn?: string` to `EnAppContent` (mirrors the existing `EnGuideContent` field). Comment states: never copy the Indonesian verifiedAt here.
2. **`src/app/(en)/en/aplikasi/[slug]/page.tsx`** — the EN app template now computes `const checkedAt = en.verifiedAtEn ?? base.verifiedAt` (in both `generateMetadata` and the page component) and uses it for the header date line, the FactBox "Last checked" row, the changelog paragraph, the trust section, and the metadata description fallback. **The 11 existing EN app pages render byte-identically** (they carry no `verifiedAtEn`, so `checkedAt` falls back to their Indonesian verifiedAt) — verified by the rendered suite (§2).
3. **`src/app/sitemap.ts`** — the EN segment now passes `a.verifiedAtEn` as lastmod for EN apps (mirrors the Phase E guide change). The 4 new pages get lastmod 2026-11-18; the 11 older apps keep no lastmod (unchanged).
4. **`src/app/(en)/en/page.tsx`** — "Recently Verified" now sorts by the English edition's check date (`a.verifiedAtEn ?? base.verifiedAt`), so the 4 new apps correctly sort first with "Checked Nov 18, 2026". The stale comment ("the 11 English app guides") is corrected. Hero stat and section title are dynamic (`enApps.length`) — they now show 15 automatically.
5. **`src/app/(en)/en/aplikasi/page.tsx`** (EN hub) — metadata description "11 Android apps" → "15 Android apps"; stale comments corrected ("The 11 apps" → "The 15 apps"; "other 39" → "other 35"). Search, filtering, and canonical are untouched; the 4 new apps are searchable (`?q=chrome` → 1 app, `?q=maps` → 1 app).
6. **`scripts/check-seo.mjs`** — **one assertion changed, explained in §3**: the EN-app count pin `=== 11` → `=== 15` (same strength: exact count + zero orphans). The coverage comment is corrected (15 apps + 6 guides + 3 tools). **Four new pins added** (strengthening, not weakening): each new record carries verifiedAtEn 2026-11-18; the template displays verifiedAtEn when present; the sitemap uses `a.verifiedAtEn`; the hub description says 15 apps.
7. **`en-coverage-matrix.md`** — the project's coverage source of truth updated: 15 apps complete / 35 untranslated; shortlist #1 marked done 18 Nov 2026; Tools row corrected to 3 complete (the Permission Checker, live since today's earlier deploy, was still listed as untranslated).

### What happens automatically (no code change needed)
- The 4 new pages get static routes via `generateStaticParams` (build: 135 → **139 pages**), dynamic OG images via the existing `[slug]/opengraph-image.tsx`, reciprocal hreflang via the existing `hasEnApp` gating, and ID pages gain the en-US alternate automatically.
- Related Apps are template-computed: Chrome/Maps/Gmail fall back to the first 4 EN apps (TikTok, CapCut, WhatsApp, Instagram); Facebook's same-category set is WhatsApp, Instagram, Telegram. WhatsApp/Instagram/Telegram pages gain Facebook in their same-category related list — the template's designed behaviour, not a data change.
- Sitemap total: 116 → **120 URLs**.

## §2. Verification results (all local, all must-pass)

- **tsc**: 0 errors.
- **Build**: clean, **139 pages**, BUILD_ID `YgsRhUqYtdv1bftKsmW0Y`.
- **check:seo**: ALL PASSED (including the 4 new pins).
- **check:links**: 120 sitemap URLs / 164 checked / **0 broken / 0 orphans / 0 missing canonical / 0 missing alt**.
- **check:negative**: OK.
- **Rendered suite** (`/tmp/enapps-checks.cjs`): **297/297 PASS**. Per app: exact title + meta description, header date "Nov 18, 2026", Indonesian verifiedAt 2026-10-20 nowhere on the page, TOC (9 items) + all 9 sections, FactBox fully English (category, price, min Android, languages, version note, Last checked 2026-11-18), no Indonesian content strings, BreadcrumbList + FAQPage + SoftwareApplication JSON-LD, reciprocal hreflang, dynamic OG image (fetched, 200), changelog + trust sections show 2026-11-18 / Nov 18, 2026, every internal app/guide link on the page returns 200, official Play details URL present, no Play search URL. Regression: TikTok, Bstation, WhatsApp still show "Oct 18, 2026" with no Nov 18 date leaked in. Hub: 15 distinct app links; `?q=chrome` and `?q=maps` each return 1 app. Homepage: stat shows 15; Recently Verified shows "Checked Nov 18, 2026". Sitemap/en.xml: 4 new entries with lastmod 2026-11-18; TikTok entry still has no lastmod. ID pages for the 4 apps carry the en-US alternate.
- **Visual suite** (`/tmp/enapps-shots/shots.cjs`, playwright-core): **96/96 PASS** — 4 apps × 1440/390 × light/dark: 0px horizontal overflow everywhere; header date-line contrast ≥ 4.5:1; FactBox "Last checked" value contrast ≥ 4.5:1 and value exactly 2026-11-18. 16 screenshots in `~/workspace/cekapk-enapps-screenshots/`. One mobile screenshot was eyeballed: clean layout, correct dates, correct FactBox; the consent banner appears mid-page in the fullPage capture only (a known fullPage-capture artefact, same as Phase D — not a defect).

## §3. Honest notes / limitations

- **One check:seo assertion changed (count pin, not weakened):** `enAppSlugs.length === 11` → `=== 15`. It still pins the exact count and zero orphans; the number had to move because the brief itself adds 4 apps. Four new pins were added alongside it.
- **Play verification, 18 Nov 2026:** Facebook confirmed by direct Play page read (Price 0 USD). Chrome, Gmail, Maps confirmed via Play search crawls (Google LLC as publisher; Price 0 USD; package IDs com.android.chrome / com.google.android.gm / com.google.android.apps.maps). Chrome's direct Play fetch returned HTTP 403 (fetch denial, not evidence against the listing) and was **not** retried, per the recovery rule. Ratings, download counts, versions, and sizes seen in search results were **not** printed anywhere, per site rule.
- **No "100% safe" string anywhere** (grep 0; check:seo also enforces it).
- **Dropped / not included:** no version numbers, ratings, prices beyond "Free" (+ the ID price labels, already mapped), or download counts. The Play listing's "250 million businesses" (Maps) and similar marketing figures were deliberately not used — they change and the site's convention is to avoid numbers that go stale. Chrome's extra ID FAQ ("How do I update Google Chrome?") is included in the EN FAQs; the ID pages' 7-FAQ set is otherwise condensed to 3 EN FAQs per app, matching the existing EN app pattern.
- **Out of scope, noticed while working (not changed):** the EN homepage ToolCard for the Permission Checker still says "Runs in Indonesian for now." and links to the Indonesian page — stale since today's EN checker deploy. That is a one-line fix in `src/app/(en)/en/page.tsx`, left for a separate call because this brief covers the 4 app pages only.
- **Test-script bugs (site correct throughout):** first rendered run failed 8 checks — (a) my title check expected a raw `&` but the HTML escapes it to `&amp;` (same on existing pages); (b) my OG check fetched the bare `/opengraph-image` route, which 404s — the real OG URL is the hashed-filename form in the page's og:image tag. Script fixed, re-run 297/297. The visual suite's first design also measured a label against a transparent background in an early draft; the final script walks up to the first non-transparent background (checker-shots pattern).

## §4. Staging grep expectations (computed FROM the workspace — verify in Step 3)

Run in `/root/cekapk-new` after unzipping. Expected, in order:

| # | Command | Expected |
|---|---|---|
| 1 | `grep -c 'verifiedAtEn: "2026-11-18"' src/lib/data/i18n-en-apps-b.ts` | **9** (5 Phase E guides + 4 new apps) |
| 2 | `grep -c 'verifiedAtEn?: string' src/lib/data/i18n-en-types.ts` | **2** (EnAppContent + EnGuideContent) |
| 3 | `grep -c 'checkedAt' "src/app/(en)/en/aplikasi/[slug]/page.tsx"` | **8** |
| 4 | `grep -c 'a.verifiedAtEn' src/app/sitemap.ts` | **1** |
| 5 | `grep -c 'a.verifiedAtEn' "src/app/(en)/en/page.tsx"` | **1** |
| 6 | `grep -c 'English guides for 15 Android apps' "src/app/(en)/en/aplikasi/page.tsx"` | **1** |
| 7 | `grep -c 'enAppSlugs.length === 15' scripts/check-seo.mjs` | **1** |
| 8 | `grep -c 'EN apps Nov 2026' scripts/check-seo.mjs` | **2** (comment + pin) |
| 9 | `grep -c 'slug: "google-chrome"' src/lib/data/i18n-en-apps-b.ts` | **1** |
| 10 | `grep -c 'slug: "facebook"' src/lib/data/i18n-en-apps-b.ts` | **1** |
| 11 | `grep -c 'slug: "gmail"' src/lib/data/i18n-en-apps-b.ts` | **1** |
| 12 | `grep -c 'slug: "google-maps"' src/lib/data/i18n-en-apps-b.ts` | **1** |

## §5. Package

- **ZIP:** `CekAPK-EN-Apps-Chrome-Facebook-Gmail-Maps-2026-11-18.zip`
- **SHA-256:** in the delivery message and in MEMORY.md (a file inside the ZIP cannot contain the ZIP's own hash — self-reference).
- **Size / entries:** 11 entries (byte size in the delivery message).
- **Contents:** 8 changed source/doc files + report + deploy guide + manifest (11 entries). Clean-extraction byte-compare: every source file byte-identical to the workspace (verified before delivery).

## §6. Deploy guide

See `EN-APPS-CHROME-FACEBOOK-GMAIL-MAPS-DEPLOY-GUIDE-2026-11-18.md` in this ZIP (Steps 1–5, same safe-deploy format as the EN checker deploy; rollback = `/root/cekapk-old`).

## §7. Deploy record

_To be filled after deployment._
