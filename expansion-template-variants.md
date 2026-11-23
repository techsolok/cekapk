# Expansion Template Variants — Phase 2 (SEO-06)

Content-only draft. **Do not edit source files from this document** — the parent
applies these variants to `src/lib/data/apps-parts/expansion-shared.ts`.

## Source

All shared templates live in one file:
`src/lib/data/apps-parts/expansion-shared.ts`, function `buildExpansionApp`
(lines ~93–137). The 39 expansion apps are records in `expansion-a.ts` (10),
`expansion-b.ts` (10) and `expansion-c.ts` (19); each record carries only
`focus`, `usage`, `workflow`, `caution`, `check`, `features`, `pros`, `cons`,
`faqFocusQ/A`, `extraFaq?` and `alternatives` per app — everything else is
interpolated from the shared templates below.

Placeholders used in every variant (keep them exactly as written):
- `{name}` — app name, e.g. "Roblox"
- `{developer}` — developer name as stored, e.g. "Roblox Corporation"
- `{priceLabel}` — the per-app price label (already app-specific; the
  "gratis" FAQ variants keep it as their first sentence and only vary the
  tail, so no price fact is ever invented or changed here)

## The 9 profile groups (39 apps)

| Group | Apps |
|---|---|
| `game` (5) | Roblox, Mobile Legends, Free Fire, PUBG Mobile, Genshin Impact |
| `social` (6) | Facebook, Messenger, Discord, Snapchat, Google Meet, WhatsApp Business |
| `creator` (6) | KineMaster, Alight Motion, PicsArt, Adobe Lightroom, Google Foto, Pinterest |
| `streaming` (4) | Crunchyroll, Vidio, iQIYI, Netflix |
| `shopping` (3) | Shopee, Tokopedia, Lazada |
| `finance` (3) | DANA, OVO, GoPay |
| `productivity` (4) | Google Drive, Zoom, Gmail, Microsoft Word |
| `education` (3) | Google Terjemahan, Duolingo, Ruangguru |
| `utility` (5) | Google Chrome, Google Maps, Grab, Gojek, Traveloka |

Already group-specific — no work needed: `PROFILE_SAFETY` in
`expansion-shared.ts` already has 9 distinct variants (one per profile),
so `safetyParagraphs[1]` already differs per group. Likewise the
`PERMISSIONS` record is already keyed per profile; identical permission
lists *within* a group are by design (same kind of app, same permissions).
Only the intro lines in §9 below are new for that section.

## How to apply (suggestion for the parent)

Add records keyed by `PermissionProfile` in `expansion-shared.ts`, e.g.
`WORKFLOW_TAIL`, `SAFETY_INTRO`, `FAQ_SAFE`, `FAQ_FREE_TAIL`,
`FAQ_INSTALL_TAIL`, `FAQ_UNAVAILABLE`, `FAQ_ACCOUNT`, and replace the
inline template strings in `buildExpansionApp` with lookups by
`r.permissionProfile`. Keep `{name}`, `{developer}` and `{priceLabel}`
interpolation working. For the gratis FAQ, the variant is the *tail only*:
`{priceLabel}. ` + tail. For the install FAQ, the variant is the *whole*
answer (first sentence intentionally near-identical — the install steps
genuinely are the same for every app; see "Where shared text should stay").

---

## P1 — Workflow paragraph 2

Location: `sections[0]` ("Cara {name} Dipakai Sehari-hari"), second paragraph.

**Original:**
> Dalam praktiknya, pengalaman memakai {name} akan sangat dipengaruhi kualitas jaringan, perangkat, dan pengaturan akunmu. Mulailah dari fitur inti yang benar-benar kamu butuhkan, periksa izin serta biaya tambahannya, lalu aktifkan fitur lanjutan satu per satu. Cara bertahap ini membuatmu lebih mudah mengenali manfaat nyata aplikasi dan tidak menyerahkan data atau uang untuk fitur yang sebenarnya tidak kamu pakai.

### game
> Di game seperti {name}, yang paling terasa bedanya adalah perangkat dan koneksi: frame rate, ping, dan suhu HP menentukan nyaman tidaknya satu pertandingan. Mulailah dari mode santai dan pengaturan grafis menengah, periksa pembelian dalam aplikasi serta izin mikrofon sebelum bermain regu, lalu naikkan pengaturan dan aktifkan fitur lanjutan bila perangkatmu sanggup. Cara bertahap ini membuatmu tahu mana yang benar-benar menambah seru permainan, tanpa mengeluarkan uang atau data untuk fitur yang tidak kamu pakai.

### social
> Di aplikasi sosial seperti {name}, pengalamanmu sangat dipengaruhi pengaturan privasi dan lingkaran pertemananmu, bukan sekadar kecepatan HP. Mulailah dari profil dan daftar teman yang sudah kamu kenal, periksa siapa yang bisa melihat postingan, mengomentari, dan menghubungimu, lalu aktifkan fitur tambahan seperti panggilan video atau grup setelah pengaturan dasar beres. Cara bertahap ini membuatmu lebih mudah menjaga privasi dan tidak membagikan data kepada orang yang sebenarnya tidak kamu kenal.

### creator
> Di aplikasi editor seperti {name}, hasil akhirnya lebih dipengaruhi bahan dan perangkatmu daripada jumlah fitur yang diaktifkan. Mulailah dari proyek sederhana dengan alat inti — potong, susun, dan ekspor — periksa batasan versi gratis seperti watermark dan penyimpanan, lalu coba efek dan aset premium satu per satu. Cara bertahap ini membuatmu tahu alat mana yang benar-benar kamu pakai, tanpa membayar langganan untuk fitur yang hanya dicoba sekali.

### streaming
> Di layanan tontonan seperti {name}, pengalaman menontonmu paling dipengaruhi kecepatan koneksi dan paket yang kamu pakai. Mulailah dari judul gratis dan kualitas otomatis, periksa batasan katalog serta episode yang terkunci langganan, lalu aktifkan unduhan dan profil tambahan bila paketmu mendukung. Cara bertahap ini membuatmu tahu tontonan mana yang layak dibayar, tanpa berlangganan paket yang isinya jarang kamu tonton.

### shopping
> Di aplikasi belanja seperti {name}, pengalamanmu paling dipengaruhi alamat, metode bayar, dan kebiasaan memeriksa toko sebelum checkout. Mulailah dari pencarian dan keranjang, periksa ongkos kirim, kebijakan retur, serta ulasan penjual, lalu aktifkan pembayaran tersimpan dan notifikasi promo setelah kamu yakin dengan tokonya. Cara bertahap ini membuatmu lebih mudah mengenali penjual yang bisa dipercaya dan tidak mengeluarkan uang untuk barang yang sebenarnya tidak kamu butuhkan.

### finance
> Di aplikasi keuangan seperti {name}, yang paling penting bukan banyaknya fitur, melainkan keamanan dan kejelasan biaya setiap transaksi. Mulailah dari fitur inti — cek saldo dan transfer kecil — periksa biaya layanan, batas transaksi, dan pengaturan keamanan akun, lalu aktifkan fitur lanjutan seperti tagihan otomatis setelah kamu paham risikonya. Cara bertahap ini membuatmu lebih mudah mengendalikan uang dan tidak mengaktifkan layanan yang biayanya tidak kamu sadari.

### productivity
> Di aplikasi kerja seperti {name}, manfaatnya paling terasa setelah akun, sinkronisasi, dan berbagi diatur dengan benar. Mulailah dari satu dokumen atau rapat, periksa siapa yang bisa melihat dan mengedit, serta ruang penyimpanan yang tersedia, lalu aktifkan integrasi kalender dan template setelah alur dasarmu berjalan. Cara bertahap ini membuatmu tahu fitur mana yang benar-benar mempercepat pekerjaan, tanpa menyerahkan dokumen kepada orang yang salah.

### education
> Di aplikasi belajar seperti {name}, hasilmu lebih dipengaruhi konsistensi daripada jumlah fitur yang dibuka sekaligus. Mulailah dari satu pelajaran atau kursus, periksa mana materi yang gratis dan mana yang berbayar, lalu aktifkan pengingat dan paket belajar setelah rutinitasmu terbentuk. Cara bertahap ini membuatmu tahu metode mana yang cocok untukmu, tanpa membayar paket yang akhirnya tidak dipakai.

### utility
> Di aplikasi layanan seperti {name}, pengalamanmu paling dipengaruhi lokasi, koneksi, dan ketersediaan layanan di kotamu. Mulailah dari satu pesanan atau pencarian, periksa tarif, estimasi waktu, dan metode bayar, lalu aktifkan langganan atau fitur lanjutan setelah kamu yakin layanannya memang tersedia dan bisa diandalkan di daerahmu. Cara bertahap ini membuatmu tahu layanan mana yang layak dipakai rutin, tanpa membayar biaya yang tidak kamu butuhkan.

---

## P2 — Safety paragraph 1

Location: `safetyParagraphs[0]`.

**Original:**
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas pembaruan dari chat, situs pengumpul APK, atau penjual akun.

### game
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas mod, cheat, atau diamond murah dari chat dan situs pengumpul APK, karena berkas semacam itu adalah cara paling umum akun game dicuri dan perangkat disusupi.

### social
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan memasang versi "tanpa iklan" atau "fitur terbuka" dari chat dan situs pengumpul APK, karena aplikasi tiruan sosial adalah cara paling umum kata sandi dan percakapan dicuri.

### creator
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima editor "premium terbuka" dari chat dan situs pengumpul APK, karena berkas itu bajakan dan sering disisipi pencuri data yang mengintip proyek serta akunmu.

### streaming
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan memasang aplikasi "nonton gratis premium" dari chat dan situs pengumpul APK, karena aplikasi tiruan streaming adalah cara paling umum akun langganan dan data pembayaran dicuri.

### shopping
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas instalasi dari penjual, kurir, atau tautan chat, karena aplikasi belanja tiruan dibuat untuk mencuri data pembayaran dan mengarahkan uangmu ke rekening penipu.

### finance
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; bank dan e-wallet tidak pernah membagikan APK lewat WhatsApp atau chat, dan aplikasi keuangan tiruan adalah cara paling umum saldo dan OTP dicuri.

### productivity
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas instalasi dari tautan email atau chat yang mengaku dari kantor, karena aplikasi kerja tiruan dibuat untuk mengintip dokumen dan kredensial akunmu.

### education
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan memasang aplikasi belajar "paket lengkap gratis" dari chat dan situs pengumpul APK, karena aplikasi tiruan pendidikan sering meminta pembayaran di luar jalur resmi dan mengintip data anak.

### utility
> Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas instalasi dari pengemudi, agen perjalanan, atau tautan chat, karena aplikasi layanan tiruan dibuat untuk mencuri alamat, jadwal perjalanan, dan data pembayaranmu.

---

## P3 — Safety FAQ ("Apakah {name} aman dipasang?")

Location: `faqs[0]`.

**Original:**
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan perlindungan tambahan yang tersedia, dan periksa izin yang tidak sesuai dengan fungsi aplikasi.

### game
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun game setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah bila tersedia, dan jangan pernah membeli mata uang atau item game dari penjual di luar aplikasi resmi.

### social
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun sosial setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah, dan atur privasi profil sejak awal agar postingan dan daftar temanmu tidak terbuka untuk orang asing.

### creator
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun editor setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah bila tersedia, dan periksa lisensi aset sebelum memakai hasil edit untuk keperluan komersial.

### streaming
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun tontonan setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, jangan membagikan akun langganan kepada penjual murah, dan periksa perangkat yang masuk ke akunmu secara berkala.

### shopping
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun belanja setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah dan notifikasi transaksi, dan jangan pernah menyelesaikan pembayaran di luar aplikasi resmi.

### finance
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun keuangan setelah pemasangan tetap tergantung padamu: gunakan PIN dan biometrik, aktifkan verifikasi dua langkah, dan jangan pernah membagikan OTP kepada siapa pun — termasuk yang mengaku dari bank atau layanan.

### productivity
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun kerja setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah, dan periksa dengan teliti alamat email penerima sebelum membagikan dokumen.

### education
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun belajar setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan pengawasan orang tua untuk akun anak, dan periksa pembelian paket sebelum membayar agar tidak ada langganan yang tidak disadari.

### utility
> Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun layanan setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah bila tersedia, dan jangan membagikan tangkapan layar berisi kode pemesanan atau alamat lengkap kepada publik.

---

## P4 — Gratis FAQ ("Apakah {name} gratis?")

Location: `faqs[1]`. The variant is the **tail only** — the answer always
starts with the per-app `{priceLabel}` (already app-specific), followed by
the group tail below. Do not change the price fact itself.

**Original tail (after `{priceLabel}.`):**
> Periksa rincian di Play Store dan di dalam aplikasi sebelum membayar, karena paket, promosi, dan fitur berbayar dapat berubah. Jangan membeli versi 'premium terbuka' dari pihak ketiga; itu bukan cara resmi dan akunmu bisa dibatasi.

### game
> Periksa rincian di Play Store sebelum membeli mata uang atau item dalam game, karena harga dan event dapat berubah. Jangan membeli diamond, Robux, atau skin murah dari penjual pihak ketiga; mata uang dari jalur tidak resmi bisa ditarik dan akunmu bisa dibatasi.

### social
> Periksa rincian di Play Store dan di dalam aplikasi sebelum membayar, karena paket dan promosi dapat berubah. Jangan membeli akun "premium terbuka" dari pihak ketiga; itu bukan cara resmi dan akunmu bisa dibatasi.

### creator
> Periksa rincian di Play Store sebelum berlangganan, karena harga paket dan fitur yang terkunci dapat berubah. Jangan membeli editor "tanpa watermark" dari pihak ketiga; itu bukan cara resmi, berkasnya bajakan, dan akunmu bisa dibatasi.

### streaming
> Periksa rincian paket di Play Store dan di dalam aplikasi sebelum berlangganan, karena harga dan katalog dapat berubah. Jangan membeli akun langganan murah dari penjual pihak ketiga; akun bersama seperti itu sering dicabut dan bisa berasal dari pembayaran curian.

### shopping
> Periksa rincian ongkos kirim dan biaya layanan di dalam aplikasi sebelum checkout, karena tarif dapat berubah per pesanan. Jangan membayar lewat tautan di luar aplikasi; perlindungan pembeli hanya berlaku bila transaksi diselesaikan di dalam platform resmi.

### finance
> Periksa rincian biaya layanan di dalam aplikasi sebelum bertransaksi, karena tarif dapat berubah dan ditampilkan di layar konfirmasi. Jangan membayar "biaya aktivasi" atau "upgrade akun" kepada siapa pun di luar aplikasi; layanan keuangan resmi tidak memungut biaya lewat chat.

### productivity
> Periksa rincian paket di Play Store dan di dalam aplikasi sebelum berlangganan, karena harga dan batas penyimpanan dapat berubah. Jangan membeli lisensi murah dari penjual pihak ketiga; lisensi tidak resmi bisa dicabut dan dokumenmu bisa terkunci.

### education
> Periksa rincian paket di Play Store dan di dalam aplikasi sebelum membayar, karena harga kursus dan langganan dapat berubah. Jangan membeli "paket lengkap seumur hidup" dari penjual pihak ketiga; itu bukan cara resmi dan akun belajar anakmu bisa dibatasi.

### utility
> Periksa rincian tarif dan biaya layanan di dalam aplikasi sebelum memesan, karena harga dapat berubah per pesanan dan per kota. Jangan membayar lewat tautan di luar aplikasi; pembayaran resmi selalu tercatat di riwayat pesananmu di dalam aplikasi.

---

## P5 — Install FAQ ("Bagaimana cara memasang {name} yang benar?")

Location: `faqs[3]`.

**Original:**
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, buka pengaturan izin dan notifikasi sebelum mulai memakai fitur yang meminta data pribadi.

### game
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, aktifkan persetujuan pembelian di Play Store dan atur izin mikrofon serta notifikasi sebelum bermain, terutama bila HP dipakai anak.

### social
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, atur privasi profil dan izin kontak, kamera, serta lokasi sebelum menambahkan teman atau membagikan apa pun.

### creator
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, berikan akses file pada folder yang kamu pilih dan periksa pengaturan ekspor serta watermark sebelum mengedit proyek pertama.

### streaming
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, buat profil, atur batas usia bila ada anak yang menonton, dan periksa kualitas video serta izin unduhan sebelum memutar episode pertama.

### shopping
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, isi alamat kirim dan metode bayar dari dalam aplikasi, lalu periksa izin lokasi dan notifikasi pesanan sebelum belanja pertama.

### finance
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, aktifkan PIN, biometrik, dan notifikasi transaksi di dalam aplikasi sebelum memasukkan saldo atau menghubungkan rekening.

### productivity
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, masuk dengan akun kerjamu, periksa sinkronisasi dan ruang penyimpanan, lalu atur izin kalender serta notifikasi rapat sebelum membuat dokumen pertama.

### education
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, buat profil belajar — untuk anak, gunakan akun yang diawasi orang tua — lalu periksa izin kamera dan mikrofon sebelum memulai kelas pertama.

### utility
> Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, isi alamat dan metode bayar dari dalam aplikasi, lalu periksa izin lokasi dan notifikasi layanan sebelum membuat pesanan pertama.

---

## P6 — Unavailable FAQ ("Kenapa {name} tidak tersedia atau tidak bekerja di HP saya?")

Location: `faqs[4]`.

**Original:**
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### game
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Game berat juga menuntut RAM dan penyimpanan yang cukup, jadi perangkat lama mungkin dinyatakan tidak kompatibel. Bila Play Store menyatakan perangkat tidak didukung, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### social
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Sebagian fitur sosial juga dibatasi menurut usia akun atau wilayah. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### creator
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Aplikasi editor juga membutuhkan ruang penyimpanan dan versi Android yang cukup baru untuk fitur tertentu. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### streaming
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Katalog dan judul tertentu juga dibatasi lisensi per wilayah, jadi tontonan yang ada di satu negara belum tentu ada di negara lain. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### shopping
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Layanan dan penjual tertentu juga hanya melayani daerah tertentu. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### finance
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Layanan keuangan juga dapat menolak perangkat yang di-root atau sistemnya dimodifikasi, demi keamanan transaksi. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### productivity
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Fitur tertentu juga memerlukan akun kerja atau paket organisasi. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### education
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Materi dan kurikulum tertentu juga hanya tersedia untuk wilayah atau jenjang tertentu. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

### utility
> Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Layanan peta, transportasi, dan perjalanan juga hanya beroperasi di kota tertentu, jadi aplikasi bisa terpasang tetapi layanannya belum tersedia di daerahmu. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.

---

## P7 — Account FAQ ("Apakah saya perlu membuat akun untuk memakai {name}?")

Location: `faqs[5]`.

**Original:**
> Sebagian fitur inti biasanya memerlukan akun agar data, pembelian, atau progres tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar akun tidak dipakai orang lain.

### game
> Sebagian fitur inti biasanya memerlukan akun agar progres, item, dan pembelian tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan jangan membagikan akun game kepada orang lain — penjual dan pembeli akun sering kehilangan akunnya karena pemilik lama menariknya kembali.

### social
> Sebagian fitur inti biasanya memerlukan akun agar pertemanan, pesan, dan postingan tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar akun tidak dipakai orang lain.

### creator
> Sebagian fitur inti biasanya memerlukan akun agar proyek, aset, dan langganan tersimpan dan tersinkron antar perangkat. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar proyekmu tidak dibuka orang lain.

### streaming
> Sebagian fitur inti biasanya memerlukan akun agar riwayat tontonan, daftar saya, dan langganan tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan periksa perangkat yang masuk ke akunmu agar langganan tidak dipakai orang lain.

### shopping
> Sebagian fitur inti biasanya memerlukan akun agar pesanan, alamat, dan riwayat pembayaran tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar pesanan tidak dibuat orang lain atas namamu.

### finance
> Aplikasi keuangan selalu memerlukan akun dan verifikasi identitas agar saldo serta riwayat transaksi tercatat atas namamu. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan jangan pernah masuk dari perangkat orang lain — bila terpaksa, segera ganti kata sandi dan keluar dari semua perangkat setelahnya.

### productivity
> Sebagian fitur inti biasanya memerlukan akun agar dokumen, rapat, dan pengaturan tersimpan dan tersinkron antar perangkat. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar dokumen kerja tidak dibuka orang lain.

### education
> Sebagian fitur inti biasanya memerlukan akun agar progres belajar, nilai, dan jadwal kelas tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan — untuk anak, gunakan akun yang diawasi orang tua — simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai.

### utility
> Sebagian fitur inti biasanya memerlukan akun agar pesanan, alamat, dan riwayat perjalanan tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar pesanan tidak dibuat orang lain atas namamu.

---

## §9 — Permission-list intros (one per group)

The permission lists themselves (`PERMISSIONS` in `expansion-shared.ts`)
are already keyed per profile, so every app in a group correctly shares one
list. These intros go directly above the list to explain *why* those
permissions make sense for this kind of app. Render as a short paragraph
before the permission list on expansion pages.

- **game:** "Izin-izin ini wajar untuk game daring: koneksi untuk bermain bersama, penyimpanan untuk aset dan tangkapan layar, dan mikrofon hanya bila kamu memakai obrolan suara."
- **social:** "Izin-izin ini wajar untuk aplikasi sosial: kamera dan mikrofon untuk panggilan, kontak untuk menemukan teman, dan lokasi hanya bila kamu membagikan tempat."
- **creator:** "Izin-izin ini wajar untuk aplikasi editor: akses media untuk bahan dan hasil ekspor, kamera untuk merekam, dan internet untuk aset serta sinkronisasi."
- **streaming:** "Izin-izin ini wajar untuk layanan tontonan: koneksi untuk memutar video, penyimpanan untuk cache dan unduhan resmi, dan akun untuk riwayat serta langganan."
- **shopping:** "Izin-izin ini wajar untuk aplikasi belanja: lokasi untuk alamat dan ongkir, kamera untuk memindai kode dan foto ulasan, dan notifikasi untuk status pesanan."
- **finance:** "Izin-izin ini wajar untuk aplikasi keuangan: koneksi untuk transaksi, kamera untuk memindai kode dan verifikasi, dan notifikasi untuk mutasi serta peringatan keamanan."
- **productivity:** "Izin-izin ini wajar untuk aplikasi kerja: sinkronisasi untuk dokumen antar perangkat, kamera dan mikrofon untuk rapat, dan kalender untuk undangan."
- **education:** "Izin-izin ini wajar untuk aplikasi belajar: koneksi untuk materi dan kelas, kamera serta mikrofon untuk kelas langsung, dan penyimpanan untuk materi dan tugas."
- **utility:** "Izin-izin ini wajar untuk aplikasi layanan: lokasi untuk peta dan penjemputan, kamera untuk memindai kode, dan notifikasi untuk jadwal serta status layanan."

---

## Notes — where shared text should stay

1. **Install FAQ, first sentence.** All 9 variants open with the same
   instruction ("Tekan tombol resmi di halaman ini atau cari {name} langsung
   di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal.")
   because the install steps genuinely are identical for every app. Only the
   post-install check differs per group. This is honest repetition, not a
   template to de-duplicate further.
2. **Unavailable FAQ, closing sentences.** All 9 variants keep the same
   closing advice ("Bila Play Store menyatakan perangkat tidak kompatibel,
   jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play
   Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk
   perangkatmu.") because the advice is the same for every app. Only the
   middle sentence — the *reason* an app may be unavailable — varies per
   group.
3. **Gratis FAQ.** Only the tail varies; the `{priceLabel}` first sentence
   is per-app already. No variant changes any price fact. Group tails were
   checked against the stored price labels (e.g. streaming labels say
   "sebagian gratis / langganan", finance labels say "gratis untuk aplikasi;
   saldo/transfer mengikuti ketentuan biaya", shopping labels say "gratis
   untuk aplikasi; barang/ongkir dibayar per transaksi") — the tails match
   those semantics and invent no new prices.
4. **No variant needed for `PROFILE_SAFETY`** (`safetyParagraphs[1]`) — it
   already has 9 distinct group texts in the builder.
5. **Honesty guardrails kept throughout:** no invented versions, features,
   prices, ratings, or download counts. Every group-specific claim is a
   generic, verifiable property of the category (e.g. games need RAM,
   streaming catalogs are region-licensed, finance apps reject rooted
   devices, utility services are city-limited). Where a claim could vary by
   app inside a group, the wording stays conditional ("dapat", "biasanya",
   "juga", "bila").
6. **Length:** each variant is roughly the same length as its original
   (within ~20%) — the longest originals (P1, P2) got the longest variants;
   the shortest (P3) stayed short.
7. **After applying:** re-run `npm run check:seo` and add a check that no
   paragraph text is byte-identical across two different profile groups
   (same group sharing is expected; cross-group sharing is the bug being
   fixed). Rebuild and confirm 117/117 pages still build.
