import { Marker } from "@react-google-maps/api";
import Cookies from "js-cookie";
import { getFirestore } from "firebase/firestore";

import { isPlaceSaved } from "services/databaseService";

import { TGooglePlace } from "shared/types/types";

import { useDrawer } from "hooks/useDrawer";
import { useMapData } from "hooks/useMapData";

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

  const { setDirections, setIsSaved } = useMapData();

  const handleMarkerClick = (placeId: string) => async () => {
    const db = getFirestore();
    const email = Cookies.get("email");

    if (!email) {
      console.error("Email не найден");
    } else {
      setIsSaved(await isPlaceSaved(db, email, placeId));
    }

    setDirections(undefined);
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
