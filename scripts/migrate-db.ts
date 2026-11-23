// Terapkan migrasi Drizzle dari folder ./drizzle ke DATABASE_URL: npm run db:migrate
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) { console.error("DATABASE_URL belum diatur."); process.exit(1); }
  const client = postgres(url, { max: 1 });
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrasi selesai.");
  await client.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
