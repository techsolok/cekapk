// Halaman perbandingan (PRD 7.3): dua aplikasi dari KATALOG kami, satu halaman,
// data dan vonis ditulis editor - bukan tabel hasil salin-tempel.
export interface ComparisonRow { aspect: string; a: string; b: string; winner: "a" | "b" | "seri" }
export interface Comparison {
  slug: string; title: string; aSlug: string; bSlug: string; aName: string; bName: string;
  intro: string[]; rows: ComparisonRow[]; verdict: string[]; whoA: string; whoB: string;
  faqs: { q: string; a: string }[]; verifiedAt: string;
}
export const comparisons: Comparison[] = [
  {
    slug: "whatsapp-vs-telegram", title: "WhatsApp vs Telegram: Mana yang Lebih Cocok untuk Kamu?",
    aSlug: "whatsapp", bSlug: "telegram", aName: "WhatsApp", bName: "Telegram",
    intro: [
      "WhatsApp dan Telegram sama-sama aplikasi pesan gratis, tetapi filosofinya berbeda. WhatsApp menang di jumlah pengguna: hampir semua kontakmu di Indonesia ada di sana. Telegram menang di fitur dan fleksibilitas: cloud penuh, grup raksasa, channel, bot, dan batas kirim file yang jauh lebih besar.",
      "Perbandingan ini ditulis dari data halaman kedua aplikasi di situs kami dan dicek pada tanggal yang tertera. Tidak ada skor karangan: setiap baris tabel menyebut fakta yang bisa kamu verifikasi sendiri di Play Store dan di dalam kedua aplikasi.",
    ],
    rows: [
      { aspect: "Jumlah pengguna di Indonesia", a: "Sangat besar - standar de facto untuk chat pribadi, keluarga, dan bisnis kecil.", b: "Lebih kecil, kuat di komunitas, channel publik, dan grup hobi/teknologi.", winner: "a" },
      { aspect: "Enkripsi", a: "Enkripsi end-to-end aktif default untuk semua chat pribadi dan grup.", b: "Enkripsi end-to-end hanya di Secret Chat; chat biasa terenkripsi klien-server dan tersimpan di cloud Telegram.", winner: "a" },
      { aspect: "Batas ukuran file", a: "Dokumen hingga 2 GB.", b: "File hingga 2 GB per file untuk semua pengguna (lebih besar dengan Premium).", winner: "seri" },
      { aspect: "Kapasitas grup", a: "Grup hingga 1.024 anggota; Komunitas untuk banyak grup terkait.", b: "Supergrup hingga 200.000 anggota dengan alat moderasi lengkap.", winner: "b" },
      { aspect: "Channel / siaran", a: "Channels ada, tetapi penemuan dan alat adminnya lebih sederhana.", b: "Channel tanpa batas pelanggan, statistik, komentar terhubung, dan jadwal pos.", winner: "b" },
      { aspect: "Sinkronisasi multi-perangkat", a: "Berbasis ponsel utama; hingga 4 perangkat pendamping terhubung.", b: "Cloud penuh: semua perangkat setara, riwayat selalu sinkron tanpa ponsel menyala.", winner: "b" },
      { aspect: "Bot dan otomatisasi", a: "Terbatas pada WhatsApp Business API untuk bisnis.", b: "Bot API terbuka dan kaya - ribuan bot publik untuk utilitas dan komunitas.", winner: "b" },
      { aspect: "Fitur bisnis kecil", a: "Katalog produk, label, balasan cepat di WhatsApp Business - standar UMKM Indonesia.", b: "Ada bot toko dan channel, tetapi ekosistem pembeli-Indonesia jauh lebih kecil.", winner: "a" },
      { aspect: "Panggilan video grup", a: "Hingga 32 peserta, terintegrasi dengan chat yang sama.", b: "Video chat grup besar lewat voice chat, lebih cocok untuk komunitas.", winner: "seri" },
      { aspect: "Penyimpanan cadangan", a: "Cadangan ke Google Drive / iCloud milik pengguna.", b: "Semua media tersimpan di cloud Telegram tanpa memakan kuota Drive pengguna.", winner: "b" },
      { aspect: "Privasi nomor telepon", a: "Nomor adalah identitas utama dan terlihat oleh anggota grup.", b: "Bisa memakai username publik dan menyembunyikan nomor dari orang asing.", winner: "b" },
      { aspect: "Kecepatan dan ukuran aplikasi", a: "Ringan-moderat; berat bertambah dengan cadangan media lokal.", b: "Sangat cepat dan hemat tempat berkat cache cloud yang bisa dibersihkan kapan saja.", winner: "b" },
    ],
    verdict: [
      "Pilih WhatsApp bila tujuanmu menjangkau orang: keluarga, pelanggan, dan grup warga hampir pasti ada di sana, enkripsinya aktif secara default, dan WhatsApp Business adalah alat jualan paling praktis untuk UMKM Indonesia.",
      "Pilih Telegram bila kamu mengelola komunitas besar, butuh mengirim file besar, memakai banyak perangkat, atau suka otomatisasi bot. Untuk banyak orang jawabannya adalah keduanya: WhatsApp untuk orang-orang terdekat dan pelanggan, Telegram untuk komunitas dan arsip cloud.",
    ],
    whoA: "Kamu yang chat dengan keluarga dan pelanggan, jualan online, atau tidak mau mengajari kontakmu aplikasi baru.",
    whoB: "Kamu yang mengelola komunitas/grup besar, sering mengirim file besar, memakai laptop dan ponsel bersamaan, atau peduli username tanpa membagikan nomor.",
    faqs: [
      { q: "Mana yang lebih aman, WhatsApp atau Telegram?", a: "Untuk chat biasa, WhatsApp lebih aman secara default karena semua chat terenkripsi end-to-end. Di Telegram, enkripsi end-to-end hanya aktif pada Secret Chat yang harus dinyalakan manual dan tidak tersedia untuk grup." },
      { q: "Bisakah memindahkan riwayat chat dari WhatsApp ke Telegram?", a: "Bisa untuk chat yang diekspor: Telegram menyediakan impor riwayat dari file ekspor WhatsApp pada banyak versi. Hasilnya berupa salinan di chat Telegram, bukan penggabungan dua akun." },
      { q: "Mana yang lebih hemat kuota dan memori?", a: "Telegram biasanya lebih hemat memori ponsel karena media disimpan di cloud dan cache bisa dibatasi. WhatsApp menyimpan media yang diunduh di penyimpanan lokal dan cadangan memakan kuota Google Drive." },
      { q: "Apakah Telegram bisa untuk jualan seperti WhatsApp Business?", a: "Bisa dengan bot dan channel, dan sebagian toko memakainya. Tetapi pembeli Indonesia jauh lebih terbiasa bertransaksi lewat WhatsApp, jadi untuk jualan umum WhatsApp Business tetap pilihan utama." },
      { q: "Apakah keduanya gratis?", a: "Ya untuk pemakaian normal. Telegram menawarkan Premium opsional (batas lebih besar, fitur ekstra), dan WhatsApp Business API berbayar untuk pengiriman pesan skala besar oleh bisnis." },
    ],
    verifiedAt: "2026-10-20",
  },
];
export function getComparison(slug: string): Comparison | undefined { return comparisons.find((c) => c.slug === slug); }
