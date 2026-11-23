# CekAPK — App Catalog & Guide Content Audit

**Date:** 2026-11-06 · **Scope (read-only):** `src/lib/data/apps.ts`, `src/lib/data/apps-parts/*.ts` (part1–4 + expansion-a/b/c + expansion-shared.ts), `src/lib/data/guides-parts/*.ts` (hijau/ijo guides in part1.ts). No source code was edited.
**Method:** scripted extraction of every record + paragraph-level duplicate detection (template-masked: developer name → `{DEV}`, app name → `{NAME}`, then exact-match counting). All counts below come from the data files, not from the live site.

## 0. Headline findings

- **50 apps, 50 unique slugs, 0 duplicates, 0 slug collisions** between the 11 hand-written pillar apps and the 39 templated expansion apps.
- **No fabricated version numbers, no ratings, no download counts, no exact Rp prices anywhere in the catalog.** The Oct 31 audit's "fabricated versions/sizes" risk is *not* present in these files — with exactly **one exception** (Kucing, §1.3).
- **The real overlap problem is templating, not copy-paste:** every expansion page shares 7–8 of its 14 core prose paragraphs word-for-word with other expansion pages (§1.2). The 11 pillar pages have **zero** verbatim repeated paragraphs between them.
- **Every Play Store link (49/50 apps) is a search URL**, not a canonical app page (§1.4).
- **Hijau vs Ijo: MERGE** — same user intent, one surviving page (§2).

**Verdict counts:** OK **42** / needs-work **8** (Kucing + Netflix + Lazada + the 5 thinnest expansion pages). The template-duplication issue affects all 39 expansion pages as a group-level finding; it is item #2 in the fix list rather than a per-app fail, because each expansion page still carries 359–709 words of unique content.

---

## 1. App catalog audit (all 50 apps)

### 1.1 Shared facts for all 50 apps

| Field | Pillar apps (11) | Expansion apps (39) |
|---|---|---|
| `verifiedAt` | `2026-10-18` (all 11) | `2026-10-20` (all 39) |
| `sizeLabel` | `Bervariasi menurut perangkat` (10/11; Kucing differs, see below) | `Bervariasi menurut perangkat` (all 39, set by `buildExpansionApp`) |
| `minAndroid` | `Bervariasi menurut perangkat` (10/11; Kucing: `Tidak terverifikasi`) | `Bervariasi menurut perangkat` (all 39) |
| `versionNote` | `Selalu versi resmi terbaru dari Play Store` (10/11; Kucing differs) | `Selalu versi resmi terbaru dari Play Store` (all 39) |
| `officialUrl` | Play Store **search** URL for 10/11; `null` for Kucing | Play Store **search** URL for all 39, built as `play.google.com/store/search?q=<name>&c=apps` |
| Structure | 2 intro + 3 sections (6 paras) + 2 safety paras + 6 features + 3–6 permissions + 6 FAQs | 2 intro (`focus`+`usage`) + 2 sections (4 paras) + 2 safety paras + 6 features + 4–5 permissions (profile-shared) + 6 FAQs (7 for Chrome) + 4 pros + 4 cons |

Notes on the shared facts:

- **Uniform `verifiedAt` dates are honest but stale-adjacent.** All 11 pillar pages claim verification on one day (2026-10-18) and all 39 expansion pages on another (2026-10-20). That matches a bulk authoring pass, but the dates are now ~3 weeks old and will age identically. Only update a page's date when it is actually re-checked.
- **No exact version numbers, ratings, download counts, or exact prices were found in any of the 50 records** (regex scan for `x.y` versions, `MB/GB`, `juta/miliar/ribu/unduhan/pengguna/bintang`, `Rp…` across all bodies). Price labels are qualitative throughout ("Gratis (ada pembelian dalam aplikasi)", "Berbayar — sekali beli (harga resmi di Play Store)", etc.). This is the correct approach and must be preserved.
- **Numeric strings that *do* appear are examples, not app facts:** TikTok "HP dengan penyimpanan **32 GB**" (a device-storage example), CapCut "**1080x1920**" (a resolution example), WhatsApp/Instagram "**24 jam**" (Status/Stories duration — factually correct). None is presented as the app's own version/size/rating. No action needed, though the TikTok "32 GB" sentence could be misread out of context.

### 1.2 The repeated-paragraph problem (expansion apps)

`buildExpansionApp` assembles every expansion page from 6 app-specific fields plus shared templates. Measured on the 14 core prose paragraphs per page (intro 2 + section 4 + safety 2 + FAQ 6):

| Repeated paragraph (template-masked) | Apps sharing it |
|---|---|
| "Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak…" (FAQ: app unavailable) | **39 / 39** |
| "Sebagian fitur inti biasanya memerlukan akun agar data, pembelian, atau progres tersimpan…" (FAQ: do I need an account) | **39 / 39** |
| "Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {DEV}…" (FAQ: is it safe) | **39 / 39** |
| "Dalam praktiknya, pengalaman memakai {NAME} akan sangat dipengaruhi kualitas jaringan, perangkat, dan pengaturan akunmu. Mulailah dari fitur inti…" (2nd paragraph of "Cara Dipakai Sehari-hari") | **39 / 39** (34 identical + 5 where the app name sits inside the developer string, e.g. Roblox/Roblox Corporation) |
| "Unduh {NAME} hanya dari Google Play Store dan pastikan developer-nya adalah {DEV}…" (safety paragraph 1) | **39 / 39** (same 34+5 split) |
| "Tekan tombol resmi di halaman ini atau cari {NAME} langsung di Play Store, cocokkan nama developer {DEV}, lalu ketuk Instal…" (FAQ: how to install) | **39 / 39** (same 34+5 split) |
| "Periksa lisensi musik, font, dan aset sebelum memakai hasil edit untuk tujuan komersial…" (creator profile-safety) | 6 (all `creator` apps) |
| "Atur privasi akun sejak pertama memakai…" (social profile-safety) | 6 (all `social` apps) |
| "Untuk anak dan remaja, aktifkan persetujuan pembelian di Play Store…" (game profile-safety) | 5 (all `game` apps) |
| "Layanan utilitas sering menyimpan alamat, jadwal, dan dokumen penting…" (utility profile-safety) | 5 (all `utility` apps) |
| "Gunakan profil anak dan batas usia bila layanan menyediakannya…" (streaming profile-safety) | 4 (all `streaming` apps) |
| "Dokumen dan rapat sering memuat data kerja atau keluarga…" (productivity profile-safety) | 4 (all `productivity` apps) |
| "Selesaikan komunikasi dan pembayaran di dalam platform…" (shopping profile-safety) | 3 (all `shopping` apps) |
| "Aplikasi keuangan hanya boleh dipasang dari Play Store…" (finance profile-safety) | 3 (all `finance` apps) |
| "Untuk anak, gunakan akun yang diawasi orang tua…" (education profile-safety) | 3 (all `education` apps) |
| "Apakah {NAME} gratis?" answer ("{priceLabel}. Periksa rincian di Play Store…") | shared within each identical-`priceLabel` group (2–3 apps each) |
| **Permission lists** (`PERMISSIONS[profile]`, 4–5 items each) | **identical within each profile group** (game 5, social 6, creator 6, streaming 4, shopping 3, finance 3, productivity 4, education 3, utility 5) |

**Per-app impact:** every expansion page has **7–8 of its 14 core prose paragraphs** byte-identical to other expansion pages (genshin-impact/roblox/crunchyroll/vidio/discord/ruangguru/grab/gojek/lazada: 7/14; all others: 8/14), plus an identical permission list. Against that, each expansion page still carries **359–709 words of genuinely unique content** (focus, usage, workflow, caution, check, focus-FAQ answer, 6 features, 4 pros, 4 cons — 260 of the 283 distinct core paragraphs in the expansion set appear on exactly one app). So the pages are *not* empty shells, but roughly half of each page's prose is boilerplate. That is the single biggest "thin/duplicate content" risk in the catalog and the most likely thing behind the audit's vague "overlap" finding.

**Pillar pages, by contrast, have zero verbatim repeated paragraphs across the 11 apps** (checked on intro + section + safety paragraphs + FAQ answers, normalised). Their duplication risk is nil.

### 1.3 The one unsupported number: Kucing APK

- `kucing-apk` — `sizeLabel: "Klaim sekitar 27 MB dari sumber tidak resmi - tidak terverifikasi"`. The "27 MB" figure is an **unverified claim from unofficial sources**, presented as the page's size label. It is the *only* exact MB figure in the whole catalog. The wording does hedge ("Klaim… tidak terverifikasi"), but the number itself has no source in the files. It should be removed or replaced with "Tidak terverifikasi" (matching its own `minAndroid` wording).
- Kucing is also the thinnest pillar page: 3 features (vs 6 everywhere else) and 2 permissions (vs 3–6). `officialUrl: null` is correct for an info-only page, but the page then offers no official destination at all.
- Title-doubling note: the app-page title template (`src/app/(id)/aplikasi/[slug]/page.tsx:15`) now guards with `app.name.endsWith("APK") ? app.name : `${app.name} APK`` — with the current data (`name: "Kucing APK"`) this yields "Kucing APK Terbaru 2026", not the doubled "Kucing APK APK…". The Nov 5 SEO-fixes ZIP already contained this guard, so the live title fix is consistent with the current source. No data change needed for the title; do not rename the app to "Kucing" without also checking the guard still behaves.

### 1.4 All official URLs are search URLs (49/50 apps)

Every Play Store link in the catalog — all 10 pillar apps with a URL and all 39 expansion apps — is of the form `https://play.google.com/store/search?q=<AppName>&c=apps`, not the canonical `https://play.google.com/store/apps/details?id=<package>`. Consequences:

- A search-results page can surface **imitator apps** above or beside the real one, which undercuts the site's core safety promise ("make sure the developer is X").
- It is also weaker as an outbound "official source" signal than a direct details link.
- Fix requires **real package IDs verified against Play Store** (e.g. `com.zhiliaoapp.musically` for TikTok) — they were deliberately *not* fabricated in the Oct 31 audit round. Do not invent them; collect them from Play Store listings and swap in one verified batch.

### 1.5 Per-app audit table — pillar apps (11)

`officialUrl`: S = Play Store search URL, N = null. `size/version`: G = group standard (`Bervariasi menurut perangkat` / `Selalu versi resmi terbaru dari Play Store`).

| # | Slug | Name | Developer | officialUrl | verifiedAt | priceLabel | size / version | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | tiktok | TikTok | TikTok Pte. Ltd. | S | 2026-10-18 | Gratis (ada iklan & pembelian dalam aplikasi) | G | **OK** — richest pillar page; "32 GB" is a device example, not an app-size claim. |
| 2 | capcut | CapCut | Bytedance Pte. Ltd. | S | 2026-10-18 | Gratis (ada fitur Pro berbayar) | G | **OK** — "1080x1920" is a resolution example. |
| 3 | whatsapp | WhatsApp | Meta Platforms, Inc. (WhatsApp LLC) | S | 2026-10-18 | Gratis | G | **OK** — "24 jam" Status duration is correct. |
| 4 | instagram | Instagram | Meta Platforms, Inc. | S | 2026-10-18 | Gratis (ada iklan & pembelian dalam aplikasi) | G | **OK** |
| 5 | telegram | Telegram | Telegram FZ-LLC | S | 2026-10-18 | Gratis (ada Telegram Premium berbayar) | G | **OK** |
| 6 | youtube | YouTube | Google LLC | S | 2026-10-18 | Gratis (ada iklan; YouTube Premium berbayar) | G | **OK** |
| 7 | spotify | Spotify | Spotify AB | S | 2026-10-18 | Gratis (dengan iklan) / Premium berbayar | G | **OK** |
| 8 | canva | Canva | Canva | S | 2026-10-18 | Gratis (ada Canva Pro berbayar) | G | **OK** |
| 9 | bstation | Bstation | Bilibili (Bstation) | S | 2026-10-18 | Gratis (ada konten Premium berbayar) | G | **OK** |
| 10 | minecraft | Minecraft | Mojang (Microsoft) | S | 2026-10-18 | Berbayar — sekali beli (harga resmi di Play Store) | G | **OK** — paid status stated without inventing a price; info/official-link-only policy honoured. |
| 11 | kucing-apk | Kucing APK | Tidak resmi — developer tidak terverifikasi | **N (null — correct, info-only)** | 2026-10-18 | Klaim gratis dari sumber tidak resmi — bukan penawaran resmi | size: "Klaim sekitar 27 MB dari sumber tidak resmi — tidak terverifikasi"; version: "Tidak ada versi resmi — aplikasi ini tidak ada di Play Store" | **NEEDS WORK** — remove the unverified "27 MB"; thinnest pillar page (3 features, 2 permissions); expand or accept as a deliberately thin info page. |

### 1.6 Per-app audit table — expansion apps (39)

All 39: `verifiedAt` 2026-10-20, `sizeLabel`/`minAndroid` "Bervariasi menurut perangkat", `versionNote` "Selalu versi resmi terbaru dari Play Store", `officialUrl` = Play Store search URL built from `searchName ?? name`. Template share: 7–8 of 14 core prose paragraphs are shared templates (§1.2) on every row — not repeated per row below. "Unique words" = words in the 6 app-specific fields + focus-FAQ answer + 6 features + pros/cons.

| # | Slug | Name | Developer | priceLabel | Unique words | Verdict |
|---|---|---|---|---|---|---|
| 12 | roblox | Roblox | Roblox Corporation | Gratis (ada pembelian dalam aplikasi — Robux) | 652 | **OK** — template share 7/14 (lowest band). | 
| 13 | mobile-legends | Mobile Legends | Moonton | Gratis (ada pembelian dalam aplikasi) | 662 | **OK** | 
| 14 | free-fire | Free Fire | Garena International I | Gratis (ada pembelian dalam aplikasi) | 641 | **OK** | 
| 15 | pubg-mobile | PUBG Mobile | Level Infinite | Gratis (ada pembelian dalam aplikasi) | 664 | **OK** | 
| 16 | genshin-impact | Genshin Impact | COGNOSPHERE PTE. LTD. | Gratis (ada pembelian dalam aplikasi / sistem gacha) | 696 | **OK** | 
| 17 | google-chrome | Google Chrome | Google LLC | Gratis | 671 | **OK** — only expansion app with an `extraFaq` (the "Bagaimana cara update Google Chrome?" Play Store-only answer). | 
| 18 | kinemaster | KineMaster | KineMaster, Inc. | Gratis dengan watermark & fitur terbatas (langganan Premium berbayar untuk menghapusnya) | 686 | **OK** | 
| 19 | alight-motion | Alight Motion | Alight Creative, Inc. | Gratis dengan watermark (keanggotaan berbayar untuk fitur penuh & tanpa watermark) | 698 | **OK** | 
| 20 | picsart | PicsArt | PicsArt, Inc. | Gratis (langganan Gold berbayar untuk aset & fitur premium) | 690 | **OK** | 
| 21 | lightroom | Lightroom | Adobe Inc. | Gratis (fitur premium memerlukan langganan Adobe berbayar) | 709 | **OK** | 
| 22 | crunchyroll | Crunchyroll | Crunchyroll, LLC | Sebagian konten dapat gratis dengan iklan; akses penuh dan banyak episode terbaru memerlukan langganan Premium berbayar | 551 | **OK** — template share 7/14. | 
| 23 | vidio | Vidio | PT Vidio Dot Com | Sebagian konten gratis; paket berbayar diperlukan untuk banyak konten premium, serial eksklusif, dan pertandingan tertentu | 553 | **OK** — template share 7/14. | 
| 24 | iqiyi | iQIYI | iQIYI | Sebagian episode gratis dengan iklan; VIP berbayar untuk episode lanjutan, akses awal, dan manfaat paket tertentu | 548 | **OK** | 
| 25 | netflix | Netflix | Netflix, Inc. | Berbayar — hanya tersedia lewat langganan resmi; tidak ada versi gratis resmi | 562 | **NEEDS WORK** — price label misleads: the *app* is free to install; only the *content* needs a subscription. Reword to "Gratis diunduh; konten memerlukan langganan Premium berbayar" (or equivalent). | 
| 26 | shopee | Shopee | Shopee | Gratis untuk aplikasi; barang, ongkir, dan layanan yang dibeli dibayar sesuai transaksi di dalam aplikasi | 555 | **OK** | 
| 27 | tokopedia | Tokopedia | Tokopedia | Gratis untuk aplikasi; barang, ongkir, tagihan, dan layanan yang dibeli dibayar sesuai transaksi di dalam aplikasi | 543 | **OK** | 
| 28 | google-drive | Google Drive | Google LLC | Gratis dengan ruang penyimpanan akun Google; ruang lebih besar tersedia lewat langganan Google One berbayar | 573 | **OK** | 
| 29 | dana | DANA | PT Espay Debit Indonesia Koe | Gratis untuk aplikasi; saldo, transfer, dan layanan tertentu mengikuti ketentuan biaya yang ditampilkan di aplikasi | 569 | **OK** | 
| 30 | ovo | OVO | PT Visionet Internasional | Gratis untuk aplikasi; saldo, transfer, dan layanan tertentu mengikuti ketentuan biaya yang ditampilkan di aplikasi | 571 | **OK** | 
| 31 | gopay | GoPay | PT Dompet Anak Bangsa | Gratis untuk aplikasi; saldo, transfer, dan layanan tertentu mengikuti ketentuan biaya yang ditampilkan di aplikasi | 579 | **OK** | 
| 32 | facebook | Facebook | Meta Platforms, Inc. | Gratis (ada iklan dan fitur berbayar opsional) | 443 | **OK** | 
| 33 | messenger | Messenger | Meta Platforms, Inc. | Gratis (ada iklan) | 408 | **OK** | 
| 34 | discord | Discord | Discord Inc. | Gratis (Nitro berbayar opsional) | 416 | **OK** — template share 7/14. | 
| 35 | snapchat | Snapchat | Snap Inc. | Gratis (Snapchat+ berbayar opsional) | 400 | **OK** | 
| 36 | zoom | Zoom | zoom.us | Gratis terbatas (paket berbayar untuk penyelenggara rapat) | 389 | **NEEDS WORK** — thinnest band (unique words < 390); expand the app-specific fields before any other expansion page. | 
| 37 | google-maps | Google Maps | Google LLC | Gratis | 414 | **OK** | 
| 38 | google-photos | Google Foto | Google LLC | Gratis (penyimpanan tambahan lewat Google One berbayar) | 402 | **OK** | 
| 39 | gmail | Gmail | Google LLC | Gratis (Google Workspace dan penyimpanan tambahan berbayar) | 407 | **OK** | 
| 40 | google-translate | Google Translate | Google LLC | Gratis | 372 | **NEEDS WORK** — thinnest band; expand unique content. | 
| 41 | duolingo | Duolingo | Duolingo | Gratis (Super Duolingo berbayar opsional) | 359 | **NEEDS WORK** — thinnest expansion page in the catalog; expand unique content first. | 
| 42 | ruangguru | Ruangguru | Ruangguru (PT Ruang Raya Indonesia) | Gratis sebagian (paket belajar berbayar) | 394 | **OK** — template share 7/14. | 
| 43 | grab | Grab | Grab Holdings | Gratis (biaya layanan dibayar per pesanan) | 374 | **NEEDS WORK** — thinnest band; expand unique content. | 
| 44 | gojek | Gojek | PT GoTo Gojek Tokopedia Tbk | Gratis (biaya layanan dibayar per pesanan) | 383 | **NEEDS WORK** — thinnest band; expand unique content. | 
| 45 | traveloka | Traveloka | Traveloka | Gratis (harga produk perjalanan dari masing-masing penyedia) | 394 | **OK** | 
| 46 | lazada | Lazada | Lazada Mobile | Gratis (belanja produk di dalam platform) | 392 | **NEEDS WORK** — developer name unverified: Play Store lists the developer as "Lazada", not "Lazada Mobile" (which is the app's display name). Verify against the live Play Store listing and correct if wrong. | 
| 47 | pinterest | Pinterest | Pinterest, Inc. | Gratis (ada iklan) | 416 | **OK** | 
| 48 | microsoft-word | Microsoft Word | Microsoft Corporation | Gratis (fitur premium memerlukan langganan Microsoft 365) | 404 | **OK** | 
| 49 | google-meet | Google Meet | Google LLC | Gratis (fitur lanjutan di Google Workspace berbayar) | 403 | **OK** | 
| 50 | whatsapp-business | WhatsApp Business | WhatsApp LLC | Gratis (Platform/API WhatsApp Business berbayar untuk skala besar) | 417 | **OK** | 

Notes on the expansion table:

- Unique-word figures are exact whitespace-split counts of the app-specific fields (focus, usage, workflow, caution, check, focus-FAQ answer, 6 features, 4 pros, 4 cons). Ranking: duolingo (359) < google-translate (372) < grab (374) < gojek (383) < zoom (389) < lazada (392) < ruangguru/traveloka (394) < the rest (400–709).
- Developer names spot-checked against general knowledge look right (Moonton, Garena International I, Level Infinite, COGNOSPHERE, PT Espay Debit Indonesia Koe, PT Visionet Internasional, PT Dompet Anak Bangsa, zoom.us) — but **none of this was verified against live Play Store listings from the data files alone**; the Lazada flag above is the one case where the stored value looks wrong on its face.
- Plausible-but-unverified factual claims inside unique content (not errors, just not provable from these files): Roblox "jutaan pengalaman" (millions of community experiences); Mobile Legends "liga profesional MPL"; TikTok/Tokopedia e-commerce link (pillar). All match public knowledge; re-verify them on the next content pass rather than treating them as fabrication.
- English translations (`i18n-en-apps-a.ts`, `i18n-en-apps-b.ts`) were **not audited** — outside the task scope. If the EN pages carry the same templates, they inherit the same duplication issue.
- Alternative links: 15 expansion records point at least one alternative to a `null` slug (app not in the catalog — e.g. Stumble Guys, Firefox, Brave, Blibli, LinkAja). That is by design (honest "not in our catalog" note), not a broken link — but verify the rendering doesn't emit a dead internal link for `null` slugs.

### 1.7 Prioritised top-10 fix list

1. **Replace Play Store search URLs with verified canonical details URLs** (49 apps). Collect real package IDs from live Play Store listings; never invent them. Highest value: it makes every "official link" button land on the exact app instead of a search page that can show imitators.
2. **De-template the expansion pages.** Rewrite the 6 paragraphs shared by all 39 apps (workflow 2nd paragraph; safety paragraph 1; FAQs "is it safe", "how to install", "app unavailable", "need an account") with app-specific versions — or at minimum vary the FAQ answers per app and per profile. Start with the highest-traffic apps (google-chrome, shopee, tokopedia, netflix, roblox). This is the catalog's biggest duplicate-content risk.
3. **Make permission lists app-specific** for the top apps instead of the identical per-profile lists (9 profiles × 4–5 items, shared verbatim). At minimum, add one app-specific permission note per page (e.g. why *this* app asks for the microphone).
4. **Kucing: delete the "27 MB"** — replace `sizeLabel` with "Tidak terverifikasi" and expand the page (3 features / 2 permissions is the thinnest pillar page), or formally accept it as a thin info-only page.
5. **Netflix priceLabel** — reword so it doesn't imply the app costs money to install (see row 25).
6. **Verify Lazada's developer** ("Lazada Mobile" vs "Lazada") against the live Play Store listing.
7. **Expand the 5 thinnest expansion pages** (duolingo 359, google-translate 372, grab 374, gojek 383, zoom 389 unique words) — add one more app-specific section or FAQ each.
8. **Re-verification cadence for `verifiedAt`.** The two bulk dates (2026-10-18 / 2026-10-20) will go stale together; update a page's date only when that page is actually re-checked, starting with the paid/subscription apps whose pricing changes (Spotify, CapCut Pro, Netflix, YouTube Premium).
9. **Hijau/Ijo merge** (see §2) — one canonical page + 301.
10. **Audit the EN translations** (`i18n-en-apps-a/b.ts`) with the same duplicate detection — if they mirror the Indonesian templates, they carry the same duplication issue into `/en`.

---

## 2. Hijau vs Ijo comparison

**Sources:** `guides-parts/part1.ts` — `apkHijau` (slug `apa-itu-apk-hijau`, 879 words incl. code, 4 sections / 8 paragraphs, 5 FAQs, related: bstation/whatsapp/telegram) and `apkIjo` (slug `apa-itu-apk-ijo`, 789 words, 4 sections / 8 paragraphs, 4 FAQs, related: bstation/whatsapp). Both `type: "explainer"`, both `verifiedAt: 2026-10-18`.

**Text overlap, measured:** **0 exact shared sentences** (45 vs 34 sentences > 60 chars) and **0 shared 8-word sequences**. The two guides are genuinely differently worded — this is *not* a copy-paste duplication. The overlap is at the level of claims and intent, not text.

### 2.1 Shared / near-duplicate claims (same facts, different wording)

| Shared claim | Where it appears |
|---|---|
| "Ijo" is the informal everyday spelling of "hijau"; neither is the name of an official app; no official download link exists | Hijau intro + FAQ 5; Ijo intro + FAQ 1 |
| The term is a code word used to dodge platform moderation, typically for gambling, adult, or pirated content | Hijau §1 + §2; Ijo §1 + §4 + FAQ 2 |
| Search results for the term are a mixed, unsafe lottery (explainers + download sites + videos + unrelated official apps) | Hijau §1; Ijo §1 + §4 |
| Don't download from those results — unknown developer, no Play Store review, no Play Protect, repackaging risk | Hijau §3; Ijo §2 |
| Legal alternatives by name: WhatsApp/Telegram for messaging, Bstation for anime, TikTok for short video | Hijau §4; Ijo §3 |
| General safety rule: Play Store or official developer site only; check developer name; check permissions | Hijau §4; Ijo §2–§3 |

### 2.2 Unique to Hijau (`apa-itu-apk-hijau`)

- **Taxonomy of meanings** (§1 "Satu Istilah, Banyak Arti yang Berbeda"): icon colour / free-premium bundles (= piracy) / code for illicit content — the only place the three readings are laid out together.
- **Viral-mechanics section** (§2): the curiosity loop on TikTok/X/WhatsApp and the claim of "ratusan ribu pencarian per bulan" (attributed to "data keyword kami" — **not verifiable from the data files alone**).
- **Three named risks** (§3): malware, subscription/ad fraud, legal exposure.
- **Recovery FAQ**: "Saya terlanjur mengunduh berkas dari situs APK hijau, harus apa?" (delete, revoke install-from-unknown, Play Protect scan, watch for data theft).
- **"Why do so many sites offer APK hijau downloads?" FAQ** (ad revenue, piracy, malware traps).
- **Explicitly defers the ijo question to the other page** (FAQ 5: "Kami membahas APK ijo di halaman terpisah karena banyak yang mencarinya dengan ejaan itu").

### 2.3 Unique to Ijo (`apa-itu-apk-ijo`)

- **"Kenapa Warna Dipakai sebagai Kode?"** (§4): colour as a moderation-proof code, cross-language pattern — the most original section in either guide, and the only one that generalises beyond Indonesia.
- **Play Store comparison paragraph** (§2): what a legitimate listing shows (developer name, download counts, public reviews, permission list before install, Play Protect) vs an unknown file — concrete and checkable.
- **"Stop at the explainer article" framing** (§2): the device-sharing argument (same phone as mobile banking, e-wallet, family WhatsApp).
- **FAQ "Kenapa orang tidak menyebut nama aplikasinya langsung?"** (moderation evasion as a reason to distrust the term).
- **FAQ "Bagaimana cara tahu aplikasi hijau yang dimaksud itu resmi?"** (find the real name on Play Store; if the only route is a file from a sharing site, it's not official).
- Search-volume claim "puluhan ribu" per month — also **not verifiable from the data files alone**.

### 2.4 Recommendation: **MERGE** (hijau survives, ijo 301s to it)

**One-line reason:** both spellings are the same question from the same user ("what is this viral term and is it safe?"), and the hijau page itself already answers the ijo question — so two pages split one intent's ranking instead of concentrating it.

Detail:

- **Survivor: `apa-itu-apk-hijau`.** It is the standard spelling, the longer and more complete guide (taxonomy + risks + recovery FAQ), and its own volume claim ("ratusan ribu") exceeds ijo's ("puluhan ribu").
- **Fold ijo's unique material in, don't delete it:** carry over §4 "Kenapa Warna Dipakai sebagai Kode?" and the §2 Play Store comparison paragraph, plus the two unique FAQs ("why don't people name the app directly", "how to tell if the green app is official"). Nothing in ijo is redundant once merged — its value is the angle, not the facts.
- **Keep the merged page ranking for "apk ijo":** open with (or keep prominent) the sentence "APK ijo adalah ejaan sehari-hari dari APK hijau" and keep "ijo" in the intro, one heading or FAQ, and meta description, so the single page targets both spellings.
- **Redirect:** 301 `/panduan/apa-itu-apk-ijo` → `/panduan/apa-itu-apk-hijau`; update sitemap (the panduan segment will drop from 8 URLs back to 7 on the next re-read) and any internal links to the ijo page.
- **Caveat (could not verify from data files alone):** check Search Console *before* redirecting — if the ijo page already has impressions or a ranking for "apk ijo", monitor it for 2–4 weeks after the 301 to confirm the equity transfers to the merged page. If ijo is already ranking well and hijau is not, the merge is still right (one stronger page beats two competing ones), but watch it rather than assuming it.

---

## 3. What I could not verify from the data files alone

- Live Play Store facts (developer names, package IDs, prices, availability in Indonesia) — the Lazada flag and the package-ID fix both need a live check.
- Whether the `null`-slug alternatives render as plain text (fine) or as dead internal links (bug) — needs a rendered-page check.
- Whether the ijo page has any Search Console impressions/rankings that a 301 must preserve.
- The EN translations (`i18n-en-apps-a.ts`, `i18n-en-apps-b.ts`) — not audited; same template risk may apply.
- The "ratusan ribu" (hijau) and "puluhan ribu" (ijo) monthly-search claims — attributed to "data keyword kami", no source in the files.
- Whether the live site's rendered pages match these data files exactly (the audit is of the source data, not a live crawl).
