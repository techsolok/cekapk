#!/usr/bin/env python3
"""Phase 2 SEO-06b: apply group-specific template variants to expansion-shared.ts.

Parses expansion-template-variants.md (sections P1..P7 + section 9 intros) and:
 1. Generates profile-keyed records (WORKFLOW_P2, SAFETY_P1, FAQ_SAFE,
    FAQ_FREE_TAIL, FAQ_INSTALL, FAQ_UNAVAILABLE, FAQ_ACCOUNT,
    PERMISSIONS_INTRO) with the draft text verbatim. Placeholders {name} /
    {developer} / {priceLabel} are kept as-is and filled at render time.
 2. Inserts the records after PROFILE_SAFETY in expansion-shared.ts.
 3. Replaces the 7 inline shared template strings in buildExpansionApp with
    lookups + fill(). The gratis FAQ keeps its per-app priceLabel first
    sentence and appends the group tail.
 4. Adds a fill() helper inside buildExpansionApp.
Fails loudly if any expected original string is missing/duplicated, or if a
variant contains a backtick or ${ (which would break the TS template literal).
"""
import re, pathlib, sys

ROOT = pathlib.Path("/home/hatch/workspace/id-apk-hub")
MD = ROOT / "expansion-template-variants.md"
SRC = ROOT / "src/lib/data/apps-parts/expansion-shared.ts"

GROUPS = ["game", "social", "creator", "streaming", "shopping",
          "finance", "productivity", "education", "utility"]

SECTION_RECORD = {
    "P1": "WORKFLOW_P2",
    "P2": "SAFETY_P1",
    "P3": "FAQ_SAFE",
    "P4": "FAQ_FREE_TAIL",
    "P5": "FAQ_INSTALL",
    "P6": "FAQ_UNAVAILABLE",
    "P7": "FAQ_ACCOUNT",
}

text = MD.read_text()

# --- parse P1..P7: '## P<n> — ...' then '### <group>' then '> ...' lines ---
variants = {}  # (record, group) -> text
for sec, record in SECTION_RECORD.items():
    m = re.search(rf"^## {sec} —.*?\n(.*?)(?=^## |\Z)", text, flags=re.M | re.S)
    assert m, f"section {sec} not found"
    body = m.group(1)
    for g in GROUPS:
        gm = re.search(rf"^### {g}\n((?:^> .*\n?)+)", body, flags=re.M)
        assert gm, f"{sec}/{g}: variant block not found"
        lines = [ln[2:].strip() for ln in gm.group(1).strip().splitlines()]
        variants[(record, g)] = " ".join(lines)

# --- parse section 9 intros: '- **group:** "text"' ---
intros = {}
m9 = re.search(r"^## §9 —.*?(?=^## |\Z)", text, flags=re.M | re.S)
assert m9, "section 9 not found"
for g in GROUPS:
    im = re.search(rf'^- \*\*{g}:\*\* "(.*)"\s*$', m9.group(0), flags=re.M)
    assert im, f"intro for {g} not found"
    intros[g] = im.group(1)

for (rec, g), v in list(variants.items()) + [("PERMISSIONS_INTRO", g) for g in []]:
    pass
for g, v in intros.items():
    variants[("PERMISSIONS_INTRO", g)] = v

# --- safety: no backticks or ${ in any variant (TS template literal safety) ---
for (rec, g), v in variants.items():
    assert "`" not in v, f"{rec}/{g}: contains backtick"
    assert "${" not in v, f"{rec}/{g}: contains ${{"
    assert v, f"{rec}/{g}: empty"

def ts_record(name, values):
    lines = [f"const {name}: Record<PermissionProfile, string> = {{"]
    for g in GROUPS:
        lines.append(f"  {g}: `{values[g]}`,")
    lines.append("};")
    return "\n".join(lines)

order = ["WORKFLOW_P2", "SAFETY_P1", "FAQ_SAFE", "FAQ_FREE_TAIL",
         "FAQ_INSTALL", "FAQ_UNAVAILABLE", "FAQ_ACCOUNT", "PERMISSIONS_INTRO"]
block = "\n\n// Phase 2 SEO-06: group-specific variants (was 7 byte-identical shared\n// paragraphs across all 39 expansion pages). Placeholders {name} /\n// {developer} / {priceLabel} are filled by fill() in buildExpansionApp.\n"
block += "\n\n".join(ts_record(name, {g: variants[(name, g)] for g in GROUPS}) for name in order)

src = SRC.read_text()

# --- insert records after PROFILE_SAFETY ---
anchor = "};\n\nexport function buildExpansionApp"
assert src.count(anchor) == 1, "PROFILE_SAFETY anchor not unique"
src = src.replace(anchor, "};\n" + block + "\n\nexport function buildExpansionApp")

# --- replace the 7 inline templates ---
ORIGINALS = {
    "WORKFLOW_P2": "Dalam praktiknya, pengalaman memakai ${r.name} akan sangat dipengaruhi kualitas jaringan, perangkat, dan pengaturan akunmu. Mulailah dari fitur inti yang benar-benar kamu butuhkan, periksa izin serta biaya tambahannya, lalu aktifkan fitur lanjutan satu per satu. Cara bertahap ini membuatmu lebih mudah mengenali manfaat nyata aplikasi dan tidak menyerahkan data atau uang untuk fitur yang sebenarnya tidak kamu pakai.",
    "SAFETY_P1": "Unduh ${r.name} hanya dari Google Play Store dan pastikan developer-nya adalah ${r.developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas pembaruan dari chat, situs pengumpul APK, atau penjual akun.",
    "FAQ_SAFE": "Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah ${r.developer}. Keamanan akun setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan perlindungan tambahan yang tersedia, dan periksa izin yang tidak sesuai dengan fungsi aplikasi.",
    "FAQ_INSTALL": "Tekan tombol resmi di halaman ini atau cari ${r.name} langsung di Play Store, cocokkan nama developer ${r.developer}, lalu ketuk Instal. Setelah selesai, buka pengaturan izin dan notifikasi sebelum mulai memakai fitur yang meminta data pribadi.",
    "FAQ_UNAVAILABLE": "Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.",
    "FAQ_ACCOUNT": "Sebagian fitur inti biasanya memerlukan akun agar data, pembelian, atau progres tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar akun tidak dipakai orang lain.",
}
REPLACEMENTS = {
    "WORKFLOW_P2": "fill(WORKFLOW_P2[r.permissionProfile])",
    "SAFETY_P1": "fill(SAFETY_P1[r.permissionProfile])",
    "FAQ_SAFE": "fill(FAQ_SAFE[r.permissionProfile])",
    "FAQ_INSTALL": "fill(FAQ_INSTALL[r.permissionProfile])",
    "FAQ_UNAVAILABLE": "fill(FAQ_UNAVAILABLE[r.permissionProfile])",
    "FAQ_ACCOUNT": "fill(FAQ_ACCOUNT[r.permissionProfile])",
}
for name, orig in ORIGINALS.items():
    needle = "`" + orig + "`"
    assert src.count(needle) == 1, f"{name}: original template found {src.count(needle)} times (expected 1)"
    src = src.replace(needle, REPLACEMENTS[name])

# gratis FAQ: keep per-app priceLabel first sentence, append group tail
old_free = "`${r.priceLabel}. Periksa rincian di Play Store dan di dalam aplikasi sebelum membayar, karena paket, promosi, dan fitur berbayar dapat berubah. Jangan membeli versi 'premium terbuka' dari pihak ketiga; itu bukan cara resmi dan akunmu bisa dibatasi.`"
assert src.count(old_free) == 1, f"gratis FAQ original found {src.count(old_free)} times"
src = src.replace(old_free, "`${r.priceLabel}. ${fill(FAQ_FREE_TAIL[r.permissionProfile])}`")

# --- fill() helper + permissionsIntro wiring ---
old_builder_head = """export function buildExpansionApp(r: ExpansionRecord): PillarApp {
  // Phase 2 SEO-06: canonical Play details URL from the verified package ID
  // (play-package-ids.md) — never a search URL.
  const officialUrl = `https://play.google.com/store/apps/details?id=${r.packageId}`;"""
assert src.count(old_builder_head) == 1
new_builder_head = old_builder_head + """
  // Phase 2 SEO-06: fill {name} / {developer} / {priceLabel} placeholders
  // in the group-specific template variants below.
  const fill = (t: string) => t.replaceAll("{name}", r.name).replaceAll("{developer}", r.developer).replaceAll("{priceLabel}", r.priceLabel);"""
src = src.replace(old_builder_head, new_builder_head)

old_perm = "    permissions: PERMISSIONS[r.permissionProfile],"
assert src.count(old_perm) == 1
src = src.replace(old_perm, "    permissions: PERMISSIONS[r.permissionProfile],\n    permissionsIntro: PERMISSIONS_INTRO[r.permissionProfile],")

SRC.write_text(src)
print(f"OK — {len(variants)} variant texts applied (8 records x 9 groups), 7 templates replaced, permissionsIntro wired")
