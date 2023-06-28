interface IconMap {
  [key: string]: string;
}

const nameToTypeMap: IconMap = {
  "Место для сна": "lodging",
  "18+": "bar",
  Авто: "parking",
  Культура: "museum",
  Магазин: "supermarket",
  Еда: "food",
  "Индустриальные объекты": "train_station",
  Банки: "bank",
  Развлечения: "amusement_park",
  "Кофе/чай": "cafe",
  Велосипеды: "bicycle_store",
  Религия: "church",
  Заправки: "gas_station",
  Природа: "park",
  Спорт: "gym",
  История: "tourist_attraction",
  Разное: "place_of_interest",
};

const getPlaceType = (type: string): string => {
  return nameToTypeMap[type];
};

export default getPlaceType;
