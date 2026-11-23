import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description: "How CekAPK collects, uses, and protects visitor data — including downloader processing, cookies, and future advertising.", path: "/en/privacy-policy", languages: { "id-ID": "/privasi", "en-US": "/en/privacy-policy", "x-default": "/privasi" }, locale: "en_US" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">Privacy Policy</h1>
      <p className="text-sm text-muted">Last updated: 8 November 2026 - Applies to {site.name}.</p>
      <p className="leading-relaxed text-ink/80">We collect as little data as possible. We do not sell personal data. Personal data is processed in accordance with Indonesia&apos;s Personal Data Protection Act (UU PDP) as relevant; other privacy laws may also apply depending on your location and applicable law. You may request access, correction, and deletion of your personal data through the Contact page ({site.emailKontak}).</p>

      <h2 className="text-lg font-bold text-ink">Downloader Tools (TikTok &amp; Instagram)</h2>
      <p className="leading-relaxed text-ink/80">When you paste a link, our server fetches information and video from that link only to give you the result you asked for. We do not store the videos or photos you process. The tools&apos; technical logs store only anonymous metadata (time, success or failure) and never write the full URL to the log; any full URL held temporarily is deleted within 24 hours.</p>

      <h2 className="text-lg font-bold text-ink">Permission Checker (Screenshots)</h2>
      <p className="leading-relaxed text-ink/80">Screenshots you upload are processed on our own server with Tesseract OCR (Indonesian + English) — images are not sent to any third-party OCR or AI service, and are not used to train models. The image is written to a temporary file only while OCR is running (a matter of seconds), then deleted. All we record is anonymous metadata: how many permissions were found and how many are high-risk — without the image content and without the app name. Uploads are limited to a maximum of 8 MB and to PNG, JPG, or WebP only; other formats are rejected by the server.</p>

      <h2 className="text-lg font-bold text-ink">Legal APK Library &amp; Reports</h2>
      <p className="leading-relaxed text-ink/80">Files in the Legal APK Library come only from the site administrator and are only published after passing the verification pipeline (see the Verification Methodology page). For published files, we show the SHA-256 hash, the signature fingerprint, the scan result, and its permissions — that is data about the file, not about visitors. Security or DMCA reports you send by email are used only to handle that report, with a review target of 2 business days.</p>

      <h2 className="text-lg font-bold text-ink">Server Logs, Cookies, Analytics &amp; Advertising</h2>
      <p className="leading-relaxed text-ink/80">Server logs store anonymous technical metadata for security and improvement (time, tool success) — not the content of your uploads. This site uses Google Analytics 4 (GA4) to understand website traffic and improve its pages, but analytics is optional: GA4 only activates after you accept it through the consent banner (&quot;Accept analytics&quot;). If you decline or have not chosen yet, GA4 does not load and no analytics data is collected. Your choice is saved in your browser, and you can change it at any time using the &quot;Cookie settings&quot; button that appears at the bottom right after you choose. The site does not display third-party advertising, so no advertising tracker collects your data. Essential functional cookies may be used currently for site functions (for example, your dark/light theme choice); advertising cookies are not currently operating. You can delete cookies at any time through your browser settings.</p>

      <h2 className="text-lg font-bold text-ink">Future Advertising (Google AdSense and Other Third-Party Providers)</h2>
      <p className="leading-relaxed text-ink/80">This section describes a future possibility, not a current practice: {site.name} does not currently display advertisements, and no advertising cookies are currently operating on this site. In the future, {site.name} may use Google AdSense or other third-party advertising providers. If advertising is shown, advertising providers may use cookies or similar technologies, and may set their own cookies, subject to applicable consent requirements; Google and its partners may use information to serve, personalize, measure, and limit advertisements, as applicable. Users can manage advertising personalization through Google Ads Settings (My Ad Center) at https://myadcenter.google.com/ or www.aboutads.info/choices. Third-party providers process data under their own privacy policies; Google&apos;s advertising privacy documentation is available at https://policies.google.com/technologies/ads. If advertising is activated for visitors in regions that require consent, {site.name} will implement a Google-certified consent management platform and configure it before serving ads where required.</p>

      <h2 className="text-lg font-bold text-ink">Data Requests &amp; Deletion</h2>
      <p className="leading-relaxed text-ink/80">To request access, correction, or deletion of your personal data, send an email to {site.emailKontak} with the subject &quot;Personal Data Request&quot; and describe the data involved. We target a reply within 2 business days. Requests will be reviewed and handled. Because our tools do not store your uploads, there is usually no visitor file to delete. However, certain records — including emails and reports you sent yourself — may need to be retained where required or permitted by applicable law, for security, or for legitimate operational requirements.</p>
    </article>
  );
}
