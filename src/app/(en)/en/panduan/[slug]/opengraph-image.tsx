import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";
import { getEnGuide } from "@/lib/data/i18n-en";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = getEnGuide(slug);
  if (!en) return new Response("Not found", { status: 404 });
  const intro = en.introEn[0] ?? "";
  const subtitle = intro.length > 150 ? intro.slice(0, 147) + "…" : intro;
  return new ImageResponse(
    <OgCard title={en.titleEn} subtitle={subtitle} eyebrow="Guide • CekAPK" />,
    { ...size }
  );
}
