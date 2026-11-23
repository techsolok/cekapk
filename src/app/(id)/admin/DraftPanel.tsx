"use client";
import { useState } from "react";
import { categories } from "@/lib/data/categories";

interface DraftRow { id: number; name: string; slug: string; source: string; gateErrors: string[] }
export default function DraftPanel({ initialDrafts }: { initialDrafts: DraftRow[] }) {
  const [drafts, setDrafts] = useState<DraftRow[]>(initialDrafts);
  const [form, setForm] = useState({ name: "", developer: "", categorySlug: "utilitas", officialUrl: "", priceLabel: "Gratis", description: "", uniqueValue: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function create(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/admin/drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      if (d.ok) {
        setDrafts((ds) => [...ds, { id: d.draft.id, name: form.name, slug: d.draft.slug, source: "programmatic", gateErrors: d.gateErrors ?? [] }]);
        setMsg(`Draf "${form.name}" tersimpan sebagai DRAF. ${d.publishable ? "Quality gate lolos - tetap butuh klik Terbit oleh Admin." : "Quality gate belum lolos: lengkapi dulu sebelum bisa diterbitkan."}`);
        setForm({ name: "", developer: "", categorySlug: "utilitas", officialUrl: "", priceLabel: "Gratis", description: "", uniqueValue: "" });
      } else setMsg((d.errors ?? [d.message ?? "Gagal"]).join(" "));
    } catch { setMsg("Tidak bisa menghubungi server."); }
    finally { setBusy(false); }
  }
  async function publish(id: number, name: string) {
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/admin/publish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      const d = await r.json();
      if (d.ok) { setDrafts((ds) => ds.filter((x) => x.id !== id)); setMsg(`"${name}" diterbitkan oleh Admin.`); }
      else setMsg(`Belum bisa terbit: ${(d.errors ?? [d.message ?? ""]).join(" ")}`);
    } catch { setMsg("Tidak bisa menghubungi server."); }
    finally { setBusy(false); }
  }
  const inputCls = "mt-1 min-h-[44px] w-full rounded-xl border border-ink/15 px-3 text-sm";
  return (
    <section aria-label="Generator draf programmatic" className="space-y-4 rounded-2xl border border-mist p-4">
      <h2 className="font-bold text-ink">Generator Draf Programmatic (FR-ADM-04)</h2>
      <p className="text-sm text-ink/70">Generator hanya membuat <strong>draf</strong> dari data terstruktur. Tidak ada jalan otomatis ke Terbit: penerbitan butuh Admin yang masuk dan quality gate yang lolos.</p>
      <form onSubmit={create} className="grid gap-3 sm:grid-cols-2">
        <div><label className="text-sm font-semibold">Nama aplikasi<input value={form.name} onChange={set("name")} className={inputCls} required /></label></div>
        <div><label className="text-sm font-semibold">Developer<input value={form.developer} onChange={set("developer")} className={inputCls} required /></label></div>
        <div><label className="text-sm font-semibold">Kategori
          <select value={form.categorySlug} onChange={set("categorySlug")} className={inputCls}>{categories.map((c) => (<option key={c.slug} value={c.slug}>{c.name}</option>))}</select></label></div>
        <div><label className="text-sm font-semibold">URL resmi (Play Store)<input value={form.officialUrl} onChange={set("officialUrl")} className={inputCls} placeholder="https://play.google.com/…" required /></label></div>
        <div className="sm:col-span-2"><label className="text-sm font-semibold">Deskripsi terstruktur (kata unik dihitung gate)<textarea value={form.description} onChange={set("description")} rows={4} className="mt-1 w-full rounded-xl border border-ink/15 px-3 py-2 text-sm" required /></label></div>
        <div className="sm:col-span-2"><label className="text-sm font-semibold">Nilai unik nyata (hasil cek izin / data versi / FAQ nyata, min. 40 karakter)<textarea value={form.uniqueValue} onChange={set("uniqueValue")} rows={2} className="mt-1 w-full rounded-xl border border-ink/15 px-3 py-2 text-sm" required /></label></div>
        <button type="submit" disabled={busy} className="min-h-[48px] rounded-xl bg-primary font-semibold text-white disabled:opacity-50 sm:col-span-2">{busy ? "Menyimpan…" : "Simpan sebagai DRAF"}</button>
      </form>
      {msg && <p role="status" className="rounded-xl bg-primary-soft p-3 text-sm text-ink/85">{msg}</p>}
      <div>
        <h3 className="font-semibold text-ink">Draf menunggu review ({drafts.length})</h3>
        {drafts.length === 0 ? <p className="mt-1 text-sm text-ink/60">Belum ada draf di database.</p> : (
          <ul className="mt-2 divide-y divide-mist">
            {drafts.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center gap-3 py-2 text-sm">
                <span className="font-semibold text-ink">{d.name}</span><span className="text-ink/50">/{d.slug}/ · {d.source}</span>
                {d.gateErrors.length > 0 && <span className="text-danger">Gate: {d.gateErrors[0]}</span>}
                <button type="button" disabled={busy} onClick={() => publish(d.id, d.name)} className="ml-auto min-h-[40px] rounded-lg border border-ink/15 px-3 font-semibold disabled:opacity-50">Terbit (Admin)</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
