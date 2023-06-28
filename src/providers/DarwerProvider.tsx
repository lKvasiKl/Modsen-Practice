import { createContext, useState } from "react";

import { IProviderProps } from "shared/interface/interface";

export const DrawerContext = createContext<{
  isOpen: boolean;
  isSearchDrawer: boolean;
  isFavoriteDrawer: boolean;
  infoPlaceCardId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSerchDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setFavoriteDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoPlaceCardId: React.Dispatch<React.SetStateAction<string>>;
}>({
  isOpen: false,
  isSearchDrawer: false,
  isFavoriteDrawer: false,
  infoPlaceCardId: "",
  setOpen: () => undefined,
  setSerchDrawer: () => undefined,
  setFavoriteDrawer: () => undefined,
  setInfoPlaceCardId: () => undefined,
});

const DrawerProvider = ({ children }: IProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isSearchDrawer, setSerchDrawer] = useState<boolean>(false);
  const [isFavoriteDrawer, setFavoriteDrawer] = useState<boolean>(false);
  const [infoPlaceCardId, setInfoPlaceCardId] = useState<string>("");

  const value = {
    isOpen,
    isSearchDrawer,
    isFavoriteDrawer,
    infoPlaceCardId,
    setOpen,
    setSerchDrawer,
    setFavoriteDrawer,
    setInfoPlaceCardId,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerProvider;
