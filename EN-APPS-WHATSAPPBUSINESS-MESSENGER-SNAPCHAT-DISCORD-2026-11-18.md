# EN App Pages — WhatsApp Business, Messenger, Snapchat, Discord (18 Nov 2026)

## §1. What changed

Four new English app pages, the priority shortlist #2 from `en-coverage-matrix.md`. English coverage goes from 15 to **19 apps** (31 of 50 apps remain Indonesian-only). Every record is original editorial English written from the verified Indonesian source facts — not machine translation, not copied Indonesian text. Play facts re-verified against the live Play Store on 18 Nov 2026 (see §3).

### Per-app content (all in `src/lib/data/i18n-en-apps-b.ts`, appended to `enAppsB`)

| App | Slug | Words | seoDescriptionEn (chars) | verifiedAtEn |
|---|---|---|---|---|
| WhatsApp Business | `whatsapp-business` | 569 | 141 | 2026-11-18 |
| Messenger | `messenger` | 502 | 141 | 2026-11-18 |
| Snapchat | `snapchat` | 515 | 140 | 2026-11-18 |
| Discord | `discord` | 442 | 127 | 2026-11-18 |

Total new English words: **2,028**. Each record has: taglineEn, 2 intro paragraphs, 2 "what it does" paragraphs, 2 safety paragraphs, 4 "good for", 4 "watch out for", 3 FAQs, purpose-written seoDescriptionEn (≤160 chars), verifiedAtEn "2026-11-18". No seoTitleEn overrides — the template title (`{name} for Android - Safety, Permissions & Official Download`) is accurate for all four (all are Play Store apps with an official download).

Content notes per app:
- **WhatsApp Business**: business profile, product catalogue, chat labels, quick replies, greeting/away messages, wa.me link + QR; the six-digit registration code is as dangerous as an OTP — no genuine support agent ever asks for it; separate business number keeps working hours healthier. FAQs: one phone with both apps, is it free, keeping the business number safe. Alternatives link to WhatsApp, Instagram, Facebook (all have EN editions).
- **Messenger**: Facebook's messaging companion; Message Requests folder, group voice/video calls, Page customer service; impersonator accounts and fake account-verification links are the most common account-takeover scam — Meta never asks for a password by message. FAQs: verification-link message, needing a Facebook account, what Message Requests are. Alternatives link to WhatsApp, Telegram, Instagram (all EN).
- **Snapchat**: Snaps, Lenses, Stories, Snap Map + Ghost Mode, Memories; the screenshot truth — a recipient can always photograph the screen with another device without a trace; Snap Map can reveal a home or school location if left open. FAQs: can anyone save a Snap, stopping location sharing, is it free. Alternatives link to Instagram, TikTok, WhatsApp (all EN).
- **Discord**: servers with text/voice channels, always-open voice, screen sharing, bots, Nitro (optional, paid); public servers mean talking to strangers — Safe Direct Messaging, content scanning, two-step verification, and only joining invitations from communities you genuinely know. FAQs: safe for children and teenagers, what is Nitro, needing an invitation. Alternatives link to Telegram, WhatsApp, Google Meet (Telegram + WhatsApp EN; Google Meet is ID-only, template behaviour).

### Template & plumbing changes (no other app, guide, tool, ID page, API, DB, or auth touched)

1. **`src/lib/data/i18n-en-apps-b.ts`** — 4 new EnAppContent records (above). No template or type change was needed: `verifiedAtEn` on `EnAppContent`, the `checkedAt` display, the sitemap lastmod, and the homepage sort all already exist from the batch-1 build.
2. **`src/app/(en)/en/aplikasi/page.tsx`** (EN hub) — metadata description "19 Android apps" (was 15); comments corrected ("The 19 apps", "across the 19 apps", "The other 31 catalog apps"). Search, filtering, and canonical untouched; the 4 new apps are searchable (`?q=messenger` → 3 apps — see §3 for why 3 is correct; `?q=discord` → 1; `?q=snapchat` → 1; `?q=whatsapp` → 2; `?q=business` → 1).
3. **`scripts/check-seo.mjs`** — **one assertion changed, explained in §3**: the EN-app count pin `=== 15` → `=== 19` (same strength: exact count + zero orphans). The coverage comment is corrected (19 apps + 6 guides). **One new pin added** (strengthening, not weakening): the 4 new records each carry verifiedAtEn 2026-11-18. The hub-description pin now says 19.
4. **`en-coverage-matrix.md`** — updated: 19 apps complete / 31 untranslated; 8 of 39 expansion apps translated; shortlist #2 marked done 18 Nov 2026; the 4 app rows now "complete". Total translated pages 30 → 34.
5. **EN homepage** — no edit needed: the hero stat is dynamic (`enApps.length` → 19 automatically) and "Recently Verified" already sorts by the English check date, so the 4 new apps sort first with "Checked Nov 18, 2026".

### What happens automatically (no code change needed)
- The 4 new pages get static routes via `generateStaticParams` (build: 139 → **143 pages**), dynamic OG images via the existing `[slug]/opengraph-image.tsx`, reciprocal hreflang via the existing `hasEnApp` gating, and ID pages gain the en-US alternate automatically.
- Related Apps are template-computed: same-category first, then the rest of the English edition. WhatsApp Business / Messenger / Discord (sosial) pull WhatsApp, Instagram, Telegram, Facebook; Snapchat (video-foto) pulls the other video-foto EN apps.
- Sitemap total: 120 → **124 URLs**.

## §2. Verification results (all local, all must-pass)

- **tsc**: 0 errors.
- **Build**: clean, **143 pages**, BUILD_ID `E7Wtmdgww4S8uOoSRiGGw`.
- **check:seo**: ALL PASSED (including the new pin).
- **check:links**: 124 sitemap URLs / 0 broken / 0 orphans / 0 missing canonical.
- **check:negative**: OK.
- **Rendered suite** (`/tmp/enapps2-checks.cjs`): **241/241 PASS**. Per app: exact title + meta description, header date "Nov 18, 2026", Indonesian verifiedAt 2026-10-20 nowhere on the page, TOC (≥8 anchors, every target id exists) + all sections, FactBox fully English (category, price, min Android, languages, Last checked 2026-11-18), no Indonesian content strings, BreadcrumbList + FAQPage + SoftwareApplication JSON-LD, reciprocal hreflang, dynamic OG image (fetched, 200), changelog + trust sections show 2026-11-18, every internal app/guide link on the page returns 200, official Play details URL present, no Play search URL. Regression: all 11 older EN app pages still show "Oct 18, 2026" with no Nov 18 leak; the 4 batch-1 pages still show "Nov 18, 2026". Hub: 19 distinct app links; `?q=` searches return the right counts (see §3). Homepage: stat shows 19; Recently Verified shows "Checked Nov 18, 2026". Sitemap: 7 segments, 124 URLs total; the 4 new entries carry lastmod 2026-11-18; TikTok entry still has no lastmod. ID pages for the 4 apps carry the en-US alternate.
- **Visual suite** (`/tmp/enapps2-shots/shots.cjs`, playwright-core 1.49.1): **80/80 PASS** — 4 apps × 1440/390 × light/dark: 0px horizontal overflow everywhere; header date-line contrast ≥ 4.5:1; FactBox "Last checked" value contrast ≥ 4.5:1 and value exactly 2026-11-18. 16 screenshots in `~/workspace/cekapk-enapps2-screenshots/`. One mobile screenshot was eyeballed (Messenger, 390px light): clean layout, correct dates, correct FactBox; the consent banner appears mid-page in the fullPage capture only (a known fullPage-capture artefact, same as batch 1 — not a defect).

## §3. Honest notes / limitations

- **One check:seo assertion changed (count pin, not weakened):** `enAppSlugs.length === 15` → `=== 19`. It still pins the exact count and zero orphans; the number had to move because the brief itself adds 4 apps. One new pin was added alongside it.
- **Play verification, 18 Nov 2026:** all four confirmed via Play Store crawls — WhatsApp Business com.whatsapp.w4b, developer **WhatsApp LLC**; Messenger com.facebook.orca, Meta Platforms, Inc.; Snapchat com.snapchat.android, Snap Inc.; Discord com.discord, Discord Inc. Ratings, download counts, versions, and sizes seen in search results were **not** printed anywhere, per site rule. **Correction to the brief's expectation:** the brief said "Meta Platforms, Inc. for the first two" — that is wrong for WhatsApp Business. The Play listing developer is WhatsApp LLC (the ID source record already says WhatsApp LLC, and the site prints the base record's developer, so the page correctly shows WhatsApp LLC). The "About the developer" company behind the support email is Meta Platforms, Inc., but the listing developer — the name the site prints and the name a reader must match on Play — is WhatsApp LLC.
- **No "100% safe" string anywhere** (grep 0; check:seo also enforces it).
- **Dropped / not included:** no version numbers, ratings, prices beyond "Free" (+ the ID price labels, already mapped), or download counts. Discord's Google-indexing change for public servers (Nov 2026, reported in social posts) was deliberately NOT included — it is a platform-policy change reported second-hand, not a verified Play fact, and the page's safety section already covers the public-server rules that matter.
- **Out of scope, noticed while working (not changed):** the Related Apps card for WhatsApp shows the developer as "Meta Platforms, Inc. (WhatsApp LLC)" — that is WhatsApp's own developer string in the ID source (`part2.ts:4`), pre-existing data that already renders the same way on the live Facebook page's related list. Not a defect of this build.
- **Test-script bugs (site correct throughout):** first rendered run failed 10 checks — (a) my hreflang checks expected relative hrefs, but the `<link rel="alternate">` tags carry absolute `https://cekapk.com/...` URLs (the id-ID check only passed by accident, matching a relative breadcrumb link); (b) my sitemap-total check counted `<loc>` in the index itself (7 segments), not the URLs across segments; (c) my `?q=messenger` expectation of 1 was wrong — the correct answer is 3 (Messenger + WhatsApp's "default messenger" tagline + Telegram's "one messenger" tagline), the same pre-existing filter behaviour as batch 1's "TikTok → 2" (CapCut's tagline mentions TikTok). Script fixed, re-run 241/241.

## §4. Staging grep expectations (computed FROM the workspace — verify in Step 3)

Run in `/root/cekapk-new` after unzipping. Expected, in order:

| # | Command | Expected |
|---|---|---|
| 1 | `grep -c 'verifiedAtEn: "2026-11-18"' src/lib/data/i18n-en-apps-b.ts` | **13** (5 Phase E guides + 4 batch-1 apps + 4 batch-2 apps) |
| 2 | `grep -c 'enAppSlugs.length === 19' scripts/check-seo.mjs` | **1** |
| 3 | `grep -c 'EN apps Nov 2026 (batch 2)' scripts/check-seo.mjs` | **1** |
| 4 | `grep -c 'English guides for 19 Android apps' "src/app/(en)/en/aplikasi/page.tsx"` | **1** |
| 5 | `grep -c 'slug: "whatsapp-business"' src/lib/data/i18n-en-apps-b.ts` | **1** |
| 6 | `grep -c 'slug: "messenger"' src/lib/data/i18n-en-apps-b.ts` | **1** |
| 7 | `grep -c 'slug: "snapchat"' src/lib/data/i18n-en-apps-b.ts` | **1** |
| 8 | `grep -c 'slug: "discord"' src/lib/data/i18n-en-apps-b.ts` | **1** |

## §5. Package

- **ZIP:** `CekAPK-EN-Apps-WhatsAppBusiness-Messenger-Snapchat-Discord-2026-11-18.zip`
- **SHA-256:** in the delivery message (a file inside the ZIP cannot contain the ZIP's own hash — self-reference).
- **Size / entries:** 7 entries (byte size in the delivery message).
- **Contents:** 4 changed source/doc files + report + deploy guide + manifest (7 entries). Clean-extraction byte-compare: every changed file byte-identical to the workspace (verified before delivery).

## §6. Deploy guide

See `EN-APPS-WHATSAPPBUSINESS-MESSENGER-SNAPCHAT-DISCORD-DEPLOY-GUIDE-2026-11-18.md` in this ZIP (Steps 1–5, same safe-deploy format as the batch-1 deploy; rollback = `/root/cekapk-old`).

## §7. Deploy record

_To be filled after deployment._
