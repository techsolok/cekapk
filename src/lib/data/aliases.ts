// Tabel alias pencarian - FR-HOME-02. Hanya menunjuk ke halaman yang BENAR-BENAR ada.
import { pillarApps } from "./apps";
export const searchAliases: Record<string, string> = {
  "tik tok": "tiktok", "tt": "tiktok", "wa": "whatsapp", "whats app": "whatsapp",
  "ig": "instagram", "insta": "instagram", "tele": "telegram",
  "yt": "youtube", "you tube": "youtube", "mc": "minecraft", "minecraf": "minecraft",
  "bilibili": "bstation", "b station": "bstation", "apk kucing": "kucing-apk",
  "kucing pink": "kucing-apk", "kucing": "kucing-apk", "cap cut": "capcut",
  "ml": "mobile-legends", "mobile legend": "mobile-legends", "ff": "free-fire",
  "pubg": "pubg-mobile", "gi": "genshin-impact", "chrome": "google-chrome",
  "browser": "google-chrome", "km": "kinemaster", "am": "alight-motion",
  "lr": "lightroom", "foto google": "google-photos", "google foto": "google-photos",
  "terjemahan": "google-translate", "gmaps": "google-maps", "maps": "google-maps",
  "fb": "facebook", "facebook lite": "facebook", "wa bisnis": "whatsapp-business",
  "whatsapp bisnis": "whatsapp-business", "uang elektronik": "dana",
  "dompet digital": "dana", "e wallet": "ovo", "ewallet": "gopay",
  "nonton anime": "crunchyroll", "belanja online": "shopee", "ojek online": "gojek",
  "pesan makanan": "grab", "tiket pesawat": "traveloka", "belajar online": "ruangguru",
  "belajar bahasa inggris": "duolingo", "rapat online": "zoom", "word": "microsoft-word",
};
export const starterApps = pillarApps.map((a) => ({ name: a.name, slug: a.slug }));
