// English edition of the Permission Checker (Nov 2026). Mirrors the Indonesian
// component in src/app/(id)/tools/pemeriksa-izin/PermissionChecker.tsx, posting
// lang=en to the same API. Server error messages stay Indonesian, so this
// component maps them to English by HTTP status (SEO-17 pattern).
"use client";
import { useState } from "react";
import { Icon } from "@/components/home";

interface Found { key: string; nameId: string; risk: string; explanation: string; advice: string }
interface Report { found: Found[]; notDetectedCount: number; counts: { tinggi: number; sedang: number; rendah: number }; warnings: string[] }
const riskCls: Record<string, string> = { tinggi: "bg-red-50 text-danger", sedang: "bg-amber-100 text-warn", rendah: "bg-primary-soft text-primary-dark" };
const riskLabel: Record<string, string> = { tinggi: "high", sedang: "medium", rendah: "low" };
export default function PermissionCheckerEn() {
  const [preview, setPreview] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector<HTMLInputElement>('input[type="file"]');
    const file = input?.files?.[0];
    if (!file) { setError("Choose a screenshot first."); return; }
    setBusy(true); setError(""); setReport(null);
    const fd = new FormData(); fd.append("image", file); fd.append("lang", "en");
    try {
      const r = await fetch("/api/tools/permissions/check", { method: "POST", body: fd });
      const d = await r.json();
      if (!d.ok) {
        if (r.status === 429) setError("Too many checks in a short time. Wait a bit, then try again.");
        else if (r.status === 413) setError("The image is too large (max 8 MB).");
        else if (r.status === 503) setError("The OCR engine is not available on the server yet.");
        else if (r.status === 400) setError("Attach a screenshot first (PNG, JPG, or WebP, max 8 MB).");
        else setError("The check failed. Try again.");
        return;
      }
      setReport(d.report);
    } catch { setError("Could not reach the server. Try again."); }
    finally { setBusy(false); }
  }
  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="permission-img" className="font-semibold text-ink">Upload a screenshot of the app&apos;s permissions</label>
          <div className="mt-1 rounded-xl border border-dashed border-ink/25 bg-paper p-3">
            <input id="permission-img" type="file" accept="image/png,image/jpeg,image/webp" className="block w-full text-sm text-ink file:mr-3 file:min-h-[44px] file:cursor-pointer file:rounded-xl file:border-0 file:bg-primary-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-dark"
              onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : ""); }} required />
            <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted"><Icon name="file" className="mt-0.5 h-4 w-4 shrink-0" />Take it from Settings → Apps → (app name) → Permissions, or from the Play Store page&apos;s Permissions section. The image is processed on the server right then and deleted — never stored.</p>
          </div>
        </div>
        {preview && <img src={preview} alt="Preview of your screenshot" className="max-h-64 rounded-xl border border-mist object-contain" />}
        <button type="submit" disabled={busy} className="min-h-[52px] w-full rounded-xl bg-primary px-5 font-semibold text-white shadow-sm disabled:opacity-60">{busy ? "Reading the screenshot…" : "Check These Permissions"}</button>
      </form>
      {error && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm leading-relaxed text-red-800"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
      {report && (
        <div className="space-y-3">
          <p className="rounded-xl bg-primary-soft p-3 text-sm text-ink/85" role="status">
            Detected <strong>{report.found.length} permissions</strong>: {report.counts.tinggi} high risk, {report.counts.sedang} medium, {report.counts.rendah} low. {report.notDetectedCount} other permission types were not visible in this screenshot (that does not mean they are definitely absent).
          </p>
          {report.warnings.map((w) => (<p key={w.slice(0, 30)} className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm leading-relaxed text-red-800" role="alert"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />{w}</p>))}
          <ul className="space-y-2">
            {report.found.map((f) => (
              <li key={f.key} className="rounded-2xl border border-mist p-3">
                <p className="font-semibold text-ink">{f.nameId} <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${riskCls[f.risk]}`}>{riskLabel[f.risk] ?? f.risk} risk</span></p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{f.explanation}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80"><strong>Advice:</strong> {f.advice}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
