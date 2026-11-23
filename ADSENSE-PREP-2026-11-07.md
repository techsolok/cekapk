# AdSense Preparation Pack — CekAPK

**Date:** 7 Nov 2026. **Status: DRAFTS ONLY. Nothing in this pack is live and nothing has been changed on the site.**
When Ahmad decides to apply, the two items below go live together with the application (ads.txt first, privacy wording at the same time). No deploy is included here.

## 1. ads.txt

**File location in the project:** `public/ads.txt` (Next.js serves anything in `public/` at the site root, so this file appears at `https://cekapk.com/ads.txt`).

**Exact content (copy verbatim, replacing only the publisher ID):**
```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

**How to get the real publisher ID:** it comes from the AdSense account, only after signing up. In AdSense: Account → Account information → Publisher ID (`pub-` followed by 16 digits). AdSense's own setup screen also shows the exact ads.txt line to use — **use the line AdSense shows, not a guessed one.** The `f08c47fec0942fa0` part is Google's certification authority ID and never changes.

**Do NOT deploy this file with the `XXXXXXXXXXXXXXXX` placeholder.** A placeholder line is useless (AdSense ignores IDs that match no account) and looks sloppy to a reviewer. Deploy it only with the real ID, then check it in the browser at `https://cekapk.com/ads.txt`.

## 2. Privacy-policy wording (Google ads / cookies disclosure)

**File to edit:** `src/app/(id)/privasi/page.tsx`. **Do this when applying, not before** — the disclosure describes advertising, so it goes live together with the AdSense application.

### Change A — one sentence in the existing "Log server, cookie, analitik & iklan" paragraph

Current sentence (will become false once ads run):
> Saat ini situs ini tidak memakai Google Analytics maupun iklan pihak ketiga, jadi tidak ada pelacak analitik/iklan yang mengumpulkan datamu.

Replace it with:
> Saat ini situs ini tidak memakai Google Analytics.

Everything else in that paragraph stays exactly as it is.

### Change B — new subsection, inserted right after that paragraph (before "Permintaan data & penghapusan")

Heading:
> Iklan (Google AdSense)

Body (Bahasa Indonesia, exact text):
> Bagian ini berlaku saat iklan ditampilkan di situs ini. Google, sebagai vendor pihak ketiga, menggunakan cookie untuk menayangkan iklan di CekAPK. Penggunaan cookie iklan oleh Google memungkinkan Google dan mitranya menayangkan iklan kepada pengunjung berdasarkan kunjungan mereka ke situs ini dan/atau situs lain di internet. Pengguna dapat memilih keluar dari iklan yang dipersonalisasi dengan mengunjungi Pengaturan Iklan Google di https://www.google.com/settings/ads. Pengguna juga dapat memilih keluar dari penggunaan cookie oleh vendor pihak ketiga untuk iklan yang dipersonalisasi dengan mengunjungi www.aboutads.info/choices.

Also update the "Terakhir diperbarui" date on the page to the date this change goes live.

### English version (for reference — there is currently no English privacy page)

Use this if an `/en` privacy page is ever created:
> This section applies when ads are shown on this site. Google, as a third-party vendor, uses cookies to serve ads on CekAPK. Google's use of advertising cookies enables it and its partners to serve ads to visitors based on their visit to this site and/or other sites on the internet. Users may opt out of personalized advertising by visiting Google Ads Settings at https://www.google.com/settings/ads. Users may also opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info/choices.

## 3. Application checklist (for the day he applies)

1. Sign up at google.com/adsense with the Google account he wants the payments on (18+, ID verification with a government ID is required before ads start).
2. Add site `https://cekapk.com` and verify ownership (AdSense gives a code snippet or a DNS option — the code snippet goes in the site's `<head>`, which means a small code change + deploy).
3. Add `public/ads.txt` with the real publisher ID (section 1 above) and deploy.
4. Deploy the privacy wording (section 2 above).
5. Submit for review and wait (typically days to a couple of weeks; the review is content-based).
6. If approved: add payment details + tax info; ads start only after that.
7. **Do NOT place ad code on the two downloader pages at first** (`/tools/pengunduh-tiktok`, `/tools/pengunduh-instagram` and their `/en` versions) — they carry the copyright-policy risk. Run ads on the app and guide pages first; the tool pages can be reconsidered later.

## 4. Honest notes

- A rejection is not permanent: AdSense states the reason, the issue gets fixed, and the site can be re-submitted. The most likely rejection reasons for a young site are "low value content" (fix: more original content + more indexed pages) and policy issues on the downloader pages (fix: exclude them, section 3 step 7).
- Approval is not income. At the current traffic (~35 impressions/day) ads would earn essentially nothing. The earnings follow the traffic — the SEO work already in progress.
- The privacy page's current statement ("tidak memakai ... iklan pihak ketiga") is true today and stays true until ads run. Change A + B above must go live together with the application, never with a placeholder.
