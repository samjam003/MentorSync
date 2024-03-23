self.addEventListener('install', (event) => {
    console.info('Event: Install');
    console.info('Event: from pwa');
    event.waitUntil(
      caches.open("static-cache")
      .then((cache) => {
        //[] of files to cache & if any of the file not present `addAll` will fail
        return cache.addAll([
            "/",
            './offline.html',
        ])
        .then(() => {
          console.info('All files are cached');
          return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
        })
        .catch((error) =>  {
          console.error('Failed to cache', error);
        })
      })
    );
  });


self.addEventListener('fetch', (event) => {
    console.info('Event: Fetch');

    var request = event.request;

    // Tell the browser to wait for a network request and respond with the cached version if available
    event.respondWith(
        // Check if the request is already in the cache
        caches.match(request).then((response) => {
            if (response) {
                return response; // If cached version is found, return it
            }

            // If request is not cached, fetch it from the network
            return fetch(request).then((response) => {
                // Clone the response to cache it
                var responseToCache = response.clone();
                caches.open("static-cache").then((cache) => {
                    cache.put(request, responseToCache).catch((err) => {
                        console.warn(request.url + ': ' + err.message);
                    });
                });

                return response;
            }).catch(() => {
                // If fetching from network fails (i.e., offline), respond with offline page
                return caches.match('./offline.html');
            });
        })
    );
});

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', (event) => {
  console.info('Event: Activate');

  //Remove old and unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== "static-cache") {     //cacheName = 'cache-v1'
            return caches.delete(cache); //Deleting the cache
          }
        })
      );
    })
  );
});

