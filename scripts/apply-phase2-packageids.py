#!/usr/bin/env python3
"""Phase 2 SEO-06a: swap Play Store SEARCH urls for verified canonical details urls.

Reads the verified mapping from play-package-ids.md (slug -> packageId) and:
 1. expansion-a/b/c.ts: adds `packageId: "<id>",` after each record's slug.
 2. part1-4.ts (pillar apps): replaces the stored search officialUrl with the
    canonical details url.
 3. Developer fixes (verified live 6 Nov 2026):
    - zoom: "zoom.us" -> "Zoom Communications, Inc."
    - alight-motion: "Alight Creative, Inc." -> "SPLICE VIDEO EDITOR SRL"
  NOT changed: bstation stays "Bilibili (Bstation)" — Play's legal entity is
  BALABOOM PTE. LTD., but the page prose and the brand users see is Bilibili,
  same brand-vs-legal call as Shopee/Tokopedia/Canva (left as brands).
Kucing APK (info-only, officialUrl null) is untouched.
Prints a per-file change count and FAILS loudly on any missing slug/packageId.
"""
import re, pathlib, sys

ROOT = pathlib.Path("/home/hatch/workspace/id-apk-hub")

# --- parse mapping table from play-package-ids.md ---
md = (ROOT / "play-package-ids.md").read_text()
mapping = {}
for m in re.finditer(r"\| ([a-z0-9-]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([A-Za-z][A-Za-z0-9_.]+) \| (https://play\.google\.com/store/apps/details\?id=[^ |]+) \| (yes|no\*) \|", md):
    slug, _name, _dev, _cur, pkg, url, _ver = m.groups()
    mapping[slug] = (pkg, url)
print(f"mapping rows parsed: {len(mapping)}")
missing = [s for s in mapping if mapping[s][0] == "—"]
assert not missing, f"missing packageId for: {missing}"

DEV_FIXES = {
    "zoom": ("zoom.us", "Zoom Communications, Inc."),
    "alight-motion": ("Alight Creative, Inc.", "SPLICE VIDEO EDITOR SRL"),
}

def canonical(slug):
    return mapping[slug][1]

# --- 1. expansion records: insert packageId after record slug ---
for fname in ["expansion-a.ts", "expansion-b.ts", "expansion-c.ts"]:
    p = ROOT / "src/lib/data/apps-parts" / fname
    text = p.read_text()
    changed = 0
    def repl(m):
        global changed
        slug = m.group(1)
        if slug not in mapping:
            raise SystemExit(f"{fname}: no packageId for expansion slug {slug}")
        changed += 1
        return f'    slug: "{slug}", packageId: "{mapping[slug][0]}",'
    # record starts are exactly 4-space indented `slug: "...",` lines;
    # alternatives use deeper indentation and are not matched.
    new = re.sub(r'^    slug: "([a-z0-9-]+)",', repl, text, flags=re.M)
    print(f"{fname}: packageId inserted for {changed} records")
    assert changed > 0
    p.write_text(new)

# --- 2. pillar apps: replace search officialUrl with canonical, per app block ---
for fname in ["part1.ts", "part2.ts", "part3.ts", "part4.ts"]:
    p = ROOT / "src/lib/data/apps-parts" / fname
    text = p.read_text()
    changed = 0
    # split into app blocks: each starts with `  slug: "x",` (2-space indent)
    parts = re.split(r'(?m)^(  slug: "[a-z0-9-]+",.*)$', text)
    out = []
    current_slug = None
    for chunk in parts:
        m = re.match(r'  slug: "([a-z0-9-]+)",', chunk)
        if m:
            current_slug = m.group(1)
            out.append(chunk)
            continue
        if current_slug and "officialUrl:" in chunk:
            old = re.search(r'officialUrl: "([^"]+)"', chunk)
            if old and "store/search" in old.group(1):
                if current_slug == "kucing-apk":
                    raise SystemExit("kucing-apk must keep officialUrl null")
                if current_slug not in mapping:
                    raise SystemExit(f"{fname}: no packageId for pillar slug {current_slug}")
                chunk = chunk.replace(old.group(0), f'officialUrl: "{canonical(current_slug)}"')
                changed += 1
        out.append(chunk)
    print(f"{fname}: pillar officialUrl swapped for {changed} apps")
    p.write_text("".join(out))

# --- 3. developer fixes (expansion records + pillar bstation) ---
for fname in ["expansion-a.ts", "expansion-b.ts", "expansion-c.ts",
              "part1.ts", "part2.ts", "part3.ts", "part4.ts"]:
    p = ROOT / "src/lib/data/apps-parts" / fname
    text = p.read_text()
    for slug, (old_dev, new_dev) in DEV_FIXES.items():
        # only replace the developer on the record's own header line
        pat = re.compile(r'(\n    slug: "' + re.escape(slug) + r'",[^\n]*developer: ")' + re.escape(old_dev) + r'(")')
        text2, n = pat.subn(r'\g<1>' + new_dev + r'\g<2>', text)
        if n:
            print(f"{fname}: developer {slug}: {old_dev} -> {new_dev}")
            text = text2
        # pillar header lines use 2-space indent
        pat2 = re.compile(r'(\n  slug: "' + re.escape(slug) + r'",[^\n]*developer: ")' + re.escape(old_dev) + r'(")')
        text2, n = pat2.subn(r'\g<1>' + new_dev + r'\g<2>', text)
        if n:
            print(f"{fname}: developer {slug}: {old_dev} -> {new_dev}")
            text = text2
    p.write_text(text)

print("OK — packageId swap + developer fixes applied")
