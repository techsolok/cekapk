import { Plus_Jakarta_Sans } from "next/font/google";

// Font dipakai bersama oleh kedua root layout grup rute ((id) dan (en)) agar
// <html> masing-masing bisa mendeklarasikan lang yang benar tanpa duplikasi setup.
export const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-jakarta", display: "swap" });
