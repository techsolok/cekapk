# ID APK Hub - Fase 0 (Fondasi) SELESAI

Dibangun dari: `Plan-PRD-Situs-APK-Indonesia.md` bagian 18 Fase 0 + section 8, 9.2, 10, 12.1.
UI 100% Bahasa Indonesia. Belum ada database aktif dan belum ada tool - itu Fase 1-2.

## Isi Fase 0
- Next.js 15 + TypeScript + Tailwind, App Router, semua halaman ter-render server.
- Design system PRD 9.2: warna (hijau #0E9F6E, tinta #12211C, biru link #2563EB), Plus Jakarta Sans,
  komponen Header, BottomNav mobile, Footer, SearchBox (alias), AppCard, SafetyScore, TrustBadge,
  OfficialButton, Breadcrumb, FaqAccordion. Target sentuh >=48px, fokus terlihat, reduced-motion dihormati.
- Skema data lengkap PRD 8 (Drizzle/PostgreSQL): apps, versions, categories, guides, comparisons,
  tools, keywords, reports, admins - di `src/db/schema.ts`.
- Penjaga daftar negatif PRD 12.6 (`src/lib/negative-list.ts`) + quality gate FR-APP-01/FR-SEO-01
  (`src/lib/quality-gate.ts`) + cek cepat: `npm run check:negative`.
- Halaman legal nyata: Privasi (UU PDP), Ketentuan, DMCA, Disclaimer, Tentang, Kontak.
- SEO teknis PRD 12.1: metadata + canonical + hreflang id-ID, sitemap tersegmentasi
  (statis/kategori/aplikasi/panduan/tools), robots.txt, JSON-LD WebSite (rating tidak dikarang),
  404 Bahasa Indonesia, header keamanan dasar.

## Menjalankan
```
npm install
npm run dev        # http://localhost:3000
npm run build      # build produksi (sudah diverifikasi)
```

## Sebelum live (tugas Ahmad)
1. Pilih nama brand + domain final, lalu ganti HANYA di `src/lib/site.ts` + `.env.local`
   (NEXT_PUBLIC_SITE_URL) + buat mailbox kontak@ dan dmca@ di domain itu.
2. Deploy: impor folder ini ke Vercel (framework Next.js terdeteksi otomatis). Domain ditempel di Vercel.
3. Fase 3 baru butuh database: isi DATABASE_URL (Supabase/Neon), lalu `npm run db:generate && npm run db:push`.

## Berikutnya
Fase 1: template halaman aplikasi penuh + 10 aplikasi pilar + panduan APK Hijau/Ijo + 3 panduan keamanan.
Fase 2: Tool Pengunduh TikTok (FR-TOOL-01 s.d. 05).

## Catatan verifikasi (18 Okt 2026)
- `npm run build` lulus: 42 halaman statis, First Load JS 103-107 KB (di bawah anggaran PRD 150 KB).
- Server produksi lokal diuji: 20 URL utama semua HTTP 200 (beranda, 10 kategori, halaman aplikasi
  fondasi, 6 halaman legal, keamanan, tools, robots, 5 sitemap tersegmentasi).
- Sitemap: tidak memakai /sitemap.xml tunggal - robots.txt menunjuk langsung ke 5 sitemap
  tersegmentasi (/sitemap/statis.xml, kategori, aplikasi, panduan, tools). Kirim kelimanya ke
  Google Search Console setelah domain final aktif.
- Halaman aplikasi fondasi sengaja `noindex` sampai konten Fase 1 lolos quality gate; beranda `index`.
- Cek daftar negatif: `npm run check:negative` lulus; tidak ada rute/halaman untuk istilah terlarang.
