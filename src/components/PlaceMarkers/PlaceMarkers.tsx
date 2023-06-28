import { Marker } from "@react-google-maps/api";

import { TGooglePlace } from "shared/types/types";

import { useDrawer } from "hooks/useDrawer";

import getMarkerIcon from "helpers/iconMapper";
import { setCacheItem } from "helpers/cache";
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

  const handleMarkerClick = (placeId: string) => async () => {
    await setCacheItem("placesCache", placeId);

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
          onClick={handleMarkerClick(place.place_id)}
        />
      ));
  };

  return <>{renderMarkers(places)}</>;
};

export default PlaceMarkers;
