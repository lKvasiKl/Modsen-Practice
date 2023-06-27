import { useContext } from "react";

import { DrawerContext } from "providers/DarwerProvider";

const useDrawer = () => {
  return useContext(DrawerContext);
};

export { useDrawer };
