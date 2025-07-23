// Service Worker para Landing Page Corretor
const CACHE_NAME = 'lafratta-corretor-v1';
const urlsToCache = [
    '/',
    '/css/style.css',
    '/js/script.js',
    '/imgs/Favicon.png',
    '/imgs/Logo_FundoEscuro-Site.png',
    '/imgs/logo_branco_transp.png',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Poppins:wght@300;400;500;600;700&family=Lora:ital,wght@1,400&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate event
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

