import Link from "next/link";
export default function NotFound() {
  return (
    <div className="space-y-4 py-16 text-center">
      <p className="text-5xl" aria-hidden>🔍</p>
      <h1 className="text-2xl font-extrabold text-ink">Page not found</h1>
      <p className="mx-auto max-w-md text-ink/70">This address does not exist or has been moved. Try searching from the English home page.</p>
      <Link href="/en" className="inline-flex min-h-[48px] items-center rounded-xl bg-primary px-5 font-semibold text-white">Back to English Home</Link>
    </div>
  );
}
