import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";
import { categories } from "@/lib/data/categories";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return new Response("Not found", { status: 404 });
  const subtitle = c.blurb.length > 150 ? c.blurb.slice(0, 147) + "…" : c.blurb;
  return new ImageResponse(
    <OgCard title={`Aplikasi ${c.name}`} subtitle={subtitle} eyebrow="Kategori • CekAPK" />,
    { ...size }
  );
}
