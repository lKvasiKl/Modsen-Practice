/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputBase } from "@mui/material";

import PlaceCard from "components/PlaceCard/PlaceCard";
import RouteCard from "components/RouteCard/RouteCard";
import SearchSettings from "components/SearchSettings/SearchSettings";
import PlaceDescription from "components/PlaceDescription/PlaceDescription";
import SearchInput from "components/SearchInput/SearchInput";

import { TGooglePlace, TLatLngLiterals } from "shared/types/types";

import { useAuth } from "hooks/useAuth";
import { useDrawer } from "hooks/useDrawer";

import getMarkerIcon from "helpers/iconMapper";
import { getCacheItem } from "helpers/cache";
import { getImageUrl } from "helpers/imageUrlConstructor";

import { ArrowLIcon, ArrowRIcon, SearchIcon } from "assets/icons";

import styles from "./AppDrawer.module.scss";
import { StyledBox, StyledButton } from "./styles";

const AppDrawer = () => {
  const { isAuth } = useAuth();
  const {
    isOpen,
    isSearchDrawer,
    isFavoriteDrawer,
    infoPlaceCardId,
    setOpen,
    setSerchDrawer,
    setFavoriteDrawer,
  } = useDrawer();

  const handleOpen = () => {
    setOpen((prevState) => !prevState);
    isSearchDrawer && setSerchDrawer((prevState) => !prevState);
    isFavoriteDrawer && setFavoriteDrawer((prevState) => !prevState);
  };

  return (
    <div className={`${styles.container}`}>
      <StyledBox className={isOpen ? styles.open : styles.containerClosed}>
        <SearchInput placeholder="Место, адрес.." />
        <span className={styles.title}>
          {isSearchDrawer && "Искать:"}
          {isFavoriteDrawer && "Избранное:"}
        </span>
        <div className={styles.contentContainer}>
          {isAuth && isFavoriteDrawer ? (
            //TODO: Get and mup fav places from firebase store
            <PlaceCard
              description={
                <PlaceDescription
                  address={getCacheItem(infoPlaceCardId).address}
                  raiting={getCacheItem(infoPlaceCardId).rating}
                />
              }
              icon={getMarkerIcon(getCacheItem(infoPlaceCardId).type)}
              image={getImageUrl(
                getCacheItem(infoPlaceCardId).photoUrlReference,
                150,
                130,
              )}
              name={getCacheItem(infoPlaceCardId).name}
            />
          ) : (
            <span
              className={isFavoriteDrawer ? styles.showText : styles.hideText}
            >
              Чтобы сохронять и просматривать список избранного необходимо
              авторизоваться
            </span>
          )}
          {infoPlaceCardId && (
            <PlaceCard
              description={
                <PlaceDescription
                  address={getCacheItem(infoPlaceCardId).address}
                  isOpen={getCacheItem(infoPlaceCardId).isOpen}
                  raiting={getCacheItem(infoPlaceCardId).rating}
                  schedule={getCacheItem(infoPlaceCardId).schedule}
                  website={getCacheItem(infoPlaceCardId).website}
                />
              }
              icon={getMarkerIcon(getCacheItem(infoPlaceCardId).type)}
              image={getImageUrl(
                getCacheItem(infoPlaceCardId).photoUrlReference,
                400,
                300,
              )}
              name={getCacheItem(infoPlaceCardId).name}
              type="info"
            />
          )}
          {/* <RouteCard distance="1,1" time="40" /> */}
          {isSearchDrawer && <SearchSettings />}
        </div>
      </StyledBox>
      <StyledButton
        className={isOpen ? styles.open : styles.buttonClosed}
        onClick={handleOpen}
      >
        {isOpen ? <ArrowLIcon /> : <ArrowRIcon />}
      </StyledButton>
    </div>
  );
};

export default AppDrawer;
