import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";
import { Breadcrumb, FaqAccordion } from "@/components/ui";
import { comparisons, getComparison } from "@/lib/data/comparisons";

export function generateStaticParams() { return comparisons.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const c = getComparison(slug);
  if (!c) return pageMetadata({ title: "Perbandingan Tidak Ditemukan", description: "-", path: "/bandingkan", noindex: true });
  return pageMetadata({ title: c.title, description: c.intro[0], path: `/bandingkan/${slug}` });
}
export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = getComparison(slug);
  if (!c) notFound();
  const badge = (w: string, side: "a" | "b") => w === side ? <span className="ml-2 rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary-dark">Pilihan aspek ini</span> : null;
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Bandingkan", path: "/bandingkan" }, { name: `${c.aName} vs ${c.bName}`, path: `/bandingkan/${slug}` }])} />
      <JsonLd data={faqJsonLd(c.faqs)} />
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Bandingkan", path: "/bandingkan" }, { name: `${c.aName} vs ${c.bName}`, path: `/bandingkan/${slug}` }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{c.title}</h1>
        {c.intro.map((p) => (<p key={p.slice(0, 24)} className="mt-3 max-w-2xl leading-relaxed text-ink/80">{p}</p>))}
        <p className="mt-2 text-sm text-muted">Terakhir dicek {c.verifiedAt}. Baca juga halaman lengkapnya: <Link className="font-semibold text-linkblue" href={`/aplikasi/${c.aSlug}`}>{c.aName}</Link> · <Link className="font-semibold text-linkblue" href={`/aplikasi/${c.bSlug}`}>{c.bName}</Link></p>
      </header>
      <section aria-label="Tabel perbandingan" className="overflow-x-auto rounded-2xl border border-mist">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-mist text-ink/75"><tr><th className="p-3">Aspek</th><th className="p-3">{c.aName}</th><th className="p-3">{c.bName}</th></tr></thead>
          <tbody className="divide-y divide-mist">
            {c.rows.map((r) => (
              <tr key={r.aspect}>
                <th className="p-3 font-semibold text-ink">{r.aspect}</th>
                <td className="p-3 text-ink/80">{r.a}{badge(r.winner, "a")}</td>
                <td className="p-3 text-ink/80">{r.b}{badge(r.winner, "b")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-mist p-4"><h2 className="font-bold text-ink">Pilih {c.aName} bila…</h2><p className="mt-1 text-sm leading-relaxed text-ink/80">{c.whoA}</p><Link href={`/aplikasi/${c.aSlug}`} className="mt-2 inline-flex min-h-[40px] items-center font-semibold text-linkblue">Halaman {c.aName} →</Link></div>
        <div className="rounded-2xl border border-mist p-4"><h2 className="font-bold text-ink">Pilih {c.bName} bila…</h2><p className="mt-1 text-sm leading-relaxed text-ink/80">{c.whoB}</p><Link href={`/aplikasi/${c.bSlug}`} className="mt-2 inline-flex min-h-[40px] items-center font-semibold text-linkblue">Halaman {c.bName} →</Link></div>
      </section>
      <section aria-label="Kesimpulan" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Kesimpulan Kami</h2>
        {c.verdict.map((p) => (<p key={p.slice(0, 24)} className="leading-relaxed text-ink/80">{p}</p>))}
      </section>
      <section aria-label="Pertanyaan umum" className="space-y-3">
        <h2 className="text-xl font-bold text-ink">Pertanyaan yang Sering Diajukan</h2>
        <FaqAccordion faqs={c.faqs} />
      </section>
    </div>
  );
}
