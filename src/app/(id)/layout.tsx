import type { Metadata } from "next";
import "../globals.css";
import { jakarta } from "@/lib/font";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} - ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  themeColor: "#1565D8",
};

export default function IdRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("idapk-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}` }} />
      </head>
      <body>
        <SiteChrome locale="id">{children}</SiteChrome>
      </body>
    </html>
  );
}
