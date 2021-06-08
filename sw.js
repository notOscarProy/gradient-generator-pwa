const CACHE_NAME = "v1_cache_gradient_generator";
const urlsToCache = [
  "./",
  "./?umt_source-web_app_manifest",
  "./pages/fallback.html",
  "./pages/css/style.css",
  "./img/favicon.png",
  "./img/icon_x32.png",
  "./img/icon_x64.png",
  "./img/icon_x128.png",
  "./img/icon_x192.png",
  "./img/icon_x256.png",
  "./img/icon_x512.png",
  "./img/icon_x1024.png",
  "./js/main.js",
  "https://unpkg.com/vue@next",
  "./js/mount.js",
  "./css/style.css",
  "./manifest.json",
  "https://fonts.googleapis.com/css2?family=Poppins&display=swap"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache
        .addAll(urlsToCache)
        .then(() => self.skipWaiting())
        .catch((err) => console.log(err))
    )
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res){    
                    return res
                }
                return fetch(e.request)
            }
        ).catch(
            ()=> caches.match("./pages/fallback.html")
        )
    )
})