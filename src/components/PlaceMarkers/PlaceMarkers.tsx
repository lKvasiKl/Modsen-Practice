import { TGooglePlace } from "shared/types";
import { Marker } from "@react-google-maps/api";
import getMarkerIcon from "helpers/iconMapper";

interface PlaceMarkersProps {
  places: TGooglePlace[];
}

const PlaceMarkers = ({ places }: PlaceMarkersProps) => (
  <>
    {places
      ?.filter(
        (place) =>
          !place.types.includes("locality") &&
          !place.types.includes("political")
      )
      .map((place) => (
        <Marker
          key={place?.place_id}
          position={place?.geometry.location}
          icon={getMarkerIcon(place?.types[0])}
        />
      ))}
  </>
);

export default PlaceMarkers;
