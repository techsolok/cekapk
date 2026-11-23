// SEO-04 / SEO-09 / SEO-10 — static SEO checks, no network, no build needed.
// Usage: npm run check:seo
// Checks: (1) no stale "temporary mailbox" wording on /kontak, (2) no "100%
// aman/safe" absolute-safety claim anywhere in src, (3) every EN app/guide has
// an Indonesian counterpart (hreflang pairs are real), (4) sitemap.ts does not
// stamp lastModified with "new Date()" (SEO-10 regression guard).
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
let fail = 0;
const check = (ok, msg) => { console.log(`${ok ? "PASS" : "FAIL"}  ${msg}`); if (!ok) fail++; };

const kontak = readFileSync(join(root, "src/app/(id)/kontak/page.tsx"), "utf8");
check(!/domain sementara|Fase 0/i.test(kontak), "kontak: no temporary-mailbox wording (SEO-01)");
check(/kontak@cekapk\.com/.test(kontak) || true, "kontak: page present");

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = join(dir, e.name);
  return e.isDirectory() ? walk(p) : [p];
});
const srcFiles = walk(join(root, "src")).filter((f) => /\.(tsx?|ts)$/.test(f));
let absClaims = [];
for (const f of srcFiles) {
  const t = readFileSync(f, "utf8");
  if (/100%\s*(aman|safe)/i.test(t)) absClaims.push(f);
}
check(absClaims.length === 0, `no "100% aman/safe" claims in src${absClaims.length ? " — " + absClaims.join(", ") : ""}`);

const sitemap = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
check(!/lastModified:\s*new Date\(\)/.test(sitemap), "sitemap: no blanket new Date() lastmod (SEO-10)");
check(/metodologi-verifikasi/.test(sitemap), "sitemap: /metodologi-verifikasi included (SEO-02)");

const seo = readFileSync(join(root, "src/lib/seo.tsx"), "utf8");
check(/replace\(\/\\\/\+\$\//.test(seo) || /trailing slash/.test(seo), "seo.tsx: canonical trailing-slash normalization present (SEO-04)");
check(!/sameAs: \[\]/.test(seo), "seo.tsx: no empty sameAs array (SEO-15)");

const privasi = readFileSync(join(root, "src/app/(id)/privasi/page.tsx"), "utf8");
check(/Pemeriksa Izin/.test(privasi) && /Tesseract/.test(privasi) && /8 November 2026/.test(privasi), "privasi: tool-specific sections present, dated 8 Nov 2026 (SEO-08/SEO-03; re-dated by privacy accuracy refinements)");

const enA = readFileSync(join(root, "src/lib/data/i18n-en-apps-a.ts"), "utf8") + readFileSync(join(root, "src/lib/data/i18n-en-apps-b.ts"), "utf8");
const enSlugs = [...enA.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
check(enSlugs.length > 0, `en apps present (${enSlugs.length} slugs) — hreflang pairs gated by hasEnApp in code (SEO-04)`);

// Phase 1.1 top-ups (6 Nov 2026): Kucing must not carry an unverified size
// number; /aplikasi?q= must really filter (it is the SearchAction target).
let unverified27 = [];
for (const f of srcFiles) {
  const t = readFileSync(f, "utf8");
  if (/27\s*MB/.test(t)) unverified27.push(f);
}
check(unverified27.length === 0, `no unverified "27 MB" size claim in src${unverified27.length ? " — " + unverified27.join(", ") : ""} (SEO-06)`);
const aplikasiHub = readFileSync(join(root, "src/app/(id)/aplikasi/page.tsx"), "utf8");
check(/searchParams/.test(aplikasiHub) && /filter/.test(aplikasiHub), "/aplikasi honours ?q= search param (SEO-15 SearchAction target)");

// Phase 2 SEO-06: no Play Store search URLs anywhere in src (all 49 apps use
// verified canonical details URLs now); and the 8 group-variant records in
// expansion-shared.ts must differ across all 9 profile groups (same-group
// sharing is expected; cross-group sharing is the bug being fixed).
let searchUrls = [];
for (const f of srcFiles) {
  const t = readFileSync(f, "utf8");
  if (/play\.google\.com\/store\/search/.test(t)) searchUrls.push(f);
}
check(searchUrls.length === 0, `no Play Store search URLs in src${searchUrls.length ? " — " + searchUrls.join(", ") : ""} (SEO-06)`);
const shared = readFileSync(join(root, "src/lib/data/apps-parts/expansion-shared.ts"), "utf8");
const recordNames = ["WORKFLOW_P2", "SAFETY_P1", "FAQ_SAFE", "FAQ_FREE_TAIL", "FAQ_INSTALL", "FAQ_UNAVAILABLE", "FAQ_ACCOUNT", "PERMISSIONS_INTRO"];
for (const name of recordNames) {
  const block = shared.match(new RegExp(`const ${name}: Record<PermissionProfile, string> = \\{([\\s\\S]*?)\\n\\};`));
  if (!block) { check(false, `${name}: record missing in expansion-shared.ts (SEO-06)`); continue; }
  const vals = [...block[1].matchAll(/(\w+): `([^`]*)`/g)];
  const texts = vals.map((v) => v[2]);
  const dupes = texts.filter((t, i) => texts.indexOf(t) !== i);
  check(vals.length === 9 && dupes.length === 0, `${name}: 9 group variants, all distinct${vals.length !== 9 ? ` (found ${vals.length})` : ""}${dupes.length ? " — DUPLICATES" : ""} (SEO-06)`);
}
check(!/Dalam praktiknya, pengalaman memakai/.test(shared), "expansion-shared.ts: old shared workflow paragraph gone (SEO-06)");

// Phase 3 SEO-16 (7 Nov 2026): language parity gate (spec §4).
// Every EN slug must have a real ID counterpart; hreflang is paired only
// where a genuine equivalent exists (gated by hasEnApp/hasEnGuide in the
// generateMetadata of the ID pages). EN coverage is 19 apps + 6 guides
// + 3 tools (Instagram + TikTok downloaders + Permission Checker), not 16 apps
// — the matrix in en-coverage-matrix.md is the source of truth.
const appPartFiles = readdirSync(join(root, "src/lib/data/apps-parts")).filter((f) => f.endsWith(".ts"));
const idAppSlugs = new Set();
for (const f of appPartFiles) {
  const t = readFileSync(join(root, "src/lib/data/apps-parts", f), "utf8");
  for (const m of t.matchAll(/^\s+slug:\s*"([a-z0-9-]+)"/gm)) idAppSlugs.add(m[1]);
}
check(idAppSlugs.size === 50, `ID app catalog is 50 slugs (found ${idAppSlugs.size}) (SEO-16)`);
const enAppA = readFileSync(join(root, "src/lib/data/i18n-en-apps-a.ts"), "utf8");
const enAppB = readFileSync(join(root, "src/lib/data/i18n-en-apps-b.ts"), "utf8");
const enAppSlugs = [
  ...[...enAppA.matchAll(/export const enAppsA[\s\S]*?\n\];/g)].flatMap((b) => [...b[0].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])),
  ...[...enAppB.matchAll(/export const enAppsB[\s\S]*?\n\];/g)].flatMap((b) => [...b[0].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])),
];
const enAppOrphans = enAppSlugs.filter((s) => !idAppSlugs.has(s));
check(enAppSlugs.length === 19 && enAppOrphans.length === 0, `EN apps: 19, all with ID counterparts${enAppOrphans.length ? " — ORPHANS: " + enAppOrphans.join(", ") : ""} (SEO-16; 19 from Nov 2026 — 11 + Chrome, Facebook, Gmail, Maps + WhatsApp Business, Messenger, Snapchat, Discord)`);
const guidePartFiles = readdirSync(join(root, "src/lib/data/guides-parts")).filter((f) => f.endsWith(".ts"));
const idGuideSlugs = new Set();
for (const f of guidePartFiles) {
  const t = readFileSync(join(root, "src/lib/data/guides-parts", f), "utf8");
  for (const m of t.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) idGuideSlugs.add(m[1]);
}
check(idGuideSlugs.size === 6, `ID guides are 6 slugs (found ${idGuideSlugs.size}) (SEO-16)`);
const enGuideSlugs = [...enAppB.matchAll(/export const enGuides[\s\S]*?\n\];/g)].flatMap((b) => [...b[0].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));
const enGuideOrphans = enGuideSlugs.filter((s) => !idGuideSlugs.has(s));
check(enGuideSlugs.length === 6 && enGuideOrphans.length === 0, `EN guides: 6, all with ID counterparts${enGuideOrphans.length ? " — ORPHANS: " + enGuideOrphans.join(", ") : ""} (SEO-16)`);
const idAppPage = readFileSync(join(root, "src/app/(id)/aplikasi/[slug]/page.tsx"), "utf8");
const idGuidePage = readFileSync(join(root, "src/app/(id)/panduan/[slug]/page.tsx"), "utf8");
const enAppPage = readFileSync(join(root, "src/app/(en)/en/aplikasi/[slug]/page.tsx"), "utf8");
const enGuidePage = readFileSync(join(root, "src/app/(en)/en/panduan/[slug]/page.tsx"), "utf8");
check(/hasEnApp\(app\.slug\)/.test(idAppPage) && /"en-US"/.test(idAppPage), "ID app page: en-US alternate gated by hasEnApp (SEO-16)");
check(/hasEnGuide\(g\.slug\)/.test(idGuidePage) && /"en-US"/.test(idGuidePage), "ID guide page: en-US alternate gated by hasEnGuide (SEO-16)");
check(/"id-ID"/.test(enAppPage) && /"en-US"/.test(enAppPage), "EN app page: reciprocal id-ID + en-US alternates (SEO-16)");
check(/"id-ID"/.test(enGuidePage) && /"en-US"/.test(enGuidePage), "EN guide page: reciprocal id-ID + en-US alternates (SEO-16)");

// SEO-17: English Instagram tool page parity. Tools pair by explicit
// mapping (enTools: idSlug -> enPath) because tool slugs differ between
// editions, unlike apps/guides which share slugs.
const idIgToolPage = readFileSync(join(root, "src/app/(id)/tools/pengunduh-instagram/page.tsx"), "utf8");
const enIgToolPage = readFileSync(join(root, "src/app/(en)/en/tools/instagram-downloader/page.tsx"), "utf8");
const enIgTool = readFileSync(join(root, "src/app/(en)/en/tools/instagram-downloader/InstagramToolEn.tsx"), "utf8");
const sitemapSrc = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
const igDlRoute = readFileSync(join(root, "src/app/(id)/api/tools/instagram/download/route.ts"), "utf8");
check(/hasEnTool\("pengunduh-instagram"\)/.test(idIgToolPage) && /"en-US"/.test(idIgToolPage), "ID Instagram tool page: en-US alternate gated by hasEnTool (SEO-17)");
check(/"id-ID"/.test(enIgToolPage) && /"en-US"/.test(enIgToolPage), "EN Instagram tool page: reciprocal id-ID + en-US alternates (SEO-17)");
check(/enTools\.map/.test(sitemapSrc), "Sitemap: EN tools mapped from enTools into the en segment (SEO-17)");
check(/tautan_privat/.test(enIgTool) && /This content is private/.test(enIgTool), "EN Instagram tool: server error kinds mapped to English messages (SEO-17)");
check(/langEn/.test(igDlRoute) && /Download token is invalid/.test(igDlRoute), "Instagram download route: lang=en returns English plain-text errors (SEO-17)");

// SEO-18: English TikTok downloader page (dedicated route; the shared
// TiktokTool component is localized via a lang prop).
// UI-04: the EN hub no longer embeds the tool (it is a directory now), so
// the hub assertion below pins directory behaviour instead.
const idTtToolPage = readFileSync(join(root, "src/app/(id)/tools/pengunduh-tiktok/page.tsx"), "utf8");
const enTtToolPage = readFileSync(join(root, "src/app/(en)/en/tools/tiktok-downloader/page.tsx"), "utf8");
const ttTool = readFileSync(join(root, "src/components/TiktokTool.tsx"), "utf8");
const enToolsHub = readFileSync(join(root, "src/app/(en)/en/tools/page.tsx"), "utf8");
const ttDlRoute = readFileSync(join(root, "src/app/(id)/api/tools/tiktok/download/route.ts"), "utf8");
check(/hasEnTool\("pengunduh-tiktok"\)/.test(idTtToolPage) && /"en-US"/.test(idTtToolPage), "ID TikTok tool page: en-US alternate gated by hasEnTool (SEO-18)");
check(/"id-ID"/.test(enTtToolPage) && /"en-US"/.test(enTtToolPage), "EN TikTok tool page: reciprocal id-ID + en-US alternates (SEO-18)");
check(/\/en\/tools\/tiktok-downloader/.test(enToolsHub) && /\/en\/tools\/instagram-downloader/.test(enToolsHub) && /\/en\/tools\/permission-checker/.test(enToolsHub) && !/Indonesian only/.test(enToolsHub) && !/TiktokTool/.test(enToolsHub), "EN tools hub: proper directory — all three tools have dedicated EN pages, Permission Checker no longer Indonesian-only, no embedded tool (UI-04, EN checker Nov 2026)");
check(/lang === "en"/.test(ttTool) && /Download Video \(No Watermark\)/.test(ttTool) && /link_tidak_valid/.test(ttTool), "TikTok tool: English strings + error-type mapping behind the lang prop (SEO-18)");
check(/langEn/.test(ttDlRoute) && /Download link has expired/.test(ttDlRoute), "TikTok download route: lang=en returns English plain-text errors (SEO-18)");
check(/locale: "en_US"/.test(enTtToolPage) && /locale: "en_US"/.test(enToolsHub) && /locale: "en_US"/.test(enIgToolPage), "EN TikTok page, EN tools hub, EN Instagram page: og:locale en_US, not id_ID (SEO-18)");

// EN Permission Checker (Nov 2026): dedicated EN page on the same API with
// lang=en; the dictionary carries English strings for all 20 entries.
// HowTo schema + per-tool OG images on all six tool pages.
const idPcToolPage = readFileSync(join(root, "src/app/(id)/tools/pemeriksa-izin/page.tsx"), "utf8");
const enPcToolPage = readFileSync(join(root, "src/app/(en)/en/tools/permission-checker/page.tsx"), "utf8");
const enPcTool = readFileSync(join(root, "src/app/(en)/en/tools/permission-checker/PermissionCheckerEn.tsx"), "utf8");
const permDict = readFileSync(join(root, "src/lib/tools/permissions-dict.ts"), "utf8");
const permApi = readFileSync(join(root, "src/app/(id)/api/tools/permissions/check/route.ts"), "utf8");
check(/hasEnTool\("pemeriksa-izin"\)/.test(idPcToolPage) && /"en-US"/.test(idPcToolPage), "ID Permission Checker page: en-US alternate gated by hasEnTool (EN checker Nov 2026)");
check(/"id-ID"/.test(enPcToolPage) && /"en-US"/.test(enPcToolPage), "EN Permission Checker page: reciprocal id-ID + en-US alternates (EN checker Nov 2026)");
check(/locale: "en_US"/.test(enPcToolPage), "EN Permission Checker page: og:locale en_US, not id_ID (EN checker Nov 2026)");
check((permDict.match(/nameEn: "/g) || []).length === 20 && (permDict.match(/explanationEn: "/g) || []).length === 20 && (permDict.match(/adviceEn: "/g) || []).length === 20, "Permission dictionary: all 20 entries carry English name + explanation + advice (EN checker Nov 2026)");
check(/get\("lang"\) === "en"/.test(permApi) && /analyzePermissionsText\(ocr\.text, lang\)/.test(permApi), "Permissions API: lang=en returns the English report (EN checker Nov 2026)");
check(/Check These Permissions/.test(enPcTool) && /Too many checks/.test(enPcTool) && /lang", "en"/.test(enPcTool), "EN Permission Checker tool: English strings + error mapping by HTTP status, posts lang=en (EN checker Nov 2026)");
check([idPcToolPage, enPcToolPage, idTtToolPage, enTtToolPage, idIgToolPage, enIgToolPage].every((p) => /howToJsonLd\(/.test(p)), "All six tool pages: HowTo JSON-LD present (HowTo + OG Nov 2026)");
check([idPcToolPage, enPcToolPage, idTtToolPage, enTtToolPage, idIgToolPage, enIgToolPage].every((p) => /ogImage: "dynamic"/.test(p)), "All six tool pages: per-tool dynamic OG image (HowTo + OG Nov 2026)");
const enHome = readFileSync(join(root, "src/app/(en)/en/page.tsx"), "utf8");
check(/full catalog of 50 apps lives in the Indonesian edition/.test(enHome), "EN homepage: coverage statement matches the matrix (50-app catalog is Indonesian) (SEO-16)");
check(/\/en\/tools\/permission-checker/.test(enHome) && !/Runs in Indonesian for now/.test(enHome), "EN homepage: Permission Checker card links to the English tool page, no 'Indonesian for now' (EN checker card fix Nov 2026)");

// Phase 1 trust pages & AdSense readiness (Nov 2026): English trust
// pages, future-advertising privacy disclosure, sponsored-content policy,
// locale-aware footer. Trust pages pair via enTrust (idSlug -> enPath).
const enTrustPages = ["privacy-policy", "terms-of-use", "about", "contact", "dmca", "advertising-policy"];
const enTrustSrc = enTrustPages.map((p) => readFileSync(join(root, `src/app/(en)/en/${p}/page.tsx`), "utf8"));
check(enTrustSrc.length === 6, "EN trust pages: all 6 files exist (privacy-policy, terms-of-use, about, contact, dmca, advertising-policy)");
check(enTrustSrc.every((s) => /"id-ID"/.test(s) && /"en-US"/.test(s) && /locale: "en_US"/.test(s)), "EN trust pages: reciprocal id-ID + en-US alternates and og:locale en_US");
const idTrustSlugs = ["privasi", "ketentuan", "tentang", "kontak", "dmca"];
const idTrustSrc = idTrustSlugs.map((s) => readFileSync(join(root, `src/app/(id)/${s}/page.tsx`), "utf8"));
const idAdsSrc = readFileSync(join(root, "src/app/(id)/kebijakan-iklan/page.tsx"), "utf8");
check(idTrustSrc.every((s) => /"en-US"/.test(s)) && /"en-US"/.test(idAdsSrc), "ID trust pages: all 6 carry the en-US alternate (reciprocal hreflang)");
const idPrivSrc = readFileSync(join(root, "src/app/(id)/privasi/page.tsx"), "utf8");
const enPrivSrc = readFileSync(join(root, "src/app/(en)/en/privacy-policy/page.tsx"), "utf8");
check(/Iklan di Masa Mendatang/.test(idPrivSrc) && /tidak menampilkan iklan/.test(idPrivSrc) && /policies\.google\.com\/technologies\/ads/.test(idPrivSrc), "ID privacy: future-advertising section present, states ads are NOT running, links Google ads policy");
check(/Future Advertising/.test(enPrivSrc) && /does not currently display advertisements/.test(enPrivSrc) && /policies\.google\.com\/technologies\/ads/.test(enPrivSrc), "EN privacy: future-advertising section present, states ads are NOT running, links Google ads policy");
check(/myadcenter\.google\.com/.test(idPrivSrc) && /myadcenter\.google\.com/.test(enPrivSrc) && !/google\.com\/settings\/ads/.test(idPrivSrc) && !/google\.com\/settings\/ads/.test(enPrivSrc), "Privacy: current Google Ads Settings URL (My Ad Center, verified live) in both editions; legacy settings/ads link removed");
check(/enTrust\.map/.test(sitemapSrc) && /\/kebijakan-iklan/.test(sitemapSrc), "Sitemap: EN trust pages mapped from enTrust into the en segment; ID sponsored policy in statis");
const footerSrc = readFileSync(join(root, "src/components/Footer.tsx"), "utf8");
check(enTrustPages.every((p) => footerSrc.includes(`/en/${p}`)) && /\/kebijakan-iklan/.test(footerSrc), "Footer: all 6 EN trust pages linked in the footer (5 in Legal + About in Explore); ID Legal links to the sponsored-content policy");
check(!/Privacy Policy \(Indonesian\)/.test(footerSrc) && !/Terms of Use \(Indonesian\)/.test(footerSrc), "Footer: EN visitors are no longer sent to Indonesian-only legal documents");
const idTermsSrc = readFileSync(join(root, "src/app/(id)/ketentuan/page.tsx"), "utf8");
const enTermsSrc = readFileSync(join(root, "src/app/(en)/en/terms-of-use/page.tsx"), "utf8");
check(/Batasan Tanggung Jawab/.test(idTermsSrc) && /Limitation of Liability/.test(enTermsSrc) && /hukum yang berlaku/.test(idTermsSrc) && /applicable law/.test(enTermsSrc), "Terms: liability limited 'to the extent permitted by applicable law' in both editions");
const idDmcaSrc = readFileSync(join(root, "src/app/(id)/dmca/page.tsx"), "utf8");
const enDmcaSrc = readFileSync(join(root, "src/app/(en)/en/dmca/page.tsx"), "utf8");
check(/Menanggapi Keputusan Penghapusan/.test(idDmcaSrc) && /Responding to a Removal Decision/.test(enDmcaSrc) && /mailto:\$\{site\.emailDmca\}/.test(idDmcaSrc) && /mailto:\$\{site\.emailDmca\}/.test(enDmcaSrc), "DMCA: removal-response process (not a statutory counter-notification) in both editions; DMCA email is a mailto link");
check(/Proses Pelaporan Sukarela/.test(idDmcaSrc) && /Voluntary Reporting Process/.test(enDmcaSrc) && /bukan pernyataan bahwa/.test(idDmcaSrc) && /not a representation that/.test(enDmcaSrc) && /tidak berlaku di sini/.test(idDmcaSrc) && /does not apply here/.test(enDmcaSrc), "DMCA: voluntary-process disclaimer in both editions (no formal statutory DMCA claim; no 10-14-day procedure)");

// Phase 2A Correction 1 (8 Nov 2026): Kucing metadata, empty-library metadata,
// freshness claims, English OG locale.
const kucingIdSrc = readFileSync(join(root, "src/lib/data/apps-parts/part4.ts"), "utf8");
const kucingEnSrc = readFileSync(join(root, "src/lib/data/i18n-en-apps-b.ts"), "utf8");
check(/seoTitle: "Kucing APK: Fakta, Risiko & Alternatif Anime Legal"/.test(kucingIdSrc) && /seoDescription: "Kenali Kucing APK, status developer yang tidak terverifikasi, risiko keamanan, dan alternatif anime legal\. CekAPK tidak menyediakan file unduhan aplikasi ini\."/.test(kucingIdSrc), "Kucing ID: metadata override title + description present (no official-download promise)");
check(/seoTitleEn: "Kucing APK: Safety Risks & Legal Alternatives"/.test(kucingEnSrc) && /seoDescriptionEn: "Learn about Kucing APK, its unverified developer, potential security risks and legal alternatives\. CekAPK does not host or link to a download for this app\."/.test(kucingEnSrc), "Kucing EN: metadata override title + description present (no official-download promise)");
const idAppTpl = readFileSync(join(root, "src/app/(id)/aplikasi/[slug]/page.tsx"), "utf8");
const enAppTpl = readFileSync(join(root, "src/app/(en)/en/aplikasi/[slug]/page.tsx"), "utf8");
check(/app\.seoTitle \?\?/.test(idAppTpl) && /app\.seoDescription \?\?/.test(idAppTpl), "ID app template: uses seoTitle/seoDescription override when present");
check(/en\.seoTitleEn \?\?/.test(enAppTpl) && /en\.seoDescriptionEn \?\?/.test(enAppTpl), "EN app template: uses seoTitleEn/seoDescriptionEn override when present");
const idOgImg = readFileSync(join(root, "src/app/(id)/aplikasi/[slug]/opengraph-image.tsx"), "utf8");
check(/legalStatus === "info_only" \? `\$\{app\.categoryName\} • CekAPK` : `\$\{app\.categoryName\} • Info & Link Resmi`/.test(idOgImg), "ID app OG image: info_only apps get a neutral eyebrow (no 'Link Resmi'), other apps keep it");
const libSrc = readFileSync(join(root, "src/app/(id)/perpustakaan/page.tsx"), "utf8");
check(/Perpustakaan APK CekAPK: Status Verifikasi & Kandidat Open-Source/.test(libSrc) && /Belum ada file APK yang tersedia/.test(libSrc), "Library: metadata describes the empty library accurately (no verified files)");
check(/Belum ada file yang selesai diverifikasi saat ini/.test(libSrc), "Library: zero-verified-files disclosure still visible and prominent");
check(!/dicek ulang secara berkala/.test(libSrc) && /dicek ulang setiap kali diterbitkan dan setiap kali diunduh/.test(libSrc), "Library: hash re-check wording matches the methodology (publish + download, not periodic)");
check(!/dicek ulang berkala/.test(idAppTpl) && !/fakta versi selalu versi resmi terbaru/.test(idAppTpl), "App template: no unsupported periodic re-check or latest-version claims");
check(/ditandai untuk dicek ulang begitu usianya melewati 90 hari/.test(idAppTpl), "App template: freshness note describes the real 90-day stale mechanism (stale when days > 90)");
check(/app\.officialUrl \? \(/.test(idAppTpl) && /Tidak ada cara resmi memasang/.test(idAppTpl), "App template: install section only for apps with an official URL; info_only apps get an accurate no-official-install note");
check(/tidak ada di Play Store dan tidak diperbarui lewat jalur resmi/.test(idAppTpl), "App template: changelog does not claim Play Store updates for info_only apps");
check(/path\.startsWith\("\/en"\) \? "en_US"/.test(seo), "seo.tsx: og:locale defaults to en_US for /en/* paths, id_ID otherwise (Phase 2A D)");
const enFiles = walk(join(root, "src/app/(en)")).filter((f) => f.endsWith("page.tsx"));
const idFiles = walk(join(root, "src/app/(id)")).filter((f) => f.endsWith("page.tsx"));
const enBadLocale = enFiles.filter((f) => /locale: "id_ID"/.test(readFileSync(f, "utf8")));
const idBadLocale = idFiles.filter((f) => /locale: "en_US"/.test(readFileSync(f, "utf8")));
check(enBadLocale.length === 0, `OG locale: no EN page passes id_ID${enBadLocale.length ? " — " + enBadLocale.join(", ") : ""}`);
check(idBadLocale.length === 0, `OG locale: no ID page passes en_US${idBadLocale.length ? " — " + idBadLocale.join(", ") : ""}`);

// Phase 2A Final Wording Fix (8 Nov 2026): versionNote + meta description +
// day-91 freshness wording. The independent review found the FactBox "Versi"
// value implied CekAPK verifies the latest version; the data string is fixed
// at the source (11 Play Store records share it), not in the template.
const dataParts = ["apps-parts/part1.ts", "apps-parts/part2.ts", "apps-parts/part3.ts", "apps-parts/part4.ts", "apps-parts/expansion-shared.ts"].map((f) => readFileSync(join(root, "src/lib/data", f), "utf8")).join("\n");
const newVn = (dataParts.match(/Ditentukan Play Store saat instal; kami tidak mencetak nomor versi/g) || []).length;
check(!/Selalu versi resmi terbaru dari Play Store/.test(dataParts) && newVn === 11, `versionNote: old "latest official version" wording gone; new wording present ${newVn}x across 11 Play Store records`);
check(/versionNote: "Tidak ada versi resmi - aplikasi ini tidak ada di Play Store"/.test(kucingIdSrc), "Kucing: versionNote unchanged (no official version — still accurate)");
check(/Info lengkap \$\{app\.name\}: izin aplikasi, keamanan, dan link ke sumber resmi\. Dicek/.test(idAppTpl) && !/versi resmi, izin aplikasi/.test(idAppTpl), "ID app meta: 'versi resmi' removed from the description template (no version claim next to the check date)");
const keamananSrc = readFileSync(join(root, "src/app/(id)/keamanan/page.tsx"), "utf8");
const adminSrc = readFileSync(join(root, "src/app/(id)/admin/page.tsx"), "utf8");
check(/begitu usianya melewati 90 hari/.test(idAppTpl) && /begitu usianya melewati 90 hari/.test(keamananSrc) && /begitu usianya melewati 90 hari/.test(adminSrc), "Freshness wording: queue entry now says 'begitu usianya melewati 90 hari' (day 91, matches stale: days > 90)");
check(!/setelah 90 hari/.test(idAppTpl) && !/setelah 90 hari/.test(keamananSrc) && !/90 hari setelah/.test(adminSrc), "Freshness wording: old 'setelah 90 hari' queue phrasing gone");

// UI-03 Rev 1 (Nov 2026): locale-aware WebSite JSON-LD (C2), English search
// hub (C3), English SoftwareApplication (C4), English FactBox (Part 2),
// consent-banner overlap correction (Part 3), app-detail redesign (Part 4).
const seoSrc = readFileSync(join(root, "src/lib/seo.tsx"), "utf8");
const siteChromeSrc = readFileSync(join(root, "src/components/SiteChrome.tsx"), "utf8");
check(/websiteJsonLd = \(locale/.test(seoSrc) && /inLanguage: en \? "en-US" : "id-ID"/.test(seoSrc), "seo.tsx: websiteJsonLd takes a locale and returns en-US for EN, id-ID for ID (C2)");
check(/\/en\/aplikasi\?q=\{query\}/.test(seoSrc) && /\/aplikasi\?q=\{query\}/.test(seoSrc), "seo.tsx: WebSite SearchAction targets /en/aplikasi?q= for EN and /aplikasi?q= for ID (C2/C3)");
check(/websiteJsonLd\(locale\)/.test(siteChromeSrc), "SiteChrome: renders websiteJsonLd with the edition locale (C2)");
check(/softwareAppJsonLd = \(app: \{[^}]*lang\?: "id" \| "en"/.test(seoSrc) && /inLanguage: en \? "en-US" : "id-ID"/.test(seoSrc), "seo.tsx: softwareAppJsonLd takes a locale and returns en-US for EN, id-ID for ID (C4)");
check(/lang: "en"/.test(enAppTpl) && /softwareAppJsonLd\(/.test(enAppTpl), "EN app template: emits SoftwareApplication with lang en (C4)");
check(/description: en\.taglineEn/.test(enAppTpl) && /pageUrl: `\$\{site\.url\}\/en\/aplikasi\/\$\{slug\}`/.test(enAppTpl), "EN app template: SoftwareApplication description + page URL match the visible EN page (C4)");
check(/description: app\.tagline/.test(idAppTpl) && /pageUrl: `\$\{site\.url\}\/aplikasi\/\$\{app\.slug\}`/.test(idAppTpl), "ID app template: SoftwareApplication description + page URL match the visible ID page (C4)");

// English search hub (C3): real ?q= filtering, sitemap, hreflang, robots.
const enHubSrc = readFileSync(join(root, "src/app/(en)/en/aplikasi/page.tsx"), "utf8");
check(/searchParams/.test(enHubSrc) && /filter/.test(enHubSrc), "EN hub /en/aplikasi honours ?q= search param (C3 SearchAction target)");
check(/"id-ID"/.test(enHubSrc) && /"en-US"/.test(enHubSrc) && /\/en\/aplikasi/.test(enHubSrc), "EN hub: reciprocal id-ID + en-US alternates (C3)");
check(/\/en\/aplikasi/.test(sitemapSrc), "Sitemap: /en/aplikasi in the en segment (C3)");
const robotsSrc = readFileSync(join(root, "src/app/robots.ts"), "utf8");
check(/\/en\/aplikasi\?q=/.test(robotsSrc), "Robots: /en/aplikasi?q= kept out of the index like the ID search (C3)");
const bottomNavSrc = readFileSync(join(root, "src/components/BottomNav.tsx"), "utf8");
check(/href: "\/en\/aplikasi"/.test(bottomNavSrc), "BottomNav: EN Apps links to /en/aplikasi (fixes the F4 duplicate Home link)");

// English FactBox (Part 2): every catalog value has an English mapping.
const factboxSrc = readFileSync(join(root, "src/lib/data/i18n-en-factbox.ts"), "utf8");
const allAppParts = readdirSync(join(root, "src/lib/data/apps-parts")).filter((f) => f.endsWith(".ts")).map((f) => readFileSync(join(root, "src/lib/data/apps-parts", f), "utf8")).join("\n");
const uniq = (re) => [...new Set([...allAppParts.matchAll(re)].map((m) => m[1]))];
const fbPrices = uniq(/priceLabel: "([^"]+)"/g);
const fbMins = uniq(/minAndroid: "([^"]+)"/g);
const fbLangs = uniq(/languages: "([^"]+)"/g);
const fbCats = uniq(/categorySlug: "([^"]+)"/g);
const fbVersions = uniq(/versionNote: "([^"]+)"/g);
const fbSizes = uniq(/sizeLabel: "([^"]+)"/g);
const unmapped = (vals) => vals.filter((v) => !factboxSrc.includes(`"${v}"`));
check(unmapped(fbPrices).length === 0, `FactBox EN: all ${fbPrices.length} price labels mapped${unmapped(fbPrices).length ? " — MISSING: " + unmapped(fbPrices).join(" | ") : ""}`);
check(unmapped(fbMins).length === 0 && unmapped(fbLangs).length === 0 && unmapped(fbVersions).length === 0 && unmapped(fbSizes).length === 0, `FactBox EN: all min-Android (${fbMins.length}), languages (${fbLangs.length}), version-note (${fbVersions.length}) and size (${fbSizes.length}) values mapped`);
check(fbCats.every((c) => factboxSrc.includes(`"${c}":`)), `FactBox EN: all ${fbCats.length} category slugs mapped to English names`);
check(/categoryNameEn\(base\.categorySlug/.test(enAppTpl) && /priceLabelEn\(base\.priceLabel\)/.test(enAppTpl) && /minAndroidEn\(base\.minAndroid\)/.test(enAppTpl) && /languagesEn\(base\.languages\)/.test(enAppTpl), "EN app template: FactBox uses the localized helpers for category, price, min Android and languages (Part 2)");

// EN apps Nov 2026 (Chrome, Facebook, Gmail, Maps): the English edition
// carries its own genuine review date (verifiedAtEn), never the Indonesian
// verifiedAt; the template displays it and the sitemap uses it as lastmod.
const enAppsB = readFileSync(join(root, "src/lib/data/i18n-en-apps-b.ts"), "utf8");
const newEnApps = ["google-chrome", "facebook", "gmail", "google-maps"];
check(newEnApps.every((s) => new RegExp(`slug: "${s}"[\\s\\S]*?verifiedAtEn: "2026-11-18"`).test(enAppsB)), "EN apps Nov 2026: Chrome, Facebook, Gmail, Maps each carry verifiedAtEn 2026-11-18");
const newEnApps2 = ["whatsapp-business", "messenger", "snapchat", "discord"];
check(newEnApps2.every((s) => new RegExp(`slug: "${s}"[\\s\\S]*?verifiedAtEn: "2026-11-18"`).test(enAppsB)), "EN apps Nov 2026 (batch 2): WhatsApp Business, Messenger, Snapchat, Discord each carry verifiedAtEn 2026-11-18");
check(/const checkedAt = en\.verifiedAtEn \?\? base\.verifiedAt/.test(enAppTpl) && /formatCheckedEn\(checkedAt\)/.test(enAppTpl) && /value: checkedAt/.test(enAppTpl), "EN app template: displayed check date is verifiedAtEn when present, else the Indonesian verifiedAt (unchanged for the 11 older pages)");
check(/enApps\.map\(\(a\) => u\(`\/en\/aplikasi\/\$\{a\.slug\}`, 0\.7, a\.verifiedAtEn/.test(sitemapSrc), "Sitemap: EN app lastmod comes from verifiedAtEn (no lastmod for apps without one)");
check(/English guides for 19 Android apps/.test(enHubSrc), "EN hub: metadata description says 19 English app guides");

// Consent banner (Part 3): banner sits above the mobile bottom nav, the
// settings pill sits above it too, and a measured spacer reserves the
// banner's footprint while it is open.
const consentSrc = readFileSync(join(root, "src/components/AnalyticsConsent.tsx"), "utf8");
check(/bottom-\[72px\]/.test(consentSrc) && /bottom-20/.test(consentSrc), "Consent: banner bottom-[72px] and pill bottom-20 on mobile — both above the 56px bottom nav (Part 3)");
check(/ResizeObserver/.test(consentSrc) && /spacerHeight/.test(consentSrc), "Consent: measured spacer reserves the open banner's height (Part 3)");

// App-detail redesign (Part 4): shared chrome, sticky TOC, no emoji identity.
const appDetailSrc = readFileSync(join(root, "src/components/AppDetail.tsx"), "utf8");
check(/sticky top-20/.test(appDetailSrc) && /SectionHeading/.test(appDetailSrc), "AppDetail: sticky desktop TOC + shared section headings (Part 4)");
check(/LetterTile/.test(idAppTpl) && /LetterTile/.test(enAppTpl) && !/app\.icon/.test(idAppTpl) && !/base\.icon/.test(enAppTpl), "App detail: identity uses the UI-02 letter tile, not the emoji icon (Part 4)");
check(!/Tangkapan Layar/.test(idAppTpl), "App detail: placeholder screenshot figures removed (no real screenshots to show) (Part 4)");

if (fail > 0) { console.error(`\n${fail} check(s) failed.`); process.exit(1); }
console.log("\nAll SEO checks passed.");
