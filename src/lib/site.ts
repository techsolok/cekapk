// SATU-SATUNYA tempat mengganti nama brand & domain (Keputusan Terbuka PRD #2).
// DECIDED 27 Okt 2026: brand final = CekAPK, domain utama cekapk.com (+ cekapk.id defensif).
// Ubah nilai di bawah + NEXT_PUBLIC_SITE_URL, seluruh situs ikut berubah.
export const site = {
  name: "CekAPK",
  tagline: "Temukan aplikasi Android dengan aman",
  description:
    "Situs Bahasa Indonesia untuk menemukan aplikasi Android, memakai tool online gratis, dan mengecek apakah sebuah APK aman sebelum menginstal.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cekapk.com",
  locale: "id_ID",
  emailKontak: "kontak@cekapk.com",
  emailDmca: "dmca@cekapk.com",
  timezone: "Asia/Jakarta",
} as const;
