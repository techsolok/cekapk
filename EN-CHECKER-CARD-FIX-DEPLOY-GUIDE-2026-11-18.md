# Deploy Guide — EN Homepage Permission Checker Card Fix — 2026-11-18

Same safe-deploy procedure as the EN checker deploy. One block at a time;
wait for "done" after each step. Shop PC PowerShell = upload/scp window;
server window (`root@srv2112435`) = unzip/build/restart window.

## Step 1 — Shop PC PowerShell

```powershell
cd C:\Users\TechSOL\Downloads
Get-FileHash .\CekAPK-EN-Checker-Card-Fix-2026-11-18.zip -Algorithm SHA256
scp .\CekAPK-EN-Checker-Card-Fix-2026-11-18.zip root@72.61.127.96:/root/
```

The hash must match the SHA-256 in the delivery message. If the ZIP is not
in Downloads, download it from the chat first.

## Step 2 — Server window

Fresh hPanel snapshot first (the one from the EN apps deploy captures the
state *before* that deploy). Then:

```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new && unzip -o /root/CekAPK-EN-Checker-Card-Fix-2026-11-18.zip
```

If `/root/cekapk-new` already exists from an earlier attempt, remove it
first (`rm -rf /root/cekapk-new`) — otherwise `cp -a` nests a copy inside
it. Confirm the unzip lists 5 entries.

## Step 3 — Server window, in /root/cekapk-new

Greps first (numbers must come back **1, 0, 1** in this order; the "0" grep
exits 1 — expected):

```bash
grep -c '"/en/tools/permission-checker"' "src/app/(en)/en/page.tsx"
grep -c 'Runs in Indonesian for now' "src/app/(en)/en/page.tsx"
grep -c 'EN checker card fix Nov 2026' scripts/check-seo.mjs
```

Then the build and checks (run each block ONCE — `check:links` leaves a
test server on port 3102 running; rebuilding after a check makes the next
check test a stale server. If a check must be re-run, kill the 3102 server
first: `pkill -f "next-server"`):

```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```

Build must be clean (139 pages) and all three checks must pass.

## Step 4 — Server window

```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk && pm2 restart cekapk
```

The `rm -rf` goes first so the move does not nest the old directory. One
restart only.

## Step 5 — Live verification (Muse)

Direct read of https://cekapk.com/en in a fresh tab: the "App Permission
Checker" card under "Free Tools" links to /en/tools/permission-checker,
and the text "Runs in Indonesian for now" appears nowhere on the page.

## Rollback

`/root/cekapk-old` = pre-deploy build + the fresh hPanel snapshot taken in
Step 2. To roll back: `rm -rf /root/cekapk && mv /root/cekapk-old
/root/cekapk && cd /root/cekapk && pm2 restart cekapk`.
