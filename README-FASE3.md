# ID APK Hub - Fase 3 (Skala Terkendali) SELESAI - 20 Okt 2026

Di atas Fase 0-2. Mengacu Fase-Build-Prompt-Pack Prompt 3 + PRD 7.1/7.5, 12.3, 12.5, FR-ADM-01/04.

## 1) Katalog: 11 -> 50 aplikasi terbit
- 20 entitas sisa workbook dibangun PERTAMA (Roblox, Mobile Legends, Free Fire, PUBG Mobile,
  Genshin Impact, Google Chrome, KineMaster, Alight Motion, PicsArt, Lightroom, Crunchyroll,
  Vidio, iQIYI, Netflix, Shopee, Tokopedia, Google Drive) dengan KEUANGAN TERAKHIR sesuai
  rencana: DANA, OVO, GoPay.
- Workbook hanya berisi 30 entitas aplikasi, jadi untuk mencapai 50 ditambah 19 aplikasi resmi
  populer Indonesia: Facebook, Messenger, Discord, Snapchat, Zoom, Google Maps, Google Foto,
  Gmail, Google Terjemahan, Duolingo, Ruangguru, Grab, Gojek, Traveloka, Lazada, Pinterest,
  Microsoft Word, Google Meet, WhatsApp Business.
- Semua halaman memakai template penuh Fase 1, 950-1.150 kata per halaman ekspansi, tombol
  hanya ke pencarian resmi Play Store, tanpa nomor versi/rating/ukuran karangan.
- Halaman keuangan (DANA/OVO/GoPay) menampilkan PERINGATAN APK PALSU di atas fold (sebelum
  kotak fakta & tombol): hanya Play Store, bank/e-wallet tidak pernah mengirim APK via chat,
  jangan bagikan PIN/OTP. Terverifikasi tampil di halaman DANA.

## 2) Database (PostgreSQL + Drizzle) - aktif dan terisi
- Skema diperluas: apps.status (draft|review|published), apps.source (editorial|programmatic),
  apps.content (JSON konten penuh), tabel admin_sessions (hanya HASH token sesi).
  Migrasi ter-generate di folder drizzle/ (0000 + 0001 perbaikan tipe kolom).
- Perintah: npm run db:migrate lalu npm run db:seed.
- Seed terverifikasi di PostgreSQL 16 lokal: 10 kategori, 50 aplikasi published + konten
  JSON, 5 panduan, 1 tool, 1.200 keyword live (24 pola PRD 12.3 x 50 aplikasi), 6 keyword
  excluded (daftar negatif), 1 akun admin. Seed idempoten (dijalankan ulang, hitungan tetap).

## 3) Admin login penuh (FR-ADM-01)
- /admin sekarang DILINDUNGI: tanpa sesi -> diarahkan ke /admin/login (terverifikasi 307).
- Kata sandi di-hash scrypt (tidak pernah disimpan/dikirim mentah), sesi = token acak 32 byte
  yang hanya hash SHA-256-nya ada di database, cookie httpOnly + SameSite=Lax, 7 hari.
- Rate limit login per IP (terverifikasi aktif setelah percobaan berulang -> 429).
- 2FA TOTP untuk Admin bila ADMIN_TOTP_SECRET diatur saat seed: terverifikasi end-to-end
  (tanpa kode -> diminta kode; kode benar -> masuk; sesi tercatat di admin_sessions).
- Akun dibuat HANYA lewat seed (env ADMIN_EMAIL + ADMIN_PASSWORD). Tidak ada pendaftaran publik.
- Peran: editor boleh membuat draf; menerbitkan hanya Admin.

## 4) Generator programmatic yang tidak bisa auto-publish (FR-ADM-04)
- Panel admin (setelah masuk) punya Generator Draf: data terstruktur -> DRAF di database.
- Daftar negatif memblokir total - nama judi ditolak bahkan sebagai draf (terverifikasi).
- Tombol Terbit memeriksa ulang quality gate DI SERVER: draf tipis uji (8 kata) ditolak 422
  dengan daftar kesalahan (terverifikasi). Draf tidak muncul di pencarian maupun sitemap.

## 5) Pencarian Meilisearch (FR-HOME-02)
- Index "konten": 56 dokumen (50 aplikasi + 5 panduan + 1 tool) berisi nama, alias Indonesia,
  developer, kategori, tagline. Perintah: npm run search:index (butuh MEILI_HOST/MEILI_API_KEY).
- SearchBox sekarang memanggil /api/search (debounce 200 ms, maks 8, navigasi keyboard).
  Server memakai Meilisearch bila dikonfigurasi, fallback lokal + tabel alias bila tidak.
- Terverifikasi di Meilisearch 1.15.2 lokal: typo "whatsap" -> WhatsApp pertama;
  frasa alias "dompet digital" -> DANA pertama; API situs melaporkan source: "meilisearch".

## Verifikasi lain yang dijalankan
- npm run verify:fase3: SEMUA LOLOS (50 unik, semua >=600 kata + gate, nol daftar negatif,
  urutan workbook + keuangan terakhir, generator rules).
- npm run verify:fase1: tetap SEMUA LOLOS (tidak ada regresi).
- Build produksi: 89 halaman statis, First Load JS 103 KB (anggaran 150 KB).
- Server produksi lokal dengan DATABASE_URL + Meilisearch aktif: login salah 401, login
  benar 200, /admin berisi panel generator, halaman Roblox/GoPay/DANA/WhatsApp Business 200,
  sitemap aplikasi tepat 50 URL.

## Belum dilakukan (butuh keputusan/akun Ahmad - bukan kelalaian)
- Google Search Console: pengiriman sitemap membutuhkan domain final + akun GSC Ahmad.
  Lima segmen sitemap sudah siap; setelah domain dipilih, kirim kelimanya dari GSC dan
  pantau indeksasi per cluster (Prompt 3 bagian terakhir memang bergantung domain live).
- Di produksi: atur DATABASE_URL (Neon/Supabase), MEILI_HOST + MEILI_API_KEY (jangan master
  key), TOOL_TOKEN_SECRET, ADMIN_EMAIL + ADMIN_PASSWORD (+ ADMIN_TOTP_SECRET untuk 2FA),
  lalu jalankan db:migrate, db:seed, search:index sekali.
- Catatan lokal: PostgreSQL + Meilisearch diuji di mesin ini dengan data uji yang sudah
  dibersihkan kembali ke kondisi seed (50 published, 0 draf, 1 admin uji lokal).

## Berikutnya
Fase 4: Library APK Legal + pipeline verifikasi 14 (SHA-256, tanda tangan, scan, audit izin,
interstitial FR-DL-01), Tool 2 Pengunduh Instagram (pola Insta Grab), perbandingan pertama
(WhatsApp vs Telegram), PWA + mode gelap.
