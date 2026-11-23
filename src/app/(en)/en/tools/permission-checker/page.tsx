import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumb, FaqAccordion, ToolShell } from "@/components/ui";
import PermissionCheckerEn from "./PermissionCheckerEn";

const faqs = [
  { q: "Where do I take the best screenshot for this tool?", a: "The Permissions page in Android Settings: open Settings → Apps → choose the app → Permissions. All granted and denied permissions are shown there in clear text, so the OCR reads accurately. Screenshots from the Play Store page's 'App permissions' section work too." },
  { q: "Is my screenshot stored?", a: "No. The image is written to a temporary file on the server only while the OCR runs (a few seconds), then deleted. We only record anonymous metadata: how many permissions were found and how many are high risk — without the image content and without the app's name." },
  { q: "Why is a permission missing even though the app asks for it?", a: "OCR reads what is visible in the screenshot. Permissions not shown on screen (the page was not scrolled, text cut off, low resolution) will not be read. This tool is a quick aid, not a replacement for careful manual reading." },
  { q: "Which permissions are the most dangerous?", a: "Reading/sending SMS (the OTP-theft route), installing other apps from outside the Play Store, appearing on top of other apps, and accessibility services. Several high permissions together on a simple app are the clearest warning sign." },
  { q: "What should I do if I find a suspicious permission?", a: "Revoke it from Settings → Apps → Permissions. If the app came from outside the Play Store and asks for SMS, install, or accessibility permissions, the safest choice is to delete the app, and change important passwords if an OTP was ever read." },
];
const steps = [
  "Open Settings → Apps, choose the app, then open Permissions, and take a screenshot of the list.",
  "Upload the screenshot on this page.",
  "Press Check These Permissions and wait a few seconds.",
  "Read each permission's risk level, its advice, and any combination warnings.",
];
export const metadata: Metadata = pageMetadata({ title: "App Permission Checker — Check Android App Permissions", description: "Upload a screenshot of an app's permission list; the tool reads it and explains each permission's risk in plain English.", path: "/en/tools/permission-checker", languages: { "id-ID": `${site.url}/tools/pemeriksa-izin`, "en-US": `${site.url}/en/tools/permission-checker`, "x-default": `${site.url}/tools/pemeriksa-izin` }, locale: "en_US", ogImage: "dynamic" });
export default function PermissionToolEnPage() {
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "English Home", path: "/en" }, { name: "Tools", path: "/en/tools" }, { name: "App Permission Checker", path: "/en/tools/permission-checker" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={howToJsonLd({ title: "App Permission Checker — Check Android App Permissions", path: "/en/tools/permission-checker", steps })} />
      <Breadcrumb items={[{ name: "English Home", path: "/en" }, { name: "Tools", path: "/en/tools" }, { name: "App Permission Checker", path: "/en/tools/permission-checker" }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">App Permission Checker</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/75">Most APK scams do not attack through complicated code, but through the permissions you grant yourself. Upload a screenshot of an app&apos;s permission list, and this tool will read it and explain the risks one by one in plain language.</p>
      </header>
      <ToolShell title="App Permission Checker"><PermissionCheckerEn /></ToolShell>
      <section aria-label="How to use" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">How to Use the App Permission Checker</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/80">{steps.map((s) => (<li key={s}>{s}</li>))}</ol>
      </section>
      <section className="space-y-3 leading-relaxed text-ink/80">
        <h2 className="text-xl font-bold text-ink">How to Read the Results</h2>
        <p>A <strong>high-risk</strong> permission gives the app great power over your phone and data: reading SMS messages with OTP codes, installing other apps, drawing over other apps, or controlling the screen through accessibility. Such a permission is sometimes legitimate for the right app — a messaging app does need SMS — but almost never legitimate for a flashlight, wallpaper, casual game, or &quot;cleaner&quot; app.</p>
        <p>A <strong>medium-risk</strong> permission is contextual: always ask &quot;does this app&apos;s main feature make sense without this permission?&quot; Maps without location do not work; a recipe app with precise location deserves a question. <strong>Low-risk</strong> permissions are common ones like internet and notifications that almost every modern app has.</p>
        <p>What matters most is not one permission, but the combination. SMS plus install permission is the classic scam-download pattern; overlay plus accessibility is the forced-ads and fake-button pattern. The tool flags those dangerous combinations separately in the warnings.</p>
      </section>
      <section aria-label="Frequently asked questions" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Frequently Asked Questions</h2>
        <FaqAccordion faqs={faqs} />
      </section>
    </div>
  );
}
