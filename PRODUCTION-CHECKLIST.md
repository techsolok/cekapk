# Checklist Deploy Produksi - ID APK Hub (Fase 5)

Urutannya penting: domain dulu (sekali ganti di src/lib/site.ts + NEXT_PUBLIC_SITE_URL),
lalu hosting, lalu layanan pendukung, lalu verifikasi, lalu Search Console.

## 1) Keputusan Ahmad — SUDAH DIPUTUSKAN 27 Okt 2026
- [x] Brand final: **CekAPK**, domain utama **cekapk.com**, cekapk.id defensif.
      (RDAP dicek ulang 27 Okt 2026: keduanya masih belum terdaftar.)
- [x] src/lib/site.ts sudah diubah (nama CekAPK, email kontak@cekapk.com &
      dmca@cekapk.com) + .env.local berisi NEXT_PUBLIC_SITE_URL=https://cekapk.com
      (file ini aman dibagikan: hanya URL publik, tanpa rahasia).
- [ ] BELI domainnya (lihat DEPLOY-CEKAPK.md langkah 1) — cek harga PERPANJANGAN
      di keranjang, bukan cuma promo tahun pertama.
- [ ] Buat mailbox kontak@cekapk.com dan dmca@cekapk.com di domain final.

## 2) Hosting aplikasi
Catatan arsitektur jujur: tool memakai proses anak (yt-dlp, tesseract) dan rate limit
server - itu TIDAK cocok dengan serverless murni. Dua pola yang didukung:
- (Dianjurkan) Satu VPS (Hetzner/DigitalOcean 2 vCPU) menjalankan semuanya dengan
  Docker Compose / PM2 + Caddy (HTTPS otomatis): Next.js, PostgreSQL, Meilisearch.
- Atau: situs di Vercel + layanan tool terpisah di VPS kecil (tambah reverse proxy
  untuk /tools/*/api dan /api/tools/*).
- [ ] Pasang: Node 20+, yt-dlp (perbarui berkala!), tesseract-ocr + tesseract-ocr-ind.
- [ ] LIBRARY_STORAGE_DIR menunjuk volume persisten (bukan folder build).

## 3) Variabel lingkungan (lihat .env.example - semua wajib dicek)
- [ ] DATABASE_URL (Neon/Supabase/VPS Postgres) - SSL aktif.
- [ ] MEILI_HOST + MEILI_API_KEY (BUKAN master key untuk klien; master hanya di server).
- [ ] TOOL_TOKEN_SECRET: acak >= 32 karakter.
- [ ] VT_API_KEY (VirusTotal) - TANPA ini tidak ada file library yang bisa terbit.
- [ ] UPSTASH_REDIS_REST_URL + TOKEN (rate limit multi-instans).
- [ ] YTDLP_BIN / TESSERACT_BIN bila tidak di PATH. MAINTENANCE_MODE kosong (isi 1 hanya saat perlu).

## 4) Inisialisasi data (sekali, dari mesin deploy)
- [ ] ADMIN_EMAIL + ADMIN_PASSWORD kuat (+ ADMIN_TOTP_SECRET untuk 2FA Admin) di env seed.
- [ ] npm run db:migrate && npm run db:seed && npm run search:index
- [ ] Uji login /admin, buat satu draf uji, pastikan publish tertahan gate.

## 5) Verifikasi pasca-deploy (smoke test)
- [ ] Beranda, 3 halaman aplikasi acak, 1 panduan, /en, /bandingkan - semua 200.
- [ ] Tool TikTok dengan video publik asli dari IP produksi (audio dicek di sini -
      di sandbox tidak terverifikasi); tool Instagram dengan Reel publik asli.
- [ ] Pemeriksa Izin dengan tangkapan layar HP asli.
- [ ] Perpustakaan: unggah 1 APK open-source asli (mis. F-Droid) dengan fingerprint
      resmi dari F-Droid -> pipeline -> skor -> terbit -> unduh -> cocokkan hash.
- [ ] Mode gelap + PWA (Lighthouse: installable) di HP Android asli.
- [ ] Uji MAINTENANCE_MODE=1 sebentar: publik 503, /admin tetap masuk.

## 6) Search Console & Analytics
- [ ] Verifikasi domain di Google Search Console; kirim 7 segmen sitemap:
      statis, kategori, aplikasi, panduan, tools, bandingkan, en.
- [ ] Pantau Coverage mingguan 4 minggu pertama (indeks vs terkirim per segmen).
- [ ] (Opsional) Bing Webmaster + analitik ramah privasi (Plausible/Umami).

## 7) Rutinitas setelah live
- [ ] Perbarui yt-dlp minimal 2x sebulan (Instagram/TikTok sering berubah).
- [ ] Cek antrean verifikasi /admin tiap minggu (halaman > 90 hari).
- [ ] Hash library dicek ulang berkala; laporan transparansi diperbarui per triwulan.
- [ ] Backup database harian terenkripsi, retensi 30 hari, satu kali uji restore.
