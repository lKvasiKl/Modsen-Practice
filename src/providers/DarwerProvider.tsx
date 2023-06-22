import { createContext, useState } from "react";

interface IDrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerContext = createContext<{
  isOpen: boolean;
  isSearchDrawer: boolean;
  isFavoriteDrawer: boolean;
  setOpen: (isOpen: boolean) => void;
  setSerchDrawer: (isSearchDrawer: boolean) => void;
  setFavoriteDrawer: (isFavoriteDrawer: boolean) => void;
}>({
  isOpen: false,
  isSearchDrawer: false,
  isFavoriteDrawer: false,
  setOpen: () => undefined,
  setSerchDrawer: () => undefined,
  setFavoriteDrawer: () => undefined,
});

const DrawerProvider = ({ children }: IDrawerProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isSearchDrawer, setSerchDrawer] = useState<boolean>(false);
  const [isFavoriteDrawer, setFavoriteDrawer] = useState<boolean>(false);

  const value = {
    isOpen,
    isSearchDrawer,
    isFavoriteDrawer,
    setOpen,
    setSerchDrawer,
    setFavoriteDrawer,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerProvider;
