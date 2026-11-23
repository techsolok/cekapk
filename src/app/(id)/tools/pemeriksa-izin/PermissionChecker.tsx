"use client";
import { useState } from "react";
import { Icon } from "@/components/home";

interface Found { key: string; nameId: string; risk: string; explanation: string; advice: string }
interface Report { found: Found[]; notDetectedCount: number; counts: { tinggi: number; sedang: number; rendah: number }; warnings: string[] }
const riskCls: Record<string, string> = { tinggi: "bg-red-50 text-danger", sedang: "bg-amber-100 text-warn", rendah: "bg-primary-soft text-primary-dark" };
export default function PermissionChecker() {
  const [preview, setPreview] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector<HTMLInputElement>('input[type="file"]');
    const file = input?.files?.[0];
    if (!file) { setError("Pilih tangkapan layar dulu."); return; }
    setBusy(true); setError(""); setReport(null);
    const fd = new FormData(); fd.append("image", file);
    try {
      const r = await fetch("/api/tools/permissions/check", { method: "POST", body: fd });
      const d = await r.json();
      if (!d.ok) { setError(d.message ?? "Pemeriksaan gagal."); return; }
      setReport(d.report);
    } catch { setError("Tidak bisa menghubungi server. Coba lagi."); }
    finally { setBusy(false); }
  }
  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="izin-img" className="font-semibold text-ink">Unggah tangkapan layar izin aplikasi</label>
          <div className="mt-1 rounded-xl border border-dashed border-ink/25 bg-paper p-3">
            <input id="izin-img" type="file" accept="image/png,image/jpeg,image/webp" className="block w-full text-sm text-ink file:mr-3 file:min-h-[44px] file:cursor-pointer file:rounded-xl file:border-0 file:bg-primary-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-dark"
              onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : ""); }} required />
            <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted"><Icon name="file" className="mt-0.5 h-4 w-4 shrink-0" />Ambil dari Pengaturan → Aplikasi → (nama aplikasi) → Izin, atau dari halaman Play Store bagian Izin. Gambar hanya diproses di server saat itu juga lalu dihapus - tidak disimpan.</p>
          </div>
        </div>
        {preview && <img src={preview} alt="Pratinjau tangkapan layarmu" className="max-h-64 rounded-xl border border-mist object-contain" />}
        <button type="submit" disabled={busy} className="min-h-[52px] w-full rounded-xl bg-primary px-5 font-semibold text-white shadow-sm disabled:opacity-60">{busy ? "Membaca tangkapan…" : "Periksa Izin Ini"}</button>
      </form>
      {error && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm leading-relaxed text-red-800"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
      {report && (
        <div className="space-y-3">
          <p className="rounded-xl bg-primary-soft p-3 text-sm text-ink/85" role="status">
            Terdeteksi <strong>{report.found.length} izin</strong>: {report.counts.tinggi} risiko tinggi, {report.counts.sedang} sedang, {report.counts.rendah} rendah. {report.notDetectedCount} jenis izin lain tidak terlihat di tangkapan ini (bukan berarti pasti tidak ada).
          </p>
          {report.warnings.map((w) => (<p key={w.slice(0, 30)} className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm leading-relaxed text-red-800" role="alert"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{w}</p>))}
          <ul className="space-y-2">
            {report.found.map((f) => (
              <li key={f.key} className="rounded-2xl border border-mist p-3">
                <p className="font-semibold text-ink">{f.nameId} <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${riskCls[f.risk]}`}>risiko {f.risk}</span></p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{f.explanation}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80"><strong>Saran:</strong> {f.advice}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
