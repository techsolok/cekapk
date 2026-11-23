# CekAPK UI-05 Phase B + C — Deploy Manifest

Package: CekAPK-UI05-PhaseB-C-2026-11-14.zip
Date: 2026-11-14
Baseline: deployed UI-05 Phase A tree + Phase B + Phase C workspace changes

## Source files (SHA-256, workspace copies)
- src/components/Header.tsx  2429 bytes  6663299fa2899e1e2524cb15950ae8f93822d94b7d80b425ef55f9787883b126
- src/components/Footer.tsx  4674 bytes  6a768a3fbcf8cc1d1df9254d2bdeb72aa0ca45cf57e9974d6e88e53d4e2f3475
- src/components/BottomNav.tsx  2103 bytes  88e51386c1fb356f04613e9b4fa7677c9df0db36e32ae39170a2d6108970a55e
- src/app/(en)/en/page.tsx  8706 bytes  f605cfe9de88bc5557b1440beb7218379dacbe5728cf022c873cb48885e2517b
- src/app/(id)/kategori/page.tsx  2765 bytes  a51dc01456b91866dc4b87bc0c0ebe5f1d576c1009b63c2abcbb50f38d84bf9c
- src/lib/data/categories.ts  5658 bytes  f68b5dff5f75ead792f5903bfb8d7a1c67f41b05418d9bb13b5af378bb62d9ca
- src/app/(id)/panduan/[slug]/page.tsx  5041 bytes  b7e66cff66063300cc597297e2e7794bef1442de6aab24123e611d2b48458d37

## Other entries
- UI-05-PHASEB-2026-11-14.md (Phase B preview report)
- UI-05-PHASEC-2026-11-14.md (Phase C preview report)
- UI-05-PHASEB-C-DEPLOY-GUIDE-2026-11-14.md (this deploy guide)
- MANIFEST-UI-05-PHASEB-C-2026-11-14.md (this file)

## Notes
- No .env, secrets, node_modules, .next, or build output in this ZIP.
- Phase A files are NOT in this ZIP (already live); the staging greps in the deploy guide re-check two Phase A markers (ui.tsx text-muted x5, i18n-en-apps-b.ts metaDescriptionEn x5).
