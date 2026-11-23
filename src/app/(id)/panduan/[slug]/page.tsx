import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, getGuide } from "@/lib/data/guides";
import { getApp } from "@/lib/data/apps";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, articleJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { hasEnGuide } from "@/lib/data/i18n-en";
import { Breadcrumb, FaqAccordion, RelatedApps, AuthorByline } from "@/components/ui";

// Sama seperti halaman panduan Inggris: id jangkar stabil dari judul seksi.
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function generateStaticParams() { return guides.map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const g = getGuide(slug); if (!g) return {};
  return pageMetadata({ title: g.title, description: g.metaDescription, path: `/panduan/${g.slug}`, ogImage: "dynamic", ...(hasEnGuide(g.slug) ? { languages: { "id-ID": `${site.url}/panduan/${g.slug}`, "en-US": `${site.url}/en/panduan/${g.slug}`, "x-default": `${site.url}/panduan/${g.slug}` } } : {}) });
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const g = getGuide(slug); if (!g) notFound();
  const rel = g.relatedApps.map((s) => getApp(s)).filter(Boolean);
  return (
    <article className="space-y-6 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Panduan", path: "/panduan" }, { name: g.title, path: `/panduan/${g.slug}` }])} />
      <JsonLd data={faqJsonLd(g.faqs)} />
      <JsonLd data={articleJsonLd({ title: g.title, path: `/panduan/${g.slug}`, verifiedAt: g.verifiedAt })} />
      {g.steps && <JsonLd data={howToJsonLd({ title: g.title, path: `/panduan/${g.slug}`, steps: g.steps })} />}
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Panduan", path: "/panduan" }, { name: g.title, path: `/panduan/${g.slug}` }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink">{g.title}</h1>
        <div className="mt-3"><AuthorByline date={g.verifiedAt} lang="id" /></div>
      </header>
      {g.intro.map((p) => (<p key={p.slice(0, 24)} className="leading-relaxed text-ink/85">{p}</p>))}
      <nav aria-label="Daftar isi" className="rounded-2xl border border-mist bg-paper p-4">
        <p className="font-bold text-ink">Daftar isi</p>
        <ul className="mt-2 space-y-1.5">
          {g.steps && (<li><a className="text-linkblue hover:underline" href="#langkah-langkah">Langkah-Langkah</a></li>)}
          {g.sections.map((s) => (
            <li key={s.heading}><a className="text-linkblue hover:underline" href={`#${slugify(s.heading)}`}>{s.heading}</a></li>
          ))}
          <li><a className="text-linkblue hover:underline" href="#pertanyaan-umum">Pertanyaan Umum</a></li>
          {rel.length > 0 && (<li><a className="text-linkblue hover:underline" href="#aplikasi-terkait">Aplikasi Terkait</a></li>)}
        </ul>
      </nav>
      {g.steps && (
        <section className="scroll-mt-20 space-y-3" id="langkah-langkah">
          <h2 className="text-xl font-bold text-ink">Langkah-Langkah</h2>
          <ol className="space-y-3">
            {g.steps.map((s, i) => (
              <li key={s.title} className="flex gap-3 rounded-2xl border border-mist p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-bold text-white" aria-hidden>{i + 1}</span>
                <span><span className="block font-semibold text-ink">{s.title}</span><span className="mt-0.5 block text-sm leading-relaxed text-ink/75">{s.desc}</span></span>
              </li>
            ))}
          </ol>
        </section>
      )}
      {g.sections.map((s) => (
        <section key={s.heading} className="scroll-mt-20 space-y-3" id={slugify(s.heading)}>
          <h2 className="text-xl font-bold text-ink">{s.heading}</h2>
          {s.paragraphs.map((p) => (<p key={p.slice(0, 24)} className="leading-relaxed text-ink/85">{p}</p>))}
        </section>
      ))}
      <section className="scroll-mt-20 space-y-3" id="pertanyaan-umum">
        <h2 className="text-xl font-bold text-ink">Pertanyaan Umum</h2>
        <FaqAccordion faqs={g.faqs} />
      </section>
      {rel.length > 0 && (
        <section className="scroll-mt-20 space-y-3" id="aplikasi-terkait">
          <h2 className="text-xl font-bold text-ink">Aplikasi Terkait</h2>
          <RelatedApps apps={rel.map((a) => ({ name: a!.name, slug: a!.slug, developer: a!.developer, status: a!.legalStatus }))} />
          <p className="text-sm text-muted">Lihat juga <Link className="font-semibold text-linkblue" href="/panduan">semua panduan</Link> dan <Link className="font-semibold text-linkblue" href="/keamanan">hub keamanan APK</Link>.</p>
        </section>
      )}
    </article>
  );
}
