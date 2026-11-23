import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "DMCA & Content Removal", description: "How copyright owners can request content removal from CekAPK — 2-business-day review target.", path: "/en/dmca", languages: { "id-ID": "/dmca", "en-US": "/en/dmca", "x-default": "/dmca" }, locale: "en_US" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">DMCA &amp; Content Removal</h1>
      <p className="text-sm text-muted">Last updated: 8 November 2026 - Applies to {site.name}.</p>
      <p className="leading-relaxed text-ink/80">{site.name} respects copyright. Our policy is not to host copyrighted works without permission; our app pages are informational, and download buttons point to official sources or to files that have passed our verification pipeline.</p>

      <h2 className="text-lg font-bold text-ink">Our Voluntary Reporting Process</h2>
      <p className="leading-relaxed text-ink/80">This page describes {site.name}&apos;s voluntary reporting and review procedure for copyright complaints. It is not a representation that {site.name} has established every element of the formal US DMCA statutory process, and this page is not legal advice. If you need a formal statutory process, consult a legal adviser.</p>

      <h2 className="text-lg font-bold text-ink">Who May Submit a Complaint</h2>
      <p className="leading-relaxed text-ink/80">A copyright complaint may be submitted by the copyright owner, or by an agent authorized to act on the owner&apos;s behalf. If you are reporting on behalf of someone else, state your relationship to the owner and your authority to act for them.</p>

      <h2 className="text-lg font-bold text-ink">Information That Helps Us Review Your Report</h2>
      <p className="leading-relaxed text-ink/80">Send your report to <a className="font-semibold text-linkblue" href={`mailto:${site.emailDmca}`}>{site.emailDmca}</a> and include the following information so we can review it: (1) your identification and contact details, (2) identification of the copyrighted work claimed to have been infringed — enough detail for us to find it, (3) the exact URL on our site where the allegedly infringing material appears, and (4) a good-faith statement that you believe the use is not authorized by the copyright owner, its agent, or the law. This list is our practical guide for reviewing reports — not a complete checklist of statutory DMCA notice requirements. A report that does not include the exact URL or a clear identification of the work is hard for us to process.</p>

      <h2 className="text-lg font-bold text-ink">How We Review Reports</h2>
      <p className="leading-relaxed text-ink/80">Our internal target is to review within 2 business days — this is our internal target, not a legal deadline. We check the reported URL, the identified work, and whether the material is hosted by us or only linked to an official source. When a report is valid, we aim to take appropriate action within that internal target; cases that require additional investigation may take longer. We will inform the reporter of the outcome; when a report is not valid, or when the material is only an informational page linking to an official source, we explain why. The number of copyright reports we receive is shown as an aggregate count on our Transparency page; no complainant personal information is published there.</p>

      <h2 className="text-lg font-bold text-ink">Material Hosted or Linked by Third Parties</h2>
      <p className="leading-relaxed text-ink/80">When the material complained about sits on a third-party server, or when our page only links to it, action against that material may require the external host or the copyright owner. We can review our own pages and links — including removing a problematic link — but we cannot promise to remove material from third-party servers.</p>

      <h2 className="text-lg font-bold text-ink">Responding to a Removal Decision or Reporting a Mistaken Removal</h2>
      <p className="leading-relaxed text-ink/80">If your content was removed and you believe that was a mistake, or you are entitled to the material, send a response to <a className="font-semibold text-linkblue" href={`mailto:${site.emailDmca}`}>{site.emailDmca}</a> with: your identification and contact details, identification of the material and where it appeared on our site, and an explanation of why the removal was a mistake or why you are entitled to use the material. We review every response individually; there is no automatic restoration. The statutory 10–14-business-day procedure does not apply here — we review responses against the same 2-business-day internal target, and each decision is made case by case.</p>

      <h2 className="text-lg font-bold text-ink">False or Careless Notices</h2>
      <p className="leading-relaxed text-ink/80">A false or careless notice can harm others; please make sure your claim is correct before sending it. We do not accept notices that do not identify a specific work or a specific URL on our site.</p>
    </article>
  );
}
