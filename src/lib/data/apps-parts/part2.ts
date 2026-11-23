import type { PillarApp } from "../content-types";

export const whatsapp: PillarApp = {
  slug: "whatsapp", name: "WhatsApp", developer: "Meta Platforms, Inc. (WhatsApp LLC)",
  categorySlug: "sosial", categoryName: "Sosial",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.whatsapp",
  officialLabel: "Buka WhatsApp di Play Store",
  priceLabel: "Gratis",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia & banyak bahasa lain",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "💬", tagline: "Aplikasi pesan utama Indonesia - dan target APK palsu paling sering.",
  intro: [
    "WhatsApp adalah aplikasi pesan dan panggilan gratis yang menjadi alat komunikasi utama di Indonesia - untuk keluarga, sekolah, kantor, komunitas, sampai layanan pelanggan bisnis. Karena hampir semua orang memakainya, WhatsApp juga menjadi sasaran nomor satu aplikasi palsu dan versi modifikasi.",
    "Halaman ini menjelaskan fakta resmi WhatsApp, izin-izinnya, cara membedakan yang asli dari yang palsu, dan kenapa kamu tidak boleh memakai WhatsApp mod. Tombol di halaman ini hanya menuju Play Store. Kami tidak menyediakan file APK WhatsApp dalam bentuk apa pun.",
  ],
  sections: [
    { heading: "Fitur WhatsApp yang Dipakai Sehari-hari", paragraphs: [
      "Inti WhatsApp adalah chat pribadi dan grup dengan enkripsi end-to-end, panggilan suara dan video, pesan suara, serta berbagi foto, video, dokumen, dan lokasi. Status memungkinkan berbagi pembaruan 24 jam, dan Channel memberi cara mengikuti pengumuman dari organisasi serta kreator.",
      "Untuk usaha kecil, WhatsApp Business adalah aplikasi resmi terpisah dari Meta dengan katalog produk, pesan sambutan, label pelanggan, dan balasan cepat. Keduanya gratis dan resmi - tidak perlu pihak ketiga untuk mendapatkan fitur bisnis.",
    ]},
    { heading: "Bahaya WhatsApp Mod: GB WhatsApp, WA Plus, dan Sejenisnya", paragraphs: [
      "GB WhatsApp, YoWhatsApp, WA Plus, dan nama mod lain BUKAN produk Meta. Mereka adalah aplikasi tidak resmi yang dibuat dengan mengubah WhatsApp asli. Risikonya nyata: akun bisa diblokir sementara sampai permanen oleh WhatsApp karena melanggar ketentuan, enkripsi tidak bisa diverifikasi karena kodenya diubah pihak tak dikenal, dan file mod dari situs acak adalah jalur malware klasik.",
      "Janji mod seperti melihat status yang dihapus, menyembunyikan centang, atau tema tanpa batas tidak sebanding dengan risiko kehilangan akun beserta seluruh riwayat chat dan grup penting - sekolah, kantor, dan keluarga semuanya ada di nomor yang sama. Bila saat ini kamu memakai mod, cadangkan chat, lalu pindah ke WhatsApp resmi dari Play Store dengan nomor yang sama.",
    ]},
    { heading: "Cadangan Chat dan Pindah HP", paragraphs: [
      "Di Android, cadangan WhatsApp disimpan ke Google Drive akun Google-mu dan memakan kuota penyimpanannya. Aktifkan cadangan berkala dari Pengaturan > Chat > Cadangan chat, dan catat nomor serta akun Google yang dipakai - dua hal ini yang menentukan chat bisa dipulihkan di HP baru atau tidak.",
      "Proses pindah resmi: instal WhatsApp dari Play Store di HP baru, verifikasi nomor yang sama, lalu terima tawaran memulihkan cadangan. Bila nomor berganti, gunakan fitur Ganti Nomor di HP lama SEBELUM pindah, agar grup dan kontak tetap mengenalmu.",
    ]},
  ],
  features: [
    { title: "Chat & Grup Terenkripsi", desc: "Pesan pribadi dan grup dilindungi enkripsi end-to-end secara bawaan, termasuk panggilan suara dan video." },
    { title: "Panggilan Suara & Video Grup", desc: "Telepon dan video call perorangan maupun grup tanpa biaya selain data internet." },
    { title: "Status & Channel", desc: "Berbagi foto/teks 24 jam lewat Status dan mengikuti pengumuman resmi lewat Channel." },
    { title: "Komunitas", desc: "Mengelompokkan beberapa grup terkait dalam satu payung, cocok untuk sekolah, RT, dan organisasi." },
    { title: "WhatsApp Business (resmi, terpisah)", desc: "Profil usaha, katalog, label, dan balasan cepat untuk penjual dan layanan pelanggan." },
    { title: "Verifikasi Dua Langkah", desc: "PIN tambahan agar nomor tidak mudah diambil alih orang lain - aktifkan dari Pengaturan > Akun." },
  ],
  permissions: [
    { name: "Kontak", meaning: "Agar nama teman yang juga memakai WhatsApp muncul otomatis dan kamu bisa memulai chat. Ini izin paling mendasar untuk aplikasi pesan." },
    { name: "Mikrofon", meaning: "Untuk pesan suara dan panggilan. Tanpanya kamu tidak bisa menelepon atau merekam voice note." },
    { name: "Kamera", meaning: "Untuk video call dan memotret langsung dari chat. Tidak dipakai di luar saat kamu mengaktifkannya." },
    { name: "Penyimpanan / Foto & Video", meaning: "Untuk mengirim dan menyimpan foto, video, serta dokumen dari chat, dan membuat cadangan lokal." },
    { name: "Notifikasi", meaning: "Menampilkan pesan masuk. Hampir selalu dibutuhkan; atur pratinjau bila tidak ingin isi pesan terlihat di layar kunci." },
    { name: "Lokasi", meaning: "Hanya saat kamu memakai fitur berbagi lokasi langsung atau mengirim titik lokasi ke kontak." },
  ],
  safetyParagraphs: [
    "WhatsApp resmi hanya ada di Play Store dan App Store, diterbitkan oleh Meta/WhatsApp LLC. Di luar itu, semua yang mengatasnamakan WhatsApp - mod, versi emas, versi transparan - adalah tidak resmi. Penipuan berkedok WhatsApp juga marak di Indonesia: pesan berisi file APK undangan nikah, tilang, atau paket yang sebenarnya mencuri kode OTP dan menguras rekening. WhatsApp dan pihak resmi mana pun tidak pernah mengirim aplikasi lewat chat.",
    "Lindungi akunmu: aktifkan verifikasi dua langkah, jangan pernah membagikan 6 digit kode verifikasi ke siapa pun termasuk yang mengaku petugas, dan perbarui WhatsApp hanya dari Play Store. Bila menerima file APK dari nomor tak dikenal, jangan dibuka - hapus dan laporkan nomor itu di dalam aplikasi.",
  ],
  pros: ["Dipakai hampir semua orang di Indonesia - tidak perlu mengajak pindah aplikasi", "Enkripsi end-to-end bawaan untuk chat dan panggilan", "Gratis, ringan, dan hemat data untuk pesan teks", "Ada WhatsApp Business resmi untuk usaha kecil", "Cadangan dan pindah perangkat didukung resmi"],
  cons: ["Sasaran utama penipuan file APK dan pengambilalihan akun", "Cadangan Google Drive memakan kuota penyimpanan Google", "Nomor HP terlihat oleh semua anggota grup", "Grup besar bisa sangat ramai dan menguras perhatian", "Fitur kustomisasi tampilan memang terbatas - dan itu disengaja demi keamanan"],
  alternatives: [
    { name: "Telegram", slug: "telegram", note: "Grup sangat besar, channel publik, dan kirim file besar. Cocok untuk komunitas dan distribusi file legal." },
    { name: "Instagram (DM)", slug: "instagram", note: "Untuk percakapan santai dengan teman yang sudah terhubung sebagai pengikut, bukan pengganti nomor utama." },
  ],
  faqs: [
    { q: "Apakah GB WhatsApp aman?", a: "Tidak bisa dipastikan aman dan akunmu bisa diblokir. GB WhatsApp bukan produk Meta, kodenya diubah pihak ketiga sehingga klaim enkripsinya tidak dapat diverifikasi, dan file-nya beredar lewat situs acak. WhatsApp resmi sendiri memperingatkan penggunaan aplikasi tidak resmi. Pindahlah ke versi resmi dari Play Store." },
    { q: "Kenapa nomor saya diblokir WhatsApp?", a: "Penyebab umum: memakai aplikasi mod, mengirim pesan massal yang dilaporkan sebagai spam, atau aktivitas yang melanggar ketentuan. Instal aplikasi resmi, lalu ajukan peninjauan dari dalam aplikasi. Hindari layanan jasa unblokir berbayar - itu bukan jalur resmi." },
    { q: "Bagaimana cara memindahkan chat ke HP baru?", a: "Cadangkan dulu dari Pengaturan > Chat > Cadangan chat ke akun Google yang sama, lalu instal WhatsApp resmi di HP baru, verifikasi nomor yang sama, dan pilih Pulihkan saat ditawarkan. Jangan menghapus aplikasi di HP lama sebelum pemulihan berhasil." },
    { q: "Ada yang mengirim file APK undangan lewat WhatsApp, harus apa?", a: "Jangan dibuka dan jangan diinstal. Itu pola penipuan pencurian kode OTP yang marak di Indonesia. Hapus pesannya, blokir dan laporkan nomor pengirim dari dalam aplikasi, dan beri tahu pengirim asli lewat jalur lain bila nomornya dibajak." },
    { q: "Apa beda WhatsApp biasa dan WhatsApp Business?", a: "Keduanya resmi dan gratis. Business menambah profil usaha, katalog produk, label pelanggan, pesan sambutan, dan balasan cepat. Untuk jualan, pakai Business; untuk pribadi, yang biasa. Keduanya dipasang dari Play Store." },
    { q: "Bisakah satu nomor WhatsApp dipakai di dua HP?", a: "Ya, lewat fitur Perangkat Tertaut untuk HP pendamping resmi dari aplikasi itu sendiri. Hindari aplikasi kloning dari luar Play Store yang menjanjikan hal serupa, karena mereka meminta akses penuh ke akunmu." },
  ],
  relatedTool: null,
};

export const instagram: PillarApp = {
  slug: "instagram", name: "Instagram", developer: "Meta Platforms, Inc.",
  categorySlug: "sosial", categoryName: "Sosial",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.instagram.android",
  officialLabel: "Buka Instagram di Play Store",
  priceLabel: "Gratis (ada iklan & pembelian dalam aplikasi)",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia & banyak bahasa lain",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "📸", tagline: "Foto, Reels, dan Stories - pusat visual media sosial Indonesia.",
  intro: [
    "Instagram adalah aplikasi berbagi foto dan video dari Meta yang di Indonesia dipakai untuk portofolio kreator, katalog jualan, komunitas hobi, sampai berita komunitas lokal. Format utamanya sekarang adalah Reels (video pendek), Stories (unggahan 24 jam), dan Feed (foto dan video permanen).",
    "Halaman ini merangkum fakta resmi Instagram, izin dan artinya, risiko yang perlu diketahui (termasuk pengunduh konten dan akun palsu), dan tombol ke Play Store. Kami tidak menyediakan APK Instagram mod - versi janji tanpa iklan dan bisa mengunduh semua konten itu melanggar ketentuan dan berisiko untuk akunmu.",
  ],
  sections: [
    { heading: "Reels, Stories, dan Feed: Bedanya Apa?", paragraphs: [
      "Reels adalah video vertikal pendek yang disebarkan algoritma ke penonton luas, termasuk yang belum mengikutimu - format utama untuk menjangkau orang baru. Stories bersifat 24 jam dan dilihat terutama oleh pengikutmu, cocok untuk kabar cepat dan interaksi lewat stiker polling atau tanya jawab. Feed adalah etalase permanen profilmu.",
      "Untuk penjual dan kreator, kombinasi ketiganya yang bekerja: Reels untuk ditemukan, Stories untuk menjaga hubungan harian, dan Feed sebagai katalog. Instagram juga menyediakan akun profesional gratis dengan insight (statistik penonton) dan tombol kontak usaha.",
    ]},
    { heading: "Mengunduh Konten Instagram: Aturan Mainnya", paragraphs: [
      "Instagram tidak menyediakan tombol unduh video publik seperti galeri biasa. Menyimpan untuk referensi pribadi berbeda dengan mengunggah ulang karya orang lain sebagai milikmu - yang kedua melanggar hak cipta dan ketentuan platform. Untuk kontenmu sendiri, Instagram menyediakan unduhan data akun dan hasil karyamu dari pengaturan.",
      "Tool pengunduh pihak ketiga - termasuk Insta Grab yang dibuat untuk pemilik situs ini - hanya boleh dipakai untuk konten publik milikmu sendiri atau dengan izin pemiliknya, dan hasilnya bukan untuk dikomersialkan ulang. Waspadai situs pengunduh yang meminta kata sandi Instagram: situs yang sah tidak pernah membutuhkannya, dan memasukkan kata sandi di luar aplikasi resmi adalah cara akun dicuri.",
    ]},
    { heading: "Keamanan Akun: Target Pencurian yang Sering", paragraphs: [
      "Akun Instagram dengan banyak pengikut adalah target pencurian untuk dijual atau dipakai menipu pengikutnya. Aktifkan autentikasi dua faktor dari aplikasi Authenticator (bukan hanya SMS), periksa aktivitas login berkala, dan jangan pernah memasukkan kata sandi dari tautan yang datang lewat DM atau email yang mengaku dari Instagram - Instagram tidak mengirim permintaan seperti itu.",
      "Untuk usaha, tambahkan satu admin cadangan tepercaya dan simpan kode pemulihan di tempat aman di luar HP. Bila akun diambil alih, gunakan jalur pemulihan resmi di aplikasi dan situs bantuan Meta - bukan jasa pemulihan akun berbayar di media sosial.",
    ]},
  ],
  features: [
    { title: "Reels", desc: "Video vertikal pendek dengan musik, efek, dan jangkauan algoritma luas untuk menemukan penonton baru." },
    { title: "Stories", desc: "Unggahan 24 jam dengan stiker interaktif: polling, tanya jawab, tautan, dan hitung mundur." },
    { title: "Feed & Carousel", desc: "Foto dan rangkaian gambar permanen yang menjadi etalase profil, lengkap dengan teks dan tagar." },
    { title: "Pesan Langsung (DM)", desc: "Chat teks, suara, foto, dan video dengan teman, pelanggan, dan komunitas." },
    { title: "Akun Profesional & Insight", desc: "Statistik penonton, tombol kontak, dan kategori usaha - gratis untuk kreator dan bisnis." },
    { title: "Belanja & Tag Produk", desc: "Menandai produk di unggahan untuk katalog jualan yang terhubung dengan profil usaha." },
  ],
  permissions: [
    { name: "Kamera & Mikrofon", meaning: "Untuk mengambil foto/video dan merekam suara langsung di aplikasi, termasuk Reels dan Stories." },
    { name: "Penyimpanan / Foto & Video", meaning: "Untuk mengunggah dari galeri dan menyimpan draf serta hasil unduhan kontenmu sendiri." },
    { name: "Kontak", meaning: "Opsional, untuk saran teman dari kontak HP. Bisa ditolak tanpa mengurangi fungsi utama." },
    { name: "Notifikasi", meaning: "Pemberitahuan suka, komentar, DM, dan live. Atur kategorinya agar tidak membanjiri." },
    { name: "Lokasi", meaning: "Untuk menandai lokasi di unggahan bila kamu memilihnya; bukan syarat memakai Instagram." },
  ],
  safetyParagraphs: [
    "Instagram resmi dari Play Store diterbitkan oleh Meta dan aman dari sisi aplikasi. Bahaya di sekitar Instagram kebanyakan bukan aplikasinya, melainkan ekosistem palsu di sekitarnya: aplikasi penambah followers, penampil profil privat, dan pengunduh yang meminta login. Semua itu melanggar ketentuan, tidak bekerja seperti janji, dan sering berujung akun dicuri atau diblokir.",
    "Dari sisi privasi, Instagram adalah layanan berbasis iklan: aktivitasmu dipakai untuk personalisasi iklan sesuai pengaturannya. Gunakan akun privat bila tidak berjualan, tinjau izin dan sesi login secara berkala, dan ingat bahwa mengunggah foto anak ke akun publik punya konsekuensi jangka panjang - pertimbangkan sebelum membagikan.",
  ],
  pros: ["Jangkauan visual terbaik untuk kreator dan katalog usaha", "Akun profesional dan insight gratis", "Format lengkap: foto, video pendek, cerita, siaran langsung", "Komunitas lokal dan hobi sangat aktif di Indonesia", "Terhubung dengan Facebook dan Threads dari Meta"],
  cons: ["Algoritma berubah-ubah dan sulit diprediksi kreator kecil", "Rentan pencurian akun bila keamanan diabaikan", "Tekanan sosial dan perbandingan gaya hidup, terutama bagi remaja", "Iklan semakin banyak di feed dan Reels", "DM dari akun asing sering berisi spam dan penipuan"],
  alternatives: [
    { name: "TikTok", slug: "tiktok", note: "Lebih kuat untuk jangkauan video pendek ke penonton baru; banyak kreator memakai keduanya sekaligus." },
    { name: "YouTube", slug: "youtube", note: "Untuk video panjang dan pendapatan iklan kreator yang lebih mapan, plus Shorts untuk format pendek." },
    { name: "Telegram", slug: "telegram", note: "Untuk komunitas berbasis channel dan grup besar tanpa algoritma feed." },
  ],
  faqs: [
    { q: "Bagaimana cara download video Instagram?", a: "Untuk videomu sendiri, gunakan fitur unduh/simpan di aplikasi atau unduhan data akun. Untuk video publik, tool pengunduh hanya pantas dipakai untuk konten milikmu atau dengan izin pemilik, dan tidak untuk diunggah ulang sebagai karyamu. Situs pengunduh yang meminta kata sandi Instagram harus selalu dihindari." },
    { q: "Apakah aplikasi penambah followers aman?", a: "Tidak. Aplikasi dan situs penambah followers melanggar ketentuan Instagram, biasanya meminta kata sandi (yang berarti akunmu bisa diambil), dan berisiko membuat akun dibatasi atau diblokir. Pertumbuhan yang aman hanya dari konten dan konsistensi." },
    { q: "Kenapa akun saya masuk mode dibatasi (shadowban)?", a: "Penyebab umum adalah aktivitas seperti bot (follow/unfollow massal, komentar berulang), memakai layanan pihak ketiga, atau konten yang dilaporkan. Hentikan semua layanan pihak ketiga, cabut akses aplikasi asing di pengaturan keamanan, dan beraktivitas normal beberapa waktu." },
    { q: "Bagaimana mengaktifkan autentikasi dua faktor Instagram?", a: "Buka Profil > menu > Pengaturan dan privasi > Pusat Akun > Kata sandi dan keamanan > Autentikasi dua faktor. Pilih aplikasi autentikator, simpan kode pemulihan di tempat aman di luar HP, dan jangan bagikan kode kepada siapa pun." },
    { q: "Apa itu Instagram mod dan bolehkah dipakai?", a: "Instagram mod adalah versi tidak resmi yang diubah pihak ketiga, menjanjikan unduh semua konten dan tanpa iklan. Memakainya melanggar ketentuan Meta, akun bisa diblokir, dan keamanannya tidak bisa diverifikasi. Selalu pakai versi resmi dari Play Store." },
    { q: "Bisakah melihat profil privat dengan aplikasi tertentu?", a: "Tidak ada cara sah. Aplikasi atau situs yang mengklaim bisa menampilkan profil privat hampir selalu penipuan yang meminta login atau pembayaran. Profil privat hanya bisa dilihat oleh pengikut yang disetujui pemiliknya." },
  ],
  relatedTool: { label: "Pengunduh Video Instagram", href: "/tools/pengunduh-instagram" },
};

export const telegram: PillarApp = {
  slug: "telegram", name: "Telegram", developer: "Telegram FZ-LLC",
  categorySlug: "sosial", categoryName: "Sosial",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=org.telegram.messenger",
  officialLabel: "Buka Telegram di Play Store",
  priceLabel: "Gratis (ada Telegram Premium berbayar)",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia & banyak bahasa lain",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "✈️", tagline: "Pesan cepat dengan grup raksasa, channel, dan kirim file besar.",
  intro: [
    "Telegram adalah aplikasi pesan berbasis cloud yang dikenal karena grupnya yang sangat besar, channel siaran publik, bot, dan kemampuan mengirim file jauh lebih besar daripada aplikasi pesan biasa. Di Indonesia Telegram dipakai komunitas belajar, distribusi materi, komunitas hobi, sampai kanal pengumuman.",
    "Halaman ini membahas fakta Telegram, perbedaan penting soal enkripsinya yang sering disalahpahami, izin, serta risikonya - termasuk channel ilegal yang harus kamu hindari. Tombol unduh hanya ke Play Store; kami tidak menyediakan file APK Telegram dari sumber lain.",
  ],
  sections: [
    { heading: "Cloud Chat vs Secret Chat: Enkripsi yang Sering Salah Dipahami", paragraphs: [
      "Chat biasa di Telegram adalah cloud chat: tersimpan terenkripsi di server Telegram sehingga bisa dibuka serentak di HP, tablet, dan komputer - nyaman, tetapi TIDAK terenkripsi end-to-end secara bawaan. Enkripsi end-to-end hanya ada di Secret Chat, yang harus kamu mulai manual per kontak, tidak masuk grup, dan tidak tersinkron antar perangkat.",
      "Ini bukan berarti Telegram tidak aman untuk pemakaian umum, tetapi bila kebutuhanmu adalah percakapan yang wajib end-to-end secara bawaan di semua chat, WhatsApp dan Signal memang dirancang seperti itu. Pahami perbedaan ini sebelum memutuskan memakai Telegram untuk hal sensitif.",
    ]},
    { heading: "Channel, Grup Besar, dan Bot", paragraphs: [
      "Channel memungkinkan satu admin menyiarkan ke pelanggan tanpa batas, dan grup Telegram bisa menampung anggota dalam jumlah sangat besar dibanding aplikasi pesan lain. Bot adalah akun otomatis yang bisa menjalankan layanan - dari pengingat jadwal sampai kuis belajar - yang dibuat oleh komunitas maupun penyedia layanan.",
      "Sisi gelapnya: kebebasan ini juga dipakai untuk channel film bajakan, grup judi, dan penyebaran konten ilegal, yang di Indonesia bisa berurusan dengan hukum bagi pengelola maupun penyebar. Gunakan Telegram untuk komunitas dan kanal yang legal, dan tinggalkan serta laporkan grup yang jelas melanggar hukum.",
    ]},
    { heading: "Kirim File Besar dan Pemakaian Lintas Perangkat", paragraphs: [
      "Telegram mengizinkan pengiriman file jauh lebih besar daripada aplikasi pesan umumnya, sehingga sering dipakai untuk berbagi dokumen dan video secara legal - misalnya materi kuliah dan berkas kerja. Karena berbasis cloud, file yang pernah kamu kirim atau terima tetap bisa diunduh ulang dari riwayat chat tanpa memenuhi HP.",
      "Kamu bisa masuk dengan akun yang sama di banyak perangkat sekaligus. Kemudahan ini menuntut keamanan akun yang serius: aktifkan verifikasi dua langkah (kata sandi tambahan) dan tinjau sesi aktif secara berkala, karena sesi yang tertinggal di perangkat orang lain memberi akses penuh ke chat cloud-mu.",
    ]},
  ],
  features: [
    { title: "Grup & Channel Skala Besar", desc: "Grup komunitas raksasa dan channel siaran tanpa batas pelanggan, dengan alat admin dan statistik." },
    { title: "Kirim File Besar", desc: "Mengirim dokumen dan media jauh lebih besar dari aplikasi pesan biasa, tersimpan di cloud akunmu." },
    { title: "Secret Chat", desc: "Percakapan end-to-end opsional dengan timer hapus otomatis, dimulai manual untuk satu kontak." },
    { title: "Bot & Mini App", desc: "Akun otomatis untuk layanan, kuis, pengingat, dan utilitas yang dibuat komunitas dan penyedia resmi." },
    { title: "Lintas Perangkat Penuh", desc: "Satu akun aktif serentak di HP, tablet, desktop, dan web dengan riwayat tersinkron." },
    { title: "Folder & Arsip Chat", desc: "Mengelompokkan chat ke folder seperti Kerja, Keluarga, dan Channel agar daftar chat tetap rapi." },
  ],
  permissions: [
    { name: "Kontak", meaning: "Untuk menemukan kontak yang memakai Telegram dan menyinkronkan nama. Bisa dibatasi dari pengaturan privasi di dalam aplikasi." },
    { name: "Penyimpanan / Foto & Video", meaning: "Mengirim dan mengunduh file, foto, dan video dari chat - fungsi inti Telegram sebagai pengirim file." },
    { name: "Mikrofon & Kamera", meaning: "Untuk pesan suara, panggilan, dan video call. Telegram juga punya panggilan grup dan siaran suara." },
    { name: "Notifikasi", meaning: "Pemberitahuan pesan dan channel. Channel populer bisa sangat aktif - bisukan yang tidak prioritas." },
    { name: "Lokasi", meaning: "Hanya untuk fitur berbagi lokasi langsung atau orang di sekitar bila kamu mengaktifkannya." },
  ],
  safetyParagraphs: [
    "Telegram resmi aman sebagai aplikasi, tetapi reputasinya di Indonesia tercoreng oleh penyalahgunaan: penipuan berkedok admin channel, grup investasi bodong, channel film bajakan, dan judi. Ingat tiga hal: admin resmi tidak pernah meminta kode login lewat chat, tautan grup dari sumber tak jelas tidak wajib diikuti, dan konten bajakan/judi tetap ilegal walau mudah ditemukan.",
    "Amankan akunmu dengan verifikasi dua langkah, kunci kode sandi aplikasi, dan pemeriksaan sesi aktif berkala. Untuk anak dan remaja, perhatikan bahwa pencarian publik Telegram bisa menemukan kanal dewasa dan ilegal - pendampingan dan edukasi tetap diperlukan, karena filter keluarga bawaan Telegram terbatas dibanding platform arus utama.",
  ],
  pros: ["Grup dan channel terbesar di kelas aplikasi pesan", "Kirim file besar dan tersimpan di cloud, hemat memori HP", "Lintas perangkat paling mulus - HP, desktop, web bersamaan", "Bot dan folder chat membuat komunitas terorganisir", "Gratis untuk hampir semua fitur inti"],
  cons: ["Chat biasa bukan end-to-end secara bawaan - hanya Secret Chat", "Banyak channel bajakan, judi, dan penipuan berkeliaran", "Pencarian publik bisa menemukan konten dewasa/ilegal", "Nomor tetap menjadi identitas utama pendaftaran", "Cadangan dan pemulihan sepenuhnya bergantung pada akun dan nomor"],
  alternatives: [
    { name: "WhatsApp", slug: "whatsapp", note: "Pilih bila prioritasmu enkripsi end-to-end bawaan di semua chat dan semua kontakmu sudah ada di sana." },
    { name: "Instagram (DM)", slug: "instagram", note: "Untuk komunitas visual dan percakapan santai berbasis pengikut, bukan grup besar dan file." },
  ],
  faqs: [
    { q: "Apakah Telegram lebih aman dari WhatsApp?", a: "Tidak sesederhana itu. Telegram unggul di fitur komunitas dan cloud, tetapi chat biasanya tidak end-to-end secara bawaan - hanya Secret Chat yang end-to-end dan tidak tersedia untuk grup. WhatsApp mengenkripsi semua chat dan panggilan secara bawaan. Pilih berdasarkan kebutuhanmu, dan aktifkan verifikasi dua langkah di keduanya." },
    { q: "Apakah Telegram Premium wajib dibeli?", a: "Tidak. Premium adalah langganan opsional untuk batas yang lebih longgar dan fitur tambahan. Semua fungsi inti - chat, grup, channel, kirim file - tetap gratis." },
    { q: "Kenapa banyak film dan grup ilegal di Telegram?", a: "Karena membuat channel itu mudah dan jangkauannya besar. Itu bukan berarti legal: membagikan film bajakan dan mengelola grup judi melanggar hukum Indonesia dan ketentuan Telegram, dan channel seperti itu rutin dilaporkan dan ditutup. Gunakan Telegram untuk komunitas dan kanal yang sah." },
    { q: "Bagaimana cara mengamankan akun Telegram?", a: "Aktifkan verifikasi dua langkah di Pengaturan > Privasi dan Keamanan, pasang kode kunci aplikasi, dan tinjau Perangkat/sesi aktif untuk mengeluarkan perangkat yang tidak kamu kenal. Jangan pernah memberikan kode masuk yang datang lewat SMS atau chat kepada siapa pun." },
    { q: "Bisakah memakai Telegram di dua HP dan laptop sekaligus?", a: "Bisa, itu salah satu keunggulannya. Masuk dengan nomor yang sama di tiap perangkat dan riwayat cloud chat akan tersinkron. Secret Chat bersifat per perangkat dan tidak ikut tersinkron." },
    { q: "File yang saya kirim lewat Telegram tersimpan di mana?", a: "Di cloud Telegram yang terhubung ke akunmu, sehingga bisa diunduh kembali dari riwayat chat di perangkat mana pun. Konsekuensinya, siapa pun yang memegang sesi akunmu bisa mengakses file-file itu - jaga sesi aktifmu." },
  ],
  relatedTool: null,
};
