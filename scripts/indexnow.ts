// IndexNow (Bing/Yandex): submit ONLY pages that actually changed, after a content
// update or deploy. Submitting the whole sitemap on every deploy is spammy and
// against IndexNow guidance - pass the changed URLs as arguments.
// Usage: npx tsx scripts/indexnow.ts https://cekapk.com/aplikasi/tiktok https://cekapk.com/panduan/...
// The key is public by design: IndexNow verifies ownership via public/<key>.txt.
const KEY = "7c697622c98aec90815e60ef01b4dcdc";
const HOST = "cekapk.com";

async function main() {
  const urls = process.argv.slice(2).filter((u) => u.startsWith(`https://${HOST}/`));
  if (urls.length === 0) {
    console.error("Usage: npx tsx scripts/indexnow.ts <changed-url> [...]");
    process.exit(1);
  }
  const res = await fetch("https://api.indexnow.org/indexnow.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
  });
  console.log("IndexNow:", res.status, await res.text());
}

main().catch((e) => { console.error(e); process.exit(1); });
