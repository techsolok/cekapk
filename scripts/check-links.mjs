// SEO-09 — full-site link crawler. No network beyond localhost, no new deps.
// Usage: npm run check:links
//   Starts `next start` on a local port (default 3102) unless a server is
//   already answering there, fetches every URL in the 7 sitemap segments,
//   extracts every internal href/src on each page, and checks each one.
//   Writes link-audit-<YYYY-MM-DD>.md in the project root and prints a
//   summary. Exits 1 when any sitemap page is non-200 or any internal
//   link is broken, so it can gate a deploy.
// Env: CRAWL_PORT (default 3102), CRAWL_BASE (use an already-running
//   server instead of starting one, e.g. http://localhost:3000),
//   CRAWL_OUT (report filename, default link-audit-<today>.md),
//   CRAWL_TIMEOUT_MS (default 15000), CRAWL_CONCURRENCY (default 5).
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const PORT = process.env.CRAWL_PORT ?? "3102";
const BASE = (process.env.CRAWL_BASE ?? `http://127.0.0.1:${PORT}`).replace(/\/$/, "");
const TIMEOUT_MS = Number(process.env.CRAWL_TIMEOUT_MS ?? 15000);
const CONCURRENCY = Number(process.env.CRAWL_CONCURRENCY ?? 5);
const today = new Date().toISOString().slice(0, 10);
const OUT = process.env.CRAWL_OUT ?? join(root, `link-audit-${today}.md`);

const ok = (m) => console.log(`  ${m}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- fetch helpers -------------------------------------------------------
async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), redirect: "follow" });
  const text = await res.text();
  return { status: res.status, text, finalUrl: res.url };
}
async function fetchStatus(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), redirect: "follow" });
    await res.arrayBuffer(); // drain so keep-alive sockets close cleanly
    return res.status;
  } catch (e) {
    return `ERR:${e.name === "TimeoutError" ? "timeout" : "fetch-failed"}`;
  }
}

// --- URL helpers ---------------------------------------------------------
const PROD_ORIGIN = "https://cekapk.com";
function toLocal(raw) {
  // Sitemap locs are absolute https://cekapk.com/... — point them at localhost.
  try {
    const u = new URL(raw, PROD_ORIGIN);
    if (u.origin === PROD_ORIGIN || u.origin === BASE) return `${BASE}${u.pathname}${u.search}`;
    return null; // external
  } catch { return null; }
}
function normalize(raw) {
  // Drop fragments; keep query (e.g. /aplikasi?q= is a real search target).
  try {
    const u = new URL(raw);
    u.hash = "";
    return u.toString();
  } catch { return raw; }
}
function pathOf(url) {
  try { return new URL(url).pathname; } catch { return url; }
}

// Concurrency-limited mapper.
async function mapPool(items, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

// --- server ----------------------------------------------------------------
let child = null;
async function ensureServer() {
  try {
    const r = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(3000) });
    if (r.status < 500) { ok(`reusing server already running at ${BASE}`); return false; }
  } catch { /* not running — start one */ }
  ok(`starting next start on port ${PORT} ...`);
  child = spawn("npx", ["next", "start", "-p", PORT], { cwd: root, stdio: "ignore", detached: true });
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(3000) });
      if (r.status < 500) { ok(`server up at ${BASE}`); return true; }
    } catch { /* still booting */ }
    await sleep(1000);
  }
  throw new Error("next start did not answer within 60s");
}

// Kill the whole process group (npx wrapper + next-server child), so no
// server is left listening after the run.
function stopServer() {
  if (!child) return;
  try { process.kill(-child.pid, "SIGTERM"); } catch { child.kill("SIGTERM"); }
  child = null;
}
const sitemapUrls = new Set();      // every URL listed in any sitemap segment
const pageStatus = new Map();       // sitemap URL -> status
const linkRefs = new Map();         // checked URL -> Set(source pages)
const imgAlts = [];                 // { page, src, kind: "missing"|"empty" }
const noCanonical = [];             // pages without <link rel="canonical">
const pageLinks = new Map();        // page -> Set(internal URLs it links to)

function extractLinks(html, pageUrl) {
  const found = new Set();
  const attr = (tag, name) => {
    const re = new RegExp(`<${tag}\\b[^>]*?\\s${name}\\s*=\\s*["']([^"']+)["']`, "gi");
    for (const m of html.matchAll(re)) found.add(m[1]);
  };
  attr("a", "href"); attr("img", "src"); attr("link", "href"); attr("script", "src");
  const out = new Set();
  for (const raw of found) {
    if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:") || raw.startsWith("data:")) continue;
    // HTML attribute values escape & as &amp; — browsers decode it before
    // requesting, so the checker must too (next/image URLs carry &w= &q=).
    const local = toLocal(raw.replace(/&amp;/g, "&"));
    if (local) out.add(normalize(local));
  }
  return out;
}

function extractImgAlts(html, pageUrl) {
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = /src\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1] ?? "(no src)";
    const alt = /alt\s*=\s*["']([^"']*)["']/i.exec(tag);
    if (!alt) imgAlts.push({ page: pageUrl, src, kind: "missing" });
    else if (alt[1].trim() === "") imgAlts.push({ page: pageUrl, src, kind: "empty" });
  }
}

async function main() {
  const started = await ensureServer();
  try {
    // 1. Sitemap index -> segments -> URLs.
    const index = await fetchText(`${BASE}/sitemap.xml`);
    if (index.status !== 200) throw new Error(`/sitemap.xml returned ${index.status}`);
    const segLocs = [...index.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    ok(`sitemap index: ${segLocs.length} segments`);
    const segResults = await mapPool(segLocs, async (loc) => {
      const local = toLocal(loc);
      const r = await fetchText(local);
      const urls = [...r.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => normalize(toLocal(m[1])));
      return { seg: pathOf(local), status: r.status, urls };
    });
    for (const s of segResults) {
      ok(`  ${s.seg}: HTTP ${s.status}, ${s.urls.length} URLs`);
      if (s.status !== 200) throw new Error(`sitemap segment ${s.seg} returned ${s.status}`);
      for (const u of s.urls) sitemapUrls.add(u);
    }
    ok(`total sitemap URLs: ${sitemapUrls.size}`);

    // 2. Fetch every sitemap page; extract its internal links + alt + canonical.
    const pages = [...sitemapUrls];
    await mapPool(pages, async (url) => {
      let status, html = "";
      try {
        const r = await fetchText(url);
        status = r.status; html = r.text;
      } catch (e) {
        status = `ERR:${e.name === "TimeoutError" ? "timeout" : "fetch-failed"}`;
      }
      pageStatus.set(url, status);
      if (status !== 200 || !html) return;
      const links = extractLinks(html, url);
      pageLinks.set(url, links);
      for (const l of links) {
        if (!linkRefs.has(l)) linkRefs.set(l, new Set());
        linkRefs.get(l).add(url);
      }
      extractImgAlts(html, url);
      if (!/<link\b[^>]*rel\s*=\s*["']canonical["']/i.test(html)) noCanonical.push(url);
    });

    // 3. Check every distinct internal URL found (pages + linked assets).
    const toCheck = new Set([...linkRefs.keys()]);
    for (const u of sitemapUrls) toCheck.delete(u); // already fetched above
    const checked = new Map(); // url -> status
    for (const [u, s] of pageStatus) checked.set(u, s);
    const checkList = [...toCheck];
    ok(`checking ${checkList.length} additional internal URLs ...`);
    await mapPool(checkList, async (u) => checked.set(u, await fetchStatus(u)));

    // 4. Analyse.
    const broken = [...checked.entries()]
      .filter(([, s]) => s !== 200)
      .map(([u, s]) => ({ url: u, status: s, refs: [...(linkRefs.get(u) ?? [])] }));
    const sitemapNon200 = [...pageStatus.entries()].filter(([, s]) => s !== 200);
    const linkedFromElsewhere = new Set();
    for (const [page, links] of pageLinks) for (const l of links) if (l !== page) linkedFromElsewhere.add(l);
    const orphans = [...sitemapUrls].filter((u) => !linkedFromElsewhere.has(u));
    const sitemapPaths = new Set([...sitemapUrls].map((u) => pathOf(u)));
    const isAsset = (u) => {
      const p = pathOf(u);
      return p.startsWith("/_next/") || p.endsWith("/feed.xml")
        || /\.(js|css|woff2?|png|jpe?g|gif|svg|ico|webmanifest|txt)$/i.test(p);
    };
    const notInSitemapAll = [...checked.keys()]
      .filter((u) => !sitemapPaths.has(pathOf(u)))
      .map((u) => ({ url: u, status: checked.get(u) }));
    // Build assets, icons, the PWA manifest and the RSS feed are internal
    // URLs by design — they must return 200 but must NOT be in the sitemap.
    const notInSitemapAssets = notInSitemapAll.filter((n) => isAsset(n.url));
    const notInSitemap = notInSitemapAll.filter((n) => !isAsset(n.url));

    // 5. Report.
    const lines = [];
    lines.push(`# Link Audit — CekAPK (SEO-09)`, ``);
    lines.push(`Date: ${today} (Asia/Jakarta run) · Base: ${BASE} (localhost crawl of the built site)`);
    lines.push(`Command: \`npm run check:links\``);
    lines.push(``);
    lines.push(`## Summary`, ``);
    lines.push(`| Check | Count |`);
    lines.push(`| --- | ---: |`);
    lines.push(`| Sitemap URLs crawled | ${sitemapUrls.size} |`);
    lines.push(`| Sitemap pages returning non-200 | ${sitemapNon200.length} |`);
    lines.push(`| Distinct internal URLs checked | ${checked.size} |`);
    lines.push(`| Broken internal links (non-200) | ${broken.length} |`);
    lines.push(`| Orphan pages (in sitemap, linked from nowhere) | ${orphans.length} |`);
    lines.push(`| Internal content URLs not in any sitemap | ${notInSitemap.length} |`);
    lines.push(`| Non-page assets checked (/_next/, icons, manifest, feed) | ${notInSitemapAssets.length} |`);
    lines.push(`| Images missing alt attribute | ${imgAlts.filter((i) => i.kind === "missing").length} |`);
    lines.push(`| Images with empty alt ("") | ${imgAlts.filter((i) => i.kind === "empty").length} |`);
    lines.push(`| Pages missing a canonical link | ${noCanonical.length} |`);
    lines.push(``);
    const sec = (title, items, fmt) => {
      lines.push(`## ${title} (${items.length})`, ``);
      if (!items.length) { lines.push(`None.`, ``); return; }
      for (const it of items) lines.push(`- ${fmt(it)}`);
      lines.push(``);
    };
    sec("Sitemap pages returning non-200", sitemapNon200, ([u, s]) => `\`${u}\` — HTTP ${s}`);
    sec("Broken internal links", broken, (b) => `\`${b.url}\` — HTTP ${b.status} — linked from: ${b.refs.length ? b.refs.map((r) => `\`${r}\``).join(", ") : "(sitemap only)"}`);
    sec("Orphan pages (in sitemap, linked from nowhere)", orphans, (u) => `\`${u}\``);
    sec("Internal content URLs not in any sitemap", notInSitemap, (n) => `\`${n.url}\` — HTTP ${n.status}`);
    sec("Non-page assets checked (expected outside the sitemap)", notInSitemapAssets, (n) => `\`${n.url}\` — HTTP ${n.status}`);
    sec("Images missing alt attribute", imgAlts.filter((i) => i.kind === "missing"), (i) => `\`${i.src}\` on \`${i.page}\``);
    sec("Images with empty alt", imgAlts.filter((i) => i.kind === "empty"), (i) => `\`${i.src}\` on \`${i.page}\``);
    sec("Pages missing a canonical link", noCanonical, (u) => `\`${u}\``);
    lines.push(`## Notes`, ``);
    lines.push(`- Query URLs such as \`/aplikasi?q=...\` are intentionally absent from the sitemap (robots.txt disallows them) — they appear under "content not in any sitemap" only if some page links to them.`);
    lines.push(`- \`/_next/\` asset URLs, the favicon, the PWA manifest and \`/panduan/feed.xml\` are checked as found in the HTML; they return 200 but are listed separately because they correctly do not belong in the sitemap.`);
    lines.push(`- Orphan detection counts a link from any other crawled page (footer/nav included). A page linked only from itself still counts as orphan.`);
    writeFileSync(OUT, lines.join("\n"));
    console.log(`\nSitemap URLs: ${sitemapUrls.size} | checked: ${checked.size} | broken: ${broken.length} | orphans: ${orphans.length} | content-not-in-sitemap: ${notInSitemap.length} | assets: ${notInSitemapAssets.length} | img alt missing/empty: ${imgAlts.filter((i) => i.kind === "missing").length}/${imgAlts.filter((i) => i.kind === "empty").length} | no canonical: ${noCanonical.length}`);
    console.log(`Report written: ${OUT}`);
    if (broken.length || sitemapNon200.length) { console.error(`\nFAILED: ${broken.length} broken link(s), ${sitemapNon200.length} sitemap page(s) non-200.`); process.exitCode = 1; }
    else console.log("\nAll link checks passed.");
  } finally {
    if (started) { stopServer(); ok("server stopped"); }
  }
}

main().catch((e) => { console.error(`\nERROR: ${e.message}`); stopServer(); process.exit(1); });
