import { NextResponse } from "next/server";
import { getSessionAdmin } from "@/lib/auth";
import { buildProgrammaticDraft, type ProgrammaticInput } from "@/lib/programmatic";
import { getDb } from "@/db";
import { apps, categories as categoriesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
// Buat DRAF programmatic. Hanya untuk admin/editor yang masuk. Status SELALU "draft".
export async function POST(req: Request) {
  const admin = await getSessionAdmin().catch(() => null);
  if (!admin) return NextResponse.json({ ok: false, message: "Harus masuk sebagai admin/editor." }, { status: 401 });
  let input: ProgrammaticInput;
  try { input = await req.json(); } catch { return NextResponse.json({ ok: false, message: "Format permintaan tidak valid." }, { status: 400 }); }
  const result = buildProgrammaticDraft(input);
  if (!result.ok) return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  try {
    const db = getDb();
    const catRows = await db.select().from(categoriesTable).where(eq(categoriesTable.slug, input.categorySlug)).limit(1);
    const inserted = await db.insert(apps).values({
      slug: result.slug, name: input.name, developer: input.developer,
      categoryId: catRows[0]?.id ?? null, legalStatus: "play_store", officialUrl: input.officialUrl,
      priceModel: null, descriptionId: input.description, content: result.content,
      status: "draft", source: "programmatic", verifiedAt: new Date(),
    }).returning({ id: apps.id, slug: apps.slug, status: apps.status });
    return NextResponse.json({ ok: true, draft: inserted[0], publishable: result.publishable, gateErrors: result.errors });
  } catch (e) {
    return NextResponse.json({ ok: false, message: "Gagal menyimpan draf (database/slug duplikat?).", detail: String(e).slice(0, 200) }, { status: 500 });
  }
}
