function putInCacheOnceAndDeliverOnlyFromCacheThen(event, cacheId){
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request.clone()).then(
          function (response) {
            var responseClone = response.clone();
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            caches.open(cacheId).then(function (cache) {
              cache.put(event.request, responseClone);
    	      });
           return response;
         }
       );
    })
  );
}
