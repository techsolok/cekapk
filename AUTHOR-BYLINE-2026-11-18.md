# Author / Byline (Audit H1) — CekAPK — 2026-11-18

**Status: BUILT + TESTED, workspace only. NOT deployed. Awaiting Ahmad's approval.**

## §1. What Ahmad decided (2026-11-18, 13:55 PKT)

- **Author name: Ahmad Raza.**
- **Photo:** the portrait he sent in chat (PNG 363×363, 129,965 bytes).
- The bio is a **draft** written from facts (he founded and runs CekAPK) — he can correct it any time. No other fact was invented.

## §2. What was built

Exactly **9 files** changed/added (8 code + 1 asset):

| # | File | Change |
|---|------|--------|
| 1 | `src/lib/data/author.ts` (NEW) | Single source of truth: name, photo path, role (ID/EN), bio (ID/EN, draft), profile paths, Person JSON-LD node. |
| 2 | `public/images/author-ahmad-raza.png` (NEW) | His portrait, copied unchanged from the chat upload. Served at `/images/author-ahmad-raza.png`. |
| 3 | `src/components/ui.tsx` | NEW `AuthorByline` component (photo via next/image, 48px round; name linked to the profile page; role; date line). The date-line wording is byte-identical to before ("Terakhir dicek: … - Panduan Bahasa Indonesia" / "Last checked: … — English edition"). |
| 4 | `src/lib/seo.tsx` | `articleJsonLd` author changed from `{ "@id": site.url + "/#org" }` (the Organization) to the **Person** node (name, url → /tentang, image, jobTitle). Publisher stays the Organization. |
| 5 | `src/app/(id)/panduan/[slug]/page.tsx` | Header date line replaced by `<AuthorByline date={g.verifiedAt} lang="id" />`. |
| 6 | `src/app/(en)/en/panduan/[slug]/page.tsx` | Header date line replaced by `<AuthorByline date={en.verifiedAtEn} lang="en" />` (still only when `verifiedAtEn` exists — all 6 EN guides have one). |
| 7 | `src/app/(id)/tentang/page.tsx` | NEW "Tentang Penulis" section at the end (96px photo + name + role + bio). Date line updated 18 Oktober 2026 → **18 November 2026** (the page changed today; honest date). |
| 8 | `src/app/(en)/en/about/page.tsx` | NEW "About the Author" section (same). Date line updated 7 November 2026 → **18 November 2026**. |
| 9 | `scripts/check-links.mjs` | One-line fix (see §3) — a checker bug, not a site change. |

**Scope kept:** bylines on guide pages only (the articles). App pages are not articles — no byline there (verified). No URL, metadata, canonical, hreflang, sitemap, or JSON-LD-shape changes beyond the author node. No AnalyticsConsent/SiteChrome, API, DB, auth, or dependency changes. No check:seo assertion was changed or weakened.

## §3. The check-links fix (checker bug, found by testing)

The first `check:links` run after the build reported **2 broken links**: the two `/_next/image?url=…&w=…&q=…` optimizer URLs, HTTP 400. The links are **not** broken:

- Direct curl of the real URLs returns **200** (direct PNG, optimizer w=96, optimizer w=256).
- Root cause: `extractLinks` in `scripts/check-links.mjs` takes raw attribute values from the HTML regex and requests them literally. In raw HTML the `&` in a `src` is escaped as `&amp;`, so the checker requested `…&amp;w=96&amp;q=75` — the optimizer sees mangled parameters and answers 400. Browsers decode `&amp;` before requesting, so real users get 200. This is the project's **first** next/image usage, which is why it never failed before.
- Fix (one line in `extractLinks`): decode `&amp;` → `&` before requesting, i.e. test what a browser actually requests. Re-run: **0 broken**. The fix is general — it also covers any future URL carrying `&`.

## §4. Verification (all local)

- **tsc:** 0 errors.
- **Build:** clean, 128 pages (BUILD_ID `ZEiGAYavNClHlgAEhpdqK`).
- **check:seo:** ALL PASSED (no assertion changed).
- **check:links:** 115 sitemap URLs / 158 checked / **0 broken** / 0 orphans / 0 missing canonical / 0 missing alt (after the §3 fix).
- **check:negative:** OK.
- **Rendered suite 36/36 PASS** (`/tmp/author-checks.cjs`, local server port 3100): byline on ID + EN hijau guides and both APKPure guides (name, role, date kept, photo img, profile link); Article JSON-LD author is Person Ahmad Raza with image URL on both editions; publisher still the Organization; /tentang + /en/about author sections + new dates; app page has NO byline; photo PNG + both optimizer sizes 200.
- **Visual suite 80/80 PASS** (`/tmp/author-shots/shots.cjs`; screenshots in `~/workspace/cekapk-author-screenshots/`, 16 PNGs): 4 pages (ID guide, EN guide, /tentang, /en/about) × 1440/390 × light/dark — **0px horizontal overflow everywhere**; byline text contrast ≥ 4.5:1 on every line; photo loads on every page/theme/width. Two screenshots inspected by eye (ID guide 1440 light; EN guide 390 dark) — clean.
- **Honest test notes (my own script bugs, code unchanged):** the first visual run failed 32 checks — my selector matched the site navigation `<header>` (which also has a `div.flex`) instead of the guide header, because I forgot the nav header exists. The second run failed 6 — the EN guide template has **no `<article>` wrapper** (its root is a `<div>`, a pre-existing structural difference from the ID template), and the About photo is lazy-loaded so it read as unloaded at 390px before scrolling. Script corrected (anchor the selector on the author photo itself; scroll it into view first) and re-run to 80/80. The site was correct throughout; only my check scripts were wrong.

## §5. What Ahmad can correct

- **Bio (draft):** ID — "Ahmad Raza adalah pendiri CekAPK. Ia memeriksa aplikasi Android dan menulis panduan keamanan agar pengguna Indonesia bisa memasang aplikasi dengan aman — tanpa tombol unduh palsu dan tanpa klaim yang tidak bisa diverifikasi." EN — "Ahmad Raza is the founder of CekAPK. He checks Android apps and writes safety guides so Indonesian users can install apps safely — without fake download buttons and without claims that cannot be verified." If he wants different wording, one line changes in `author.ts` and it flows to both About pages.
- **Role wording:** "Pendiri & Editor CekAPK" / "Founder & Editor, CekAPK" — same one-line change.
- **Photo:** replace `public/images/author-ahmad-raza.png` with any square portrait; the byline and About sections pick it up automatically.

## §6. Package

`CekAPK-Author-Byline-2026-11-18.zip` — 12 entries (9 changed files + this report + deploy guide + manifest). SHA-256 in the delivery message and MEMORY.md. Clean-extraction byte-compare 9/9 identical.

## §7. Staging grep expectations (for the deploy guide)

Each count verified against the workspace before packaging:

| Check | Expected |
|---|---|
| `AuthorByline` in `src/components/ui.tsx` | 1 (definition) |
| `author.personJsonLd` in `src/lib/seo.tsx` | 1 |
| `AuthorByline` in `src/app/(id)/panduan/[slug]/page.tsx` | 2 (import + usage) |
| `AuthorByline` in `src/app/(en)/en/panduan/[slug]/page.tsx` | 2 (import + usage) |
| `Tentang Penulis` in `src/app/(id)/tentang/page.tsx` | 1 |
| `About the Author` in `src/app/(en)/en/about/page.tsx` | 1 |
| `&amp;` decode line in `scripts/check-links.mjs` | 1 |
| `public/images/author-ahmad-raza.png` exists | yes (129,965 bytes) |
