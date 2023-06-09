import { useLoadScript } from "@react-google-maps/api";

import DrawerProvider from "providers/DarwerProvider";
import MapDataProvider from "providers/MapDataProvider";

import Map from "components/Map/Map";
import AppBarMenu from "components/AppBarMenu/AppBarMenu";
import PinLoader from "components/PinLoader/PinLoader";

import { LIBRARIES } from "constants/mapConstants/config";

const MainPage = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${apiKey}`,
    libraries: LIBRARIES,
  });

  if (!isLoaded) {
    return <PinLoader />;
  }

  return (
    <DrawerProvider>
      <MapDataProvider>
        <AppBarMenu />
        <Map />
      </MapDataProvider>
    </DrawerProvider>
  );
};

export default MainPage;
