import { useLoadScript } from "@react-google-maps/api";
import Map from "components/Map/Map";

const MainPage = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${apiKey}`,
  });

  if (!isLoaded) {
    return <div>LOADING...</div>;
  }

  return <Map />;
};

export default MainPage;
