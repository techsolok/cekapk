import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { categories } from "@/lib/data/categories";
import { pillarApps } from "@/lib/data/apps";
import { CategoryCard } from "@/components/home";

export const metadata: Metadata = pageMetadata({ title: "Kategori Aplikasi", description: "Jelajahi 10 kategori aplikasi Android: sosial, game, video & foto, musik, keuangan, pendidikan, kesehatan, dan lainnya — semua dari sumber resmi.", path: "/kategori" });

// Jumlah aplikasi per kategori, dihitung dari katalog yang sama seperti beranda.
const categoryCounts: Record<string, number> = {};
for (const a of pillarApps) categoryCounts[a.categorySlug] = (categoryCounts[a.categorySlug] ?? 0) + 1;

export default function Page() {
  return (
    <div className="space-y-6 py-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-extrabold text-ink">Kategori Aplikasi</h1>
        <p className="max-w-2xl leading-relaxed text-ink/75">Menjelajahi aplikasi lewat kategori adalah cara tercepat menemukan aplikasi yang kamu butuhkan tanpa tersesat di antara ribuan nama. Setiap kartu di bawah ini menampilkan aplikasi resmi beserta jumlahnya — deskripsi tiap aplikasi ditulis dari fakta sumber resmi, lengkap dengan tanggal verifikasi dan catatan keamanannya. Satu kategori, Kesehatan, saat ini belum berisi aplikasi; kartunya menampilkannya apa adanya. Pilih kategori yang sesuai, lalu baca halaman aplikasinya sebelum mengunduh: di sana kamu akan menemukan fungsi utama aplikasi, siapa yang cocok memakainya, dan hal-hal yang perlu diwaspadai.</p>
        <p className="max-w-2xl leading-relaxed text-ink/75">Satu prinsip berlaku untuk semua kategori: kami tidak pernah menyediakan berkas APK bajakan, modifikasi, atau dari sumber yang tidak jelas. Tautan unduhan selalu mengarah ke Play Store atau situs resmi penerbitnya, dan aplikasi yang hanya tersedia secara legal lewat jalur berbayar akan kami tandai sebagai berbayar, bukan disamarkan sebagai gratis.</p>
      </header>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const n = categoryCounts[c.slug] ?? 0;
          return (
            <li key={c.slug}>
              <CategoryCard name={c.name} href={`/kategori/${c.slug}`} blurb={c.blurb} countLabel={`${n} aplikasi`} />
            </li>
          );
        })}
      </ul>
      <p className="leading-relaxed text-ink/75">Belum menemukan kategori yang pas? Coba pencarian di halaman utama atau jelajahi halaman <Link className="font-semibold text-linkblue" href="/keamanan">Keamanan</Link> untuk panduan memeriksa aplikasi apa pun sebelum dipasang, apa pun kategorinya.</p>
    </div>
  );
}
