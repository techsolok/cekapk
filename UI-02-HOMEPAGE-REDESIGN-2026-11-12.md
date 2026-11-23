# CekAPK — Phase B, UI-02: Homepage Redesign — 12 November 2026

Status: PROPOSAL + IMPLEMENTATION (workspace only). NOT deployed. No production ZIP until Ahmad approves.

## 1. Inspection findings (current homepage, verified 12 Nov 2026)

**ID homepage** `src/app/(id)/page.tsx` (109 lines):
- Metadata is exact and must not move: title `Info Aplikasi Android, Cek Keamanan APK & Tools | CekAPK` (absolute), description from `site`, canonical + `id-ID`/`en-US`/`x-default` alternates, OG/Twitter, Organization + FAQ JSON-LD (3 FAQs).
- H1 (must stay identical): "Temukan aplikasi Android, dengan aman." (28px, sm:text-4xl).
- Sections today: centred hero (H1 + subtext + SearchBox + TikTok CTA button with 🎵 emoji) → "Sedang Banyak Dicari" horizontal scroller (9 apps, w-56 cards) → "Kategori Aplikasi" 2-col grid (emoji icons) → "Baru Diperbarui" (pillarApps.slice(0,12) in DATA order, not sorted — UI-01 F5) → "Panduan Keamanan Terbaru" (6 guides) → verification 4 steps (bg-primary-soft panel) → FAQ accordion.
- Shared chrome (NOT touched in this task): SiteChrome main `max-w-5xl px-4`, Header (h-14, ⬇ emoji logo, "Cari" pill links to /aplikasi, not a search), Footer (3-col), BottomNav (4 emoji items), SearchBox (Meilisearch via /api/search, keyboard-navigable combobox), ui.tsx AppCard (📱 emoji tile — used by app detail pages via RelatedApps, so it stays untouched).
- Data (verified by script, not assumed): 50 apps; categories sosial 8, video-foto 10, musik 1, game 6, produktivitas 5, pendidikan 3, keuangan 3, kesehatan 0, utilitas 8, anime-hiburan-legal 6. verifiedAt has only two values: 2026-10-18 (11 pillar apps) and 2026-10-20 (39 apps). legalStatus is only `play_store` (49) and `info_only` (Kucing APK only). 3 tools: TikTok, Instagram, Permission Checker.
- check:seo has NO content assertion on the ID homepage. It DOES assert the EN homepage contains the exact string "full catalog of 50 apps lives in the Indonesian edition" — that sentence must survive the EN rewrite verbatim.

**EN homepage** `src/app/(en)/en/page.tsx` (54 lines): no search, H1 "Know an app before you install it.", EN app guides (enApps) + EN safety guides (enGuides) + tools panel + closing note. Its metadata (pageMetadata, /en path, en_US locale) must not move.

**Tokens (Phase A, unchanged):** ink/paper/mist/border/secondary/muted/success/warn/danger (CSS vars, flip in dark), primary #1565D8 + primary-dark/soft (flip), brand scale 50–900 (static), linkblue kept. Font Plus Jakarta Sans 400/600/700/800.

## 2. Proposal

Follows the UI-01 §3 homepage blueprint, adapted to the brief's hard limits (homepage only; shared Header/Footer/BottomNav/SiteChrome and ui.tsx stay untouched; footer strength comes from a homepage closing CTA, not a Footer rewrite).

**New file** `src/components/home.tsx` — homepage-local shared components for ID + EN:
- `Icon` set: small inline stroke SVGs (shield-check, download, grid, wrench, book, check, arrow-right, lock) — `aria-hidden`, `stroke="currentColor"`. No emoji in new UI (the only emoji left on the homepage will be none — trending/category/app tiles become initial-letter tiles; the old 🎵 CTA button goes).
- `HomeAppCard`: initial-letter tile (deterministic 5-tint rotation from brand tokens, letter = first char of name), name, tagline or developer, optional check date + TrustBadge (reuses ui.tsx TrustBadge, untouched).
- `SectionHeading`: eyebrow kicker (text-xs bold uppercase, text-primary-dark) + H2 text-2xl + optional "Lihat semua →" link.
- `CategoryCard`: letter tile + name + blurb + real count ("8 aplikasi", "0 aplikasi" for kesehatan — honest, its blurb already says no apps yet).
- `ToolCard`: SVG icon + title + short desc + "Buka Tool →".
- `VerifySteps`: numbered 01–04 cards with the existing step wording.
- `TrustStrip`: 3 value props (Sumber resmi dulu / Tanpa login / Tanpa simpan file) with SVG icons.
- `ClosingCta`: navy panel with two buttons (/aplikasi, /keamanan).

**ID homepage structure** (same metadata, same 3 FAQs + JSON-LD, same H1 text, same trending slugs, same guides):
1. Hero: rounded-3xl navy panel (new static `navy: #0B1F3A` in tailwind.config — additive, one line, fixed in both themes) → white H1 (32px/40px) + supporting text + SearchBox (unchanged component) + quick chips (TikTok, WhatsApp, DANA, Roblox → real app pages) + stat row: 50 Aplikasi · 10 Kategori · 3 Tool Gratis · 0 APK Bajakan (all provable from data).
2. Trust/value strip (3 items, from real behaviour).
3. "Sedang Banyak Dicari di Indonesia" — same 9 apps, GRID sm:grid-cols-3 instead of the horizontal scroller.
4. "Kategori Aplikasi" — same 10 categories, grid with real counts.
5. "Tool Gratis" (NEW) — 3 tools from /tools copy.
6. "Terbaru diperiksa" — pillarApps sorted by verifiedAt desc, then name asc (real sort; 39 apps at 20 Okt 2026, 11 at 18 Okt 2026), top 12, each card shows "Dicek 20 Okt 2026" + TrustBadge.
7. "Cara kami mengecek keamanan APK" — same 4 steps, numbered cards, link to /keamanan.
8. "Panduan Keamanan Terbaru" — same 6 guides.
9. FAQ — same 3 FAQs, same FaqAccordion, same JSON-LD.
10. Closing CTA panel (footer itself untouched).

**EN homepage** (same metadata, same H1, same check:seo sentence kept verbatim): mirrors the ID structure from the same components — navy hero (no SearchBox: the index is Indonesian; EN search would return ID results), chips to EN app guides, stat row from real EN counts (enApps/enGuides/tools), EN app guides grid, EN safety guides, tools (TikTok EN + Instagram EN + permission checker note), verification steps in English, short EN FAQ (facts already on the site, no new JSON-LD), closing CTA. "Recently verified" reuses pillarApps filtered to hasEnApp, sorted by verifiedAt desc, with the check date.

**What is NOT changing:** URLs, routing, metadata, canonical, hreflang, JSON-LD, sitemap, SSR, SearchBox behaviour, GA4 consent (AnalyticsConsent untouched), legal pages, app detail pages, tools pages, data files, check scripts, env. No new dependencies. No animations (reduced-motion safe by construction); hover states are colour-only.

**Risks:** low (SEO — metadata/JSON-LD/H1 byte-identical; functionality — SearchBox untouched; i18n — EN strings mirror ID facts). Known honest limits: all 50 apps share two check dates, so "Terbaru diperiksa" shows only two distinct dates; kesehatan shows "0 aplikasi" (true); letter tiles are not real app icons (real icons are copyrighted — never used).

## 3. Implementation record (12 Nov 2026, workspace only)

**Changed files (4):**
1. `src/components/home.tsx` (NEW, ~290 lines) — homepage-local shared components for ID + EN: inline SVG `Icon` set (shield/download/camera/grid/wrench/book/arrow/userx/eyeoff/check, no emoji), `LetterTile` (initial-letter tiles, deterministic 5-tint rotation from brand tokens), `HeroPanel` (navy panel), `HeroStats`, `ChipRow`, `SectionHeading`, `HomeAppCard`, `CategoryCard`, `ToolCard`, `TrustStrip`, `VerifySteps`, `ClosingCta`, plus `sortByVerifiedDesc` (verifiedAt desc, then name) and `formatCheckedId`/`formatCheckedEn`.
2. `src/app/(id)/page.tsx` (rewritten) — metadata, 3 FAQs + JSON-LD, H1 text, trending slugs all byte-identical to before. New: navy hero (SearchBox untouched + chips TikTok/WhatsApp/DANA/Roblox + stats 50/10/3/0), trust strip, trending as a 3-col grid (was a horizontal scroller), categories with real counts, NEW tools section (3 tools), "Terbaru Diperiksa" (sorted by verifiedAt desc, 12 cards with "Dicek 20 Okt 2026" + TrustBadge), numbered verification steps, guides, FAQ, navy closing CTA. Footer/Header/BottomNav untouched.
3. `src/app/(en)/en/page.tsx` (rewritten) — metadata untouched; the check:seo sentence "full catalog of 50 apps lives in the Indonesian edition" kept verbatim; H1 kept. Mirrors ID structure: navy hero (no SearchBox — the index is Indonesian), chips, stats 11/6/3/0, trust strip, 11 EN app guides, "Recently Verified" (6, all "Checked Oct 18, 2026"), 3 tools, verification steps in English, 6 safety guides, NEW short EN FAQ (same facts as ID, no new JSON-LD), closing CTA.
4. `tailwind.config.ts` (additive, 2 lines) — new static `navy: #0B1F3A` so the hero/CTA panels stay navy in both themes. No existing token changed.

**NOT changed:** Header, Footer, BottomNav, SiteChrome, ui.tsx, SearchBox, AnalyticsConsent, legal pages, app detail pages, tools pages, guides pages, data files, sitemap/robots, check scripts, env. No new dependencies.

**Decisions worth knowing:** footer strength comes from the homepage closing CTA, not a Footer rewrite (Footer is shared site-wide — changing it would alter every page). Letter tiles instead of real app icons (copyrighted, never used). "Terbaru Diperiksa" shows only two distinct dates because the catalog has only two verifiedAt values (20 Okt 2026 × 39, 18 Okt 2026 × 11). Kesehatan shows "0 aplikasi" (true; its blurb already says no apps yet). EN "Recently Verified" cards show no TrustBadge (its labels are Indonesian).

## 4. Test report (12 Nov 2026)

- `npx tsc --noEmit`: exit 0.
- `npm run build`: clean. First Load JS 103 kB (unchanged).
- `npm run check:seo`: all checks passed.
- `npm run check:links`: 114 sitemap URLs, 151 checked, 0 broken, 0 orphans, 0 content-not-in-sitemap, 37 assets. (Checked count 152 → 151 and assets 38 → 37 vs 11 Nov: build-hash churn only — the diff is hashed chunk/CSS filenames, no lost link; 0 broken/0 orphans confirms it.)
- Rendered HTML (local server, port 3100): ID homepage — H1 "Temukan aplikasi Android, dengan aman." present, FAQPage JSON-LD present, canonical https://cekapk.com, hreflang id-ID/en-US/x-default present. EN homepage — H1 present, the check:seo sentence present, canonical https://cekapk.com/en.
- Search API: `GET /api/search?q=tiktok` returns TikTok app + TikTok tool + CapCut (local fallback); nonsense query returns empty. SearchBox component untouched.
- Playwright (Chromium 153, local server): 8 screenshots in `~/workspace/cekapk-home-screenshots/` — ID/EN × desktop 1280×900 / mobile 390×844 × light/dark. Measurements: **no horizontal overflow in any of the 8** (scrollWidth == innerWidth); hero background rgb(11,31,58) in both themes with white text; H1 correct on both; search input present on ID, absent on EN (by design); 9 sections ID, 8 EN.
- Visual review (read 4 of the 8: ID light/dark desktop, EN light desktop, ID light mobile, EN dark mobile): hero, trust strip, grids, tools, verified cards, steps, guides, FAQ, CTA all render cleanly in both themes; cards align; contrast reads well; mobile stacks to one column with chips wrapping.
- **No test failures.**

## 5. Review corrections — 12 Nov 2026, ~13:37–13:45 PKT (workspace only, NOT deployed)

Ahmad accepted the redesign and asked for two final checks.

**Correction 1 — precise statistic.** ID hero stat label "APK bajakan dihosting" → **"file APK bajakan di-host"** (value stays 0). EN equivalent: "Pirated APKs hosted" → **"pirated APK files hosted"** (value stays 0). The claim is precise now: 0 pirated APK files are hosted — the library holds 0 files by design.

**Correction 2 — TrustStrip claims verified against the implementation (read the code, not assumed):**
- **Official sources first — SUPPORTED, unchanged.** Resolved data check: 49 of 50 apps have a canonical Play Store `details?id=` officialUrl; the only exception, Kucing APK (info_only), has `officialUrl: null` and its page renders no download button at all ("Tidak ada tombol unduh di halaman ini - dan itu disengaja"). (An earlier raw grep counted 11 literal URLs because 39 officialUrls are built by a helper in `expansion-shared.ts` — the resolved check is authoritative.) The library only publishes legal open-source files that pass the pipeline.
- **No login required — SUPPORTED, unchanged.** The only login routes in the whole app are `/admin/login` and `/api/admin/login`; middleware does no auth gating (maintenance mode only); no visitor session/auth code exists anywhere (the "session" matches in the TikTok tool are its 10-minute in-memory TikTok CDN session, not user auth). Tools and guides are fully public.
- **Files are not stored — REVISED.** The body text was already precise and is fully supported: the TikTok download route returns `new Response(upstream.body)` (streams, no disk write — and no disk writes exist in any tool download/info route); the permission checker writes a temp file to `os.tmpdir()` then `await fs.unlink(tmp)` after OCR on both success and failure paths (its own comment: "Gambar DIPROSES SEMENTARA lalu dihapus"). But the blanket titles **"Tanpa simpan file" / "No file storage" were NOT fully supported as site-wide claims**: the legal APK library stores published files under `LIBRARY_STORAGE_DIR` by design (currently 0 files, but the capability and purpose exist). Revised to the visitor-scoped, precise titles the body text already states: ID **"Berkasmu tidak disimpan"**, EN **"Your files aren't stored"** (the visitor's files — downloads passing through, uploaded screenshots — are never stored; the library stores only admin-published open-source files). Body texts unchanged.

**This round changed only the two homepage files** (mtime 13:39 PKT; `home.tsx`, `tailwind.config.ts`, `AnalyticsConsent.tsx`, `SiteChrome.tsx` untouched — see §4).

**Re-tests after corrections (12 Nov 2026):**
- `npx tsc --noEmit`: exit 0.
- `npm run build`: clean. First Load JS 103 kB (unchanged).
- `npm run check:seo`: all checks passed.
- `npm run check:links`: all passed (114 sitemap URLs, 0 broken, 0 orphans).
- Rendered HTML (local server, port 3100): ID — title present (HTML-escaped `&amp;` as expected), H1 present, FAQPage JSON-LD present, canonical https://cekapk.com, hreflang id-ID/en-US/x-default present, new stat "file APK bajakan di-host" present. EN — title present, H1 present, check:seo sentence present, canonical https://cekapk.com/en, new stat "pirated APK files hosted" + "Your files aren't stored" present.
- Search: `GET /api/search?q=tiktok` still returns TikTok app + TikTok tool + CapCut. SearchBox untouched.
- GA4 consent: `AnalyticsConsent.tsx` is the deployed banner-fix version, untouched in this round (5,024 bytes, `bg-paper` ×2, 0 undefined classes, mtime 11 Nov); `SiteChrome.tsx` SHA-256 `636be69e498584beedc8828436127f5b05ec9c7478287db5abce9c73a321b219` matches the recorded server copy exactly; `AnalyticsConsent` still wired in SiteChrome (2 matches). Consent implementation unchanged.
- Screenshots: all 8 retaken after the corrections (`~/workspace/cekapk-home-screenshots/`, same set) — no horizontal overflow in any; hero background rgb(11,31,58) in both themes; the corrected stat and the revised TrustStrip title confirmed visually in the ID light desktop shot.
- **No test failures.**
## 6. Deployment instructions (for Ahmad — DO NOT run until he says "deploy")

This is a PATCH deploy, not a full snapshot: the ZIP replaces exactly 4 source files in a copy of the live folder. The server's `.env.local`, database, Meilisearch, Caddy and PM2 setup are untouched. The ZIP contains NO environment files, secrets, node_modules or build artifacts.

**Archive:** `CekAPK-UI02-Homepage-Redesign-2026-11-12.zip` (contents + SHA-256 in §7).
**Contents:** 4 source files + this notes file (the deployment instructions and test record).
- `src/components/home.tsx`
- `src/app/(id)/page.tsx`
- `src/app/(en)/en/page.tsx`
- `tailwind.config.ts`
- `UI-02-HOMEPAGE-REDESIGN-2026-11-12.md` (this file)

**Golden rule:** upload/scp = his PC PowerShell window; unzip/build/restart = server window (`root@srv2112435`). One block at a time, wait for "done" after each. Ahmad was on the SHOP PC on 12 Nov — the paths below are the shop PC (`C:\Users\TechSOL\Downloads`); confirm which PC before starting if it is a different day.

**Step 1 — shop PC PowerShell window:**
```powershell
Get-FileHash "C:\Users\TechSOL\Downloads\CekAPK-UI02-Homepage-Redesign-2026-11-12.zip" -Algorithm SHA256
scp "C:\Users\TechSOL\Downloads\CekAPK-UI02-Homepage-Redesign-2026-11-12.zip" root@72.61.127.96:/root/
```
The hash MUST equal the SHA-256 in §7 below and in the chat report. If it does not match, stop — the wrong file was downloaded.

**Step 2 — server window:** take a FRESH hPanel snapshot FIRST (the 12 Nov snapshot from the banner deploy is not cover for this deploy). Then:
```bash
ls -la /root/CekAPK-UI02-Homepage-Redesign-2026-11-12.zip
rm -rf /root/cekapk-new
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new && unzip -o /root/CekAPK-UI02-Homepage-Redesign-2026-11-12.zip
grep -c "file APK bajakan di-host" "src/app/(id)/page.tsx"
grep -c "Berkasmu tidak disimpan" "src/app/(id)/page.tsx"
grep -c "pirated APK files hosted" "src/app/(en)/en/page.tsx"
grep -c 'navy: "#0B1F3A"' tailwind.config.ts
ls src/components/home.tsx
```
Expected: the ZIP is present; every grep prints **1**; `home.tsx` is listed.

**Step 3 — server window:** build and verify in the copy:
```bash
cd /root/cekapk-new && npm run build
npm run check:seo
npm run check:links
npm run check:negative
```
Expected: build clean (127 static pages, First Load JS 103 kB); `check:seo` all passed; `check:links` 114 sitemap URLs, 0 broken, 0 orphans; `check:negative` OK. If anything fails, stop and report the error — do not proceed to Step 4.

**Step 4 — server window:** swap and restart. `/root/cekapk-old` already exists (it holds the pre-UI-02 build), so it must be cleared FIRST or the move will nest the folder instead of replacing it:
```bash
cd /root
rm -rf /root/cekapk-old
mv cekapk cekapk-old
mv cekapk-new cekapk
pm2 restart cekapk
pm2 status
```
`pm2 status` must show `cekapk` online.

**Step 5 — verify live:** direct reads of https://cekapk.com/ and https://cekapk.com/en, plus a read-only browser check: navy hero with the same headline, stat "0 file APK bajakan di-host", trust strip "Berkasmu tidak disimpan", no horizontal overflow on desktop or mobile, consent banner still solid. Do NOT delete `/root/cekapk-old` until the new build is verified live.

**Backup instructions:** (a) the fresh hPanel snapshot taken in Step 2 — the deep safety net; (b) `/root/cekapk-old` after the swap — holds the complete pre-UI-02 build (Phase 2A + Phase A + Corrections 1+2 + banner fix); (c) this ZIP — the backup of the new files; (d) the workspace keeps the full source. Nothing on the server is deleted except the single old rollback dir in Step 4, which is replaced by the build that was live seconds before.

**Rollback instructions** (only if the new build misbehaves after the restart):
```bash
cd /root
pm2 stop cekapk
rm -rf /root/cekapk
mv /root/cekapk-old /root/cekapk
pm2 restart cekapk
pm2 status
```
Then verify the live site again. If `/root/cekapk-old` is already gone, restore the fresh hPanel snapshot taken in Step 2 instead. Report the failure — do not redeploy the same ZIP blindly.

## 7. Archive record
(TODO — SHA-256, exact contents and sizes, filled in after the ZIP is created and verified.)

**Pre-existing observations (NOT caused by this task, NOT fixed — outside "homepage only"):**
- On mobile, after a consent choice is stored, the "Pengaturan cookie" button (fixed bottom-right, z-60) overlaps the BottomNav. It is the live behaviour from the Nov 11 consent implementation, unchanged here.
- Kucing APK's developer string ("Tidak resmi - developer tidak terverifikasi") is Indonesian; it appears on the EN "Recently Verified" card, same as the pre-existing Indonesian FactBox values on EN app pages.
- Developer names "Garena International I" (Free Fire) and "PT Espay Debit Indonesia Koe" (DANA) are the stored data values, verified against Play Store in Phase 2 — shown in full, not truncated.

