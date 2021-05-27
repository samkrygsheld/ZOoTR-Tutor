self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('zootr-dynamic').then((cache) => {
            return cache.addAll([
                '/ZOoTR-Tutor/',
                '/ZOoTR-Tutor/assets/vendor/jquery-3.6.0.min.js',
                '/ZOoTR-Tutor/assets/css/zootr.css',
                '/ZOoTR-Tutor/assets/js/zootr.js',
                '/ZOoTR-Tutor/assets/images/music/note-a.png',
                '/ZOoTR-Tutor/assets/images/music/note-d.png',
                '/ZOoTR-Tutor/assets/images/music/note-l.png',
                '/ZOoTR-Tutor/assets/images/music/note-r.png',
                '/ZOoTR-Tutor/assets/images/music/note-u.png',
                '/ZOoTR-Tutor/assets/images/music/staff.png',
            ]);
        })
    );
});

// self.addEventListener('activate', (e) => {
//     e.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(cacheNames.filter((cacheName) => true).map((cacheName) => caches.delete(cacheName))))
//     );
// });

self.addEventListener('fetch', (e) => {
    // console.log(e.request.url);
    e.respondWith(
        caches.open('zootr-dynamic').then((cache) => {
            return cache.match(e.request).then((response) => {
                return response || fetch(e.request).then((response) => {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});