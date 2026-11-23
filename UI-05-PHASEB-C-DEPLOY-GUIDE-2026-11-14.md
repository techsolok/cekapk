# CekAPK UI-05 — Deploy Guide: Phase B (Navigation) + Phase C (Category Hub & Guides)

**Package:** `CekAPK-UI05-PhaseB-C-2026-11-14.zip` — **SHA-256: see the delivery message — it carries the authoritative value**
**Contents:** 7 source files (4 Phase B + 3 Phase C) + Phase B report + Phase C report + this guide + manifest = 11 entries.
**Current live build:** UI-05 Phase A (deployed + verified live Nov 14 ~14:31–14:34 PKT).
**Rollback after this deploy:** `/root/cekapk-old` = Phase A build + the fresh hPanel snapshot taken in Step 2.

## What this deploys

- **Phase B — Navigation:** EN header Apps → `/en/aplikasi`; misleading EN Search pill removed (ID "Cari" untouched); EN footer gains "Apps in English" + 6 EN guide links; EN homepage CTA → `/en/aplikasi`; BottomNav Home active only on `/en`.
- **Phase C — Category hub & guides:** `/kategori` rebuilt as a CategoryCard grid with real counts (incl. Kesehatan "0 aplikasi"); Utilitas blurb corrected in `categories.ts`; "Daftar isi" TOC on all 6 Indonesian guides; guide H1 `text-[26px]` → `text-2xl`.

All Phase B + Phase C tests passed in the workspace (tsc 0, build 128 pages, check:seo all-pass, check:links 115 URLs 0 broken, check:negative OK; rendered verification for both phases — see the two reports inside the ZIP).

---

## Step 1 — Shop PC PowerShell (upload)

```powershell
cd C:\Users\TechSOL\Downloads
Get-FileHash .\CekAPK-UI05-PhaseB-C-2026-11-14.zip -Algorithm SHA256
scp .\CekAPK-UI05-PhaseB-C-2026-11-14.zip root@72.61.127.96:/root/
```

The hash **must** match the delivery SHA exactly. Say "done" when the upload finishes.

---

## Step 2 — Server window (snapshot + verify the file)

**First, take a fresh hPanel snapshot** — this is the rollback cover for this deploy (the Phase A snapshot is from earlier today; a fresh one captures the live Phase A state).

Then:

```bash
ls -la /root/CekAPK-UI05-PhaseB-C-2026-11-14.zip
sha256sum /root/CekAPK-UI05-PhaseB-C-2026-11-14.zip
```

The hash must match the delivery SHA exactly. Say "done" when the snapshot is taken and the hash matches.

---

## Step 3 — Server window, ⚠️PRODUCTION (stage, verify, build, test)

```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new
unzip -o /root/CekAPK-UI05-PhaseB-C-2026-11-14.zip
```

Then the verification greps. **These counts were computed from the workspace before packaging — they are the correct answers:**

```bash
grep -c 'href="/en/aplikasi"' src/components/Header.tsx
# expect 1

grep -c 'aria-label="Find apps"' src/components/Header.tsx
# expect 0 — NOTE: grep prints 0 and exits 1. That is the correct answer, not an error.

grep -c "Apps in English" src/components/Footer.tsx
# expect 1

grep -c "/en/panduan/" src/components/Footer.tsx
# expect 6

grep -c 'href: "/en/aplikasi"' "src/app/(en)/en/page.tsx"
# expect 1

grep -c 'it.href !== "/en"' src/components/BottomNav.tsx
# expect 1

grep -c "Browser, peta, transportasi" src/lib/data/categories.ts
# expect 1

grep -c "CategoryCard" "src/app/(id)/kategori/page.tsx"
# expect 2 (import + use)

grep -c "categoryCounts" "src/app/(id)/kategori/page.tsx"
# expect 3

grep -c "Daftar isi" "src/app/(id)/panduan/[slug]/page.tsx"
# expect 2 (aria-label + heading)

grep -c "scroll-mt-20" "src/app/(id)/panduan/[slug]/page.tsx"
# expect 4

grep -c "text-\[26px\]" "src/app/(id)/panduan/[slug]/page.tsx"
# expect 0 — NOTE: grep prints 0 and exits 1. That is the correct answer, not an error.

grep -c "text-muted" src/components/ui.tsx
# expect 5 (Phase A marker, must still be there)

grep -c "metaDescriptionEn" src/lib/data/i18n-en-apps-b.ts
# expect 5 (Phase A marker, must still be there)
```

Then build and test **in the staging dir**:

```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```

All four must pass. If any fails, **STOP — do not swap**. Say "done" when the build and all checks are green.

---

## Step 4 — Server window, ⚠️PRODUCTION (swap + one restart)

```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk
pm2 restart cekapk
pm2 status
```

`rm -rf /root/cekapk-old` first, as always — otherwise the move nests the old dir. One restart only. Say "done" when `pm2 status` shows `cekapk` online.

---

## Step 5 — Live verification (Muse does this)

After the restart, Muse verifies live: `/kategori` (card grid, all 10 counts, Kesehatan "0 aplikasi", Utilitas blurb), `/panduan/apakah-apkpure-aman` ("Daftar isi" box, H1 size), `/en` (header Apps, no Search pill, CTA), `/en/tools` (footer "Apps in English"), consent banner still solid white. A fresh tab is used for any page that looks stale (the checking browser's cache showed old content once before).

## Rollback (only if something is wrong live)

Reverse the swap from the server window, then one restart:

```bash
mv /root/cekapk /root/cekapk-new-bad
mv /root/cekapk-old /root/cekapk
cd /root/cekapk
pm2 restart cekapk
```

Or restore the fresh hPanel snapshot from Step 2. Do not delete `/root/cekapk-old` until the live verification passes.
