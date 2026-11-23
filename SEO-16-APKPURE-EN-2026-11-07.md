# SEO-16 — English APKPure Safety Guide (7 November 2026)

Built 7 Nov 2026. NOT deployed — Ahmad deploys with the standard block below.
ZIP: `CekAPK-Deploy-SEO16-APKPure-EN-2026-11-07.zip` (complete project snapshot).

## What was built

New English guide: **Is APKPure Safe? Security Risks, APK Checks & Safety Tips**
— 3,124 words (title + intro + 13 sections + 7 FAQs, counted by
`countEnGuideWords`), original English wording adapted from the Indonesian
guide, not a machine translation.

### URL decision (read this — it differs from the brief's suggestion)

The brief suggested `/guides/is-apkpure-safe`. That URL cannot be used
without breaking the site's architecture:

- There is no `/guides/` route anywhere on the site. All guides live at
  `/panduan/[slug]` (Indonesian) and `/en/panduan/[slug]` (English).
- English guides **share the Indonesian slug** — enforced by the
  `check:seo` language-parity checks (an EN slug with no ID counterpart
  fails the build gate) and by `hasEnGuide`, which wires the reciprocal
  hreflang.
- All 5 existing English guides follow this pattern
  (`/en/panduan/apa-itu-apk-hijau`, etc.).

Final URL: **https://cekapk.com/en/panduan/apakah-apkpure-aman**
(canonical + og:url + hreflang all verified in the built HTML).
The English keyword lives in the title, H1, introduction and headings —
the slug stays Indonesian, exactly like the other five English guides.

## Files changed

| File | Change |
|---|---|
| `src/lib/data/i18n-en-apps-b.ts` | New `enGuides` record `apakah-apkpure-aman` (title, intro, 13 sections, 7 FAQs, 5 sources, related apps, verifiedAtEn 2026-11-07). `bodyEn: []` — content lives in `sectionsEn`. |
| `src/lib/data/i18n-en-types.ts` | New optional fields on `EnGuideContent`: `sectionsEn` (heading + paragraphs + optional table / checklist / steps), `relatedAppsEn`, `sourcesEn`, `verifiedAtEn`. `countEnGuideWords` now counts section content. Existing guides untouched. |
| `src/app/(en)/en/panduan/[slug]/page.tsx` | Renders `sectionsEn` when present: table of contents with anchor links, H2 sections, comparison table (mobile scrollable), checklist, numbered steps, related-apps links, sources list, "Last checked" line, disclaimer. Adds Article JSON-LD (en-US) when `verifiedAtEn` is set and HowTo JSON-LD when a section has steps. Guides without `sectionsEn` render exactly as before. |
| `src/lib/seo.tsx` | `articleJsonLd` gained an optional `lang` parameter (default `"id-ID"`); EN guide passes `"en-US"`. No change to any existing call. |
| `scripts/check-seo.mjs` | EN guides count check 5 → 6. |
| `en-coverage-matrix.md` | Guides 5 → 6 complete; APKPure row → complete; coverage now 11 apps + 6 guides = 17 translated pages; priority shortlist renumbered (Instagram tool page now #1). |

No other pages were changed. No URLs changed. No database changes.

## Content (all facts verified from the brief's sources on 7 Nov 2026)

Sections: What Is APKPure? / How APKPure Works / Is APKPure an Official
Google Play Store? / The APKPure Security Incident of 2021 / What
Happened, Which Version Was Affected, and How It Was Fixed / Does APKPure
Verify APK Signatures? / The Risks of Downloading APKs From Third-Party
Sources / How to Check an APK Before You Install It (9-item checklist) /
How to Use Google Play Protect (5 steps) / Warning Signs That an APK May
Be Dangerous / APKPure vs Google Play Store (8-row comparison table) /
Safer Alternatives to APKPure / Final Safety Recommendation. Plus 7 FAQs,
a table of contents (16 anchors, all resolve), a sources section, and the
educational-use disclaimer.

Verified facts used (nothing else asserted):

- Kaspersky Securelist, 9 Apr 2021: malicious code in APKPure app version
  **3.17.18**; Kaspersky notified the developers **8 April**; APKPure
  confirmed and fixed it with **3.17.19**; payload collected device info,
  showed ads, opened ad pages, downloaded further modules including a
  Triada-like Trojan (HEUR:Trojan-Dropper.AndroidOS.Triada.ap); worst on
  Android 6/7 without security updates (system-partition installs, e.g.
  xHelper).
- Kaspersky blog, 9 Apr 2021: likely cause was an ad SDK from an
  unverified source (CamScanner parallel); 3.17.19 release note quoted:
  "Fixed a potential security problem, making APKPure safer to use.";
  Kaspersky confirmed 3.17.19 clean.
- Google Play Protect help: on by default; checks Play downloads and
  sideloaded apps; warns, disables, or removes harmful apps; can block
  unverified apps using sensitive permissions; "send unknown apps to
  Google" deep-check exists.
- Android Help (download apps): Google recommends Play, allows other
  sources; unknown-source downloads can damage the device or expose
  personal information.
- APKPure's own pages (apkpure.net/about.html, which presents itself as
  APKPure Lite): signature verification for every app, Safety Badge. In
  the guide these are attributed as the company's own claims, kept apart
  from Kaspersky's independent findings.

Deliberately NOT claimed: that APKPure is 100% safe; that every APKPure
file contains malware; any current malware statistics, scan results,
download numbers, safety scores, or certifications; that CekAPK tested
APKPure's files (it has not — the disclaimer says so). The guide states
explicitly that a clean scan does not guarantee safety and that a matching
signature proves authenticity, not harmlessness.

One nuance to know: the brief's fifth source is `apkpure.net/about.html`.
That page presents itself as APKPure Lite and says the main platform is
apkpure.com. The guide attributes its claims to APKPure and keeps the
existing warning to use only the official site, apkpure.com — it does not
independently adjudicate who operates the .net domain.

## Verification (local, 7 Nov 2026 — all PASS)

- `npm run check:seo` — **30/30 PASS** (EN guides: 6, all with ID
  counterparts). One failure appeared mid-build: the guide's first draft
  contained the literal string "100% safe" (in denials, not claims). The
  strict no-absolute-claims check flags the string wherever it appears, so
  both sentences were reworded to "fully safe" / "completely safe". The
  check now passes.
- `npm run build` — clean. Route `/en/panduan/apakah-apkpure-aman`
  prerendered (6 EN guide pages).
- `npm run check:links` — **105 sitemap URLs** (was 104; en.xml 18 → 19),
  **140 checked, 0 broken, 0 orphans**, 0 no-canonical, 0 missing alt.
- Local production server smoke test (port 3100):
  - `/en/panduan/apakah-apkpure-aman` HTTP 200; title
    "Is APKPure Safe? Security Risks, APK Checks & Safety Tips | CekAPK";
    H1 identical; canonical = og:url =
    `https://cekapk.com/en/panduan/apakah-apkpure-aman`; meta description =
    the brief's text, 158 characters; robots `index, follow`.
  - hreflang (rendered by Next as `hrefLang`): id-ID →
    `/panduan/apakah-apkpure-aman`, en-US → `/en/panduan/apakah-apkpure-aman`,
    x-default → ID page. The ID guide page now emits the reciprocal
    en-US alternate.
  - JSON-LD parsed and validated (valid JSON, required fields present):
    BreadcrumbList (2 items), FAQPage (7 questions), Article
    (headline, datePublished = dateModified = 2026-11-07, inLanguage
    en-US, author/publisher = site org), HowTo (Play Protect, 5 steps).
  - TOC: 16 anchors, all resolve to real section ids. Table: 8 data rows.
    Checklist: 9 items. Sources: 5 links, all present. Related apps:
    TikTok, WhatsApp, Telegram (EN links). "Last checked: 2026-11-07"
    line present. Disclaimer present.
  - Dynamic OG image route HTTP 200 (`image/png`).
  - All 5 older EN guides still HTTP 200 — no regression from the
    template change. Server log: no errors.
  - `/en` homepage: "Safety Guides in English (6)" and the APKPure card
    now appear (dynamic list).
- Duplicate content: the English text is original wording written for
  this guide; the Indonesian guide is its source in a different language,
  paired by hreflang — not duplicate content.
- Mobile: the page reuses the site's responsive classes; the comparison
  table scrolls horizontally on small screens (`overflow-x-auto`). No
  heavy images or new scripts. A visual check on a real phone after
  deploy is still recommended (not done here).

Pre-existing note (not introduced by this change): the build prints a
"Unsupported metadata themeColor" warning once per EN guide page (6
times now, 5 before). It comes from the root layout's metadata export,
not from this guide, and does not affect the build or the page.

## Deploy (Ahmad — standard block)

PC PowerShell window (upload):
```
scp CekAPK-Deploy-SEO16-APKPure-EN-2026-11-07.zip root@72.61.127.96:/root/
```

Server window (after confirming the ZIP is on the server):
```
cd /root && cp cekapk/.env.local /root/.env.local.bak && rm -rf /root/cekapk-new && unzip -q CekAPK-Deploy-SEO16-APKPure-EN-2026-11-07.zip -d /root/cekapk-new && cp -r /root/cekapk-new/. /root/cekapk/ && cp /root/.env.local.bak /root/cekapk/.env.local && cd /root/cekapk && npm install && npm run build
```
Wait for the build to finish, then:
```
pm2 restart cekapk
```

After deploy, verify live: open
`https://cekapk.com/en/panduan/apakah-apkpure-aman` (title, TOC, table,
checklist), check the ID page's hreflang in view-source, and in GSC
request indexing for the new URL. A fresh manual snapshot after the
deploy is recommended (the 7 Nov ~11:57 snapshot lapses ~8 Nov ~11:57).
