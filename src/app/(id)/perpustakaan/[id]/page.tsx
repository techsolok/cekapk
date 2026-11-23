import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { Breadcrumb, SafetyScore, DownloadInterstitial } from "@/components/ui";
import ReportForm from "../ReportForm";
import { getDb } from "@/db";
import { libraryFiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { PermissionDecl, PipelineStep } from "@/lib/library/pipeline";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return pageMetadata({ title: `Unduh File Library #${id} - Terverifikasi`, description: "Halaman keamanan unduhan: hash SHA-256, hasil pemindaian, dan izin file sebelum mengunduh.", path: `/perpustakaan/${id}`, noindex: true });
}
export default async function LibraryFilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!process.env.DATABASE_URL) notFound();
  const rows = await getDb().select().from(libraryFiles).where(eq(libraryFiles.id, Number(id))).limit(1).catch(() => []);
  const rec = rows[0];
  if (!rec || rec.status !== "published") notFound();
  const perms = (rec.permissions ?? []) as PermissionDecl[];
  const steps = (rec.pipeline ?? []) as PipelineStep[];
  const scan = steps.find((s) => s.step === "pemindaian");
  return (
    <div className="space-y-6 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Perpustakaan", path: "/perpustakaan" }, { name: rec.name, path: `/perpustakaan/${rec.id}` }])} />
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Perpustakaan", path: "/perpustakaan" }, { name: rec.name, path: `/perpustakaan/${rec.id}` }]} />
      <header>
        <h1 className="text-2xl font-extrabold text-ink">{rec.name} {rec.version}</h1>
        <p className="mt-1 text-sm text-muted">{rec.packageName} · Lisensi {rec.licence} · Sumber: <a className="text-linkblue" href={rec.sourceUrl} target="_blank" rel="noopener">{rec.sourceName}</a></p>
      </header>
      <section aria-label="Skor keamanan" className="rounded-2xl border border-mist p-4">
        <h2 className="font-bold text-ink">Skor Keamanan</h2>
        <div className="mt-2"><SafetyScore score={rec.safetyScore} /></div>
        <p className="mt-2 text-sm text-muted">Skor ini dihitung dari pipeline: sumber resmi, kecocokan tanda tangan, hasil pemindaian, dan kewajaran izin (PRD 14.2). Hasil scan: {scan?.detail ?? "-"}</p>
      </section>
      <DownloadInterstitial fileName={`${rec.packageName}-${rec.version}.apk`} version={rec.version} size={`${(rec.sizeBytes / 1048576).toFixed(2)} MB`} sha256={rec.sha256} />
      <section aria-label="Izin penting" className="space-y-2">
        <h2 className="font-bold text-ink">Izin Penting File Ini</h2>
        <ul className="divide-y divide-mist rounded-2xl border border-mist">
          {perms.map((p) => (
            <li key={p.name} className="p-3">
              <p className="font-semibold text-ink">{p.name} {p.dangerous && <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-warn">perlu perhatian</span>}</p>
              <p className="mt-0.5 text-sm text-ink/75">{p.meaning}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl bg-primary-soft p-4">
        <p className="text-sm leading-relaxed text-ink/85">Dengan menekan tombol di bawah kamu menyatakan sudah melihat hash, hasil scan, dan izin file ini. Tidak ada hitung mundur dan tidak ada tombol lain yang menyerupai tombol unduh di halaman ini.</p>
        <a href={`/api/library/download/${rec.id}?ack=1`} className="mt-3 inline-flex min-h-[52px] items-center rounded-xl bg-primary px-6 font-semibold text-white">Saya Mengerti, Lanjut Unduh</a>
      </section>
      <ReportForm fileId={rec.id} />
    </div>
  );
}
