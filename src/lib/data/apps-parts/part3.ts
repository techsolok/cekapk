import type { PillarApp } from "../content-types";

export const youtube: PillarApp = {
  slug: "youtube", name: "YouTube", developer: "Google LLC",
  categorySlug: "video-foto", categoryName: "Video & Foto",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.google.android.youtube",
  officialLabel: "Buka YouTube di Play Store",
  priceLabel: "Gratis (ada iklan; YouTube Premium berbayar)",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia & banyak bahasa lain",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "▶️", tagline: "Video panjang, tutorial, musik, dan Shorts dalam satu aplikasi resmi Google.",
  intro: [
    "YouTube adalah platform video terbesar di dunia milik Google, dan di Indonesia menjadi sumber utama tutorial, berita, hiburan, dakwah, pelajaran sekolah, sampai siaran langsung. Berbeda dari aplikasi video pendek murni, kekuatan YouTube ada di video panjang dan pencarian: hampir semua pertanyaan praktis punya video jawabannya.",
    "Halaman ini merangkum fakta resmi YouTube, perbedaan versi gratis dan Premium dengan jujur, izin, dan risiko aplikasi pengunduh tidak resmi. Tombol hanya menuju Play Store - kami tidak menyediakan APK YouTube mod atau pengunduh yang melanggar ketentuan layanan.",
  ],
  sections: [
    { heading: "Gratis dengan Iklan vs YouTube Premium", paragraphs: [
      "YouTube gratis ditonton dengan iklan di awal dan di tengah video. YouTube Premium adalah langganan resmi yang menghapus iklan, memungkinkan unduhan resmi untuk ditonton offline di dalam aplikasi, putar di latar belakang, dan termasuk YouTube Music Premium. Harga dan paket keluarga/pelajar resmi selalu yang tercantum di aplikasi dan situs YouTube.",
      "Karena Premium berbayar, beredar luas aplikasi seperti YouTube Vanced dan penerusnya serta berbagai mod. Semua itu aplikasi tidak resmi yang melanggar ketentuan YouTube, beberapa sudah dihentikan pengembangannya, dan file lanjutannya dari situs acak berisiko keamanan serta hukum. Alternatif legal untuk menonton hemat adalah mengunduh video lewat fitur resmi di aplikasi untuk tontonan offline pribadi.",
    ]},
    { heading: "Shorts, Video Panjang, dan Live", paragraphs: [
      "YouTube kini punya tiga wajah: video panjang tradisional, Shorts (video vertikal pendek pesaing TikTok dan Reels), dan siaran langsung. Bagi penonton, ini berarti satu aplikasi untuk semua format. Bagi kreator, YouTube menawarkan program monetisasi paling mapan di industri lewat pendapatan iklan bagi channel yang memenuhi syarat program partner.",
      "Kontrol untuk keluarga tersedia lewat YouTube Kids - aplikasi resmi terpisah dengan konten tersaring untuk anak - serta mode terbatas dan pengaturan waktu layar melalui Family Link dari Google. Untuk anak kecil, YouTube Kids jauh lebih tepat daripada aplikasi utama.",
    ]},
    { heading: "Menghemat Data dan Penyimpanan", paragraphs: [
      "Video adalah pemakan kuota terbesar. Di aplikasi resmi kamu bisa menurunkan kualitas putar, membatasi kualitas saat memakai data seluler, dan mengunduh video lewat Wi-Fi untuk ditonton offline - cara legal dan aman dibanding pengunduh pihak ketiga. Unduhan resmi tetap berada di dalam aplikasi dan menghormati aturan kreator.",
      "Untuk kreator yang mengunggah, gunakan Wi-Fi dan pengingat jadwal unggah di YouTube Studio - aplikasi resmi pendamping untuk mengelola channel, membaca analitik, dan membalas komentar.",
    ]},
  ],
  features: [
    { title: "Perpustakaan Video Terbesar", desc: "Tutorial, berita, musik, pendidikan, dan hiburan dalam skala yang tidak tertandingi platform lain." },
    { title: "Shorts", desc: "Video vertikal pendek dengan alat remix audio dari video lain sesuai izin kreatornya." },
    { title: "Unduhan Resmi Offline", desc: "Menyimpan video di dalam aplikasi untuk ditonton tanpa internet - fitur resmi yang menghormati aturan platform." },
    { title: "Siaran Langsung & Premiere", desc: "Live streaming dengan chat penonton dan penayangan perdana terjadwal untuk kreator." },
    { title: "Subtitle & Terjemahan", desc: "Teks otomatis dan subtitle kreator dalam banyak bahasa, termasuk Bahasa Indonesia di banyak video." },
    { title: "YouTube Kids (resmi, terpisah)", desc: "Aplikasi tersaring khusus anak dengan kontrol orang tua, pendamping yang tepat untuk penonton kecil." },
  ],
  permissions: [
    { name: "Mikrofon & Kamera", meaning: "Untuk merekam dan mengunggah video serta siaran langsung dari HP. Penonton biasa jarang membutuhkannya aktif terus." },
    { name: "Penyimpanan / Foto & Video", meaning: "Memilih video dari galeri untuk diunggah dan mengelola unduhan resmi di perangkat." },
    { name: "Notifikasi", meaning: "Kabar video baru dari channel langganan dan siaran langsung. Atur per channel agar tidak berlebihan." },
    { name: "Akun Google", meaning: "YouTube memakai akun Google untuk langganan, riwayat, dan rekomendasi. Keamanan akun Google-mu adalah keamanan YouTube-mu." },
  ],
  safetyParagraphs: [
    "YouTube resmi dari Google di Play Store adalah jalur teraman. Yang berbahaya adalah ekosistem mod-nya: Vanced dan mod sejenis diedarkan lewat situs dan berkas acak setelah pengembangan resminya berhenti, sehingga kamu tidak pernah tahu siapa yang mengubah berkas yang kamu pasang. Beberapa mod juga meminta login akun Google di luar aplikasi resmi - risiko langsung terhadap seluruh akun Google-mu.",
    "Dari sisi konten, aktifkan mode terbatas untuk meminimalkan konten dewasa, dampingi anak lewat YouTube Kids dan Family Link, dan kelola riwayat tontonan karena rekomendasi YouTube belajar darinya. Komentar dan deskripsi video kadang memuat tautan penipuan kripto atau hadiah palsu - jangan pernah mengirim uang atau kode OTP dari tautan semacam itu.",
  ],
  pros: ["Koleksi video dan tutorial terlengkap untuk belajar apa pun", "Unduhan offline resmi tanpa aplikasi tambahan", "Monetisasi kreator paling mapan lewat program partner", "Ada YouTube Kids resmi untuk anak", "Subtitle Bahasa Indonesia di sangat banyak video"],
  cons: ["Iklan versi gratis semakin sering dan panjang", "Boros kuota bila kualitas tidak diatur", "Konten clickbait dan menyesatkan tetap ada - perlu literasi penonton", "Rekomendasi bisa membentuk gelembung topik yang sempit", "Mod tidak resmi yang beredar sangat berisiko keamanan akun Google"],
  alternatives: [
    { name: "TikTok", slug: "tiktok", note: "Unggul untuk hiburan pendek dan penemuan tren, tetapi bukan pengganti tutorial panjang YouTube." },
    { name: "Instagram", slug: "instagram", note: "Reels untuk video pendek visual dan komunitas pengikut yang sudah kamu bangun." },
    { name: "Bstation (Bilibili)", slug: "bstation", note: "Untuk anime dan konten kreator Asia berlisensi dengan subtitle Indonesia." },
  ],
  faqs: [
    { q: "Apakah YouTube Premium sepadan?", a: "Tergantung pemakaianmu. Bila kamu menonton setiap hari, sering mendengar musik, dan terganggu iklan, Premium memberi tanpa iklan, putar latar, unduhan resmi, dan YouTube Music. Bila pemakaianmu sesekali, versi gratis plus unduhan resmi saat Wi-Fi biasanya sudah cukup." },
    { q: "Bagaimana cara download video YouTube untuk offline?", a: "Cara resmi dan legal: gunakan tombol Unduh di aplikasi YouTube pada video yang mengizinkannya; video tersimpan di dalam aplikasi untuk ditonton offline. Mengunduh dengan situs atau aplikasi pihak ketiga melanggar ketentuan YouTube dan berisiko malware, kecuali untuk videomu sendiri lewat YouTube Studio." },
    { q: "Apakah YouTube Vanced aman?", a: "Vanced adalah aplikasi tidak resmi yang pengembangannya sudah dihentikan. Berkas lanjutannya yang beredar di situs acak tidak bisa diverifikasi siapa pengubahnya, dan sebagian meminta login Google di luar jalur resmi. Kami tidak menyarankan memasangnya; gunakan aplikasi resmi dan fitur unduhan bawaannya." },
    { q: "Kenapa video YouTube buffering terus?", a: "Biasanya kualitas putar terlalu tinggi untuk jaringanmu. Turunkan resolusi lewat ikon gerigi, batasi kualitas data seluler di pengaturan, atau unduh lebih dulu lewat Wi-Fi. Membersihkan cache aplikasi juga membantu di HP dengan ruang sempit." },
    { q: "Bagaimana membuat YouTube aman untuk anak?", a: "Gunakan YouTube Kids untuk anak kecil, aktifkan mode terbatas di aplikasi utama, dan kelola lewat Family Link: batas waktu, filter usia, dan riwayat. Tetap dampingi, karena tidak ada filter yang sempurna." },
    { q: "Bisakah menonton YouTube tanpa iklan secara gratis dan legal?", a: "Tidak ada cara resmi tanpa iklan selain Premium, kecuali video tertentu yang memang tidak dimonetisasi kreatornya. Alat pemblokir dan mod pihak ketiga melanggar ketentuan dan sebagian berisiko keamanan. Pilihan jujurnya: gratis dengan iklan, atau Premium berbayar." },
  ],
  relatedTool: null,
};

export const spotify: PillarApp = {
  slug: "spotify", name: "Spotify", developer: "Spotify AB",
  categorySlug: "musik", categoryName: "Musik",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.spotify.music",
  officialLabel: "Buka Spotify di Play Store",
  priceLabel: "Gratis (dengan iklan) / Premium berbayar",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia & banyak bahasa lain",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "🎧", tagline: "Streaming musik dan podcast legal terbesar, gratis dengan iklan atau Premium.",
  intro: [
    "Spotify adalah layanan streaming musik dan podcast berlisensi: kamu tidak membeli lagu satu per satu, melainkan menyewa akses ke katalog raksasa selama berlangganan atau selama memakai versi gratis beriklan. Di Indonesia Spotify adalah pintu utama mendengarkan musik secara legal dibanding era unduhan MP3 acak.",
    "Justru karena Premium-nya berbayar, pencarian Spotify mod dan premium gratis sangat tinggi - dan sangat berisiko. Halaman ini menjelaskan perbedaan resminya dengan jujur, fitur, izin, dan cara mendengarkan hemat, dengan tombol hanya ke Play Store.",
  ],
  sections: [
    { heading: "Gratis vs Premium: Perbedaan yang Sebenarnya", paragraphs: [
      "Versi gratis di HP memiliki batasan: iklan audio, mode acak di banyak daftar putar, jumlah lewati lagu terbatas, dan kualitas audio standar. Premium menghapus iklan, membuka pilih lagu bebas, lewati tanpa batas, kualitas lebih tinggi, dan unduhan untuk didengar offline di dalam aplikasi. Harga paket individu, berdua, keluarga, dan pelajar resmi selalu yang tampil di aplikasi dan situs Spotify Indonesia.",
      "Satu akun Premium keluarga hanya untuk anggota serumah sesuai ketentuan. Membeli akun premium murah dari penjual acak di media sosial biasanya adalah akun curian atau hasil penyalahgunaan kartu, yang sewaktu-waktu mati dan bisa menyeret akunmu.",
    ]},
    { heading: "Kenapa Spotify Mod Bukan Jawaban", paragraphs: [
      "Spotify mod atau premium unlocked adalah aplikasi resmi yang diubah pihak ketiga agar fitur berbayar terbuka. Selain melanggar ketentuan dan hak lisensi musisi, akun yang terdeteksi memakai mod bisa dibatasi atau ditutup, dan berkas mod dari situs acak adalah pembawa malware yang menyasar tepat orang yang ingin serba gratis.",
      "Alternatif yang benar-benar gratis dan legal memang ada batasnya, dan itu wajar: versi gratis resmi, masa percobaan resmi bila ditawarkan, atau paket pelajar resmi untuk yang memenuhi syarat. Di luar itu, janji premium gratis permanen hampir selalu berarti bajakan atau penipuan.",
    ]},
    { heading: "Podcast dan Konten Bahasa Indonesia", paragraphs: [
      "Selain musik, Spotify adalah rumah podcast Indonesia terbesar: komedi, horor, edukasi, agama, bisnis, dan berita harian. Banyak podcast eksklusif hanya ada di Spotify. Untuk pendengar, menemukan podcast bagus sering lebih berharga daripada perbedaan kualitas audio.",
      "Untuk menghemat kuota, unduh lagu dan episode lewat Wi-Fi untuk offline (Premium), atau turunkan kualitas streaming dan aktifkan penghemat data di pengaturan bagi pengguna gratis. Mode offline penuh adalah fitur Premium; pengguna gratis mengandalkan streaming.",
    ]},
  ],
  features: [
    { title: "Katalog Musik Berlisensi Raksasa", desc: "Jutaan lagu dari label besar sampai musisi independen Indonesia, dirilis serentak resmi." },
    { title: "Playlist & Rekomendasi Pintar", desc: "Discover Weekly, Release Radar, dan playlist editorial yang belajar dari selera dengarmu." },
    { title: "Podcast Lengkap", desc: "Podcast Indonesia dan global, termasuk judul eksklusif, dengan kecepatan putar dan unduhan episode untuk pelanggan." },
    { title: "Unduhan Offline (Premium)", desc: "Simpan lagu, album, dan episode di dalam aplikasi untuk didengar tanpa internet." },
    { title: "Lirik & Antri Bersama", desc: "Lirik bergulir di banyak lagu dan sesi grup untuk mendengarkan bersama teman dari jarak jauh." },
    { title: "Lintas Perangkat & Connect", desc: "Lanjutkan mendengar dari HP ke laptop, TV, dan speaker dengan satu akun." },
  ],
  permissions: [
    { name: "Penyimpanan", meaning: "Untuk menyimpan unduhan offline (Premium) dan cache musik agar putar ulang hemat data." },
    { name: "Mikrofon", meaning: "Hanya untuk perintah suara di dalam aplikasi bila kamu memakainya; tidak wajib untuk mendengarkan." },
    { name: "Notifikasi", meaning: "Kabar rilis baru dari artis yang kamu ikuti dan rekomendasi. Bisa dimatikan sepenuhnya." },
    { name: "Perangkat di Sekitar / Bluetooth", meaning: "Untuk menemukan speaker dan perangkat Spotify Connect di jaringan yang sama." },
  ],
  safetyParagraphs: [
    "Spotify resmi dari Play Store aman. Risiko di sekelilingnya ada dua: berkas mod bajakan dan pasar akun premium curian. Keduanya melanggar ketentuan, dan keduanya menempatkan akun serta perangkatmu sebagai taruhannya. Spotify juga rutin menindak akun yang memakai klien tidak resmi.",
    "Amankan akun dengan kata sandi unik dan verifikasi email, dan waspadai email atau pesan hadiah Premium gratis yang meminta login di situs mirip Spotify - itu phishing. Masuk selalu dari aplikasi resmi atau dengan mengetik alamat situsnya sendiri, bukan dari tautan pesan.",
  ],
  pros: ["Cara legal utama mendengarkan musik dengan katalog sangat besar", "Versi gratis resmi sudah fungsional untuk kebanyakan pendengar", "Podcast Indonesia terlengkap termasuk yang eksklusif", "Rekomendasi dan playlist pintar yang akurat", "Ringan dan mulus berpindah antar perangkat"],
  cons: ["Versi gratis di HP membatasi pilih lagu dan jumlah lewati", "Unduhan offline terkunci di Premium", "Kualitas audio tertinggi masih di bawah layanan khusus audiofil", "Akun Premium murah dari penjual acak rawan mati mendadak", "Sebagian lagu bisa hilang saat lisensi wilayah berubah"],
  alternatives: [
    { name: "YouTube", slug: "youtube", note: "YouTube Music adalah alternatif satu paket dengan video musik; versi gratisnya lebih fleksibel memilih lagu, dengan iklan video." },
    { name: "Bstation (Bilibili)", slug: "bstation", note: "Bukan untuk musik, tetapi bila kebutuhanmu sebenarnya hiburan video berlisensi, ini pelengkap yang aman." },
  ],
  faqs: [
    { q: "Bagaimana cara dapat Spotify Premium gratis?", a: "Yang legal hanya masa percobaan resmi bila Spotify menawarkannya untuk pengguna baru dan paket pelajar resmi bagi yang terverifikasi. Di luar itu, premium gratis berarti mod bajakan atau akun curian - melanggar ketentuan, akun bisa ditutup, dan berkasnya berisiko malware. Versi gratis resmi adalah pilihan aman tanpa biaya." },
    { q: "Apakah Spotify mod aman untuk akun saya?", a: "Tidak. Mod adalah aplikasi yang diubah pihak ketiga; Spotify menindak penggunaan klien tidak resmi, dan berkas mod dari situs acak sering disusupi. Sekali akunmu ditandai, kamu bisa kehilangan semua playlist dan riwayat yang dibangun bertahun-tahun." },
    { q: "Kenapa lagu favorit saya hilang dari Spotify?", a: "Biasanya karena lisensi wilayah atau kontrak label berubah, atau lagu ditarik pemilik haknya. Ini terjadi di semua layanan streaming legal. Unduhan offline lagu tersebut juga akan berhenti bisa diputar." },
    { q: "Bagaimana cara menghemat kuota di Spotify?", a: "Turunkan kualitas audio di pengaturan saat memakai data seluler, aktifkan penghemat data, dan bila kamu Premium, unduh playlist utama lewat Wi-Fi untuk offline. Untuk pengguna gratis, mendengar lewat Wi-Fi tetap cara paling hemat." },
    { q: "Bisakah satu akun Premium dipakai banyak orang?", a: "Paket Keluarga memang untuk beberapa anggota serumah dengan akun masing-masing, sesuai ketentuan Spotify. Berbagi satu akun individu ke banyak orang melanggar ketentuan dan akan sering bentrok saat dipakai bersamaan." },
    { q: "Apakah Spotify bisa didengarkan offline tanpa Premium?", a: "Tidak untuk musik. Unduhan offline adalah fitur Premium. Sebagian podcast punya ketentuan unduh yang bisa berbeda di aplikasi, tetapi jangan mengandalkan celah tidak resmi - ketentuannya dapat berubah dan cara pihak ketiga tetap melanggar aturan." },
  ],
  relatedTool: null,
};

export const canva: PillarApp = {
  slug: "canva", name: "Canva", developer: "Canva",
  categorySlug: "produktivitas", categoryName: "Produktivitas",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.canva.editor",
  officialLabel: "Buka Canva di Play Store",
  priceLabel: "Gratis (ada Canva Pro berbayar)",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia & banyak bahasa lain",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "🎨", tagline: "Desain poster, presentasi, dan konten media sosial tanpa keahlian desain.",
  intro: [
    "Canva adalah platform desain seret-dan-lepas (drag and drop) yang membuat orang tanpa latar desain bisa membuat poster, presentasi, undangan, logo sederhana, dan konten media sosial yang rapi dari template. Di Indonesia Canva dipakai guru, siswa, UMKM, admin komunitas, dan kantor kecil.",
    "Halaman ini menjelaskan perbedaan Canva gratis dan Pro dengan jujur, fitur utamanya, izin aplikasi, dan catatan lisensi yang sering dilupakan pengguna gratis. Tombol hanya menuju Play Store; desainmu sendiri dikerjakan di aplikasi dan situs resmi Canva, bukan lewat jasa akun Pro abal-abal.",
  ],
  sections: [
    { heading: "Gratis vs Pro vs Pendidikan", paragraphs: [
      "Canva gratis sudah mencakup jutaan template, elemen dasar, dan penyimpanan cloud untuk proyek pribadi serta usaha kecil. Canva Pro menambah perpustakaan premium penuh, penghapus latar sekali klik, ubah ukuran ajaib ke banyak format, kit merek, dan ruang besar. Ada juga Canva untuk Pendidikan yang gratis bagi guru dan siswa yang terverifikasi sekolahnya - jalur resmi yang sering tidak diketahui.",
      "Yang harus dihindari adalah jasa akun Pro murah dari penjual acak dan undangan tim asing yang beredar di media sosial. Akun seperti itu sering hasil penyalahgunaan, bisa dicabut sewaktu-waktu bersama desainmu di dalamnya, dan membagikan ruang tim dengan orang asing berarti desainmu bisa dilihat dan disalin.",
    ]},
    { heading: "Lisensi Elemen: Yang Sering Salah Kaprah", paragraphs: [
      "Tidak semua yang ada di Canva bebas dipakai untuk apa pun. Elemen dan foto berlisensi punya ketentuan: umumnya aman untuk konten dan pemasaran, tetapi dilarang menjual elemen mentahnya sebagai stok, mencetak desain yang isinya hampir seluruhnya elemen berlisensi untuk dijual sebagai produk tersendiri, atau mendaftarkan desain berbasis template sebagai merek dagang tanpa perubahan berarti.",
      "Untuk logo dan identitas usaha jangka panjang, gunakan elemen sederhana dan font yang aman, buat kombinasi yang benar-benar khas, dan simpan catatan desain finalmu. Bila ragu untuk pemakaian komersial besar, baca ringkasan lisensi resmi Canva atau konsultasi singkat akan jauh lebih murah daripada sengketa merek.",
    ]},
    { heading: "Canva di HP vs di Komputer", paragraphs: [
      "Aplikasi HP cocok untuk konten cepat: poster pengumuman, story, dan suntingan ringan dari template. Pekerjaan presisi - presentasi panjang, dokumen banyak halaman, dan pengelolaan file besar - lebih nyaman di situs Canva lewat komputer. Keduanya tersinkron dari akun yang sama.",
      "Karena berbasis cloud, Canva membutuhkan internet yang layak. Untuk daerah dengan koneksi terbatas, siapkan desain saat ada Wi-Fi, unduh hasil akhir dalam format yang dibutuhkan (PNG untuk gambar, PDF untuk cetak/dokumen, MP4 untuk video), dan simpan salinan lokal hasil finalmu.",
    ]},
  ],
  features: [
    { title: "Jutaan Template Siap Edit", desc: "Poster, presentasi, story, undangan, resume, dan dokumen dengan tata letak profesional yang tinggal diganti isinya." },
    { title: "Editor Seret & Lepas", desc: "Tidak perlu keahlian desain: teks, foto, elemen, dan warna diatur dengan sentuhan atau mouse." },
    { title: "Penghapus Latar (Pro)", desc: "Memisahkan subjek foto dari latar dalam sekali klik untuk foto produk dan profil." },
    { title: "Ubah Ukuran Ajaib (Pro)", desc: "Satu desain diubah ke format story, feed, presentasi, dan cetak tanpa menyusun ulang dari nol." },
    { title: "Kolaborasi & Berbagi", desc: "Mengundang anggota tim atau guru/siswa untuk melihat dan mengedit desain yang sama lewat tautan." },
    { title: "Unduh Banyak Format", desc: "Ekspor PNG, JPG, PDF standar/cetak, MP4, dan GIF sesuai kebutuhan publikasi." },
  ],
  permissions: [
    { name: "Penyimpanan / Foto & Video", meaning: "Mengunggah fotomu sendiri ke desain dan menyimpan hasil unduhan ke perangkat." },
    { name: "Kamera", meaning: "Memotret langsung untuk dimasukkan ke desain tanpa pindah aplikasi." },
    { name: "Notifikasi", meaning: "Kabar kolaborasi, komentar tim, dan info Canva. Aman diatur seperlunya." },
    { name: "Akun & Internet", meaning: "Canva bekerja dengan akun dan penyimpanan cloud; desainmu tersimpan di akun, bukan hanya di HP." },
  ],
  safetyParagraphs: [
    "Canva resmi dari Play Store dan situs resminya aman. Risiko khas Canva bukan malware aplikasi, melainkan akun: jasa Pro murah, undangan tim dari orang asing, dan kata sandi yang dipakai ulang. Bila akunmu diambil alih, seluruh desain dan aset usahamu ikut hilang - gunakan kata sandi unik dan verifikasi email.",
    "Dari sisi karya, hormati lisensi elemen dan jangan mengunduh aset berbayar lewat situs pembocor template premium. Hasil desain yang akan dipakai komersial sebaiknya memakai elemen yang jelas statusnya dan kamu simpan bukti ekspor finalnya.",
  ],
  pros: ["Pemula bisa menghasilkan desain rapi dalam menit", "Template Bahasa Indonesia dan momen lokal banyak tersedia", "Gratisnya sungguh fungsional, bukan sekadar pemanis", "Ada jalur Pendidikan gratis resmi untuk guru dan siswa terverifikasi", "Tersinkron HP dan komputer dari satu akun"],
  cons: ["Fitur penghemat waktu terbaik terkunci di Pro", "Butuh internet - pekerjaan offline sangat terbatas", "Lisensi elemen punya batas yang harus dipahami untuk jualan", "Desain berbasis template populer bisa mirip dengan milik orang lain", "Aplikasi HP kurang presisi untuk dokumen panjang"],
  alternatives: [
    { name: "CapCut", slug: "capcut", note: "Untuk konten bergerak dan video pendek, CapCut adalah pasangan alami Canva yang statis." },
    { name: "Instagram", slug: "instagram", note: "Tempat menerbitkan hasil desainmu sebagai feed, carousel edukasi, dan story." },
  ],
  faqs: [
    { q: "Apakah Canva gratis bisa untuk jualan?", a: "Umumnya bisa untuk materi pemasaran dan konten usaha, mengikuti lisensi elemen yang dipakai. Yang dilarang antara lain menjual elemen mentah sebagai stok dan memakai desain yang isinya hampir seluruhnya elemen berlisensi sebagai produk cetak tersendiri. Baca ringkasan lisensi Canva untuk kasusmu sebelum produksi massal." },
    { q: "Bagaimana cara dapat Canva Pro gratis?", a: "Jalur resminya adalah Canva untuk Pendidikan bagi guru/siswa terverifikasi, program nonprofit resmi, dan masa percobaan resmi bila ditawarkan. Jasa akun Pro murah dari penjual acak rawan dicabut dan membahayakan desainmu. Untuk kebanyakan UMKM, versi gratis resmi sudah mencukupi." },
    { q: "Kenapa desain saya tidak bisa diunduh?", a: "Penyebab umum: koneksi terputus saat ekspor, elemen yang lisensinya berubah, atau penyimpanan HP penuh. Coba unduh ulang dengan format lain (misalnya PNG dulu), kosongkan ruang, dan periksa tidak ada elemen yang tertandai bermasalah di editor." },
    { q: "Apakah logo dari Canva bisa didaftarkan sebagai merek?", a: "Hati-hati: desain yang sangat berbasis template dan elemen stok umumnya tidak cukup khas untuk merek dagang dan Canva sendiri membatasi pemakaian elemen stok untuk logo yang didaftarkan. Untuk merek serius, jadikan Canva titik awal lalu sempurnakan menjadi karya khas, atau gunakan desainer." },
    { q: "Canva bisa dipakai tanpa internet?", a: "Sangat terbatas. Canva adalah layanan cloud: membuka, menyunting, dan mengekspor desain membutuhkan internet. Siapkan dan unduh hasil akhir saat ada koneksi baik, terutama sebelum acara atau deadline cetak." },
    { q: "Di mana desain Canva saya tersimpan?", a: "Di akun Canva-mu (cloud), sehingga bisa dibuka dari HP dan komputer dengan akun yang sama. Karena itu keamanan akun sangat penting, dan untuk hasil final yang kritis simpan juga salinan ekspornya di perangkatmu." },
  ],
  relatedTool: null,
};
