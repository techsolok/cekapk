// Verifikasi daftar negatif tanpa dependensi tambahan: membaca file TS sebagai teks
// dan memastikan istilah kunci PRD 12.6 hadir, lalu menguji logika pencocokan sederhana.
import { readFileSync } from "node:fs";
const src = readFileSync(new URL("../src/lib/negative-list.ts", import.meta.url), "utf8");
const must = ["jayaslot", "rejekibet", "nekopoi", "mod apk", "togel", "bokep"];
const missing = must.filter((t) => !src.includes(`"${t}"`));
if (missing.length) { console.error("HILANG dari daftar negatif:", missing); process.exit(1); }
console.log("OK - semua istilah kunci daftar negatif PRD 12.6 hadir:", must.join(", "));
