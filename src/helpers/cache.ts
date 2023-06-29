import getPlaceDetail from "services/placeDetailsService";

const getCache = (cacheKey: string) => {
  const cacheItem = localStorage.getItem(cacheKey);
  return cacheItem ? JSON.parse(cacheItem) : {};
};

const setCacheItem = async (cacheKey: string, itemKey: string) => {
  updateLastVisitDateAndCache();

  const cache = getCache(cacheKey);
  const cacheEntry = cache[itemKey];

  if (!cacheEntry) {
    const place = await getPlaceDetail(itemKey);
    cache[itemKey] = place;
    saveCache(cacheKey, cache);
  }
};

const getCacheItem = (itemKey: string) => {
  return getCache("placesCache")[itemKey];
};

const saveCache = (cahceKey: string, cache: object) => {
  localStorage.setItem(cahceKey, JSON.stringify(cache));
};

const updateLastVisitDateAndCache = () => {
  const lastVisitDate = localStorage.getItem("lastVisitDate");
  const date = new Date();
  const currentDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

  if (!lastVisitDate) {
    localStorage.setItem("lastVisitDate", currentDate);
  }

  if (lastVisitDate && lastVisitDate < currentDate) {
    localStorage.setItem("lastVisitDate", currentDate);
    localStorage.removeItem("placesCache");
  }
};

export { getCache, setCacheItem, getCacheItem, saveCache };
