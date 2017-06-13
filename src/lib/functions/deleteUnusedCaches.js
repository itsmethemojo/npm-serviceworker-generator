function deleteUnusedCaches(event, cacheIds) {
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (-1 === cacheIds.indexOf(key)) {
					return caches.delete(key);
				}
			}));
		})
	);
}
