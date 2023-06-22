const getCache = (cacheKey: string) => {
  const cacheItem = localStorage.getItem(cacheKey);
  return cacheItem ? JSON.parse(cacheItem) : {};
};

const saveCache = (cahceKey: string, cache: object) => {
  localStorage.setItem(cahceKey, JSON.stringify(cache));
};

export { getCache, saveCache };
