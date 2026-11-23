import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const title = "Pemeriksa Izin Aplikasi dari Tangkapan Layar - Cek Risiko Izin Android";
const subtitle = "Unggah tangkapan layar daftar izin sebuah aplikasi; tool ini membaca izinnya dan menjelaskan mana yang berisiko tinggi, sedang, atau rendah dalam Bahasa Indonesia yang sederhana.";

export default function Image() {
  return new ImageResponse(
    <OgCard title={title} subtitle={subtitle} eyebrow="Tool • CekAPK" />,
    { ...size }
  );
}
