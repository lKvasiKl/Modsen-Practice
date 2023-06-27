import { Marker } from "@react-google-maps/api";

import getPlaceDetail from "services/placeDetailsService";

import { TGooglePlace } from "shared/types/types";

import { useDrawer } from "hooks/useDrawer";

import getMarkerIcon from "helpers/iconMapper";
import { getCache, saveCache } from "helpers/cache";
import filterPlaces from "helpers/placesFilter";

interface IPlaceMarkersProps {
  places: TGooglePlace[];
}

const PlaceMarkers = ({ places }: IPlaceMarkersProps) => {
  const {
    isSearchDrawer,
    isFavoriteDrawer,
    setOpen,
    setSerchDrawer,
    setFavoriteDrawer,
    setInfoPlaceCardId,
  } = useDrawer();

  const handleMarkerClick = async (placeId: string) => {
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

    const cache = getCache("placesCache");
    const cacheEntry = cache[placeId];

    if (!cacheEntry) {
      const place = await getPlaceDetail(placeId);
      cache[placeId] = place;
      saveCache("placesCache", cache);
    }

    setOpen(true);
    setInfoPlaceCardId(placeId);
    isSearchDrawer && setSerchDrawer(false);
    isFavoriteDrawer && setFavoriteDrawer(false);
  };

  const renderMarkers = (places: TGooglePlace[]) => {
    return places
      .filter(filterPlaces)
      .map((place) => (
        <Marker
          icon={getMarkerIcon(place.types?.[0])}
          key={place.place_id}
          position={place.geometry?.location}
          onClick={() => handleMarkerClick(place.place_id)}
        />
      ));
  };

  return <>{renderMarkers(places)}</>;
};

export default PlaceMarkers;
