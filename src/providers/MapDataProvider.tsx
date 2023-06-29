import { createContext, useState } from "react";

import { IProviderProps } from "shared/interface/interface";
import {
  TGooglePlace,
  TLatLngLiterals,
  TDirectionResult,
} from "shared/types/types";

import { DEFAULT_LAT, DEFAULT_LNG } from "constants/mapConstants/config";

export const MapDataContext = createContext<{
  position: TLatLngLiterals;
  radius: number;
  places: TGooglePlace[];
  pageToken: string | undefined;
  directions: TDirectionResult | undefined;
  isSaved: boolean;
  setPosition: React.Dispatch<React.SetStateAction<TLatLngLiterals>>;
  setPlaces: React.Dispatch<React.SetStateAction<TGooglePlace[]>>;
  setPageToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  setDirections: React.Dispatch<
    React.SetStateAction<TDirectionResult | undefined>
  >;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  position: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  radius: 1,
  places: [],
  pageToken: undefined,
  directions: undefined,
  isSaved: false,
  setPosition: () => undefined,
  setPlaces: () => undefined,
  setPageToken: () => undefined,
  setRadius: () => undefined,
  setDirections: () => undefined,
  setIsSaved: () => undefined,
});

const MapDataProvider = ({ children }: IProviderProps) => {
  const [position, setPosition] = useState<TLatLngLiterals>({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  const [places, setPlaces] = useState<TGooglePlace[]>([]);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);
  const [radius, setRadius] = useState<number>(1);
  const [directions, setDirections] = useState<TDirectionResult | undefined>(
    undefined,
  );
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const value = {
    radius,
    position,
    places,
    pageToken,
    directions,
    isSaved,
    setPosition,
    setPlaces,
    setPageToken,
    setRadius,
    setDirections,
    setIsSaved,
  };

  return (
    <MapDataContext.Provider value={value}>{children}</MapDataContext.Provider>
  );
};

export default MapDataProvider;
