import { IRequestParams, TLatLngLiterals, TGooglePlace } from "shared/types";
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

  let allResults: TGooglePlace[] = [];

  try {
    let pageToken: string | undefined = undefined;

    do {
      if (pageToken) {
        options.params = options.params || {};
        options.params.pagetoken = pageToken;
      }

      const response = await request(options);

      console.log(response);

      allResults = allResults.concat(response.results);
      pageToken = response.next_page_token;

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } while (pageToken);

    return allResults;
  } catch (error) {
    throw error;
  }
};

export default getPlaces;
