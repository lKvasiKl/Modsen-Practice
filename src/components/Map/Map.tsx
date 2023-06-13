import { useCallback, useRef, useEffect, useState } from "react";
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { TGoogleMap, TGooglePlace, TLatLngLiterals } from "shared/types";
import {
  CIRCLE_RADIUS_SMALL,
  DEFAULT_ZOOM,
  LARGE_CIRCLE_OPTIONS,
  MAP_OPTIONS,
  SMALL_CIRCLE_OPTIONS,
} from "../../constants/mapConstants";
import PlaceMarkers from "components/PlaceMarkers/PlaceMarkers";
import getCurrentPosition from "services/locationService";
import getPlaces from "services/placesServise";
import useInterval from "hooks/useInterval";
import markerIcon from "../../assets/icons/marker.svg";

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

  useEffect(() => {
    const fetchData = async () => {
      const { lat, lng } = await getCurrentPosition();
      const initialPlaces = await getPlaces({ lat, lng }, 1000, pageToken);

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
      zoom={DEFAULT_ZOOM}
      center={position}
      mapContainerClassName={styles.mapContainer}
      options={MAP_OPTIONS}
      onLoad={onLoad}
    >
      {position && (
        <>
          <Marker position={position} icon={markerIcon} />
          <PlaceMarkers places={places} />
          <Circle
            center={position}
            radius={CIRCLE_RADIUS_SMALL}
            options={SMALL_CIRCLE_OPTIONS}
          />
          <Circle
            center={position}
            radius={1000}
            options={LARGE_CIRCLE_OPTIONS}
          />
        </>
      )}
    </GoogleMap>
  );
};

export default Map;
