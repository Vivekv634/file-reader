// public/service-worker.js
this.addEventListener('push', function (event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: './book.png',
        badge: './book.png'
    };

    event.waitUntil(
        this.registration.showNotification(data.title, options)
    );
});

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('file-reader-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/static/js/bundle.js',
                // Add other assets and routes to cache
            ]);
        })
    );
});

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});