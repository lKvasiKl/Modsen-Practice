import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import getCurrentPosition from "services/locationService";

import styles from "./Map.module.scss";

type TMapOptions = google.maps.MapOptions;
type TGoogleMap = google.maps.Map;
type TLatLngLiterals = google.maps.LatLngLiteral;

const Map = () => {
  const [position, setPosition] = useState<TLatLngLiterals>({
    lat: 40,
    lng: 81,
  });
  const mapRef = useRef<TGoogleMap>();
  const options = useMemo<TMapOptions>(
    () => ({
      disableDefaultUI: true,
    }),
    []
  );
  const onLoad = useCallback((map: TGoogleMap) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { lat, lng }: TLatLngLiterals = await getCurrentPosition();
      setPosition({ lat, lng });
    };

    fetchData();
  }, []);

  return (
    <GoogleMap
      zoom={10}
      center={position}
      mapContainerClassName={styles.mapContainer}
      options={options}
      onLoad={onLoad}
    ></GoogleMap>
  );
};

export default Map;
