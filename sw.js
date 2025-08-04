const CACHE_NAME = 'lafratta-hub-cache-v1';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/carrossel.css',
  '/js/main.js',
  '/js/leads.js',
  '/js/carrossel.js',
  '/imgs/profile.png',
  '/imgs/logo-principal.png',
  '/imgs/favicon.png',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Poppins:wght@300;400;500;600;700&family=Lora:ital,wght@1,400&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instala o Service Worker e adiciona arquivos ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepta requisições e responde do cache quando possível
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then(response => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            if (
              event.request.url.startsWith('http') &&
              response.status === 200
            ) {
              cache.put(event.request, cloned);
            }
          });
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});
