var dataCacheName = 'ractioData-v1';
var cacheName = 'ractio-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/bundle.js',
  '/logos/bgl-128-round.png',
  '/logos/fm4-128-round.png',
  '/logos/ktn-128-round.png',
  '/logos/noe-128-round.png',
  '/logos/oe1-128-round.png',
  '/logos/oe3-128-round.png',
  '/logos/sbg-128-round.png',
  '/logos/stm-128-round.png',
  '/logos/tir-128-round.png',
  '/logos/vbg-128-round.png',
  '/logos/wie-128-round.png',
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  if (e.request.url.indexOf('stream') > -1) {
    console.log('[ServiceWorker] Going straight to network for', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  } else if (e.request.url.indexOf('orf.at') > -1) {
    console.log('[ServiceWorker] Trying to fetch, then cache for', e.request.url);
    e.respondWith(
      caches.open(dataCacheName).then(function (cache) {
        return fetch(e.request).then(function (response) {
          cache.put(e.request.url, response.clone());
          return response;
        }).catch(function (err) {
          return caches.match(e.request).then(function (response) {
            return response;
          })
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        if (!response) {
          console.log('not found in cache - fetching', e.request.url);
        }
        return response || fetch(e.request);
      })
    );
  }
});

self.addEventListener('push', function (event) {
  console.log(`[Service Worker] Push received. Data: "${event.data.text()}"`);
  const title = 'Ractio';
  const options = {
    body: 'Yay it works.',
    icon: 'logos/fm4-128-round.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
