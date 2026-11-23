import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata({ title: "Kamu Sedang Offline", description: "Halaman cadangan saat tidak ada koneksi.", path: "/offline", noindex: true });
export default function OfflinePage() {
  return (
    <div className="space-y-4 py-16 text-center">
      <p className="text-5xl" aria-hidden>📡</p>
      <h1 className="text-2xl font-extrabold text-ink">Kamu Sedang Offline</h1>
      <p className="mx-auto max-w-md leading-relaxed text-ink/75">Koneksi internet terputus. Halaman yang sudah pernah kamu buka mungkin masih tersedia dari cache; tool unduhan dan perpustakaan butuh koneksi aktif.</p>
      <Link href="/" className="inline-flex min-h-[48px] items-center rounded-xl bg-primary px-5 font-semibold text-white">Kembali ke Beranda</Link>
    </div>
  );
}
