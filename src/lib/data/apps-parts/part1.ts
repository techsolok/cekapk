import type { PillarApp } from "../content-types";

export const tiktok: PillarApp = {
  slug: "tiktok", name: "TikTok", developer: "TikTok Pte. Ltd.",
  categorySlug: "video-foto", categoryName: "Video & Foto",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically",
  officialLabel: "Buka TikTok di Play Store",
  priceLabel: "Gratis (ada iklan & pembelian dalam aplikasi)",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia & banyak bahasa lain",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "🎵", tagline: "Aplikasi video pendek paling populer di Indonesia.",
  intro: [
    "TikTok adalah aplikasi berbagi video pendek yang memungkinkan siapa pun merekam, mengedit, dan menonton video vertikal berdurasi singkat sampai beberapa menit. Di Indonesia, TikTok dipakai untuk hiburan, belajar singkat, berita ringan, sampai jualan online lewat TikTok Shop dan live streaming.",
    "Halaman ini adalah halaman info resmi versi kami: fakta aplikasi, izin yang diminta dan artinya, penilaian keamanan yang jujur, serta tombol ke Google Play Store. Kami tidak menyediakan file APK TikTok, karena cara teraman mendapatkan TikTok selalu dari Play Store atau App Store resmi.",
  ],
  sections: [
    { heading: "Apa Itu TikTok dan Bagaimana Cara Kerjanya?", paragraphs: [
      "Begitu dibuka, TikTok menampilkan tab For You (FYP) yang isinya dipilih algoritma berdasarkan video yang kamu tonton, sukai, dan lewati. Semakin sering kamu menonton satu topik, semakin sering topik itu muncul. Di samping FYP ada tab Following untuk akun yang kamu ikuti, fitur pencarian, pesan masuk, dan profil.",
      "Untuk kreator, TikTok menyediakan kamera bawaan dengan filter, efek, stiker, dan perpustakaan musik berlisensi di dalam aplikasi. Video bisa direkam langsung atau diunggah dari galeri, lalu ditambah teks, suara, dan efek transisi. Banyak kreator Indonesia mengedit video lebih dulu di CapCut - aplikasi editor dari ekosistem yang sama - lalu mengunggahnya ke TikTok.",
    ]},
    { heading: "TikTok Shop dan Live Streaming di Indonesia", paragraphs: [
      "Di Indonesia, TikTok terhubung dengan ekosistem e-commerce Tokopedia untuk fitur belanja. Kreator dan penjual bisa menautkan produk ke video dan siaran langsung, dan penonton bisa membeli tanpa keluar aplikasi. Fitur ini membuat TikTok bukan hanya aplikasi hiburan, tetapi juga kanal jualan utama bagi banyak UMKM.",
      "Live streaming memungkinkan kreator berinteraksi langsung dengan penonton lewat komentar dan hadiah virtual. Untuk anak di bawah umur, TikTok membatasi beberapa fitur termasuk live dan pesan langsung. Orang tua sebaiknya mendampingi penggunaan anak dan memanfaatkan fitur Family Pairing serta pembatasan waktu layar yang tersedia di pengaturan.",
    ]},
    { heading: "Berapa Ukuran TikTok dan HP Apa yang Cukup?", paragraphs: [
      "Ukuran unduhan TikTok di Play Store bervariasi menurut perangkat, dan ukuran terpasang akan tumbuh karena cache video. Di HP dengan penyimpanan 32 GB, cache TikTok yang menumpuk adalah penyebab umum memori penuh; bersihkan lewat Pengaturan di dalam aplikasi secara berkala. TikTok juga menyediakan versi Lite di sebagian wilayah, tetapi untuk Indonesia cara paling aman tetap aplikasi utama dari Play Store.",
      "Untuk pengalaman menonton yang lancar, koneksi 4G yang stabil lebih berpengaruh daripada spesifikasi tinggi. Bila kuota terbatas, aktifkan penghemat data di pengaturan TikTok dan turunkan kualitas putar video.",
    ]},
  ],
  features: [
    { title: "FYP (For You Page)", desc: "Umpan video yang dipersonalisasi algoritma berdasarkan minat dan kebiasaan menontonmu, menjadi ciri khas utama TikTok." },
    { title: "Kamera & Efek Video", desc: "Rekam langsung dengan filter wajah, efek AR, stiker, timer, dan perpustakaan musik serta suara yang luas." },
    { title: "Live Streaming", desc: "Siaran langsung dengan komentar real-time, hadiah virtual, dan fitur belanja untuk kreator serta penjual yang memenuhi syarat." },
    { title: "Duet & Stitch", desc: "Membuat video berdampingan dengan video kreator lain (Duet) atau menyambung cuplikan video orang lain (Stitch) bila pemiliknya mengizinkan." },
    { title: "Pesan & Komentar", desc: "Pesan langsung, komentar video, dan fitur berbagi ke aplikasi lain untuk berinteraksi dengan teman dan kreator." },
    { title: "Kontrol Waktu & Keluarga", desc: "Pengingat waktu layar, mode terbatas, dan Family Pairing agar orang tua bisa mendampingi akun anak remajanya." },
  ],
  permissions: [
    { name: "Kamera", meaning: "Dipakai untuk merekam video langsung di dalam aplikasi. Wajar untuk aplikasi video; bisa dimatikan bila kamu hanya menonton, tetapi kamu tidak bisa merekam saat izin ini mati." },
    { name: "Mikrofon", meaning: "Untuk merekam suara saat membuat video dan saat siaran langsung. Tidak dibutuhkan bila kamu hanya menonton." },
    { name: "Penyimpanan / Foto & Video", meaning: "Untuk mengunggah video dari galeri dan menyimpan hasil unduhan atau draf. Di Android baru, izin ini terbatas pada file yang kamu pilih." },
    { name: "Kontak", meaning: "Opsional - dipakai bila kamu ingin menemukan teman dari kontak HP. Kamu bisa menolak izin ini dan TikTok tetap berfungsi normal." },
    { name: "Notifikasi", meaning: "Memberi tahu ada komentar, suka, pesan, atau live dari akun yang kamu ikuti. Atur seperlunya agar tidak mengganggu." },
    { name: "Lokasi (perkiraan)", meaning: "Dipakai untuk konten dan iklan yang relevan dengan wilayahmu. Izin lokasi presisi tidak wajib untuk memakai TikTok." },
  ],
  safetyParagraphs: [
    "TikTok resmi dari Play Store adalah aplikasi yang aman dari sisi perangkat lunak: ia lolos pemindaian Google Play Protect dan diperbarui langsung oleh TikTok Pte. Ltd. Risiko terbesar justru datang dari versi tidak resmi - misalnya file bertajuk TikTok mod, TikTok tanpa iklan, atau TikTok premium dari situs acak. File seperti itu tidak ada di Play Store, sering disusupi iklan agresif atau pencuri data, dan akunmu bisa diblokir karena melanggar ketentuan layanan.",
    "Dari sisi privasi, sadari bahwa TikTok mengumpulkan data penggunaan untuk rekomendasi dan iklan - ini tertulis di kebijakan privasinya. Kurangi jejak dengan mengaktifkan akun privat bila perlu, membatasi siapa yang bisa mengirim pesan, dan meninjau izin aplikasi secara berkala. Untuk anak, gunakan Family Pairing dan mode terbatas, dan sepakati batas waktu layar.",
  ],
  pros: ["Gratis dan sangat mudah dipakai pemula", "Perpustakaan musik dan efek video sangat luas", "Peluang kreator dan penjual UMKM menjangkau penonton besar", "Banyak konten edukasi singkat berbahasa Indonesia", "Fitur kontrol keluarga dan waktu layar tersedia"],
  cons: ["Sangat mudah membuat lupa waktu (scroll tanpa akhir)", "Cache cepat memenuhi penyimpanan HP kecil", "Konsumsi data video cukup boros bila tanpa penghemat data", "Konten tidak selalu sesuai untuk anak tanpa pendampingan", "Iklan dan promosi belanja cukup sering muncul"],
  alternatives: [
    { name: "Instagram", slug: "instagram", note: "Reels adalah pesaing terdekat TikTok untuk video pendek, terhubung dengan jejaring pertemananmu yang sudah ada." },
    { name: "YouTube", slug: "youtube", note: "YouTube Shorts untuk video pendek plus video panjang, tutorial, dan musik dalam satu aplikasi resmi Google." },
    { name: "CapCut", slug: "capcut", note: "Bukan pengganti untuk menonton, tetapi editor resmi yang dipakai kreator TikTok untuk mengedit video sebelum diunggah." },
  ],
  faqs: [
    { q: "Apakah TikTok gratis?", a: "Ya, TikTok gratis diunduh dan dipakai. Di dalam aplikasi ada iklan, pembelian koin untuk hadiah live, dan fitur belanja. Tidak ada versi resmi bernama TikTok Premium - bila ada situs menawarkan itu sebagai file APK, itu tidak resmi dan berisiko." },
    { q: "Bagaimana cara download video TikTok tanpa watermark?", a: "Untuk videomu sendiri, unduh langsung dari aplikasi lewat tombol Bagikan > Simpan video. Untuk kebutuhan lain, gunakan tool pengunduh online kami yang sudah tersedia hanya untuk video milikmu atau yang pemiliknya mengizinkan. Menghapus watermark video orang lain lalu mengunggahnya ulang sebagai milikmu melanggar hak cipta." },
    { q: "Kenapa TikTok tidak bisa dibuka atau selalu keluar sendiri?", a: "Penyebab paling umum: penyimpanan penuh, cache menumpuk, atau versi aplikasi terlalu lama. Bersihkan cache dari pengaturan aplikasi, perbarui TikTok dari Play Store, lalu mulai ulang HP. Bila tetap bermasalah, hapus dan instal ulang dari Play Store - jangan dari situs lain." },
    { q: "Apakah TikTok aman untuk anak?", a: "TikTok menetapkan batas usia dan menyediakan mode terbatas serta Family Pairing, tetapi kontennya tetap campuran untuk umum. Anak sebaiknya memakai dengan pendampingan, akun privat, pesan langsung dibatasi, dan batas waktu layar yang disepakati bersama." },
    { q: "Apa beda TikTok dan TikTok Lite?", a: "TikTok Lite adalah versi lebih kecil yang ditujukan untuk HP dan jaringan terbatas di sebagian wilayah, dengan beberapa fitur dipangkas. Keduanya resmi dari developer yang sama, tetapi ketersediaannya berbeda per negara - selalu ambil dari Play Store." },
    { q: "Bisakah memakai TikTok tanpa membuat akun?", a: "Kamu bisa menonton sebagian video tanpa akun, tetapi untuk menyukai, berkomentar, mengikuti, mengunggah, dan live, akun wajib dibuat. Menonton tanpa akun juga membatasi pengaturan privasi dan kontrol waktu." },
  ],
  relatedTool: { label: "Pengunduh Video TikTok", href: "/tools/pengunduh-tiktok" },
};

export const capcut: PillarApp = {
  slug: "capcut", name: "CapCut", developer: "Bytedance Pte. Ltd.",
  categorySlug: "video-foto", categoryName: "Video & Foto",
  legalStatus: "play_store",
  officialUrl: "https://play.google.com/store/apps/details?id=com.lemon.lvoverseas",
  officialLabel: "Buka CapCut di Play Store",
  priceLabel: "Gratis (ada fitur Pro berbayar)",
  sizeLabel: "Bervariasi menurut perangkat",
  minAndroid: "Bervariasi menurut perangkat",
  languages: "Bahasa Indonesia & banyak bahasa lain",
  verifiedAt: "2026-10-18",
  versionNote: "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi",
  icon: "✂️", tagline: "Editor video gratis favorit kreator TikTok dan Reels.",
  intro: [
    "CapCut adalah aplikasi edit video gratis dari Bytedance - perusahaan di balik TikTok - yang dirancang agar pemula bisa menghasilkan video rapi tanpa pengalaman editing. CapCut terkenal lewat template siap pakai: pilih template yang sedang tren, masukkan klipmu, dan video jadi dalam hitungan detik.",
    "Di Indonesia CapCut dipakai kreator TikTok, penjual online, guru, sampai admin media sosial UMKM. Halaman ini merangkum fakta resmi, fitur, izin, dan penilaian keamanan CapCut, dengan tombol ke Play Store. Kami tidak menyediakan file APK CapCut mod - versi seperti itu justru yang paling sering membawa masalah, seperti dijelaskan di bagian keamanan.",
  ],
  sections: [
    { heading: "Kenapa CapCut Sangat Populer di Indonesia?", paragraphs: [
      "Alasan utamanya adalah template dan tren. Suara atau gaya edit yang sedang viral di TikTok biasanya tersedia sebagai template CapCut yang dibagikan kreator lain; kamu tinggal mengganti klip di dalamnya. Ditambah teks otomatis (auto caption) berbahasa Indonesia yang cukup akurat, CapCut memangkas pekerjaan tersulit dalam editing video bagi pemula.",
      "CapCut juga tersedia lintas perangkat: aplikasi Android dan iOS, versi desktop, dan editor web. Proyek tertentu bisa dimulai di HP lalu dilanjutkan di komputer. Untuk kebutuhan jualan dan konten rutin, kombinasi CapCut di HP dan TikTok sebagai tempat publikasi adalah alur kerja paling umum di Indonesia saat ini.",
    ]},
    { heading: "Fitur Gratis vs CapCut Pro", paragraphs: [
      "Sebagian besar kebutuhan konten harian - potong, gabung, teks, musik, filter dasar, template, dan teks otomatis dengan kuota tertentu - tersedia gratis. CapCut Pro adalah langganan berbayar yang membuka efek, transisi, stok, dan fitur AI tambahan, serta ruang cloud lebih besar. Harga langganan resmi selalu yang tercantum di Play Store pada saat kamu berlangganan.",
      "Penting untuk jujur: tidak ada cara legal mendapatkan CapCut Pro gratis permanen. Situs yang menawarkan CapCut Pro APK atau mod unlocked membagikan aplikasi yang sudah diubah dari versi resmi; selain melanggar ketentuan, file seperti ini adalah salah satu umpan malware paling umum untuk kreator pemula.",
    ]},
    { heading: "Spesifikasi dan Kebutuhan Perangkat", paragraphs: [
      "CapCut berjalan di sebagian besar HP Android kelas menengah. Editing video resolusi tinggi dan efek berat akan terasa lebih lambat di HP dengan RAM kecil, dan proses ekspor adalah bagian paling berat. Sisakan ruang penyimpanan kosong yang cukup - proyek video dan hasil render bisa memakan beberapa GB.",
      "Bila ekspor sering gagal atau aplikasi tertutup sendiri, turunkan resolusi proyek, tutup aplikasi lain, dan perbarui CapCut dari Play Store. Memakai versi lama dari situs acak untuk menghindari bug justru menambah risiko dan biasanya tidak menyelesaikan masalah.",
    ]},
  ],
  features: [
    { title: "Template Siap Pakai", desc: "Ribuan template tren dari kreator lain; ganti klip dan teks, lalu ekspor - tanpa mengatur keyframe manual." },
    { title: "Teks Otomatis (Auto Caption)", desc: "Mengubah ucapan di video menjadi teks subtitle secara otomatis, termasuk Bahasa Indonesia, lalu bisa diedit kata per kata." },
    { title: "Edit Dasar Lengkap", desc: "Potong, pisah, gabung, putar, cerminkan, atur kecepatan termasuk kurva (velocity), dan stabilisasi video goyang." },
    { title: "Efek, Filter & Transisi", desc: "Perpustakaan besar efek visual, filter warna, dan transisi antar klip, sebagian gratis dan sebagian khusus Pro." },
    { title: "Musik & Efek Suara", desc: "Perpustakaan audio bawaan dan kemampuan mengekstrak audio dari video galeri untuk dipakai di proyekmu." },
    { title: "Hapus Latar & Chroma Key", desc: "Menghapus latar belakang orang secara otomatis dan kunci kroma untuk layar hijau, berguna untuk konten presentasi dan jualan." },
  ],
  permissions: [
    { name: "Penyimpanan / Foto & Video", meaning: "Inti editor video: memilih klip dari galeri, menyimpan proyek, dan mengekspor hasil. Tanpa izin ini CapCut tidak bisa bekerja sama sekali." },
    { name: "Mikrofon", meaning: "Untuk merekam sulih suara (voice over) langsung di dalam proyek. Hanya dibutuhkan saat kamu memakai fitur rekam suara." },
    { name: "Kamera", meaning: "Untuk merekam klip baru tanpa keluar aplikasi. Opsional bagi yang selalu mengedit dari galeri." },
    { name: "Notifikasi", meaning: "Memberi tahu tentang template baru, tren, atau info langganan. Aman dimatikan bila mengganggu." },
    { name: "Internet & Iklan", meaning: "CapCut menampilkan data penggunaan dan dapat menayangkan konten promosi sesuai kebijakan privasinya; fitur cloud dan unduh aset membutuhkan koneksi internet." },
  ],
  safetyParagraphs: [
    "CapCut resmi dari Play Store aman dan ditandatangani oleh developer aslinya, Bytedance Pte. Ltd. Pola penipuan paling sering adalah CapCut Pro mod: file dari situs/forum acak yang menjanjikan semua fitur berbayar terbuka gratis. File mod berarti kode aplikasi sudah diubah pihak tak dikenal - kamu tidak punya cara memastikan tidak ada yang ditambahkan, dan data proyek serta akunmu yang menanggung risikonya.",
    "Dari sisi privasi, CapCut memproses video yang kamu unggah ke fitur cloud atau AI sesuai kebijakan privasinya; untuk materi sensitif, gunakan fitur yang bekerja lokal di perangkat dan hindari mengunggah ke layanan cloud mana pun. Selalu baca izin sebelum menginstal dan perbarui hanya dari Play Store, bukan dari tautan yang beredar di pesan berantai.",
  ],
  pros: ["Sangat mudah untuk pemula, terutama lewat template", "Teks otomatis Bahasa Indonesia membantu kreator dan guru", "Fitur gratisnya sudah lebih dari cukup untuk konten harian", "Terhubung mulus dengan alur publikasi TikTok", "Tersedia di HP, desktop, dan web"],
  cons: ["Fitur terbaik makin banyak yang pindah ke Pro berbayar", "Berat di HP RAM kecil saat ekspor resolusi tinggi", "Watermark/tail template tertentu perlu dihapus manual di pengaturan ekspor", "Aset tren bisa berubah atau hilang sewaktu-waktu", "Fitur cloud mengharuskan login dan koneksi stabil"],
  alternatives: [
    { name: "YouCut / VN (di luar situs ini)", slug: null, note: "Editor video alternatif yang juga populer; bandingkan kebutuhan template dan teks otomatismu sebelum memilih. Selalu unduh dari Play Store." },
    { name: "TikTok", slug: "tiktok", note: "Editor bawaan TikTok cukup untuk video sederhana tanpa pindah aplikasi, walau kalah lengkap dari CapCut." },
    { name: "Canva", slug: "canva", note: "Untuk video pendek berbasis desain dan template grafis - misalnya pengumuman dan poster bergerak - Canva sering lebih cepat." },
  ],
  faqs: [
    { q: "Apakah CapCut benar-benar gratis?", a: "Ya untuk fitur intinya, dan itu yang dipakai mayoritas kreator. Ada langganan Pro berbayar untuk efek, transisi, stok, dan fitur AI tambahan. Harga resmi selalu yang tampil di Play Store - abaikan janji Pro gratis permanen dari situs mana pun." },
    { q: "Kenapa hasil ekspor CapCut buram?", a: "Biasanya karena resolusi proyek rendah atau pengaturan ekspor turun otomatis. Atur resolusi proyek mengikuti video sumber (misalnya 1080x1920 untuk video vertikal) dan periksa pengaturan ekspor sebelum render. Mengompres ulang lewat aplikasi chat juga menurunkan kualitas." },
    { q: "Bagaimana cara menghilangkan watermark CapCut?", a: "Untuk video yang kamu edit sendiri, ekspor tanpa template dan periksa pengaturan tanda akhir (ending watermark) - pada kebanyakan alur, watermark berasal dari template atau cuplikan penutup bawaan yang bisa dihapus di timeline. Tidak perlu aplikasi mod untuk ini." },
    { q: "Apakah CapCut bisa dipakai offline?", a: "Edit dasar dari file lokal bisa berjalan offline, tetapi mengunduh template, musik, efek, dan fitur AI/cloud membutuhkan internet. Unduh aset yang dibutuhkan saat ada Wi-Fi bila kuotamu terbatas." },
    { q: "CapCut tidak bisa dibuka, apa penyebabnya?", a: "Umumnya penyimpanan penuh, cache rusak, atau versi tertinggal. Kosongkan ruang, hapus cache aplikasi dari pengaturan HP, perbarui dari Play Store, lalu coba lagi. Hindari memasang versi lama dari situs acak sebagai jalan pintas." },
    { q: "Apakah teks otomatis CapCut mendukung Bahasa Indonesia?", a: "Ya, teks otomatis CapCut mendukung Bahasa Indonesia dan hasilnya cukup baik untuk ucapan yang jelas. Tetap periksa ejaan nama, istilah, dan angka setelah dibuat, karena akurasi bergantung pada kejernihan audio." },
  ],
  relatedTool: null,
};
