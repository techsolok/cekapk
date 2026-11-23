import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/lib/data/categories";
import { pillarApps } from "@/lib/data/apps";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { Breadcrumb, AppCard } from "@/components/ui";

export function generateStaticParams() { return categories.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({ title: `Aplikasi ${c.name} - Info & Link Resmi`, description: `${c.blurb} Info aplikasi ${c.name} dalam Bahasa Indonesia dengan link resmi dan penjelasan keamanan.`, path: `/kategori/${c.slug}`, ogImage: "dynamic" });
}
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  if (!c) notFound();
  const apps = pillarApps.filter((a) => a.categorySlug === c.slug);
  return (
    <div className="space-y-6 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Kategori", path: "/kategori" }, { name: c.name, path: `/kategori/${c.slug}` }])} />
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Kategori", path: "/kategori" }, { name: c.name, path: `/kategori/${c.slug}` }]} />
      <h1 className="text-2xl font-extrabold text-ink"><span aria-hidden>{c.icon}</span> Aplikasi {c.name}</h1>
      <p className="max-w-2xl leading-relaxed text-ink/75">{c.blurb} Setiap aplikasi di kategori ini kami sajikan dengan fakta versi resmi, penjelasan izin dalam Bahasa Indonesia, status keamanan, dan tombol ke sumber resmi - bukan file bajakan.</p>
      <p className="max-w-2xl leading-relaxed text-ink/75">{c.intro}</p>
      {apps.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {apps.map((a) => (<li key={a.slug}><AppCard name={a.name} slug={a.slug} developer={a.developer} status={a.legalStatus} /></li>))}
        </ul>
      ) : (
        <p className="rounded-2xl bg-mist p-4 text-sm text-ink/70">Belum ada halaman aplikasi pilar di kategori ini. Katalog diperluas bertahap dari Fase 3 mengikuti peta keyword - kualitas dulu, jumlah kemudian.</p>
      )}
    </div>
  );
}
