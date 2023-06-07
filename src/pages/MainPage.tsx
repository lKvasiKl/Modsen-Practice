import { useLoadScript } from "@react-google-maps/api";
import Map from "components/Map/Map";

const MainPage = () => {
  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <div>LOADING...</div>;
  }

  return <Map />;
};

export default MainPage;
