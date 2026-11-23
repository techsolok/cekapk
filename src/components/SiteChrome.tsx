import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PwaRegister from "@/components/PwaRegister";
import Footer from "@/components/Footer";
import { websiteJsonLd, JsonLd } from "@/lib/seo";
import AnalyticsConsent from "@/components/AnalyticsConsent";

// Isi <body> yang dipakai bersama kedua grup rute. <html lang> sendiri tinggal di
// masing-masing layout grup, sehingga /en/* bisa mendeklarasikan lang="en" sementara
// halaman Indonesia tetap lang="id" - tanpa mengubah satu URL pun (grup rute tidak
// muncul di URL).
export default function SiteChrome({ children, locale = "id" }: { children: React.ReactNode; locale?: "id" | "en" }) {
  const en = locale === "en";
  return (
    <>
      <PwaRegister />
      <JsonLd data={websiteJsonLd(locale)} />
      <a href="#konten" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:p-3 focus:text-white">{en ? "Skip to content" : "Lewati ke konten"}</a>
      <Header locale={locale} />
      <main id="konten" className="mx-auto w-full max-w-5xl px-4 pb-24 sm:pb-10">{children}</main>
      <Footer locale={locale} />
      <BottomNav locale={locale} />
      <AnalyticsConsent locale={locale} />
    </>
  );
}
