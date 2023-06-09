type THttpMethod = "POST" | "GET";

export type TGoogleMap = google.maps.Map;
export type TLatLngLiterals = google.maps.LatLngLiteral;
export type TGooglePlace = {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  icon: string;
};

export interface IRequestParams {
  headers?: Record<string, string>;
  method: THttpMethod;
  url: string;
  data?: any;
  params?: Record<string, string>;
}
