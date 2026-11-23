// Indikator terakhir dicek (FR-TRUST-01): tanggal + usia hari; >90 hari = lencana cek ulang.
export function lastCheckedInfo(verifiedAt: string, now = new Date()): { days: number; stale: boolean } {
  const then = new Date(verifiedAt + "T00:00:00+07:00").getTime();
  const days = Math.max(0, Math.floor((now.getTime() - then) / 86400000));
  return { days, stale: days > 90 };
}
