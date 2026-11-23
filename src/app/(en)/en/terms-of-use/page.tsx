import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Terms of Use", description: "Rules for using the CekAPK site, tools, and content — including downloaders, copyright, and service limits.", path: "/en/terms-of-use", languages: { "id-ID": "/ketentuan", "en-US": "/en/terms-of-use", "x-default": "/ketentuan" }, locale: "en_US" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">Terms of Use</h1>
      <p className="text-sm text-muted">Last updated: 7 November 2026 - Applies to {site.name}.</p>

      <h2 className="text-lg font-bold text-ink">1. Acceptance of These Terms</h2>
      <p className="leading-relaxed text-ink/80">By using this site you agree to these terms. If you do not agree, please do not use the site or its tools. These terms apply to the website, the online tools, and all content published on {site.name}.</p>

      <h2 className="text-lg font-bold text-ink">2. Permitted Use</h2>
      <p className="leading-relaxed text-ink/80">You may use the site and its tools for lawful, personal purposes: reading app information and safety guides, checking an APK&apos;s permissions from a screenshot, and downloading content you own or have permission to download. The tools are provided free of charge and require no account or login.</p>

      <h2 className="text-lg font-bold text-ink">3. Prohibited Use</h2>
      <p className="leading-relaxed text-ink/80">You must not use the site or its tools to infringe copyright or other rights, to download content you do not own and have no permission to download, to distribute malware or harmful files, to abuse, overload, or attack the service, to bypass rate limits or security controls, or to misrepresent {site.name} content as your own. We do not provide, host, or link to pirated APKs, modified or premium-unlocked apps, gambling apps, or adult content.</p>

      <h2 className="text-lg font-bold text-ink">4. Your Responsibility for Downloaded Content</h2>
      <p className="leading-relaxed text-ink/80">You are responsible for how you use anything you download through our tools. Download only content you own or are permitted to download, and respect the rights of creators and the terms of the platform the content came from. We are not responsible for how downloaded content is used after it leaves our service.</p>

      <h2 className="text-lg font-bold text-ink">5. Copyright and Intellectual Property</h2>
      <p className="leading-relaxed text-ink/80">All app names, trademarks, and logos on this site belong to their respective owners. The original text, guides, and reviews published on {site.name} are our own work; you may link to them and quote short excerpts with attribution, but you may not copy substantial parts or republish them as your own. If you believe content on this site infringes your copyright, see our DMCA &amp; Content Removal page.</p>

      <h2 className="text-lg font-bold text-ink">6. APK Information and Official Download Sources</h2>
      <p className="leading-relaxed text-ink/80">App pages on this site are informational. Where a safe official download exists — usually the Google Play Store or the developer&apos;s own site — we point to it. Where no safe official route exists, we say so plainly and, where possible, suggest a legal alternative instead of providing a file. Installing an app from an official source is your own decision; we show the status and the risks as honestly as we know them, and we display the verification date on each app page.</p>

      <h2 className="text-lg font-bold text-ink">7. Downloader Service Limitations</h2>
      <p className="leading-relaxed text-ink/80">The downloader tools work only with public content that the source platform makes available, and only for links we can reach. A tool may fail or return limited results when a link is private, deleted, region-restricted, or when the source platform blocks automated access. We do not store the media you process, we do not guarantee that any particular link will work, and we do not keep copies of downloaded files. Download availability depends on the source, not on us.</p>

      <h2 className="text-lg font-bold text-ink">8. Service Availability and Changes</h2>
      <p className="leading-relaxed text-ink/80">The site and its tools may change, pause, or become temporarily unavailable — for maintenance, for platform changes beyond our control, or for abuse prevention. Content on the site may change, and apps may be updated by their developers at any time. We aim to keep verification dates accurate and to show them on every app page. We may update, suspend, or remove any page, tool, or file at any time.</p>

      <h2 className="text-lg font-bold text-ink">9. Security and Abuse Prevention</h2>
      <p className="leading-relaxed text-ink/80">To keep the service usable for everyone, we apply rate limits, automated challenges, and abuse detection to the tools and APIs. Misuse — including bulk or automated extraction, attempts to bypass these controls, or uploading malicious files — may result in your access being limited or blocked. Files in the Legal APK Library are published only after a verification pipeline (hash, signature match, scan, and permission audit); a file that fails any step is not published.</p>

      <h2 className="text-lg font-bold text-ink">10. Third-Party Links and Services</h2>
      <p className="leading-relaxed text-ink/80">This site links to third-party services — app stores, developers&apos; websites, and the platforms our tools read from (such as TikTok and Instagram). We do not control those services, their content, or their terms; using them is subject to their own policies. A link to a third-party service is not an endorsement of everything that service does.</p>

      <h2 className="text-lg font-bold text-ink">11. Reporting and Complaint Handling</h2>
      <p className="leading-relaxed text-ink/80">If you find an error, a broken official link, or an app that should not be recommended, report it through the Contact page. Copyright complaints follow the process on our DMCA &amp; Content Removal page; security reports about APK files go to the same address. Our review target is 2 business days. Accepted corrections are recorded on the affected page, and pages that no longer meet our standards are corrected or withdrawn.</p>

      <h2 className="text-lg font-bold text-ink">12. Limitation of Liability</h2>
      <p className="leading-relaxed text-ink/80">The site, tools, and content are provided &quot;as is&quot;, without warranties of any kind, to the extent permitted by applicable law. To the extent permitted by applicable law, {site.name} is not liable for losses arising from your use of the site, from content you download or install, from third-party services, or from temporary unavailability of the service. Nothing in these terms limits liability that cannot be limited under applicable law. Security scores are assessments based on our verification process, not absolute guarantees.</p>

      <h2 className="text-lg font-bold text-ink">13. Contact and Changes to These Terms</h2>
      <p className="leading-relaxed text-ink/80">Questions about these terms can be sent to {site.emailKontak}. We may update these terms when the site, the tools, or the law changes; the &quot;Last updated&quot; date above shows the current version. Continued use of the site after an update means you accept the updated terms.</p>
    </article>
  );
}
