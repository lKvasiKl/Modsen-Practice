import { Marker } from "@react-google-maps/api";

import getPlaceDetail from "services/placeDetailsService";

import { TGooglePlace } from "shared/types";

import { useDrawer } from "hooks/useDrawer";

import getMarkerIcon from "helpers/iconMapper";
import { getCache, saveCache } from "helpers/cache";

interface PlaceMarkersProps {
  places: TGooglePlace[];
}

const filterPlaces = (place: TGooglePlace) => {
  return (
    place &&
    place.types &&
    !place.types.includes("locality") &&
    !place.types.includes("political")
  );
};

const PlaceMarkers = ({ places }: PlaceMarkersProps) => {
  const { isOpen, setOpen } = useDrawer();

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

    !isOpen && setOpen(true);
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
