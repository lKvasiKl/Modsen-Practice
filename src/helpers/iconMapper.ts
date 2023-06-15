import lodgingIcon from "../assets/icons/lodging.svg";
import adultIcon from "../assets/icons/18+.svg";
import carIcon from "../assets/icons/car.svg";
import cultureIcon from "../assets/icons/culture.svg";
import shopIcon from "../assets/icons/shop.svg";
import foodIcon from "../assets/icons/food.svg";
import industryIcon from "../assets/icons/industry.svg";
import financeIcon from "../assets/icons/bank.svg";
import entertainmentIcon from "../assets/icons/entertainments.svg";
import cofeeIcon from "../assets/icons/coffee.svg";
import bicycleIcon from "../assets/icons/bicycle.svg";
import religionIcon from "../assets/icons/religion.svg";
import gasStationIcon from "../assets/icons/gas_station.svg";
import natureIcon from "../assets/icons/nature.svg";
import sportIcon from "../assets/icons/football.svg";
import touristIcon from "../assets/icons/history.svg";
import defaultIcon from "../assets/icons/other.svg";

interface IconMap {
  [key: string]: string;
}

const typeToIconMap: IconMap = {
  lodging: lodgingIcon,

  night_club: adultIcon,
  casino: adultIcon,
  bar: adultIcon,

  car_dealer: carIcon,
  car_repair: carIcon,
  car_rental: carIcon,
  car_wash: carIcon,
  parking: carIcon,
  taxi_stand: carIcon,

  gas_station: gasStationIcon,

  university: cultureIcon,
  primary_school: cultureIcon,
  art_gallery: cultureIcon,
  city_hall: cultureIcon,
  library: cultureIcon,
  movie_theater: cultureIcon,
  museum: cultureIcon,
  painter: cultureIcon,
  school: cultureIcon,
  secondary_school: cultureIcon,

  supermarket: shopIcon,
  grocery_or_supermarket: shopIcon,
  furniture_store: shopIcon,
  department_store: shopIcon,
  shopping_mall: shopIcon,
  store: shopIcon,
  pet_store: shopIcon,
  clothing_store: shopIcon,
  shoe_store: shopIcon,
  convenience_store: shopIcon,
  book_store: shopIcon,
  home_goods_store: shopIcon,
  jewelry_store: shopIcon,
  hardware_store: shopIcon,
  liquor_store: shopIcon,

  meal_takeaway: foodIcon,
  meal_delivery: foodIcon,
  restaurant: foodIcon,
  food: foodIcon,

  train_station: industryIcon,
  transit_station: industryIcon,
  light_rail_station: industryIcon,

  bank: financeIcon,
  finance: financeIcon,
  accounting: financeIcon,
  atm: financeIcon,

  amusement_park: entertainmentIcon,
  bowling_alley: entertainmentIcon,

  bakery: cofeeIcon,
  cafe: cofeeIcon,

  bicycle_store: bicycleIcon,

  cemetery: religionIcon,
  church: religionIcon,
  hindu_temple: religionIcon,
  mosque: religionIcon,
  synagogue: religionIcon,

  park: natureIcon,

  gym: sportIcon,
  stadium: sportIcon,

  tourist_attraction: touristIcon,
};

const getMarkerIcon = (type: string) => {
  const icon = typeToIconMap[type];

  return icon ? icon : defaultIcon;
};

export default getMarkerIcon;
