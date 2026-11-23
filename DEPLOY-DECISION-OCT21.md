# ID APK Hub — Deploy decision sheet (prepared 2026-10-21)

Build status: Fase 0–5 COMPLETE and verified (115 static pages, all suites pass).
The only blockers left are the ones in PRODUCTION-CHECKLIST.md §1–2: domain pick + VPS.
This sheet prices both so the decision is one reply.

## 1) Domain — both shortlist .com names re-checked TODAY, Wed Oct 21, 2026
Method: Verisign RDAP (same method as the Oct 18 shortlist and Oct 19 re-check).
HTTP 404 = no registration record exists = likely still available
(NOT a registrar purchase guarantee — final check is at the registrar).

- unduhaman.com — RDAP 404, confirmed twice by direct fetch, Oct 21 ~09:24 PKT
- cekapk.com — RDAP 404 by direct fetch Oct 21 ~09:24 PKT, AND independently
  confirmed 404 via a browser read of the exact RDAP URL, Oct 21 ~09:25 PKT

So the Oct 19 result holds two days later: neither name has been taken while
Fase 3–5 were being built. The .id variants were last checked Oct 18 only.
Once picked: brand/domain lives in ONE file (src/lib/site.ts) +
NEXT_PUBLIC_SITE_URL in .env.local — no site-wide edits.

## 2) Hosting — what the checklist's "2 vCPU VPS" actually costs (checked Oct 21, 2026)
The checklist recommends ONE VPS running everything (Next.js + PostgreSQL +
Meilisearch via Docker Compose/PM2 + Caddy), because the 3 tools spawn child
processes (yt-dlp, tesseract) — pure serverless does not fit.

- DigitalOcean Singapore (closest region to the Indonesian audience):
  Basic Droplet 2 vCPU / 4 GB / 80 GB SSD / 4,000 GiB transfer = $24/month
  (official DigitalOcean pricing page, crawled Oct 21, 2026).
- Hetzner Germany (Falkenstein/Nuremberg): CX23 2 vCPU / 4 GB / 40 GB NVMe /
  20 TB traffic = €5.49 + €0.50 IPv4 ≈ €5.99/month (Hetzner price list since
  June 15, 2026, via third-party checks Oct 20, 2026). Much cheaper, but
  Germany→Indonesia latency is materially higher than Singapore.
- Hetzner Singapore: CPX22 2 vCPU / 4 GB = €26.49/month (third-party review
  checked Oct 2026) — Singapore region removes Hetzner's price advantage.

Practical read: Singapore DO at $24/mo is the low-friction choice for an
Indonesian audience; Hetzner Germany at ~€6/mo is the budget choice if launch
traffic is small and tool latency is acceptable. Confirm exact price at
checkout — VPS prices moved in 2026 (Hetzner raised EU prices in June).

Free extras the checklist needs, no cost: VirusTotal API key (free tier is
enough to unblock library publishing), Upstash Redis free tier (rate limits),
Google Search Console (submit the 7 ready sitemap segments after deploy).

## 3) The decision, in one reply
Pick: (a) UnduhAman or CekAPK, and (b) Singapore DO $24/mo or Hetzner DE ~€6/mo.
Everything after that is the checklist's mechanical steps 2–6, incl. the two
honest live smoke tests that could never be proven from the sandbox:
TikTok audio option and a live Instagram extraction, both from the production IP.
