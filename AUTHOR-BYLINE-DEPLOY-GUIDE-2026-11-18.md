# Deploy Guide — Author / Byline — CekAPK — 2026-11-18

**Package:** `CekAPK-Author-Byline-2026-11-18.zip`
**SHA-256:** (in the delivery message and MEMORY.md — verify before scp)
**Baseline:** live build = audit-fix (Nov 18) + UI-05 Phase E (Nov 18). Workspace src tree = that live tree + this package's changes. Production is audit-fix + Phase E until this deploys.

**Safe-deploy procedure (same as all recent deploys):** fresh hPanel snapshot first (the Nov 18 Phase E snapshot captures the pre-Phase-E state, so take a fresh one for this deploy) → build in a separate dir → verify → only then switch dirs + the one PM2 restart. Keep the old dir for rollback.

## Step 1 — shop PC PowerShell window

```powershell
cd C:\Users\TechSOL\Downloads
Get-FileHash .\CekAPK-Author-Byline-2026-11-18.zip -Algorithm SHA256
scp .\CekAPK-Author-Byline-2026-11-18.zip root@72.61.127.96:/root/
```

The hash must match the delivered SHA-256 exactly. (If you are on the home PC instead, the folder is `C:\Users\Ahmad Razza\Downloads` — note the space, and the path needs quotes if you type it by hand.)

## Step 2 — server window (root@srv2112435)

Take a fresh snapshot in hPanel first, then:

```bash
cp -a /root/cekapk /root/cekapk-new
cd /root/cekapk-new && unzip -o /root/CekAPK-Author-Byline-2026-11-18.zip
```

## Step 3 — server window, in /root/cekapk-new

Staging greps — each number must match exactly:

```bash
grep -c "AuthorByline" src/components/ui.tsx
grep -c "author.personJsonLd" src/lib/seo.tsx
grep -c "AuthorByline" "src/app/(id)/panduan/[slug]/page.tsx"
grep -c "AuthorByline" "src/app/(en)/en/panduan/[slug]/page.tsx"
grep -c "Tentang Penulis" "src/app/(id)/tentang/page.tsx"
grep -c "About the Author" "src/app/(en)/en/about/page.tsx"
grep -c '&amp;' scripts/check-links.mjs
ls -l public/images/author-ahmad-raza.png
```

Expected, in order: **1, 1, 2, 2, 1, 1, 1**, and the photo file present at **129,965 bytes**.

If the numbers match, run the build and checks in the same window:

```bash
npm run build
npm run check:seo
npm run check:links
npm run check:negative
```

Build must be clean (128 pages) and all three checks must pass.

## Step 4 — server window

```bash
rm -rf /root/cekapk-old
mv /root/cekapk /root/cekapk-old
mv /root/cekapk-new /root/cekapk
cd /root/cekapk && pm2 restart cekapk
```

The `rm -rf` goes first so the move does not nest the old directory. One restart only.

## Step 5 — live verification (Muse)

After the restart, verify live:
1. https://cekapk.com/panduan/apa-itu-apk-hijau — byline under the H1: photo + "Ditulis oleh Ahmad Raza · Pendiri & Editor CekAPK" + "Terakhir dicek: 2026-10-18 - Panduan Bahasa Indonesia".
2. https://cekapk.com/en/panduan/apa-itu-apk-hijau — "Written by Ahmad Raza · Founder & Editor, CekAPK" + "Last checked: 2026-11-18 — English edition".
3. https://cekapk.com/tentang — "Tentang Penulis" section at the end with photo + bio; date "18 November 2026".
4. https://cekapk.com/en/about — "About the Author" section; date "18 November 2026".
5. https://cekapk.com/images/author-ahmad-raza.png — photo loads (200).

## Rollback

`/root/cekapk-old` = pre-author build (audit-fix + Phase E) + the fresh snapshot taken in Step 2. To roll back: swap the dirs back and run one `pm2 restart cekapk`.
