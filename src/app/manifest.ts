import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
// Web App Manifest (Fase 4, PRD 9.4): nama/ikon dari identitas situs, warna dari token desain 9.2.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name, short_name: site.name, description: site.description,
    start_url: "/", scope: "/", display: "standalone", orientation: "portrait",
    background_color: "#FFFFFF", theme_color: "#1565D8", lang: "id-ID",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
