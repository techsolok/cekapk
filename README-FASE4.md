# ID APK Hub - Fase 4 (Konten Mendalam + Library Legal + PWA) SELESAI - 20 Okt 2026

Di atas Fase 0-3. Mengacu Prompt 4 + PRD 7.4, 12.4, 14, FR-DL-01..03, FR-CMP-01.

## 1) Library APK Legal + pipeline verifikasi §14 (NYATA, teruji)
- Tabel baru library_files (migrasi 0002). Admin mengunggah file lewat panel admin
  (multipart) -> file disimpan di storage server (LIBRARY_STORAGE_DIR) -> pipeline berjalan:
  1. SHA-256 dihitung; 2. struktur APK diperiksa dari central directory ZIP (manifest + dex +
  blok tanda tangan wajib, APK-di-dalam-APK ditolak); 3. fingerprint sertifikat penanda tangan
  DIEKSTRAK dari blok PKCS#7 dan dicocokkan dengan fingerprint resmi yang didaftarkan admin;
  4. pemindaian VirusTotal (hash lookup) bila VT_API_KEY diatur - TANPA kunci ini langkah scan
  GAGAL BY DESIGN sehingga tidak ada file yang bisa terbit tanpa scan bersih; 5. audit izin
  (izin berbahaya wajib penjelasan awam >= 20 karakter).
- Skor keamanan 14.2 (sumber 30/25 + tanda tangan 25 + scan 25 + izin 20/16) hanya terhitung
  bila SEMUA langkah lolos. Terbit butuh juga review manual Admin + hash berkas di storage
  diverifikasi ulang pada saat klik Terbit; berkas yang berubah -> unduhan 409 dan file ditahan.
- Uji nyata yang dijalankan: APK uji dibuat dengan openssl (sertifikat + PKCS#7 asli) -
  fingerprint yang diekstrak pipeline SAMA PERSIS dengan fingerprint openssl; unggah via API
  admin menghasilkan 4/5 langkah lolos dan publish ditolak 422 persis karena scan; rekam
  lolos-penuh (hasil scan bersih) terbit dengan skor 96, halaman interstitial tampil, unduh
  tanpa persetujuan 403, unduh resmi 200 dengan byte IDENTIK hash-nya, berkas dirusak ->
  unduh 409. Semua data uji sudah dibersihkan dari database lokal.
- Publik: /perpustakaan menampilkan file published + 5 kandidat open-source nyata
  (F-Droid, NewPipe, AntennaPod, KeePassDX, Organic Maps) yang selalu menautkan ke F-Droid
  sampai file mereka lolos pipeline di sini. Interstitial per file (FR-DL-01): hash penuh,
  versi, ukuran, hasil scan, daftar izin berpenjelasan, SATU tombol "Saya Mengerti, Lanjut
  Unduh", tanpa countdown dan tanpa tombol palsu. Laporan per file (FR-DL-03) masuk tabel
  reports. File TIDAK di-host untuk aplikasi non-open-source: katalog 50 tetap tautan resmi.

## 2) Tool 2: Pengunduh Instagram (pola Insta Grab)
- /tools/pengunduh-instagram: halaman penuh + FAQ schema, ekstraksi yt-dlp (proses anak,
  YTDLP_BIN), token unduhan bertanda tangan 10 menit, proxy streaming tanpa menyimpan file,
  rate limit + tantangan berbagi infrastruktur dengan tool TikTok, host media dibatasi ke
  domain Instagram/Facebook CDN (token host asing -> 403, token rusak -> 410).
- Kasus terverifikasi di server lokal: teks acak -> 400 ditolak; URL Instagram berkode palsu
  -> 422 "sumber tidak terjangkau". BATAS JUJUR: Instagram TIDAK terjangkau dari jaringan
  sandbox ini (sama seperti saat Insta Grab dibangun), jadi ekstraksi live yang sukses tidak
  bisa ditunjukkan dari sini - klasifikasinya bekerja jujur dan harus dicek ulang setelah
  deploy (IP server produksi sering dibatasi Instagram; jaga yt-dlp selalu diperbarui).

## 3) Perbandingan pertama (FR-CMP-01)
- /bandingkan/whatsapp-vs-telegram: tabel 12 aspek dengan pemenang per aspek, dua kartu
  "pilih bila", kesimpulan editor, 5 FAQ + schema, tautan dua arah ke halaman aplikasinya.
  Juga tersimpan di tabel comparisons saat seed. Segmen sitemap baru: /sitemap/bandingkan.xml
  (robots kini mencantumkan 6 segmen).
- Cari juga menemukan tool baru: dokumen pencarian kini 57 (50 aplikasi + 5 panduan + 2 tool).

## 4) PWA + mode gelap
- Manifest (nama/ikon/warna dari identitas situs), ikon 192/512 hasil gambar program,
  service worker: cache aset statis + halaman yang pernah dibuka, JANGAN PERNAH cache /api,
  /admin, atau unduhan; fallback /offline. Terdaftar hanya di production build.
- Mode gelap: warna permukaan (ink/paper/mist/primary-soft/primary-dark) kini variabel CSS;
  kelas .dark membaliknya di seluruh situs sekaligus. Toggle 🌙/☀️ di header, pilihan disimpan
  di localStorage, skrip kecil di <head> mencegah kedip tema saat muat. Permukaan peringatan
  (amber/merah) disesuaikan agar tetap terbaca di mode gelap.

## Verifikasi akhir
- verify:fase1, verify:fase3, verify:fase4: SEMUA LOLOS.
- Build produksi: 95 halaman statis, First Load JS 103 KB.
- Server lokal dengan DB + Meilisearch: semua rute Fase 4 menjawab 200 (perpustakaan,
  bandingkan + detailnya, offline, manifest, sw.js, ikon, tool IG).

## Yang dibutuhkan di produksi
DATABASE_URL, MEILI_HOST + MEILI_API_KEY, TOOL_TOKEN_SECRET, VT_API_KEY (wajib untuk
library), YTDLP_BIN/yt-dlp terpasang + diperbarui berkala, LIBRARY_STORAGE_DIR persisten,
ADMIN_* untuk seed. GSC tetap menunggu pilihan domain final Ahmad.

## Berikutnya
Fase 5: Tool 3 (Pemeriksa Izin dari tangkapan layar), multi-bahasa id/en untuk 20 halaman
teratas, halaman /keamanan jadi hub skor, panduan RSS, pemindahan rate limit tool ke Redis,
indikator last-checked, laporan transparansi triwulan, checklist deploy produksi.
