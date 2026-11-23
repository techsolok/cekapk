# ID APK Hub - Fase 1 (Konten & Template) SELESAI - 18 Okt 2026

Di atas fondasi Fase 0. Nama brand tetap placeholder "ID APK Hub" (satu file: src/lib/site.ts).

## Isi Fase 1 (sesuai Fase-Build-Prompt-Pack Prompt 1 + PRD 7.1, 7.2, 7.5, 12.2, 12.3)
- Template halaman aplikasi PENUH dengan urutan baku PRD 7.2: badge status legal -> FactBox ->
  Skor Keamanan -> tombol sumber resmi -> deskripsi -> tangkapan layar (dilabeli ilustrasi) ->
  izin dalam bahasa awam -> cara instal resmi -> kelebihan/kekurangan -> catatan versi ->
  alternatif legal -> FAQ 5-8 -> aplikasi terkait. Schema: Breadcrumb + FAQ + SoftwareApplication
  (tanpa rating karangan).
- 10 aplikasi pilar (dari prompt pack) + 1 halaman info-only:
  TikTok 1.144 kata, CapCut 1.100, WhatsApp 1.057, Instagram 1.016, Telegram 1.026,
  YouTube 1.010, Spotify 950, Canva 986, Bstation 933, Minecraft 1.022 (INFO berbayar, tombol
  Play Store, trial resmi - tanpa unduhan bajakan), Kucing APK 1.103 (info_only, TANPA tombol
  unduh dan tanpa satu pun tautan unduh - mengarah ke Bstation & alternatif legal).
- 5 panduan: Apa Itu APK Hijau (806 kata), Apa Itu APK Ijo (719), Cara Instal APK Aman (711,
  6 langkah), Cara Cek Izin Aplikasi (781, 5 langkah), Cara Mengenali APK Palsu (759) -
  tampil di /panduan/[slug] + hub /panduan dan /keamanan, dengan schema FAQ.
- Homepage penuh: pencarian, strip tren, kategori, semua pilar, panduan terbaru, FAQ.
  Hub /aplikasi dan halaman kategori kini berisi daftar aplikasi nyata per kategori.
  Sitemap aplikasi & panduan kini berisi URL konten nyata (11 aplikasi + 5 panduan).
- Admin fondasi /admin (noindex): tabel status semua konten dengan jumlah kata + hasil
  quality gate live, antrean verifikasi (verified_at >90 hari - saat ini kosong), dan demo
  editor di mana tombol Terbit BENAR-BENAR terkunci oleh quality gate + daftar negatif.
  Login + database menyusul Fase 3 sesuai prompt pack.
- Komponen design system yang kurang di Fase 0 kini lengkap: FactBox, RelatedApps,
  DownloadInterstitial, ToolShell.

## Keputusan jujur yang diambil
- Nomor versi persis TIDAK dicetak: halaman menampilkan "versi resmi terbaru dari Play Store"
  + tanggal cek (verified_at 2026-10-18), karena nomor versi berubah tiap rilis dan berbeda
  per perangkat. Mencetak angka karangan melanggar aturan E-E-A-T PRD sendiri.
- Skor keamanan angka tidak diberikan ke aplikasi yang tidak kami host: komponen menampilkan
  status belum diverifikasi + penilaian kualitatif di bagian keamanan. Skor angka datang
  bersama pipeline verifikasi Fase 4 untuk file Library Legal.
- Mode gelap mengikuti Prompt 4 di prompt pack (Fase 4 bersama PWA), bukan fase ini.

## Verifikasi (semua dijalankan, bukan centang kosong)
- `npm run verify:fase1` (scripts/verify-fase1.ts): SEMUA LOLOS - gate memblokir draf <600
  kata / status legal kosong / istilah daftar negatif; 11 pilar 933-1.144 kata; FAQ 6 per
  aplikasi; info_only tanpa tombol; Minecraft berlabel berbayar; 5 panduan 711-806 kata.
- `npm run build`: 50 halaman statis, First Load JS 103 KB (anggaran PRD: <=150 KB).
- Server produksi lokal: 26 URL diuji, semua HTTP 200. Kucing APK: 0 tautan play.google.com
  + peringatan tanpa tombol unduh tampil. TikTok: index,follow + schema FAQ + tombol resmi.
  Sitemap aplikasi berisi tepat 11 URL pilar.

## Berikutnya
Fase 2: Tool Pengunduh TikTok (FR-TOOL-01 s.d. 05) di /tools/pengunduh-tiktok/ +
konten SEO tool 1.000+ kata + rate limit + 4 uji kasus error.
