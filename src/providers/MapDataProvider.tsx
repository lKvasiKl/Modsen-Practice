import { createContext, useState } from "react";

import { IProviderProps } from "shared/interface/interface";
import { TGooglePlace, TLatLngLiterals } from "shared/types/types";

import { DEFAULT_LAT, DEFAULT_LNG } from "constants/mapConstants/config";

export const MapDataContext = createContext<{
  position: TLatLngLiterals;
  radius: number;
  places: TGooglePlace[];
  pageToken: string | undefined;
  setPosition: React.Dispatch<React.SetStateAction<TLatLngLiterals>>;
  setPlaces: React.Dispatch<React.SetStateAction<TGooglePlace[]>>;
  setPageToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}>({
  position: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  radius: 1,
  places: [],
  pageToken: undefined,
  setPosition: () => undefined,
  setPlaces: () => undefined,
  setPageToken: () => undefined,
  setRadius: () => undefined,
});

const MapDataProvider = ({ children }: IProviderProps) => {
  const [position, setPosition] = useState<TLatLngLiterals>({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  const [places, setPlaces] = useState<TGooglePlace[]>([]);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [radius, setRadius] = useState<number>(1);

  const value = {
    radius,
    position,
    places,
    pageToken,
    setPosition,
    setPlaces,
    setPageToken,
    setRadius,
  };

  return (
    <MapDataContext.Provider value={value}>{children}</MapDataContext.Provider>
  );
};

export default MapDataProvider;
