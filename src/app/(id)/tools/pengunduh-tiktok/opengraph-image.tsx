import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const title = "Pengunduh Video TikTok - Gratis, Tanpa Instal Aplikasi";
const subtitle = "Unduh video TikTok publik dari link: pratinjau, pilihan tanpa watermark bila disediakan sumbernya, dan audio MP3. Gratis, tanpa instal, tanpa akun - beserta penjelasan batasannya.";

export default function Image() {
  return new ImageResponse(
    <OgCard title={title} subtitle={subtitle} eyebrow="Tool • CekAPK" />,
    { ...size }
  );
}
