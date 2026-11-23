import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, articleJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumb, FaqAccordion, AuthorByline } from "@/components/ui";
import { enGuides, getEnGuide } from "@/lib/data/i18n-en";
import { getApp } from "@/lib/data/apps";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function generateStaticParams() { return enGuides.map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const en = getEnGuide(slug);
  if (!en) return pageMetadata({ title: "Not Found", description: "-", path: "/en", noindex: true });
  return pageMetadata({ title: en.titleEn, description: en.metaDescriptionEn ?? en.introEn[0], path: `/en/panduan/${slug}`, ogImage: "dynamic", languages: { "id-ID": `${site.url}/panduan/${slug}`, "en-US": `${site.url}/en/panduan/${slug}`, "x-default": `${site.url}/panduan/${slug}` } });
}
export default async function EnGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const en = getEnGuide(slug);
  if (!en) notFound();
  const stepsSection = en.sectionsEn?.find((s) => s.steps && s.steps.length > 0);
  const rel = (en.relatedAppsEn ?? []).map((s) => getApp(s)).filter(Boolean);
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home (EN)", path: "/en" }, { name: en.titleEn, path: `/en/panduan/${slug}` }])} />
      <JsonLd data={faqJsonLd(en.faqs)} />
      {en.verifiedAtEn && <JsonLd data={articleJsonLd({ title: en.titleEn, path: `/en/panduan/${slug}`, verifiedAt: en.verifiedAtEn, lang: "en-US" })} />}
      {stepsSection && <JsonLd data={howToJsonLd({ title: stepsSection.heading, path: `/en/panduan/${slug}`, steps: stepsSection.steps! })} />}
      <Breadcrumb items={[{ name: "English Home", path: "/en" }, { name: "Guides", path: "/en" }, { name: en.titleEn, path: `/en/panduan/${slug}` }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{en.titleEn}</h1>
        {en.verifiedAtEn && <div className="mt-3"><AuthorByline date={en.verifiedAtEn} lang="en" /></div>}
      </header>
      <section className="space-y-3">{en.introEn.map((p) => (<p key={p.slice(0, 32)} className="leading-relaxed text-ink/85">{p}</p>))}</section>
      {en.sectionsEn ? (
        <>
          <nav aria-label="Table of contents" className="rounded-2xl border border-mist bg-paper p-4">
            <p className="font-bold text-ink">On this page</p>
            <ul className="mt-2 space-y-1.5">
              {en.sectionsEn.map((s) => (
                <li key={s.heading}><a className="text-linkblue hover:underline" href={`#${slugify(s.heading)}`}>{s.heading}</a></li>
              ))}
              <li><a className="text-linkblue hover:underline" href="#frequently-asked-questions">Frequently Asked Questions</a></li>
              {en.sourcesEn && <li><a className="text-linkblue hover:underline" href="#sources-and-further-reading">Sources and Further Reading</a></li>}
            </ul>
          </nav>
          {en.sectionsEn.map((s) => (
            <section key={s.heading} className="space-y-3" id={slugify(s.heading)}>
              <h2 className="text-xl font-bold text-ink">{s.heading}</h2>
              {(s.paragraphs ?? []).map((p) => (<p key={p.slice(0, 32)} className="leading-relaxed text-ink/85">{p}</p>))}
              {s.table && (
                <div className="overflow-x-auto rounded-2xl border border-mist">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead><tr className="bg-mist/60">{s.table.headers.map((h) => (<th key={h} className="border-b border-mist px-3 py-2 font-bold text-ink">{h}</th>))}</tr></thead>
                    <tbody>{s.table.rows.map((r, i) => (<tr key={i} className="align-top">{r.map((c, j) => (<td key={j} className="border-b border-mist/60 px-3 py-2 leading-relaxed text-ink/85">{c}</td>))}</tr>))}</tbody>
                  </table>
                </div>
              )}
              {s.checklist && (
                <ul className="space-y-2">
                  {s.checklist.map((c) => (
                    <li key={c.slice(0, 32)} className="flex gap-2.5 leading-relaxed text-ink/85"><span className="font-bold text-primary" aria-hidden>✓</span><span>{c}</span></li>
                  ))}
                </ul>
              )}
              {s.steps && (
                <ol className="space-y-3">
                  {s.steps.map((st, i) => (
                    <li key={st.title} className="flex gap-3 rounded-2xl border border-mist p-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-bold text-white" aria-hidden>{i + 1}</span>
                      <span><span className="block font-semibold text-ink">{st.title}</span><span className="mt-0.5 block text-sm leading-relaxed text-ink/75">{st.desc}</span></span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </>
      ) : (
        <section className="space-y-3">{en.bodyEn.map((p) => (<p key={p.slice(0, 32)} className="leading-relaxed text-ink/85">{p}</p>))}</section>
      )}
      <section className="space-y-3" id="frequently-asked-questions">
        <h2 className="text-xl font-bold text-ink">Frequently Asked Questions</h2>
        <FaqAccordion faqs={en.faqs} />
      </section>
      {rel.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink">Related Apps</h2>
          <ul className="space-y-1.5">
            {rel.map((a) => (
              <li key={a!.slug}><Link className="font-semibold text-linkblue hover:underline" href={`/en/aplikasi/${a!.slug}`}>{a!.name}</Link><span className="text-muted"> — {a!.developer}</span></li>
            ))}
          </ul>
        </section>
      )}
      {en.sourcesEn && (
        <section className="space-y-3" id="sources-and-further-reading">
          <h2 className="text-xl font-bold text-ink">Sources and Further Reading</h2>
          <ul className="space-y-1.5">
            {en.sourcesEn.map((s) => (
              <li key={s.url}><a className="font-semibold text-linkblue hover:underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-muted">CekAPK provides educational information only. We do not guarantee the safety of any third-party APK file, and we have not independently tested APKPure's files.</p>
        </section>
      )}
      <p className="text-sm text-muted">English edition. The complete step-by-step version is on the <Link className="font-semibold text-linkblue" href={`/panduan/${slug}`}>Indonesian guide page</Link>.</p>
    </div>
  );
}
