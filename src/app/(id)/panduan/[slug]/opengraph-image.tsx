import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";
import { getGuide } from "@/lib/data/guides";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return new Response("Not found", { status: 404 });
  const subtitle = g.metaDescription.length > 150 ? g.metaDescription.slice(0, 147) + "…" : g.metaDescription;
  return new ImageResponse(
    <OgCard title={g.title} subtitle={subtitle} eyebrow="Panduan • CekAPK" />,
    { ...size }
  );
}
