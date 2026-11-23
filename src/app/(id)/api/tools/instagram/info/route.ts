import { NextResponse } from "next/server";
import { fetchInfo } from "@/lib/tools/instagram";
import { checkRate, issueChallenge, verifyChallenge, clientIp, logEvent } from "@/lib/tools/tiktok";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const ip = clientIp(req);
  let body: { url?: string; challengeToken?: string; challengeAnswer?: number };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, kind: "ditolak", message: "Permintaan tidak valid." }, { status: 400 }); }
  const rate = await checkRate(ip, 10, 60_000);
  if (rate.needChallenge) {
    const valid = body.challengeToken ? verifyChallenge(ip, body.challengeToken, Number(body.challengeAnswer)) : false;
    if (!valid) {
      const chal = issueChallenge(ip);
      logEvent("tool_challenge_required", { tool: "instagram" });
      return NextResponse.json({ ok: false, kind: "tantangan", message: "Demi keamanan, jawab tantangan hitungan ini dulu, lalu tekan tombolnya lagi.", challenge: { a: chal.a, b: chal.b, token: chal.token, question: `${chal.a} + ${chal.b} = ?` } }, { status: 429 });
    }
  }
  if (!rate.allowed) {
    logEvent("tool_error", { tool: "instagram", type: "terlalu_sering" });
    return NextResponse.json({ ok: false, kind: "terlalu_sering", message: "Terlalu banyak permintaan dalam waktu singkat. Tunggu sebentar lalu coba lagi." }, { status: 429 });
  }
  const started = Date.now();
  const info = await fetchInfo(body.url ?? "");
  logEvent(info.ok ? "tool_success" : "tool_error", { tool: "instagram", type: info.kind, ms: Date.now() - started });
  const status = info.ok ? 200 : info.kind === "ditolak" ? 400 : info.kind === "tautan_tidak_ditemukan" ? 404 : 422;
  return NextResponse.json(info, { status });
}
