"use client";
import { useMemo, useState } from "react";
import { checkQualityGate } from "@/lib/quality-gate";
// Demo editor: tombol Terbit BENAR-BENAR dinonaktifkan quality gate + daftar negatif (FR-ADM-02).
export default function AdminGateDemo() {
  const [name, setName] = useState("");
  const [words, setWords] = useState(0);
  const [legal, setLegal] = useState<"" | "play_store" | "open_source" | "developer_direct" | "info_only">("");
  const [url, setUrl] = useState("");
  const gate = useMemo(() => checkQualityGate({
    name: name || "Tanpa Nama", descriptionWords: words, hasFactBox: words > 0,
    legalStatus: legal === "" ? null : legal, officialUrl: url || null, hasUniqueValue: words >= 600,
  }), [name, words, legal, url]);
  return (
    <section aria-label="Uji quality gate" className="rounded-2xl border border-mist p-4">
      <h2 className="font-bold text-ink">Uji Quality Gate (coba langgar)</h2>
      <p className="mt-1 text-sm text-ink/70">Contoh: isi nama mengandung kata dari daftar negatif PRD 12.6, atau kata &lt;600 - tombol Terbit akan terkunci dan alasannya ditampilkan.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-ink">Nama aplikasi<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 px-3" placeholder="Nama aplikasi" /></label>
        <label className="text-sm font-medium text-ink">Jumlah kata deskripsi<input type="number" value={words} onChange={(e) => setWords(Number(e.target.value))} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 px-3" /></label>
        <label className="text-sm font-medium text-ink">Status legal
          <select value={legal} onChange={(e) => setLegal(e.target.value as typeof legal)} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 px-3">
            <option value="">- belum diisi -</option><option value="play_store">Play Store</option><option value="open_source">Open-Source</option><option value="developer_direct">Developer Resmi</option><option value="info_only">Info Saja</option>
          </select></label>
        <label className="text-sm font-medium text-ink">URL resmi<input value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 px-3" placeholder="https://play.google.com/..." /></label>
      </div>
      <button type="button" disabled={!gate.ok} className="mt-4 min-h-[48px] rounded-xl bg-primary px-5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-ink/25">
        {gate.ok ? "Terbit" : "Terbit Terkunci oleh Quality Gate"}
      </button>
      {!gate.ok && (<ul className="mt-2 list-disc pl-5 text-sm text-danger">{gate.errors.map((e) => (<li key={e}>{e}</li>))}</ul>)}
    </section>
  );
}
