// Author of CekAPK guides (audit H1 author/byline work, Nov 2026).
// Name + photo decided by Ahmad Raza on 2026-11-18. Bio is a draft written
// from facts (he founded and runs CekAPK) — Ahmad can correct it any time.
import { site } from "@/lib/site";

export const author = {
  name: "Ahmad Raza",
  photo: "/images/author-ahmad-raza.png",
  role: {
    id: "Pendiri & Editor CekAPK",
    en: "Founder & Editor, CekAPK",
  },
  bio: {
    id: "Ahmad Raza adalah pendiri CekAPK. Ia memeriksa aplikasi Android dan menulis panduan keamanan agar pengguna Indonesia bisa memasang aplikasi dengan aman — tanpa tombol unduh palsu dan tanpa klaim yang tidak bisa diverifikasi.",
    en: "Ahmad Raza is the founder of CekAPK. He checks Android apps and writes safety guides so Indonesian users can install apps safely — without fake download buttons and without claims that cannot be verified.",
  },
  // Profile pages carrying the full bio.
  profilePath: { id: "/tentang", en: "/en/about" },
  // Person node for Article JSON-LD.
  personJsonLd: {
    "@type": "Person",
    name: "Ahmad Raza",
    url: `${site.url}/tentang`,
    image: `${site.url}/images/author-ahmad-raza.png`,
    jobTitle: "Founder & Editor, CekAPK",
  },
} as const;
