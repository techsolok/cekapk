"use client";
import { useState } from "react";
export default function ReportForm({ fileId }: { fileId: number }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("safety");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [result, setResult] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/library/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileId, type, message, contact }) });
    const d = await r.json();
    setResult(d.message ?? "Terjadi kesalahan.");
    if (d.ok) { setMessage(""); }
  }
  if (!open) return <button type="button" onClick={() => setOpen(true)} className="min-h-[44px] rounded-lg border border-ink/15 px-4 text-sm font-semibold text-ink">Laporkan masalah / klaim hak cipta</button>;
  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-mist p-4">
      <p className="font-semibold text-ink">Laporkan file ini</p>
      <label className="block text-sm font-semibold">Jenis laporan
        <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 min-h-[44px] w-full rounded-xl border border-ink/15 px-3">
          <option value="safety">Keamanan (file mencurigakan)</option>
          <option value="dmca">Klaim hak cipta (DMCA)</option>
          <option value="broken">File rusak / tidak bisa dipasang</option>
        </select></label>
      <label className="block text-sm font-semibold">Penjelasan
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-ink/15 px-3 py-2" required /></label>
      <label className="block text-sm font-semibold">Kontak (opsional, untuk tindak lanjut)
        <input value={contact} onChange={(e) => setContact(e.target.value)} className="mt-1 min-h-[44px] w-full rounded-xl border border-ink/15 px-3" /></label>
      <button type="submit" className="min-h-[44px] rounded-xl bg-primary px-4 font-semibold text-white">Kirim Laporan</button>
      {result && <p role="status" className="text-sm text-ink/80">{result}</p>}
    </form>
  );
}
