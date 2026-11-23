# CekAPK — UI-04 Deployment Guide (Tools Pages Redesign)

**Package:** `CekAPK-UI04-Tools-Redesign-2026-11-14.zip`
**Baseline:** UI-03 Revision 1 (live since 14 Nov 2026, ~12:11 PKT)
**Contents:** exactly the 10 approved UI-04 source files + this guide + the implementation report + the file manifest. No `.env`, no secrets, no `node_modules`, no `.next`, no build artefacts.
**ZIP SHA-256:** see the delivery message (the value in the chat report is authoritative — this guide was written before the archive was created, so it cannot contain its own archive checksum). After extraction, verify every file against `MANIFEST-UI-04-2026-11-14.md` (per-file SHA-256).

**Golden rule (Ahmad's words): upload/scp = his PC PowerShell window; unzip/build/restart = server window (`root@srv2112435`). Name the window for every command block. One block at a time — wait for "done" before the next.**

**Do NOT run any step marked ⚠️ PRODUCTION until Ahmad gives separate explicit deploy approval.** Steps 1–2 below are preparation only (download + hash check on the PC, snapshot on the server); Steps 3–5 modify production.

---

## Step 1 — Shop PC PowerShell: download + verify the ZIP

Run in **PC PowerShell** (`PS C:\Users\TechSOL>` — the shop PC):

```powershell
cd C:\Users\TechSOL\Downloads
Get-FileHash .\CekAPK-UI04-Tools-Redesign-2026-11-14.zip -Algorithm SHA256
```

Compare the printed hash with the SHA-256 in the delivery message. **If it does not match exactly, STOP — do not upload.** Delete the file and download it again.

Then upload to the server (still **PC PowerShell**):

```powershell
scp .\CekAPK-UI04-Tools-Redesign-2026-11-14.zip root@72.61.127.96:/root/
```

Wait for the transfer to finish, then confirm the file is on the server before going further.

## Step 2 — Server: fresh backup FIRST

Run in the **server window** (`root@srv2112435`):

1. Take a fresh snapshot in the Hostinger hPanel first (the 14 Nov snapshot has lapsed). Do not skip this — it is the rollback cover.
2. Then, on the server:

```bash
ls -la /root/CekAPK-UI04-Tools-Redesign-2026-11-14.zip
sha256sum /root/CekAPK-UI04-Tools-Redesign-2026-11-14.zip
```

The server hash must match the PC hash and the delivery message. **If it does not match, STOP.**

## Step 3 — ⚠️ PRODUCTION: stage the patch in a separate directory

Run in the **server window**. This stages the change WITHOUT touching the live directory:

```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new
unzip -o /root/CekAPK-UI04-Tools-Redesign-2026-11-14.zip
```

Verify the patch landed (each grep must print `1`):

```bash
grep -c "@account/video" src/components/TiktokTool.tsx
grep -c "Free Tools" src/app/\(en\)/en/tools/page.tsx
grep -c "Indonesian only" src/app/\(en\)/en/tools/page.tsx
grep -c "tiktok-downloader" src/app/\(en\)/en/tools/instagram-downloader/page.tsx
grep -c "file:bg-primary-soft" src/app/\(id\)/tools/pemeriksa-izin/PermissionChecker.tsx
grep -c "UI-04" scripts/check-seo.mjs
ls src/components/TiktokTool.tsx src/components/ui.tsx "src/app/(id)/tools/page.tsx" "src/app/(en)/en/tools/page.tsx" "src/app/(id)/tools/pengunduh-tiktok/page.tsx" "src/app/(id)/tools/pengunduh-instagram/InstagramTool.tsx" "src/app/(en)/en/tools/instagram-downloader/InstagramToolEn.tsx" "src/app/(en)/en/tools/instagram-downloader/page.tsx" "src/app/(id)/tools/pemeriksa-izin/PermissionChecker.tsx" scripts/check-seo.mjs
```

Then run the full checks in the staging directory:

```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```

**All four must pass.** If any fails, STOP — do not swap directories. Report the failure.

## Step 4 — ⚠️ PRODUCTION: swap directories + single restart

Run in the **server window**. Remove the old rollback directory FIRST (otherwise `mv` nests the directory inside it — the known trap):

```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
pm2 restart cekapk
pm2 status
```

`pm2 status` must show `cekapk` as `online`. One restart only — do not restart again unless the app is not online.

## Step 5 — Live verification (all seven routes)

Check each URL in a browser (or `curl -s -o /dev/null -w "%{http_code}" <url>` — expect `200` on all seven):

1. `https://cekapk.com/tools` — hub with three tool cards (icons on each card).
2. `https://cekapk.com/tools/pengunduh-tiktok` — form with the hint line "Didukung: tautan video tiktok.com…", placeholder `@akun`.
3. `https://cekapk.com/tools/pengunduh-instagram` — form with the hint line "Didukung: kiriman video, Reels, dan IGTV publik."
4. `https://cekapk.com/tools/pemeriksa-izin` — dashed upload box with a styled file button.
5. `https://cekapk.com/en/tools` — **directory page "Free Tools" with three cards** (NOT a TikTok form); Permission Checker card shows "Available in Indonesian only for now."
6. `https://cekapk.com/en/tools/tiktok-downloader` — placeholder `@account` (not `@akun`).
7. `https://cekapk.com/en/tools/instagram-downloader` — "Open TikTok Downloader" link goes to `/en/tools/tiktok-downloader`.

Also confirm: the consent banner still appears solid white and sits above the bottom navigation; no page shows an error; the sitemap still reports 115 URLs in Search Console (no new URLs were added, none removed).

**Phone tests after deploy (same open items as UI-03):** one TikTok download-options success test from the homepage; one Instagram Reel download test; one Permission Checker test with a real screenshot. These could not be proven from the sandbox.

## Rollback — ⚠️ PRODUCTION (only if something is wrong after Step 4)

Run in the **server window**:

```bash
rm -rf /root/cekapk-new
mv /root/cekapk /root/cekapk-new-broken
mv /root/cekapk-old /root/cekapk
pm2 restart cekapk
pm2 status
```

This restores the pre-UI-04 build (UI-03 Revision 1) exactly. If the app still does not come online, restore the fresh hPanel snapshot taken in Step 2.

**After a successful deploy:** `/root/cekapk-old` = pre-UI-04 (UI-03 Rev 1) build. Keep it until the next deploy replaces it.
