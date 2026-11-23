import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { admins } from "@/db/schema";
import { verifyPassword, verifyTotp, createAdminSession, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
// Rate limit sederhana per IP untuk login (di produksi gabungkan dengan rate limit global Fase 5).
const attempts = new Map<string, number[]>();
function tooMany(ip: string): boolean {
  const now = Date.now(); const arr = (attempts.get(ip) ?? []).filter((t) => now - t < 10 * 60000);
  arr.push(now); attempts.set(ip, arr); return arr.length > 8;
}
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (tooMany(ip)) return NextResponse.json({ ok: false, message: "Terlalu banyak percobaan masuk. Tunggu beberapa menit." }, { status: 429 });
  let body: { email?: string; password?: string; totp?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, message: "Format permintaan tidak valid." }, { status: 400 }); }
  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";
  if (!email || !password) return NextResponse.json({ ok: false, message: "Email dan kata sandi wajib diisi." }, { status: 400 });
  let admin: typeof admins.$inferSelect | undefined;
  try {
    const rows = await getDb().select().from(admins).where(eq(admins.email, email)).limit(1);
    admin = rows[0];
  } catch { return NextResponse.json({ ok: false, message: "Database belum terhubung. Atur DATABASE_URL lalu jalankan seed." }, { status: 503 }); }
  if (!admin || !verifyPassword(password, admin.passwordHash))
    return NextResponse.json({ ok: false, message: "Email atau kata sandi salah." }, { status: 401 });
  if (admin.twoFactorSecret) {
    if (!body.totp) return NextResponse.json({ ok: false, needTotp: true, message: "Masukkan kode 2FA dari aplikasi autentikator." }, { status: 401 });
    if (!verifyTotp(admin.twoFactorSecret, body.totp)) return NextResponse.json({ ok: false, needTotp: true, message: "Kode 2FA salah atau sudah kedaluwarsa." }, { status: 401 });
  }
  const token = await createAdminSession(admin.id, req.headers.get("user-agent"));
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, sessionCookieOptions());
  return NextResponse.json({ ok: true, email: admin.email, role: admin.role });
}
