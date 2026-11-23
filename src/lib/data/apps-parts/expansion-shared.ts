import type { PillarApp } from "../content-types";

export type PermissionProfile = "game" | "social" | "creator" | "streaming" | "shopping" | "finance" | "productivity" | "education" | "utility";

export interface ExpansionRecord {
  slug: string; name: string; searchName?: string; packageId: string; developer: string;
  categorySlug: string; categoryName: string; icon: string; tagline: string; priceLabel: string;
  focus: string; usage: string; workflow: string; caution: string; check: string;
  features: { title: string; desc: string }[];
  permissionProfile: PermissionProfile;
  pros: string[]; cons: string[];
  faqFocusQ: string; faqFocusA: string;
  extraFaq?: { q: string; a: string };
  alternatives: { name: string; slug: string | null; note: string }[];
}

const PERMISSIONS: Record<PermissionProfile, { name: string; meaning: string }[]> = {
  game: [
    { name: "Internet & Jaringan", meaning: "Wajib untuk masuk akun, pertandingan daring, unduhan aset, dan sinkronisasi progres. Game offline pun bisa membutuhkannya saat pertama masuk." },
    { name: "Penyimpanan / Foto & Media", meaning: "Untuk menyimpan aset game, tangkapan layar, dan rekaman. Batasi hanya pada file yang kamu pilih bila Android menawarkan pilihan itu." },
    { name: "Mikrofon", meaning: "Hanya wajar bila kamu memakai obrolan suara. Matikan saat tidak bermain dalam regu atau tidak ingin suaramu terdengar pemain lain." },
    { name: "Notifikasi", meaning: "Untuk kabar event, pesan regu, dan pembaruan. Atur agar notifikasi promosi tidak mengganggu waktu belajar atau bekerja." },
    { name: "Getar & Layanan Latar", meaning: "Untuk respons kontrol dan menjaga unduhan aset selesai. Periksa pemakaian baterai bila HP terasa cepat panas setelah bermain." },
  ],
  social: [
    { name: "Kontak", meaning: "Membantu menemukan teman yang juga memakai layanan. Kamu dapat menolaknya dan tetap menambahkan teman secara manual bila pilihan itu tersedia." },
    { name: "Kamera & Mikrofon", meaning: "Untuk foto, video, panggilan suara, dan panggilan video. Berikan saat memakai fitur tersebut, bukan sebagai izin permanen tanpa alasan." },
    { name: "Foto, Video & Penyimpanan", meaning: "Untuk memilih lampiran dan menyimpan media yang kamu unduh. Gunakan akses file pilihan agar aplikasi tidak membaca seluruh galeri." },
    { name: "Notifikasi", meaning: "Untuk pesan dan panggilan masuk. Atur mode senyap dan prioritas kontak agar tidak semua aktivitas membunyikan HP." },
    { name: "Lokasi", meaning: "Hanya diperlukan untuk menandai tempat, mencari fitur sekitar, atau membagikan lokasi langsung. Gunakan lokasi perkiraan dan hanya saat aplikasi dipakai." },
  ],
  creator: [
    { name: "Foto, Video & Penyimpanan", meaning: "Inti aplikasi editor: membaca bahan yang akan diedit dan menyimpan hasil ekspor. Pilih file secara manual bila Android mengizinkannya." },
    { name: "Kamera & Mikrofon", meaning: "Untuk merekam bahan langsung dari aplikasi dan menambahkan narasi. Tidak diperlukan bila kamu selalu mengimpor file yang sudah jadi." },
    { name: "Internet", meaning: "Untuk aset daring, sinkronisasi cloud, pemeriksaan lisensi, dan membagikan hasil ke layanan lain." },
    { name: "Notifikasi", meaning: "Untuk kabar render, aset, dan penawaran. Matikan promosi bila mengganggu, tetapi pertahankan pemberitahuan keamanan akun." },
    { name: "Pembelian dalam Aplikasi", meaning: "Sebagian fitur, aset, atau penghapusan watermark mungkin berbayar. Periksa harga dan status langganan di Play Store, bukan dari tautan luar." },
  ],
  streaming: [
    { name: "Internet & Jaringan", meaning: "Wajib untuk memutar video dan menyesuaikan kualitas dengan kecepatan koneksi. Pemutaran latar atau unduhan resmi memerlukan koneksi stabil." },
    { name: "Penyimpanan", meaning: "Dipakai untuk cache dan fitur unduh resmi bila judul serta paketmu mengizinkan. Hapus unduhan lama agar penyimpanan tidak penuh." },
    { name: "Notifikasi", meaning: "Untuk episode baru, rekomendasi, dan pengingat tontonan. Batasi hanya pada serial atau kanal yang benar-benar kamu ikuti." },
    { name: "Akun & Langganan", meaning: "Untuk riwayat, daftar saya, dan akses paket berbayar. Jangan membagikan kata sandi; gunakan profil dan PIN bila tersedia untuk anak." },
  ],
  shopping: [
    { name: "Lokasi", meaning: "Untuk alamat kirim, ongkos, toko atau layanan terdekat. Gunakan alamat yang kamu masukkan dan lokasi perkiraan bila titik presisi tidak diperlukan." },
    { name: "Kamera", meaning: "Untuk memindai kode, mencari produk dari gambar, mengambil foto ulasan, atau verifikasi penjual. Tolak bila kamu tidak memakai fitur tersebut." },
    { name: "Foto & Penyimpanan", meaning: "Untuk mengunggah foto produk, bukti pembayaran, atau lampiran komplain. Pilih file satu per satu agar data pribadi tidak ikut terunggah." },
    { name: "Notifikasi", meaning: "Untuk status pesanan, pengiriman, dan promosi. Pertahankan notifikasi transaksi, matikan promosi bila terlalu sering." },
    { name: "Kontak / Telepon", meaning: "Kadang digunakan untuk kurir, verifikasi, atau layanan pelanggan. Jangan berikan kode OTP kepada siapa pun yang menghubungimu di luar aplikasi resmi." },
  ],
  finance: [
    { name: "Internet & Keamanan Akun", meaning: "Wajib untuk transaksi dan verifikasi. Aktifkan PIN, biometrik, dan verifikasi dua langkah di dalam aplikasi; jangan pernah membagikan OTP." },
    { name: "Kamera", meaning: "Untuk memindai QRIS, verifikasi identitas, atau mengambil dokumen yang diminta proses resmi. Lakukan hanya di dalam aplikasi resmi, bukan dari tautan chat." },
    { name: "Kontak", meaning: "Dapat dipakai untuk memilih penerima transfer. Kamu bisa memasukkan nomor manual dan menolak akses kontak bila fitur tetap bekerja." },
    { name: "Notifikasi", meaning: "Sangat penting untuk mutasi dan peringatan keamanan. Jangan matikan notifikasi transaksi; segera kunci akun bila ada transaksi yang tidak kamu kenali." },
    { name: "Lokasi", meaning: "Kadang dipakai untuk keamanan dan deteksi penipuan. Gunakan hanya saat aplikasi dipakai dan curigai aplikasi keuangan yang meminta aksesibilitas atau kontrol layar." },
  ],
  productivity: [
    { name: "Internet & Akun", meaning: "Untuk sinkronisasi antar perangkat, berbagi dokumen, rapat, dan cadangan. Gunakan akun milikmu sendiri dan aktifkan verifikasi dua langkah." },
    { name: "Penyimpanan / File", meaning: "Untuk membuka, mengedit, dan menyimpan dokumen. Beri akses pada file yang dipilih saja bila aplikasi mendukung pemilih file Android." },
    { name: "Kamera & Mikrofon", meaning: "Diperlukan untuk rapat video, memindai dokumen, atau melampirkan foto. Matikan di luar rapat dan periksa indikator kamera/mikrofon Android." },
    { name: "Kalender & Kontak", meaning: "Untuk undangan rapat dan berbagi. Berikan hanya bila kamu memakai integrasi tersebut; berbagi dokumen tetap bisa dilakukan dengan tautan atau email manual." },
    { name: "Notifikasi", meaning: "Untuk pengingat tugas, email, dan rapat. Atur jam tenang agar notifikasi kerja tidak mengganggu waktu pribadi." },
  ],
  education: [
    { name: "Internet & Akun", meaning: "Untuk materi, kelas, kuis, dan menyimpan progres antar perangkat. Gunakan akun pelajar sendiri agar hasil belajar tidak tercampur." },
    { name: "Kamera & Mikrofon", meaning: "Dipakai pada kelas langsung, latihan berbicara, atau mengunggah tugas. Dampingi anak dan matikan izin ini di luar sesi belajar." },
    { name: "Penyimpanan", meaning: "Untuk mengunduh materi dan mengunggah tugas. Periksa ukuran unduhan dan hapus materi lama yang tidak lagi dibutuhkan." },
    { name: "Notifikasi", meaning: "Untuk jadwal kelas dan pengingat belajar. Atur agar pengingat mendukung rutinitas, bukan menjadi tekanan atau gangguan terus-menerus." },
  ],
  utility: [
    { name: "Internet & Akun", meaning: "Untuk memuat data layanan, sinkronisasi, dan menyimpan riwayat. Gunakan akun resmi milikmu dan verifikasi dua langkah bila tersedia." },
    { name: "Lokasi", meaning: "Sering menjadi inti layanan peta, transportasi, dan perjalanan. Pilih lokasi perkiraan atau hanya saat aplikasi dipakai bila titik presisi tidak diperlukan." },
    { name: "Kamera", meaning: "Untuk memindai kode, dokumen, atau fitur visual. Berikan hanya saat memakai fitur tersebut." },
    { name: "Penyimpanan / Foto", meaning: "Untuk lampiran, tiket, foto profil, atau dokumen perjalanan. Pilih file yang diperlukan saja." },
    { name: "Notifikasi", meaning: "Untuk perubahan jadwal, status layanan, dan keamanan akun. Bedakan notifikasi penting dari promosi dan matikan yang tidak dibutuhkan." },
  ],
};

const PROFILE_SAFETY: Record<PermissionProfile, string> = {
  game: "Untuk anak dan remaja, aktifkan persetujuan pembelian di Play Store dan bahas batas waktu bermain sejak awal. Akun game adalah aset digital: gunakan kata sandi unik, verifikasi dua langkah bila tersedia, dan jangan membeli mata uang game dari penjual tidak resmi yang meminta akses akun.",
  social: "Atur privasi akun sejak pertama memakai: siapa yang bisa melihat profil, mengomentari, menambahkan teman, dan mengunduh kontenmu. Untuk anak, gunakan fitur pengawasan resmi platform dan dampingi percakapan dengan orang asing; jangan memindahkan obrolan ke jalur yang diminta orang tak dikenal.",
  creator: "Periksa lisensi musik, font, dan aset sebelum memakai hasil edit untuk tujuan komersial. Langganan dan penghapusan watermark hanya resmi bila dibeli dari dalam aplikasi atau Play Store; berkas editor 'premium terbuka' dari situs acak adalah bajakan dan berisiko.",
  streaming: "Gunakan profil anak dan batas usia bila layanan menyediakannya, terutama untuk katalog campuran. Langganan resmi juga melindungi riwayat dan pembayaranmu; akun bersama dari penjual murah sering dicabut dan dapat berasal dari pembayaran curian.",
  shopping: "Selesaikan komunikasi dan pembayaran di dalam platform agar perlindungan pembeli tetap berlaku. Periksa nama toko, ulasan yang masuk akal, ongkos kirim, dan kebijakan retur sebelum membayar; jangan tergiur harga jauh di bawah pasar dari tautan di luar aplikasi.",
  finance: "Aplikasi keuangan hanya boleh dipasang dari Play Store dan hanya boleh dibuka dari ikon resmi di HP-mu. Bank dan e-wallet tidak mengirim APK lewat WhatsApp, tidak meminta OTP, dan tidak menyuruh memasang aplikasi pendamping lewat chat. Bila ada yang melakukannya, anggap itu penipuan.",
  productivity: "Dokumen dan rapat sering memuat data kerja atau keluarga. Periksa alamat email penerima sebelum berbagi, gunakan tautan yang kedaluwarsa, dan pisahkan akun pribadi dari akun kantor agar akses bisa dicabut saat perangkat atau pekerjaan berubah.",
  education: "Untuk anak, gunakan akun yang diawasi orang tua, periksa pembelian paket, dan bedakan konten gratis dari kelas berbayar sebelum membayar. Hasil belajar lebih bergantung pada rutinitas dan pendampingan daripada mengumpulkan banyak aplikasi.",
  utility: "Layanan utilitas sering menyimpan alamat, jadwal, dan dokumen penting. Gunakan kata sandi unik, periksa sesi perangkat yang masuk, dan jangan membagikan tangkapan layar berisi kode pemesanan, alamat lengkap, atau QR tiket kepada publik.",
};


// Phase 2 SEO-06: group-specific variants (was 7 byte-identical shared
// paragraphs across all 39 expansion pages). Placeholders {name} /
// {developer} / {priceLabel} are filled by fill() in buildExpansionApp.
const WORKFLOW_P2: Record<PermissionProfile, string> = {
  game: `Di game seperti {name}, yang paling terasa bedanya adalah perangkat dan koneksi: frame rate, ping, dan suhu HP menentukan nyaman tidaknya satu pertandingan. Mulailah dari mode santai dan pengaturan grafis menengah, periksa pembelian dalam aplikasi serta izin mikrofon sebelum bermain regu, lalu naikkan pengaturan dan aktifkan fitur lanjutan bila perangkatmu sanggup. Cara bertahap ini membuatmu tahu mana yang benar-benar menambah seru permainan, tanpa mengeluarkan uang atau data untuk fitur yang tidak kamu pakai.`,
  social: `Di aplikasi sosial seperti {name}, pengalamanmu sangat dipengaruhi pengaturan privasi dan lingkaran pertemananmu, bukan sekadar kecepatan HP. Mulailah dari profil dan daftar teman yang sudah kamu kenal, periksa siapa yang bisa melihat postingan, mengomentari, dan menghubungimu, lalu aktifkan fitur tambahan seperti panggilan video atau grup setelah pengaturan dasar beres. Cara bertahap ini membuatmu lebih mudah menjaga privasi dan tidak membagikan data kepada orang yang sebenarnya tidak kamu kenal.`,
  creator: `Di aplikasi editor seperti {name}, hasil akhirnya lebih dipengaruhi bahan dan perangkatmu daripada jumlah fitur yang diaktifkan. Mulailah dari proyek sederhana dengan alat inti — potong, susun, dan ekspor — periksa batasan versi gratis seperti watermark dan penyimpanan, lalu coba efek dan aset premium satu per satu. Cara bertahap ini membuatmu tahu alat mana yang benar-benar kamu pakai, tanpa membayar langganan untuk fitur yang hanya dicoba sekali.`,
  streaming: `Di layanan tontonan seperti {name}, pengalaman menontonmu paling dipengaruhi kecepatan koneksi dan paket yang kamu pakai. Mulailah dari judul gratis dan kualitas otomatis, periksa batasan katalog serta episode yang terkunci langganan, lalu aktifkan unduhan dan profil tambahan bila paketmu mendukung. Cara bertahap ini membuatmu tahu tontonan mana yang layak dibayar, tanpa berlangganan paket yang isinya jarang kamu tonton.`,
  shopping: `Di aplikasi belanja seperti {name}, pengalamanmu paling dipengaruhi alamat, metode bayar, dan kebiasaan memeriksa toko sebelum checkout. Mulailah dari pencarian dan keranjang, periksa ongkos kirim, kebijakan retur, serta ulasan penjual, lalu aktifkan pembayaran tersimpan dan notifikasi promo setelah kamu yakin dengan tokonya. Cara bertahap ini membuatmu lebih mudah mengenali penjual yang bisa dipercaya dan tidak mengeluarkan uang untuk barang yang sebenarnya tidak kamu butuhkan.`,
  finance: `Di aplikasi keuangan seperti {name}, yang paling penting bukan banyaknya fitur, melainkan keamanan dan kejelasan biaya setiap transaksi. Mulailah dari fitur inti — cek saldo dan transfer kecil — periksa biaya layanan, batas transaksi, dan pengaturan keamanan akun, lalu aktifkan fitur lanjutan seperti tagihan otomatis setelah kamu paham risikonya. Cara bertahap ini membuatmu lebih mudah mengendalikan uang dan tidak mengaktifkan layanan yang biayanya tidak kamu sadari.`,
  productivity: `Di aplikasi kerja seperti {name}, manfaatnya paling terasa setelah akun, sinkronisasi, dan berbagi diatur dengan benar. Mulailah dari satu dokumen atau rapat, periksa siapa yang bisa melihat dan mengedit, serta ruang penyimpanan yang tersedia, lalu aktifkan integrasi kalender dan template setelah alur dasarmu berjalan. Cara bertahap ini membuatmu tahu fitur mana yang benar-benar mempercepat pekerjaan, tanpa menyerahkan dokumen kepada orang yang salah.`,
  education: `Di aplikasi belajar seperti {name}, hasilmu lebih dipengaruhi konsistensi daripada jumlah fitur yang dibuka sekaligus. Mulailah dari satu pelajaran atau kursus, periksa mana materi yang gratis dan mana yang berbayar, lalu aktifkan pengingat dan paket belajar setelah rutinitasmu terbentuk. Cara bertahap ini membuatmu tahu metode mana yang cocok untukmu, tanpa membayar paket yang akhirnya tidak dipakai.`,
  utility: `Di aplikasi layanan seperti {name}, pengalamanmu paling dipengaruhi lokasi, koneksi, dan ketersediaan layanan di kotamu. Mulailah dari satu pesanan atau pencarian, periksa tarif, estimasi waktu, dan metode bayar, lalu aktifkan langganan atau fitur lanjutan setelah kamu yakin layanannya memang tersedia dan bisa diandalkan di daerahmu. Cara bertahap ini membuatmu tahu layanan mana yang layak dipakai rutin, tanpa membayar biaya yang tidak kamu butuhkan.`,
};

const SAFETY_P1: Record<PermissionProfile, string> = {
  game: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas mod, cheat, atau diamond murah dari chat dan situs pengumpul APK, karena berkas semacam itu adalah cara paling umum akun game dicuri dan perangkat disusupi.`,
  social: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan memasang versi "tanpa iklan" atau "fitur terbuka" dari chat dan situs pengumpul APK, karena aplikasi tiruan sosial adalah cara paling umum kata sandi dan percakapan dicuri.`,
  creator: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima editor "premium terbuka" dari chat dan situs pengumpul APK, karena berkas itu bajakan dan sering disisipi pencuri data yang mengintip proyek serta akunmu.`,
  streaming: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan memasang aplikasi "nonton gratis premium" dari chat dan situs pengumpul APK, karena aplikasi tiruan streaming adalah cara paling umum akun langganan dan data pembayaran dicuri.`,
  shopping: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas instalasi dari penjual, kurir, atau tautan chat, karena aplikasi belanja tiruan dibuat untuk mencuri data pembayaran dan mengarahkan uangmu ke rekening penipu.`,
  finance: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; bank dan e-wallet tidak pernah membagikan APK lewat WhatsApp atau chat, dan aplikasi keuangan tiruan adalah cara paling umum saldo dan OTP dicuri.`,
  productivity: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas instalasi dari tautan email atau chat yang mengaku dari kantor, karena aplikasi kerja tiruan dibuat untuk mengintip dokumen dan kredensial akunmu.`,
  education: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan memasang aplikasi belajar "paket lengkap gratis" dari chat dan situs pengumpul APK, karena aplikasi tiruan pendidikan sering meminta pembayaran di luar jalur resmi dan mengintip data anak.`,
  utility: `Unduh {name} hanya dari Google Play Store dan pastikan developer-nya adalah {developer}. Pencarian Play Store dari tombol di halaman ini mengurangi risiko salah memilih aplikasi peniru dengan nama dan ikon mirip. Setelah terpasang, perbarui hanya dari Play Store; jangan menerima berkas instalasi dari pengemudi, agen perjalanan, atau tautan chat, karena aplikasi layanan tiruan dibuat untuk mencuri alamat, jadwal perjalanan, dan data pembayaranmu.`,
};

const FAQ_SAFE: Record<PermissionProfile, string> = {
  game: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun game setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah bila tersedia, dan jangan pernah membeli mata uang atau item game dari penjual di luar aplikasi resmi.`,
  social: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun sosial setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah, dan atur privasi profil sejak awal agar postingan dan daftar temanmu tidak terbuka untuk orang asing.`,
  creator: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun editor setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah bila tersedia, dan periksa lisensi aset sebelum memakai hasil edit untuk keperluan komersial.`,
  streaming: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun tontonan setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, jangan membagikan akun langganan kepada penjual murah, dan periksa perangkat yang masuk ke akunmu secara berkala.`,
  shopping: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun belanja setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah dan notifikasi transaksi, dan jangan pernah menyelesaikan pembayaran di luar aplikasi resmi.`,
  finance: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun keuangan setelah pemasangan tetap tergantung padamu: gunakan PIN dan biometrik, aktifkan verifikasi dua langkah, dan jangan pernah membagikan OTP kepada siapa pun — termasuk yang mengaku dari bank atau layanan.`,
  productivity: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun kerja setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah, dan periksa dengan teliti alamat email penerima sebelum membagikan dokumen.`,
  education: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun belajar setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan pengawasan orang tua untuk akun anak, dan periksa pembelian paket sebelum membayar agar tidak ada langganan yang tidak disadari.`,
  utility: `Aman dipasang bila kamu mengambilnya dari Play Store dan developer-nya adalah {developer}. Keamanan akun layanan setelah pemasangan tetap tergantung padamu: gunakan kata sandi unik, aktifkan verifikasi dua langkah bila tersedia, dan jangan membagikan tangkapan layar berisi kode pemesanan atau alamat lengkap kepada publik.`,
};

const FAQ_FREE_TAIL: Record<PermissionProfile, string> = {
  game: `Periksa rincian di Play Store sebelum membeli mata uang atau item dalam game, karena harga dan event dapat berubah. Jangan membeli diamond, Robux, atau skin murah dari penjual pihak ketiga; mata uang dari jalur tidak resmi bisa ditarik dan akunmu bisa dibatasi.`,
  social: `Periksa rincian di Play Store dan di dalam aplikasi sebelum membayar, karena paket dan promosi dapat berubah. Jangan membeli akun "premium terbuka" dari pihak ketiga; itu bukan cara resmi dan akunmu bisa dibatasi.`,
  creator: `Periksa rincian di Play Store sebelum berlangganan, karena harga paket dan fitur yang terkunci dapat berubah. Jangan membeli editor "tanpa watermark" dari pihak ketiga; itu bukan cara resmi, berkasnya bajakan, dan akunmu bisa dibatasi.`,
  streaming: `Periksa rincian paket di Play Store dan di dalam aplikasi sebelum berlangganan, karena harga dan katalog dapat berubah. Jangan membeli akun langganan murah dari penjual pihak ketiga; akun bersama seperti itu sering dicabut dan bisa berasal dari pembayaran curian.`,
  shopping: `Periksa rincian ongkos kirim dan biaya layanan di dalam aplikasi sebelum checkout, karena tarif dapat berubah per pesanan. Jangan membayar lewat tautan di luar aplikasi; perlindungan pembeli hanya berlaku bila transaksi diselesaikan di dalam platform resmi.`,
  finance: `Periksa rincian biaya layanan di dalam aplikasi sebelum bertransaksi, karena tarif dapat berubah dan ditampilkan di layar konfirmasi. Jangan membayar "biaya aktivasi" atau "upgrade akun" kepada siapa pun di luar aplikasi; layanan keuangan resmi tidak memungut biaya lewat chat.`,
  productivity: `Periksa rincian paket di Play Store dan di dalam aplikasi sebelum berlangganan, karena harga dan batas penyimpanan dapat berubah. Jangan membeli lisensi murah dari penjual pihak ketiga; lisensi tidak resmi bisa dicabut dan dokumenmu bisa terkunci.`,
  education: `Periksa rincian paket di Play Store dan di dalam aplikasi sebelum membayar, karena harga kursus dan langganan dapat berubah. Jangan membeli "paket lengkap seumur hidup" dari penjual pihak ketiga; itu bukan cara resmi dan akun belajar anakmu bisa dibatasi.`,
  utility: `Periksa rincian tarif dan biaya layanan di dalam aplikasi sebelum memesan, karena harga dapat berubah per pesanan dan per kota. Jangan membayar lewat tautan di luar aplikasi; pembayaran resmi selalu tercatat di riwayat pesananmu di dalam aplikasi.`,
};

const FAQ_INSTALL: Record<PermissionProfile, string> = {
  game: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, aktifkan persetujuan pembelian di Play Store dan atur izin mikrofon serta notifikasi sebelum bermain, terutama bila HP dipakai anak.`,
  social: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, atur privasi profil dan izin kontak, kamera, serta lokasi sebelum menambahkan teman atau membagikan apa pun.`,
  creator: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, berikan akses file pada folder yang kamu pilih dan periksa pengaturan ekspor serta watermark sebelum mengedit proyek pertama.`,
  streaming: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, buat profil, atur batas usia bila ada anak yang menonton, dan periksa kualitas video serta izin unduhan sebelum memutar episode pertama.`,
  shopping: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, isi alamat kirim dan metode bayar dari dalam aplikasi, lalu periksa izin lokasi dan notifikasi pesanan sebelum belanja pertama.`,
  finance: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, aktifkan PIN, biometrik, dan notifikasi transaksi di dalam aplikasi sebelum memasukkan saldo atau menghubungkan rekening.`,
  productivity: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, masuk dengan akun kerjamu, periksa sinkronisasi dan ruang penyimpanan, lalu atur izin kalender serta notifikasi rapat sebelum membuat dokumen pertama.`,
  education: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, buat profil belajar — untuk anak, gunakan akun yang diawasi orang tua — lalu periksa izin kamera dan mikrofon sebelum memulai kelas pertama.`,
  utility: `Tekan tombol resmi di halaman ini atau cari {name} langsung di Play Store, cocokkan nama developer {developer}, lalu ketuk Instal. Setelah selesai, isi alamat dan metode bayar dari dalam aplikasi, lalu periksa izin lokasi dan notifikasi layanan sebelum membuat pesanan pertama.`,
};

const FAQ_UNAVAILABLE: Record<PermissionProfile, string> = {
  game: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Game berat juga menuntut RAM dan penyimpanan yang cukup, jadi perangkat lama mungkin dinyatakan tidak kompatibel. Bila Play Store menyatakan perangkat tidak didukung, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
  social: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Sebagian fitur sosial juga dibatasi menurut usia akun atau wilayah. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
  creator: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Aplikasi editor juga membutuhkan ruang penyimpanan dan versi Android yang cukup baru untuk fitur tertentu. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
  streaming: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Katalog dan judul tertentu juga dibatasi lisensi per wilayah, jadi tontonan yang ada di satu negara belum tentu ada di negara lain. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
  shopping: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Layanan dan penjual tertentu juga hanya melayani daerah tertentu. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
  finance: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Layanan keuangan juga dapat menolak perangkat yang di-root atau sistemnya dimodifikasi, demi keamanan transaksi. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
  productivity: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Fitur tertentu juga memerlukan akun kerja atau paket organisasi. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
  education: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Materi dan kurikulum tertentu juga hanya tersedia untuk wilayah atau jenjang tertentu. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
  utility: `Ketersediaan dapat dipengaruhi versi Android, wilayah, kebijakan developer, dan kondisi jaringan. Layanan peta, transportasi, dan perjalanan juga hanya beroperasi di kota tertentu, jadi aplikasi bisa terpasang tetapi layanannya belum tersedia di daerahmu. Bila Play Store menyatakan perangkat tidak kompatibel, jangan memaksa dengan berkas dari situs acak. Perbarui Android dan Play Store bila memungkinkan, atau gunakan alternatif resmi yang tersedia untuk perangkatmu.`,
};

const FAQ_ACCOUNT: Record<PermissionProfile, string> = {
  game: `Sebagian fitur inti biasanya memerlukan akun agar progres, item, dan pembelian tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan jangan membagikan akun game kepada orang lain — penjual dan pembeli akun sering kehilangan akunnya karena pemilik lama menariknya kembali.`,
  social: `Sebagian fitur inti biasanya memerlukan akun agar pertemanan, pesan, dan postingan tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar akun tidak dipakai orang lain.`,
  creator: `Sebagian fitur inti biasanya memerlukan akun agar proyek, aset, dan langganan tersimpan dan tersinkron antar perangkat. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar proyekmu tidak dibuka orang lain.`,
  streaming: `Sebagian fitur inti biasanya memerlukan akun agar riwayat tontonan, daftar saya, dan langganan tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan periksa perangkat yang masuk ke akunmu agar langganan tidak dipakai orang lain.`,
  shopping: `Sebagian fitur inti biasanya memerlukan akun agar pesanan, alamat, dan riwayat pembayaran tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar pesanan tidak dibuat orang lain atas namamu.`,
  finance: `Aplikasi keuangan selalu memerlukan akun dan verifikasi identitas agar saldo serta riwayat transaksi tercatat atas namamu. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan jangan pernah masuk dari perangkat orang lain — bila terpaksa, segera ganti kata sandi dan keluar dari semua perangkat setelahnya.`,
  productivity: `Sebagian fitur inti biasanya memerlukan akun agar dokumen, rapat, dan pengaturan tersimpan dan tersinkron antar perangkat. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar dokumen kerja tidak dibuka orang lain.`,
  education: `Sebagian fitur inti biasanya memerlukan akun agar progres belajar, nilai, dan jadwal kelas tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan — untuk anak, gunakan akun yang diawasi orang tua — simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai.`,
  utility: `Sebagian fitur inti biasanya memerlukan akun agar pesanan, alamat, dan riwayat perjalanan tersimpan. Gunakan email dan nomor yang benar-benar kamu kendalikan, simpan pemulihan akun dengan aman, dan keluar dari perangkat bersama setelah selesai agar pesanan tidak dibuat orang lain atas namamu.`,
};

const PERMISSIONS_INTRO: Record<PermissionProfile, string> = {
  game: `Izin-izin ini wajar untuk game daring: koneksi untuk bermain bersama, penyimpanan untuk aset dan tangkapan layar, dan mikrofon hanya bila kamu memakai obrolan suara.`,
  social: `Izin-izin ini wajar untuk aplikasi sosial: kamera dan mikrofon untuk panggilan, kontak untuk menemukan teman, dan lokasi hanya bila kamu membagikan tempat.`,
  creator: `Izin-izin ini wajar untuk aplikasi editor: akses media untuk bahan dan hasil ekspor, kamera untuk merekam, dan internet untuk aset serta sinkronisasi.`,
  streaming: `Izin-izin ini wajar untuk layanan tontonan: koneksi untuk memutar video, penyimpanan untuk cache dan unduhan resmi, dan akun untuk riwayat serta langganan.`,
  shopping: `Izin-izin ini wajar untuk aplikasi belanja: lokasi untuk alamat dan ongkir, kamera untuk memindai kode dan foto ulasan, dan notifikasi untuk status pesanan.`,
  finance: `Izin-izin ini wajar untuk aplikasi keuangan: koneksi untuk transaksi, kamera untuk memindai kode dan verifikasi, dan notifikasi untuk mutasi serta peringatan keamanan.`,
  productivity: `Izin-izin ini wajar untuk aplikasi kerja: sinkronisasi untuk dokumen antar perangkat, kamera dan mikrofon untuk rapat, dan kalender untuk undangan.`,
  education: `Izin-izin ini wajar untuk aplikasi belajar: koneksi untuk materi dan kelas, kamera serta mikrofon untuk kelas langsung, dan penyimpanan untuk materi dan tugas.`,
  utility: `Izin-izin ini wajar untuk aplikasi layanan: lokasi untuk peta dan penjemputan, kamera untuk memindai kode, dan notifikasi untuk jadwal serta status layanan.`,
};

export function buildExpansionApp(r: ExpansionRecord): PillarApp {
  // Phase 2 SEO-06: canonical Play details URL from the verified package ID
  // (play-package-ids.md) — never a search URL.
  const officialUrl = `https://play.google.com/store/apps/details?id=${r.packageId}`;
  // Phase 2 SEO-06: fill {name} / {developer} / {priceLabel} placeholders
  // in the group-specific template variants below.
  const fill = (t: string) => t.replaceAll("{name}", r.name).replaceAll("{developer}", r.developer).replaceAll("{priceLabel}", r.priceLabel);
  const profileSafety = PROFILE_SAFETY[r.permissionProfile];
  return {
    slug: r.slug, name: r.name, developer: r.developer, categorySlug: r.categorySlug, categoryName: r.categoryName,
    legalStatus: "play_store", officialUrl, officialLabel: `Buka ${r.name} di Play Store`,
    priceLabel: r.priceLabel, sizeLabel: "Bervariasi menurut perangkat", minAndroid: "Bervariasi menurut perangkat",
    languages: "Bahasa mengikuti pengaturan perangkat dan layanan", verifiedAt: "2026-10-20",
    versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi", icon: r.icon, tagline: r.tagline,
    intro: [r.focus, r.usage],
    sections: [
      { heading: `Cara ${r.name} Dipakai Sehari-hari`, paragraphs: [r.workflow, fill(WORKFLOW_P2[r.permissionProfile])] },
      { heading: `Yang Perlu Dicek Sebelum Mengandalkan ${r.name}`, paragraphs: [r.caution, r.check] },
    ],
    features: r.features,
    permissions: PERMISSIONS[r.permissionProfile],
    permissionsIntro: PERMISSIONS_INTRO[r.permissionProfile],
    safetyParagraphs: [
      fill(SAFETY_P1[r.permissionProfile]),
      profileSafety,
    ],
    pros: r.pros, cons: r.cons, alternatives: r.alternatives,
    faqs: [
      { q: `Apakah ${r.name} aman dipasang?`, a: fill(FAQ_SAFE[r.permissionProfile]) },
      { q: `Apakah ${r.name} gratis?`, a: `${r.priceLabel}. ${fill(FAQ_FREE_TAIL[r.permissionProfile])}` },
      { q: r.faqFocusQ, a: r.faqFocusA },
      { q: `Bagaimana cara memasang ${r.name} yang benar?`, a: fill(FAQ_INSTALL[r.permissionProfile]) },
      { q: `Kenapa ${r.name} tidak tersedia atau tidak bekerja di HP saya?`, a: fill(FAQ_UNAVAILABLE[r.permissionProfile]) },
      { q: `Apakah saya perlu membuat akun untuk memakai ${r.name}?`, a: fill(FAQ_ACCOUNT[r.permissionProfile]) },
      ...(r.extraFaq ? [r.extraFaq] : []),
    ],
    relatedTool: null,
  };
}
