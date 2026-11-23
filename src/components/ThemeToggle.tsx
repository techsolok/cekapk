"use client";
import { useEffect, useState } from "react";
// Toggle mode gelap/terang (Fase 4): pilihan disimpan di localStorage "idapk-theme";
// skrip kecil di layout menerapkan kelas sebelum halaman digambar agar tidak berkedip.
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("idapk-theme", next ? "dark" : "light"); } catch { /* abaikan */ }
  }
  return (
    <button type="button" onClick={toggle} aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"} aria-pressed={dark}
      className="grid h-10 w-10 place-items-center rounded-full border border-mist text-lg" title={dark ? "Mode terang" : "Mode gelap"}>
      <span aria-hidden>{dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
