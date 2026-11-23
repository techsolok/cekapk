# CekAPK — Phase A Post-Deployment Corrections (9 November 2026)

Brief: two corrections. Local source changes + local testing only. No production access, no deploy. STOP after the corrections; wait for owner review.

## Correction 2 — Legal date-line accessibility: DONE + VERIFIED

### Problem
All 11 legal pages used `text-ink/50` on the date line (`<p className="text-sm text-ink/50">`). Measured contrast: **3.28:1 light** (WCAG AA fail), **4.50:1 dark** (at/below the 4.5:1 threshold). Confirmed by two independent computations (Python WCAG calc + rendered-page computed styles); the Python calc reproduces the Phase A review numbers exactly.

### Fix
Date line class changed `text-ink/50` → `text-muted` on all 11 pages. `text-muted` is the existing Phase A design token (`--text-muted`: #64748B light / #94A3B8 dark, `muted` colour in tailwind.config.ts, already defined in both themes). No CSS or config change was needed. `text-ink/60` was tested and REJECTED (4.42:1 light — still fails); `text-secondary` passes but is too prominent for a date line (7.58:1 light).

### Files changed (11, one class per file, nothing else)
- `src/app/(id)/privasi/page.tsx`
- `src/app/(id)/ketentuan/page.tsx`
- `src/app/(id)/tentang/page.tsx`
- `src/app/(id)/dmca/page.tsx`
- `src/app/(id)/disclaimer/page.tsx`
- `src/app/(id)/kebijakan-iklan/page.tsx`
- `src/app/(en)/en/privacy-policy/page.tsx`
- `src/app/(en)/en/terms-of-use/page.tsx`
- `src/app/(en)/en/about/page.tsx`
- `src/app/(en)/en/dmca/page.tsx`
- `src/app/(en)/en/advertising-policy/page.tsx`

Date-line text, dates, and all other legal content unchanged.

### Contrast ratios (rendered-page computed styles, all 11 pages × 2 themes)
| | Light | Dark |
|---|---|---|
| Before (`text-ink/50`) | 3.28:1 FAIL | 4.50:1 at/below threshold |
| After (`text-muted`) | **4.76:1 PASS** | **7.37:1 PASS** |

Rendered checks (Playwright, 1280×900, local `next start`): 22/22 pass — date-line class `text-sm text-muted`, computed colours exactly rgb(100,116,139) light / rgb(148,163,184) dark, no horizontal overflow, article 768px, H1 32px, H2 24px (disclaimer: 0 H2s, as before). Screenshots: `~/workspace/cekapk-corrections-screenshots/corr2-<slug>-<theme>.png` (22 files) + `corr2-measurements.json`.

### Out of scope (found, NOT changed)
- `src/app/(id)/metodologi-verifikasi/page.tsx:13` — same `text-ink/50` date-line pattern, but it is NOT one of the 11 prose-legal pages. Offer: fold it in with one identical edit if the owner wants it.
- Other `text-ink/50` uses are not legal-page date lines (Instagram tool captions, `/bandingkan` "Terakhir dicek", admin panels, footer copyright) — untouched per the brief's restrictions.

### Tests (Correction-2 tree, local)
- `npx tsc --noEmit` — exit 0
- `npm run build` — clean, 127 static pages, First Load JS 103 kB (unchanged)
- `npm run check:seo` — all checks passed (73/73)
- `npm run check:links` — 114 sitemap URLs, 152 checked, 0 broken
- `npm run check:negative` — OK
- Note: the build prints pre-existing Next.js 15 `themeColor` deprecation warnings (also present in all earlier builds). Not caused by this change; out of scope.

## Correction 1 — Privacy policy and GA4 accuracy: DONE + VERIFIED (11 Nov 2026)

### Actual behaviour, verified from the implementation
Ahmad sent the server's `src/components/AnalyticsConsent.tsx` (5,028 bytes, SHA-256 `5ed5179d095c605fddcd963db66ab9fa40df269516f09b7ca505e062c6fa6f0c`) and `src/components/SiteChrome.tsx` (SHA-256 `636be69e498584beedc8828436127f5b05ec9c7478287db5abce9c73a321b219`). Both files are now in the workspace, byte-identical to the server's copies. The server's SiteChrome differs from the workspace's old copy by exactly 2 lines (import + `<AnalyticsConsent locale={locale} />` after BottomNav) — the workspace is now in sync with production.

Behaviour verified from `AnalyticsConsent.tsx` (GA ID `G-7N3Q6ZC3X1`, hardcoded; consent stored in localStorage under `cekapk-analytics-consent`):
- On load, gtag consent defaults to analytics/ad storage DENIED (functionality + security granted). No GA4 script loads by default.
- Banner shows only when no choice is stored. "Terima analitik" saves "accepted" and loads GA4 (gtag config + `https://www.googletagmanager.com/gtag/js?id=G-7N3Q6ZC3X1`, appended once, id `cekapk-ga4`); a saved "accepted" reloads it on later visits.
- "Tolak cookie opsional" saves "rejected", sets analytics denied + `ga-disable-G-…` = true; no script loads. Ad storage/user data/personalization stay denied in every state.
- **Correction to the earlier report: the "Pengaturan cookie" control DOES exist.** After a choice is stored, a fixed bottom-right "Pengaturan cookie" / "Cookie settings" button appears; tapping it re-opens the banner so the choice can be changed. The earlier live check missed it because it only appears post-choice. The banner's promise is therefore fulfilled.
- The banner is rendered by this component from SiteChrome, so it appears on every page in both locales.

### Wording change (both privacy policies, "Log server, cookie, analitik & iklan" section)
Before (ID): "Saat ini situs ini tidak memakai Google Analytics dan tidak menampilkan iklan pihak ketiga, jadi tidak ada pelacak analitik/iklan yang mengumpulkan datamu."
After (ID): "Situs ini memakai Google Analytics 4 (GA4) untuk memahami kunjungan situs dan meningkatkan halaman, tetapi analitik bersifat opsional: GA4 hanya aktif setelah kamu menyetujuinya melalui spanduk persetujuan ("Terima analitik"). Jika kamu menolak atau belum memilih, GA4 tidak dimuat dan tidak ada data analitik yang dikumpulkan. Pilihanmu disimpan di browser, dan kamu dapat mengubahnya kapan saja melalui tombol "Pengaturan cookie" yang muncul di kanan bawah setelah kamu memilih. Situs ini tidak menampilkan iklan pihak ketiga, jadi tidak ada pelacak iklan yang mengumpulkan datamu."
Before (EN): "The site currently does not use Google Analytics and does not display third-party advertising, so no analytics or advertising tracker collects your data."
After (EN): "This site uses Google Analytics 4 (GA4) to understand website traffic and improve its pages, but analytics is optional: GA4 only activates after you accept it through the consent banner ("Accept analytics"). If you decline or have not chosen yet, GA4 does not load and no analytics data is collected. Your choice is saved in your browser, and you can change it at any time using the "Cookie settings" button that appears at the bottom right after you choose. The site does not display third-party advertising, so no advertising tracker collects your data."
No retention periods, data categories, or other tracking claims were invented — every sentence traces to the source above. The "Future Advertising" section is unchanged (still no ads; the banner is a custom consent UI, not a Google-certified CMP).

### Date line decision
Dates stay "8 November 2026" on both pages. `scripts/check-seo.mjs:39` requires `/8 November 2026/` in privasi; re-dating would fail the suite. Flagged for the owner: the date moves with the next privacy revision that updates the check.

### Banner defect found (not fixed in this round — needs a decision)
The banner's background is semi-transparent live (page text bleeds through). Likely cause, verified in the workspace: the component uses `bg-surface`, `border-line`, and `bg-page` classes, but the project's `tailwind.config.ts` defines NO `surface`, `line`, or `page` colours (and `globals.css` defines no matching variables) — so those classes resolve to nothing and the banner has no opaque background. Fix options: define the three tokens, or change the classes to existing ones (`bg-paper`, `border-border`). Offered as a follow-up; not done here because the brief forbids modifying the GA4 implementation.

### Live evidence trail
- 9 Nov ~19:41 PKT: banner confirmed live on cekapk.com (exact text quoted in the earlier report).
- 9 Nov ~20:04 PKT: server curl of the homepage found no gtag/measurement ID — consistent with consent gating (nothing loads before consent).
- 11 Nov ~11:25 PKT: server search found `AnalyticsConsent.tsx`, the GA4 loader in both layout chunks, measurement ID `G-7N3Q6ZC3X1`.
- 11 Nov ~11:27 PKT: wiring confirmed — server SiteChrome imports + renders it; no "Pengaturan cookie" reference outside the component (that grep only covered other files; the button lives inside the component itself, post-choice).

### Tests (final tree, local, 11 Nov)
- `npx tsc --noEmit` — exit 0
- `npm run build` — clean, 127 static pages, First Load JS 103 kB (unchanged)
- `npm run check:seo` — 73 PASS, all passed
- `npm run check:links` — 114 sitemap URLs, 152 checked, 0 broken, 38 assets
- `npm run check:negative` — OK
- Rendered check (Playwright, 1280×900): both privacy pages × light/dark — new GA4 paragraph renders, old "does not use Google Analytics" claim absent, date line `text-sm text-muted`, no overflow. Screenshots: `~/workspace/cekapk-corrections-screenshots/corr1-<slug>-<theme>.png` (4 files).

### Files changed (Correction 1)
- `src/app/(id)/privasi/page.tsx` — GA4 wording (also carries the Correction 2 date-line fix)
- `src/app/(en)/en/privacy-policy/page.tsx` — GA4 wording (also carries the Correction 2 date-line fix)
- `src/components/AnalyticsConsent.tsx` — NEW in workspace, byte-identical to the server's file
- `src/components/SiteChrome.tsx` — recovered server version (2 lines: import + render)

## Deliverable
- ZIP `CekAPK-PhaseA-Corrections-Corr1-2026-11-11.zip` — the 2 privacy pages + AnalyticsConsent.tsx + SiteChrome.tsx + this notes file. The privacy pages in this ZIP include BOTH corrections (date-line fix + GA4 wording). Deploy order: the Correction 2 ZIP first (11 files), then this ZIP — or this ZIP alone covers the privacy pages, with the other 9 date-line files from the Correction 2 ZIP.
- STOP: no Phase B, no deploy. Awaiting owner review.

## Deploy — 11 November 2026, ~11:53–11:54 PKT (verified live)

Both corrections deployed together in one cycle (shop PC, `C:\Users\TechSOL\Downloads`).

- **Step 1 (PC):** both ZIPs downloaded, hashes verified, scp to `/root/`.
- **Step 2 (server):** `cp -a /root/cekapk /root/cekapk-new`; Corr2 patch unzipped first, then Corr1 on top (order matters — Corr1's privacy pages carry both fixes). Grep checks: GA4 wording 1× in each privacy file, `text-muted` 1× in privasi, `AnalyticsConsent` 2× in SiteChrome.
- **Step 3 (server):** build clean + checks in cekapk-new (per Ahmad's "done").
- **Step 4 (server):** `rm -rf /root/cekapk-old` FIRST (it already existed from the Phase A deploy — without this, `mv cekapk cekapk-old` would nest the folder instead of replacing it), then swap + single `pm2 restart cekapk` (online). Rollback dir `/root/cekapk-old` now holds the Phase A build; Nov 9 snapshot is the deeper safety net.
- **Step 5 (live verification):** direct reads of `/privasi` + `/en/privacy-policy` (fresh crawl 06:53 UTC) + read-only browser check of both pages + homepage — new GA4 wording rendered in both, old "does not use Google Analytics" claim gone, date lines readable (grey-blue, not faint), no overlap/cut-off/horizontal scroll, homepage normal, consent banner "Pilihan privasimu" still visible with both buttons.

**Current live build: Phase 2A Final Wording (Nov 8) + UI-01 Phase A (Nov 9) + Corrections 1+2 (Nov 11). Workspace and production are in sync.**

## Banner background fix — BUILT + VERIFIED locally (11 Nov 2026, NOT deployed)

### Problem (as found 9 Nov, cause confirmed 11 Nov)
The consent banner renders semi-transparent live — page text bleeds through. Cause: `AnalyticsConsent.tsx` used `bg-surface`, `border-line` and `bg-page`, but `tailwind.config.ts` defines none of those colours and `globals.css` defines no matching variables, so the classes resolved to nothing and the banner had no opaque background at all. A source grep on 11 Nov confirmed those three classes existed nowhere else in `src/` — the component was the only place.

### Fix (component-only, no config/CSS change)
Swapped to existing tokens already used by every other card in the codebase (`ui.tsx`, `SearchBox.tsx`, `BottomNav.tsx` all use `border-mist bg-paper`):
- Settings button + banner panel: `border border-line bg-surface` → `border border-mist bg-paper`
- Reject button hover: `hover:bg-page` → `hover:bg-mist`

`bg-paper` is opaque in both themes (`--paper`: #FFFFFF light / #0A111E dark, flips via the existing `.dark` variables in `globals.css`), so the bleed-through is gone in light and dark mode. No behaviour, text, or GA logic touched — the component's consent flow is byte-identical apart from these three class strings.

### Fold-in: `/metodologi-verifikasi` date line
The same `text-ink/50` → `text-muted` one-line edit as Correction 2, on the page the Corr2 notes flagged as out of scope (`src/app/(id)/metodologi-verifikasi/page.tsx:13`). Same measured contrast as the 11 legal pages (4.76:1 light / 7.37:1 dark, AA pass both). Date text unchanged ("8 November 2026").

### Files changed (2)
- `src/components/AnalyticsConsent.tsx` — 3 class strings only
- `src/app/(id)/metodologi-verifikasi/page.tsx` — 1 class only

### Tests (local, 11 Nov)
- `npx tsc --noEmit` — exit 0
- `npm run build` — clean, First Load JS 103 kB (unchanged)
- `npm run check:seo` — 73 PASS, 0 FAIL
- `npm run check:links` — 114 sitemap URLs, 152 checked, 0 broken
- `npm run check:negative` — OK
- Built-CSS proof (not a rendered screenshot — no Playwright in this workspace): `.bg-paper{--tw-bg-opacity:1;background-color:rgb(var(--paper)/...)}` is generated in `.next/static/css/`, `--paper` is opaque in both themes; `border-mist` and `hover:bg-mist` also resolve. A rendered light/dark screenshot check is still worth doing on the live site after deploy.

### Deliverable
- ZIP `CekAPK-PhaseA-Corrections-Banner-2026-11-11.zip` — the 2 changed files + this notes file. Patch ZIP, safe to apply over a copy of the live folder exactly like Corr1/Corr2 (copy → unzip → build → checks → swap). STOP: no deploy until the owner approves. No Phase B.

### Rollback-cover correction (11 Nov ~12:03 PKT)
The note above saying "the Nov 9 snapshot is the deeper safety net" is STALE: that snapshot (taken 9 Nov ~18:54 PKT) lapsed ~18:54 PKT on 10 Nov under the 24-hour rule, no fresh snapshot was confirmed after it, and the 11 Nov Corr1+2 deploy explicitly skipped taking a fresh one. Current rollback cover is the previous build at `/root/cekapk-old` only. The one-off snapshot reminder cron `cekapk-snapshot-reminder-nov11` still runs tonight, 11 Nov at 20:00 PKT — do not send a separate snapshot nudge before then.
