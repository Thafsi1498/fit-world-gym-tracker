const CACHE_NAME = 'fit-world-gym-shell-v1';
const APP_SHELL = ['./', './index.html', './manifest.json', './icon.svg'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => { const req = event.request; const url = new URL(req.url); if (req.method !== 'GET' || url.origin !== self.location.origin) return; event.respondWith(fetch(req).then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(req, copy)); } return res; }).catch(() => caches.match(req).then(cached => cached || caches.match('./index.html')))); });
