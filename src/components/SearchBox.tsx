"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Result { name: string; url: string; type: string; developer: string; category: string }
// Pencarian instan Fase 3 (FR-HOME-02): Meilisearch lewat /api/search (toleran typo + alias),
// fallback lokal di server bila Meilisearch belum dikonfigurasi. Debounce 200 ms, maks 8 hasil,
// bisa dinavigasi keyboard (panah + Enter + Escape).
export default function SearchBox() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) { setResults([]); setOpen(false); return; }
    const t = setTimeout(async () => {
      abortRef.current?.abort();
      const ctl = new AbortController(); abortRef.current = ctl;
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: ctl.signal });
        const d = await r.json();
        setResults(d.results ?? []); setOpen(true); setActive(-1);
      } catch { /* permintaan dibatalkan / jaringan - diamkan */ }
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  function go(r: Result) { setOpen(false); router.push(r.url); }
  return (
    <div className="relative w-full">
      <label htmlFor="cari-utama" className="sr-only">Cari aplikasi, panduan, atau tool</label>
      <input id="cari-utama" type="search" role="combobox" aria-expanded={open} aria-controls="hasil-cari"
        aria-activedescendant={active >= 0 ? `hasil-${active}` : undefined}
        value={q} onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
          else if (e.key === "Enter" && active >= 0 && results[active]) { e.preventDefault(); go(results[active]); }
          else if (e.key === "Escape") setOpen(false);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onFocus={() => { if (results.length) setOpen(true); }}
        placeholder="Cari aplikasi… misalnya TikTok, DANA, Roblox"
        className="min-h-[52px] w-full rounded-2xl border border-ink/10 bg-paper px-4 text-base text-ink shadow-sm outline-none focus:border-primary" />
      {open && results.length > 0 && (
        <ul id="hasil-cari" role="listbox" className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-mist bg-paper shadow-lg">
          {results.map((r, i) => (
            <li key={r.url} id={`hasil-${i}`} role="option" aria-selected={i === active}>
              <button type="button" onClick={() => go(r)} onMouseEnter={() => setActive(i)}
                className={`flex min-h-[48px] w-full items-center px-4 text-left text-sm font-medium text-ink ${i === active ? "bg-primary-soft" : ""}`}>
                {r.name}
                <span className="ml-auto shrink-0 pl-3 text-xs text-muted">{r.type === "aplikasi" ? r.category : r.type === "tool" ? "Tool" : "Panduan"} →</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && q.trim().length >= 2 && results.length === 0 && (
        <p className="absolute inset-x-0 top-full z-30 mt-2 rounded-2xl border border-mist bg-paper p-4 text-sm text-ink/65 shadow-lg">Tidak ditemukan. Coba nama aplikasinya, misalnya "WhatsApp" atau "Roblox".</p>
      )}
    </div>
  );
}
