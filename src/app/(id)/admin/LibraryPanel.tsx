"use client";
import { useRef, useState } from "react";

export interface LibraryRow {
  id: number; name: string; packageName: string; version: string; status: string;
  safetyScore: number | null; reviewedBy: string | null; sha256: string;
  steps: { step: string; ok: boolean; detail: string }[];
}
export default function LibraryPanel({ initialRows }: { initialRows: LibraryRow[] }) {
  const [rows, setRows] = useState<LibraryRow[]>(initialRows);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState({ name: "", packageName: "", version: "", appSlug: "", sourceName: "", sourceUrl: "", sourceType: "open_source", licence: "", expectedFingerprint: "", permissions: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFields((f) => ({ ...f, [k]: e.target.value }));

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) { setMsg("Pilih berkas APK dulu."); return; }
    setBusy(true); setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    for (const [k, v] of Object.entries(fields)) fd.append(k, v);
    try {
      const r = await fetch("/api/admin/library/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (d.ok) {
        setRows((rs) => [{ id: d.id, name: fields.name, packageName: fields.packageName, version: fields.version, status: "draft", safetyScore: d.safetyScore, reviewedBy: null, sha256: d.sha256, steps: d.pipeline }, ...rs]);
        setMsg(`File tersimpan sebagai DRAF. Pipeline: ${d.pipeline.filter((s: { ok: boolean }) => s.ok).length}/${d.pipeline.length} langkah lolos. ${d.safetyScore ? `Skor keamanan ${d.safetyScore}/100.` : "Skor belum terhitung - ada langkah yang belum lolos."}`);
      } else setMsg(d.message ?? "Unggah gagal.");
    } catch { setMsg("Tidak bisa menghubungi server."); }
    finally { setBusy(false); }
  }
  async function act(id: number, kind: "review" | "publish") {
    setBusy(true); setMsg("");
    try {
      const r = await fetch(`/api/admin/library/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      const d = await r.json();
      if (d.ok) {
        setRows((rs) => rs.map((x) => x.id === id ? { ...x, ...(kind === "review" ? { reviewedBy: d.reviewedBy } : { status: "published" }) } : x));
        setMsg(kind === "review" ? "Review manual tercatat." : "File DITERBITKAN ke Perpustakaan Legal.");
      } else setMsg((d.errors ?? [d.message ?? "Gagal"]).join(" "));
    } catch { setMsg("Tidak bisa menghubungi server."); }
    finally { setBusy(false); }
  }
  const inputCls = "mt-1 min-h-[44px] w-full rounded-xl border border-ink/15 px-3 text-sm";
  return (
    <section aria-label="Library APK Legal" className="space-y-4 rounded-2xl border border-mist p-4">
      <h2 className="font-bold text-ink">Library APK Legal - Pipeline Verifikasi §14</h2>
      <p className="text-sm text-ink/70">Unggah file dari sumber resmi → hash, struktur, tanda tangan, scan, dan audit izin berjalan otomatis. Satu langkah gagal = tidak bisa terbit. Terbit juga butuh review manual Admin.</p>
      <form onSubmit={upload} className="grid gap-3 sm:grid-cols-2">
        <div><label className="text-sm font-semibold">Nama aplikasi<input value={fields.name} onChange={set("name")} className={inputCls} required /></label></div>
        <div><label className="text-sm font-semibold">Package name<input value={fields.packageName} onChange={set("packageName")} className={inputCls} placeholder="org.contoh.aplikasi" required /></label></div>
        <div><label className="text-sm font-semibold">Versi<input value={fields.version} onChange={set("version")} className={inputCls} required /></label></div>
        <div><label className="text-sm font-semibold">Slug aplikasi terkait (opsional)<input value={fields.appSlug} onChange={set("appSlug")} className={inputCls} /></label></div>
        <div><label className="text-sm font-semibold">Sumber resmi<input value={fields.sourceName} onChange={set("sourceName")} className={inputCls} placeholder="F-Droid / situs developer" required /></label></div>
        <div><label className="text-sm font-semibold">URL sumber<input value={fields.sourceUrl} onChange={set("sourceUrl")} className={inputCls} required /></label></div>
        <div><label className="text-sm font-semibold">Jenis sumber
          <select value={fields.sourceType} onChange={set("sourceType")} className={inputCls}><option value="open_source">Open-source</option><option value="developer">Developer langsung</option></select></label></div>
        <div><label className="text-sm font-semibold">Lisensi<input value={fields.licence} onChange={set("licence")} className={inputCls} placeholder="GPL-3.0+ / Apache-2.0" required /></label></div>
        <div className="sm:col-span-2"><label className="text-sm font-semibold">Fingerprint SHA-256 sertifikat resmi developer (dari F-Droid / developer)<input value={fields.expectedFingerprint} onChange={set("expectedFingerprint")} className={inputCls} required /></label></div>
        <div className="sm:col-span-2"><label className="text-sm font-semibold">Izin (JSON: [{`{"name":"Internet","meaning":"penjelasan awam","dangerous":false}`}])<textarea value={fields.permissions} onChange={set("permissions")} rows={3} className="mt-1 w-full rounded-xl border border-ink/15 px-3 py-2 font-mono text-xs" required /></label></div>
        <div className="sm:col-span-2"><label className="text-sm font-semibold">Berkas APK<input ref={fileRef} type="file" accept=".apk,application/vnd.android.package-archive" className="mt-1 block w-full text-sm" required /></label></div>
        <button type="submit" disabled={busy} className="min-h-[48px] rounded-xl bg-primary font-semibold text-white disabled:opacity-50 sm:col-span-2">{busy ? "Memeriksa…" : "Unggah & Jalankan Pipeline"}</button>
      </form>
      {msg && <p role="status" className="rounded-xl bg-primary-soft p-3 text-sm text-ink/85">{msg}</p>}
      <div>
        <h3 className="font-semibold text-ink">File di library ({rows.length})</h3>
        {rows.length === 0 ? <p className="mt-1 text-sm text-ink/60">Belum ada file. Library publik hanya menampilkan file berstatus published.</p> : (
          <ul className="mt-2 space-y-3">
            {rows.map((r) => (
              <li key={r.id} className="rounded-xl border border-mist p-3 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-ink">{r.name} {r.version}</span>
                  <span className="text-ink/50">{r.packageName}</span>
                  <span className="rounded-full bg-mist px-2 py-0.5 text-xs font-semibold">{r.status}</span>
                  {r.safetyScore !== null && <span className="text-primary-dark font-semibold">Skor {r.safetyScore}/100</span>}
                  <span className="ml-auto flex gap-2">
                    {!r.reviewedBy && <button type="button" disabled={busy} onClick={() => act(r.id, "review")} className="min-h-[36px] rounded-lg border border-ink/15 px-3 font-semibold disabled:opacity-50">Review Manual</button>}
                    {r.status !== "published" && <button type="button" disabled={busy} onClick={() => act(r.id, "publish")} className="min-h-[36px] rounded-lg bg-primary px-3 font-semibold text-white disabled:opacity-50">Terbit</button>}
                  </span>
                </div>
                <ul className="mt-2 space-y-0.5 text-xs text-ink/70">
                  {r.steps.map((s) => (<li key={s.step}>{s.ok ? "✅" : "⛔"} <strong>{s.step}</strong> - {s.detail}</li>))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
