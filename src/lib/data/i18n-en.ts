import type { EnAppContent, EnGuideContent } from "./i18n-en-types";
import { enAppsA } from "./i18n-en-apps-a";
import { enAppsB, enGuides as enGuidesList } from "./i18n-en-apps-b";
export const enApps: EnAppContent[] = [...enAppsA, ...enAppsB];
export const enGuides: EnGuideContent[] = enGuidesList;
export function getEnApp(slug: string): EnAppContent | undefined { return enApps.find((a) => a.slug === slug); }
export function getEnGuide(slug: string): EnGuideContent | undefined { return enGuides.find((g) => g.slug === slug); }
export function hasEnApp(slug: string): boolean { return enApps.some((a) => a.slug === slug); }
export function hasEnGuide(slug: string): boolean { return enGuides.some((g) => g.slug === slug); }

// English tool pages (SEO-17). Unlike apps/guides, tool slugs differ
// between editions (ID: /tools/pengunduh-instagram, EN:
// /en/tools/instagram-downloader), so the mapping is explicit.
export interface EnTool { idSlug: string; enPath: string }
export const enTools: EnTool[] = [
  { idSlug: "pengunduh-instagram", enPath: "/en/tools/instagram-downloader" },
  { idSlug: "pengunduh-tiktok", enPath: "/en/tools/tiktok-downloader" },
  { idSlug: "pemeriksa-izin", enPath: "/en/tools/permission-checker" },
];
export function hasEnTool(idSlug: string): boolean { return enTools.some((t) => t.idSlug === idSlug); }
export function getEnToolPath(idSlug: string): string | undefined { return enTools.find((t) => t.idSlug === idSlug)?.enPath; }

// Trust pages pair the same way (explicit idSlug -> enPath mapping)
// because their slugs differ between editions (e.g. /privasi ->
// /en/privacy-policy). Phase 1 trust pages & AdSense readiness, Nov 2026.
export interface EnTrust { idSlug: string; enPath: string }
export const enTrust: EnTrust[] = [
  { idSlug: "privasi", enPath: "/en/privacy-policy" },
  { idSlug: "ketentuan", enPath: "/en/terms-of-use" },
  { idSlug: "tentang", enPath: "/en/about" },
  { idSlug: "kontak", enPath: "/en/contact" },
  { idSlug: "dmca", enPath: "/en/dmca" },
  { idSlug: "kebijakan-iklan", enPath: "/en/advertising-policy" },
];
export function hasEnTrust(idSlug: string): boolean { return enTrust.some((t) => t.idSlug === idSlug); }
export function getEnTrustPath(idSlug: string): string | undefined { return enTrust.find((t) => t.idSlug === idSlug)?.enPath; }
