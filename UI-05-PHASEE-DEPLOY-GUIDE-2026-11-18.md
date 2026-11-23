# UI-05 Phase E — Deploy Guide (2026-11-18)

**Package:** `CekAPK-UI05-PhaseE-2026-11-18.zip` (SHA-256 in `MANIFEST-UI-05-PHASEE-2026-11-18.md`)
**Contents:** 2 source files (`src/lib/data/i18n-en-apps-b.ts`, `src/app/sitemap.ts`) + this guide + `UI-05-PHASEE-2026-11-18.md` + manifest.
**Type:** PATCH — applied over a copy of the live directory, never over the running one. Same safe-deploy procedure as UI-04 / UI-05 Phase A / Phase B+C / Phase D / audit-fix.

## Step 1 — Shop PC PowerShell: verify hash + upload

```powershell
Get-FileHash .\CekAPK-UI05-PhaseE-2026-11-18.zip -Algorithm SHA256
scp .\CekAPK-UI05-PhaseE-2026-11-18.zip root@72.61.127.96:/root/
```

The hash must match the manifest exactly. If it does not, stop — the ZIP is not the one in this guide.

## Step 2 — Server window: fresh snapshot + staging copy + unzip

Take a fresh hPanel snapshot first (the Nov 18 snapshot has lapsed by now). Then:

```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new && unzip -o /root/CekAPK-UI05-PhaseE-2026-11-18.zip
```

## Step 3 — Server window: staging greps + build + checks

Grep expectations (each count includes APKPure's pre-existing 1):

```bash
grep -c "sectionsEn:" src/lib/data/i18n-en-apps-b.ts
# must print 6
grep -c 'verifiedAtEn: "2026-11-18"' src/lib/data/i18n-en-apps-b.ts
# must print 5
grep -c "verifiedAtEn:" src/lib/data/i18n-en-apps-b.ts
# must print 6
grep -c "g.verifiedAtEn" src/app/sitemap.ts
# must print 1
grep -c "bodyEn: \[\]," src/lib/data/i18n-en-apps-b.ts
# must print 6
grep -c "relatedAppsEn:" src/lib/data/i18n-en-apps-b.ts
# must print 6
```

Then:

```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```

Build must be clean (128 pages). All three checks must pass. If any grep or check fails, stop and report — do not swap.

## Step 4 — Server window: swap + single restart

```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk && pm2 restart cekapk
```

`rm -rf /root/cekapk-old` FIRST — otherwise the move nests the old directory. One restart only.

## Step 5 — Verify live

- https://cekapk.com/en/panduan/apa-itu-apk-hijau — "Last checked: 2026-11-18 — English edition", "On this page" box with 4 sections, 5 FAQs, Related Apps.
- https://cekapk.com/en/panduan/cara-instal-apk-aman — 6 numbered steps, "Last checked: 2026-11-18".
- https://cekapk.com/sitemap/en.xml — the 5 guides show `<lastmod>2026-11-18T00:00:00.000Z</lastmod>`; APKPure shows 2026-11-07.
- Spot-check one Indonesian page is unchanged: https://cekapk.com/panduan/apa-itu-apk-hijau

Rollback: `/root/cekapk-old` is the pre-Phase-E (audit-fix) build.
