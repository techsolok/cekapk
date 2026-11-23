// Seed database Fase 3: npm run db:seed (butuh DATABASE_URL; skema harus sudah diterapkan)
// - 10 kategori, seluruh katalog aplikasi lokal sebagai status "published" + konten JSON penuh
// - 5 panduan, 1 tool, peta keyword pola PRD 12.3 (24 pola x aplikasi) + baris daftar negatif "excluded"
// - Akun admin dari env ADMIN_EMAIL + ADMIN_PASSWORD (di-hash scrypt; tidak pernah disimpan mentah)
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "../src/db/schema";
import { categories as localCategories } from "../src/lib/data/categories";
import { pillarApps } from "../src/lib/data/apps";
import { guides as localGuides } from "../src/lib/data/guides";
import { hashPassword } from "../src/lib/auth";
import { comparisons as localComparisons } from "../src/lib/data/comparisons";

const PATTERNS = ["download {app}", "{app} apk", "{app} apk terbaru", "{app} versi lama", "{app} untuk android", "cara download {app}", "cara instal {app}", "{app} aman atau tidak", "apa itu {app}", "{app} tidak bisa dibuka", "{app} error", "alternatif {app}", "{app} bahasa indonesia", "{app} ukuran berapa", "{app} android berapa", "{app} gratis atau berbayar", "{app} tanpa iklan penjelasan resmi", "link resmi {app}", "{app} play store", "update {app} terbaru", "fitur {app} terbaru", "{app} untuk pc penjelasan resmi", "ulasan {app}", "{app} vs alternatif"];
const EXCLUDED = ["jayaslot", "rejekibet", "nekopoi", "slot online", "situs bokep", "mod apk premium unlocked"];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) { console.error("DATABASE_URL belum diatur."); process.exit(1); }
  const client = postgres(url, { max: 3 });
  const db = drizzle(client, { schema });

  const catIds = new Map<string, number>();
  for (const c of localCategories) {
    const rows = await db.insert(schema.categories)
      .values({ slug: c.slug, nameId: c.name, descriptionId: c.blurb, icon: c.icon })
      .onConflictDoUpdate({ target: schema.categories.slug, set: { nameId: c.name, descriptionId: c.blurb, icon: c.icon } })
      .returning({ id: schema.categories.id });
    catIds.set(c.slug, rows[0].id);
  }
  console.log("Kategori:", catIds.size);

  let appCount = 0;
  for (const a of pillarApps) {
    await db.insert(schema.apps).values({
      slug: a.slug, name: a.name, aliases: [], developer: a.developer, categoryId: catIds.get(a.categorySlug) ?? null,
      legalStatus: a.legalStatus, officialUrl: a.officialUrl, priceModel: a.priceLabel, minAndroid: a.minAndroid,
      language: a.languages, icon: a.icon, descriptionId: a.intro.join("\n\n"), pros: a.pros, cons: a.cons,
      permissions: a.permissions, verifiedAt: new Date(a.verifiedAt + "T00:00:00+07:00"),
      publishedAt: new Date(a.verifiedAt + "T00:00:00+07:00"), status: "published", source: "editorial",
      content: a as unknown as Record<string, unknown>,
    }).onConflictDoUpdate({ target: schema.apps.slug, set: {
      name: a.name, developer: a.developer, categoryId: catIds.get(a.categorySlug) ?? null,
      legalStatus: a.legalStatus, officialUrl: a.officialUrl, priceModel: a.priceLabel,
      descriptionId: a.intro.join("\n\n"), pros: a.pros, cons: a.cons, permissions: a.permissions,
      status: "published", source: "editorial", content: a as unknown as Record<string, unknown>, updatedAt: new Date(),
    }});
    appCount++;
  }
  console.log("Aplikasi published:", appCount);

  for (const g of localGuides) {
    await db.insert(schema.guides).values({ slug: g.slug, title: g.title, bodyId: JSON.stringify(g), type: g.type, faq: g.faqs, publishedAt: new Date(g.verifiedAt + "T00:00:00+07:00") })
      .onConflictDoUpdate({ target: schema.guides.slug, set: { title: g.title, bodyId: JSON.stringify(g), faq: g.faqs } });
  }
  console.log("Panduan:", localGuides.length);

  await db.insert(schema.tools).values({ slug: "pengunduh-tiktok", type: "downloader", config: { rateLimitInfoPerMinute: 12, rateLimitDownloadPerHour: 30 } })
    .onConflictDoNothing({ target: schema.tools.slug });
  console.log("Tool: pengunduh-tiktok");

  await db.delete(schema.keywords); // seed ulang tidak menggandakan peta keyword
  let kw = 0;
  for (const a of pillarApps) {
    for (const p of PATTERNS) {
      await db.insert(schema.keywords).values({ keyword: p.replace("{app}", a.name.toLowerCase()), cluster: "App Info", intent: "info", targetUrl: `/aplikasi/${a.slug}`, status: "live", risk: "green" }).onConflictDoNothing();
      kw++;
    }
  }
  for (const x of EXCLUDED) {
    await db.insert(schema.keywords).values({ keyword: x, cluster: "Negative List", intent: "excluded", targetUrl: null, status: "excluded", risk: "red" }).onConflictDoNothing();
  }
  console.log("Keyword live:", kw, "+ excluded:", EXCLUDED.length);

  for (const c of localComparisons) {
    const aId = await db.select({ id: schema.apps.id }).from(schema.apps).where(eq(schema.apps.slug, c.aSlug)).limit(1);
    const bId = await db.select({ id: schema.apps.id }).from(schema.apps).where(eq(schema.apps.slug, c.bSlug)).limit(1);
    if (aId[0] && bId[0]) {
      const values = { appA: aId[0].id, appB: bId[0].id, verdictId: c.verdict.join("\n\n"), table: { title: c.title, slug: c.slug, rows: c.rows, whoA: c.whoA, whoB: c.whoB } as unknown as Record<string, unknown>, faq: c.faqs };
      const existing = await db.select({ id: schema.comparisons.id }).from(schema.comparisons).where(eq(schema.comparisons.appA, aId[0].id)).limit(1);
      if (existing[0]) await db.update(schema.comparisons).set(values).where(eq(schema.comparisons.id, existing[0].id));
      else await db.insert(schema.comparisons).values(values);
    }
  }
  console.log("Perbandingan:", localComparisons.length);

  const email = process.env.ADMIN_EMAIL; const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const role = process.env.ADMIN_ROLE ?? "admin";
    await db.insert(schema.admins).values({ email: email.toLowerCase(), passwordHash: hashPassword(password), role, twoFactorSecret: process.env.ADMIN_TOTP_SECRET ?? null })
      .onConflictDoUpdate({ target: schema.admins.email, set: { passwordHash: hashPassword(password), role, twoFactorSecret: process.env.ADMIN_TOTP_SECRET ?? null } });
    console.log("Admin dibuat/diperbarui:", email.toLowerCase(), "role:", role, "2FA:", process.env.ADMIN_TOTP_SECRET ? "aktif" : "nonaktif");
  } else {
    console.log("Admin dilewati (ADMIN_EMAIL/ADMIN_PASSWORD tidak diatur).");
  }
  await client.end();
  console.log("SEED SELESAI");
}
main().catch((e) => { console.error(e); process.exit(1); });
