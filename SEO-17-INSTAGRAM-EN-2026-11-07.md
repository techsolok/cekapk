# CekAPK SEO-17 — English Instagram Downloader Page — Build Notes
**Date:** 2026-11-07 (evening) · **Status:** BUILT + VERIFIED locally · **NOT deployed** — deploy needs Ahmad's go-ahead.

## What was built
A fully localized English version of the Instagram video/Reels downloader at the brief's suggested route:

**https://cekapk.com/en/tools/instagram-downloader**

- Title (rendered): `Instagram Video Downloader — Download Public Reels Without Login | CekAPK` — exactly the brief's suggested title (the code title omits the suffix; the EN layout template appends ` | CekAPK`).
- Meta description: the brief's exact text.
- Primary keyword "Instagram video downloader" + all 6 secondary keywords used naturally in the title, H1, intro, steps, FAQs and section copy.
- Page structure mirrors the Indonesian page: header + intro, tool, 6 how-to steps, "Why This Tool Is Built Differently" (3 paragraphs), 7 FAQs with FAQPage JSON-LD, BreadcrumbList JSON-LD, next-tool link to the TikTok downloader (EN hub `/en/tools`).
- The English tools hub (`/en/tools`) now links to the new English page instead of the Indonesian one; the "Indonesian interface for now" note is gone for Instagram (permission checker still Indonesian-only).

## Route decision (Phase 1)
The suggested route `/en/tools/instagram-downloader` fits and was used. The alternative — embedding the tool on the `/en/tools` hub like TikTok — does not work: a dedicated page is the only way to give it its own SEO title, meta description and canonical. The hub can't be two tools' pages at once.

## Backend: unchanged, except error-text language
- Same endpoints: `POST /api/tools/instagram/info` (yt-dlp extraction, 10 req/min rate limit, arithmetic challenge, HMAC token, 10-min expiry) and `GET /api/tools/instagram/download`. No logic, rate limit, token or download-mechanism change.
- New English tool component `InstagramToolEn.tsx`: all UI strings in English. Server error messages arrive in Indonesian, so the client maps the machine-readable `kind` (`ditolak`, `tautan_privat`, `tautan_tidak_ditemukan`, `sumber_tidak_terjangkau`, `terlalu_sering`, `tantangan`) to English text. Unknown kinds fall back to a generic English message, never to Indonesian text.
- One minimal server change: the download route accepts `?lang=en` and returns English plain-text errors (expired token, invalid URL, disallowed host, rate limit, upstream failure). Default (no `lang`) stays Indonesian. Message language only.

## Phase 1 finding — the TikTok tool is NOT actually localized
The component embedded on the English tools page (`TiktokTool.tsx`) still shows Indonesian UI ("Tempel link video TikTok", "Ambil Video", "Satu langkah keamanan", …). The earlier record "TikTok downloader EN complete" means the English hub page exists, not that the tool speaks English. There was no true tool-localization pattern to copy; SEO-17 establishes it (English tool component + kind-mapped errors + `lang=en` download errors). The TikTok tool was left as-is; fixing it is a separate decision. `en-coverage-matrix.md` was corrected: TikTok is now "partial", Instagram "complete", coverage 11 apps + 6 guides + 1 tool = **18 translated pages**, shortlist renumbered (Chrome/Facebook/Gmail/Maps now #1).

## Files changed (9)
1. `src/app/(en)/en/tools/instagram-downloader/page.tsx` — NEW: EN page (title/meta/hreflang, steps, why-different, 7 FAQs, JSON-LD).
2. `src/app/(en)/en/tools/instagram-downloader/InstagramToolEn.tsx` — NEW: English tool component (same API calls).
3. `src/lib/data/i18n-en.ts` — NEW `enTools` mapping (`pengunduh-instagram` → `/en/tools/instagram-downloader`) + `hasEnTool` / `getEnToolPath` helpers (explicit mapping because tool slugs differ between editions, unlike apps/guides which share slugs).
4. `src/app/(id)/tools/pengunduh-instagram/page.tsx` — reciprocal hreflang (id-ID + en-US + x-default), gated by `hasEnTool`.
5. `src/app/(en)/en/tools/page.tsx` — hub links Instagram to the new EN page.
6. `src/app/sitemap.ts` — en segment now maps `enTools` (en.xml 19 → 20 URLs).
7. `src/app/(id)/api/tools/instagram/download/route.ts` — `lang=en` plain-text errors (message language only).
8. `scripts/check-seo.mjs` — 5 new SEO-17 parity checks (total 30 → 35); also fixed a stale comment (EN coverage is now 11 apps + 6 guides + 1 tool).
9. `en-coverage-matrix.md` — Tools section, summary, shortlist, notes (see above).

## Verification (local, 7 Nov 2026)
- Build: clean; new route prerendered (`/en/tools/instagram-downloader`, 2.06 kB). (The `themeColor` warning is pre-existing, from the root layout metadata export — same as the EN guide pages.)
- `check:seo`: **35/35 PASS** (5 new SEO-17 checks pass).
- `check:links`: **106 sitemap URLs** (en.xml 20), 142 checked, 0 broken, 0 orphans, 0 no-canonical.
- Local production-server smoke test (port 3100): EN page HTTP 200 — title/H1 exact, canonical = og:url = `https://cekapk.com/en/tools/instagram-downloader`, hreflang id-ID + en-US + x-default, FAQPage JSON-LD, all 7 FAQs present, English form labels; ID page emits the reciprocal en-US alternate; EN hub links to the new page and no longer says "Indonesian interface for now"; sitemap en.xml lists the new URL; download route `?token=bad&lang=en` → English 410, without `lang` → Indonesian 410; info API `POST` with an invalid URL → `kind: "ditolak"` (endpoint wiring works; the EN client maps this kind to English text). Server log: no errors (only the expected `tool_error` event from my own bad-URL test).

## Honest limits
- **Live Instagram extraction is NOT verified from the sandbox** (same as TikTok/Instagram before it): yt-dlp + Instagram reachability can only be proven by a real Reel on the live site. The page, metadata, sitemap, API wiring and error mapping are verified; the extraction itself needs Ahmad's live smoke test after deploy (a public Reel URL, on his phone).
- **Built from the visible part of the spec.** Ahmad's brief message arrived cut off at `### Page`; the build follows the visible objective + Phase 1 + Phase 2 (title/meta/keywords) and mirrors the Indonesian page's structure (steps, why-different, FAQs). If the cut-off part changes anything, it will be adjusted before deploy.
- The download link renders only after a successful info lookup (same as the Indonesian page) — by design.

## Deploy (Ahmad's step — NOT run)
Standard procedure, same as SEO-16. **Fresh Hostinger snapshot first** (the 11:57 snapshot lapses ~Nov 8 ~11:57; take a new one after this deploy). Home PC PowerShell window for the upload, server window (`root@srv2112435`) for the rest, one block at a time:

```powershell
cd "C:\Users\Ahmad Razza\Downloads"
scp CekAPK-Deploy-SEO17-Instagram-EN-2026-11-07.zip root@72.61.127.96:/root/
```

```bash
cd /root && cp cekapk/.env.local /root/.env.local.bak && rm -rf /root/cekapk-new && unzip -q CekAPK-Deploy-SEO17-Instagram-EN-2026-11-07.zip -d /root/cekapk-new && cp -r /root/cekapk-new/. /root/cekapk/ && cp /root/.env.local.bak /root/cekapk/.env.local && cd /root/cekapk && npm install && npm run build
```

```bash
pm2 restart cekapk
```

After deploy, verify live: the new EN page loads with correct title/H1/FAQs; the ID page's hreflang; `/en/tools` links to the new page; then GSC indexing request for `https://cekapk.com/en/tools/instagram-downloader`, a live Reel smoke test on a real phone, and a fresh post-deploy snapshot.

## ZIP
`CekAPK-Deploy-SEO17-Instagram-EN-2026-11-07.zip` — complete project snapshot (same recipe as SEO-16). Contains all 9 changed files; no `node_modules`/`.next`; its `.env.local` holds only the public site URL (the deploy block restores the server's real `.env.local` from backup after copying).
