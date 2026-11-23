# CekAPK — SEO-12 first-test runbook (for the day VT_API_KEY is set)

Status 7 Nov 2026: the library pipeline is built and its publish gate works,
but no file can pass step 4 (VirusTotal scan) until a free VT API key is set
on the server. Nothing in this file publishes anything by itself — it is the
checklist for the first real test, to run after the key is in place.

## How the pipeline actually works (verified in code, 7 Nov 2026)

- Entry point: admin upload route `src/app/(id)/api/admin/library/upload/route.ts`
  passes `vtApiKey: process.env.VT_API_KEY` into `runPipeline` (`src/lib/library/pipeline.ts`).
- The 5 steps, in order: (1) SHA-256 hash, (2) APK structure (manifest + dex +
  signature block present, no nested APK), (3) signer fingerprint vs the
  admin-registered official fingerprint, (4) VirusTotal scan, (5) permission audit.
- `canPublish` requires ALL steps ok + a safety score + a named human reviewer
  (`reviewedBy`). Anything less stays a draft — by design.
- The scan step is a **hash lookup**, not a file upload:
  `GET https://www.virustotal.com/api/v3/files/{sha256}` with header `x-apikey`.
  - HTTP 200 + malicious=0 + suspicious=0 → clean, step passes. Publish
    threshold is exactly 0.
  - HTTP 200 with any malicious/suspicious > 0 → step fails, file cannot publish.
  - HTTP 404 → hash unknown to VirusTotal. The file must be submitted to
    VirusTotal for analysis first (by the admin, in the VT web UI), then the
    pipeline re-run after VT has a verdict. It cannot publish from "unknown".
  - Any other HTTP status / network error → step fails, retry later.
  - No key set → step fails with the "VT_API_KEY belum diatur" message.
- Published files get a weekly hash re-check (`weeklyHashCheck`): if the stored
  file's hash no longer matches the recorded SHA-256, the file is held.
- The methodology page (`/metodologi-verifikasi`) already states honestly that
  the key is not set (dated 6 November 2026) and that the library stays empty
  by design. After the key is set and the first file passes, that sentence
  must be updated to the new state — do not leave the stale claim live.

## Step 0 — get the free key (Ahmad's step, ~10 minutes)

1. Create a free account at https://www.virustotal.com/ (sign up with an email).
2. After login: profile avatar → API key → copy the key. Free tier: 4 requests/minute,
   500 requests/day — plenty for a library that publishes a few files a week.
3. Never paste the key in chat. It goes only into the server's `.env.local`.

## Step 1 — set the key on the server (server window)

```
cd /root/cekapk
grep -q VT_API_KEY .env.local && echo "key line already present - edit it" || echo "VT_API_KEY=PASTE_KEY_HERE" >> .env.local
pm2 restart cekapk
```

Then confirm the app picked it up: open the admin panel and start an upload —
if step 4 no longer says "VT_API_KEY belum diatur", the key is live.

## Step 2 — first test file (pick one VirusTotal already knows)

Because the scan is a hash lookup, the first test must be a file VT has seen.
Best choice: an official APK from F-Droid (open-source, legal to host, widely
scanned). For example, download the official F-Droid client APK from
https://f-droid.org/ (or any well-known open-source app) and use that as the
test artifact. Do NOT use a random APK from the internet as the first test.

Before upload, the admin must also have:
- the app's official signer fingerprint registered (step 3 compares against it —
  get it from the official source, e.g. the developer's published fingerprint
  or by extracting it from the official APK with the pipeline's own extractor);
- the permission list declared, with a plain-language explanation (min. 20
  characters) for every dangerous permission (step 5).

## Step 3 — run the pipeline and read the result (admin panel)

Upload the test APK in the admin Library panel. Read all 5 steps:
- hash: SHA-256 shown (first 16 chars in the detail line).
- struktur: manifest + dex + signature block all present.
- tanda_tangan: fingerprint matches the registered official one.
- pemindaian: `VirusTotal: malicious=0, suspicious=0` → clean.
- izin: all dangerous permissions explained.

If step 4 says "Hash belum dikenal VirusTotal" (404): submit the file to VT
in the web UI, wait for the analysis to finish, then re-run the pipeline.
If any other step fails, fix that input (fingerprint, permissions) and re-run
— do not bypass the gate.

## Step 4 — publish, then verify live

1. Set the reviewer name (a real person) and publish from the admin panel.
2. Live checks: the library page lists the file with its SHA-256, scan date,
   engine counts, decision and reviewer; the download serves the exact file
   (recompute SHA-256 of the download and compare — it must match).
3. Update `/metodologi-verifikasi`: replace the "key not set" sentence with the
   new state (key set on [date], first file published [name + date]).
4. Update the Phase 2/3 report notes and MEMORY.md: SEO-12 moves from BLOCKED
   to DONE with the first record's details.

## What NOT to do

- Never publish a record for a file that was not actually tested (no synthetic
  scores, hashes or reviewer names — the spec's acceptance criteria).
- Never put the VT key in the repo, in a ZIP, or in chat — `.env.local` on the
  server only (the deploy ZIPs carry a placeholder `.env.local`).
- Never publish a file with any malicious/suspicious detection, even 1 — the
  threshold is 0, and the gate enforces it.
