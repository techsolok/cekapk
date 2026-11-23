import type { Metadata } from "next";
import { site } from "./site";
import { author } from "./data/author";

const ogImage = { url: "/og-default.jpg", width: 1200, height: 630, alt: `${site.name} - ${site.tagline}` };

export function pageMetadata(opts: { title: string; description: string; path: string; noindex?: boolean; languages?: Record<string, string>; ogImage?: string | "dynamic"; locale?: string }): Metadata {
  // SEO-04: satu kebijakan trailing slash — "/" untuk beranda, tanpa slash di
  // akhir untuk semua path lain — dipakai canonical dan og:url secara sama,
  // sehingga keduanya tidak pernah berbeda lagi.
  const path = opts.path === "/" ? "/" : opts.path.replace(/\/+$/, "");
  const url = site.url + path;
  // Phase 2A: og:locale mengikuti bahasa halaman dari path — /en/* selalu en_US,
  // halaman Indonesia tetap id_ID. Parameter locale eksplisit (bila ada) tetap menang.
  const locale = opts.locale ?? (path.startsWith("/en") ? "en_US" : site.locale);
  // SEO-14: ogImage "dynamic" = jangan set images di metadata sama sekali,
  // supaya konvensi file opengraph-image.tsx rute itu yang dipakai Next
  // (URL-nya membawa suffix hash build, mis. /opengraph-image-lexgr5).
  // String = URL gambar tertentu. Tanpa ogImage = /og-default.jpg.
  const image = opts.ogImage === "dynamic" ? undefined
    : opts.ogImage ? { url: opts.ogImage, width: 1200, height: 630, alt: opts.title }
    : ogImage;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url, languages: opts.languages ?? { "id-ID": url, "x-default": url } },
    openGraph: { title: opts.title, description: opts.description, url, siteName: site.name, locale, type: "website", ...(image ? { images: [image] } : {}) },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, ...(image ? { images: [image.url] } : {}) },
    robots: opts.noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export const websiteJsonLd = (locale: "id" | "en" = "id") => {
  // UI-03 Rev 1 (C2): locale-aware WebSite. Indonesian edition keeps the
  // canonical site URL + Indonesian search; the English edition gets its own
  // canonical URL (/en), inLanguage en-US and the English search destination
  // (/en/aplikasi?q=) — never the Indonesian one.
  const en = locale === "en";
  return {
    "@context": "https://schema.org", "@type": "WebSite",
    "@id": en ? `${site.url}/en#site` : `${site.url}/#site`,
    name: site.name, url: en ? `${site.url}/en` : site.url, inLanguage: en ? "en-US" : "id-ID",
    publisher: { "@id": `${site.url}/#org` },
    potentialAction: { "@type": "SearchAction", target: en ? `${site.url}/en/aplikasi?q={query}` : `${site.url}/aplikasi?q={query}`, "query-input": "required name=query" },
  };
};
// Organization: sameAs HANYA diisi profil yang benar-benar ada. Hari ini kosong
// (belum ada kanal brand) - jangan pernah mengarang URL profil. Karena itu kunci
// sameAs dihilangkan sama sekali sampai ada profil nyata (SEO-15).
export const organizationJsonLd = () => ({
  "@context": "https://schema.org", "@type": "Organization",
  "@id": `${site.url}/#org`,
  name: site.name, url: site.url + "/",
  logo: `${site.url}/icons/icon-512.png`,
  description: site.description,
});
export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: site.url + it.path })),
});
export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
export const articleJsonLd = (g: { title: string; path: string; verifiedAt: string; lang?: string }) => ({
  "@context": "https://schema.org", "@type": "Article",
  headline: g.title,
  author: author.personJsonLd,
  publisher: { "@id": `${site.url}/#org` },
  datePublished: g.verifiedAt, dateModified: g.verifiedAt,
  mainEntityOfPage: site.url + g.path, inLanguage: g.lang ?? "id-ID",
});
// HowTo: guides pass {title, desc} steps; tool pages pass plain step
// sentences (Nov 2026) — a plain string becomes a step whose name and text
// are both that sentence, matching the visible ordered list.
export const howToJsonLd = (g: { title: string; path: string; steps: ({ title: string; desc: string } | string)[] }) => ({
  "@context": "https://schema.org", "@type": "HowTo",
  name: g.title,
  step: g.steps.map((s) => typeof s === "string" ? { "@type": "HowToStep", name: s, text: s } : { "@type": "HowToStep", name: s.title, text: s.desc }),
});
// Peta kategori internal -> applicationCategory schema.org (hanya nilai yang memang ada
// di schema.org; JANGAN mengarang kategori). Sebelumnya semua aplikasi memakai
// "UtilitiesApplication" yang salah untuk kebanyakan aplikasi.
export function schemaCategory(categorySlug: string): string {
  switch (categorySlug) {
    case "sosial": return "SocialNetworkingApplication";
    case "video-foto": return "MultimediaApplication";
    case "musik": return "MultimediaApplication";
    case "game": return "GameApplication";
    case "pendidikan": return "EducationalApplication";
    case "keuangan": return "FinanceApplication";
    case "kesehatan": return "HealthApplication";
    default: return "UtilitiesApplication";
  }
}
// SoftwareApplication HANYA dengan field yang benar - aggregateRating, softwareVersion,
// dan fileSize dilarang dikarang (PRD 12.1): versi/ukuran tidak pernah dikumpulkan
// sebagai angka, jadi tidak dimasukkan. offers hanya untuk aplikasi gratis; aplikasi
// berbayar tidak mendapat klaim harga 0.
// UI-03 Rev 1 (C4): locale-aware. lang "en" => inLanguage en-US; description
// memakai tagline yang memang tampil di halaman (bukan teks karangan); pageUrl
// menautkan skema ke halaman panduan CekAPK-nya sebagai mainEntityOfPage.
// Audit fix 2026-11-17: url = halaman CekAPK-nya (pageUrl); tautan Play Store
// pindah ke installUrl. aggregateRating/softwareVersion/fileSize tetap dilarang.
export const softwareAppJsonLd = (app: { name: string; categorySlug: string; priceLabel: string; developer: string; url: string; lang?: "id" | "en"; description?: string; pageUrl?: string }) => {
  const en = app.lang === "en";
  const base: Record<string, unknown> = {
    "@context": "https://schema.org", "@type": "SoftwareApplication",
    name: app.name, applicationCategory: schemaCategory(app.categorySlug), operatingSystem: "Android",
    author: { "@type": "Organization", name: app.developer },
    url: app.pageUrl ?? app.url, installUrl: app.url, inLanguage: en ? "en-US" : "id-ID",
  };
  if (app.description) base.description = app.description;
  if (app.pageUrl) base.mainEntityOfPage = app.pageUrl;
  if (app.priceLabel.startsWith("Gratis")) base.offers = { "@type": "Offer", price: "0", priceCurrency: "IDR" };
  return base;
};
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
