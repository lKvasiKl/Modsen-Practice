import { useContext } from "react";

import { MapDataContext } from "providers/MapDataProvider";

const useMapData = () => {
  return useContext(MapDataContext);
};

export { useMapData };
