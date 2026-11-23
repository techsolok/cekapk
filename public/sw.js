// Service worker ID APK Hub: cache HANYA aset statis dan halaman konten.
// JANGAN PERNAH cache: /api/* (hasil tool, unduhan), /perpustakaan unduhan, /admin.
const VERSION = "idapk-v1";
const STATIC_CACHE = VERSION + "-static";
const PAGE_CACHE = VERSION + "-pages";
const PRECACHE = ["/offline", "/icons/icon-192.png", "/icons/icon-512.png"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) return; // network only
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => {
      const copy = res.clone(); caches.open(STATIC_CACHE).then((c) => c.put(request, copy)); return res;
    })));
    return;
  }
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then((res) => {
      const copy = res.clone(); caches.open(PAGE_CACHE).then((c) => c.put(request, copy)); return res;
    }).catch(() => caches.match(request).then((hit) => hit || caches.match("/offline"))));
  }
});
