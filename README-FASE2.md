# ID APK Hub - Fase 2 (Tool Pengunduh TikTok) SELESAI - 18 Okt 2026

Di atas Fase 0 + Fase 1. Mengacu Fase-Build-Prompt-Pack Prompt 2 dan PRD FR-TOOL-01 s.d. 05.

## Yang dibangun
- Halaman tool PENUH di /tools/pengunduh-tiktok (bukan landing tipis): tool di ToolShell +
  ~1.169 kata konten (cara HP, cara PC, penjelasan tanpa watermark yang jujur, keamanan &
  privasi, alternatif resmi, masalah umum & solusi, FAQ 6) + schema FAQ & breadcrumb.
- Backend (App Router API):
  - POST /api/tools/tiktok/info - validasi link (domain TikTok resmi + format video/foto +
    link pendek vt/vm yang diikuti arahannya), pratinjau dari oEmbed RESMI TikTok (judul,
    kreator, thumbnail), ekstraksi media dari data publik halaman video.
  - GET /api/tools/tiktok/download?t=<token> - proxy streaming. Token bertanda tangan HMAC,
    berlaku 10 menit, hanya berisi REFERENSI SESI - bukan URL media.
  - POST /api/tools/tiktok/event - event tool_start anonim (PRD 16). Sukses/gagal/unduhan
    dicatat server sebagai metadata anonim (hash ID video 10 karakter, jenis error, durasi) -
    URL lengkap pengguna TIDAK pernah masuk log (FR-TOOL-02).
- Penemuan teknis penting: CDN TikTok menolak (403) semua permintaan media tanpa cookie
  sesi dari pengambilan halaman video. Karena itu server menyimpan sesi singkat 10 menit
  di memori (cookie + peta media + URL halaman sebagai Referer) dan mengunduh memakai sesi
  itu. Tidak ada file yang ditulis ke disk - diverifikasi 0 berkas media di proyek.
- Pilihan unduhan = hanya yang disediakan sumber publik video itu: Tanpa Watermark (alamat
  downloadAddr resmi TikTok), Standar (playAddr), Audio (music.playUrl) bila ada.
- Rate limit per IP: info 12/menit, unduhan 30/jam; setelah 2 kali kena batas dalam 10
  menit, tantangan hitungan ringan terbit (token bertanda tangan, berlaku 5 menit).
- Pesan error Bahasa Indonesia per kasus + status pemrosesan jujur (teks berubah setelah
  1 detik, bukan spinner tanpa akhir) sesuai PRD 11.

## Verifikasi yang BENAR-BENAR dijalankan (server produksi lokal)
1. Link publik valid -> info OK (kreator + thumbnail + 3 pilihan), unduhan video tanpa
   watermark HTTP 200, 882.494 byte MP4 asli (header ftyp terverifikasi), <1 detik.
2. Teks acak -> HTTP 400 link_tidak_valid dengan pesan perbaikan.
3. ID video tidak ada/dihapus -> HTTP 404 tidak_ditemukan (jalur yang sama untuk privat).
4. Token palsu/kedaluwarsa -> HTTP 410.
5. Burst 16 permintaan -> 12 diproses, lalu 429 terlalu_sering, lalu tantangan terbit. LOLOS.
6. 0 berkas media tersimpan di proyek; log hanya berisi hash anonim.
7. Build lolos; rute API dinamis; halaman tool 109 KB First Load (anggaran 150 KB).

## Batasan jujur (jangan dihapus)
- AUDIO belum terverifikasi end-to-end dari jaringan sandbox ini: host CDN audio
  (v16m.tiktokcdn-us.com) menggantung untuk fetch Node >90 detik (permintaan Python dengan
  cookie sempat 200 tetapi berkasnya video/mp4 kecil, tidak konsisten). Unduhan audio kini
  dibatasi timeout 20 detik + 1 ulangan dan gagal dengan 502 + penjelasan jujur, bukan
  menggantung. Video - fungsi inti tool - terverifikasi penuh. Cek ulang audio setelah
  deploy di jaringan produksi (Vercel) sebelum mempromosikannya.
- Ekstraksi bergantung pada struktur data publik halaman TikTok; TikTok bisa mengubahnya
  sewaktu-waktu (sama seperti downloader mana pun). Kegagalan terklasifikasi dan berpesan
  jujur, bukan diam.
- Sesi unduhan hidup di memori server: restart server mengakhiri sesi aktif (pengguna
  cukup memproses ulang link - pesan 410 menjelaskannya).
- WAJIB di produksi: set TOOL_TOKEN_SECRET (lihat .env.example) dan, untuk rate limit
  lintas-instance, pindahkan penghitung ke Redis/Upstash pada Fase 5 (sekarang in-memory
  per instance, cukup untuk peluncuran).

## Berikutnya
Fase 3: ekspansi katalog ke 50 aplikasi + database (Drizzle push + Supabase/Neon) +
Meilisearch menggantikan pencarian lokal + admin login penuh.
