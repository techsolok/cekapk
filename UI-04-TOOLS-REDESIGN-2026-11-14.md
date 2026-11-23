# CekAPK — UI-04 Implementation Report: Tools Pages Redesign

**Preview only. No ZIP created, no deployment, no production access. Workspace only.**
**Baseline verified before editing:** all 20 files in `CekAPK-UI03-Revision1-2026-11-13.zip` (SHA `40f2b176…`) were byte-identical to the workspace, and no source file had changed since the UI-03 Rev 1 deploy (14 Nov 2026, ~12:11 PKT). Work done 14 Nov 2026, afternoon.
**Report file:** `UI-04-TOOLS-REDESIGN-2026-11-14.md`. **Screenshots:** `~/workspace/cekapk-ui04-screenshots/` (32 PNGs).

## 1. Exact files changed (10)

| # | File | What changed |
|---|---|---|
| 1 | `src/components/TiktokTool.tsx` | Shared TikTok tool restyle (see §2B) |
| 2 | `src/components/ui.tsx` | `ToolShell` only: `shadow-sm sm:p-5` added; tint kept |
| 3 | `src/app/(id)/tools/page.tsx` | ID hub: icon tiles on cards, H1 `sm:text-3xl` |
| 4 | `src/app/(en)/en/tools/page.tsx` | **Rebuilt as a real tool directory** (see §2A) |
| 5 | `src/app/(id)/tools/pengunduh-tiktok/page.tsx` | H1 `text-[26px]` → `text-2xl` (standardized) |
| 6 | `src/app/(id)/tools/pengunduh-instagram/InstagramTool.tsx` | Restyle, mirrored with EN (see §2C) |
| 7 | `src/app/(en)/en/tools/instagram-downloader/InstagramToolEn.tsx` | Restyle, mirrored with ID (see §2C) |
| 8 | `src/app/(en)/en/tools/instagram-downloader/page.tsx` | Cross-link fix (see §2C) |
| 9 | `src/app/(id)/tools/pemeriksa-izin/PermissionChecker.tsx` | Upload presentation + states (see §2D) |
| 10 | `scripts/check-seo.mjs` | **One assertion replaced** — explained in §5 |

**Deliberately NOT changed:** all 6 API routes under `src/app/(id)/api/tools/`; all of `src/lib/tools/` (`tiktok.ts`, `instagram.ts`, `ratelimit.ts`, `permissions-dict.ts`); `src/components/AnalyticsConsent.tsx`; `src/components/SiteChrome.tsx`; `src/components/home.tsx` (incl. the homepage downloader); `src/lib/seo.tsx`; `src/app/sitemap.ts`; `src/app/robots.ts`; `src/middleware.ts`; every `.env` file; every other page. No dependency added. Verified by file-mtime scan against the Rev 1 ZIP: exactly these 10 files differ.

## 2. Summary of changes by route

### A. Hub pages — `/tools` and `/en/tools`

- **EN hub rebuilt as a genuine directory.** It no longer embeds the TikTok tool. H1 is now "Free Tools" with a directory intro (translated from the ID hub). Three cards: TikTok Video Downloader → `/en/tools/tiktok-downloader`, Instagram Video Downloader → `/en/tools/instagram-downloader`, App Permission Checker → `/tools/pemeriksa-izin`. Each card has an SVG icon tile (download / camera / shield, from the existing `home.tsx` Icon set), a description, and an "Open Tool" button. The Permission Checker card carries a visible amber note **"Available in Indonesian only for now."** and the page has a matching "Available in Indonesian only for now" section explaining that the checker page, results, guidance and error messages are Indonesian (the OCR itself reads Indonesian + English screenshots). The nested double `ToolShell` is gone. Metadata (title, description, canonical, hreflang, `og:locale en_US`, BreadcrumbList JSON-LD) is byte-identical to before; no FAQ schema was added.
- **ID hub restyled, content unchanged.** Same 3 cards + 3 prose sections + FAQ. Cards now have the same SVG icon tiles and the H1 is standardized to `text-2xl sm:text-3xl`.

### B. TikTok Downloader — `/tools/pengunduh-tiktok` + `/en/tools/tiktok-downloader`

Shared component `TiktokTool.tsx` (both editions at once, via its `lang` prop):

- **Placeholder fixed (audit F4):** the placeholder is now a per-locale string — ID keeps `https://www.tiktok.com/@akun/video/…`, EN now shows `https://www.tiktok.com/@account/video/…`. Verified in rendered HTML: `@akun` appears nowhere on the EN page.
- **Hint line added under the input** (from the page's own guidance): ID "Didukung: tautan video tiktok.com dan tautan pendek vt.tiktok.com." / EN "Supported: tiktok.com video links and vt.tiktok.com short links."
- **Download-option buttons:** the `⬇` emoji is replaced by the shared SVG download icon (`Icon name="download"`). No other emoji remains in the tool's own UI.
- **Error state:** the error title now carries the SVG alert icon in the `--danger` token colour. Challenge, loading and success panels keep their existing classes (the amber/red dark-mode overrides in `globals.css` still apply — verified in dark screenshots).
- **Form controls:** inputs/buttons gained `shadow-sm` for a consistent raised feel; all sizes, labels and behaviour unchanged.
- **H1 standardized:** ID page H1 `text-[26px]` → `text-2xl` (both editions now `text-2xl sm:text-3xl`).
- **Functionality untouched:** same API calls, same error-type mapping (`link_tidak_valid` etc.), same `?url=` auto-submit on mount, same challenge flow, same token handling. Verified by tests in §7.

### C. Instagram Downloader — `/tools/pengunduh-instagram` + `/en/tools/instagram-downloader`

- **Parallel restyle, identical structure in both editions.** Hint line added under the input (ID "Didukung: kiriman video, Reels, dan IGTV publik." / EN "Supported: public video posts, Reels, and IGTV."). Challenge label and error box gained the SVG alert icon (`--warn` / `--danger` tokens). Download button gained the SVG download icon. Inputs/buttons gained `shadow-sm`. All strings, error mappings (`kind` → English in EN, server message in ID) and API calls are byte-identical in behaviour.
- **Cross-link fixed (audit F11):** the EN page's "Open TikTok Downloader →" now points to `/en/tools/tiktok-downloader` (was `/en/tools`).
- **Unification deliberately NOT done:** the two components stay as two files. Reason: `scripts/check-seo.mjs` reads `InstagramToolEn.tsx` by path and pins its English error strings; unifying would force assertion changes for no user-facing gain. The parallel restyle keeps both editions identical in structure, so the next edit can be mirrored the same way. Unification is a separate decision (see §10).

### D. Permission Checker — `/tools/pemeriksa-izin` (Indonesian only, as briefed)

- **Upload presentation:** the file input now sits in a dashed-border box with a styled file button (`file:bg-primary-soft file:text-primary-dark`, 44px) and the guidance text with a file SVG icon. The native input itself is unchanged (same `accept`, same `onChange` preview, same form query) — only its styling wrapper changed.
- **States:** error box gained the SVG alert icon; warning lines lost the `⚠️` emoji in favour of the same SVG alert icon; risk badges, result summary and OCR flow untouched. No English edition added.

## 3. Backend / API contracts — unchanged

- Zero files modified under `src/app/(id)/api/tools/` or `src/lib/tools/`. No request/response format changed: TikTok info still returns the same `error.type` values; Instagram info still returns the same `kind` values; download routes still accept the same token parameters (`t` / `token`, optional `lang=en`); the permissions endpoint still accepts the same multipart `image` field with the same MIME + magic-byte + size rules.
- API tests against the local build confirm the contracts (§7): TikTok invalid URL → 400 `link_tidak_valid`; valid-format TikTok URL → 502 `ekstraksi_gagal` (sandbox TikTok block, expected); bad download token → 410 (English with `lang=en`); Instagram invalid URL → 400; valid Reel URL → 422 `sumber_tidak_terjangkau` / 429 `tantangan` (sandbox Instagram limits); permissions non-image MIME → 400 "Format harus PNG, JPG, atau WebP."; fake PNG bytes with image/png MIME → 400 "File bukan gambar PNG/JPG/WebP yang valid." (magic-byte path proven); valid PNG → 503 "Mesin OCR belum tersedia di server." (tesseract absent in the sandbox — see §9).

## 4. GA4 and consent — untouched

- `AnalyticsConsent.tsx` and `SiteChrome.tsx` are byte-identical to the deployed Rev 1 tree (not in the 10 changed files). No analytics, tracking, cookie or consent code was added anywhere; tool components still never reference `gtag` or consent state. The banner, its `bottom-[72px]` position above the BottomNav, and its in-flow spacer are unchanged.
- Verified in the browser: banner renders on tool pages at 390px (bottom 772px, nav top 787px — 15px gap, no overlap); "Pengaturan cookie" pill present; no JS errors across the error-state flows.

## 5. SEO and metadata preservation

- **Titles, descriptions, canonicals, hreflang, OG/Twitter, JSON-LD, breadcrumbs, sitemap, robots: all preserved.** Rendered checks confirm on every route: reciprocal `hrefLang` (id-ID / en-US / x-default) on both downloader pairs; `og:locale en_US` on all 3 EN tool pages; FAQPage JSON-LD on the 5 tool pages + ID hub; BreadcrumbList on the EN hub (no FAQPage, as before); canonicals unchanged. `check:links`: **115 sitemap URLs / 155 checked / 0 broken / 0 orphans / 0 pages missing canonical.**
- **One deliberate assertion change** (`scripts/check-seo.mjs`, line ~142): the old assertion pinned the EN hub *embedding* the TikTok tool (`lang="en"` in the hub file) — that behaviour was intentionally removed by this redesign, so the assertion would have failed for the right reason. It is replaced by an equally strong assertion pinning the new directory behaviour: the hub links all three tools (`/en/tools/tiktok-downloader`, `/en/tools/instagram-downloader`, `/tools/pemeriksa-izin`), marks the Permission Checker "Indonesian only", and contains no `TiktokTool` embed. No other assertion was touched; nothing was weakened to make a test pass.

## 6. TypeScript / build / test results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | exit 0 |
| `npm run build` | clean (128 pages; First Load JS 103 kB shared) |
| `npm run check:seo` | **All checks passed** (incl. the new hub assertion) |
| `npm run check:links` | **All link checks passed** (115 / 155 / 0 broken / 0 orphans) |
| `npm run check:negative` | OK |

## 7. Functional test results

**Rendered checks (local server, 50 checks): 50/50 pass** (script `/tmp/ui04-checks.py`; run twice — the first run's 7 flags were all investigated and proved to be check-script artefacts: `hrefLang` capital-L rendering, the site-wide header logo, the breadcrumb's legitimate `/en/tools` link, and the permissions route returning 400 — not 422 — for a non-image MIME, which the route source confirms). Final run 48/50 with the last 2 explained by rate-limiting during the test itself; both were then re-proven by direct curl after a server restart (400 MIME message, 400 magic-byte message).

**Browser checks (Playwright, local server): 41 + 5 follow-up = 46 checks, all resolved.** First pass 35/41; the 6 flags were investigated one by one and all proved to be measurement artefacts (wrong `nav` selector, wrong homepage input id, console "Failed to load resource" entries that are the expected API 400/502 responses). Follow-up re-verified with correct selectors: 5/5 pass, including banner-above-nav (772 vs 787px), homepage `#tt-home-url` present, homepage form redirecting to `/tools/pengunduh-tiktok?url=…`, and zero JS page errors across error-state flows.

**Workflows proven end to end (local):** TikTok `?url=` handoff (input auto-filled, tool auto-submits, honest error state); homepage form → tool page redirect; TikTok invalid URL → 400 `link_tidak_valid`; TikTok download token errors (410, English with `lang=en`); Instagram invalid URL → English error box in the browser; Instagram valid-format URL → machine-readable outcome; Permission Checker invalid file → error box in the browser (both MIME and magic-byte paths); keyboard focus lands with a visible 3px outline; reduced-motion renders.

**Not provable from the sandbox (same honest limits as Rev 1):** TikTok download-options *success* path (TikTok serves the sandbox IP a captcha page; info returns `ekstraksi_gagal`); Instagram download *success* path (Instagram limits the sandbox IP); Permission Checker OCR *success* path (tesseract could not be installed — `apt-get update` stalls on the sandbox proxy for 10+ minutes; killed). All three need a phone test after deploy. The code paths are untouched by UI-04, so the risk is limited to pre-existing conditions, not this redesign.

## 8. Screenshots (32 PNGs, `~/workspace/cekapk-ui04-screenshots/`)

- All 7 routes × 1440px light + 390px light (14).
- All 7 routes × 390px dark + TikTok ID & EN hub × 1440px dark (9).
- TikTok ID + EN hub × 768px and 360px light (4).
- Banner-open shots: TikTok tool @390, TikTok tool @390×500, homepage @390×500 (3).
- State shots: TikTok `?url=` handoff @390, EN Instagram invalid-URL error @1440 (2).
- Overflow: **0px horizontal overflow on every route at 1440 / 768 / 390 / 360, light and dark.**
- Visually inspected: EN hub directory (clean, 3 icon cards, Indonesian-only note in amber), ID TikTok form (hint line, raised panel), Permission Checker upload box (dashed border, styled file button), dark-mode TikTok @390 (readable, amber callout flips correctly), EN Instagram error state (alert icon + English message).

## 9. Known issues / incomplete items

1. **Homepage keyboard-open static case (Rev 1 Check 4, unchanged):** at 390×500 with the banner open and *no scrolling*, the homepage downloader input is 0/52px visible (it sits below the fold at top 1146px). Tapping it scrolls it fully into view (52/52px, top 224px) — the interaction works; only the static no-scroll frame is hidden. UI-04 did not touch the homepage downloader or the banner, so this is **not a regression and not fixed** — it stays an open item for a future homepage/banner decision.
2. **Tool page at 390×500, banner open:** fully visible (52/52px, top 426px) — no issue.
3. **Success paths unproven from the sandbox** (see §7): TikTok download options, Instagram download, Permission Checker OCR. All need a phone test after deploy.
4. **Native file-button label** ("Choose File" / "No file chosen") follows the visitor's browser language, not the page language — standard native-control behaviour, not a defect.
5. **Header logo `⬇` emoji remains site-wide** (UI-01 F2). The tool pages themselves are now emoji-free (except the BottomNav emoji icons, which are site chrome, not tool UI). Replacing the logo is Phase B work, out of UI-04 scope.
6. **Instagram components not unified** (see §2C) — deliberate, deferred to a separate decision.

## 10. Recommendations requiring separate approval

1. **HowTo schema on tool pages + per-tool OG images** — both were audit opportunities, explicitly held back by the brief (§5). Either can be added in a follow-up with its own review.
2. **English Permission Checker** — deferred by the brief; needs translated UI copy + risk text (the OCR dictionary already reads English).
3. **Instagram component unification** (one `lang`-prop component) — needs the `check:seo` assertion that pins `InstagramToolEn.tsx` by path to be moved/rewritten at the same time.
4. **Instagram `info_success` analytics gap** (audit F8) — deferred; the route drops those events today.
5. **Header logo SVG mark** (UI-01 Phase B) — the last emoji in the tool pages' chrome.

**Awaiting Ahmad's review. No ZIP prepared, nothing deployed, production untouched.**
