# Deploy Guide — EN App Pages: Chrome, Facebook, Gmail, Maps (18 Nov 2026)

Package: `CekAPK-EN-Apps-Chrome-Facebook-Gmail-Maps-2026-11-18.zip` — 8 changed files + this guide + the report + the manifest (11 entries). SHA-256 is in the delivery message and in MEMORY.md (the manifest inside the ZIP cannot contain the ZIP's own hash).

## Safe-deploy procedure (same as all recent deploys)

**Step 1 — shop PC PowerShell window** (ZIP must be in `C:\Users\TechSOL\Downloads` first):
```powershell
cd C:\Users\TechSOL\Downloads
Get-FileHash .\CekAPK-EN-Apps-Chrome-Facebook-Gmail-Maps-2026-11-18.zip -Algorithm SHA256
scp .\CekAPK-EN-Apps-Chrome-Facebook-Gmail-Maps-2026-11-18.zip root@72.61.127.96:/root/
```
The hash must match the one in the delivery message. Tell Muse when done.

**Step 2 — server window** (`root@srv2112435`): fresh hPanel snapshot first, then:
```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new && unzip -o /root/CekAPK-EN-Apps-Chrome-Facebook-Gmail-Maps-2026-11-18.zip
```

**Step 3 — still in the server window**, in `/root/cekapk-new`. Run the greps in the report §4 (EN-APPS-CHROME-FACEBOOK-GMAIL-MAPS-2026-11-18.md). Expected, in order: **9, 2, 8, 1, 1, 1, 1, 2, 1, 1, 1, 1**. (Grep #1 counts 9 because the file also holds the 5 Phase E guides, each with verifiedAtEn 2026-11-18 — 5 guides + 4 new apps.) If they match, run:
```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```
Build must be clean (139 pages) and all three checks must pass.

**Step 4 — still in the server window:**
```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk && pm2 restart cekapk
```
The `rm -rf` goes first so the move does not nest the old directory. One restart only.

**Step 5 — live verification (Muse does this):** the 4 new EN app pages render with "Last checked by an editor: Nov 18, 2026"; the EN hub lists 15 apps and `?q=chrome` returns 1 app; sitemap/en.xml lists the 4 new pages with lastmod 2026-11-18; an older EN app page (e.g. TikTok) still shows Oct 18, 2026.

## Rollback

`/root/cekapk-old` = pre-deploy (EN checker) build + the fresh hPanel snapshot taken in Step 2. To roll back: swap the directories back and `pm2 restart cekapk`.
