import { TLatLngLiterals } from "shared/types/types";
import { IRequestParams } from "shared/interface/interface";

import { request } from "./axiosService";

const getCurrentPosition = async (): Promise<TLatLngLiterals> => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const url = process.env.REACT_APP_GOOGLE_GEOLOCATION_URL;

  const options: IRequestParams = {
    method: "POST",
    url: `${url}`,
    params: {
      key: `${apiKey}`,
    },
  };

  const response = await request(options);
  const { lat, lng } = response.location;

  return { lat, lng };
};

export default getCurrentPosition;
