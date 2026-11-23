import { NextResponse } from "next/server";
import { normalizeLink, fetchVideoInfo, ToolError, ERROR_MESSAGES, checkRate, issueChallenge, verifyChallenge, clientIp, logEvent, hashId } from "@/lib/tools/tiktok";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const ip = clientIp(req);
  let body: { url?: string; challengeToken?: string; challengeAnswer?: number };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: { type: "link_tidak_valid", message: ERROR_MESSAGES.link_tidak_valid } }, { status: 400 }); }
  const rate = await checkRate(ip);
  if (rate.needChallenge) {
    const valid = body.challengeToken ? verifyChallenge(ip, body.challengeToken, Number(body.challengeAnswer)) : false;
    if (!valid) {
      const chal = issueChallenge(ip);
      logEvent("tool_challenge_required");
      return NextResponse.json({ ok: false, error: { type: "tantangan_gagal", message: "Demi keamanan, jawab tantangan hitungan ini dulu, lalu tekan Unduh lagi.", needChallenge: true, challenge: chal } }, { status: 429 });
    }
  }
  if (!rate.allowed) {
    logEvent("tool_error", { type: "terlalu_sering" });
    return NextResponse.json({ ok: false, error: { type: "terlalu_sering", message: ERROR_MESSAGES.terlalu_sering } }, { status: 429 });
  }
  const started = Date.now();
  try {
    const link = normalizeLink(body.url ?? "");
    const info = await fetchVideoInfo(link);
    logEvent("tool_success", { vid: hashId(info.videoId), ms: Date.now() - started, options: info.options.length });
    return NextResponse.json({ ok: true, data: info });
  } catch (e) {
    const type = e instanceof ToolError ? e.type : "sumber_tidak_terjangkau";
    const message = e instanceof ToolError ? e.message : ERROR_MESSAGES.sumber_tidak_terjangkau;
    logEvent("tool_error", { type, ms: Date.now() - started });
    const status = type === "link_tidak_valid" ? 400 : type === "tidak_ditemukan" ? 404 : 502;
    return NextResponse.json({ ok: false, error: { type, message } }, { status });
  }
}
