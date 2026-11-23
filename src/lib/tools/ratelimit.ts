// Penyimpanan rate limit tool (FR-MNT-01): Redis lewat REST Upstash bila
// UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN diatur; selain itu fallback
// memori lokal (perilaku lama). Semantik fixed-window:
// - info: limit per jendela; pelanggaran menambah strikes (jendela 10 menit);
//   strikes >= 2 -> tantangan wajib. Unduhan: limit per jam.
interface RateStore {
  incr(key: string, ttlMs: number): Promise<number>;
  get(key: string): Promise<number>;
}
class MemoryStore implements RateStore {
  private map = new Map<string, { count: number; expiresAt: number }>();
  async incr(key: string, ttlMs: number): Promise<number> {
    const now = Date.now();
    const cur = this.map.get(key);
    if (!cur || cur.expiresAt <= now) { this.map.set(key, { count: 1, expiresAt: now + ttlMs }); return 1; }
    cur.count += 1; return cur.count;
  }
  async get(key: string): Promise<number> {
    const cur = this.map.get(key);
    if (!cur || cur.expiresAt <= Date.now()) return 0;
    return cur.count;
  }
}
class UpstashStore implements RateStore {
  constructor(private url: string, private token: string) {}
  private async cmd(commands: string[][]): Promise<unknown[]> {
    const r = await fetch(`${this.url}/pipeline`, { method: "POST", headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" }, body: JSON.stringify(commands) });
    if (!r.ok) throw new Error(`Upstash HTTP ${r.status}`);
    const d = await r.json() as { result?: unknown; error?: string }[];
    return d.map((x) => { if (x.error) throw new Error(x.error); return x.result; });
  }
  async incr(key: string, ttlMs: number): Promise<number> {
    const [n] = await this.cmd([["INCR", key]]);
    const count = Number(n ?? 0);
    if (count === 1) { try { await this.cmd([["PEXPIRE", key, String(ttlMs)]]); } catch { /* TTL gagal tidak fatal */ } }
    return count;
  }
  async get(key: string): Promise<number> {
    const [v] = await this.cmd([["GET", key]]);
    return Number(v ?? 0) || 0;
  }
}
let store: RateStore | null = null;
let warned = false;
export function rateStore(): RateStore {
  if (store) return store;
  const url = process.env.UPSTASH_REDIS_REST_URL; const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) { store = new UpstashStore(url, token); }
  else {
    store = new MemoryStore();
    if (!warned) { warned = true; console.warn("[ratelimit] Redis belum dikonfigurasi - memakai memori lokal (satu instans). Atur UPSTASH_REDIS_REST_URL/TOKEN untuk produksi multi-instans."); }
  }
  return store;
}
export async function checkInfoRate(ip: string, limit = 12, windowMs = 60_000): Promise<{ allowed: boolean; needChallenge: boolean }> {
  const s = rateStore();
  const count = await s.incr(`rl:info:${ip}`, windowMs);
  if (count > limit) {
    const strikes = await s.incr(`rl:strikes:${ip}`, 10 * 60_000);
    return { allowed: false, needChallenge: strikes >= 2 };
  }
  const strikes = await s.get(`rl:strikes:${ip}`);
  return { allowed: true, needChallenge: strikes >= 2 };
}
export async function checkDownloadLimit(ip: string, limit = 30): Promise<boolean> {
  const s = rateStore();
  const count = await s.incr(`rl:dl:${ip}`, 3_600_000);
  return count <= limit;
}
