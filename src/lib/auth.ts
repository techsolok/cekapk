// Autentikasi admin (FR-ADM-01, Fase 3): password di-hash scrypt, sesi = token acak
// yang hanya HASH-nya disimpan di database, cookie httpOnly. 2FA TOTP opsional untuk Admin.
import { randomBytes, scryptSync, createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { admins, adminSessions } from "@/db/schema";

export const SESSION_COOKIE = "idapk_admin_session";
const SESSION_DAYS = 7;

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt:${salt.toString("base64")}:${hash.toString("base64")}`;
}
export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const salt = Buffer.from(parts[1], "base64");
  const expected = Buffer.from(parts[2], "base64");
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(expected, actual);
}

export interface AdminUser { id: number; email: string; role: string; hasTotp: boolean }
export async function createAdminSession(adminId: number, userAgent: string | null): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000);
  await getDb().insert(adminSessions).values({ adminId, tokenHash, expiresAt, userAgent });
  return token;
}
export async function getSessionAdmin(): Promise<AdminUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const rows = await getDb().select({ session: adminSessions, admin: admins })
    .from(adminSessions).innerJoin(admins, eq(adminSessions.adminId, admins.id))
    .where(eq(adminSessions.tokenHash, tokenHash)).limit(1);
  const row = rows[0];
  if (!row) return null;
  if (row.session.expiresAt.getTime() < Date.now()) {
    await getDb().delete(adminSessions).where(eq(adminSessions.id, row.session.id));
    return null;
  }
  return { id: row.admin.id, email: row.admin.email, role: row.admin.role, hasTotp: !!row.admin.twoFactorSecret };
}
export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    await getDb().delete(adminSessions).where(eq(adminSessions.tokenHash, tokenHash));
  }
  jar.delete(SESSION_COOKIE);
}
export function sessionCookieOptions() {
  return { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_DAYS * 86400 };
}

// --- TOTP (RFC 6238, SHA-1, 30 detik, 6 digit) ---
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32Decode(secret: string): Buffer {
  const clean = secret.replace(/\s/g, "").toUpperCase();
  let bits = 0, value = 0; const out: number[] = [];
  for (const ch of clean) {
    const idx = B32.indexOf(ch); if (idx < 0) continue;
    value = (value << 5) | idx; bits += 5;
    if (bits >= 8) { out.push((value >>> (bits - 8)) & 0xff); bits -= 8; }
  }
  return Buffer.from(out);
}
export function totpCode(secret: string, at = Date.now()): string {
  const counter = Math.floor(at / 30000);
  const buf = Buffer.alloc(8); buf.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac("sha1", base32Decode(secret)).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code = ((hmac[offset] & 0x7f) << 24) | ((hmac[offset + 1] & 0xff) << 16) | ((hmac[offset + 2] & 0xff) << 8) | (hmac[offset + 3] & 0xff);
  return String(code % 1000000).padStart(6, "0");
}
export function verifyTotp(secret: string, code: string): boolean {
  const clean = code.replace(/\s/g, "");
  if (!/^\d{6}$/.test(clean)) return false;
  for (const drift of [-1, 0, 1]) {
    if (totpCode(secret, Date.now() + drift * 30000) === clean) return true;
  }
  return false;
}
