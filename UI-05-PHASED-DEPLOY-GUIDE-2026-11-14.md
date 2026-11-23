# CekAPK UI-05 Phase D — Deploy Guide

**Package:** `CekAPK-UI05-PhaseD-2026-11-14.zip`
**SHA-256:** see the delivery message (the authoritative check).
**Contents:** 2 source files + `UI-05-PHASED-2026-11-14.md` (report) + this guide + `MANIFEST-UI-05-PHASED-2026-11-14.md`.
**Baseline on server:** Phase A + B + C + Bstation SEO rev2 (all live). This is a partial patch applied over a copy of the live dir — NOT a full-site snapshot.

**Golden rule:** upload (scp) = your PC PowerShell window. Unzip / build / restart = the server window (`root@srv2112435`).

## Step 1 — PC PowerShell: verify hash, upload

```powershell
Get-FileHash "C:\Users\TechSOL\Downloads\CekAPK-UI05-PhaseD-2026-11-14.zip" -Algorithm SHA256
scp "C:\Users\TechSOL\Downloads\CekAPK-UI05-PhaseD-2026-11-14.zip" root@72.61.127.96:/root/
```

(Home PC path is `C:\Users\Ahmad Razza\Downloads` — confirm which PC you are on first. The hash must match the SHA-256 in the delivery message exactly.)

## Step 2 — Server: fresh snapshot, then staging copy

1. Take a **fresh hPanel snapshot** first (snapshots lapse after ~24h).
2. In the server window:

```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new
unzip -o /root/CekAPK-UI05-PhaseD-2026-11-14.zip
```

## Step 3 — Server (in /root/cekapk-new): staging greps + build + checks

Expected counts — computed from the workspace before packaging. Each grep must print the number shown; a different number means STOP and re-check.

```bash
grep -c 'id="cari-katalog"' 'src/app/(id)/aplikasi/page.tsx'
# expect 1
grep -c 'id="search-catalog"' 'src/app/(en)/en/aplikasi/page.tsx'
# expect 1
grep -c 'Bersihkan pencarian' 'src/app/(id)/aplikasi/page.tsx'
# expect 1
grep -c 'Clear search' 'src/app/(en)/en/aplikasi/page.tsx'
# expect 1
grep -c 'method="get"' 'src/app/(id)/aplikasi/page.tsx' 'src/app/(en)/en/aplikasi/page.tsx'
# expect 2 (one per hub)
grep -c 'text-muted' src/components/ui.tsx
# expect 5  (Phase A marker — must still be there)
grep -c 'metaDescriptionEn' src/lib/data/i18n-en-apps-b.ts
# expect 5  (Phase A marker — must still be there)
```

Then, still in `/root/cekapk-new`:

```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```

All four must pass. The build must show 128 pages.

## Step 4 — Server: swap + single restart

```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk
pm2 restart cekapk
pm2 status
```

(`rm -rf /root/cekapk-old` FIRST — otherwise `mv` nests the old dir inside it.)

## Step 5 — Live verification

- `/aplikasi` shows the search box under "Katalog Aplikasi" (label "Cari aplikasi di katalog", "Cari" button).
- Type `tiktok` and submit → "Hasil pencarian untuk "tiktok": 2 aplikasi ditemukan" (TikTok + CapCut — CapCut's tagline mentions TikTok).
- "Bersihkan pencarian" returns all 50 apps.
- `/en/aplikasi` shows the English box ("Search the app catalog", "Search" button); `tiktok` → 2 results; "Clear search" returns all 11 English guides.
- Spot-check Phase B/C still live: EN header "Apps" → `/en/aplikasi`; `/kategori` card grid; an ID guide's "Daftar isi" box.

## Rollback

`/root/cekapk-old` = the pre-Phase-D build, plus the fresh hPanel snapshot from Step 2. To roll back: swap the dirs back and `pm2 restart cekapk`.
