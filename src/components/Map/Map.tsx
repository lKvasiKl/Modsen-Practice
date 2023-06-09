import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { TGoogleMap, TGooglePlace, TLatLngLiterals } from "shared/types";
import getCurrentPosition from "services/locationService";
import markerIcon from "../../assets/icons/Marker.svg";

import styles from "./Map.module.scss";
import getPlaces from "services/placesServise";

type TMapOptions = google.maps.MapOptions;

const circleOptions = {
  strokeWeight: 0,
  fillColor: "#5E7BC733",
};

const Map = () => {
  const [position, setPosition] = useState<TLatLngLiterals>();
  const [places, setPlaces] = useState<TGooglePlace[]>();
  const mapRef = useRef<TGoogleMap>();
  const options = useMemo<TMapOptions>(
    () => ({
      disableDefaultUI: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );
  const onLoad = useCallback((map: TGoogleMap) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { lat, lng } = await getCurrentPosition();
      const places = await getPlaces({ lat, lng }, 5000);

      setPosition({ lat, lng });
      setPlaces(places);
    };

    fetchData();
  }, []);

  return (
    <GoogleMap
      zoom={15}
      center={position}
      mapContainerClassName={styles.mapContainer}
      options={options}
      onLoad={onLoad}
    >
      {position && (
        <>
          <Marker position={position} icon={markerIcon} />
          <Circle center={position} radius={200} options={circleOptions} />

          {places?.map((place) => (
            <Marker position={place.geometry?.location} icon={place?.icon} />
          ))}
        </>
      )}
    </GoogleMap>
  );
};

export default Map;
