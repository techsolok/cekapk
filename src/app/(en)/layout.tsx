import type { Metadata } from "next";
import "../globals.css";
import { jakarta } from "@/lib/font";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} in English`, template: `%s | ${site.name}` },
  description: "English edition of CekAPK: honest Android app guides on safety and official sources, a legal APK library, and free online tools for Android users.",
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  themeColor: "#1565D8",
};

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("idapk-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}` }} />
      </head>
      <body>
        <SiteChrome locale="en">{children}</SiteChrome>
      </body>
    </html>
  );
}
