const cacheName = 'spacerabbits-v8';
const contentToCache = [
    '/styles/style.css',
    '/assets/images/planet.png', 
    '/assets/images/stars.png', 
    '/assets/images/heart.png', 
    '/assets/images/bala.png', 
    '/assets/images/gunpoints.png', 
    '/assets/images/new-game-button.png', 
    '/assets/images/leaderboard-button.png', 
    '/assets/images/main-menu-button.png', 
    '/assets/images/asteroids-orange.png', 
    '/assets/images/asteroids-blue.png', 
    '/assets/images/rabbit-sheet.svg',
    'https://fonts.googleapis.com/css?family=Space+Mono&display=swap'
]

self.addEventListener('install', (e) => {
    console.log('[Service worker] install');
    event.waitUntil(cacheContent());  
});

async function cacheContent() {
  const cache = await caches.open(cacheName);
  await cache.addAll(contentToCache);
  return self.skipWaiting();
}


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
          console.log('[Service Worker] Fetching resource v2: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource v2: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
          if(cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });