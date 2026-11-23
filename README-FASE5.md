# ID APK Hub - Fase 5 (Skala, Bahasa & Kematangan) SELESAI - 20 Okt 2026
## Fase terakhir dari Fase-Build-Prompt-Pack. Di atas Fase 0-4.

## 1) Multi-bahasa (FR-I18N-01): edisi Inggris editorial, BUKAN terjemahan mesin
- 20 halaman teratas kini punya pasangan /en: 11 aplikasi pilar + 5 panduan + hub /en
  + /en/tools (tool TikTok berjalan penuh; dua tool lain dijelaskan jujur masih berbahasa
  Indonesia). Konten Inggris DITULIS editorial (514-556 kata/aplikasi, 508-516 kata/panduan),
  konsisten dengan fakta halaman Indonesianya, tanpa angka karangan.
- Kucing APK tetap info-only dalam bahasa Inggris; Minecraft dinyatakan berbayar secara
  gamblang; panduan APK Hijau/Ijo menjelaskan slang Indonesianya untuk pembaca global.
- hreflang id-ID <-> en-US + x-default terpasang dua arah (terverifikasi di HTML halaman
  Indonesia). Segmen sitemap ke-7: /sitemap/en.xml. Generator programmatic tetap khusus
  Bahasa Indonesia - halaman EN tidak pernah dibuat mesin.

## 2) Tool 3: Pemeriksa Izin dari tangkapan layar
- /tools/pemeriksa-izin: unggah screenshot daftar izin -> OCR tesseract (ind+eng) di server
  -> dicocokkan ke kamus 20 izin (frasa Play Store/Pengaturan id+en) -> laporan per izin:
  tingkat risiko, penjelasan awam, saran konkret + peringatan kombinasi berbahaya
  (SMS = jalur OTP; instal-aplikasi-lain; overlay+aksesibilitas).
- Gambar hanya berkas sementara selama OCR (detik), lalu dihapus; hanya metadata anonim
  yang dicatat. Terverifikasi ujung ke ujung: screenshot uji 9 izin -> 9/9 terdeteksi
  (6 tinggi, 2 sedang, 1 rendah) lewat API nyata. Batas jujur: izin yang tidak terlihat
  di tangkapan tidak bisa terbaca - tool ini alat bantu, bukan pengganti cek manual.
- Sekalian diperbaiki: hub /tools yang sebelumnya masih stub Fase 0 kini hub beneran
  dengan 3 tool dan bisa diindeks.

## 3) /keamanan menjadi hub skor & kesegaran (FR-SEC-01)
- Daftar skor keamanan file library terbit (dari database; status jujur "belum ada file
  terbit" + kandidat antre bila kosong), daftar 10 halaman paling baru dicek + 5 paling
  lama tidak dicek dengan usia hari, pintasan Pemeriksa Izin, dan panduan seperti semula.
- FR-TRUST-01: setiap halaman aplikasi kini menampilkan "Terakhir dicek editor: tanggal
  (N hari lalu)" + lencana "perlu cek ulang" setelah 90 hari.

## 4) RSS panduan (FR-GUIDE-04) + Laporan Transparansi (FR-TRUST-02)
- /panduan/feed.xml: RSS 2.0 valid, 5 item panduan, tanggal dari verifiedAt; tautan RSS
  tampil di hub panduan.
- /transparansi: angka langsung dari database (file terbit/draf/ditahan, laporan per
  jenis + status), metodologi verifikasi, kebijakan anti-angka-karangan, dan daftar
  negatif permanen - angka nol ditampilkan apa adanya.

## 5) Kematangan operasional (FR-MNT-01)
- Rate limit tool dipindah ke store bersama: Redis via REST Upstash bila
  UPSTASH_REDIS_REST_URL/TOKEN diatur (wajib untuk produksi multi-instans), fallback
  memori lokal dengan peringatan log. Semantik sama: limit info/menit, unduhan 30/jam,
  tantangan setelah 2 strikes.
- Mode pemeliharaan: MAINTENANCE_MODE=1 -> publik 503 dengan pesan Bahasa Indonesia
  + Retry-After; /admin dan API admin tetap hidup. Terverifikasi di server lokal.
- PRODUCTION-CHECKLIST.md: urutan deploy lengkap - keputusan domain (satu berkas
  site.ts), pola hosting yang jujur (tool butuh proses anak: VPS dianjurkan, bukan
  serverless murni), env wajib, inisialisasi data, smoke test pasca-deploy (termasuk
  cek audio TikTok + ekstraksi Instagram live dari IP produksi - dua hal yang tidak
  bisa dibuktikan dari sandbox), GSC 7 segmen, dan rutinitas setelah live.

## Verifikasi akhir
- verify:fase1, fase3, fase4, fase5: SEMUA LOLOS.
- Build produksi: 115 halaman statis (95 + tepat 20 halaman EN), First Load JS 103 KB.
- Server lokal (DB + Meilisearch 58 dokumen): semua rute Fase 5 menjawab 200, RSS 5 item,
  sitemap EN berisi 11 aplikasi, OCR API 9/9, mode pemeliharaan 503/200 sesuai desain.

## Status proyek setelah Fase 5
Seluruh Fase-Build-Prompt-Pack (0-5) SELESAI. Yang tersisa bukan lagi pembangunan,
melainkan keputusan dan tindakan Ahmad: (1) pilih domain final, (2) deploy mengikuti
PRODUCTION-CHECKLIST.md, (3) kirim 7 sitemap ke GSC dari akunnya, (4) smoke test live
untuk audio TikTok, ekstraksi Instagram, dan unggahan library F-Droid pertama,
(5) setelah live: pembaruan yt-dlp berkala + antrean cek ulang mingguan di /admin.
