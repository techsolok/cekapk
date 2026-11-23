import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSessionAdmin } from "@/lib/auth";
import { getDb } from "@/db";
import { libraryFiles } from "@/db/schema";
export const dynamic = "force-dynamic";
// Review manual (langkah manusia di PRD 14.1): hanya Admin.
export async function POST(req: Request) {
  const admin = await getSessionAdmin().catch(() => null);
  if (!admin) return NextResponse.json({ ok: false, message: "Harus masuk." }, { status: 401 });
  if (admin.role !== "admin") return NextResponse.json({ ok: false, message: "Hanya Admin yang boleh mereview." }, { status: 403 });
  const { id } = await req.json().catch(() => ({})) as { id?: number };
  if (!id) return NextResponse.json({ ok: false, message: "ID file wajib ada." }, { status: 400 });
  await getDb().update(libraryFiles).set({ reviewedBy: admin.email, reviewedAt: new Date() }).where(eq(libraryFiles.id, id));
  return NextResponse.json({ ok: true, reviewedBy: admin.email });
}
