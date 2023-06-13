import { IRequestParams, TLatLngLiterals, TGooglePlace } from "shared/types";
import { request } from "./axiosService";

const getPlaces = async (
  position: TLatLngLiterals,
  radius: number,
  pageToken: string | undefined
) => {
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

  if (pageToken) {
    options.params = options.params || {};
    options.params.pagetoken = pageToken;
  }

  const response = await request(options);

  console.log(response);

  return response;
};

export default getPlaces;
