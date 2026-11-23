import type { Config } from "tailwindcss";
// Design tokens - PRD section 9.2. Warna permukaan memakai variabel CSS agar mode gelap
// (Fase 4) cukup membalik variabel di globals.css - komponen tidak berubah.
// UI-01 Phase A (9 Nov 2026): token border/teks/semantik baru (lihat globals.css).
// linkblue dipertahankan sementara - 55 pemakaian di 27 file, pensiun di Phase D
// setelah dicek satu per satu (bukan replace global di Phase A).
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      ink: "rgb(var(--ink) / <alpha-value>)", paper: "rgb(var(--paper) / <alpha-value>)", mist: "rgb(var(--mist) / <alpha-value>)",
      border: "rgb(var(--border) / <alpha-value>)",
      secondary: "rgb(var(--text-secondary) / <alpha-value>)",
      muted: "rgb(var(--text-muted) / <alpha-value>)",
      success: "rgb(var(--success) / <alpha-value>)",
      warn: "rgb(var(--warn) / <alpha-value>)",
      danger: "rgb(var(--danger) / <alpha-value>)",
      primary: { DEFAULT: "#1565D8", dark: "rgb(var(--primary-dark) / <alpha-value>)", soft: "rgb(var(--primary-soft) / <alpha-value>)" },
      // UI-02 (12 Nov 2026): navy tetap untuk panel hero/CTA beranda — sama di
      // mode terang dan gelap, tidak membalik seperti token ink.
      navy: "#0B1F3A",
      // Skala brand UI-01 (nilai mode terang; pemakaian teks di mode gelap tetap
      // lewat primary-dark yang sudah membalik, sampai Phase D memasang varian gelap).
      brand: { 50: "#E8F1FE", 100: "#D6E6FB", 200: "#A9CCF5", 500: "#2E7DE0", 600: "#1565D8", 700: "#0F4FB0", 800: "#0B4DA2", 900: "#093D7D" },
      linkblue: "#2563EB",
    },
    fontFamily: { sans: ["var(--font-jakarta)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"] },
  }},
  plugins: [],
};
export default config;
