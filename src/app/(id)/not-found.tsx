import Link from "next/link";
export default function NotFound() {
  return (
    <div className="space-y-4 py-16 text-center">
      <p className="text-5xl" aria-hidden>🔍</p>
      <h1 className="text-2xl font-extrabold text-ink">Halaman tidak ditemukan</h1>
      <p className="mx-auto max-w-md text-ink/70">Alamat ini tidak ada atau sudah dipindahkan. Coba cari dari Beranda, atau jelajahi kategori aplikasi.</p>
      <Link href="/" className="inline-flex min-h-[48px] items-center rounded-xl bg-primary px-5 font-semibold text-white">Kembali ke Beranda</Link>
    </div>
  );
}
