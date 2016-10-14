this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('offline-app-demo-v1.0').then(function(cache) {
            return cache.addAll([
                '/offline-app-demo/',
                '/offline-app-demo/index.html',
                '/offline-app-demo/page1.html',
                '/offline-app-demo/style.css',
                '/offline-app-demo/offline.html'

            ]);
        })
    );
});



this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
}.catch(function() {
    // if file is not in cache or if network is down
    return caches.match('/offline-app-demo/offline.html');
}));
