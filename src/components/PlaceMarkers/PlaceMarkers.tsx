import { TGooglePlace } from "shared/types";
import { Marker } from "@react-google-maps/api";
import getMarkerIcon from "helpers/iconMapper";

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

const renderMarkers = (places: TGooglePlace[]) => {
  return places
    .filter(filterPlaces)
    .map((place) => (
      <Marker
        key={place.place_id}
        position={place.geometry?.location}
        icon={getMarkerIcon(place.types?.[0])}
      />
    ));
};

const PlaceMarkers = ({ places }: PlaceMarkersProps) => (
  <>{renderMarkers(places)}</>
);

export default PlaceMarkers;
