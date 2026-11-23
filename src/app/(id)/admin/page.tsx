import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { pillarApps } from "@/lib/data/apps";
import { guides } from "@/lib/data/guides";
import { countWords, countGuideWords, type PillarApp } from "@/lib/data/content-types";
import { checkQualityGate } from "@/lib/quality-gate";
import AdminGateDemo from "./GateDemo";
import DraftPanel from "./DraftPanel";
import LibraryPanel, { type LibraryRow } from "./LibraryPanel";
import LogoutButton from "./LogoutButton";
import { getSessionAdmin, type AdminUser } from "@/lib/auth";
import { getDb } from "@/db";
import { apps as appsTable, libraryFiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = pageMetadata({ title: "Admin - Status Konten & Quality Gate", description: "Panel status konten internal.", path: "/admin", noindex: true });
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const dbConfigured = !!process.env.DATABASE_URL;
  let admin: AdminUser | null = null;
  if (dbConfigured) {
    admin = await getSessionAdmin().catch(() => null);
    if (!admin) redirect("/admin/login");
  }
  const now = new Date();
  const rows = pillarApps.map((a) => {
    const words = countWords(a);
    const gate = checkQualityGate({ name: a.name, descriptionWords: words, hasFactBox: true, legalStatus: a.legalStatus, officialUrl: a.officialUrl, hasUniqueValue: true });
    const ageDays = Math.floor((now.getTime() - new Date(a.verifiedAt + "T00:00:00+07:00").getTime()) / 86400000);
    return { a, words, gate, stale: ageDays > 90 };
  });
  const staleCount = rows.filter((r) => r.stale).length;

  let libRows: LibraryRow[] = [];
  let dbDrafts: { id: number; name: string; slug: string; source: string; gateErrors: string[] }[] = [];
  let dbPublished = 0;
  if (admin) {
    try {
      const db = getDb();
      const draftRows = await db.select().from(appsTable).where(eq(appsTable.status, "draft"));
      const pubRows = await db.select({ id: appsTable.id }).from(appsTable).where(eq(appsTable.status, "published"));
      dbPublished = pubRows.length;
      dbDrafts = draftRows.map((r) => {
        const content = r.content as unknown as PillarApp | null;
        const isFull = !!content && typeof content === "object" && "intro" in content;
        const words = isFull ? countWords(content) : (r.descriptionId ?? "").split(/\s+/).filter(Boolean).length;
        const gate = checkQualityGate({ name: r.name, descriptionWords: words, hasFactBox: isFull, legalStatus: (r.legalStatus as never) ?? null, officialUrl: r.officialUrl, hasUniqueValue: words >= 600 });
        return { id: r.id, name: r.name, slug: r.slug, source: r.source, gateErrors: gate.errors };
      });
      const libDb = await db.select().from(libraryFiles).orderBy(libraryFiles.id).catch(() => []);
      libRows = libDb.map((r) => ({ id: r.id, name: r.name, packageName: r.packageName, version: r.version, status: r.status, safetyScore: r.safetyScore, reviewedBy: r.reviewedBy, sha256: r.sha256, steps: (r.pipeline ?? []) as LibraryRow["steps"] }));
    } catch { /* database tidak terjangkau - panel lokal tetap tampil */ }
  }

  return (
    <div className="space-y-8 py-8">
      <header className="flex flex-wrap items-start gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Admin - Status Konten</h1>
          <p className="mt-1 text-sm text-ink/60">Panel editor (PRD 7.5, Fase 3). Katalog lokal: {pillarApps.length} aplikasi terbit. {admin ? `Database: ${dbPublished} published.` : ""}</p>
        </div>
        {admin && (<div className="ml-auto flex items-center gap-3"><span className="text-sm text-ink/70">{admin.email} · {admin.role}</span><LogoutButton /></div>)}
      </header>
      {!dbConfigured && (
        <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-ink/85"><strong>Mode lokal tanpa database.</strong> Login admin aktif setelah DATABASE_URL diatur dan perintah migrasi + seed dijalankan (lihat README-FASE3). Selama itu panel ini hanya pratinjau status konten lokal dan tidak ditautkan dari navigasi publik.</p>
      )}
      <section aria-label="Status aplikasi" className="overflow-x-auto rounded-2xl border border-mist">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-mist text-ink/70"><tr><th className="p-3">Aplikasi</th><th className="p-3">Kata Unik</th><th className="p-3">Status Legal</th><th className="p-3">Quality Gate</th><th className="p-3">Dicek</th></tr></thead>
          <tbody className="divide-y divide-mist">
            {rows.map(({ a, words, gate }) => (
              <tr key={a.slug}>
                <td className="p-3 font-semibold text-ink">{a.name}</td>
                <td className="p-3">{words.toLocaleString("id-ID")}</td>
                <td className="p-3">{a.legalStatus}</td>
                <td className="p-3">{gate.ok ? <span className="font-semibold text-primary-dark">Lolos - Terbit</span> : <span className="font-semibold text-danger">Terblokir: {gate.errors.join("; ")}</span>}</td>
                <td className="p-3">{a.verifiedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section aria-label="Status panduan" className="rounded-2xl border border-mist p-4">
        <h2 className="font-bold text-ink">Panduan ({guides.length})</h2>
        <ul className="mt-2 space-y-1 text-sm text-ink/75">
          {guides.map((g) => (<li key={g.slug}>{g.title} - {countGuideWords(g).toLocaleString("id-ID")} kata</li>))}
        </ul>
      </section>
      <section aria-label="Antrean verifikasi" className="rounded-2xl border border-mist p-4">
        <h2 className="font-bold text-ink">Antrean Verifikasi (verified_at &gt; 90 hari)</h2>
        <p className="mt-1 text-sm text-ink/75">{staleCount === 0 ? "Kosong - semua konten masih segar. Halaman otomatis masuk daftar ini begitu usianya melewati 90 hari." : `${staleCount} halaman perlu dicek ulang.`}</p>
      </section>
      {admin ? <DraftPanel initialDrafts={dbDrafts} /> : null}
      {admin ? <LibraryPanel initialRows={libRows} /> : null}
      <AdminGateDemo />
    </div>
  );
}
