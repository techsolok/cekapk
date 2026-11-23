import { NextResponse } from "next/server";
import { logEvent } from "@/lib/tools/tiktok";
export const dynamic = "force-dynamic";
// Event analitik anonim (PRD 16): hanya tool_start dari klien. Sukses/gagal dicatat server di endpoint info.
export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (b?.event === "tool_start") logEvent("tool_start");
  } catch { /* abaikan */ }
  return NextResponse.json({ ok: true });
}
