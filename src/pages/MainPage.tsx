import { useLoadScript } from "@react-google-maps/api";
import Map from "components/Map/Map";
import AppBarMenu from "components/AppBarMenu/AppBarMenu";

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
      <Map />
    </>
  );
};

export default MainPage;
