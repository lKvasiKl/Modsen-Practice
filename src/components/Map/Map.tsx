import { useCallback, useMemo, useRef } from "react";

import styles from "./Map.module.scss";
import { GoogleMap } from "@react-google-maps/api";

type TMapOptions = google.maps.MapOptions;
type TGoogleMap = google.maps.Map;

const Map = () => {
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

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 43, lng: -80 }}
      mapContainerClassName={styles.mapContainer}
      options={options}
      onLoad={onLoad}
    ></GoogleMap>
  );
};

export default Map;
