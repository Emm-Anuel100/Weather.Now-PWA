
const CACHE_NAME = 'weather-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/404.html',
    '/styles/dist/home.css',
    '/Script/RandomBackground.js',
    '/Script/SearchBar.js',
    '/Script/Weather-data.js',
    '/Images/favicon.png',
    '/Images/weather-pic1.webp',
    '/Images/weather-pic2.webp',
    '/Images/weather-pic3.webp'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
