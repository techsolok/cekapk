// Pembaca ZIP minimal untuk APK: daftar entri dari central directory + ekstrak satu entri.
// Mendukung method 0 (stored) dan 8 (deflate). Cukup untuk pemeriksaan struktur & sertifikat.
import { inflateRawSync } from "node:zlib";

export interface ZipEntry { name: string; method: number; compressedSize: number; size: number; localOffset: number }
export function listZipEntries(buf: Buffer): ZipEntry[] {
  // Cari End Of Central Directory (tanda 0x06054b50) dari akhir berkas.
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 65536); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("Bukan berkas ZIP/APK yang valid (EOCD tidak ditemukan).");
  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const entries: ZipEntry[] = [];
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) break;
    const method = buf.readUInt16LE(off + 10);
    const compressedSize = buf.readUInt32LE(off + 20);
    const size = buf.readUInt32LE(off + 24);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commentLen = buf.readUInt16LE(off + 32);
    const localOffset = buf.readUInt32LE(off + 42);
    const name = buf.subarray(off + 46, off + 46 + nameLen).toString("utf8");
    entries.push({ name, method, compressedSize, size, localOffset });
    off += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}
export function extractZipEntry(buf: Buffer, entry: ZipEntry): Buffer {
  const off = entry.localOffset;
  if (buf.readUInt32LE(off) !== 0x04034b50) throw new Error("Local header ZIP rusak.");
  const nameLen = buf.readUInt16LE(off + 26);
  const extraLen = buf.readUInt16LE(off + 28);
  const start = off + 30 + nameLen + extraLen;
  const data = buf.subarray(start, start + entry.compressedSize);
  if (entry.method === 0) return Buffer.from(data);
  if (entry.method === 8) return inflateRawSync(data);
  throw new Error(`Metode kompresi ZIP tidak didukung: ${entry.method}`);
}
