import type { PillarApp } from "../content-types";

export const bstation: PillarApp = {
  slug: "bstation", name: "Bstation (Bilibili)", developer: "BALABOOM PTE. LTD. (Bilibili)",
  categorySlug: "anime-hiburan-legal", categoryName: "Anime & Hiburan Legal",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.bstar.intl",
  officialLabel: "Buka Bstation di Play Store",
  priceLabel: "Gratis (ada konten Premium berbayar)",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Subtitle Bahasa Indonesia untuk banyak judul",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  // Bstation SEO (Nov 2026): judul template "APK Terbaru 2026" menyesatkan untuk
  // layanan streaming tanpa unduhan APK. seoTitle disimpan TANPA "| CekAPK" karena
  // layout template menambahkannya - hasil render persis judul yang diusulkan.
  // Developer = nama persis di Play Store ("About the developer"), bukan merek.
  seoTitle: "Bstation: Anime, Fitur, Harga & Keamanan",
  seoDescription: "Bstation (Bilibili) adalah aplikasi streaming anime dengan subtitle Indonesia. Pelajari fitur, biaya gratis dan Premium, izin aplikasi, dan keamanan.",
  icon: "📺", tagline: "Nonton anime berlisensi dengan subtitle Indonesia - gratis dan legal.",
  intro: [
    "Bstation adalah nama layanan Bilibili untuk Asia Tenggara: aplikasi streaming anime (dan sebagian drama serta konten kreator Asia) yang berlisensi resmi, dengan subtitle Bahasa Indonesia untuk banyak judul. Layanan ini tersedia di Indonesia, Filipina, Thailand, Vietnam, Singapura, dan Malaysia, dan episode baru anime dirilis setiap hari menurut halaman resminya. Bagi penonton anime Indonesia, Bstation adalah jawaban legal utama menggantikan aplikasi dan situs streaming bajakan.",
  ],
  sections: [
    { heading: "Gratis, Legal, dan Berlisensi: Cara Bstation Bekerja", paragraphs: [
      "Bstation menayangkan anime dengan lisensi dari pemegang haknya. Sebagian besar episode bisa ditonton gratis dengan iklan; episode terbaru dari judul populer kadang dibuka lebih dulu untuk pelanggan Premium, lalu menyusul gratis setelah jeda. Model ini yang membuat kreator dan studio tetap dibayar, berbeda dari aplikasi bajakan yang menayangkan tanpa izin siapa pun.",
      "Selain anime, tersedia sebagian drama dan variety Asia serta konten kreator. Katalog berbeda per negara karena lisensi per wilayah - judul yang ada di satu negara belum tentu ada di Indonesia, dan itu hal normal dalam streaming legal.",
    ]},
    { heading: "Bstation vs Aplikasi Anime Tidak Resmi", paragraphs: [
      "Aplikasi anime tidak resmi seperti Kucing APK menjanjikan semua gratis tanpa iklan. Yang tidak mereka ceritakan: sumber videonya bajakan, aplikasinya tidak lolos peninjauan Play Store, pendapatannya dari iklan pihak ketiga yang tidak terkendali, dan riwayat tontonanmu berada di server yang tidak jelas pengelolanya. Beberapa aplikasi sejenis hilang begitu saja beserta akun dan daftar tontonan penggunanya.",
      "Bstation memang punya iklan dan sebagian episode terkunci Premium, tetapi akunmu resmi, kamu dapat menggunakan fitur riwayat tontonan dan daftar favorit yang tersedia di akunmu, subtitle Indonesianya tersedia untuk banyak judul, dan kamu tidak melanggar hak siapa pun dengan menonton di sini. Untuk penonton kasual, versi gratisnya sudah sangat mencukupi.",
    ]},
    { heading: "Tips Menonton Hemat di Bstation", paragraphs: [
      "Turunkan resolusi putar saat memakai data seluler dan gunakan Wi-Fi untuk maraton episode. Ikuti jadwal rilis resmi di aplikasi agar tidak tertinggal: episode baru anime dirilis setiap hari menurut halaman resmi Bstation.",
      "Buat akun agar riwayat, favorit, dan kelanjutan episode tersinkron antar perangkat. Untuk anak, perhatikan rating usia tiap judul - anime mencakup genre dewasa, jadi pendampingan dan pilihan judul tetap tanggung jawab keluarga, sama seperti layanan streaming lain.",
    ]},
  ],
  features: [
    { title: "Anime Berlisensi Subtitle Indonesia", desc: "Katalog anime resmi dengan subtitle Bahasa Indonesia untuk banyak judul, termasuk rilis musiman." },
    { title: "Gratis dengan Iklan", desc: "Mayoritas konten bisa ditonton tanpa membayar, didukung iklan - model yang membiayai lisensi resmi." },
    { title: "Premium untuk Akses Awal", desc: "Langganan opsional untuk episode terbaru lebih cepat dan pengalaman minim iklan sesuai paket resmi." },
    { title: "Daftar Favorit & Riwayat Sinkron", desc: "Akun menyimpan tontonan dan kelanjutan episode antar perangkat." },
    { title: "Kualitas Putar Bertingkat", desc: "Pilihan resolusi untuk menyesuaikan dengan jaringan dan kuota pengguna Indonesia." },
    { title: "Komunitas Komentar", desc: "Komentar dan reaksi penonton di banyak video dan episode, ciri khas budaya Bilibili." },
  ],
  permissions: [
    { name: "Penyimpanan", meaning: "Untuk cache video agar putar lebih lancar." },
    { name: "Notifikasi", meaning: "Kabar episode baru dari judul yang kamu ikuti. Atur per judul agar tidak berlebihan." },
    { name: "Akun & Internet", meaning: "Streaming membutuhkan koneksi; akun diperlukan untuk favorit, riwayat, dan Premium." },
  ],
  safetyParagraphs: [
    "Bstation adalah aplikasi resmi di Play Store dari Bilibili dan aman dipasang. Karena populer, beredar juga berkas sejenis dari situs acak bertajuk mod tanpa iklan atau premium gratis - pola yang sama seperti mod lain: tidak resmi, berisiko, dan melanggar ketentuan. Selalu pasang dari Play Store.",
    "Untuk keluarga: sediakan pilihan judul sesuai usia. Sebagian anime memang untuk penonton dewasa; rating dan sinopsis di halaman judul adalah panduan awal yang baik sebelum anak menonton sendiri.",
  ],
  pros: ["Legal dan berlisensi - menonton tanpa melanggar hak kreator", "Gratis untuk mayoritas katalog dengan subtitle Indonesia", "Aman: aplikasi resmi di Play Store, bukan berkas acak", "Rilis musiman cepat untuk judul populer", "Akun dan riwayat tersinkron antar perangkat"],
  cons: ["Episode terbaru judul populer kadang Premium dulu", "Ada iklan di versi gratis", "Katalog per negara berbeda karena lisensi wilayah", "Tidak semua judul lama tersedia", "Sebagian konten memang untuk penonton dewasa - perlu pendampingan anak"],
  alternatives: [
    { name: "Crunchyroll (di luar situs ini)", slug: null, note: "Layanan anime legal global dengan katalog besar; ketersediaan dan subtitle Indonesia per judul perlu dicek di aplikasinya. Unduh resmi dari Play Store." },
    { name: "YouTube", slug: "youtube", note: "Sebagian kanal resmi studio dan distributor menayangkan anime legal gratis di YouTube untuk wilayah tertentu." },
    { name: "Kucing APK", slug: "kucing-apk", note: "Aplikasi tidak resmi yang sering dicari - kami jelaskan risikonya dengan jujur di halamannya dan kenapa Bstation pilihan yang lebih aman." },
  ],
  faqs: [
    { q: "Apakah Bstation legal?", a: "Ya. Bstation adalah layanan Bilibili untuk Asia Tenggara yang menayangkan konten berlisensi dengan subtitle resmi. Itulah beda utamanya dari aplikasi anime tidak resmi: ada izin dari pemegang hak dan aplikasinya resmi di Play Store." },
    { q: "Apakah Bstation gratis?", a: "Mayoritas episode bisa ditonton gratis dengan iklan. Sebagian episode terbaru dari judul populer dibuka untuk Premium lebih dulu, dan ada paket Premium berbayar resmi. Harga selalu yang tercantum di aplikasi." },
    { q: "Kenapa judul favorit saya tidak ada di Bstation Indonesia?", a: "Karena lisensi streaming dibagi per negara. Judul bisa saja berlisensi ke layanan lain untuk Indonesia, atau belum ada pemegang lisensinya di sini. Ini keterbatasan semua layanan legal, bukan kesalahan aplikasinya." },
    { q: "Bstation sama dengan Bilibili?", a: "Satu perusahaan. Bilibili adalah layanan utama yang berasal dari Tiongkok, sedangkan Bstation adalah nama dan aplikasi layanannya untuk Asia Tenggara termasuk Indonesia, dengan katalog dan lisensi yang disesuaikan untuk wilayah ini." },
    { q: "Bagaimana cara menonton anime legal selain Bstation?", a: "Pilihan resminya antara lain Crunchyroll, kanal resmi di YouTube, dan layanan streaming umum seperti Vidio, iQIYI, dan Netflix untuk judul tertentu. Halaman panduan anime legal kami merangkum caranya memilih berdasarkan judul yang kamu cari." },
    { q: "Apakah Bstation bisa ditonton offline?", a: "Fitur unduh mengikuti ketentuan tiap judul dan paket akun; periksa ikon unduh di halaman episode di aplikasi. Bila tidak tersedia untuk judul itu, menonton lewat streaming dengan resolusi hemat adalah cara resmi yang aman." },
  ],
  relatedTool: null,
};

export const minecraft: PillarApp = {
  slug: "minecraft", name: "Minecraft", developer: "Mojang (Microsoft)",
  categorySlug: "game", categoryName: "Game",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
  officialLabel: "Buka Minecraft Resmi di Play Store",
  priceLabel: "Berbayar - sekali beli (harga resmi di Play Store)",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia tersedia di dalam game",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "⛏️", tagline: "Game membangun dunia balok legendaris - berbayar, dan memang tidak ada versi gratis resminya.",
  intro: [
    "Minecraft adalah game sandbox dari Mojang (bagian dari Microsoft) tempat pemain membangun, menjelajah, dan bertahan hidup di dunia balok yang dihasilkan secara acak. Ini salah satu game terlaris sepanjang sejarah dan tersedia resmi untuk Android di Google Play Store sebagai game BERBAYAR sekali beli.",
    "Kami menempatkan halaman ini di barisan pertama situs kami justru untuk meluruskan pencarian paling umum: tidak ada Minecraft Android gratis yang resmi dan legal. Yang beredar sebagai APK gratis adalah bajakan. Di bawah kami jelaskan pilihan resminya - termasuk versi trial resmi - harganya secara jujur, dan risiko versi bajakan.",
  ],
  sections: [
    { heading: "Harga Resmi dan Apa yang Kamu Dapat", paragraphs: [
      "Minecraft Android dibeli sekali di Play Store dengan harga yang tercantum di sana untuk Indonesia (dapat berubah mengikuti kebijakan harga dan promo resmi). Sekali beli dengan akun Google-mu, game ini milikmu permanen di akun itu: bisa dipasang ulang di perangkat Android lain tanpa membeli lagi, dan semua pembaruan resmi termasuk di dalamnya.",
      "Di dalam game ada Marketplace resmi untuk konten tambahan berbayar dari kreator (peta, skin, paket tekstur) - itu opsional. Game utamanya sendiri lengkap tanpa membeli apa pun lagi: mode Survival, Creative, dunia tak terbatas, dan multipemain resmi lewat Realms berbayar atau server komunitas.",
    ]},
    { heading: "Minecraft Trial: Cara Resmi Mencoba Gratis", paragraphs: [
      "Mojang menyediakan Minecraft Trial resmi dan gratis di Play Store: versi percobaan dengan mode survival terbatas waktu untuk merasakan gameplay sebelum membeli. Ini satu-satunya cara gratis yang resmi di Android. Trial membuktikan HP kamu kuat menjalankan game dan kamu menyukai gaya bermainnya, tanpa risiko apa pun.",
      "Selain trial, cara legal lain adalah memainkan lewat perangkat teman yang sudah membeli, atau edisi lain di konsol/PC Game Pass sesuai ketentuan Microsoft. Tidak ada program resmi yang membagikan Minecraft Android penuh secara gratis - situs yang mengklaim itu sedang membagikan bajakan atau penipuan.",
    ]},
    { heading: "Kenapa APK Minecraft Bajakan Berbahaya", paragraphs: [
      "File bertajuk Minecraft APK gratis, mod, atau unlock all adalah pelanggaran hak cipta Microsoft yang aktif ditindak, dan bagi pengunduh risikonya praktis: berkas game adalah berkas besar tempat malware mudah disembunyikan, versi bajakan tidak menerima pembaruan keamanan dan fitur, dunia yang kamu bangun bisa hilang saat berkas bermasalah, dan multipemain resmi tidak berfungsi normal karena lisensi gagal diverifikasi.",
      "Ada juga risiko untuk anak: situs unduhan bajakan penuh iklan dewasa dan tombol palsu yang mengarah ke langganan berbayar terselubung. Membeli resmi sekali jauh lebih murah daripada memperbaiki HP dan kehilangan data. Untuk orang tua, pembelian lewat akun Google keluarga membuat pemasangan ulang dan pengawasan jauh lebih mudah.",
    ]},
  ],
  features: [
    { title: "Mode Survival & Creative", desc: "Bertahan hidup dengan sumber daya terbatas, atau membangun bebas dengan material tanpa batas dan bisa terbang." },
    { title: "Dunia Tanpa Batas Prosedural", desc: "Setiap dunia baru dihasilkan acak: gunung, laut, desa, dan gua yang tidak pernah sama persis." },
    { title: "Multipemain & Realms", desc: "Main bersama teman lewat jaringan lokal, server komunitas, atau server pribadi resmi Realms dari Mojang." },
    { title: "Marketplace Resmi", desc: "Peta petualangan, skin, dan paket tekstur dari kreator terkurasi - pembelian resmi di dalam game." },
    { title: "Pembaruan Rutin Resmi", desc: "Fitur dan bioma baru ditambahkan Mojang berkala dan termasuk dalam sekali pembelianmu." },
    { title: "Kontrol & Dukungan Kontroler", desc: "Kontrol sentuh yang bisa disesuaikan dan dukungan gamepad untuk pengalaman seperti konsol." },
  ],
  permissions: [
    { name: "Penyimpanan", meaning: "Menyimpan data dunia, peta, dan sumber daya game. Dunia yang kamu bangun tersimpan di sini - cadangkan bila penting." },
    { name: "Internet & Jaringan", meaning: "Untuk multipemain, Marketplace, dan masuk akun Microsoft untuk fitur daring." },
    { name: "Akun Microsoft (opsional di dalam game)", meaning: "Diperlukan untuk Realms dan sebagian fitur daring serta menyimpan pencapaian. Bermain luring dasar tetap bisa tanpa masuk." },
  ],
  safetyParagraphs: [
    "Minecraft resmi dari Play Store aman dan ditandatangani Mojang/Microsoft. Seluruh versi gratis penuh yang beredar di luar Play Store adalah bajakan tanpa kecuali - tidak ada distributor resmi lain untuk Android. Selain melanggar hukum hak cipta, berkas bajakan termasuk yang paling sering disusupi karena ukurannya besar dan pencarinya kebanyakan anak dan remaja.",
    "Beli dengan akun Google milik keluarga agar pembelian tercatat dan bisa dipasang ulang. Aktifkan persetujuan pembelian di Play Store untuk akun anak agar tidak ada pembelian dalam game tanpa izin, termasuk konten Marketplace.",
  ],
  pros: ["Sekali beli, permanen di akun Google, semua update termasuk", "Game kreatif dan edukatif yang cocok untuk anak dan keluarga", "Bisa dimainkan offline untuk mode pemain tunggal", "Multipemain resmi lintas perangkat dengan teman", "Ada trial resmi gratis untuk mencoba sebelum membeli"],
  cons: ["Berbayar - tidak ada versi penuh gratis yang legal", "Realms dan konten Marketplace adalah biaya tambahan opsional", "HP kelas bawah bisa terasa berat di dunia besar", "Berkas bajakan yang beredar sangat banyak dan menyesatkan pencari pemula", "Kontrol sentuh butuh penyesuaian bagi pemain baru"],
  alternatives: [
    { name: "Minecraft Trial (resmi, di Play Store)", slug: null, note: "Versi percobaan gratis resmi dari Mojang - cara legal merasakan Minecraft sebelum membeli." },
    { name: "Roblox (di luar situs ini)", slug: null, note: "Platform game kreasi lain yang gratis dengan pembelian dalam aplikasi; gaya dan modelnya berbeda dari Minecraft. Unduh resmi dari Play Store dan dampingi anak." },
  ],
  faqs: [
    { q: "Apakah ada Minecraft gratis yang resmi untuk Android?", a: "Tidak ada versi penuh gratis yang resmi. Yang resmi dan gratis hanyalah Minecraft Trial - versi percobaan terbatas dari Mojang di Play Store. Semua situs yang menawarkan Minecraft APK penuh gratis membagikan bajakan atau penipuan." },
    { q: "Berapa harga Minecraft Android?", a: "Harga resmi satu kali beli tercantum di halaman Play Store-nya untuk Indonesia dan dapat berubah saat promo resmi. Cek angka terkininya lewat tombol resmi di halaman ini - kami tidak mencetak angka yang bisa kedaluwarsa dan menyesatkanmu." },
    { q: "Kalau sudah beli, apakah bisa dipasang di HP baru tanpa bayar lagi?", a: "Bisa. Pembelian terikat pada akun Google yang dipakai membeli. Masuk dengan akun yang sama di HP baru, buka halaman Minecraft di Play Store, dan kamu bisa memasangnya kembali tanpa membeli ulang." },
    { q: "Apa beda Minecraft dan Minecraft Trial?", a: "Trial adalah demo resmi gratis: mode survival dengan batas waktu dan tanpa fitur penuh seperti multipemain bebas dan penyimpanan dunia jangka panjang. Game penuh membuka semua mode, dunia tanpa batas waktu, dan fitur daring resmi." },
    { q: "Apakah Minecraft bisa dimainkan offline?", a: "Mode pemain tunggal bisa dimainkan offline setelah game terpasang dan terverifikasi. Fitur daring seperti Realms, Marketplace, dan multipemain internet tetap butuh koneksi." },
    { q: "Anak saya menemukan situs Minecraft gratis, apa yang harus dilakukan?", a: "Jangan diunduh. Jelaskan bahwa versi itu bajakan dan sering membawa virus serta iklan tidak pantas, lalu gunakan Minecraft Trial resmi untuk mencoba. Bila keluarga memutuskan membeli, lakukan dari Play Store dengan akun keluarga agar tercatat dan aman." },
  ],
  relatedTool: null,
};

export const kucing: PillarApp = {
  slug: "kucing-apk", name: "Kucing APK", developer: "Tidak resmi - developer tidak terverifikasi",
  categorySlug: "anime-hiburan-legal", categoryName: "Anime & Hiburan Legal",
  legalStatus: "info_only",
  officialUrl: null,
  officialLabel: "",
  priceLabel: "Klaim gratis dari sumber tidak resmi - bukan penawaran resmi",
  sizeLabel: "Tidak terverifikasi",
  minAndroid: "Tidak terverifikasi",
  languages: "Klaim subtitle Bahasa Indonesia dari sumber tidak resmi",
  verifiedAt: "2026-10-18",
  versionNote: "Tidak ada versi resmi - aplikasi ini tidak ada di Play Store",
  seoTitle: "Kucing APK: Fakta, Risiko & Alternatif Anime Legal",
  seoDescription: "Kenali Kucing APK, status developer yang tidak terverifikasi, risiko keamanan, dan alternatif anime legal. CekAPK tidak menyediakan file unduhan aplikasi ini.",
  icon: "🐱", tagline: "Aplikasi anime tidak resmi yang banyak dicari - ini fakta dan risiko jujurnya.",
  intro: [
    "Kucing APK (sering disebut Kucing Pink) adalah aplikasi streaming anime pihak ketiga yang beredar di luar Google Play Store, dikenal karena mengklaim menyediakan anime dengan subtitle Bahasa Indonesia secara gratis. Pencariannya di Indonesia tinggi - lebih dari seratus ribu per bulan menurut data keyword pemilik situs ini - jadi kami membuat halaman penjelasan yang jujur tentangnya.",
    "Posisi kami jelas: halaman ini INFO SAJA. Kucing APK tidak resmi, tidak terverifikasi, dan menayangkan karya berlisensi tanpa jalur lisensi yang jelas. Kami tidak menyediakan file, tautan unduh, atau cara memasangnya. Yang kami sediakan adalah fakta, risikonya, dan alternatif legal yang benar-benar aman - karena itulah yang sebenarnya dibutuhkan pencari aplikasi ini.",
  ],
  sections: [
    { heading: "Kenapa Kucing APK Tidak Ada di Play Store?", paragraphs: [
      "Aplikasi resmi harus melewati peninjauan Google dan, untuk layanan streaming, membuktikan hak tayang kontennya. Kucing APK beredar hanya sebagai berkas dari situs-situs pihak ketiga dengan nama dan kemasan yang berubah-ubah, tanpa developer yang bisa diverifikasi identitas dan tanggung jawabnya. Ukuran dan klaim fitur yang beredar berasal dari situs-situs itu sendiri - tidak ada sumber resmi yang bisa mengonfirmasi atau menjaminnya.",
      "Artinya sederhana: tidak ada pihak yang bertanggung jawab bila aplikasi berubah perilaku, menampilkan iklan berbahaya, atau berhenti berfungsi. Dalam dunia aplikasi, ketiadaan penanggung jawab adalah risiko itu sendiri, apalagi untuk aplikasi yang meminta dipasang dari luar toko resmi.",
    ]},
    { heading: "Risiko Nyata Memasang Aplikasi Seperti Ini", paragraphs: [
      "Pertama, keamanan perangkat: berkas dari luar Play Store tidak melewati Google Play Protect dengan cara yang sama, dan aplikasi streaming bajakan adalah salah satu kategori yang paling sering disusupi iklan agresif, pengumpul data, dan muatan berbahaya oleh pihak yang mengemas ulang berkasnya. Kamu tidak pernah tahu berkas yang kamu terima sama dengan yang dibuat pembuat aslinya.",
      "Kedua, hukum dan etika: anime adalah karya berlisensi; menayangkannya tanpa izin melanggar hak cipta, dan platformnya bisa hilang sewaktu-waktu beserta riwayat tontonanmu. Ketiga, privasi: tidak ada kebijakan privasi yang bisa diaudit, sehingga kamu tidak tahu data apa yang dikumpulkan dan ke mana dikirim. Keempat, kualitas: server tidak resmi sering lambat, tautan mati, dan subtitle tidak konsisten.",
    ]},
    { heading: "Alternatif Legal yang Benar-Benar Ada", paragraphs: [
      "Untuk anime subtitle Indonesia, pilihan resmi terkuat saat ini adalah Bstation (Bilibili) - gratis dengan iklan untuk mayoritas katalog, berlisensi, dan aman dari Play Store; halaman lengkapnya ada di situs kami. Crunchyroll adalah layanan anime legal global dengan katalog sangat besar. Sebagian judul juga tayang resmi dan gratis lewat kanal distributor di YouTube, dan layanan seperti iQIYI, Vidio, serta Netflix membawa judul-judul tertentu untuk Indonesia.",
      "Kami tahu keberatan yang biasa muncul: katalog legal terbagi-bagi dan episode terbaru kadang berbayar. Itu benar dan kami tidak menutupinya. Tetapi jawaban atas keberatan itu adalah memilih layanan legal yang paling sesuai dengan judul favoritmu - bukan memasang berkas tanpa penanggung jawab di HP yang sama dengan aplikasi perbankan dan WhatsApp keluargamu.",
    ]},
  ],
  features: [
    { title: "Klaim: Streaming Anime Subtitle Indonesia", desc: "Itu klaim dari situs pihak ketiga yang membagikannya - bukan fitur yang bisa kami verifikasi dari sumber resmi, dan legalitas penayangannya tidak jelas." },
    { title: "Klaim: Gratis Tanpa Iklan Resmi", desc: "Aplikasi tanpa model bisnis resmi biasanya dibiayai iklan pihak ketiga yang tidak terkendali - yang sering menjadi sumber masalah keamanan." },
    { title: "Klaim: Ukuran Ringan", desc: "Angka ukuran yang beredar berasal dari situs pembagi berkas dan tidak terverifikasi. Ukuran kecil tidak berarti aman; yang menentukan adalah sumber dan penanggung jawabnya." },
  ],
  permissions: [
    { name: "Izin Instal dari Sumber Tidak Dikenal", meaning: "Agar berkas di luar Play Store bisa dipasang, HP memintamu mengizinkan instalasi dari sumber tidak dikenal - gerbang keamanan Android yang memang dirancang untuk memperingatkanmu. Mengaktifkan ini untuk aplikasi tanpa penanggung jawab adalah risiko terbesarnya." },
    { name: "Izin di Dalam Aplikasi", meaning: "Karena tidak ada halaman resmi di Play Store, tidak ada daftar izin terstandar yang bisa diperiksa publik. Aplikasi resmi selalu bisa kamu periksa izinnya sebelum memasang; aplikasi seperti ini tidak." },
  ],
  safetyParagraphs: [
    "Jawaban jujur kami: Kucing APK tidak bisa kami nyatakan aman, dan tidak ada pihak tepercaya yang bisa. Developernya tidak terverifikasi, distribusinya di luar toko resmi, kontennya bajakan, dan berkasnya mudah dikemas ulang oleh siapa pun. Kombinasi empat hal itu adalah definisi aplikasi berisiko tinggi dalam panduan keamanan kami.",
    "Bila kamu atau keluargamu sudah terlanjur memasangnya, langkah bijaknya: hapus aplikasinya, matikan kembali izin instal dari sumber tidak dikenal di pengaturan keamanan HP, jalankan pemindaian Google Play Protect, dan ganti kata sandi penting bila ada perilaku aneh. Untuk menonton anime, pindahlah ke alternatif legal di bawah - mayoritas judul populer tersedia gratis secara resmi.",
  ],
  pros: ["Tidak ada kelebihan yang bisa kami verifikasi dari sumber resmi - klaimnya berasal dari situs pembagi berkas itu sendiri"],
  cons: ["Tidak resmi dan tidak ada di Play Store - tanpa peninjauan Google", "Developer tidak terverifikasi dan tidak ada pihak yang bertanggung jawab", "Konten bajakan: melanggar hak cipta pemegang lisensi anime", "Berkas mudah disusupi saat dikemas ulang pihak ketiga", "Tidak ada kebijakan privasi yang bisa diaudit", "Bisa hilang sewaktu-waktu beserta riwayat tontonanmu"],
  alternatives: [
    { name: "Bstation (Bilibili)", slug: "bstation", note: "Alternatif utama kami: anime berlisensi, subtitle Indonesia, gratis dengan iklan, resmi di Play Store." },
    { name: "Crunchyroll (di luar situs ini)", slug: null, note: "Layanan anime legal global berkatalog sangat besar; cek subtitle dan ketersediaan judul untuk Indonesia di aplikasinya." },
    { name: "YouTube", slug: "youtube", note: "Sebagian distributor menayangkan anime resmi gratis di kanal YouTube mereka untuk wilayah tertentu." },
  ],
  faqs: [
    { q: "Apakah Kucing APK aman?", a: "Tidak bisa dinyatakan aman. Aplikasinya tidak resmi, developernya tidak terverifikasi, tidak melewati peninjauan Play Store, dan berkasnya beredar dari situs pihak ketiga yang bisa mengemas ulangnya. Kami menyarankan tidak memasangnya dan memakai alternatif legal seperti Bstation." },
    { q: "Kenapa situs ini tidak menyediakan link download Kucing APK?", a: "Karena kami hanya menautkan ke sumber resmi atau yang bisa kami verifikasi. Menyediakan tautan unduh aplikasi bajakan tanpa penanggung jawab akan membahayakan pengunjung kami dan melanggar prinsip situs ini. Yang bisa kami bantu adalah fakta dan alternatif amannya." },
    { q: "Apakah menonton di Kucing APK melanggar hukum?", a: "Menayangkan dan menyebarkan karya berlisensi tanpa izin adalah pelanggaran hak cipta, dan layanan seperti ini beroperasi tanpa lisensi. Posisi penonton pun berada di wilayah abu-abu yang tidak perlu diambil risikonya, karena alternatif legal gratis tersedia untuk mayoritas judul populer." },
    { q: "Di mana bisa nonton anime subtitle Indonesia yang legal dan gratis?", a: "Bstation adalah pilihan utama: berlisensi, subtitle Indonesia, gratis dengan iklan, resmi di Play Store - halamannya ada di situs kami. Pilihan lain: kanal distributor resmi di YouTube dan layanan seperti iQIYI atau Vidio untuk judul tertentu." },
    { q: "Saya sudah memasang Kucing APK, harus bagaimana?", a: "Hapus aplikasinya, matikan izin instal dari sumber tidak dikenal, jalankan pemindaian Play Protect dari Play Store, dan perhatikan perilaku HP beberapa hari. Bila ada tanda aneh seperti iklan muncul di luar aplikasi atau baterai terkuras tidak wajar, cadangkan data penting dan pertimbangkan reset perangkat." },
    { q: "Kenapa aplikasi seperti ini tetap banyak dicari?", a: "Karena menjanjikan semua gratis dalam satu tempat, sementara katalog legal terbagi antar layanan dan sebagian episode terbaru berbayar. Janjinya mudah dipahami - tetapi biaya tersembunyinya dibayar dengan keamanan perangkat dan data penggunanya." },
  ],
  relatedTool: null,
};
