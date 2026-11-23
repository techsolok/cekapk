# CekAPK — Bstation SEO Improvement (Preview Only)

**Date:** 14 November 2026
**Page:** `/aplikasi/bstation` (Indonesian) + mirrored English `/en/aplikasi/bstation`
**Mode:** Audit, implementation and preview only. **No production access, no deploy, no ZIP deployed.** Stops here — deploy only on Ahmad's approval.
**Baseline:** workspace = deployed UI-05 Phase B+C tree (BUILD_ID `8vim2QAI_339OOz8QdQ-A`, built 14 Nov ~14:46). No src file had changed since that deploy before this work began.
**Evidence sources (all read 14 Nov 2026):**
- Google Play listing `com.bstar.intl` — title "BiliBili -HD Anime, Videos", price 0 USD, rating 4.2 (885,213 ratings — **not** printed on the page, per site rule), "TOP 1 Anime Platform in Southeast Asia, with the 2000+ licensed anime titles", "multilingual support", "watch some of them for free".
- Play listing "About the developer" (confirmed in several independent crawls, latest listing update 1 Jun 2026): **BALABOOM PTE. LTD., bilibiliintl@gmail.com, 11 Collyer Quay #17-00 The Arcade, Singapore 049317.**
- Official Bstation about page `https://www.bilibili.tv/id/about` — "Bstation, terlahir dari keinginan kita bersama… platform terkemuka dengan koleksi anime terlengkap"; "Bstation kini juga tersedia di Indonesia, Filipina, Thailand, Vietnam, Singapura, dan Malaysia. Di Indonesia, kami dikenal sebagai Bstation."; "Episode baru anime dirilis setiap hari"; "Konten bervariasi di setiap wilayah dan dapat berubah sewaktu-waktu."; hybrid OGV + UGC platform.
- Premium-benefit detail (ad-free, early simulcast, offline downloads, 1080p/4K) appears **only** on third-party top-up reseller pages (BitTopup, Lapakgaming, VCGamers, GGWP) — **not** on either official source checked. The page therefore does not assert those specifics; see §2.

## 1. Task 1 — Metadata proposal: evaluation

### 1.1 Title

| | Text | Chars |
|---|---|---|
| **Current (template)** | `Bstation (Bilibili) APK Terbaru 2026 - Info, Versi & Link Resmi` | 63 |
| **Proposed** | `Bstation: Anime, Fitur, Harga & Keamanan \| CekAPK` | 49 |
| **Rendered after fix** | `Bstation: Anime, Fitur, Harga & Keamanan \| CekAPK` | 49 |

- **Length:** 49 chars — comfortably inside the ~60-char display range; no truncation risk. The current 63-char title (72 with the layout suffix) is over the range and gets cut.
- **Keyword placement:** "Bstation" is the first word — the primary query `bstation` is front-loaded. "Anime" is the second token, matching the page's subject and the GSC query context.
- **Relevance:** the current title is actively misleading for this page: "APK" (the page offers no APK file — the button goes to Play Store), "Terbaru 2026" and "Versi" (the page deliberately prints no version number). The proposed title drops all three and names the page's real coverage: Anime, Fitur, Harga, Keamanan.
- **"Harga" note:** the page lists no price figure (deliberately — prices live in the app). "Harga" here means the free-vs-Premium cost model, which the page explains; the description makes that explicit ("biaya gratis dan Premium"). Acceptable, and better than "Versi".

**Important implementation finding — title template:** both layouts carry `title: { template: '%s | CekAPK' }`, so the layout appends ` | CekAPK` to every page title. Storing the proposal verbatim in `seoTitle` would have rendered `… | CekAPK | CekAPK` (58 chars, duplicated brand). The fix stores `seoTitle` **without** the suffix — `"Bstation: Anime, Fitur, Harga & Keamanan"` (40 chars) — so the rendered `<title>` is exactly the proposed 49-char title. This matches the existing Phase 2A precedent (Kucing's `seoTitle` is also stored without the suffix).

### 1.2 Meta description

| | Text | Chars |
|---|---|---|
| **Current (template)** | `Nonton anime berlisensi dengan subtitle Indonesia - gratis dan legal. Info lengkap Bstation (Bilibili): izin aplikasi, keamanan, dan link ke sumber resmi. Dicek 2026-10-18.` | 172 |
| **Proposed (final, 14 Nov evening)** | `Bstation (Bilibili) adalah aplikasi streaming anime dengan subtitle Indonesia. Pelajari fitur, biaya gratis dan Premium, izin aplikasi, dan keamanan.` | 149 |

- **Length:** 149 chars — inside the typical ~155–160-char desktop display range; no truncation risk. (The first draft of this preview used a 174-char version whose tail clause "serta link Play Store resmi" could have been cut; Ahmad replaced it with this 149-char version as a final correction.)
- **Readability:** one clear definition sentence + one "Pelajari…" invitation listing exactly what the page covers. No keyword stuffing — "Bstation" appears once, "Bilibili" once.
- **Keyword placement:** the primary query opens the description.
- **Trimmed alternative (offered, not applied):** `Bstation (Bilibili) adalah aplikasi streaming anime dengan subtitle Indonesia. Pelajari fitur, biaya gratis dan Premium, izin aplikasi, dan keamanan.` — 149 chars, fits the display range, but drops the Play Store link mention. Say the word and I will swap it in.

**Final correction (14 Nov evening): Ahmad chose the trimmed version above — it is now the implemented description (149 chars, verified rendered).**

### 1.3 Open Graph / Twitter consistency

`pageMetadata` (`src/lib/seo.tsx`) builds OG and Twitter title/description from the **same** strings as `<title>`/`<meta name="description">`, so the override flows to all four automatically — verified rendered:
- `og:title` = `Bstation: Anime, Fitur, Harga & Keamanan` (40 chars, no layout suffix — same pattern as every other page), `og:description` = proposed description, `og:locale` = `id_ID`, `og:url` = canonical.
- `twitter:title` / `twitter:description` identical to OG. Card `summary_large_image`, dynamic OG image unchanged.
- Canonical `https://cekapk.com/aplikasi/bstation` and hreflang (`id-ID`, `en-US`, `x-default`) byte-identical before/after. Robots unchanged (`index, follow`).

## 2. Task 2 — Content accuracy: findings and corrections

| # | Claim (before) | Verdict | Evidence | Fix applied |
|---|---|---|---|---|
| A1 | Developer: "Bilibili (Bstation)" — and install step 2 tells the reader to check that the developer name is "Bilibili (Bstation)" | **WRONG** | Play Store "About the developer": **BALABOOM PTE. LTD.** (Singapore address, bilibiliintl@gmail.com). A reader following the old instruction would look for a name that does not appear on the listing and could wrongly conclude the real listing is fake. | `developer` → **"BALABOOM PTE. LTD. (Bilibili)"**. Flows into the identity header, the "Tentang" summary line, install step 2 (ID + EN), the EN FactBox "Developer" row, and SoftwareApplication JSON-LD `author` (ID + EN). Brand kept in parentheses so readers still recognise Bilibili. |
| A2 | "riwayat dan daftar favoritmu tersimpan aman" (ID §2) / "your history is stored safely" (EN) | **UNSUPPORTED safety claim** | No official source states how viewing history is stored or guarantees its safety. | **Final wording (Ahmad, 14 Nov evening):** ID — "kamu dapat menggunakan fitur riwayat tontonan dan daftar favorit yang tersedia di akunmu" / EN — "you can use the viewing history and favourites features available with your account". Describes the features as available with the account, with no storage or safety guarantee. (Applied mid-sentence with lowercase "kamu"/"you" so the sentence reads correctly; wording otherwise verbatim.) |
| A3 | "kualitas serta subtitle-nya dikelola penerjemah" / "subtitles are professionally managed" | **UNVERIFIED** | Neither official source describes who manages subtitles. | Replaced with the verified claim: "subtitle Indonesianya tersedia untuk banyak judul" / "Indonesian subtitles are available for many titles" (matches the `languages` field and Play's "multilingual support"). |
| A4 | "judul musiman populer biasanya tayang berdekatan dengan Jepang, dengan subtitle menyusul cepat untuk judul utama" (Tips) | **UNVERIFIED timing** | The about page says only "Episode baru anime dirilis setiap hari" — no simulcast timing, no subtitle-speed claim. | Replaced with the verified sentence: "Ikuti jadwal rilis resmi di aplikasi agar tidak tertinggal: episode baru anime dirilis setiap hari menurut halaman resmi Bstation." |
| A5 | Penyimpanan permission: "…dan mengelola unduhan resmi bila tersedia untuk judul tertentu" | **OVER-SPECIFIC** | Offline download is a Premium-gated, per-title feature; the permission itself does not establish it. The Play web listing publishes no permission list at all. | Shortened to "Untuk cache video agar putar lebih lancar." The template already hedges ("izin yang umumnya diminta") and its footer note tells readers the exact list varies and to check Play Store. |
| A6 | "Komunitas Komentar … di tiap episode" | **ABSOLUTE, unverified** | Community is supported (Play: "thriving community"; about page: community/creator content), but "every episode" is not stated anywhere. | Softened to "di banyak video dan episode". |
| — | "2000+ licensed anime titles" / "TOP 1 Anime Platform in Southeast Asia" (Play listing) | **Deliberately NOT added** | Stated on the Play listing, but the page does not need a title count and the brief forbids invented counts; adding a marketing superlative is out of scope. | No change. |
| — | Premium specifics: ad-free, early simulcast, offline downloads, 1080p/4K | **NOT asserted** | Appear only on third-party reseller pages, not on the official sources checked. | No change. The page keeps its hedged wording: Premium "kadang" opens episodes first, "lalu menyusul gratis setelah jeda"; the feature card says "pengalaman minim iklan sesuai paket resmi"; the offline FAQ stays conditional ("Fitur unduh mengikuti ketentuan tiap judul dan paket akun; periksa ikon unduh di halaman episode"). |
| — | "Bstation adalah nama layanan Bilibili untuk Asia Tenggara", licensed anime, Indonesian subtitles, regional catalogue differences, free with ads, Premium first for some new episodes, FAQ "Bstation sama dengan Bilibili?" | **VERIFIED** | About page (SEA availability, "Di Indonesia, kami dikenal sebagai Bstation", daily new episodes, regional variation) + Play listing (licensed titles, multilingual support, free viewing, in-app purchases, price 0 USD). | Kept as-is. |
| — | Price label "Gratis (ada konten Premium berbayar)" | **VERIFIED** | Play: price 0 USD + in-app purchases. | Kept. |

**Left untouched on purpose:** the §2 paragraph about unofficial apps ("riwayat tontonanmu berada di server yang tidak jelas pengelolanya…") — those are claims about Kucing-like apps, not Bstation, and mirror the Kucing page's established risk framing. The safety verdict "aplikasi resmi di Play Store dari Bilibili dan aman dipasang" is the site's standard editorial judgment for an official Play Store app and was kept.

## 3. Task 3 — Content quality: what changed

1. **Intro paragraph 2 deleted (ID + EN).** "Halaman ini penting untuk situs kami: setiap kali seseorang mencari aplikasi anime tidak resmi…" — meta-commentary about the site, not about Bstation. Removing it is the Task 3 "remove repetitive introductory paragraphs" fix.
2. **Intro paragraph 1 strengthened (ID + EN)** with verified facts from the official about page: availability in Indonesia, Philippines, Thailand, Vietnam, Singapore, Malaysia + "episode baru anime dirilis setiap hari". New ID intro is one paragraph (~65 words).
3. **First 100–150 words now answer what Bstation is:** the template summary line (name, tagline, developer, price) + the new intro paragraph — licensed anime streaming with Indonesian subtitles, free, legal, where it is available, how often new episodes arrive. The self-referential paragraph no longer sits in that window.
4. **"We provide information, not an APK file"** — already satisfied by the template, unchanged: under the official button, "Tombol ini membuka sumber resmi. Kami tidak menyediakan file APK aplikasi ini." (and the footer note "CekAPK tidak meng-host file APK aplikasi ini — semua tautan unduhan mengarah ke sumber resmi").
5. **Safety and installation guidance retained verbatim** (both safety paragraphs, the 4-step install guide — now with the correct developer name in step 2 — and the "cara cek izin" / "cara instal aman" links).
6. **All sections, internal links, related apps, guides, FAQs, pros/cons, features kept.** No new URLs created. No keyword stuffing: "Bstation" density unchanged in substance (one intro paragraph removed, none added).

## 4. Task 4 — Technical SEO preservation (verified, not just claimed)

- URL `/aplikasi/bstation` unchanged; canonical unchanged; hreflang unchanged (rendered comparison, §5).
- Structured data: WebSite + BreadcrumbList + FAQPage unchanged (same types, same content — FAQs untouched). SoftwareApplication unchanged except `author.name`, which is the A1 factual correction.
- Internal links: all preserved — alternatives (Crunchyroll, YouTube, Kucing APK), related guides (hijau, ijo), related apps (Kucing APK, Crunchyroll, Vidio, iQIYI), `cara-cek-izin-aplikasi`, `cara-instal-apk-aman`, `metodologi-verifikasi`. No link added or removed.
- Responsive design + dark mode: unchanged (no component or CSS touched). Verified rendered at 1440/390/360, light + dark (§5).
- Official Play Store destination unchanged (`details?id=com.bstar.intl`).
- Analytics + consent: untouched (no changes to `AnalyticsConsent.tsx`, `SiteChrome.tsx`, or any shared component).
- No shared components modified. No other app page modified — only the Bstation record (ID) and its English mirror (EN).

## 5. Task 5 — Verification

Local build only (workspace = deployed tree; no production access, per brief).

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | **0 errors** |
| Production build (`npm run build`) | **Clean**, 128 pages, new BUILD_ID `cjgJ8R_2WqCXFpMaC30Jd` |
| SEO checks (`npm run check:seo`) | **ALL PASSED** — no assertion changed |
| Link checks (`npm run check:links`) | **ALL PASSED** — 115 sitemap URLs, 0 broken |
| Negative-list check (`npm run check:negative`) | **OK** |
| Rendered metadata (Playwright, local port 3100) | ID title exactly the proposed 49-char title; description exactly the proposed 174-char text; canonical + hreflang identical; OG/Twitter consistent (§1.3); SoftwareApplication author = BALABOOM PTE. LTD. (Bilibili); EN title/description/canonical/hreflang unchanged |
| Removed-claims scan (rendered body text, ID + EN) | "tersimpan aman", "stored safely", "dikelola penerjemah", "professionally managed", "Halaman ini penting untuk situs kami", "This page matters to our site" — **0 occurrences** |
| New-claims scan (rendered) | BALABOOM present ID + EN; new availability sentence present ID + EN; "Kami tidak menyediakan file APK" present |
| Horizontal overflow | **0px** at 1440 / 390 / 360 on both ID and EN pages |
| Screenshots | 16 PNGs in `~/workspace/cekapk-bstation-screenshots/`: before/after × ID/EN × desktop 1440 / mobile 390 × light/dark. Visual check of the after shots: clean — new developer line, new intro, corrected install step 2, shortened Penyimpanan row. One known capture artefact only: in fullPage mobile shots the fixed BottomNav and "Pengaturan cookie" pill freeze mid-page (same artefact as in earlier phases, not a page defect). |
| Scope check | `find src -mmin -180`: only the 2 intended files modified |

## 6. Files modified (exactly 2)

1. `src/lib/data/apps-parts/part4.ts` — `bstation` record only: `developer`, new `seoTitle` + `seoDescription`, rewritten `intro` (1 paragraph), §2 paragraph reword (A2+A3), Tips paragraph reword (A4), "Komunitas Komentar" desc (A6), Penyimpanan permission meaning (A5).
2. `src/lib/data/i18n-en-apps-b.ts` — `bstation` English record only: rewritten `introEn` (1 paragraph), `whatEn[1]` reword (A2+A3 mirrors). No EN metadata change (no EN proposal in the brief).

No other file was touched: no templates, no components, no CSS, no `check:seo` assertions, no sitemap/robots/JSON-LD code, no dependencies, no env.

## 7. Deploy

**Not deployed. No deploy package prepared beyond the preview ZIP below — deploy only on your approval.** When approved, the deploy follows the established safe procedure (fresh hPanel snapshot → staging in `/root/cekapk-new` → greps + build + check:seo + check:links + check:negative → swap + single `pm2 restart cekapk` → live verification). Rollback would be `/root/cekapk-old` (current live Phase B+C build) + the fresh snapshot.

## 8. Package

- **ZIP:** `CekAPK-Bstation-SEO-2026-11-14.zip` — 2 source files + this report + manifest. SHA-256 in the delivery message.
- **Screenshots:** `~/workspace/cekapk-bstation-screenshots/` (16 PNGs, before/after).
- **Check scripts (ephemeral, /tmp):** `/tmp/bstation-shots/shots.cjs` (before/after screenshots + metadata extraction), `/tmp/bstation-shots/overflow.cjs`; results `/tmp/bstation-shots/before-meta.json`, `/tmp/bstation-shots/after-meta.json`.

## 9. Final corrections (14 November 2026, evening) — applied and re-verified

Ahmad accepted the preview and asked for three final corrections. All three are applied in this revision; nothing else changed.

1. **Viewing-history wording (ID + EN).** The interim wording "riwayat dan daftar favoritmu tersimpan di akunmu" / "your history and favourites stay with your account" is replaced by Ahmad's wording, applied mid-sentence with lowercase "kamu"/"you" (wording otherwise verbatim):
   - ID: "…tetapi akunmu resmi, kamu dapat menggunakan fitur riwayat tontonan dan daftar favorit yang tersedia di akunmu, subtitle Indonesianya tersedia untuk banyak judul…"
   - EN: "…but your account is official, you can use the viewing history and favourites features available with your account, Indonesian subtitles are available for many titles…"
   Rendered check: new sentences present in ID + EN body text; both interim wordings absent (0 occurrences).
2. **Meta description → 149-char version.** `seoDescription` is now "Bstation (Bilibili) adalah aplikasi streaming anime dengan subtitle Indonesia. Pelajari fitur, biaya gratis dan Premium, izin aplikasi, dan keamanan." — exactly 149 chars, verified rendered (title 49 chars unchanged; OG/Twitter description 149 chars; canonical + hreflang unchanged).
3. **EN BALABOOM consistency — VERIFIED rendered** on `/en/aplikasi/bstation`:
   - Developer identity: header line "BALABOOM PTE. LTD. (Bilibili) · Anime & Legal Entertainment" and Quick Facts "Developer: BALABOOM PTE. LTD. (Bilibili)" — both confirmed in rendered body text and in the final desktop screenshot.
   - Installation instructions: step 2 reads "Search for "Bstation (Bilibili)" and check that the developer name is BALABOOM PTE. LTD. (Bilibili)." — confirmed verbatim in rendered body text.
   - SoftwareApplication author: `{"@type": "Organization", "name": "BALABOOM PTE. LTD. (Bilibili)"}` — confirmed in rendered JSON-LD.
   - The old string "Bilibili (Bstation)" has **0 occurrences** anywhere in the EN rendered body. EN title, description, canonical and hreflang are unchanged.

**Re-verification after the corrections (local build only):** `npx tsc --noEmit` 0 errors; `npm run build` clean, 128/128 pages, BUILD_ID `yoaGQxevc1I_pmhn8znez`; `npm run check:seo` ALL PASSED (no assertion changed); `npm run check:links` ALL PASSED; `npm run check:negative` OK; rendered final checks (Playwright, port 3100) as above; 0px horizontal overflow at 1440/390/360 on ID + EN; 8 new "final" screenshots in `~/workspace/cekapk-bstation-screenshots/` (total 24 PNGs: before/after/final × ID/EN × desktop/mobile × light/dark). Scope re-checked: only the same 2 source files were modified in `src/`.

## 10. Final package (rev2)

- **ZIP:** `CekAPK-Bstation-SEO-2026-11-14-rev2.zip` — 2 source files + this report + manifest. SHA-256 in the delivery message.
- **Supersedes:** `CekAPK-Bstation-SEO-2026-11-14.zip` (first preview, 174-char description + interim history wording). Do not deploy the first package.
- **Screenshots:** `~/workspace/cekapk-bstation-screenshots/` (24 PNGs: before/after/final).
- **Check scripts (ephemeral, /tmp):** `/tmp/bstation-shots/shots.cjs`, `/tmp/bstation-shots/overflow.cjs`; results `/tmp/bstation-shots/final-meta.json`.
- **Deploy:** not deployed. Awaiting Ahmad's separate deployment approval.
