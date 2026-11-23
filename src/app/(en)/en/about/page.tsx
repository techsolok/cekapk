import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { author } from "@/lib/data/author";
export const metadata: Metadata = pageMetadata({ title: "About CekAPK", description: "CekAPK is a site for honest Android app information, free online tools, and APK security checks. Read our editorial policy.", path: "/en/about", languages: { "id-ID": "/tentang", "en-US": "/en/about", "x-default": "/tentang" }, locale: "en_US" });
export default function Page() {
  return (
    <article className="prose-legal py-8">
      <h1 className="text-2xl font-extrabold text-ink">About CekAPK</h1>
      <p className="text-sm text-muted">Last updated: 18 November 2026 - Applies to {site.name}.</p>
      <p className="leading-relaxed text-ink/80">{site.name} was built for one simple problem: Indonesian users are often sent to APK sites that are heavy, full of fake download buttons, and risky. We built the alternative — light enough for entry-level phones, fully in Bahasa Indonesia, and honest about security.</p>
      <p className="leading-relaxed text-ink/80">Our editorial policy: descriptions are written originally from facts taken from official sources, verification dates are always shown, ratings are never invented, and pages that do not meet our quality standard are not published. Corrections can be submitted through the Contact page and will be recorded on the affected page.</p>

      <h2 className="text-xl font-bold text-ink">Why This Site Exists</h2>
      <p className="leading-relaxed text-ink/80">Finding an Android app should be simple: you want to know what an app does, whether it is safe, and where to download it officially. In practice, many APK sites make it harder — slow pages full of ads, misleading download buttons, descriptions copied word for word, and security claims with no evidence. The users hurt most are those with low-end phones and limited data, because every heavy page and every wrong download costs them both.</p>
      <p className="leading-relaxed text-ink/80">{site.name} is built on three promises you can check for yourself on every page: light, fully in Bahasa Indonesia, and honest about what we know and what we do not know. When information cannot be verified from an official source, we write it as unverified — we do not invent numbers or claims to make a page look convincing.</p>

      <h2 className="text-xl font-bold text-ink">Our Editorial Policy</h2>
      <p className="leading-relaxed text-ink/80">Every app description on this site is written originally from facts taken from official sources, such as the Play Store page and the app publisher&apos;s website. We do not copy descriptions from other sites, and we do not invent version numbers, ratings, or release dates. Every app page shows the date it was last checked by an editor, and pages that have not been verified for a long time are marked so you know the information may have changed.</p>
      <p className="leading-relaxed text-ink/80">Our quality standard also applies to what we do not publish. Pages that do not meet the standard — because the facts cannot be verified, the sources are unclear, or the app itself is problematic — are not published at all. We would rather have a smaller catalog you can trust than a large one full of doubtful pages.</p>

      <h2 className="text-xl font-bold text-ink">How Verification Works</h2>
      <p className="leading-relaxed text-ink/80">For apps whose files we provide in the library, verification follows a strict path: official sources first, the file&apos;s digital signature matched against a registered official fingerprint, the file scanned by several scanning engines, and its permissions explained in plain language — including warnings for dangerous permission combinations. A security score is only calculated when every step passes; a file that fails one step cannot be published. You can read the full methodology on the Security page (in Indonesian), and the real numbers on files published, held back, and reported on the Transparency page (in Indonesian).</p>
      <p className="leading-relaxed text-ink/80">For informational app pages that do not provide a file — pages that only point to the Play Store or an official site — verification means checking the facts from official sources and showing them as they are, including unwelcome facts such as an app being paid, or an app being information-only because no safe official download route exists. No security score is shown for apps whose files we did not check ourselves, because a score without a check is an empty claim.</p>

      <h2 className="text-xl font-bold text-ink">Corrections and Feedback</h2>
      <p className="leading-relaxed text-ink/80">We can be wrong, and we want to know when that happens. If you find an incorrect fact, an official link that has changed, or an app we should not recommend, submit a correction through the <Link className="font-semibold text-linkblue" href="/en/contact">Contact</Link> page. Accepted corrections will be recorded on the affected page, and pages proven to no longer meet our standards will be corrected or withdrawn. Reports about suspicious files are handled through the same route.</p>

      <h2 className="text-xl font-bold text-ink">What We Never Do</h2>
      <p className="leading-relaxed text-ink/80">This site never provides pirated apps, modified apps, gambling apps, or adult apps — in any form, including as links. We do not promote apps that break Indonesian law, we do not disguise paid apps as free, and we do not use misleading download buttons. When a popular app turns out to be available only through unofficial or unlawful routes, our page will explain it as information only and point you to a legal alternative, rather than providing the file.</p>
      <p className="leading-relaxed text-ink/80">The same principle applies to our free tools: nothing asks for your password, none of your files are stored, and no results are invented. That is the standard we hold for every page, tool, and file on this site.</p>

      <h2 className="text-xl font-bold text-ink">About the Author</h2>
      <div className="flex items-start gap-4">
        <Image src={author.photo} alt={author.name} width={96} height={96} className="h-24 w-24 shrink-0 rounded-full object-cover" />
        <div>
          <p className="font-bold text-ink">{author.name} — {author.role.en}</p>
          <p className="leading-relaxed text-ink/80">{author.bio.en}</p>
        </div>
      </div>
    </article>
  );
}
