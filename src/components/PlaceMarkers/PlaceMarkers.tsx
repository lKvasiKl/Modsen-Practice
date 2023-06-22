import { Marker } from "@react-google-maps/api";

import { TGooglePlace } from "shared/types";

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
        icon={getMarkerIcon(place.types?.[0])}
        key={place.place_id}
        position={place.geometry?.location}
      />
    ));
};

const PlaceMarkers = ({ places }: PlaceMarkersProps) => (
  <>{renderMarkers(places)}</>
);

export default PlaceMarkers;
