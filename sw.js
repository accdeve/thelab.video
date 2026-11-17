const CACHE_NAME = 'thelab-video-v4';

const ASSETS_TO_CACHE = [
  './',
  './styles.css',
  './app.js',
  './videos-data.js',
  './videos.json',
  './manifest.json',
  './dce115fe36a6a534bc99cd379ea93d3b.webp',
  './thelab-logo.webp',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: Simpan file inti secara aman (toleran terhadap redirect Vercel)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        ASSETS_TO_CACHE.map(async (url) => {
          try {
            const res = await fetch(url, { redirect: 'follow' });
            if (res.ok) {
              await cache.put(url, res);
            }
          } catch (e) {
            console.warn('[SW] Lewati cache:', url, e);
          }
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: Bersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Tangani hanya request Same-Origin agar YouTube & CDN tidak terganggu
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  // Lewatkan semua request ke domain luar (YouTube, Google Fonts, CDN)
  try {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) {
      return;
    }
  } catch (e) {
    return;
  }

  // Cache-First untuk aset lokal dengan fallback ke network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || !networkResponse.ok) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback untuk navigasi halaman jika offline
        if (event.request.mode === 'navigate') {
          return caches.match('./') || caches.match('./index.html');
        }
      });
    })
  );
});
