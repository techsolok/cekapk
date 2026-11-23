"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [needTotp, setNeedTotp] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, totp: totp || undefined }) });
      const d = await r.json();
      if (d.needTotp) { setNeedTotp(true); setError(d.message); return; }
      if (d.ok) { router.push("/admin"); router.refresh(); return; }
      setError(d.message ?? "Gagal masuk.");
    } catch { setError("Tidak bisa menghubungi server. Coba lagi."); }
    finally { setBusy(false); }
  }
  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Masuk Admin</h1>
        <p className="mt-1 text-sm text-ink/60">Panel editor {site.name}. Sesi dilindungi kata sandi ter-hash dan, untuk Admin, 2FA TOTP bila diaktifkan.</p>
      </header>
      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-mist p-5">
        <div>
          <label htmlFor="adm-email" className="block text-sm font-semibold text-ink">Email</label>
          <input id="adm-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 px-3" required />
        </div>
        <div>
          <label htmlFor="adm-password" className="block text-sm font-semibold text-ink">Kata Sandi</label>
          <input id="adm-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 px-3" required />
        </div>
        {needTotp && (
          <div>
            <label htmlFor="adm-totp" className="block text-sm font-semibold text-ink">Kode 2FA (6 digit)</label>
            <input id="adm-totp" inputMode="numeric" autoComplete="one-time-code" value={totp} onChange={(e) => setTotp(e.target.value)} className="mt-1 min-h-[48px] w-full rounded-xl border border-ink/15 px-3" />
          </div>
        )}
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button type="submit" disabled={busy} className="min-h-[48px] w-full rounded-xl bg-primary font-semibold text-white disabled:opacity-50">{busy ? "Memeriksa…" : "Masuk"}</button>
      </form>
      <p className="text-xs leading-relaxed text-ink/55">Akun admin dibuat lewat perintah seed di server (variabel ADMIN_EMAIL + ADMIN_PASSWORD), tidak bisa mendaftar sendiri dari halaman ini. Itu disengaja.</p>
    </div>
  );
}
