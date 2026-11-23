# Manifest — CekAPK Author / Byline — 2026-11-18

Package: CekAPK-Author-Byline-2026-11-18.zip
Built: 2026-11-18 (workspace only, NOT deployed)
Baseline: live build = audit-fix (Nov 18) + UI-05 Phase E (Nov 18)
SHA-256 of this ZIP: (in the delivery message and MEMORY.md — the manifest never carries its own ZIP's hash)

## Contents (12 entries)

Source files (9):
- src/lib/data/author.ts (NEW)
- public/images/author-ahmad-raza.png (NEW, 129,965 bytes)
- src/components/ui.tsx (AuthorByline added)
- src/lib/seo.tsx (articleJsonLd author → Person)
- src/app/(id)/panduan/[slug]/page.tsx (byline)
- src/app/(en)/en/panduan/[slug]/page.tsx (byline)
- src/app/(id)/tentang/page.tsx (Tentang Penulis + date 18 November 2026)
- src/app/(en)/en/about/page.tsx (About the Author + date 18 November 2026)
- scripts/check-links.mjs (&amp; decode fix in extractLinks)

Docs (3):
- AUTHOR-BYLINE-2026-11-18.md (report, §1–§7)
- AUTHOR-BYLINE-DEPLOY-GUIDE-2026-11-18.md (Steps 1–5 + rollback)
- MANIFEST-AUTHOR-BYLINE-2026-11-18.md (this file)

## Verification at packaging time

- tsc 0 errors; build clean, 128 pages (BUILD_ID ZEiGAYavNClHlgAEhpdqK)
- check:seo ALL PASSED; check:links 115/158/0/0; check:negative OK
- Rendered suite 36/36 PASS; visual suite 80/80 PASS (0px overflow, contrast ≥ 4.5:1, photo loads everywhere)
- Staging grep expectations: 1, 1, 2, 2, 1, 1, 1 + photo 129,965 bytes
