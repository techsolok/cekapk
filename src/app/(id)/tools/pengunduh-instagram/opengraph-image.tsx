import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const title = "Pengunduh Video Instagram - Reel & Video Publik Tanpa Login";
const subtitle = "Unduh video dan Reels Instagram publik sebagai MP4 asli lewat server kami. Tanpa login, tanpa watermark tambahan, dengan pratinjau resmi dan pesan kesalahan yang jujur.";

export default function Image() {
  return new ImageResponse(
    <OgCard title={title} subtitle={subtitle} eyebrow="Tool • CekAPK" />,
    { ...size }
  );
}
