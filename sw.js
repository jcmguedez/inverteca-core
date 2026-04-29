const CACHE_NAME = 'inverteca-v11';
const ASSETS = [
  './',
  './index.html',
  'https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.8.1/firebase-database.js',
  'https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
