import { IRequestParams, TLatLngLiterals } from "shared/types";
import { request } from "./axiosService";

const getPlaces = async (position: TLatLngLiterals, radius: number) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const url = process.env.REACT_APP_GOOGLE_PLACES_URL;

  const options: IRequestParams = {
    method: "GET",
    url: `${url}`,
    params: {
      location: `${position.lat},${position.lng}`,
      radius: `${radius}`,
      key: `${apiKey}`,
    },
  };

  try {
    const response = await request(options);
    console.log(response);

    const allResults = response.results;

    console.log(allResults);

    return allResults;
  } catch (error) {
    throw error;
  }
};

export default getPlaces;
