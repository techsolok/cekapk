import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
// Client dibuat malas (lazy) - Fase 0 belum membutuhkan database aktif.
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;
export function getDb() {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL belum diatur - lihat .env.example");
  _db = drizzle(postgres(url, { max: 5 }), { schema });
  return _db;
}
