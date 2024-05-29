"use strict";

var CACHE_NAME = 'weather-app-cache-v1';
var urlsToCache = ['/', '/index.html', '/404.html', '/styles/dist/home.css', '/Script/RandomBackground.js', '/Script/SearchBar.js', '/Script/Weather-data.js', '/Images/favicon.png', '/Images/weather-pic1.webp', '/Images/weather-pic2.webp', '/Images/weather-pic3.webp'];
self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(urlsToCache);
  }));
});
self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    return response || fetch(event.request);
  }));
});
self.addEventListener('activate', function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (cacheWhitelist.indexOf(cacheName) === -1) {
        return caches["delete"](cacheName);
      }
    }));
  }));
});