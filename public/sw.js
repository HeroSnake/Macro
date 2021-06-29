this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                './',
                './index.html',
                './global.css',
                './main.js',
                './favicon.png',
            ]);
        })
    );
});

this.addEventListener('fetch', function (event) {
    var response;
    event.respondWith(caches.match(event.request).catch(function () {
        return fetch(event.request);
    }).then(function (r) {
        response = r;
        caches.open('v1').then(function (cache) {
            cache.put(event.request, response);
        });
        return response.clone();
    }).catch(function () {
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
    }));
});

this.addEventListener('activate', function (event) {
    var cacheWhitelist = ['v2'];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
}); w