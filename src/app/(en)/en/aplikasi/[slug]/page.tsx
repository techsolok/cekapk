import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, JsonLd, softwareAppJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumb, FaqAccordion, FactBox, OfficialButton, TrustBadge, SafetyScore, RelatedApps } from "@/components/ui";
import { SectionHeading, AppTocMobile, AppTocAside } from "@/components/AppDetail";
import { Icon, LetterTile, formatCheckedEn } from "@/components/home";
import { enApps, getEnApp, enGuides, hasEnApp, getEnToolPath } from "@/lib/data/i18n-en";
import { getApp } from "@/lib/data/apps";
import { categoryNameEn, priceLabelEn, minAndroidEn, languagesEn, versionNoteEn, sizeLabelEn } from "@/lib/data/i18n-en-factbox";
import { lastCheckedInfo } from "@/lib/last-checked";

export function generateStaticParams() { return enApps.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const en = getEnApp(slug); const base = getApp(slug);
  if (!en || !base) return pageMetadata({ title: "Not Found", description: "-", path: "/en", noindex: true });
  // EN apps Nov 2026: the displayed check date is the genuine English review
  // date when the record carries one; apps without verifiedAtEn keep the
  // Indonesian verifiedAt (unchanged rendering for the 11 existing pages).
  const checkedAt = en.verifiedAtEn ?? base.verifiedAt;
  return pageMetadata({
    // Phase 2A: info_only without an official source uses the override from data
    // (the template "Official Download" title/description is misleading for such apps).
    title: en.seoTitleEn ?? `${base.name} for Android - Safety, Permissions & Official Download`,
    description: en.seoDescriptionEn ?? `${en.taglineEn} What ${base.name} is, how it works, its safety and privacy picture, and the official download link. Checked ${checkedAt}.`,
    path: `/en/aplikasi/${slug}`,
    ogImage: "dynamic",
    languages: { "id-ID": `${site.url}/aplikasi/${slug}`, "en-US": `${site.url}/en/aplikasi/${slug}`, "x-default": `${site.url}/aplikasi/${slug}` },
  });
}
export default async function EnAppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const en = getEnApp(slug); const base = getApp(slug);
  if (!en || !base) notFound();
  const checkedAt = en.verifiedAtEn ?? base.verifiedAt;
  const info = lastCheckedInfo(checkedAt);
  // Related English apps: same category first, then the rest of the English edition.
  const enRelated = enApps
    .map((e) => ({ e, b: getApp(e.slug) }))
    .filter((x): x is { e: (typeof enApps)[number]; b: NonNullable<ReturnType<typeof getApp>> } => Boolean(x.b) && x.e.slug !== slug);
  const sameCat = enRelated.filter((x) => x.b.categorySlug === base.categorySlug);
  const relatedEn = (sameCat.length >= 2 ? sameCat : enRelated).slice(0, 4);
  const altApps = base.alternatives.map((alt) => ({ alt, enSlug: alt.slug && hasEnApp(alt.slug) ? alt.slug : null }));
  const relatedGuidesEn = enGuides.filter((g) => (g.relatedAppsEn ?? []).includes(slug));
  // Related tool in English, only when the tool has an English edition.
  const enToolPath = base.relatedTool ? getEnToolPath(base.relatedTool.href.split("/").pop() ?? "") : undefined;
  const enToolLabel: Record<string, string> = { "pengunduh-tiktok": "TikTok Video Downloader", "pengunduh-instagram": "Instagram Downloader" };
  const enToolName = base.relatedTool ? enToolLabel[base.relatedTool.href.split("/").pop() ?? ""] : undefined;
  const toc = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "What It Does" },
    { id: "safety", label: "Permissions & Safety" },
    { id: "compatibility", label: "Compatibility" },
    { id: "pros", label: "Pros & Cons" },
    { id: "changelog", label: "Version Notes" },
    { id: "alternatives", label: "Legal Alternatives" },
    { id: "related", label: "Related Guides & Tools" },
    { id: "faq", label: "FAQ" },
  ];
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home (EN)", path: "/en" }, { name: "Apps", path: "/en/aplikasi" }, { name: base.name, path: `/en/aplikasi/${slug}` }])} />
      <JsonLd data={faqJsonLd(en.faqs)} />
      {base.officialUrl && <JsonLd data={softwareAppJsonLd({ name: base.name, categorySlug: base.categorySlug, priceLabel: base.priceLabel, developer: base.developer, url: base.officialUrl, lang: "en", description: en.taglineEn, pageUrl: `${site.url}/en/aplikasi/${slug}` })} />}
      <Breadcrumb items={[{ name: "English Home", path: "/en" }, { name: "Apps", path: "/en/aplikasi" }, { name: base.name, path: `/en/aplikasi/${slug}` }]} />

      {/* 2. App identity header + 3. official action */}
      <section className="rounded-3xl border border-mist bg-paper p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <LetterTile label={base.name} className="h-20 w-20 rounded-2xl text-3xl" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-extrabold leading-tight text-ink">{base.name}</h1>
              <TrustBadge status={base.legalStatus} locale="en" />
            </div>
            <p className="mt-1 text-sm text-muted">{base.developer} · {categoryNameEn(base.categorySlug, base.categoryName)}</p>
            <p className="mt-2 leading-relaxed text-ink/80">{en.taglineEn}</p>
            <p className="mt-2 text-sm text-muted">Last checked by an editor: <strong className="text-ink">{formatCheckedEn(checkedAt)}</strong> ({info.days} days ago). {info.stale
              ? <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-warn">Over 90 days old — in the re-check queue</span>
              : "This page is queued for re-check once it is older than 90 days."}</p>
          </div>
        </div>
        <div className="mt-5 border-t border-mist pt-4">
          {base.officialUrl && base.legalStatus !== "info_only" ? (
            <div className="flex flex-col gap-2">
              <OfficialButton href={base.officialUrl} label={`Open ${base.name} on Google Play (official)`} />
              <p className="text-xs text-muted">This button opens the official source. We don&apos;t provide an APK file for this app.</p>
            </div>
          ) : (
            <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-ink/85"><strong>We do not host or link a download for this app.</strong> Read the safety section below and use only the legal alternatives mentioned there.</p>
          )}
        </div>
      </section>

      {/* 4. Verification & safety status */}
      <section aria-label="Verification and safety" className="rounded-2xl border border-mist bg-paper p-4 shadow-sm sm:p-5">
        <SectionHeading icon="shield" title="Verification & Safety" />
        <div className="mt-3"><SafetyScore score={null} locale="en" /></div>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">We only give a numeric score to files we host that pass our Phase 4 verification pipeline. For this app, we explain the safety picture in words in the safety section below — with no invented numbers.</p>
      </section>

      {/* 5. FactBox — all values localized (Part 2) */}
      <section aria-label="Quick facts" className="space-y-3">
        <SectionHeading icon="file" title="Quick Facts" />
        <FactBox rows={[
          { label: "Developer", value: base.developer },
          { label: "Category", value: categoryNameEn(base.categorySlug, base.categoryName) },
          { label: "Price", value: priceLabelEn(base.priceLabel) },
          { label: "Minimum Android", value: minAndroidEn(base.minAndroid) },
          { label: "Languages", value: languagesEn(base.languages) },
          { label: "Last checked", value: checkedAt },
        ]} />
      </section>

      <AppTocMobile items={toc} label="On this page" />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_230px] lg:items-start lg:gap-8">
        <div className="min-w-0 space-y-10">
          {/* 7. Overview */}
          <section id="overview" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="book" title={`About ${base.name}`} />
            {en.introEn.map((p) => (<p key={p.slice(0, 32)} className="leading-relaxed text-ink/85">{p}</p>))}
          </section>

          {/* 8. Main features */}
          <section id="features" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="star" title={`What ${base.name} Does`} />
            {en.whatEn.map((p) => (<p key={p.slice(0, 32)} className="leading-relaxed text-ink/85">{p}</p>))}
          </section>

          {/* 9. Permissions & safety */}
          <section id="safety" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="shield" title="Permissions & Safety" />
            {en.safetyEn.map((p) => (<p key={p.slice(0, 32)} className="leading-relaxed text-ink/85">{p}</p>))}
            <p className="text-sm leading-relaxed text-ink/70">The permission-by-permission breakdown for {base.name} — with the full feature list, pros &amp; cons, and legal alternatives — is on the <Link className="font-semibold text-linkblue" href={`/aplikasi/${slug}`}>Indonesian page for {base.name}</Link>.</p>
          </section>

          {/* 10. Compatibility & technical info */}
          <section id="compatibility" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="smartphone" title="Compatibility & Technical Info" />
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-mist bg-mist sm:grid-cols-2">
              <div className="bg-paper p-3"><dt className="text-xs font-medium text-muted">Minimum Android</dt><dd className="mt-0.5 text-sm font-semibold text-ink">{minAndroidEn(base.minAndroid)}</dd></div>
              <div className="bg-paper p-3"><dt className="text-xs font-medium text-muted">Version</dt><dd className="mt-0.5 text-sm font-semibold text-ink">{versionNoteEn(base.versionNote)}</dd></div>
              <div className="bg-paper p-3"><dt className="text-xs font-medium text-muted">Size</dt><dd className="mt-0.5 text-sm font-semibold text-ink">{sizeLabelEn(base.sizeLabel)}</dd></div>
              <div className="bg-paper p-3"><dt className="text-xs font-medium text-muted">Languages</dt><dd className="mt-0.5 text-sm font-semibold text-ink">{languagesEn(base.languages)}</dd></div>
            </dl>
            {base.officialUrl ? (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-ink">How to Install {base.name} from the Official Source</h3>
                <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/85">
                  <li>Open Google Play Store on your phone (or tap the official button on this page).</li>
                  <li>Search for &ldquo;{base.name}&rdquo; and check that the developer name is {base.developer}.</li>
                  <li>Tap Install. If Google Play warns that the app isn&apos;t available for your device, don&apos;t look for an APK file on random sites — that means your device isn&apos;t supported.</li>
                  <li>After installing, open Settings &gt; Apps &gt; {base.name} &gt; Permissions and switch off any permissions you don&apos;t need.</li>
                </ol>
                <p className="text-sm text-ink/70">Full guide: <Link className="font-semibold text-linkblue" href="/en/panduan/cara-instal-apk-aman">how to install apps safely</Link>.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-ink">How to Install {base.name}</h3>
                <p className="leading-relaxed text-ink/85">There is no official way to install {base.name}: the app is not on Google Play Store and has no official install path. Don&apos;t install its APK file from random sites — use the legal alternatives below. Full guide: <Link className="font-semibold text-linkblue" href="/en/panduan/cara-instal-apk-aman">how to install apps safely</Link>.</p>
              </div>
            )}
          </section>

          {/* 11. Pros & cons */}
          <section id="pros" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="check" title="Pros & Cons" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-ink"><Icon name="plus" className="h-5 w-5 text-primary" />Good for</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink/85">{en.goodFor.map((x) => (<li key={x}>{x}</li>))}</ul>
              </div>
              <div className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-ink"><Icon name="minus" className="h-5 w-5 text-danger" />Watch out for</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink/85">{en.watchOut.map((x) => (<li key={x}>{x}</li>))}</ul>
              </div>
            </div>
          </section>

          {/* 12. Changelog */}
          <section id="changelog" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="clock" title="Version Notes" />
            <p className="leading-relaxed text-ink/85">{base.officialUrl
              ? `${base.name} is updated directly by its developer through Google Play; the exact version number and size vary by device and change with every release. That's why we don't print an invented version number here — the version you receive is always the latest official version when you install from the official source. `
              : `${base.name} is not on Google Play and isn't updated through an official channel, so we don't print a version number here. `}
              This page was last checked by an editor on {checkedAt} and enters the automatic re-check queue once it is older than 90 days.</p>
          </section>

          {/* 13. Alternatives */}
          <section id="alternatives" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="arrow" title={`Legal Alternatives to ${base.name}`} />
            <ul className="space-y-2">
              {altApps.map(({ alt, enSlug }) => (
                <li key={alt.name} className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                  {enSlug ? <Link href={`/en/aplikasi/${enSlug}`} className="font-semibold text-linkblue">{alt.name}</Link>
                    : alt.slug ? <Link href={`/aplikasi/${alt.slug}`} className="font-semibold text-linkblue">{alt.name}</Link>
                    : <span className="font-semibold text-ink">{alt.name}</span>}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-ink/70">Full notes on each alternative — in Indonesian — are on the <Link className="font-semibold text-linkblue" href={`/aplikasi/${slug}`}>Indonesian page for {base.name}</Link>.</p>
          </section>

          {/* 14. Related guides & tools */}
          <section id="related" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="book" title="Related Guides & Tools" />
            {enToolPath && enToolName && (
              <p className="rounded-2xl bg-primary-soft p-4 text-sm text-ink/85">
                Related: <Link className="font-semibold text-primary-dark underline" href={enToolPath}>{enToolName}</Link> — free, no extra app install needed.
              </p>
            )}
            {relatedGuidesEn.length > 0 && (
              <ul className="space-y-2">
                {relatedGuidesEn.map((g) => (
                  <li key={g.slug} className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                    <Link href={`/en/panduan/${g.slug}`} className="font-semibold text-linkblue">{g.titleEn}</Link>
                  </li>
                ))}
              </ul>
            )}
            {relatedGuidesEn.length === 0 && !enToolPath && (
              <p className="text-sm leading-relaxed text-ink/70">More related guides are on the <Link className="font-semibold text-linkblue" href={`/aplikasi/${slug}`}>Indonesian page for {base.name}</Link>.</p>
            )}
          </section>

          {/* 15. FAQ */}
          <section id="faq" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="help" title={`Frequently Asked Questions`} />
            <FaqAccordion faqs={en.faqs} />
          </section>

          {/* Related applications */}
          <section className="space-y-4">
            <SectionHeading icon="grid" title="Related Apps" />
            <RelatedApps apps={relatedEn.map((x) => ({ name: x.b.name, slug: x.b.slug, developer: x.b.developer, status: x.b.legalStatus }))} locale="en" />
          </section>
        </div>
        <AppTocAside items={toc} label="On this page" />
      </div>

      {/* 16. Editorial trust information */}
      <section className="rounded-2xl border border-mist bg-mist/50 p-4 text-sm leading-relaxed text-ink/75 sm:p-5">
        <p className="flex items-start gap-2">
          <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span><strong className="text-ink">About this page.</strong> This page was written by an editor and last checked on {formatCheckedEn(checkedAt)}; it enters the automatic re-check queue once it is older than 90 days. CekAPK doesn&apos;t host APK files for this app — all download links point to official sources. How we verify apps is explained in our <Link className="font-semibold text-linkblue" href="/metodologi-verifikasi">verification methodology (in Indonesian)</Link>. This is the English edition of our Indonesian guide. Full details — full feature list, pros &amp; cons, alternatives, and permission-by-permission notes — are on the <Link className="font-semibold text-linkblue" href={`/aplikasi/${slug}`}>Indonesian page for {base.name}</Link>.</span>
        </p>
      </section>
    </div>
  );
}
