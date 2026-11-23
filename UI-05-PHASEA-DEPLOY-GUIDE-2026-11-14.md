# CekAPK UI-05 Phase A — Deploy Guide

**Package:** `CekAPK-UI05-PhaseA-2026-11-14.zip` · **SHA-256:** see the delivery message (the SHA in this file is the one to match)
**What it deploys:** UI-05 Phase A only — /en/tools metadata, contrast sweep (24 files), 5 English guide meta descriptions + 3 title fixes. No Phase B–E, no API/backend/env/dependency/GA4 changes.
**Rollback:** `/root/cekapk-old` (pre-Phase-A build) + the fresh hPanel snapshot taken in Step 2.

## Golden rule
**Upload (scp) = shop PC PowerShell window. Unzip, build and restart = server window (`root@srv2112435`).** One command block at a time; say "done" after each block.

---

## Step 1 — SHOP PC PowerShell (upload)

```powershell
cd C:\Users\TechSOL\Downloads
Get-FileHash .\CekAPK-UI05-PhaseA-2026-11-14.zip -Algorithm SHA256
scp .\CekAPK-UI05-PhaseA-2026-11-14.zip root@72.61.127.96:/root/
```

The hash **must match** the SHA-256 in the delivery message exactly. If it does not match, stop — do not upload or deploy; re-download the ZIP and check again. Say **"done"** when the upload finishes.

## Step 2 — SERVER (snapshot + verify the upload)

```bash
ls -la /root/CekAPK-UI05-PhaseA-2026-11-14.zip
sha256sum /root/CekAPK-UI05-PhaseA-2026-11-14.zip
```

1. **Take a fresh hPanel snapshot FIRST** (the Nov 14 UI-04 snapshot has lapsed by now).
2. The server `sha256sum` must match the delivery SHA-256 exactly. Say **"done"** when the snapshot is taken and the hash matches.

## Step 3 — SERVER ⚠️ PRODUCTION (stage, verify, build, test)

```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new
unzip -o /root/CekAPK-UI05-PhaseA-2026-11-14.zip
```

Then run the verification greps. **Counts were verified against the workspace before packaging — these are the correct expected values:**

```bash
grep -c "metaDescriptionEn" src/lib/data/i18n-en-apps-b.ts
# expect 5 (the five thin English guides)

grep -c "TikTok, Instagram & Permission Checker" "src/app/(en)/en/tools/page.tsx"
# expect 1

grep -c "Explore CekAPK tools" "src/app/(en)/en/tools/page.tsx"
# expect 1

grep -c "Complete Guide" src/lib/data/i18n-en-apps-b.ts
# expect 0 — NOTE: grep prints 0 and exits 1. That is the correct answer, not an error.

grep -rn "text-ink/\(50\|55\|60\)" src/ --include="*.tsx" | grep -v "admin/" | wc -l
# expect 1 — the FaqAccordion chevron SVG in ui.tsx:68 (an icon, not text; intentionally left)

grep -c "text-muted" src/components/ui.tsx
# expect 5

grep -c "verifiedAtEn" src/lib/data/i18n-en-apps-b.ts
# expect 1 — APKPure only (no dates were added to the five thin guides, by design)
```

Then build and test in the staging dir:

```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```

**All four must pass.** If any fails, STOP — do not swap. Say **"done"** when the build and all checks are green, and paste any failure output.

## Step 4 — SERVER ⚠️ PRODUCTION (swap + single restart)

```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk
pm2 restart cekapk
pm2 status
```

`rm -rf /root/cekapk-old` FIRST — otherwise `mv` nests the old dir inside the new one. One restart only. Say **"done"** when `pm2 status` shows `cekapk` online.

## Step 5 — Live verification (after Step 4)

Check these in a browser (hard refresh if a page looks stale):
1. https://cekapk.com/en/tools — H1 "Free Tools", 3 cards, "Available in Indonesian only for now."
2. https://cekapk.com/en/panduan/cara-instal-apk-aman — title "How to Install Apps Safely on Android" (no "(Complete Guide)"), no "Last checked" line.
3. https://cekapk.com/en/panduan/apa-itu-apk-ijo — title "What Is 'APK Ijo'? Meaning and Risks of the Viral Term".
4. https://cekapk.com/panduan/apakah-apkpure-aman — date line "Terakhir dicek: 2026-11-04" clearly readable; breadcrumb readable.
5. https://cekapk.com/aplikasi/tiktok — FactBox labels and "Terakhir dicek" line clearly readable.
6. https://cekapk.com/en/aplikasi/tiktok — same, in English.
7. Consent banner: still solid opaque white (unchanged by this deploy).

## Rollback

If anything is wrong after Step 4:

```bash
rm -rf /root/cekapk-new
mv /root/cekapk /root/cekapk-new
mv /root/cekapk-old /root/cekapk
cd /root/cekapk
pm2 restart cekapk
```

Or restore the fresh hPanel snapshot from Step 2.
