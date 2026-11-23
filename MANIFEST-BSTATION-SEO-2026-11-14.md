# Manifest — CekAPK Bstation SEO (Preview Only, FINAL rev2), 14 November 2026

Package: `CekAPK-Bstation-SEO-2026-11-14-rev2.zip`
Mode: preview only. No production access, no deploy. Deploy only on Ahmad's separate approval.
Supersedes: `CekAPK-Bstation-SEO-2026-11-14.zip` (first preview — 174-char description + interim history wording). Do not deploy the first package.

## Entries (4)

1. `src/lib/data/apps-parts/part4.ts` — Bstation record only (developer BALABOOM PTE. LTD. (Bilibili), seoTitle, seoDescription 149 chars, intro, 2 section paragraphs incl. final history wording, 1 feature, 1 permission meaning)
2. `src/lib/data/i18n-en-apps-b.ts` — Bstation English record only (introEn, whatEn[1] incl. final history wording)
3. `BSTATION-SEO-2026-11-14.md` — full report incl. §9 final corrections (14 Nov evening)
4. `MANIFEST-BSTATION-SEO-2026-11-14.md` — this file

## Final corrections in rev2 (vs first preview)

1. History wording → Ahmad's final text (ID: "kamu dapat menggunakan fitur riwayat tontonan dan daftar favorit yang tersedia di akunmu"; EN: "you can use the viewing history and favourites features available with your account").
2. Meta description → 149-char version (was 174 chars).
3. EN BALABOOM consistency verified rendered: identity header + Quick Facts Developer row + install step 2 + SoftwareApplication author all show BALABOOM PTE. LTD. (Bilibili); old "Bilibili (Bstation)" 0 occurrences in EN body.

## Verification (local, before packaging)

- `npx tsc --noEmit`: 0 errors
- `npm run build`: clean, 128 pages, BUILD_ID yoaGQxevc1I_pmhn8znez
- `npm run check:seo`: ALL PASSED (no assertion changed)
- `npm run check:links`: ALL PASSED (115 sitemap URLs, 0 broken)
- `npm run check:negative`: OK
- Rendered (Playwright, port 3100): ID title exactly the proposed 49-char title; description exactly the 149-char version; canonical + hreflang unchanged; OG/Twitter consistent; EN BALABOOM verified in all 4 places; 0px overflow at 1440/390/360 (ID + EN)
- Scope: only the 2 source files above were modified in `src/`

## SHA-256

See the delivery message (computed from the final ZIP).
