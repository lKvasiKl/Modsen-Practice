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
  data?: unknown;
  params?: Record<string, string>;
}

export interface IAppButtonProps {
  children: React.ReactNode;
  color: "primary" | "secondary";
}

export interface IPlaceCardProps {
  image?: string;
  icon?: string;
  name: string;
  description: string;
}
