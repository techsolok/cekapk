import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const title = "TikTok Video Downloader — Download Public Videos Online";
const subtitle = "Use CekAPK's TikTok video downloader to process supported TikTok video links. Paste a link, preview available details, and download using our online tool.";

export default function Image() {
  return new ImageResponse(
    <OgCard title={title} subtitle={subtitle} eyebrow="Tool • CekAPK" />,
    { ...size }
  );
}
