# CekAPK — SEO-01 to SEO-16 Verification & Finalization Report

Date: 7 November 2026. Verifier: Muse (independent re-check of the Phase 1–3 work).
Source brief: `CekAPK_Developer_Implementation_Spec_SEO-01_to_SEO-16.pdf`
(Firecrawl crawl + ChatGPT, audit date 6 Nov 2026, 100 URLs).

This is a verification, not a rebuild. No production code was changed in this
pass except one documentation file (see §6). No deploy was made. Nothing was
published. No API key was requested or used.

## 0. Repo and deployment state (Rule 1)

- **Git: NOT A REPOSITORY.** `git status` / `git log` in `~/workspace/id-apk-hub/`
  both fail with "not a git repository". There is no version control in the
  project; deployment state is tracked by dated ZIP packages, not commits.
  (Recommendation: `git init` + first commit is a one-time, low-risk
  improvement — owner decision, not done here.)
- **Production = Phase 2 build**, deployed by Ahmad 6 Nov 2026, 22:18–22:24 PKT
  (`CekAPK-Deploy-SEO-Phase2-2026-11-06.zip`), verified live the same evening.
- **Local = same source + Phase 3 additions.** Phase 3 changed no `src/`
  (matrix doc + 9 parity checks + runbook only), so for all shipped code the
  live site and local source are identical. The Phase 3 ZIP
  (`CekAPK-Deploy-SEO-Phase3-2026-11-07.zip`, 257 files) is a repo record,
  not a deploy — correctly never uploaded.
- **Fresh build 7 Nov 2026** (this verification): `npm run build` clean;
  route list matches the live site.

## 1. Verification matrix (SEO-01 to SEO-16)

Statuses allowed: FIXED / PARTIALLY FIXED / BLOCKED / NOT APPLICABLE.
"FIXED" here means: implemented AND tested with the evidence cited — never
code existence alone.

### SEO-01 — Contact and DMCA email addresses — FIXED
- Finding: /kontak carried a "domain sementara / Fase 0" temporary-mailbox note.
- Solution: note replaced with verified-active wording + 2-working-day reply
  target; both addresses kept (kontak@cekapk.com, dmca@cekapk.com).
- Files: `src/app/(id)/kontak/page.tsx`.
- Live URL: https://cekapk.com/kontak
- Test: live read 7 Nov 2026 — both addresses displayed, page states the
  test email was received 5 Nov 2026; text search for "sementara" = no match,
  no "domain sementara" / "Fase 0" anywhere. Mailboxes independently verified
  by a real test email received in Gmail 5 Nov evening (ImprovMX forwarding).
- Remaining: none. (No DMARC/DKIM claim is made anywhere — correctly, as
  neither was verified.)

### SEO-02 — Transparent APK security verification methodology — FIXED
- Finding: safety claims needed a reproducible, public methodology.
- Solution: new page /metodologi-verifikasi, written strictly from the real
  pipeline code: 5 steps, publish gate, score breakdown, states
  draft/published/flagged/rejected. Honestly states VT_API_KEY is not set,
  so no file can pass the scan step and the library stays empty by design.
- Files: `src/app/(id)/metodologi-verifikasi/page.tsx`; linked from
  /keamanan + footer.
- Live URL: https://cekapk.com/metodologi-verifikasi
- Test: live read 7 Nov 2026 — page loads; all 5 steps present ("Hash dan
  integritas", "Struktur APK", "Sidik jari penanda tangan", "Pindai
  antivirus", "Audit izin"); "Status saat ini — jujur" section states "Kunci
  API VirusTotal: belum dipasang" and "Perpustakaan masih kosong".
- Remaining: update the "key not set" sentence once the key is set and the
  first file passes (see §4A).

### SEO-03 — Screenshot processing and file deletion — FIXED
- Finding: permission checker claims uploads are processed and deleted; the
  claim had to match backend behaviour.
- Solution: verified code + added server-side magic-byte validation
  (PNG/JPEG/WebP signatures — client MIME is no longer trusted alone).
- Files: `src/app/(id)/api/tools/permissions/check/route.ts`;
  `src/app/(id)/privasi/page.tsx`.
- Live URL: https://cekapk.com/tools/pemeriksa-izin, https://cekapk.com/privasi
- Test: code read 7 Nov 2026 — MIME check + 8 MB limit + magic-byte check
  all present; temp file written to `os.tmpdir()`; `fs.unlink(tmp)` runs
  after OCR resolves, on BOTH the success path and the OCR-failure path
  (503 after unlink); files failing validation are rejected before any file
  is written, so there is nothing to delete. Only anonymous counts are
  logged (`logEvent("permissions_check", {found, tinggi})`). Live /privasi
  read 7 Nov 2026 confirms the wording matches: Tesseract OCR, deletion
  "dalam beberapa detik", 8 MB limit, dated 6 Nov 2026.
- Remaining: a live smoke test with a real Android screenshot is still
  unproven (see §4C checklist) — the code path itself is verified; the
  end-to-end live run is not.

### SEO-04 — Canonical URLs and hreflang — FIXED
- Finding: homepage canonical vs og:url inconsistency alleged; hreflang
  needed reciprocal validation.
- Solution: `pageMetadata` normalizes trailing slash ("/" only for home);
  og:url = canonical from the same variable. Hreflang paired only where a
  genuine translation exists (gated by hasEnApp/hasEnGuide).
- Files: `src/lib/seo.tsx`; app/guide page `generateMetadata`.
- Live URLs: https://cekapk.com, https://cekapk.com/aplikasi/tiktok
- Test: `npm run check:seo` 7 Nov 2026 — trailing-slash check PASS,
  no-empty-sameAs PASS, 4 hreflang parity checks PASS. Built HTML of the
  fresh build: homepage canonical `https://cekapk.com` = og:url
  `https://cekapk.com`; TikTok canonical
  `https://cekapk.com/aplikasi/tiktok` = og:url (same). The audit's alleged
  homepage mismatch could not be reproduced in code or build (Phase 1).
- Remaining: none.

### SEO-05 — English navigation and internal links — FIXED
- Finding: Indonesian labels/links on English pages.
- Solution: Header/Footer/BottomNav/SiteChrome locale-aware; EN nav uses
  only existing EN routes (/en, /en/tools) + a labelled "Bahasa Indonesia"
  switcher. No guessed /en/kategori, /en/keamanan, /en/aplikasi index.
- Files: `src/components/SiteChrome.tsx`, `src/components/Footer.tsx`,
  both layouts.
- Live URL: https://cekapk.com/en
- Test: live read 7 Nov 2026 — header "Search for / Trending / Tools /
  Apps / Search", hero "CekAPK — Safe App Info & Free Tools"; "Tools" →
  /en/tools, TikTok card → /en/aplikasi/tiktok. "Apps" points to /en (the
  English home) because no /en/aplikasi index route exists — by design.
- Remaining: none.

### SEO-06 — Application detail pages — FIXED
- Finding: shared template paragraphs duplicated across pages; Play Store
  links were search URLs; one unsupported size number; one misleading price
  label.
- Solution: all 49 Play links → canonical details URLs with package IDs
  verified against the live Play Store one by one (3 wrong candidates
  corrected: Bstation `com.bstar.intl`, Ruangguru
  `com.ruangguru.livestudents`, Meet `com.google.android.apps.tachyon`;
  developer fixes Zoom, Alight Motion; Kucing correctly stays
  `officialUrl: null`). 39 expansion pages: 7 shared paragraphs now have 9
  group-specific variants each (63 variants + 9 permission intros).
  Kucing "27 MB" removed; Netflix priceLabel corrected to "Gratis diunduh;
  konten memerlukan langganan berbayar". Lazada developer flag REJECTED
  after a live Play Store check (listing shows "Lazada Mobile").
- Files: `src/lib/data/apps-parts/expansion-shared.ts`,
  `scripts/apply-phase2-variants.py`, `play-package-ids.md`,
  `expansion-template-variants.md`, app records.
- Live URLs: https://cekapk.com/aplikasi/tiktok (spot-checked),
  all /aplikasi/* pages.
- Test: `npm run check:seo` 7 Nov 2026 — "no Play Store search URLs in src"
  PASS; all 8 variant records "9 group variants, all distinct" PASS; "no
  unverified 27 MB" PASS. Live read 7 Nov 2026: TikTok "Buka di Google Play"
  → `https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically`
  (correct details form, not search). Evidence scope, stated honestly:
  48 of 49 package IDs were verified against the live Play Store on 6 Nov
  2026 (`play-package-ids.md`); TikTok was re-verified live on 7 Nov; the
  other 48 were not re-clicked live in this session.
- Remaining: none in code. The 50-app content audit (`app-content-audit.md`,
  42 OK / 8 needs-work) is a separate content backlog, not an SEO-06 defect.

### SEO-07 — Consolidate APK Hijau and APK Ijo guides — FIXED (owner decision)
- Finding: overlapping intent between /panduan/apa-itu-apk-hijau and
  /panduan/apa-itu-apk-ijo.
- Solution: evaluated; pages overlap by design (Ijo is the informal spelling
  of Hijau) and already cross-reference each other.
- Live URLs: https://cekapk.com/panduan/apa-itu-apk-hijau,
  https://cekapk.com/panduan/apa-itu-apk-ijo
- Test: owner decision 6 Nov 2026 evening — Ahmad chose "Keep both pages as
  they are". No merge, no 301. Do not re-ask.
- Remaining: none. A future merge would need per-URL GSC clicks/impressions
  first; the owner has closed the question.

### SEO-08 — Privacy policy — FIXED
- Finding: privacy page too short for the site's actual processing.
- Solution: /privasi rewritten (~212 words → full tool-specific policy,
  dated 6 Nov 2026): download tools, permission checker (local Tesseract,
  temp file, 8 MB limit), library/report handling, logs, no GA/ads
  currently, deletion-request procedure via kontak@.
- Files: `src/app/(id)/privasi/page.tsx`.
- Live URL: https://cekapk.com/privasi
- Test: live read 7 Nov 2026 — "Terakhir diperbarui: 6 November 2026";
  Pemeriksa Izin, Tesseract OCR, temp-file deletion, 8 MB limit all present.
- Remaining: none.

### SEO-09 — Broken-link and redirect monitoring — FIXED
- Finding: no link-validation process existed.
- Solution: `scripts/check-links.mjs` (`npm run check:links`) — starts the
  local build, crawls all 7 sitemap segments, checks every internal link,
  reports broken links, 404s, orphans, missing alt, missing canonical.
  Exits 1 on breakage, so it can gate a deploy.
- Files: `scripts/check-links.mjs`; reports `link-audit-<date>.md`.
- Test: re-run 7 Nov 2026 on a fresh build — sitemap index 7 segments
  (statis 10, kategori 11, aplikasi 51, panduan 8, tools 4, bandingkan 2,
  en 18) = **104 sitemap URLs**; **139 URLs checked, 0 broken, 0 orphans,
  0 content-not-in-sitemap, 0 pages without canonical, 0 images missing
  alt**. Identical clean result to the 6 Nov first run.
- Remaining: none for the checker itself. It is a manual/CI gate, not a
  scheduled production job (per the brief: do not create a scheduled job
  without checking hosting/authorization).

### SEO-10 — XML sitemap coverage and freshness — FIXED
- Finding: application dates might not reflect latest verification dates.
- Solution: BUG FOUND + FIXED in Phase 1 — `sitemap.ts` used `new Date()`
  as the default lastmod, "refreshing" every URL on each regeneration.
  Now `lastModified` is set only when a real `verifiedAt` date exists.
  /metodologi-verifikasi added to the statis segment.
- Files: `src/app/sitemap.ts`.
- Live URL: https://cekapk.com/sitemap.xml
- Test: live read 7 Nov 2026 — valid sitemap index, 7 child sitemaps.
  `npm run check:seo` 7 Nov 2026 — "no blanket new Date() lastmod" PASS,
  "/metodologi-verifikasi included" PASS. Code read: `lastModified` is only
  spread into the entry when `lastMod` is truthy (`...(lastMod ?
  { lastModified: new Date(lastMod) } : {})`).
- Remaining: none.

### SEO-11 — Mobile experience and Core Web Vitals — BLOCKED
- Finding: audit measured nothing; CWV targets LCP ≤2.5s, INP ≤200ms,
  CLS ≤0.1.
- Solution: none in code — this item is measurement, not a code change.
- Test: attempted twice from the sandbox (direct API + live browser):
  Google's PageSpeed Insights API answers 429 `RESOURCE_EXHAUSTED` —
  "Quota exceeded for quota metric 'Queries' … limit 'Queries per day' …
  Quota limit value: 0". Retried 7 Nov morning — still 429. The shared API
  project has no daily quota; retrying the same call will not help.
- Remaining: OWNER STEP on pagespeed.web.dev (own browser, own quota) —
  exact URL list in §4D. No scores are invented here; all results are
  marked pending.

### SEO-12 — Verifiable public security records — BLOCKED
- Finding: visitors need records that distinguish guidance from a file that
  actually passed verification.
- Solution: record model exists and the pipeline enforces it — hash,
  fingerprint, scan, review gate; `canPublish` requires all steps OK + a
  safety score + a named human reviewer. No record can exist until a real
  file passes the real pipeline.
- Files: `src/lib/library/pipeline.ts`,
  `src/app/(id)/api/admin/library/upload/route.ts`,
  `src/db/schema.ts` (`library_files`), `SEO-12-FIRST-TEST-RUNBOOK.md`.
- Test: code read 7 Nov 2026 — see §4A for the full inspection. The
  methodology page honestly states the key is not set and the library is
  empty (verified live 7 Nov 2026).
- Remaining: VT_API_KEY (owner step, §4A). Do not publish any record until
  a real file passes.

### SEO-13 — Contextual internal linking — FIXED
- Finding: app pages lacked contextual links to guides/tools.
- Solution: app pages show a "Panduan Terkait" section derived from the
  guides' own `relatedApps` data (no invented links): WhatsApp 6 guides,
  TikTok 2, Bstation 2, Telegram 2, Minecraft 2, CapCut 1, Kucing APK 1.
  Instagram's app page links the Instagram downloader tool (`relatedTool`).
  /keamanan → /metodologi-verifikasi; footer links it; /privasi links it.
- Files: app page template, `src/lib/data/guides.ts` (`relatedApps`).
- Live URL: https://cekapk.com/aplikasi/whatsapp
- Test: live read 7 Nov 2026 — "Panduan Terkait" present with all 6 guides;
  every one of the 6 links was opened and resolved to a real guide page
  (no 404). Crawler 7 Nov 2026: 0 orphans across 104 sitemap URLs.
- Remaining: none.

### SEO-14 — Page-specific Open Graph images — FIXED
- Finding: all pages shared one generic social image (/og-default.jpg).
- Solution: 5 dynamic `opengraph-image.tsx` routes (`next/og`): ID app, ID
  guide, ID category, EN app, EN guide. Each renders a branded 1200×630
  card (blue gradient, CekAPK wordmark, page title, real subtitle). No app
  logos, screenshots, or invented ratings/badges. `pageMetadata` gained an
  `ogImage: "dynamic"` option.
- Files: 5 `opengraph-image.tsx` routes; `src/lib/seo.tsx`.
- Live URLs: https://cekapk.com/aplikasi/tiktok (dynamic image),
  https://cekapk.com (default image).
- Test: built HTML of the fresh build — TikTok og:image
  `https://cekapk.com/aplikasi/tiktok/opengraph-image-lexgr5?...` (dynamic,
  present); homepage og:image `https://cekapk.com/og-default.jpg`
  (correct — homepage keeps the default). Phase 2 local verification:
  all 5 routes returned HTTP 200 `image/png` 1200×630. (Live-browser
  view-source could not be used to re-confirm the og:image on the live
  page — browser tooling blocks view-source URLs; the built-HTML evidence
  above is from the identical code the live build runs.)
- Remaining: none.

### SEO-15 — Structured data — FIXED
- Finding: structured data needed validation; empty `sameAs: []` was present;
  SearchAction pointed at a search that ignored the query.
- Solution: empty `sameAs: []` removed from Organization JSON-LD.
  `/aplikasi?q=` now really filters (name, developer, tagline, category,
  search-alias table, result count, "show all" link) — the WebSite
  SearchAction target is a working search. `robots.txt` still disallows
  crawling `/aplikasi?q=`.
- Files: `src/lib/seo.tsx`, `src/app/(id)/aplikasi/page.tsx`,
  `src/app/robots.ts`.
- Test: `npm run check:seo` 7 Nov 2026 — "no empty sameAs" PASS,
  "/aplikasi honours ?q=" PASS. Validator run 6 Nov 2026 evening
  (validator.schema.org): homepage 0 errors, 0 warnings (WebSite +
  FAQPage); TikTok page 0 errors, 0 warnings (SoftwareApplication +
  BreadcrumbList + WebSite + FAQPage); /keamanan 0 errors, 0 warnings.
- Remaining (minor): the Phase 2 note recommended a quick re-run of the
  TikTok page on the validator after the Phase 2 deploy, since Phase 2
  changed the SoftwareApplication `url` to the canonical Play URL. Same
  structure, low risk — optional, owner can do it in 2 minutes or it can
  ride along with the next batch.

### SEO-16 — English content coverage — PARTIALLY FIXED
- Finding: incomplete English coverage + Indonesian navigation elements.
- Solution: coverage mapped honestly — EN is **11 apps + 5 guides = 16
  translated pages** (all 11 pillar apps translated; 0 of 39 expansion apps;
  APKPure is the only untranslated guide). `en-coverage-matrix.md` is the
  source of truth; 9 language-parity checks added to `check:seo` (Phase 3);
  hreflang paired only where a genuine equivalent exists.
- Files: `en-coverage-matrix.md`, `scripts/check-seo.mjs`,
  `src/lib/data/i18n-en-apps-a.ts`, `src/lib/data/i18n-en-apps-b.ts`.
- Test: `npm run check:seo` 7 Nov 2026 — ID catalog 50 slugs PASS; EN apps
  11, all with ID counterparts PASS; ID guides 6 PASS; EN guides 5, all
  with ID counterparts PASS; 4 hreflang-gating/reciprocity checks PASS; EN
  homepage coverage statement PASS. EN slugs verified directly in the data
  files: apps tiktok, capcut, whatsapp, instagram, telegram, youtube,
  spotify, canva, bstation, minecraft, kucing-apk; guides apa-itu-apk-hijau,
  apa-itu-apk-ijo, cara-instal-apk-aman, cara-cek-izin-aplikasi,
  cara-mengenali-apk-palsu.
- Remaining: translation of further pages is an owner decision, not a
  defect — the spec itself warns against auto-translating all 50. Next
  candidate evaluated in §5; nothing is published until Ahmad approves.

## 2. Corrections made during this verification

These are corrections to the record, not to the site. Each is justified by
the test evidence cited.

1. **check:seo runs 30 checks, not 29.** The Phase 3 note says 29/29. The
   script was re-run 7 Nov 2026: 30 PASS lines, 0 FAIL, exit 0. Correct
   figure: **30/30**. (Count: 12 base checks + 8 group-variant checks + 10
   Phase 3 / misc checks.)
2. **One check is vacuous.** "kontak: page present" is written as
   `/kontak@cekapk\.com/.test(kontak) || true` — it passes unconditionally.
   It tests nothing. Noted here; left as-is (harmless, but it should not be
   cited as evidence of anything).
3. **en-coverage-matrix.md had 29 wrong app names + 1 wrong URL.**
   The Apps table's display names were shifted against their slugs (e.g.
   "Instagram (DM)" next to `/aplikasi/telegram`, "YouTube" next to
   `/aplikasi/instagram`, "League of Legends: Wild Rift" next to
   `/aplikasi/free-fire` — Wild Rift is not even in the catalog). Slugs,
   categories and statuses were correct; names were not. All 29 names were
   corrected from the actual data records (`src/lib/data/apps-parts/*.ts`),
   and the Tools table's permission-checker URL was corrected from
   `/tools/cek-izin-aplikasi` (no such route) to `/tools/pemeriksa-izin`.
   The matrix is now consistent with `check:seo` and the data files.
4. **A live-browser observation was NOT reproduced.** The live check
   reported a footer "Made in Indonesia" link pointing to
   `/en/made-in-indonesia` (vs ID `/buatan-indonesia`). Code search finds
   no "Made in Indonesia", "buatan", "made-in-indonesia" or
   "buatan-indonesia" anywhere in `src/`; `Footer.tsx` links only to real
   routes (/en, /en/tools, /, /privasi, /ketentuan, /dmca, /kontak, /tools,
   /aplikasi, /kategori, /keamanan, /panduan, /perpustakaan, /tentang,
   /metodologi-verifikasi, /disclaimer). The live URL
   /en/made-in-indonesia returns 404 — which is correct behaviour for a
   URL nothing links to, not a broken link. No action needed.
5. **check:seo "en apps present (16 slugs)"** counts 11 app slugs + 5 guide
   slugs from one regex pass; the label is slightly misleading but the
   number is consistent (16 translated pages). Noted, not changed.

## 3. Test results and commands (7 Nov 2026)

All run in `~/workspace/id-apk-hub` against the current source.

| Command / check | Result |
|---|---|
| `npm run check:seo` | 30 PASS, 0 FAIL, exit 0 |
| `npm run build` | Clean (fresh build of current source) |
| `npm run check:links` | 104 sitemap URLs; 139 checked; 0 broken; 0 orphans; 0 content-not-in-sitemap; 0 no-canonical; 0 img alt missing/empty. Report: `link-audit-2026-11-07.md` |
| Live read, 10 URLs (kontak, metodologi-verifikasi, privasi, /en, homepage, TikTok, WhatsApp, Chrome, Kucing, sitemap.xml) | All 10 load; every claimed fact confirmed (see matrix). Canonical/og:url and TikTok og:image could not be read from the live browser (view-source blocked) — closed instead from the built HTML of the identical code: homepage canonical = og:url = https://cekapk.com; TikTok canonical = og:url = https://cekapk.com/aplikasi/tiktok, og:image = dynamic opengraph-image URL |
| `npx tsc --noEmit` | Clean (Phase 2; no src changes since) |
| Schema validator (6 Nov, validator.schema.org) | Homepage, TikTok page, /keamanan: 0 errors, 0 warnings |
| PageSpeed Insights (sandbox) | 429 RESOURCE_EXHAUSTED, quota 0/day — retried 7 Nov morning, still 429 |

## 4. Outstanding work

### A. VirusTotal integration — inspected, key is the only missing piece
- **Implemented: yes.** `src/lib/library/pipeline.ts` line ~84:
  `GET https://www.virustotal.com/api/v3/files/{sha256}` with header
  `x-apikey`. It is a **hash lookup, not a file upload** — the file itself is
  never sent to VirusTotal.
- **Key wiring:** `src/app/(id)/api/admin/library/upload/route.ts:28` passes
  `vtApiKey: process.env.VT_API_KEY` into `runPipeline`. No key → step 4
  fails with "VT_API_KEY belum diatur di server" (pipeline line ~98).
- **Where the key goes:** the SERVER's `/root/cekapk/.env.local` only —
  not local dev, not the repo, not a ZIP, never in chat.
- **Scan rules (in code):** HTTP 200 + malicious=0 + suspicious=0 → clean,
  step passes (publish threshold exactly 0). Any malicious/suspicious > 0 →
  step fails, file cannot publish. HTTP 404 → hash unknown to VirusTotal;
  the admin must submit the file in the VT web UI first, then re-run.
  Any other status / network error → step fails, retry later.
- **Storage:** `library_files` table stores version, sizeBytes, sha256,
  signer/expected fingerprints, source name+URL, licence, storage path,
  permissions JSON, full pipeline steps JSON (including the VT detail line
  with malicious/suspicious counts), safetyScore + breakdown, scanStatus,
  reviewedBy/reviewedAt, status (draft/published/flagged/rejected),
  uploadedBy, lastCheckedAt, createdAt, publishedAt. So scan results ARE
  stored with version and timestamps. The total engine count is in the VT
  response at scan time (the detail line records "dari puluhan engine");
  there is no separate engine-count column.
- **Safe to test:** yes — the key never leaves the server (the admin panel
  shows only the step results). Full first-test procedure:
  `SEO-12-FIRST-TEST-RUNBOOK.md` (Step 0 key signup, Step 1 server config,
  Step 2 first test file = an official F-Droid APK VT already knows, Step 3
  read all 5 steps, Step 4 publish + verify live + update the methodology
  page). **No real scan has been run and none will be until the key is set
  and authorized. No scan results exist to report — none are fabricated here.**
- **Owner action (exact):**
  1. virustotal.com → Sign up free → confirm email → profile/avatar →
     API key. Free tier: 4 requests/minute, 500/day.
  2. Server window: `cd /root/cekapk` then
     `grep -q VT_API_KEY .env.local && echo "key line already present - edit it" || echo "VT_API_KEY=PASTE_KEY_HERE" >> .env.local`
     (paste the real key in place of PASTE_KEY_HERE), then
     `pm2 restart cekapk`.
  3. Confirm in the admin panel: start an upload — step 4 must no longer
     say "VT_API_KEY belum diatur".
  4. Then follow the runbook for the first F-Droid test file. The admin
     must also have the official signer fingerprint registered and every
     dangerous permission explained (min. 20 characters) before the test.

### B. Bing Webmaster Tools — exact instructions (not connected yet)
Do not claim Bing is connected unless verified — it is not. Steps for Ahmad:
1. Go to https://www.bing.com/webmasters and sign in with a Microsoft
   account (a Gmail address works as a Microsoft account sign-in).
2. Click **Add a site** → enter `https://cekapk.com`.
3. Choose **Import from Google Search Console** (same Google account as
   the GSC property) — ownership verifies automatically and the sitemaps
   import with it. Do NOT pick manual verification unless the import fails.
4. After import: open **Sitemaps** in the left menu and confirm all 7
   segments appear; check **URL Inspection** for the homepage once.
5. Data (impressions/clicks) takes a few days to appear — that is normal.
If the import option does not appear, stop and report what the screen
shows; do not add DNS TXT records blindly.

### C. Remaining smoke tests — checklist (expected vs actual)
To be run by Ahmad on the live site / a real Android phone. Nothing below
is marked passed unless it is actually tested.

| # | Test | Expected result | Actual result |
|---|---|---|---|
| 1 | TikTok downloader — video (MP4) | MP4 downloads and plays | VERIFIED LIVE at first launch (Oct 30/31) — Ahmad's own report, 5 Nov |
| 2 | TikTok downloader — audio/MP3 | Audio file downloads | PENDING — not yet tested live |
| 3 | Instagram Reel downloader | Reel MP4 downloads from a public Reel URL | PENDING — live extraction never verifiable from the sandbox |
| 4 | Permission checker with a real Android screenshot | Permissions listed with explanations; file deleted after processing | PENDING live — code path verified 7 Nov (magic-byte check, unlink on success + failure); OCR itself verified 9/9 locally 31 Oct |
| 5 | Dark mode on a real phone | Theme switches, readable, no broken contrast | PENDING |
| 6 | PWA install + manifest | Install prompt / Add to Home screen works; manifest loads; icon correct | PENDING |
| 7 | Mobile navigation | Menu opens, all links work, no horizontal overflow | PENDING |
| 8 | Contact form | — | NOT APPLICABLE — there is no contact form on the site. Contact is by email (mailto links on /kontak); the email path is VERIFIED (test email received in Gmail 5 Nov) |

### D. PageSpeed baseline — test list (all results PENDING)
The sandbox cannot run PageSpeed (API quota 0/day, retried 7 Nov — still
429). Run in Ahmad's own browser at https://pagespeed.web.dev/ — mobile AND
desktop for each, and save the report URLs:

| Page | URL |
|---|---|
| Homepage | https://cekapk.com/ |
| Application detail | https://cekapk.com/aplikasi/tiktok |
| Guide | https://cekapk.com/panduan/apakah-apkpure-aman |
| English application | https://cekapk.com/en/aplikasi/tiktok |
| Tools page | https://cekapk.com/tools/pengunduh-tiktok |
| Permission checker | https://cekapk.com/tools/pemeriksa-izin |

Record per run: Performance score, LCP, INP, CLS, FCP, TBT (if shown), and
the main recommendations. Targets from the brief: LCP ≤ 2.5s, INP ≤ 200ms,
CLS ≤ 0.1. No scores are recorded here — none were measured.

## 5. SEO-16 next content opportunity — evaluation

Candidates (no keyword volume or difficulty invented — none was available):

### Candidate 1 — English APKPure safety guide (RECOMMENDED FIRST)
- **Source content:** exists and is proven — the Indonesian guide
  (/panduan/apakah-apkpure-aman, 1,310 words, 6 sections + 6 FAQs) is the
  site's best-ranking asset: indexed 6 Nov 2026, top Google result for its
  query. Translation is an adaptation of proven content, not a new bet.
- **Search intent:** English speakers asking "is APKPure safe" — an
  informational safety question, exactly the intent CekAPK already serves
  well in Indonesian.
- **Competition (observed 7 Nov 2026):** the English query's top results are
  vpnsuper.com, startup.info, eathealthy365.com, apkstore.org, apkpure.net
  (a lookalike domain, not the official apkpure.com) and nordvpn.com — real
  competition, but informational articles, not tool pages; the Indonesian
  guide already outranks its own market, which shows the content angle
  works.
- **Effort:** smallest of the two — adapt 1,310 words + 6 FAQs; EN guide
  route + hreflang gating already exist (`hasEnGuide`); no new routes, no
  UI strings, no tool behaviour to verify.
- **Risk:** low. No downloads offered (explainer only, same as ID version).

### Candidate 2 — English Instagram tool page
- **Source content:** the Indonesian tool exists
  (/tools/pengunduh-instagram, yt-dlp backend) and the TikTok tool is
  already fully available in English — the pattern exists.
- **Search intent:** "Instagram downloader" — high volume, but the intent is
  a working tool, not an article. The page only earns its ranking if the
  tool itself works flawlessly for English users.
- **Competition (observed 7 Nov 2026):** the English query is dominated by
  dedicated downloader brands — sstik.top, contentstudio.io,
  mediasaverpro.com, filemagics.com, viddow.com — entrenched, specialized
  tool sites. A 7-day-old site's new tool page would be starting from zero
  against them.
- **Effort:** larger — a new EN tool route + English UI strings for the
  whole downloader flow (not just content), plus the tool's own live
  extraction is still unverified (smoke test §4C #3 pending). Publishing an
  English tool page before the tool itself is proven live would repeat the
  exact mistake this verification is meant to prevent.
- **Risk:** medium. Tool-first, content-second; and Instagram downloaders
  sit in a legally greyer area than an informational safety guide.

**Recommendation: build the English APKPure guide first.** Smaller effort,
proven source content, informational intent CekAPK already wins in
Indonesian, and no dependency on unverified tool behaviour. The Instagram
tool page comes second — after its live smoke test passes. **Nothing is
published until Ahmad approves the selected target.**

## 6. Source files inspected or changed

Inspected (read, not modified): `scripts/check-seo.mjs`,
`scripts/check-links.mjs`, `src/lib/seo.tsx`, `src/app/sitemap.ts`,
`src/lib/library/pipeline.ts`,
`src/app/(id)/api/admin/library/upload/route.ts`,
`src/app/(id)/api/tools/permissions/check/route.ts`, `src/db/schema.ts`,
`src/components/Footer.tsx`, `src/components/SiteChrome.tsx`,
`src/lib/data/i18n-en-apps-a.ts`, `src/lib/data/i18n-en-apps-b.ts`,
`src/lib/data/apps-parts/*.ts`, `SEO-01-16-PHASE1-2026-11-06.md`,
`SEO-01-16-PHASE2-2026-11-06.md`, `SEO-01-16-PHASE3-2026-11-07.md`,
`SEO-12-FIRST-TEST-RUNBOOK.md`, `en-coverage-matrix.md`,
`play-package-ids.md` (referenced), built HTML in `.next/server/app/`
(homepage `index.html`, TikTok page).

Changed (one file, documentation only):
- `en-coverage-matrix.md` — 29 app display names corrected to match their
  slugs (from the data records); permission-checker URL corrected to
  `/tools/pemeriksa-izin`. No source code, no content, no URLs changed.

## 7. Production vs local deployment status

| Item | Production (live) | Local source |
|---|---|---|
| Phase 1 changes | LIVE (deployed 6 Nov evening, verified live) | Same code |
| Phase 2 changes | LIVE (deployed 6 Nov 22:18–22:24 PKT, verified live) | Same code |
| Phase 3 changes | N/A — no src changes; ZIP is a repo record only | Matrix + 9 parity checks + runbook |
| Verification corrections (matrix doc) | NOT deployed (docs only; no live effect) | Corrected 7 Nov 2026 |
| check:seo | N/A (local gate) | 30/30 PASS, 7 Nov 2026 |
| check:links | N/A (local gate) | 0 broken / 0 orphans, 7 Nov 2026 |

## 8. Highest-priority next actions

1. **VirusTotal key** (Ahmad, ~10 min + server commands) — unlocks SEO-12
   and the whole legal APK library. Exact steps in §4A.
2. **Bing import** (Ahmad, ~10 min) — exact steps in §4B.
3. **Approve the SEO-16 pick** (Ahmad) — recommendation: English APKPure
   guide first (§5). Nothing is built until he says so.
4. **Fresh snapshot tonight** (Ahmad, hPanel) — the 7 Nov ~11:57 snapshot
   lapses ~8 Nov ~11:57; his evening shop hours are the right time, not
   the morning.
5. **PageSpeed baseline** (Ahmad, pagespeed.web.dev) — 6 pages × mobile +
   desktop (§4D).
6. **Smoke tests** (Ahmad, real phone) — §4C checklist; TikTok audio,
   Instagram Reel, permission checker, dark mode, PWA.
7. **Optional:** re-run the TikTok page on validator.schema.org after the
   Phase 2 deploy (2 minutes); `git init` the project for version control
   (owner decision).

---
*Verification method note: local checks ran against a fresh build of the
current source (7 Nov 2026). Live checks were read-only (10 URLs, no
sign-in, no submissions). Where the live browser could not read <head> meta
(view-source blocked), the gap was closed from the built HTML of the
identical code the live build runs — stated as such wherever it applies,
never presented as a live read.*
