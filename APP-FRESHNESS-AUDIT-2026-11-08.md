# CekAPK — App Information Freshness Audit (Phase 2A, Correction C)

**Date:** 8 November 2026
**Auditor:** Muse (read-only audit of source data + existing verification records; no live re-verification performed)
**Scope:** 6 pages — /aplikasi/instagram, /aplikasi/whatsapp, /aplikasi/tiktok, /en/aplikasi/tiktok, /aplikasi/minecraft, /aplikasi/kucing-apk
**Production:** not modified. No dates were changed in this release — nothing was freshly verified, so no last-checked date was moved.

## Verification sources used (existing mechanisms only)

- Source data records: `src/lib/data/apps-parts/part1–4.ts`, `src/lib/data/i18n-en-apps-a.ts`, `src/lib/data/i18n-en-apps-b.ts`.
- `play-package-ids.md` (6 Nov 2026): every package ID + developer name verified one by one against the live Play Store.
- The app page template (`src/app/(id)/aplikasi/[slug]/page.tsx`, `src/app/(en)/en/aplikasi/[slug]/page.tsx`) — what the page actually renders.
- `lastCheckedInfo` (`src/lib/last-checked.ts`): stale = more than 90 days since `verifiedAt`.
- Phase 1 verification report (7 Nov 2026) for the library pipeline.

Nothing was checked live in this release. Anything marked "verified" below was verified by one of the sources above; anything else is marked as it stands.

## Per-page field table

All five Indonesian records carry `verifiedAt: "2026-10-18"` (21 days old on 8 Nov 2026). The English TikTok page reuses the same base record, so it shares the same date.

| Field | Instagram | WhatsApp | TikTok (ID + EN) | Minecraft | Kucing APK |
|---|---|---|---|---|---|
| Developer | Meta Platforms, Inc. — verified live 6 Nov (exact match) | Meta Platforms, Inc. (WhatsApp LLC) — verified live 6 Nov (matches storefront + About) | TikTok Pte. Ltd. — verified live 6 Nov (exact match) | Mojang (Microsoft) — verified live 6 Nov (storefront Mojang, About Microsoft) | "Tidak resmi - developer tidak terverifikasi" — accurate, preserved |
| Package ID | com.instagram.android — verified live 6 Nov | com.whatsapp — verified live 6 Nov | com.zhiliaoapp.musically — verified live 6 Nov | com.mojang.minecraftpe — verified live 6 Nov | None — not on Play Store, correct |
| Official source URL | play.google.com/store/apps/details?id=com.instagram.android — verified live 6 Nov | details?id=com.whatsapp — verified live 6 Nov | details?id=com.zhiliaoapp.musically — verified live 6 Nov | details?id=com.mojang.minecraftpe — verified live 6 Nov | null — correct, no official source exists |
| Version | versionNote "Selalu versi resmi terbaru dari Play Store" — see note V1 | Same — see V1 | Same — see V1 | Same — see V1 | "Tidak ada versi resmi - aplikasi ini tidak ada di Play Store" — accurate |
| Size / min Android | "Bervariasi menurut perangkat" (both) — matches Play Store behaviour | Same | Same | Same | "Tidak terverifikasi" (both) — accurate |
| Price | "Gratis (ada iklan & pembelian dalam aplikasi)" | "Gratis" | "Gratis (ada iklan & pembelian dalam aplikasi)" | "Berbayar - sekali beli (harga resmi di Play Store)" — no price number printed (deliberate; the page defers to the Play Store listing) | "Klaim gratis dari sumber tidak resmi - bukan penawaran resmi" — accurate |
| Last verified | 2026-10-18 — current (see note D1) | 2026-10-18 — current | 2026-10-18 — current | 2026-10-18 — current | 2026-10-18 — current |
| Permissions | Editorial summary + on-page disclaimer (see note P1) | Same | Same | Same | Editorial summary; page states honestly there is no standard permission list to check |
| Security claims | No numeric score (see note S1); qualitative safety section | Same | Same | Same | No numeric score; safety section appropriately negative |
| Download availability | OfficialButton → Play Store | OfficialButton → Play Store | OfficialButton → Play Store (both editions) | OfficialButton → Play Store | No button; explicit no-download box (ID) + warning (EN) |

### Notes

- **V1 — Version.** The `versionNote` "Selalu versi resmi terbaru dari Play Store" describes the distribution channel (installing from Play Store always gives the latest official version at install time), not a measured version number. **No version number is printed anywhere on any of these pages** — consistent with the no-fabrication rule. It must not be read as "CekAPK verified the current version number": no version number was ever collected. Flagged as wording to watch; the changelog section already explains why no numbers are printed.
- **D1 — Last verified date.** All six pages: 2026-10-18, the Fase 1 editorial verification. 21 days old on 8 Nov 2026 — **not stale** under the 90-day rule. Stale threshold: ~16 January 2027. The dates were **not changed** in this release (rule: never move a last-checked date without actually checking). Manual re-check is due by ~16 Jan 2027.
- **P1 — Permissions.** The permission lists are editor-written summaries, **not live Play Store permission dumps**. The page itself discloses this: "Daftar izin persis dapat berbeda antar versi dan perangkat. Selalu periksa di halaman Play Store aplikasi dan di Pengaturan > Aplikasi > {nama} > Izin." Flagged for awareness, not a defect — the disclosure is on the page.
- **S1 — Security claims.** `SafetyScore` is rendered with `score={null}` on every catalog app page, with the on-page explanation that numeric scores exist only for files hosted by CekAPK that passed the Fase 4 pipeline. No fabricated scores exist on any of the six pages.

## Stale or unverified fields (the list the brief asked for)

1. **`verifiedAt` 2026-10-18 on all six pages** — 21 days old; current under the 90-day rule, but not re-verified since 18 Oct 2026. Manual review due by ~16 Jan 2027. **Action taken: none** (dates left truthful; no fresh verification was performed).
2. **Permissions on all six pages** — editorial summaries, not live-verified against the Play Store permission list. The page discloses this. **Action taken: none** (disclosure is already on the page).
3. **Version (all four Play Store apps)** — the `versionNote` is a channel statement, not a measured version number; the current version number of each app was never collected. **Action taken: none** (no number is printed, so nothing is misrepresented; wording flagged in V1).
4. **Developer / package ID / official URL (all four Play Store apps)** — last verified live on 6 Nov 2026 (2 days old). Current; no action needed.

## Unsupported claims found and fixed in this release

1. **"Halaman ini dicek ulang berkala; fakta versi selalu versi resmi terbaru dari sumbernya."** — shown on every non-stale app page, including all five sample pages. Two unsupported claims in one sentence: (a) no periodic re-check mechanism exists (the only mechanism is the 90-day stale flag + admin list); (b) version facts are not verified against the official source. **Fixed:** the sentence now reads "Halaman ini ditandai untuk dicek ulang setelah 90 hari." — it describes the real mechanism.
2. **"Cara Instal {app} dari Sumber Resmi" (Play Store steps) rendered on the Kucing page.** Kucing is not on Play Store; the section told readers to install it from there. **Fixed:** the section now renders only when the app has an `officialUrl`; info-only apps show an accurate note ("Tidak ada cara resmi memasang {app}: aplikasi ini tidak ada di Google Play Store…").
3. **"Catatan Versi & Changelog": "{app} diperbarui langsung oleh developer-nya lewat Play Store" rendered on the Kucing page.** **Fixed:** conditional — info-only apps now read "{app} tidak ada di Play Store dan tidak diperbarui lewat jalur resmi; karena itu kami tidak mencetak nomor versi di halaman ini."
4. **Perpustakaan step 5: "hash dicek ulang secara berkala".** No periodic re-check exists. **Fixed:** "hash dicek ulang setiap kali diterbitkan dan setiap kali diunduh" — matches the methodology page wording fixed in Phase 1 rev3.
5. **Kucing metadata** (title, meta, OG, Twitter): "Terbaru 2026 - Info, Versi & Link Resmi", "Official Download", "versi resmi", "link ke sumber resmi" — all false for Kucing. **Fixed** via metadata overrides (Correction A). OG image eyebrow "Info & Link Resmi" also fixed (now neutral for info-only apps).
6. **Perpustakaan metadata**: "File Open-Source Terverifikasi" — the library is empty. **Fixed** (Correction B).

## Claims checked and kept (accurate)

- **"masuk antrean cek ulang" / "masuk antrean cek ulang otomatis setelah 90 hari"** — the "queue" is the admin page's stale list, which populates automatically from `verifiedAt` dates (admin page: "Halaman otomatis masuk daftar ini 90 hari setelah tanggal cek terakhirnya"); the /keamanan page lists the stalest pages. The wording describes automatic *listing*, not an automated re-check job. Kept.
- **Changelog (Play Store apps only, after the fix): "versi yang kamu terima selalu versi resmi terbaru pada saat kamu menginstal dari sumber resmi"** — describes Play Store distribution behaviour, not a CekAPK measurement. Kept.
- **SafetyScore null + on-page explanation** — accurate. Kept.
- **"Skor angka hanya kami berikan untuk file yang kami host dan lolos pipeline verifikasi Fase 4"** — accurate. Kept.

## What was NOT verified in this release (honest limits)

- No live Play Store re-check was performed; `verifiedAt` dates are unchanged.
- No version numbers were collected (by design — the site never prints them).
- Instagram Reel extraction, Permission Checker with a real screenshot, dark mode + PWA on a real device — still pending, unchanged from before.
