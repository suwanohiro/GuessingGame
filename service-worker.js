const CACHE_NAME = 'guessing-game-v1';
const urlsToCache = [
    './index.html',
    './setting.html',
    './result.html',
    './css/index/index.css',
    './css/result/main.css',
    './css/setting/main.css',
    './js/main.js',
    './js/result/index.js',
    './js/result/main.js',
    './js/setting/index.js',
    './js/setting/main.js'
];

// インストール時にキャッシュを作成
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// キャッシュからレスポンスを返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // キャッシュがあればそれを返す
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
