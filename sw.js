// ===== SERVICE WORKER - LAFRATTAJR.COM.BR =====

const CACHE_NAME = 'lafrattajr-v1.0.0';
const STATIC_CACHE_NAME = 'lafrattajr-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'lafrattajr-dynamic-v1.0.0';

// Arquivos para cache estático (sempre em cache)
const STATIC_FILES = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/js/slider.js',
  '/js/leads.js',
  '/imgs/profile.png',
  '/imgs/favicon.png',
  '/manifest.json',
  // Fontes Google
  'https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Poppins:wght@300;400;500;600;700&family=Lora:ital,wght@1,400&display=swap',
  // Font Awesome
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Arquivos para cache dinâmico (cache sob demanda)
const DYNAMIC_FILES = [
  '/corretor/',
  '/portfolio/',
  '/curriculo/',
  '/checklist/',
  '/imgs/projects/'
];

// URLs que não devem ser cacheadas
const EXCLUDE_URLS = [
  'https://wa.me/',
  'https://docs.google.com/forms/',
  'https://www.google-analytics.com/',
  'https://www.googletagmanager.com/'
];

// ===== INSTALAÇÃO DO SERVICE WORKER =====
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacheando arquivos estáticos');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Instalação concluída');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Erro na instalação:', error);
      })
  );
});

// ===== ATIVAÇÃO DO SERVICE WORKER =====
self.addEventListener('activate', event => {
  console.log('Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Remover caches antigos
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Ativação concluída');
        return self.clients.claim();
      })
      .catch(error => {
        console.error('Service Worker: Erro na ativação:', error);
      })
  );
});

// ===== INTERCEPTAÇÃO DE REQUESTS =====
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requests que não devem ser cacheadas
  if (shouldExcludeFromCache(request.url)) {
    return;
  }
  
  // Estratégia diferente para diferentes tipos de recursos
  if (request.destination === 'document') {
    // HTML: Network First, fallback para cache
    event.respondWith(networkFirstStrategy(request));
  } else if (request.destination === 'image') {
    // Imagens: Cache First, fallback para network
    event.respondWith(cacheFirstStrategy(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // CSS/JS: Stale While Revalidate
    event.respondWith(staleWhileRevalidateStrategy(request));
  } else {
    // Outros recursos: Cache First
    event.respondWith(cacheFirstStrategy(request));
  }
});

// ===== ESTRATÉGIAS DE CACHE =====

// Network First: Tenta network primeiro, fallback para cache
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network falhou, buscando no cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para página offline
    if (request.destination === 'document') {
      return caches.match('/offline.html') || new Response('Página não disponível offline', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    }
    
    throw error;
  }
}

// Cache First: Busca no cache primeiro, fallback para network
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Erro ao buscar recurso:', request.url, error);
    
    // Fallback para imagem placeholder se for uma imagem
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Imagem não disponível</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    
    throw error;
  }
}

// Stale While Revalidate: Retorna do cache e atualiza em background
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  const networkResponsePromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(STATIC_CACHE_NAME);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(error => {
    console.log('Erro na atualização em background:', error);
  });
  
  return cachedResponse || networkResponsePromise;
}

// ===== UTILITÁRIOS =====

function shouldExcludeFromCache(url) {
  return EXCLUDE_URLS.some(excludeUrl => url.includes(excludeUrl));
}

// ===== EVENTOS DE MENSAGEM =====
self.addEventListener('message', event => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_INFO':
      getCacheInfo().then(info => {
        event.ports[0].postMessage(info);
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
      
    default:
      console.log('Mensagem não reconhecida:', type);
  }
});

async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const cacheInfo = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    cacheInfo[cacheName] = keys.length;
  }
  
  return cacheInfo;
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
}

// ===== SYNC EM BACKGROUND =====
self.addEventListener('sync', event => {
  console.log('Background Sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Aqui você pode implementar sincronização de dados
    // Por exemplo, enviar formulários pendentes, atualizar cache, etc.
    console.log('Executando sincronização em background');
    
    // Atualizar cache de recursos críticos
    const cache = await caches.open(STATIC_CACHE_NAME);
    await cache.addAll(STATIC_FILES.slice(0, 5)); // Atualizar apenas os mais críticos
    
  } catch (error) {
    console.error('Erro na sincronização em background:', error);
  }
}

// ===== PUSH NOTIFICATIONS =====
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/imgs/favicon.png',
    badge: '/imgs/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey || 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver mais',
        icon: '/imgs/favicon.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/imgs/favicon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ===== CLIQUE EM NOTIFICAÇÕES =====
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Apenas fechar a notificação
  } else {
    // Clique na notificação (não em uma ação)
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// ===== LOG DE INICIALIZAÇÃO =====
console.log('Service Worker carregado - Lafrattajr.com.br v1.0.0');

