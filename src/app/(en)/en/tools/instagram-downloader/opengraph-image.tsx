import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const title = "Instagram Video Downloader — Download Public Reels Without Login";
const subtitle = "Download public Instagram Reels and videos as MP4 without logging in. Preview the video, copy its link, and download responsibly with CekAPK.";

export default function Image() {
  return new ImageResponse(
    <OgCard title={title} subtitle={subtitle} eyebrow="Tool • CekAPK" />,
    { ...size }
  );
}
