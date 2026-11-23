import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
export const dynamic = "force-dynamic";
export async function POST() {
  try { await destroySession(); } catch { /* sesi sudah tidak ada */ }
  return NextResponse.json({ ok: true });
}
