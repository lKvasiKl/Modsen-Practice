export type TGoogleMap = google.maps.Map;
export type TLatLngLiterals = google.maps.LatLngLiteral;
export type TDirectionResult = google.maps.DirectionsResult;
export type TGooglePlace = {
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
};
