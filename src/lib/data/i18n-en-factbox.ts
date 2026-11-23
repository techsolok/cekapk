// English FactBox values (UI-03 Rev 1, Part 2). Exact editorial translations
// of the closed Indonesian value sets in the app catalog — category, price,
// minimum Android, languages, version note, size. Proper names and package
// identifiers are never translated (they pass through untouched).
// Fallback: an unmapped value is returned AS-IS (Indonesian) rather than
// blanked or guessed — a missing mapping is visible, not silently wrong.
// Add the new value here AND the matching check in scripts/check-seo.mjs.

const CATEGORY_EN: Record<string, string> = {
  "sosial": "Social",
  "video-foto": "Video & Photo",
  "musik": "Music",
  "game": "Games",
  "produktivitas": "Productivity",
  "pendidikan": "Education",
  "keuangan": "Finance",
  "kesehatan": "Health",
  "utilitas": "Utilities",
  "anime-hiburan-legal": "Anime & Legal Entertainment",
};
export function categoryNameEn(categorySlug: string, fallback: string): string {
  return CATEGORY_EN[categorySlug] ?? fallback;
}

const PRICE_EN: Record<string, string> = {
  "Gratis (ada pembelian dalam aplikasi - Robux)": "Free (in-app purchases — Robux)",
  "Gratis (ada pembelian dalam aplikasi)": "Free (with in-app purchases)",
  "Gratis (ada pembelian dalam aplikasi / sistem gacha)": "Free (with in-app purchases / gacha system)",
  "Gratis": "Free",
  "Gratis dengan watermark & fitur terbatas (langganan Premium berbayar untuk menghapusnya)": "Free with watermark & limited features (paid Premium subscription to remove it)",
  "Gratis dengan watermark (keanggotaan berbayar untuk fitur penuh & tanpa watermark)": "Free with watermark (paid membership for full features & no watermark)",
  "Gratis (langganan Gold berbayar untuk aset & fitur premium)": "Free (paid Gold subscription for premium assets & features)",
  "Gratis (fitur premium memerlukan langganan Adobe berbayar)": "Free (premium features require a paid Adobe subscription)",
  "Sebagian konten dapat gratis dengan iklan; akses penuh dan banyak episode terbaru memerlukan langganan Premium berbayar": "Some content may be free with ads; full access and many of the latest episodes require a paid Premium subscription",
  "Sebagian konten gratis; paket berbayar diperlukan untuk banyak konten premium, serial eksklusif, dan pertandingan tertentu": "Some content free; a paid plan is required for much premium content, exclusive series, and certain matches",
  "Sebagian episode gratis dengan iklan; VIP berbayar untuk episode lanjutan, akses awal, dan manfaat paket tertentu": "Some episodes free with ads; paid VIP for later episodes, early access, and certain plan benefits",
  "Gratis diunduh; konten memerlukan langganan berbayar": "Free to download; content requires a paid subscription",
  "Gratis untuk aplikasi; barang, ongkir, dan layanan yang dibeli dibayar sesuai transaksi di dalam aplikasi": "Free for the app; goods, shipping, and services purchased are paid per transaction in the app",
  "Gratis untuk aplikasi; barang, ongkir, tagihan, dan layanan yang dibeli dibayar sesuai transaksi di dalam aplikasi": "Free for the app; goods, shipping, bills, and services purchased are paid per transaction in the app",
  "Gratis dengan ruang penyimpanan akun Google; ruang lebih besar tersedia lewat langganan Google One berbayar": "Free with Google account storage; more space available through a paid Google One subscription",
  "Gratis untuk aplikasi; saldo, transfer, dan layanan tertentu mengikuti ketentuan biaya yang ditampilkan di aplikasi": "Free for the app; balance, transfers, and certain services follow the fees shown in the app",
  "Gratis (ada iklan dan fitur berbayar opsional)": "Free (with ads and optional paid features)",
  "Gratis (ada iklan)": "Free (with ads)",
  "Gratis (Nitro berbayar opsional)": "Free (optional paid Nitro)",
  "Gratis (Snapchat+ berbayar opsional)": "Free (optional paid Snapchat+)",
  "Gratis terbatas (paket berbayar untuk penyelenggara rapat)": "Limited free (paid plan for meeting organizers)",
  "Gratis (penyimpanan tambahan lewat Google One berbayar)": "Free (extra storage through paid Google One)",
  "Gratis (Google Workspace dan penyimpanan tambahan berbayar)": "Free (Google Workspace and extra storage paid)",
  "Gratis (Super Duolingo berbayar opsional)": "Free (optional paid Super Duolingo)",
  "Gratis sebagian (paket belajar berbayar)": "Partly free (paid learning plan)",
  "Gratis (biaya layanan dibayar per pesanan)": "Free (service fee paid per order)",
  "Gratis (harga produk perjalanan dari masing-masing penyedia)": "Free (travel product prices from each provider)",
  "Gratis (belanja produk di dalam platform)": "Free (product purchases inside the platform)",
  "Gratis (fitur premium memerlukan langganan Microsoft 365)": "Free (premium features require a Microsoft 365 subscription)",
  "Gratis (fitur lanjutan di Google Workspace berbayar)": "Free (advanced features in paid Google Workspace)",
  "Gratis (Platform/API WhatsApp Business berbayar untuk skala besar)": "Free (WhatsApp Business platform/API paid at large scale)",
  "Gratis (ada iklan & pembelian dalam aplikasi)": "Free (with ads & in-app purchases)",
  "Gratis (ada fitur Pro berbayar)": "Free (with paid Pro features)",
  "Gratis (ada Telegram Premium berbayar)": "Free (with paid Telegram Premium)",
  "Gratis (ada iklan; YouTube Premium berbayar)": "Free (with ads; YouTube Premium paid)",
  "Gratis (dengan iklan) / Premium berbayar": "Free (with ads) / paid Premium",
  "Gratis (ada Canva Pro berbayar)": "Free (with paid Canva Pro)",
  "Gratis (ada konten Premium berbayar)": "Free (with paid Premium content)",
  "Berbayar - sekali beli (harga resmi di Play Store)": "Paid — one-time purchase (official price on Google Play)",
  "Klaim gratis dari sumber tidak resmi - bukan penawaran resmi": "Free claim from an unofficial source — not an official offer",
};
export function priceLabelEn(idLabel: string): string {
  return PRICE_EN[idLabel] ?? idLabel;
}

const MIN_ANDROID_EN: Record<string, string> = {
  "Bervariasi menurut perangkat": "Varies by device",
  "Tidak terverifikasi": "Not verified",
};
export function minAndroidEn(idLabel: string): string {
  return MIN_ANDROID_EN[idLabel] ?? idLabel;
}

const LANGUAGES_EN: Record<string, string> = {
  "Bahasa mengikuti pengaturan perangkat dan layanan": "Language follows your device and service settings",
  "Bahasa Indonesia & banyak bahasa lain": "Indonesian & many other languages",
  "Subtitle Bahasa Indonesia untuk banyak judul": "Indonesian subtitles for many titles",
  "Bahasa Indonesia tersedia di dalam game": "Indonesian available in-game",
  "Klaim subtitle Bahasa Indonesia dari sumber tidak resmi": "Indonesian-subtitle claim from an unofficial source",
};
export function languagesEn(idLabel: string): string {
  return LANGUAGES_EN[idLabel] ?? idLabel;
}

const VERSION_NOTE_EN: Record<string, string> = {
  "Ditentukan Play Store saat instal; kami tidak mencetak nomor versi": "Determined by Google Play at install; we don't print a version number",
  "Tidak ada versi resmi - aplikasi ini tidak ada di Play Store": "No official version — this app is not on Google Play",
};
export function versionNoteEn(idLabel: string): string {
  return VERSION_NOTE_EN[idLabel] ?? idLabel;
}

const SIZE_EN: Record<string, string> = {
  "Bervariasi menurut perangkat": "Varies by device",
  "Tidak terverifikasi": "Not verified",
};
export function sizeLabelEn(idLabel: string): string {
  return SIZE_EN[idLabel] ?? idLabel;
}
