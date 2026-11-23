import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Mode pemeliharaan (FR-MNT-01): MAINTENANCE_MODE=1 -> halaman publik menjawab 503
// dengan pesan jujur berbahasa Indonesia. Admin + API admin tetap bisa diakses agar
// operator bisa bekerja; aset statis tidak disentuh.
export function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "1") return NextResponse.next();
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) return NextResponse.next();
  const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sedang Pemeliharaan</title></head><body style="font-family:system-ui,sans-serif;background:#F6F7F9;color:#12211C;display:grid;place-items:center;min-height:100vh;margin:0"><main style="max-width:30rem;padding:2rem;text-align:center"><h1>Sedang Pemeliharaan Sebentar</h1><p>Kami sedang memperbarui sistem agar situs lebih aman dan cepat. Silakan kembali lagi dalam beberapa menit. Terima kasih sudah menunggu.</p></main></body></html>`;
  return new NextResponse(html, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Retry-After": "600" } });
}
export const config = { matcher: ["/((?!_next/static|_next/image|icons|sw.js|favicon.ico).*)"] };
