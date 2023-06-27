import { useCallback, useRef, useEffect, useState } from "react";
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";

import getCurrentPosition from "services/locationService";
import getPlaces from "services/placesServise";

import PlaceMarkers from "components/PlaceMarkers/PlaceMarkers";

import { TGoogleMap, TGooglePlace, TLatLngLiterals } from "shared/types/types";

import useInterval from "hooks/useInterval";

import {
  CIRCLE_RADIUS_SMALL,
  DEFAULT_ZOOM,
  LARGE_CIRCLE_OPTIONS,
  MAP_OPTIONS,
  SMALL_CIRCLE_OPTIONS,
} from "constants/mapConstants/config";

import markerIcon from "assets/icons/marker.svg";

import styles from "./Map.module.scss";

const Map = () => {
  const [position, setPosition] = useState<TLatLngLiterals>({
    lat: 48,
    lng: -23,
  });
  const [places, setPlaces] = useState<TGooglePlace[]>([]);
  const [pageToken, setPageToken] = useState<string | undefined>(undefined);

  const mapRef = useRef<TGoogleMap>();
  const onLoad = useCallback((map: TGoogleMap) => {
    mapRef.current = map;
  }, []);
  const onUnmount = useCallback(() => {
    mapRef.current = undefined;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { lat, lng } = await getCurrentPosition();
      const initialPlaces = await getPlaces({ lat, lng }, 1000);

      setPosition({ lat, lng });
      setPlaces(initialPlaces.results);
      setPageToken(initialPlaces.next_page_token);
    };

    fetchData();
  }, []);

  useInterval(async () => {
    if (pageToken) {
      const nextPlaces = await getPlaces(position, 1000, pageToken);
      setPlaces((prevPlaces) => [...prevPlaces, ...nextPlaces.results]);
      setPageToken(nextPlaces.next_page_token);
    }
  }, 2000);

  return (
    <GoogleMap
      center={position}
      mapContainerClassName={styles.mapContainer}
      options={MAP_OPTIONS}
      zoom={DEFAULT_ZOOM}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {position && (
        <>
          <Marker icon={markerIcon} position={position} />
          <PlaceMarkers places={places} />
          <Circle
            center={position}
            options={SMALL_CIRCLE_OPTIONS}
            radius={CIRCLE_RADIUS_SMALL}
          />
          <Circle
            center={position}
            options={LARGE_CIRCLE_OPTIONS}
            radius={1000}
          />
        </>
      )}
    </GoogleMap>
  );
};

export default Map;
