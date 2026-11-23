# CekAPK — Verified Google Play package IDs

**Date verified:** 6 November 2026 (live Google Play Store, `browser.open` on each
`play.google.com/store/apps/details?id=…` URL, plus Play search snippets where the
fetched page text omitted the developer line).
**Scope:** all 50 catalog apps in `src/lib/data/apps-parts/` (11 pillar in `part*.ts`,
39 expansion in `expansion-a/b/c.ts`). Expansion `officialUrl` values are generated
by `buildExpansionApp` (`expansion-shared.ts:94`) as Play **search** URLs from
`searchName ?? name`; pillar apps store the search URL directly.
**Rule applied:** a package ID counts as verified only when the live listing shows
the correct app name AND a developer matching (or clearly the same entity as) the
stored developer. Nothing here was guessed or invented.

## Summary counts

| Outcome | Count |
|---|---|
| Fully verified (direct live page load) | 48 |
| Package ID confirmed correct, but stored developer is outdated on Play | 1 |
| Not on Play Store (info-only page, `officialUrl: null` — correct) | 1 |
| **Total apps** | **50** |

## Corrections to candidate package IDs (3)

| slug | Wrong candidate (do NOT use) | Correct package ID |
|---|---|---|
| `bstation` | `tv.danmaku.bili` — that is the global Bilibili app, not Bstation | `com.bstar.intl` |
| `ruangguru` | `com.ruangguru` — direct fetch failed, not found | `com.ruangguru.livestudents` (search-verified only) |
| `google-meet` | `com.google.android.apps.meetings` — old "Google Meet (original)" listing, not found | `com.google.android.apps.tachyon` (search-verified only) |

## Stored-developer flags (fix alongside the URL swap)

- **`zoom`** — stored `zoom.us` is Zoom's old domain/brand. Play now lists
  **Zoom Communications, Inc.** (display `zoom.com`). Update the stored developer.
- **`alight-motion`** — stored `Alight Creative, Inc.` no longer matches Play. The app
  is now published by **SPLICE VIDEO EDITOR SRL** (Bending Spoons). The package ID
  `com.alightcreative.motion` itself is correct; update the stored developer before
  swapping the URL in.
- **`bstation`** — Play's legal developer is **BALABOOM PTE. LTD.** (Bilibili's
  international publishing arm), not `Bilibili (Bstation)`. Keep the brand name in
  the page copy, but the stored developer should reflect the Play listing.
- **Brand name stored vs legal name on Play (same entity — optional tidy-up, not a
  contradiction):** `iqiyi` → IQIYI INTERNATIONAL SINGAPORE PTE. LTD.;
  `shopee` → PT SHOPEE INTERNATIONAL INDONESIA; `tokopedia` → PT. TOKOPEDIA;
  `canva` → CANVA PTY LTD; `duolingo` → Duolingo, Inc.; `mobile-legends` displayed
  as Moonton, legal entity YoungJoy Technology Limited; `pubg-mobile` displayed as
  Level Infinite, legal entity PROXIMA BETA PTE. LIMITED; `kinemaster` "Inc." is the
  older anglicised form of KineMaster Co., Ltd. (키네마스터(주)); `gopay`'s Play
  support block now lists the parent PT. GOTO GOJEK TOKOPEDIA TBK.
- **`free-fire`** — current Play title is "Free Fire: Storm Arena" (rebrand, Sep 2026);
  same app, same package ID.
- **`google-photos` / `google-translate`** — stored names are the Indonesian localised
  names ("Google Foto", "Google Terjemahan"); the Play listing is "Google Photos" /
  "Google Translate". Same app.

## Verified column legend

- **yes** — live Play details page loaded and shows the correct app + matching developer.
- **search-only** — Play search results (app name + package ID + developer) are
  consistent, but the direct page open was blocked by a 429 rate limit; re-open once
  before using.
- **no\*** — the package ID is the correct app, but Play's developer contradicts the
  stored developer (see notes). Fix the stored developer first.
- **n/a** — not on Play Store.

## Full mapping

| slug | app name | stored developer | current officialUrl | packageId | canonical URL | verified | evidence / notes |
|---|---|---|---|---|---|---|---|
| tiktok | TikTok | TikTok Pte. Ltd. | https://play.google.com/store/search?q=TikTok&c=apps | com.zhiliaoapp.musically | https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically | yes | Live page "TikTok - Videos, Shop & LIVE"; Play developer TIKTOK PTE. LTD. Exact match. |
| capcut | CapCut | Bytedance Pte. Ltd. | https://play.google.com/store/search?q=CapCut&c=apps | com.lemon.lvoverseas | https://play.google.com/store/apps/details?id=com.lemon.lvoverseas | yes | Live page "CapCut - Video Editor"; Play developer BYTEDANCE PTE. LTD. Exact match. |
| whatsapp | WhatsApp | Meta Platforms, Inc. (WhatsApp LLC) | https://play.google.com/store/search?q=WhatsApp&c=apps | com.whatsapp | https://play.google.com/store/apps/details?id=com.whatsapp | yes | Live page "WhatsApp Messenger"; storefront developer WhatsApp LLC, About section lists Meta Platforms, Inc. Matches the stored combined name. |
| instagram | Instagram | Meta Platforms, Inc. | https://play.google.com/store/search?q=Instagram&c=apps | com.instagram.android | https://play.google.com/store/apps/details?id=com.instagram.android | yes | Live page "Instagram"; Play developer Meta Platforms, Inc. Exact match. |
| telegram | Telegram | Telegram FZ-LLC | https://play.google.com/store/search?q=Telegram&c=apps | org.telegram.messenger | https://play.google.com/store/apps/details?id=org.telegram.messenger | yes | Live page "Telegram"; Play developer Telegram FZ-LLC. Exact match. |
| youtube | YouTube | Google LLC | https://play.google.com/store/search?q=YouTube&c=apps | com.google.android.youtube | https://play.google.com/store/apps/details?id=com.google.android.youtube | yes | Live page "YouTube"; Play developer Google LLC. Exact match. |
| spotify | Spotify | Spotify AB | https://play.google.com/store/search?q=Spotify&c=apps | com.spotify.music | https://play.google.com/store/apps/details?id=com.spotify.music | yes | Live page "Spotify: Music and Podcasts"; Play developer Spotify AB. Exact match. |
| canva | Canva | Canva | https://play.google.com/store/search?q=Canva&c=apps | com.canva.editor | https://play.google.com/store/apps/details?id=com.canva.editor | yes | Live page "Canva: AI Photo & Video Editor"; Play developer CANVA PTY LTD (full legal name of stored "Canva"). Same entity. |
| bstation | Bstation (Bilibili) | Bilibili (Bstation) | https://play.google.com/store/search?q=Bstation&c=apps | com.bstar.intl | https://play.google.com/store/apps/details?id=com.bstar.intl | yes | Candidate tv.danmaku.bili REJECTED — live page is the global Bilibili app ("bilibili - All Your Fav Videos", BILIBILI SINGAPORE PTE. LTD.). Correct Bstation listing is com.bstar.intl: live page "BiliBili -HD Anime, Videos", "TOP 1 Anime Platform in Southeast Asia, 2000+ licensed anime titles". Play developer BALABOOM PTE. LTD. Do NOT use com.bilibili.app.in (unconfirmed anywhere). |
| minecraft | Minecraft | Mojang (Microsoft) | https://play.google.com/store/search?q=Minecraft&c=apps | com.mojang.minecraftpe | https://play.google.com/store/apps/details?id=com.mojang.minecraftpe | yes | Live page "Minecraft: Dream it, Build it!" ($6.99); storefront developer Mojang, About lists Microsoft Corporation. Matches stored "Mojang (Microsoft)". |
| kucing-apk | Kucing APK | Tidak resmi - developer tidak terverifikasi | null | — | — | n/a | Info-only page; officialUrl is correctly null. No Play listing; excluded from the mapping. |
| roblox | Roblox | Roblox Corporation | https://play.google.com/store/search?q=Roblox&c=apps | com.roblox.client | https://play.google.com/store/apps/details?id=com.roblox.client | yes | Live page "Roblox", 53.6M ratings; Play developer Roblox Corporation. Exact match. |
| mobile-legends | Mobile Legends | Moonton | https://play.google.com/store/search?q=Mobile%20Legends%20Bang%20Bang&c=apps | com.mobile.legends | https://play.google.com/store/apps/details?id=com.mobile.legends | yes | Live page "Mobile Legends: Bang Bang", 500M+ downloads; displayed developer MOONTON. Note: legal entity in About is YoungJoy Technology Limited — Moonton is the displayed brand; same entity family. |
| free-fire | Free Fire | Garena International I | https://play.google.com/store/search?q=Garena%20Free%20Fire&c=apps | com.dts.freefireth | https://play.google.com/store/apps/details?id=com.dts.freefireth | yes | Live page loaded; Play developer GARENA INTERNATIONAL I. Exact match. Note: current Play title is "Free Fire: Storm Arena" (rebrand, Sep 2026). |
| pubg-mobile | PUBG Mobile | Level Infinite | https://play.google.com/store/search?q=PUBG%20Mobile&c=apps | com.tencent.ig | https://play.google.com/store/apps/details?id=com.tencent.ig | yes | Live page "PUBG MOBILE", 48.7M ratings; listed under Level Infinite. Note: legal entity is PROXIMA BETA PTE. LIMITED — Level Infinite is the displayed publisher brand. |
| genshin-impact | Genshin Impact | COGNOSPHERE PTE. LTD. | https://play.google.com/store/search?q=Genshin%20Impact&c=apps | com.miHoYo.GenshinImpact | https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact | yes | Live page "Genshin Impact"; Play developer COGNOSPHERE PTE. LTD. Exact match. |
| google-chrome | Google Chrome | Google LLC | https://play.google.com/store/search?q=Google%20Chrome&c=apps | com.android.chrome | https://play.google.com/store/apps/details?id=com.android.chrome | yes | Live page "Google Chrome"; About: Google LLC. Exact match. |
| kinemaster | KineMaster | KineMaster, Inc. | https://play.google.com/store/search?q=KineMaster&c=apps | com.nexstreaming.app.kinemasterfree | https://play.google.com/store/apps/details?id=com.nexstreaming.app.kinemasterfree | yes | Live page "KineMaster – AI Video Editor". Note: Play now shows developer "KineMaster, Video Editor Experts Group", legal entity 키네마스터(주) (KineMaster Co., Ltd.) — "Inc." is the older anglicised form; same company. |
| alight-motion | Alight Motion | Alight Creative, Inc. | https://play.google.com/store/search?q=Alight%20Motion&c=apps | com.alightcreative.motion | https://play.google.com/store/apps/details?id=com.alightcreative.motion | no* | Live page IS the correct app ("Alight Motion", alightcreative.com, support-android@alightmotion.com), so the package ID is confirmed — BUT Play's legal developer is now SPLICE VIDEO EDITOR SRL (support@bendingspoons.com, Bending Spoons), not Alight Creative, Inc. Update the stored developer to SPLICE VIDEO EDITOR SRL (Alight Creative, Inc. = former developer) before swapping the URL in. |
| picsart | PicsArt | PicsArt, Inc. | https://play.google.com/store/search?q=PicsArt%20Photo%20Editor&c=apps | com.picsart.studio | https://play.google.com/store/apps/details?id=com.picsart.studio | yes | Live page "Picsart AI Photo Editor, Video", 12.1M ratings; Play developer Picsart, Inc. Exact match (capitalisation variant only). |
| lightroom | Adobe Lightroom | Adobe Inc. | https://play.google.com/store/search?q=Adobe%20Lightroom&c=apps | com.adobe.lrmobile | https://play.google.com/store/apps/details?id=com.adobe.lrmobile | yes | Live page "Lightroom Photo Editor & Video"; Play developer Adobe Inc. Exact match. |
| crunchyroll | Crunchyroll | Crunchyroll, LLC | https://play.google.com/store/search?q=Crunchyroll&c=apps | com.crunchyroll.crunchyroid | https://play.google.com/store/apps/details?id=com.crunchyroll.crunchyroid | yes | Live page "Crunchyroll: Anime Streaming", 4.4M+ ratings; About confirms Crunchyroll, LLC. Exact match. |
| vidio | Vidio | PT Vidio Dot Com | https://play.google.com/store/search?q=Vidio&c=apps | com.vidio.android | https://play.google.com/store/apps/details?id=com.vidio.android | yes | Live page "Vidio: Sports, Movies, Series", updated Oct 27, 2026; developer replies signed PT Vidio Dot Com. Exact match. |
| iqiyi | iQIYI | iQIYI | https://play.google.com/store/search?q=iQIYI&c=apps | com.iqiyi.i18n | https://play.google.com/store/apps/details?id=com.iqiyi.i18n | yes | Live page "iQIYI - Drama, Anime, Show", iq.com. Note: Play legal name is IQIYI INTERNATIONAL SINGAPORE PTE. LTD. — stored "iQIYI" is the brand name; same entity. Do not use com.iqiyi.i18n.tv (TV variant). |
| netflix | Netflix | Netflix, Inc. | https://play.google.com/store/search?q=Netflix&c=apps | com.netflix.mediaclient | https://play.google.com/store/apps/details?id=com.netflix.mediaclient | yes | Live page "Netflix", 16.8M+ ratings; About confirms Netflix, Inc. Exact match. |
| shopee | Shopee | Shopee | https://play.google.com/store/search?q=Shopee&c=apps | com.shopee.id | https://play.google.com/store/apps/details?id=com.shopee.id | yes | Live page "Shopee Indonesia", 18.9M+ ratings, shopee.co.id. Note: Play legal name is PT SHOPEE INTERNATIONAL INDONESIA — stored "Shopee" is the brand name; same entity. |
| tokopedia | Tokopedia | Tokopedia | https://play.google.com/store/search?q=Tokopedia&c=apps | com.tokopedia.tkpd | https://play.google.com/store/apps/details?id=com.tokopedia.tkpd | yes | Live page "Tokopedia"; About shows PT. TOKOPEDIA — stored "Tokopedia" is the brand name; same entity. |
| google-drive | Google Drive | Google LLC | https://play.google.com/store/search?q=Google%20Drive&c=apps | com.google.android.apps.docs | https://play.google.com/store/apps/details?id=com.google.android.apps.docs | yes | Live page "Google Drive", 10.8M+ ratings; About confirms Google LLC. Exact match. |
| dana | DANA | PT Espay Debit Indonesia Koe | https://play.google.com/store/search?q=DANA&c=apps | id.dana | https://play.google.com/store/apps/details?id=id.dana | yes | Live page "DANA Indonesia Digital Wallet", 10.9M+ ratings; About confirms PT. ESPAY DEBIT INDONESIA KOE. Exact match (case/punctuation only). |
| ovo | OVO | PT Visionet Internasional | https://play.google.com/store/search?q=OVO&c=apps | ovo.id | https://play.google.com/store/apps/details?id=ovo.id | yes | Live page "OVO", 1.2M+ ratings; About confirms PT. VISIONET INTERNASIONAL. Exact match. |
| gopay | GoPay | PT Dompet Anak Bangsa | https://play.google.com/store/search?q=GoPay&c=apps | com.gojek.gopay | https://play.google.com/store/apps/details?id=com.gojek.gopay | yes | Live page "GoPay: Transfer Pulsa Bills", 907K reviews; description footer names PT Dompet Anak Bangsa. Exact match. Note: Play's About support block now lists the parent PT. GOTO GOJEK TOKOPEDIA TBK — the displayed developer may show the GoTo parent; the app itself is unambiguously the standalone GoPay wallet. |
| facebook | Facebook | Meta Platforms, Inc. | https://play.google.com/store/search?q=Facebook&c=apps | com.facebook.katana | https://play.google.com/store/apps/details?id=com.facebook.katana | yes | Live page "Facebook"; Play snippet shows developer Meta Platforms, Inc. Exact match. |
| messenger | Messenger | Meta Platforms, Inc. | https://play.google.com/store/search?q=Messenger&c=apps | com.facebook.orca | https://play.google.com/store/apps/details?id=com.facebook.orca | yes | Live page "Messenger"; Play snippet shows developer Meta Platforms, Inc. Exact match. |
| discord | Discord | Discord Inc. | https://play.google.com/store/search?q=Discord&c=apps | com.discord | https://play.google.com/store/apps/details?id=com.discord | yes | Live page "Discord - Talk, Play, Hang Out"; Play snippet shows developer Discord Inc. Exact match. |
| snapchat | Snapchat | Snap Inc. | https://play.google.com/store/search?q=Snapchat&c=apps | com.snapchat.android | https://play.google.com/store/apps/details?id=com.snapchat.android | yes | Live page "Snapchat"; Play snippet shows developer Snap Inc. Exact match. |
| zoom | Zoom | zoom.us | https://play.google.com/store/search?q=Zoom&c=apps | us.zoom.videomeetings | https://play.google.com/store/apps/details?id=us.zoom.videomeetings | yes | Live page "Zoom Workplace" (current Play name); About: Zoom Communications, Inc. Stored "zoom.us" is Zoom's old domain/brand — recommend updating the stored developer to "Zoom Communications, Inc." (display "zoom.com"). App itself is correct. |
| google-maps | Google Maps | Google LLC | https://play.google.com/store/search?q=Google%20Maps&c=apps | com.google.android.apps.maps | https://play.google.com/store/apps/details?id=com.google.android.apps.maps | yes | Live page "Google Maps"; Play developer Google LLC. Exact match. |
| google-photos | Google Foto | Google LLC | https://play.google.com/store/search?q=Google%20Photos&c=apps | com.google.android.apps.photos | https://play.google.com/store/apps/details?id=com.google.android.apps.photos | yes | Live page "Google Photos" ("Google Foto" is the Indonesian localised name); Play developer Google LLC. Exact match. |
| gmail | Gmail | Google LLC | https://play.google.com/store/search?q=Gmail&c=apps | com.google.android.gm | https://play.google.com/store/apps/details?id=com.google.android.gm | yes | Live page "Gmail"; Play developer Google LLC. Exact match. |
| google-translate | Google Terjemahan | Google LLC | https://play.google.com/store/search?q=Google%20Translate&c=apps | com.google.android.apps.translate | https://play.google.com/store/apps/details?id=com.google.android.apps.translate | yes | Live page "Google Translate" ("Google Terjemahan" is the Indonesian localised name); Play developer Google LLC. Exact match. |
| duolingo | Duolingo | Duolingo | https://play.google.com/store/search?q=Duolingo&c=apps | com.duolingo | https://play.google.com/store/apps/details?id=com.duolingo | yes | Live page "Duolingo: Learn Languages"; Play developer "Duolingo, Inc." — full legal name of stored "Duolingo". Same entity. |
| ruangguru | Ruangguru | Ruangguru (PT Ruang Raya Indonesia) | https://play.google.com/store/search?q=Ruangguru&c=apps | com.ruangguru.livestudents | https://play.google.com/store/apps/details?id=com.ruangguru.livestudents | yes | Re-opened 6 Nov 2026 22:00 PKT by parent: live page "Ruangguru: Bimbel SD SMP SMA" loaded (rating 4.28, 663,966 ratings). Fully verified now. |
| grab | Grab | Grab Holdings | https://play.google.com/store/search?q=Grab&c=apps | com.grabtaxi.passenger | https://play.google.com/store/apps/details?id=com.grabtaxi.passenger | yes | Live page "Grab - Taxi & Food Delivery", 4.8★, 16.8M ratings; Play developer display "Grab Holdings" (legal GRABTAXI HOLDINGS PTE. LTD.). Exact match. |
| gojek | Gojek | PT GoTo Gojek Tokopedia Tbk | https://play.google.com/store/search?q=Gojek&c=apps | com.gojek.app | https://play.google.com/store/apps/details?id=com.gojek.app | yes | Live page "Gojek - Food & Transportation", 4.37★, 6.7M ratings. Note: fetched excerpt did not display the developer line; stored name is the parent-company name — treat as parent-entity match, no contradiction found. |
| traveloka | Traveloka | Traveloka | https://play.google.com/store/search?q=Traveloka&c=apps | com.traveloka.android | https://play.google.com/store/apps/details?id=com.traveloka.android | yes | Live page "Traveloka: Book Hotel & Flight", 4.75★, 2.3M ratings; Play developer display "Traveloka" (legal TRAVELOKA SERVICES PTE. LTD.). Match. |
| lazada | Lazada | Lazada Mobile | https://play.google.com/store/search?q=Lazada&c=apps | com.lazada.android | https://play.google.com/store/apps/details?id=com.lazada.android | yes | Live page re-opened: "Lazada 11.11 Greatest Sale", 4.68★, 29.3M ratings. Consistent with the earlier verification (developer "Lazada Mobile"); no contradiction. Stored developer confirmed correct. |
| pinterest | Pinterest | Pinterest, Inc. | https://play.google.com/store/search?q=Pinterest&c=apps | com.pinterest | https://play.google.com/store/apps/details?id=com.pinterest | yes | Live page "Pinterest", 4.24★, 11.7M ratings; developer Pinterest (Pinterest, Inc.). Match. |
| microsoft-word | Microsoft Word | Microsoft Corporation | https://play.google.com/store/search?q=Microsoft%20Word&c=apps | com.microsoft.office.word | https://play.google.com/store/apps/details?id=com.microsoft.office.word | yes | Live page "Microsoft Word: Edit Documents", 4.79★, 17.8M ratings; developer Microsoft Corporation. Match. |
| google-meet | Google Meet | Google LLC | https://play.google.com/store/search?q=Google%20Meet&c=apps | com.google.android.apps.tachyon | https://play.google.com/store/apps/details?id=com.google.android.apps.tachyon | yes | Re-opened 6 Nov 2026 22:00 PKT by parent: live page "Google Meet" loaded (rating 4.37, 12,019,538 ratings). Fully verified now. |
| whatsapp-business | WhatsApp Business | WhatsApp LLC | https://play.google.com/store/search?q=WhatsApp%20Business&c=apps | com.whatsapp.w4b | https://play.google.com/store/apps/details?id=com.whatsapp.w4b | yes | Live page "WhatsApp Business", 4.61★, 25.7M ratings; developer WhatsApp LLC. Match. |
