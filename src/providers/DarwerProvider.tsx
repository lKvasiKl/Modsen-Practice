import { createContext, useState } from "react";

import { IProviderProps } from "shared/interface/interface";

export const DrawerContext = createContext<{
  isOpen: boolean;
  isSearchDrawer: boolean;
  isFavoriteDrawer: boolean;
  infoPlaceCardId: string;
  isLoading: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSerchDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setFavoriteDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoPlaceCardId: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: false,
  isSearchDrawer: false,
  isFavoriteDrawer: false,
  infoPlaceCardId: "",
  isLoading: true,
  setOpen: () => undefined,
  setSerchDrawer: () => undefined,
  setFavoriteDrawer: () => undefined,
  setInfoPlaceCardId: () => undefined,
  setLoading: () => undefined,
});

const DrawerProvider = ({ children }: IProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isSearchDrawer, setSerchDrawer] = useState<boolean>(false);
  const [isFavoriteDrawer, setFavoriteDrawer] = useState<boolean>(false);
  const [infoPlaceCardId, setInfoPlaceCardId] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);

  const value = {
    isOpen,
    isSearchDrawer,
    isFavoriteDrawer,
    infoPlaceCardId,
    isLoading,
    setOpen,
    setSerchDrawer,
    setFavoriteDrawer,
    setInfoPlaceCardId,
    setLoading,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerProvider;
