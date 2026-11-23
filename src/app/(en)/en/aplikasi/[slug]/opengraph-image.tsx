import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";
import { getEnApp } from "@/lib/data/i18n-en";
import { getApp } from "@/lib/data/apps";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = getEnApp(slug);
  const base = getApp(slug);
  if (!en || !base) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    <OgCard title={base.name} subtitle={en.taglineEn} eyebrow={`${base.categoryName} • CekAPK`} />,
    { ...size }
  );
}
