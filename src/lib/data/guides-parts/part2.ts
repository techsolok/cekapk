import type { Guide } from "../content-types";

export const instalAman: Guide = {
  slug: "cara-instal-apk-aman", title: "Cara Instal Aplikasi Android dengan Aman",
  type: "howto",
  metaDescription: "Langkah memasang aplikasi Android dengan aman: dari Play Store, cek developer dan izin, aktifkan Play Protect, dan aturan berkas APK dari luar.",
  intro: [
    "Hampir semua kasus HP Android terkena malware di Indonesia bermula dari satu momen: memasang aplikasi dari tempat yang salah. Kabar baiknya, menghindarinya tidak butuh keahlian teknis - cukup kebiasaan yang benar setiap kali memasang aplikasi baru.",
    "Panduan ini merangkum cara instal yang aman dari awal sampai akhir: sumber yang boleh dipercaya, hal yang diperiksa sebelum menekan Instal, pengaturan keamanan yang wajib aktif, dan aturan khusus bila suatu saat kamu benar-benar harus memasang berkas APK dari luar Play Store.",
  ],
  steps: [
    { title: "Selalu mulai dari Google Play Store", desc: "Play Store adalah satu-satunya toko aplikasi yang meninjau aplikasi, menampilkan developer terverifikasi, dan memindai dengan Google Play Protect. Aplikasi perbankan, dompet digital, dan pesan hanya boleh dari sini - tanpa pengecualian." },
    { title: "Periksa nama developer, bukan hanya nama aplikasi", desc: "Aplikasi palsu meniru nama dan ikon aplikasi terkenal. Pastikan penerbitnya adalah perusahaan aslinya (misalnya WhatsApp LLC untuk WhatsApp, Google LLC untuk aplikasi Google), dan curigai penerbit dengan nama mirip-mirip." },
    { title: "Baca angka dan ulasan dengan kritis", desc: "Lihat jumlah unduhan dan pola ulasan terbaru. Aplikasi resmi populer punya jutaan unduhan dan ulasan beragam. Aplikasi baru dengan unduhan sedikit tetapi mengklaim sebagai versi resmi aplikasi terkenal adalah tanda bahaya." },
    { title: "Periksa daftar izin sebelum dan sesudah memasang", desc: "Di halaman Play Store ada bagian izin aplikasi. Setelah terpasang, buka Pengaturan > Aplikasi > izin, dan matikan izin yang tidak masuk akal untuk fungsinya - senter tidak butuh kontakmu." },
    { title: "Pastikan Play Protect aktif", desc: "Buka Play Store > foto profil > Play Protect, pastikan fitur pindai aktif. Play Protect memeriksa aplikasi dari Play Store maupun dari luar secara berkala dan memperingatkan yang berbahaya." },
    { title: "Perbarui hanya dari sumber yang sama", desc: "Pembaruan aplikasi Play Store datang dari Play Store. Bila sebuah situs atau pesan menyuruhmu memperbarui aplikasi lewat berkas unduhan, itu bukan pembaruan - itu upaya mengganti aplikasimu dengan versi lain." },
  ],
  sections: [
    { heading: "Aturan Khusus Berkas APK dari Luar Play Store (Sideloading)", paragraphs: [
      "Ada keadaan sah untuk memasang APK dari luar: aplikasi open-source dari repositori resmi proyeknya, aplikasi internal perusahaan, atau berkas langsung dari situs developer yang kamu kenal. Di luar keadaan itu, sideloading hampir tidak pernah perlu untuk pengguna biasa - dan untuk aplikasi perbankan serta dompet digital, tidak pernah boleh.",
      "Bila memang harus: unduh hanya dari situs resmi proyeknya (bukan situs pengumpul berkas), cocokkan nama developer dan tanda tangan bila proyek menyediakannya, pindai berkas dengan Play Protect saat memasang, dan setelah selesai matikan kembali izin instal dari sumber tidak dikenal untuk browser atau pengelola berkas yang kamu pakai.",
    ]},
    { heading: "Kebiasaan Setelah Memasang", paragraphs: [
      "Perhatikan perilaku HP beberapa hari setelah memasang aplikasi baru: iklan muncul di luar aplikasi, baterai tiba-tiba boros, HP panas tanpa dipakai, atau kuota terkuras adalah tanda umum aplikasi bermasalah. Hapus aplikasi terakhir yang dipasang dan jalankan pemindaian Play Protect bila gejala ini muncul.",
      "Setiap beberapa bulan, tinjau daftar aplikasi terpasang dan hapus yang tidak lagi dipakai. Semakin sedikit aplikasi, semakin kecil permukaan serangan - dan semakin lega penyimpanan HP-mu.",
    ]},
  ],
  faqs: [
    { q: "Apakah memasang APK dari luar Play Store selalu berbahaya?", a: "Tidak selalu, tetapi selalu berisiko lebih tinggi. Keadaan sahnya sempit: proyek open-source resmi, aplikasi perusahaan, atau developer resmi yang memang tidak memakai Play Store. Untuk aplikasi populer, perbankan, dan dompet digital, jawabannya selalu: hanya Play Store." },
    { q: "Apa itu Google Play Protect dan apakah cukup?", a: "Play Protect adalah pemindai keamanan bawaan Android yang memeriksa aplikasi saat dipasang dan secara berkala, termasuk yang dari luar Play Store. Ia sangat membantu tetapi bukan jaminan mutlak terhadap berkas yang sengaja dibuat menghindari deteksi - karena itu sumber unduhan tetap yang utama." },
    { q: "Kenapa HP saya meminta izin instal dari sumber tidak dikenal?", a: "Itu peringatan keamanan Android bahwa kamu sedang memasang aplikasi dari luar toko resmi. Android memintanya per aplikasi sumber (misalnya per browser). Berikan hanya bila kamu sepenuhnya sadar berkas apa itu dan dari situs resmi mana - dan cabut lagi setelahnya." },
    { q: "Aplikasi di Play Store apakah pasti aman?", a: "Jauh lebih aman, bukan sempurna. Google meninjau dan memindai, tetapi sesekali aplikasi buruk lolos dan kemudian diturunkan. Karena itu tetap periksa developer, izin, dan ulasan - dan segera hapus aplikasi yang diberitakan bermasalah." },
    { q: "Teman mengirim saya berkas APK lewat WhatsApp, boleh dipasang?", a: "Perlakukan sama seperti unduhan acak: jangan dipasang kecuali kamu tahu persis aplikasi apa itu, siapa pembuat resminya, dan kenapa tidak diambil dari Play Store saja. Di Indonesia, berkas APK yang diteruskan lewat chat adalah salah satu jalur penipuan pencurian kode OTP yang paling marak." },
  ],
  relatedApps: ["whatsapp", "minecraft"],
  verifiedAt: "2026-10-18",
};

export const cekIzin: Guide = {
  slug: "cara-cek-izin-aplikasi", title: "Cara Cek Izin Aplikasi di Android dan Artinya dalam Bahasa Awam",
  type: "howto",
  metaDescription: "Panduan memeriksa izin aplikasi Android: cara membuka daftar izin, arti izin kamera, mikrofon, kontak, lokasi, penyimpanan, dan izin mana yang berbahaya.",
  intro: [
    "Izin aplikasi adalah kunci yang kamu berikan ke setiap aplikasi: kunci ke kamera, kontak, lokasi, file, dan mikrofonmu. Sebagian izin memang dibutuhkan agar aplikasi bekerja; sebagian lagi diminta aplikasi nakal untuk mengumpulkan data yang tidak ada hubungannya dengan fungsinya.",
    "Panduan ini menunjukkan cara melihat dan mengubah izin di HP Android, menjelaskan arti izin-izin penting dengan bahasa sehari-hari, dan memberimu aturan praktis untuk memutuskan izin mana yang wajar dan mana yang harus dicabut.",
  ],
  steps: [
    { title: "Buka daftar izin per aplikasi", desc: "Masuk ke Pengaturan > Aplikasi > pilih aplikasi > Izin. Kamu akan melihat izin yang diizinkan dan yang ditolak, dan bisa mengubahnya satu per satu kapan pun tanpa menghapus aplikasi." },
    { title: "Atau tinjau per jenis izin", desc: "Di Pengaturan > Keamanan & privasi > Privasi > Pengelola izin (nama menu bisa sedikit berbeda per merek HP), pilih jenis izin seperti Lokasi atau Kontak untuk melihat semua aplikasi yang memegangnya sekaligus." },
    { title: "Terapkan aturan kecocokan fungsi", desc: "Untuk setiap izin, tanyakan: apakah fungsi utama aplikasi ini masuk akal membutuhkan izin itu? Editor video butuh file dan kamera - wajar. Kalkulator butuh kontak dan lokasi - tidak wajar, cabut." },
    { title: "Pakai pilihan sekali saja dan lokasi perkiraan", desc: "Android modern menawarkan izinkan hanya kali ini dan lokasi perkiraan (bukan titik presisi). Untuk kebanyakan aplikasi, dua pilihan ini memberi fungsi yang cukup dengan risiko jauh lebih kecil." },
    { title: "Cabut yang meragukan, uji aplikasinya", desc: "Cabut izin yang mencurigakan lalu pakai aplikasinya. Bila tetap bekerja normal, izin itu memang tidak dibutuhkan. Bila ada fitur yang butuh, kamu selalu bisa memberikannya lagi saat fitur itu dipakai." },
  ],
  sections: [
    { heading: "Arti Izin-Izin Penting", paragraphs: [
      "Kamera dan Mikrofon berarti aplikasi bisa mengambil gambar dan merekam suara saat diizinkan - perlu untuk panggilan video dan perekam, berbahaya di tangan aplikasi yang tidak jelas. Kontak berarti membaca daftar nomor dan nama di HP-mu - perlu untuk aplikasi pesan, tidak perlu untuk game dan senter. Lokasi berarti mengetahui keberadaanmu, dari perkiraan wilayah sampai titik presisi. Penyimpanan atau Foto & Video berarti mengakses berkas di HP - aplikasi modern seharusnya hanya mengakses file yang kamu pilih.",
      "Ada izin yang harus membuatmu berhenti sejenak: Aksesibilitas (bisa membaca layar dan mengendalikan HP - sering disalahgunakan penipuan perbankan), Tampil di Atas Aplikasi Lain (dasar iklan dan jendela palsu), Instal Aplikasi Tidak Dikenal, dan Administrator Perangkat. Di luar kebutuhan yang sangat jelas seperti aplikasi keamanan tepercaya atau alat bantu disabilitas resmi, jangan berikan izin-izin ini.",
    ]},
    { heading: "Izin dan Aplikasi Populer", paragraphs: [
      "Di setiap halaman aplikasi di situs kami, kami menjelaskan izin aplikasi itu satu per satu dengan bahasa awam dan kenapa diminta - misalnya kenapa WhatsApp butuh kontak dan mikrofon, atau kenapa editor video seperti CapCut butuh akses file. Gunakan halaman itu sebelum memasang, lalu cocokkan dengan yang kamu lihat di HP-mu.",
      "Ingat bahwa daftar izin bisa bertambah lewat pembaruan. Meninjau izin setiap beberapa bulan - terutama untuk aplikasi yang jarang dipakai - adalah kebiasaan keamanan termurah yang ada.",
    ]},
    { heading: "Jadwalkan Peninjauan Izin Secara Berkala", paragraphs: [
      "Izin bukan keputusan sekali seumur hidup. Aplikasi menerima izin baru lewat pembaruan, dan kamu sendiri kadang memberikan izin buru-buru untuk menyelesaikan suatu tugas lalu melupakannya. Luangkan sepuluh menit setiap beberapa bulan untuk membuka Pengelola Izin dan meninjau lima kategori terpenting: Lokasi, Kontak, Mikrofon, Kamera, dan Penyimpanan. Android juga menyediakan dasbor privasi di sebagian merek HP yang menunjukkan aplikasi mana yang baru-baru ini memakai izin sensitif - bila ada nama asing atau aplikasi yang jarang kamu buka muncul di sana, itu saatnya mencabut dan mempertimbangkan menghapusnya.",
    ]},
  ],
  faqs: [
    { q: "Apakah mencabut izin akan merusak aplikasi?", a: "Tidak merusak. Paling jauh, fitur yang bergantung pada izin itu berhenti sampai kamu mengizinkannya lagi - misalnya aplikasi pesan tidak bisa melampirkan foto bila izin file dicabut. Kamu selalu bisa mengembalikan izin dari menu yang sama." },
    { q: "Izin apa yang paling berbahaya?", a: "Aksesibilitas, administrator perangkat, tampil di atas aplikasi lain, dan instal aplikasi tidak dikenal adalah yang paling sering disalahgunakan, termasuk oleh penipuan yang membaca kode OTP dan menguras rekening. Berikan hanya ke aplikasi yang kamu kenal dan percayai sepenuhnya dengan alasan yang jelas." },
    { q: "Kenapa aplikasi meminta izin padahal tidak dipakai?", a: "Sebagian untuk fitur sampingan atau analitik dan iklan, sebagian karena pengembangnya meminta lebih dari yang perlu. Android modern membatasi ini dengan pilihan sekali saja dan akses file pilihan. Tolak yang tidak kamu pahami - aplikasi yang baik tetap bekerja." },
    { q: "Bagaimana cara tahu izin aplikasi sebelum memasangnya?", a: "Di halaman aplikasinya di Google Play Store ada bagian tentang keamanan data dan izin aplikasi. Situs kami juga merangkum izin aplikasi populer dan artinya di setiap halaman aplikasinya, dalam Bahasa Indonesia yang sederhana." },
    { q: "HP saya mereknya beda, menunya tidak sama persis", a: "Nama menu sedikit berbeda antar merek (Samsung, Xiaomi, Oppo, Vivo, dan lain-lain), tetapi strukturnya sama: Pengaturan > Aplikasi > (aplikasi) > Izin, dan Pengaturan privasi untuk pengelola izin. Gunakan fitur pencarian di bagian atas Pengaturan dan ketik izin bila kesulitan menemukannya." },
  ],
  relatedApps: ["whatsapp", "tiktok", "capcut"],
  verifiedAt: "2026-10-18",
};

export const apkPalsu: Guide = {
  slug: "cara-mengenali-apk-palsu", title: "Cara Mengenali APK Palsu dan Aplikasi Penipuan di Android",
  type: "safety",
  metaDescription: "Tanda-tanda aplikasi dan berkas APK palsu: peniruan aplikasi bank dan WhatsApp, file undangan penipuan, janji premium gratis, dan langkah bila terlanjur memasang.",
  intro: [
    "Aplikasi palsu dibuat menyerupai aplikasi yang kamu percaya - perbankan, dompet digital, WhatsApp, bahkan undangan pernikahan - dengan satu tujuan: membuatmu memasang dan membukanya. Di Indonesia, pola ini dipakai untuk mencuri kode OTP, mengambil alih akun, dan menguras rekening.",
    "Panduan ini merangkum tanda-tanda yang bisa kamu periksa dalam waktu kurang dari satu menit sebelum memasang apa pun, dan langkah yang harus segera dilakukan bila kamu atau keluargamu terlanjur memasang aplikasi palsu.",
  ],
  steps: null,
  sections: [
    { heading: "Tanda 1: Datang Lewat Chat, Bukan dari Toko Resmi", paragraphs: [
      "Bank, dompet digital, ekspedisi, dan instansi tidak pernah mengirim aplikasi lewat WhatsApp atau SMS. Berkas bertajuk undangan nikah digital, surat tilang, resi paket, tagihan, atau kurir yang berakhiran APK dan dikirim lewat chat adalah pola penipuan yang sudah sangat dikenal di Indonesia. Undangan dan dokumen asli berbentuk tautan atau PDF dari kanal resmi, bukan berkas aplikasi yang harus dipasang.",
      "Aturannya mutlak dan mudah diingat keluarga: tidak ada aplikasi yang boleh dipasang dari chat. Titik. Bila ada keraguan, buka aplikasi resmi yang sudah terpasang atau hubungi layanan pelanggan dari nomor di situs resmi instansi itu - bukan nomor di pesan yang mencurigakan.",
    ]},
    { heading: "Tanda 2: Nama dan Developer Hampir Sama, Tetapi Tidak Sama", paragraphs: [
      "Di luar Play Store maupun sesekali di hasil pencarian, aplikasi palsu meniru nama dengan perubahan kecil: huruf ditukar, ditambah kata Mod, Pro, Emas, atau 2026, ikon yang sedikit berbeda, dan nama developer yang mirip perusahaan asli. Selalu bandingkan dengan halaman resmi: developer aplikasi perbankan adalah bank itu sendiri, WhatsApp diterbitkan WhatsApp LLC/Meta, dan jumlah unduhan aplikasi resmi berskala jutaan sampai miliaran.",
      "Janji adalah tanda berikutnya: premium gratis selamanya, followers instan, melihat profil privat, penghasil uang tanpa kerja, sinyal judi pasti menang. Di dunia aplikasi, janji yang melanggar aturan platform hampir selalu dibayar dengan data atau uangmu.",
    ]},
    { heading: "Tanda 3: Meminta Izin Berbahaya Sejak Awal", paragraphs: [
      "Aplikasi palsu biasanya langsung meminta izin Aksesibilitas, izin membaca SMS, tampil di atas aplikasi lain, atau menjadi administrator perangkat - sering dibungkus alasan seperti verifikasi atau keamanan. Untuk aplikasi undangan atau penampil dokumen, permintaan seperti itu sama sekali tidak masuk akal. Izin aksesibilitas dan baca SMS adalah kombinasi yang dipakai penipuan perbankan untuk membaca kode OTP dan mengendalikan HP dari jauh.",
      "Perilaku setelah terpasang juga berbicara: HP panas dan baterai boros tanpa sebab, iklan muncul di layar utama di luar aplikasi, aplikasi perbankan menutup sendiri, atau muncul layar masuk bank yang tampilannya janggal di atas aplikasi lain. Semua ini alasan untuk berhenti memakai HP untuk transaksi sampai perangkat bersih.",
    ]},
    { heading: "Bila Terlanjur Memasang: Langkah Darurat", paragraphs: [
      "Segera aktifkan mode pesawat untuk memutus koneksi, jangan membuka aplikasi perbankan atau dompet digital, lalu hapus aplikasi mencurigakan itu. Dari perangkat lain yang aman, hubungi bank dan dompet digitalmu untuk memblokir akses, ganti kata sandi penting (email utama dulu, karena email adalah kunci pemulihan semua akun), dan aktifkan verifikasi dua langkah di mana-mana.",
      "Jalankan pemindaian Play Protect setelah penghapusan. Bila gejala berlanjut atau kamu sempat memberikan kode OTP dan melihat transaksi asing, laporkan ke bank dan kepolisian dengan bukti tangkapan layar, dan pertimbangkan reset pabrik setelah mencadangkan foto serta data penting secara aman. Kecepatan bertindak dalam jam pertama sangat menentukan seberapa besar kerugian bisa dicegah.",
    ]},
  ],
  faqs: [
    { q: "Saya menerima APK undangan nikah dari nomor yang saya kenal, apakah berarti aman?", a: "Tidak. Nomor pengirim bisa saja sudah dibajak - justru begitu pola ini menyebar, dari satu korban ke kontak-kontaknya. Konfirmasi lewat panggilan suara ke orangnya langsung, dan tetap jangan memasang berkas aplikasi dari chat apa pun alasannya." },
    { q: "Bagaimana aplikasi palsu bisa menguras rekening?", a: "Biasanya dengan membaca kode OTP lewat izin SMS atau aksesibilitas, lalu masuk ke perbankan korban dari perangkat penyerang, atau menampilkan layar bank palsu untuk memancing kata sandi. Karena itu bank tidak pernah mengirim aplikasi lewat chat dan tidak pernah meminta kode OTP - siapa pun yang memintanya adalah penipu." },
    { q: "Apakah aplikasi palsu bisa masuk Play Store?", a: "Jarang, tetapi pernah terjadi, dan Google menurunkannya setelah terdeteksi. Karena itu tetap periksa developer, ulasan terbaru, dan izin bahkan di Play Store, dan segera hapus serta laporkan aplikasi yang terbukti bermasalah. Risiko di luar Play Store berkali-kali lebih besar." },
    { q: "Penjual menawarkan APK premium murah lewat media sosial, apakah itu palsu?", a: "Hampir selalu bermasalah: berkas mod bajakan, akun curian, atau penipuan pembayaran di muka. Selain melanggar ketentuan layanan, kamu tidak punya perlindungan apa pun saat akun atau berkasnya mati. Gunakan jalur resmi atau versi gratis resmi." },
    { q: "Bagaimana mengajari keluarga agar tidak tertipu APK palsu?", a: "Ajarkan dua aturan yang mudah diingat: tidak memasang aplikasi dari chat dalam keadaan apa pun, dan tidak pernah memberikan kode OTP kepada siapa pun. Sediakan dirimu sebagai tempat bertanya sebelum mereka memasang sesuatu yang baru - satu pertanyaan bisa mencegah kerugian besar." },
  ],
  relatedApps: ["whatsapp", "minecraft", "kucing-apk"],
  verifiedAt: "2026-10-18",
};
