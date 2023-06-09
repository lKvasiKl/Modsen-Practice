import { IRequestParams } from "shared/interface/interface";

import { request } from "./axiosService";

const getPlaceDetail = async (place_id: string) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const url = process.env.REACT_APP_GOOGLE_PLACES_DETAILS_URL;

  const options: IRequestParams = {
    method: "GET",
    url: `${url}`,
    params: {
      place_id: place_id,
      key: `${apiKey}`,
    },
  };

  const data = await request(options);

  return {
    placeId: place_id,
    position: data.result.geometry.location,
    photoUrlReference: data.result.photos?.[0].photo_reference,
    type: data.result.types[0],
    name: data.result.name,
    rating: data.result.rating,
    userRatingsTotal: data.result.user_ratings_total,
    address: data.result.formatted_address,
    isOpen: data.result.current_opening_hours?.open_now,
    schedule: data.result.current_opening_hours?.weekday_text,
    website: data.result?.website,
  };
};

export default getPlaceDetail;
