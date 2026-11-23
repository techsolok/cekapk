import { promises as fs } from "node:fs";
import path from "node:path";
// Penyimpanan file library: di luar folder publik. Di produksi arahkan ke volume/object storage
// lewat LIBRARY_STORAGE_DIR (PRD FR-DL-02 menyarankan R2/S3 + CDN di depan route unduhan ini).
export function storageDir(): string {
  return process.env.LIBRARY_STORAGE_DIR ?? path.join(process.cwd(), "storage", "library");
}
export async function saveLibraryFile(fileName: string, data: Buffer): Promise<string> {
  const dir = storageDir();
  await fs.mkdir(dir, { recursive: true });
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const full = path.join(dir, safe);
  await fs.writeFile(full, data);
  return full;
}
export async function readLibraryFile(storagePath: string): Promise<Buffer> {
  return fs.readFile(storagePath);
}
