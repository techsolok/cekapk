# SEO-18 — Complete English Localization of TikTok Video Downloader

**Date:** 7 Nov 2026. **Status: BUILT + VERIFIED LOCALLY, FINAL CORRECTIONS APPLIED. NOT DEPLOYED — awaiting Ahmad's explicit approval (brief §12, and the corrections brief).**
**Corrections (7 Nov evening):** hub meta description + header sentence fixed (unconditional no-watermark claim removed); deployment procedure revised to build-separately-then-switch; re-verified (build clean, check:seo 41/41, crawler 107 URLs 0 broken, smoke 37/38). ZIP rebuilt with the same name — it supersedes the earlier download.
**Package:** `CekAPK-Deploy-SEO18-TikTok-EN-2026-11-07.zip` (complete production deployment artifact — the full project, same recipe as SEO-17).

## 1. Implementation status
Complete. New dedicated English route, fully translated tool interface, 9 content sections, 8 FAQs, reciprocal hreflang, sitemap inclusion, og:locale fix on the three English tool routes, coverage matrix updated. Build clean, check:seo 41/41 PASS, check:links 0 broken / 0 orphans, 36/37 local smoke checks pass (the 1 failure is the live-extraction test — see §14).

## 2. New English URL
`https://cekapk.com/en/tools/tiktok-downloader`

## 3. Existing Indonesian URL (unchanged, still functional)
`https://cekapk.com/tools/pengunduh-tiktok` — its page is untouched except for the added reciprocal hreflang; its tool renders in Indonesian exactly as before (verified locally).

## 4. SEO title and description
- **Title (rendered):** `TikTok Video Downloader — Download Public Videos Online | CekAPK` (page code omits the suffix; the EN layout template appends ` | CekAPK`).
- **Meta description (154 chars, the brief's suggested text verbatim):** "Use CekAPK's TikTok video downloader to process supported TikTok video links. Paste a link, preview available details, and download using our online tool."

## 5. Keywords targeted
- Primary: **TikTok video downloader**
- Secondary: Download TikTok videos; TikTok downloader online; TikTok video download online; Online TikTok video downloader
- "Download TikTok without watermark" is NOT targeted as a keyword. The no-watermark option is described honestly and conditionally ("offered whenever TikTok's public page provides a no-watermark file for that video"), because the tool only shows what the source provides.

## 6. Content sections and FAQ count
**9 sections:** 1. Download TikTok Videos Online · 2. How to Use the TikTok Video Downloader (5 steps, per the brief, adjusted to the actual interface: Paste button + Get Video) · 3. Supported TikTok Links · 4. How the Download Process Works · 5. Features of CekAPK TikTok Downloader · 6. Supported and Unsupported Content · 7. Troubleshooting Download Problems · 8. Responsible Use and Copyright Considerations · 9. Frequently Asked Questions.
**8 FAQs** (the brief's 8 suggested questions): how to download; is it free; install needed; login needed; which links are supported; why a video is not downloading; private videos; legality. All answers are based on verified functionality (see §9). FAQPage JSON-LD emitted (8 questions, matches the visible list). Plus an honest-limit callout box and a "Next tool: Instagram Downloader" section.

## 7. Files created and modified (11)
1. **NEW** `src/app/(en)/en/tools/tiktok-downloader/page.tsx` — dedicated EN page (metadata, 9 sections, 8 FAQs, BreadcrumbList + FAQPage JSON-LD, internal links).
2. **MOD** `src/components/TiktokTool.tsx` — `lang` prop (`"id" | "en"`, default `"id"`); all UI strings in a per-language table; English error text mapped by machine-readable `error.type`; English download-option labels mapped by `kind`; download links gain `&lang=en` when `lang="en"`. Logic, rate limits, challenge flow and tokens unchanged.
3. **MOD** `src/app/(en)/en/tools/page.tsx` (EN hub) — embeds `<TiktokTool lang="en" />` (was Indonesian); links to the new dedicated page; metadata `locale: "en_US"`.
4. **MOD** `src/app/(id)/tools/pengunduh-tiktok/page.tsx` — reciprocal hreflang (id-ID / en-US / x-default) gated by `hasEnTool("pengunduh-tiktok")`.
5. **MOD** `src/lib/data/i18n-en.ts` — TikTok added to `enTools` (`pengunduh-tiktok` → `/en/tools/tiktok-downloader`).
6. **MOD** `src/app/(id)/api/tools/tiktok/download/route.ts` — optional `?lang=en` returns English plain-text errors (5 messages). Token verification, session lookup, rate limits and streaming untouched.
7. **MOD** `src/lib/seo.tsx` — `pageMetadata` accepts an optional `locale` (default `site.locale` = `id_ID`).
8. **MOD** `src/app/(en)/en/tools/instagram-downloader/page.tsx` — metadata `locale: "en_US"`; SEO-17 step-1 nit fixed ("video, Reel, or video post" → "video or Reel").
9. **MOD** `scripts/check-seo.mjs` — 6 new SEO-18 checks (now 41 total); EN coverage comment updated (11 apps + 6 guides + 2 tools).
10. **MOD** `en-coverage-matrix.md` — TikTok downloader complete; total **11 apps + 6 guides + 2 tools = 19 translated pages**; Tools row now 2 complete / 2 not translated.
11. **NEW** this notes file.

## 8. Backend/API changes, if any, with justification
- **Only one:** the TikTok download route accepts `?lang=en` and returns its 5 plain-text error messages in English (same pattern as the Instagram download route in SEO-17). Justification: download errors are plain text shown directly to the user, so the English interface needs English errors. Message language only.
- **No other backend change.** The info API (`/api/tools/tiktok/info`) is untouched — the English component maps its machine-readable `error.type` to English text in the frontend, as the brief requires. No duplicate extraction service, no new endpoints, no change to URL validation, rate limits, challenge, tokens, session handling, or streaming.

## 9. Security protections preserved (verified in source, `src/lib/tools/tiktok.ts`)
- URL validation: only hosts `tiktok.com`, `www.tiktok.com`, `m.tiktok.com`, `vt.tiktok.com`, `vm.tiktok.com`; full links must match `/video/<6+ digits>` or `/photo/<digits>`; short links must be vt/vm.
- Rate limits: info 12 requests/min per IP (`checkInfoRate`); hourly download limit (`checkDownloadLimit`); both via the shared store (Upstash if configured, else in-memory).
- Challenge: arithmetic challenge (5-minute, IP-bound HMAC token) when the rate threshold is crossed.
- Download tokens: HMAC-SHA256, 10-minute expiry, session-bound (`sid` + `kind` + `vid`).
- Session: in-memory only, 10 minutes; TikTok CDN session cookies are held server-side only — media addresses are never handed to the browser; the token contains only a session reference.
- No file storage: streaming pass-through, `Cache-Control: no-store`; logs hold anonymous metadata only (time, success/failure, error type — never the full URL), matching the privacy page.
- No login anywhere: the workflow never asks for TikTok credentials; the tool reads only public page data. Private, friends-only, and deleted videos are refused with a plain explanation.
- Claims kept honest: no-watermark is offered only when TikTok's public page provides it; audio MP3 only when the source provides an audio stream; photo posts are accepted as links but produce the "no downloadable file" error. No claim of unlimited downloads, private-video support, or a TikTok affiliation (the page states it is not affiliated with TikTok or ByteDance).

## 10. Build results
- `npm run build` — clean, exit 0. New route prerendered: `/en/tools/tiktok-downloader`. Only warning: the known pre-existing "Unsupported metadata themeColor" warning from the root layout (also on the Instagram page and hub; not from new code, does not block the build).

## 11. SEO validation results
- `npm run check:seo` — **41/41 PASS** (35 from SEO-17 + 6 new SEO-18 checks).
- Local smoke test (production server, port 3100) — **36/37 checks pass** (script `/tmp/smoke-seo18.py`, re-runnable). Verified: HTTP 200; exact title/H1/meta; canonical = og:url; og:locale `en_US` on the new page, hub and Instagram page (and `id_ID` still on the ID page); hreflang 3 lines both directions; `lang="en"`; FAQPage JSON-LD 8 questions; BreadcrumbList; 9 content sections + next-tool block; English form label; zero Indonesian tool strings on EN pages; ID page still Indonesian; hub links to the new page; sitemap lists the new URL; download-route EN/ID 410s; info API returns `kind: "link_tidak_valid"` for a bad URL; no `noindex`; server log clean.

## 12. Sitemap URL count
**107 sitemap URLs** (was 106 after SEO-17; +1 = the new EN TikTok page). en.xml 20 → 21 (the new URL is added automatically via the `enTools` mapping — no manual sitemap edit).

## 13. Broken-link and orphan-page results
`npm run check:links` — **107 sitemap URLs, 143 checked, 0 broken, 0 orphans, 0 content-not-in-sitemap, 0 missing canonical, 0 missing img alt.** Report: `link-audit-2026-11-07.md` (overwritten by this run).

## 14. Remaining limitations
- **Live TikTok extraction NOT verified (same status as Instagram's Reel extraction).** Two different public videos (Charli D'Amelio 7199302654904862978 and @tiktok 7106590770260288134 — both confirmed public via TikTok's oEmbed endpoint, HTTP 200) were submitted to the local info API and both returned `ekstraksi_gagal`: the video is found, but TikTok serves the sandbox a captcha/challenge page (18× "captcha" in the fetched HTML) with no `downloadAddr`/`playAddr`, so no downloadable file is exposed. This is TikTok's anti-bot block on the sandbox's datacenter IP, not a code defect — SEO-18 changed no extraction code, and Fase 2 proved the same code extracts a real MP4 end-to-end. **Whether the live Hostinger server is also challenged is unknown; Ahmad's phone test after deployment is the real proof.** Do not claim live TikTok extraction works until that test passes.
- **Hub no-watermark claim — FIXED in the final corrections (7 Nov evening).** The EN hub's meta description and its visible header paragraph both stated no-watermark downloads unconditionally. Both now say the download options are the ones the source provides (see the corrections section below).
- **og:locale on other EN pages.** The fix covers the three English tool routes named in the brief (new TikTok page, Instagram page, hub). Other English pages (apps, guides, home) still emit `og:locale id_ID` from the shared `pageMetadata` default — the `locale` param now exists to fix them the same way in a later batch.
- **SEO-17 leftovers (unchanged):** hreflang curl output, phone Reel test, post-deploy snapshot, GSC indexing for the Instagram EN page (requested 7 Nov ~22:14, "URL is not on Google" — expected, flips in ~1 day).

## 15. Deployment package name
`CekAPK-Deploy-SEO18-TikTok-EN-2026-11-07.zip` — **a complete production deployment artifact** (the full project at this phase, same recipe as every earlier deploy ZIP), NOT a patch. Extract one ZIP only, never layer ZIPs.

## 16. Exact deployment instructions — REVISED SAFE PROCEDURE (7 Nov evening, supersedes the earlier overwrite-first version)

The old procedure copied the new files over the live app BEFORE building, so a failed build could leave the live site broken. The revised procedure builds the new version in a separate directory, verifies it, and only then switches production. No PM2 restart happens until the new build is ready.

**Recorded baseline (from the real 30 Oct setup, DEPLOY-HOSTINGER.md):** live app directory `/root/cekapk`; PM2 app `cekapk`, started as `pm2 start npm --name cekapk -- start` with cwd `/root/cekapk`; no ecosystem file; no symlink-based deployment configured in any guide. **The swap step below depends on that structure — confirm it first with the inspection in step 0. If the output differs, STOP and report; do not run the swap.**

**Step 0 — Inspect the live structure first (server window, `root@srv2112435`):**
```
ls -ld /root/cekapk /root/cekapk-new; readlink -f /root/cekapk
pm2 show cekapk | grep -E "script path|script args|exec cwd|exec mode|status"
df -h /root
ls /root/ | grep -E "cekapk"
```
Expected: `/root/cekapk` is a real directory (not a symlink — `readlink -f` prints `/root/cekapk`); PM2 exec cwd `/root/cekapk`, script `npm`, args `start`; enough free disk for two extra app copies (~1.2 GB).

**Step 1 — Snapshot first (hPanel):** fresh manual snapshot before the deploy (complete backup; the pre-SEO-17 snapshot predates SEO-17).

**Step 2 — Back up the live app (server window):**
```
cp -a /root/cekapk /root/cekapk-backup-2026-11-07
cp /root/cekapk/.env.local /root/.env.local.bak
```
The `cp -a` copy includes node_modules and `.env.local`, so it is directly runnable for rollback. The live directory itself is never edited.

**Step 3 — Upload (home PC PowerShell):**
```
cd "C:\Users\Ahmad Razza\Downloads"
dir CekAPK-Deploy-SEO18-TikTok-EN-2026-11-07.zip
scp CekAPK-Deploy-SEO18-TikTok-EN-2026-11-07.zip root@72.61.127.96:/root/
```

**Step 4 — Extract and build separately (server window). The live app is untouched:**
```
rm -rf /root/cekapk-new && unzip -q CekAPK-Deploy-SEO18-TikTok-EN-2026-11-07.zip -d /root/cekapk-new && cp /root/.env.local.bak /root/cekapk-new/.env.local && cd /root/cekapk-new && npm install && npm run build
```
The ZIP's `.env.local` holds only the public site URL and is overwritten by the server's real `.env.local` before building. **If the build fails, STOP here — the live site is untouched and still running; there is nothing to roll back.**

**Step 5 — Verify the new build BEFORE switching (server window):**
```
cd /root/cekapk-new && PORT=3100 npx next start -p 3100 &
curl -s http://localhost:3100/en/tools/tiktok-downloader | grep -o "<title>[^<]*"
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/en/tools
fuser -k 3100/tcp
```
Proceed only if the title is `TikTok Video Downloader — Download Public Videos Online | CekAPK` and the hub returns 200.

**Step 6 — Switch production (server window, only after step 5 passes):**
```
mv /root/cekapk /root/cekapk-old-2026-11-07 && mv /root/cekapk-new /root/cekapk
pm2 restart cekapk
```
PM2's cwd is the `/root/cekapk` path, so the restart picks up the new directory. This is the FIRST and only PM2 restart in the procedure.

**Step 7 — Verify live:** `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/en/tools/tiktok-downloader` (expect 200) + browser checks (new page, hub English tool, hreflang via server curl on both TikTok pages, GSC indexing request for `https://cekapk.com/en/tools/tiktok-downloader`, phone test with a public TikTok video you own or have permission to download, fresh post-deploy snapshot).

**Step 8 — Cleanup (only after live verification):** keep `/root/cekapk-old-2026-11-07` until the new version is confirmed live; then `rm -rf /root/cekapk-old-2026-11-07 /root/cekapk-backup-2026-11-07` to reclaim disk.

## 17. Backup and rollback commands
- **Before deploy:** hPanel snapshot (step 1) + `cp -a /root/cekapk /root/cekapk-backup-2026-11-07` + `/root/.env.local.bak` (step 2). The ZIP in the home PC Downloads folder is also a rollback copy.
- **If the build fails (steps 4–5):** nothing to roll back — the live app was never touched.
- **If the new version misbehaves after the switch (step 6):**
  ```
  mv /root/cekapk /root/cekapk-bad-2026-11-07 && mv /root/cekapk-old-2026-11-07 /root/cekapk && pm2 restart cekapk
  ```
  The old directory is a complete runnable copy (including `.env.local` and node_modules), so no `npm install` is needed. Or restore the hPanel snapshot (~30 min restore).
- **Secrets:** `.env.local` is copied from the server's own backup, never from the ZIP and never edited in place; the live `.env.local` is never overwritten. No secret is printed or pasted anywhere in this procedure.

## FINAL CORRECTIONS (7 Nov 2026 evening)

### 1. Hub description — old vs new
- **Old meta description:** "Free online tools from CekAPK: download public TikTok videos without a watermark. No login, no stored files, honest error messages." (unconditional no-watermark claim — inaccurate.)
- **New meta description:** "Download supported public TikTok videos online with CekAPK. Paste a video link, preview available details, and access the download options provided by the source." (the brief's exact text; verified in the rendered `<meta name="description">` of `/en/tools`.)
- **Same claim in visible copy — also fixed (one sentence, same page):** the hub's header paragraph said "download the video without a watermark (or as audio)". It now reads: "Paste a public TikTok link, preview the available details, and access the download options the source provides — no-watermark video when TikTok provides it, standard video, or audio. Files stream through our server and are never stored. Private or deleted videos return an honest explanation instead of a fake button." No other hub content was changed.
- **Files modified for this correction:** `src/app/(en)/en/tools/page.tsx` only (description + header sentence).

### 2. Deployment safety — revised
The procedure in §16 was rewritten as above: build separately, verify, then switch; backup first; rollback commands included; PM2 restarts only after the new build is verified. The directory-switching step is grounded in the recorded Oct 30 baseline (live dir `/root/cekapk`, PM2 `pm2 start npm --name cekapk -- start`, cwd `/root/cekapk`, no ecosystem file, no symlink in any guide) and is gated on the step-0 inspection confirming that structure is still current.

### 3. Final verification (after the corrections)
- `npm run build` — clean, exit 0. New route prerendered: `/en/tools/tiktok-downloader`. (Only the known pre-existing themeColor warning from the root layout.)
- `npm run check:seo` — **41/41 PASS** (count unchanged; no new checks were added).
- `npm run check:links` — **107 sitemap URLs, 143 checked, 0 broken, 0 orphans.**
- Local smoke test (production server, port 3100) — **37/38 pass.** The new check "EN hub description corrected" passes (new description present, "without a watermark" absent from the whole hub page). The single remaining failure is the live-extraction test — TikTok serves the sandbox a captcha page (see §14); unchanged and pre-existing.
- Confirmed: updated hub description (rendered meta), all 41 SEO checks, sitemap (107 URLs, en.xml 21), canonical, hreflang both directions, existing TikTok functionality (ID page still Indonesian; info API error kinds; download-route EN/ID 410s).

### 4. Confirmation: SEO-17 + SEO-18 both included
Both are present in this package and verified: SEO-17 (English Instagram downloader — page, component, hreflang, sitemap, checks) and SEO-18 (English TikTok downloader — page, localized shared component, hreflang, sitemap, checks). check:seo passes all 5 SEO-17 checks and all 6 SEO-18 checks. This ZIP is a **complete production deployment artifact** (the full project), not a patch.

### 5. Final ZIP
`CekAPK-Deploy-SEO18-TikTok-EN-2026-11-07.zip` — **rebuilt with the same name after the corrections; it supersedes the earlier download of the same name.** 266 files. Verified: all changed files present, no node_modules/.next/.git/ZIPs. **NOT deployed — awaiting Ahmad's explicit approval.**

## SEO-17 presence (brief §11)
SEO-17 changes ARE present in this project and in this package: the English Instagram downloader page/component, its hreflang/sitemap/checks, and its deploy are all in the tree and verified by check:seo (the 5 SEO-17 checks pass). Nothing is silently omitted and no incomplete packages are combined.
