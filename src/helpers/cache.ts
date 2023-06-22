const getCache = (cacheKey: string) => {
  const cacheItem = localStorage.getItem(cacheKey);
  return cacheItem ? JSON.parse(cacheItem) : {};
};

const saveCache = (cahceKey: string, cache: object) => {
  localStorage.setItem(cahceKey, JSON.stringify(cache));
};

// function isCacheValid(cache: object) {
//   return cache.expirationDate > new Date().getTime();
// }

export { getCache, saveCache };
