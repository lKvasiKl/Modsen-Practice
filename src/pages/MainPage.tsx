import { useLoadScript } from "@react-google-maps/api";
import Map from "components/Map/Map";
import AppBarMenu from "components/AppBarMenu/AppBarMenu";
import AppDrawer from "components/AppDrawer/AppDrawer";

const MainPage = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${apiKey}`,
  });

  if (!isLoaded) {
    return <div>LOADING...</div>;
  }

  return (
    <>
      <AppBarMenu />
      <AppDrawer title="Искать:" />
      <Map />
    </>
  );
};

export default MainPage;
