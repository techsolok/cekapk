import { ImageResponse } from "next/og";
import { OgCard } from "@/lib/og-card";
import { getApp } from "@/lib/data/apps";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    // Phase 2A: "Link Resmi" menyesatkan untuk info_only tanpa sumber resmi (hanya Kucing APK).
    <OgCard title={app.name} subtitle={app.tagline} eyebrow={app.legalStatus === "info_only" ? `${app.categoryName} • CekAPK` : `${app.categoryName} • Info & Link Resmi`} />,
    { ...size }
  );
}
