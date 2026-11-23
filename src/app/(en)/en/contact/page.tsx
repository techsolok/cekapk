import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Contact", description: "Contact the CekAPK team: questions, corrections, security reports, and DMCA.", path: "/en/contact", languages: { "id-ID": "/kontak", "en-US": "/en/contact", "x-default": "/kontak" }, locale: "en_US" });
export default function KontakPage() {
  return (
    <div className="space-y-4 py-8">
      <h1 className="text-2xl font-extrabold text-ink">Contact</h1>
      <p className="leading-relaxed text-ink/80">For general questions and content corrections: <a className="font-semibold text-linkblue" href={`mailto:${site.emailKontak}`}>{site.emailKontak}</a></p>
      <p className="leading-relaxed text-ink/80">For copyright claims (DMCA) and APK security reports: <a className="font-semibold text-linkblue" href={`mailto:${site.emailDmca}`}>{site.emailDmca}</a> - review target 2 business days.</p>
      <p className="text-sm text-muted">Both email addresses above are active and monitored. A test email to {site.emailKontak} was received (5 November 2026). If your email is not answered within 2 business days, please send it again with the same subject.</p>
    </div>
  );
}
