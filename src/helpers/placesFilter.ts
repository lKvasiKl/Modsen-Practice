import { TGooglePlace } from "shared/types/types";

const filterPlaces = (place: TGooglePlace) => {
  return (
    place &&
    place.types &&
    !place.types.includes("locality") &&
    !place.types.includes("political")
  );
};

export default filterPlaces;
