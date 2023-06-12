type THttpMethod = "POST" | "GET";

export type TGoogleMap = google.maps.Map;
export type TLatLngLiterals = google.maps.LatLngLiteral;
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

export interface IRequestParams {
  headers?: Record<string, string>;
  method: THttpMethod;
  url: string;
  data?: any;
  params?: Record<string, string>;
}
