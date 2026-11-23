import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { pillarApps, getApp } from "@/lib/data/apps";
import { guides } from "@/lib/data/guides";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, JsonLd, softwareAppJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { hasEnApp } from "@/lib/data/i18n-en";
import { lastCheckedInfo } from "@/lib/last-checked";
import { Breadcrumb, TrustBadge, SafetyScore, OfficialButton, FactBox, FaqAccordion, RelatedApps } from "@/components/ui";
import { SectionHeading, AppTocMobile, AppTocAside } from "@/components/AppDetail";
import { Icon, LetterTile, formatCheckedId } from "@/components/home";

export function generateStaticParams() { return pillarApps.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const app = getApp(slug); if (!app) return {};
  return pageMetadata({
    // Phase 2A: info_only tanpa tautan resmi memakai judul/deskripsi pengganti dari data
    // (judul template "Terbaru 2026 - Info, Versi & Link Resmi" menyesatkan untuk aplikasi semacam itu).
    title: app.seoTitle ?? `${app.name.endsWith("APK") ? app.name : `${app.name} APK`} Terbaru 2026 - Info, Versi & Link Resmi`,
    description: app.seoDescription ?? `${app.tagline} Info lengkap ${app.name}: izin aplikasi, keamanan, dan link ke sumber resmi. Dicek ${app.verifiedAt}.`,
    path: `/aplikasi/${app.slug}`,
    ogImage: "dynamic",
    ...(hasEnApp(app.slug) ? { languages: { "id-ID": `${site.url}/aplikasi/${app.slug}`, "en-US": `${site.url}/en/aplikasi/${app.slug}`, "x-default": `${site.url}/aplikasi/${app.slug}` } } : {}),
  });
}
export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const app = getApp(slug); if (!app) notFound();
  const related = pillarApps.filter((a) => a.slug !== app.slug && a.categorySlug === app.categorySlug).slice(0, 4);
  const relatedFinal = related.length >= 2 ? related : pillarApps.filter((a) => a.slug !== app.slug).slice(0, 4);
  const altApps = app.alternatives.map((alt) => {
    const found = alt.slug ? getApp(alt.slug) : undefined;
    return { alt, found };
  });
  // Phase 2 SEO-13: guides that list this app in relatedApps link back here.
  const relatedGuides = guides.filter((g) => g.relatedApps.includes(app.slug));
  const info = lastCheckedInfo(app.verifiedAt);
  const toc = [
    { id: "ringkasan", label: "Ringkasan" },
    { id: "fitur", label: "Fitur Utama" },
    { id: "izin", label: "Izin & Keamanan" },
    { id: "kompatibilitas", label: "Kompatibilitas" },
    { id: "kelebihan", label: "Kelebihan & Kekurangan" },
    { id: "changelog", label: "Catatan Versi" },
    { id: "alternatif", label: "Alternatif Legal" },
    { id: "terkait", label: "Panduan Terkait" },
    { id: "faq", label: "FAQ" },
  ];
  return (
    <div className="space-y-8 py-8">
      <JsonLd data={breadcrumbJsonLd([{ name: "Beranda", path: "/" }, { name: "Aplikasi", path: "/aplikasi" }, { name: app.name, path: `/aplikasi/${app.slug}` }])} />
      <JsonLd data={faqJsonLd(app.faqs)} />
      {app.officialUrl && <JsonLd data={softwareAppJsonLd({ name: app.name, categorySlug: app.categorySlug, priceLabel: app.priceLabel, developer: app.developer, url: app.officialUrl, description: app.tagline, pageUrl: `${site.url}/aplikasi/${app.slug}` })} />}
      <Breadcrumb items={[{ name: "Beranda", path: "/" }, { name: "Aplikasi", path: "/aplikasi" }, { name: app.name, path: `/aplikasi/${app.slug}` }]} />

      {/* 2. App identity header + 3. official action */}
      <section className="rounded-3xl border border-mist bg-paper p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <LetterTile label={app.name} className="h-20 w-20 rounded-2xl text-3xl" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-extrabold leading-tight text-ink">{app.name}</h1>
              <TrustBadge status={app.legalStatus} />
            </div>
            <p className="mt-1 text-sm text-muted">{app.developer} · {app.categoryName}</p>
            <p className="mt-2 leading-relaxed text-ink/80">{app.tagline}</p>
            <p className="mt-2 text-sm text-muted">Terakhir dicek editor: <strong className="text-ink">{formatCheckedId(app.verifiedAt)}</strong> ({info.days} hari lalu). {info.stale
              ? <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-warn">Sudah lebih dari 90 hari - masuk antrean cek ulang</span>
              : "Halaman ini ditandai untuk dicek ulang begitu usianya melewati 90 hari."}</p>
          </div>
        </div>
        <div className="mt-5 border-t border-mist pt-4">
          {app.officialUrl ? (
            <div className="flex flex-col gap-2">
              <OfficialButton href={app.officialUrl} label={app.officialLabel} />
              <p className="text-xs text-muted">Tombol ini membuka sumber resmi. Kami tidak menyediakan file APK aplikasi ini.</p>
            </div>
          ) : (
            <p className="rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-ink/80">
              <strong>Tidak ada tombol unduh di halaman ini - dan itu disengaja.</strong> {app.name} bukan aplikasi resmi dan tidak tersedia di Google Play Store. Mengunduh file APK-nya dari situs acak adalah cara paling umum HP terkena malware. Di bawah kami jelaskan risikonya dan memberi alternatif legal yang aman.
            </p>
          )}
        </div>
      </section>

      {/* 4. Verification & safety status */}
      <section aria-label="Skor keamanan" className="rounded-2xl border border-mist bg-paper p-4 shadow-sm sm:p-5">
        <SectionHeading icon="shield" title="Skor Keamanan" />
        <div className="mt-3"><SafetyScore score={null} /></div>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">Skor angka hanya kami berikan untuk file yang kami host dan lolos pipeline verifikasi Fase 4. Untuk aplikasi ini, penilaian keamanannya kami jelaskan dengan kata-kata di bagian "Apakah {app.name} Aman?" di bawah - tanpa angka karangan.</p>
        {app.categorySlug === "keuangan" && (
          <p className="mt-3 flex gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-ink/85" role="alert">
            <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <span><strong>Peringatan APK Palsu:</strong> {app.name} hanya boleh dipasang dari Google Play Store lewat tombol resmi di halaman ini. Bank dan e-wallet <strong>tidak pernah</strong> mengirim file APK lewat WhatsApp, SMS, atau chat - file seperti itu adalah penipuan pencuri PIN dan kode OTP. Jangan pernah membagikan PIN, OTP, atau kata sandi kepada siapa pun, termasuk yang mengaku petugas {app.name}.</span>
          </p>
        )}
      </section>

      {/* 5. FactBox */}
      <section aria-label="Fakta cepat" className="space-y-3">
        <SectionHeading icon="file" title="Fakta Cepat" />
        <FactBox rows={[
          { label: "Versi", value: app.versionNote },
          { label: "Ukuran", value: app.sizeLabel },
          { label: "Android Minimum", value: app.minAndroid },
          { label: "Kategori", value: app.categoryName },
          { label: "Bahasa", value: app.languages },
          { label: "Harga", value: app.priceLabel },
          { label: "Terakhir Dicek", value: app.verifiedAt },
        ]} />
      </section>

      <AppTocMobile items={toc} label="Isi halaman" />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_230px] lg:items-start lg:gap-8">
        <div className="min-w-0 space-y-10">
          {/* 7. Overview */}
          <section id="ringkasan" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="book" title={`Tentang ${app.name}`} />
            <p className="leading-relaxed text-ink/85">{app.name} — {app.tagline} Developer: {app.developer}. Harga: {app.priceLabel}. Penilaian keamanan lengkapnya, termasuk izin yang diminta dan risikonya, ada di bagian &ldquo;Apakah {app.name} Aman?&rdquo; di bawah.</p>
            {app.intro.map((p) => (<p key={p.slice(0, 24)} className="leading-relaxed text-ink/85">{p}</p>))}
            {app.sections.map((s) => (
              <div key={s.heading} className="space-y-3 pt-2">
                <h3 className="text-lg font-bold text-ink">{s.heading}</h3>
                {s.paragraphs.map((p) => (<p key={p.slice(0, 24)} className="leading-relaxed text-ink/85">{p}</p>))}
              </div>
            ))}
          </section>

          {/* 8. Main features */}
          <section id="fitur" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="star" title={`Fitur Utama ${app.name}`} />
            <ul className="grid gap-3 sm:grid-cols-2">
              {app.features.map((f) => (
                <li key={f.title} className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                  <p className="flex items-start gap-2 font-semibold text-ink"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{f.title}</span></p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{f.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 9. Permissions & safety */}
          <section id="izin" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="shield" title="Izin & Keamanan" />
            <h3 className="text-lg font-bold text-ink">Izin Aplikasi & Artinya</h3>
            <p className="leading-relaxed text-ink/85">Izin adalah "kunci" yang kamu berikan ke aplikasi. Ini izin yang umumnya diminta {app.name} dan arti sederhananya:</p>
            {app.permissionsIntro ? (<p className="leading-relaxed text-ink/85">{app.permissionsIntro}</p>) : null}
            <ul className="divide-y divide-mist rounded-2xl border border-mist bg-paper">
              {app.permissions.map((perm) => (
                <li key={perm.name} className="p-4">
                  <p className="font-semibold text-ink">{perm.name}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink/75">{perm.meaning}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-ink/70">Daftar izin persis dapat berbeda antar versi dan perangkat. Selalu periksa di halaman Play Store aplikasi dan di Pengaturan &gt; Aplikasi &gt; {app.name} &gt; Izin. Baca juga <Link className="font-semibold text-linkblue" href="/panduan/cara-cek-izin-aplikasi">panduan cara cek izin aplikasi</Link>.</p>
            <h3 id="keamanan" className="scroll-mt-24 pt-2 text-lg font-bold text-ink">Apakah {app.name} Aman?</h3>
            {app.safetyParagraphs.map((p) => (<p key={p.slice(0, 24)} className="leading-relaxed text-ink/85">{p}</p>))}
          </section>

          {/* 10. Compatibility & technical info */}
          <section id="kompatibilitas" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="smartphone" title="Kompatibilitas & Informasi Teknis" />
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-mist bg-mist sm:grid-cols-2">
              <div className="bg-paper p-3"><dt className="text-xs font-medium text-muted">Android Minimum</dt><dd className="mt-0.5 text-sm font-semibold text-ink">{app.minAndroid}</dd></div>
              <div className="bg-paper p-3"><dt className="text-xs font-medium text-muted">Versi</dt><dd className="mt-0.5 text-sm font-semibold text-ink">{app.versionNote}</dd></div>
              <div className="bg-paper p-3"><dt className="text-xs font-medium text-muted">Ukuran</dt><dd className="mt-0.5 text-sm font-semibold text-ink">{app.sizeLabel}</dd></div>
              <div className="bg-paper p-3"><dt className="text-xs font-medium text-muted">Bahasa</dt><dd className="mt-0.5 text-sm font-semibold text-ink">{app.languages}</dd></div>
            </dl>
            {app.officialUrl ? (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-ink">Cara Instal {app.name} dari Sumber Resmi</h3>
                <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-ink/85">
                  <li>Buka Google Play Store di HP kamu (atau klik tombol resmi di halaman ini).</li>
                  <li>Cari "{app.name}" dan pastikan nama developer-nya adalah {app.developer}.</li>
                  <li>Ketuk Instal. Bila Play Store memperingatkan aplikasi tidak tersedia untuk perangkatmu, jangan mencari file APK dari situs acak - itu tanda perangkatmu tidak didukung.</li>
                  <li>Setelah terinstal, buka Pengaturan &gt; Aplikasi &gt; {app.name} &gt; Izin dan matikan izin yang tidak kamu butuhkan.</li>
                </ol>
                <p className="text-sm text-ink/70">Panduan lengkapnya: <Link className="font-semibold text-linkblue" href="/panduan/cara-instal-apk-aman">cara instal aplikasi dengan aman</Link>.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-ink">Cara Instal {app.name}</h3>
                <p className="leading-relaxed text-ink/85">Tidak ada cara resmi memasang {app.name}: aplikasi ini tidak ada di Google Play Store dan tidak punya jalur instal resmi. Jangan memasang berkas APK-nya dari situs acak — gunakan alternatif legal di bawah. Panduan lengkapnya: <Link className="font-semibold text-linkblue" href="/panduan/cara-instal-apk-aman">cara instal aplikasi dengan aman</Link>.</p>
              </div>
            )}
          </section>

          {/* 11. Pros & cons */}
          <section id="kelebihan" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="check" title="Kelebihan & Kekurangan" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-ink"><Icon name="plus" className="h-5 w-5 text-primary" />Kelebihan</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink/85">{app.pros.map((x) => (<li key={x}>{x}</li>))}</ul>
              </div>
              <div className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-ink"><Icon name="minus" className="h-5 w-5 text-danger" />Kekurangan</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink/85">{app.cons.map((x) => (<li key={x}>{x}</li>))}</ul>
              </div>
            </div>
          </section>

          {/* 12. Changelog */}
          <section id="changelog" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="clock" title="Catatan Versi & Changelog" />
            <p className="leading-relaxed text-ink/85">{app.officialUrl
              ? `${app.name} diperbarui langsung oleh developer-nya lewat Play Store; nomor versi dan ukuran persis berbeda antar perangkat dan berubah setiap rilis. Karena itu kami tidak mencetak nomor versi karangan di halaman ini - versi yang kamu terima selalu versi resmi terbaru pada saat kamu menginstal dari sumber resmi. `
              : `${app.name} tidak ada di Play Store dan tidak diperbarui lewat jalur resmi; karena itu kami tidak mencetak nomor versi di halaman ini. `}
              Halaman ini terakhir dicek editor pada {app.verifiedAt} dan masuk antrean cek ulang otomatis begitu usianya melewati 90 hari.</p>
          </section>

          {/* 13. Alternatives */}
          <section id="alternatif" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="arrow" title={`Alternatif Legal untuk ${app.name}`} />
            <ul className="space-y-2">
              {altApps.map(({ alt, found }) => (
                <li key={alt.name} className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                  {found ? <Link href={`/aplikasi/${found.slug}`} className="font-semibold text-linkblue">{alt.name}</Link> : <span className="font-semibold text-ink">{alt.name}</span>}
                  <p className="mt-0.5 text-sm leading-relaxed text-ink/75">{alt.note}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 14. Related guides & tools */}
          <section id="terkait" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="book" title="Panduan & Tool Terkait" />
            {app.relatedTool && (
              <p className="rounded-2xl bg-primary-soft p-4 text-sm text-ink/85">
                Terkait: <Link className="font-semibold text-primary-dark underline" href={app.relatedTool.href}>{app.relatedTool.label}</Link> - gratis, tanpa instal aplikasi tambahan.
              </p>
            )}
            {relatedGuides.length > 0 && (
              <ul className="space-y-2">
                {relatedGuides.map((g) => (
                  <li key={g.slug} className="rounded-2xl border border-mist bg-paper p-4 shadow-sm">
                    <Link href={`/panduan/${g.slug}`} className="font-semibold text-linkblue">{g.title}</Link>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink/75">{g.metaDescription}</p>
                  </li>
                ))}
              </ul>
            )}
            {relatedGuides.length === 0 && !app.relatedTool && (
              <p className="text-sm leading-relaxed text-ink/70">Belum ada panduan terkait untuk aplikasi ini.</p>
            )}
          </section>

          {/* 15. FAQ */}
          <section id="faq" className="scroll-mt-24 space-y-4">
            <SectionHeading icon="help" title={`Pertanyaan Umum tentang ${app.name}`} />
            <FaqAccordion faqs={app.faqs} />
          </section>

          {/* Related applications */}
          <section className="space-y-4">
            <SectionHeading icon="grid" title="Aplikasi Terkait" />
            <RelatedApps apps={relatedFinal.map((a) => ({ name: a.name, slug: a.slug, developer: a.developer, status: a.legalStatus }))} />
          </section>
        </div>
        <AppTocAside items={toc} label="Isi halaman" />
      </div>

      {/* 16. Editorial trust information */}
      <section className="rounded-2xl border border-mist bg-mist/50 p-4 text-sm leading-relaxed text-ink/75 sm:p-5">
        <p className="flex items-start gap-2">
          <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span><strong className="text-ink">Tentang halaman ini.</strong> Halaman ini ditulis editor dan terakhir dicek pada {formatCheckedId(app.verifiedAt)}; halaman masuk antrean cek ulang otomatis begitu usianya melewati 90 hari. CekAPK tidak meng-host file APK aplikasi ini — semua tautan unduhan mengarah ke sumber resmi. Cara kami memverifikasi aplikasi dijelaskan di <Link className="font-semibold text-linkblue" href="/metodologi-verifikasi">metodologi verifikasi</Link>.</span>
        </p>
      </section>
    </div>
  );
}
