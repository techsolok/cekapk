# Deploy CekAPK — langkah demi langkah (brand diputuskan 27 Okt 2026)

Brand final: **CekAPK** · domain utama **cekapk.com** · **cekapk.id** didaftarkan
defensif di hari yang sama. ZIP deploy: `ID-APK-Hub-CekAPK-Deploy.zip` — brand dan
domain sudah tertanam (site.ts + .env.local berisi NEXT_PUBLIC_SITE_URL).
Jangan pakai ZIP Fase 0–5 lama untuk deploy: URL-nya masih placeholder.

## Langkah 1 — Beli domain (lakukan dulu, sebelum server)

1. Di registrar pilihanmu (mis. Niagahoster, Rumahweb, DomaiNesia, Qwords —
   semuanya menjual .com dan .id), cari **cekapk.com**. RDAP terakhir dicek
   27 Okt 2026: belum terdaftar, tapi keranjang registrar adalah cek final.
2. Di keranjang, periksa **harga perpanjangan** (renewal), bukan cuma harga promo
   tahun pertama. Perkiraan pasar saat ini: .com Rp 110–250rb/tahun, .id
   Rp 210–350rb/tahun — angka pastinya yang tampil di keranjang.
3. Selesaikan pembelian cekapk.com, lalu di transaksi yang sama beli **cekapk.id**
   sebagai pelindung nama (arahkan saja ke cekapk.com; tidak perlu situs kedua).
4. Aktifkan **auto-renew** dan kunci transfer (transfer lock) untuk keduanya, dan
   catat tanggal perpanjangan di kalendermu. Domain yang lupa diperpanjang =
   situs mati + nama bisa direbut orang.
5. Buat dua mailbox di domain: **kontak@cekapk.com** dan **dmca@cekapk.com**
   (sudah tertulis di halaman Kontak/DMCA situs — mailbox-nya harus benar-benar
   ada dan dibaca).

## Langkah 2 — Siapkan VPS (satu server menjalankan semuanya)

Spesifikasi minimum yang masuk akal: **2 vCPU, 4 GB RAM, 40 GB SSD** (contoh:
Hetzner CX23, DigitalOcean Basic, atau VPS lokal). Kenapa VPS, bukan hosting
biasa/serverless: tool situs menjalankan proses anak (yt-dlp dan tesseract) —
itu tidak jalan di serverless murni.

Di VPS (Ubuntu 24.04):

```
# Node.js 20+, PostgreSQL 16, Meilisearch, yt-dlp, tesseract
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs
sudo apt install -y postgresql tesseract-ocr tesseract-ocr-ind
pip install yt-dlp            # atau: sudo apt install yt-dlp
curl -L https://install.meilisearch.com | sh
```

## Langkah 3 — Upload proyek dan pasang environment

```
unzip ID-APK-Hub-CekAPK-Deploy.zip -d cekapk && cd cekapk
npm install
```

Buat database dan user Postgres, lalu atur environment di server (nilai ini
mengalahkan .env.local yang ikut di ZIP — JANGAN taruh rahasia di .env.local):

```
export DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/idapk
export MEILI_HOST=http://127.0.0.1:7700
export MEILI_API_KEY=MASTER-KEY-MEILISEARCH
export TOOL_TOKEN_SECRET=string-acak-minimal-32-karakter
export VT_API_KEY=kunci-virustotal-gratis
export YTDLP_BIN=            # kosong bila yt-dlp sudah di PATH
export LIBRARY_STORAGE_DIR=/var/lib/cekapk-library
export ADMIN_EMAIL=admin@cekapk.com
export ADMIN_PASSWORD=kata-sandi-admin-yang-kuat
# NEXT_PUBLIC_SITE_URL sudah ada di .env.local (= https://cekapk.com); jangan diubah.
```

Jalankan Meilisearch sebagai service (buat folder datanya sendiri), lalu:

```
npm run db:migrate
npm run db:seed
npm run search:index
npm run build
```

`build` harus lolos tanpa error — ini membuktikan domain tertanam benar.

## Langkah 4 — Jalankan + HTTPS + DNS

1. Jalankan situs terus-menerus dengan PM2:
   `npm install -g pm2 && pm2 start npm --name cekapk -- start && pm2 save`
   (pastikan `PORT` sesuai dengan yang diproksi di bawah, default Next 3000).
2. Pasang Caddy (paling mudah — HTTPS otomatis) atau Nginx + certbot, memproksi
   `https://cekapk.com` → `localhost:3000`.
3. Di panel DNS registrar: arahkan **A record @ → IP VPS**, dan **www → @**
   (atau CNAME www → cekapk.com). Tunggu propagasi (biasanya menit–jam).
4. Uji dari browser HP: https://cekapk.com harus terbuka dengan gembok, dan
   http:// harus dialihkan ke https://.

## Langkah 5 — Daftarkan ke Google Search Console

1. Verifikasi kepemilikan cekapk.com di Search Console (via DNS TXT).
2. Kirim **7 segmen sitemap** ini (BUKAN satu /sitemap.xml — desain proyek
   memang memakai segmen; robots.txt sudah mencantumkan ketujuhnya):
   - https://cekapk.com/sitemap/statis.xml
   - https://cekapk.com/sitemap/kategori.xml
   - https://cekapk.com/sitemap/aplikasi.xml
   - https://cekapk.com/sitemap/panduan.xml
   - https://cekapk.com/sitemap/tools.xml
   - https://cekapk.com/sitemap/bandingkan.xml
   - https://cekapk.com/sitemap/en.xml
3. Pantau menu Coverage 4 minggu pertama: jumlah terindeks per segmen.

## Langkah 6 — Smoke test live (WAJIB sebelum diumumkan)

Dua hal ini tidak pernah bisa dibuktikan dari sandbox — buktikan di sini:

1. **Tool TikTok:** unduh video publik asli, cek MP4-nya bisa diputar — dan cek
   **opsi audio/MP3** secara khusus (di sandbox host audio-nya macet).
2. **Tool Instagram:** unduh satu Reel publik asli.
3. **Pemeriksa Izin:** unggah tangkapan layar izin dari HP Android asli.
4. **Perpustakaan:** unggah satu APK open-source asli (mis. dari F-Droid) dengan
   fingerprint resmi → pipeline → skor → terbit → unduh → hash cocok.
5. **Admin:** login di https://cekapk.com/admin, buat satu draf uji, pastikan
   publish tertahan quality gate bila konten tipis.
6. **Mode gelap + PWA:** buka di HP Android, cek tombol install muncul.
7. **Mode pemeliharaan (opsional, sebentar saja):** set MAINTENANCE_MODE=1 →
   publik 503, /admin tetap bisa dibuka → kembalikan ke kosong.

## Setelah live — rutinitas

- Perbarui yt-dlp minimal 2x sebulan (TikTok/Instagram sering berubah).
- Cek antrean verifikasi /admin tiap minggu (halaman > 90 hari).
- Hash library dicek ulang berkala; laporan transparansi diperbarui per triwulan.
- Backup database harian terenkripsi, retensi 30 hari, satu kali uji restore.
- Perpanjang domain JAUH sebelum jatuh tempo (auto-renew aktif, tapi tetap dicek).
