const CACHE_NAME = 'inverteca-core-v1';
const ASSETS = [
  './',
  './index.html',
  'https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.8.1/firebase-database.js',
  'https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js'
];

// Instalación: Cachear recursos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activación: Limpiar cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Estrategia Network First con fallback a Cache
self.addEventListener('fetch', event => {
  // Solo manejar peticiones GET para evitar errores con Firebase (POST/PUT)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
