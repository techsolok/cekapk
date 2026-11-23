# Deploy Guide — EN App Pages: WhatsApp Business, Messenger, Snapchat, Discord — 2026-11-18

Same safe-deploy procedure as the batch-1 (Chrome/Facebook/Gmail/Maps) deploy. One block at a time; wait for "done" after each step. Shop PC PowerShell = upload/scp window; server window (`root@srv2112435`) = unzip/build/restart window.

## Step 1 — Shop PC PowerShell

```powershell
cd C:\Users\TechSOL\Downloads
Get-FileHash .\CekAPK-EN-Apps-WhatsAppBusiness-Messenger-Snapchat-Discord-2026-11-18.zip -Algorithm SHA256
scp .\CekAPK-EN-Apps-WhatsAppBusiness-Messenger-Snapchat-Discord-2026-11-18.zip root@72.61.127.96:/root/
```

The hash must match the SHA-256 in the delivery message. If the ZIP is not in Downloads, download it from the chat first.

## Step 2 — Server window

Fresh hPanel snapshot first (the one from the card-fix deploy captures the state *before* that deploy). Then:

```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new && unzip -o /root/CekAPK-EN-Apps-WhatsAppBusiness-Messenger-Snapchat-Discord-2026-11-18.zip
```

If `/root/cekapk-new` already exists from an earlier attempt, remove it first (`rm -rf /root/cekapk-new`) — otherwise `cp -a` nests a copy inside it. Confirm the unzip lists 7 entries.

## Step 3 — Server window, in /root/cekapk-new

Greps first (numbers must come back **13, 1, 1, 1, 1, 1, 1, 1** in this order):

```bash
grep -c 'verifiedAtEn: "2026-11-18"' src/lib/data/i18n-en-apps-b.ts
grep -c 'enAppSlugs.length === 19' scripts/check-seo.mjs
grep -c 'EN apps Nov 2026 (batch 2)' scripts/check-seo.mjs
grep -c 'English guides for 19 Android apps' "src/app/(en)/en/aplikasi/page.tsx"
grep -c 'slug: "whatsapp-business"' src/lib/data/i18n-en-apps-b.ts
grep -c 'slug: "messenger"' src/lib/data/i18n-en-apps-b.ts
grep -c 'slug: "snapchat"' src/lib/data/i18n-en-apps-b.ts
grep -c 'slug: "discord"' src/lib/data/i18n-en-apps-b.ts
```

Then the build and checks (run each block ONCE — `check:links` leaves a test server on port 3102 running; rebuilding after a check makes the next check test a stale server. If a check must be re-run, kill the 3102 server first: `pkill -f "next-server"` and confirm `ss -ltnp | grep 3102` is empty):

```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```

Build must be clean (143 pages) and all three checks must pass.

## Step 4 — Server window

```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk && pm2 restart cekapk
```

The `rm -rf` goes first so the move does not nest the old directory. One restart only.

## Step 5 — Live verification (Muse)

Direct reads in fresh tabs: the 4 new pages live with exact titles + "Last checked by an editor: Nov 18, 2026"; hub lists 19 app cards; sitemap/en.xml lists the 4 new entries with lastmod 2026-11-18.

## Rollback

`/root/cekapk-old` = pre-deploy build + the fresh hPanel snapshot taken in Step 2. To roll back: `rm -rf /root/cekapk && mv /root/cekapk-old /root/cekapk && cd /root/cekapk && pm2 restart cekapk`.
