const getCache = (cacheKey: string) => {
  const cacheItem = localStorage.getItem(cacheKey);
  return cacheItem ? JSON.parse(cacheItem) : {};
};

const getCacheItem = (itemKey: string) => {
  return getCache("placesCache")[itemKey];
};

const saveCache = (cahceKey: string, cache: object) => {
  localStorage.setItem(cahceKey, JSON.stringify(cache));
};

export { getCache, getCacheItem, saveCache };
