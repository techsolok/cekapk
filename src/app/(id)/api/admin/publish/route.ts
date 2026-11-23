import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSessionAdmin } from "@/lib/auth";
import { getDb } from "@/db";
import { apps } from "@/db/schema";
import { checkQualityGate } from "@/lib/quality-gate";
import { countWords, type PillarApp } from "@/lib/data/content-types";

export const dynamic = "force-dynamic";
// Terbitkan sebuah draf. HANYA Admin, dan quality gate diperiksa ulang di server.
// Generator tidak punya jalan ke endpoint ini - penerbitan selalu keputusan manusia.
export async function POST(req: Request) {
  const admin = await getSessionAdmin().catch(() => null);
  if (!admin) return NextResponse.json({ ok: false, message: "Harus masuk." }, { status: 401 });
  if (admin.role !== "admin") return NextResponse.json({ ok: false, message: "Hanya Admin yang boleh menerbitkan." }, { status: 403 });
  let body: { id?: number };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, message: "Format tidak valid." }, { status: 400 }); }
  if (!body.id) return NextResponse.json({ ok: false, message: "ID draf wajib ada." }, { status: 400 });
  const db = getDb();
  const rows = await db.select().from(apps).where(eq(apps.id, body.id)).limit(1);
  const app = rows[0];
  if (!app) return NextResponse.json({ ok: false, message: "Draf tidak ditemukan." }, { status: 404 });
  if (app.status === "published") return NextResponse.json({ ok: true, message: "Sudah terbit." });
  // Periksa gate dari konten terstruktur bila ada; draf generator mentah akan GAGAL di sini
  // sampai editor melengkapinya menjadi halaman penuh (>=600 kata, FactBox, nilai unik).
  const content = app.content as unknown as PillarApp | null;
  const words = content && typeof content === "object" && "intro" in content ? countWords(content) : (app.descriptionId ?? "").split(/\s+/).filter(Boolean).length;
  const gate = checkQualityGate({
    name: app.name, descriptionWords: words, hasFactBox: !!content && "intro" in (content as object),
    legalStatus: (app.legalStatus as never) ?? null, officialUrl: app.officialUrl,
    hasUniqueValue: words >= 600,
  });
  if (!gate.ok) return NextResponse.json({ ok: false, errors: gate.errors }, { status: 422 });
  await db.update(apps).set({ status: "published", publishedAt: new Date(), updatedAt: new Date() }).where(eq(apps.id, app.id));
  return NextResponse.json({ ok: true, slug: app.slug, status: "published" });
}
