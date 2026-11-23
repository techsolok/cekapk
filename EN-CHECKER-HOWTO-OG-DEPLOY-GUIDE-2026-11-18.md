# Deploy Guide — EN Permission Checker + HowTo + Per-Tool OG Images (18 Nov 2026)

Package: `CekAPK-EN-Checker-HowTo-OG-2026-11-18.zip` — 19 source files + this guide + the report + the manifest (22 entries). SHA-256 is in the delivery message and in MEMORY.md (the manifest inside the ZIP cannot contain the ZIP's own hash).

## Safe-deploy procedure (same as all recent deploys)

**Step 1 — shop PC PowerShell window** (ZIP must be in `C:\Users\TechSOL\Downloads` first):
```powershell
cd C:\Users\TechSOL\Downloads
Get-FileHash .\CekAPK-EN-Checker-HowTo-OG-2026-11-18.zip -Algorithm SHA256
scp .\CekAPK-EN-Checker-HowTo-OG-2026-11-18.zip root@72.61.127.96:/root/
```
The hash must match the one in the delivery message. Tell Muse when done.

**Step 2 — server window** (`root@srv2112435`): fresh hPanel snapshot first, then:
```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new && unzip -o /root/CekAPK-EN-Checker-HowTo-OG-2026-11-18.zip
```

**Step 3 — still in the server window**, in `/root/cekapk-new`. Run the greps in the report §6 (EN-CHECKER-HOWTO-OG-2026-11-18.md). Expected, in order: **1, 20, 20, 20, 1, 1, 6, 6, 6, 1, 0, 7, 2**. (The "0" grep exits 1 — that is the expected result, not an error.) If they match, run:
```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```
Build must be clean (135 pages) and all three checks must pass.

**Step 4 — still in the server window:**
```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk && pm2 restart cekapk
```
The `rm -rf` goes first so the move does not nest the old directory. One restart only.

**Step 5 — live verification (Muse does this):** EN checker page renders in English with the 4 steps and FAQs; ID checker page shows the en-US alternate; EN hub card links to the EN checker page; one OG image loads as a PNG; sitemap/en.xml lists the new page.

## Rollback

`/root/cekapk-old` = pre-deploy (author/byline) build + the fresh hPanel snapshot taken in Step 2. To roll back: swap the directories back and `pm2 restart cekapk`.
