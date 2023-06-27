import { useLoadScript } from "@react-google-maps/api";

import DrawerProvider from "providers/DarwerProvider";

import Map from "components/Map/Map";
import AppBarMenu from "components/AppBarMenu/AppBarMenu";
import PinLoader from "components/PinLoader/PinLoader";

const MainPage = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${apiKey}`,
  });

  if (!isLoaded) {
    return <PinLoader />;
  }

  return (
    <DrawerProvider>
      <AppBarMenu />
      <Map />
    </DrawerProvider>
  );
};

export default MainPage;
