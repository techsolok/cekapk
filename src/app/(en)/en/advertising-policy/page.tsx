import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = pageMetadata({ title: "Advertising & Sponsored Content Policy", description: "How CekAPK handles sponsored content, paid posts, and advertising — clearly labelled and editorially independent.", path: "/en/advertising-policy", languages: { "id-ID": "/kebijakan-iklan", "en-US": "/en/advertising-policy", "x-default": "/kebijakan-iklan" }, locale: "en_US" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">Advertising &amp; Sponsored Content Policy</h1>
      <p className="text-sm text-muted">Last updated: 8 November 2026 - Applies to {site.name}.</p>
      <p className="leading-relaxed text-ink/80">{site.name} does not currently run sponsored posts or display paid advertising. This policy describes how sponsored content and advertising would be handled if they are introduced in the future, so readers know the rules in advance.</p>

      <h2 className="text-lg font-bold text-ink">Clear Identification</h2>
      <p className="leading-relaxed text-ink/80">Any sponsored article, paid placement, or advertisement will be clearly identified as sponsored or as an advertisement, in a way readers cannot miss. Sponsored content will never be presented as if it were an ordinary editorial article.</p>

      <h2 className="text-lg font-bold text-ink">Sponsored Content Is Not Editorial Opinion</h2>
      <p className="leading-relaxed text-ink/80">Paid content does not automatically represent {site.name}&apos;s editorial opinion. A sponsored article reflects the advertiser&apos;s message, and will be labelled as such; our own guides, reviews, and security assessments are written independently and are not for sale.</p>

      <h2 className="text-lg font-bold text-ink">Reviews and Security Ratings Cannot Be Bought</h2>
      <p className="leading-relaxed text-ink/80">Advertisers cannot purchase guaranteed positive reviews, favorable coverage, or security ratings. App descriptions are written from official sources, and security scores are calculated only from our verification pipeline. No payment changes a rating, a score, or whether an app is recommended.</p>

      <h2 className="text-lg font-bold text-ink">Affiliate Relationships</h2>
      <p className="leading-relaxed text-ink/80">If affiliate relationships are introduced — links that earn {site.name} a commission when a reader buys something — they will be disclosed clearly on the page where the link appears and in this policy. We do not currently use affiliate links.</p>

      <h2 className="text-lg font-bold text-ink">Sponsored Links</h2>
      <p className="leading-relaxed text-ink/80">Sponsored links will use appropriate link attributes, including rel=&quot;sponsored&quot; where applicable, so search engines and readers can distinguish paid links from editorial links.</p>

      <h2 className="text-lg font-bold text-ink">What We Will Not Accept</h2>
      <p className="leading-relaxed text-ink/80">{site.name} reserves the right to reject any promotion that is unsafe, misleading, illegal, or irrelevant to our readers — including pirated software, gambling, adult content, and products that contradict our safety mission. We may refuse a sponsorship for any reason, without explanation.</p>

      <h2 className="text-lg font-bold text-ink">Editorial Independence and Reader Trust</h2>
      <p className="leading-relaxed text-ink/80">Editorial independence and reader trust take priority over advertising revenue. If a sponsorship would require us to change an honest assessment, hide a risk, or mislead readers, we will not accept it. Questions about advertising or sponsorship can be sent to {site.emailKontak}.</p>
    </article>
  );
}
