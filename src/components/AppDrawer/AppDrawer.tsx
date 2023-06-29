import { getFirestore } from "firebase/firestore";
import Cookies from "js-cookie";

import {
  deleteItem,
  getCollection,
  isPlaceSaved,
} from "services/databaseService";

import PlaceCard from "components/PlaceCard/PlaceCard";
import RouteCard from "components/RouteCard/RouteCard";
import SearchSettings from "components/SearchSettings/SearchSettings";
import PlaceDescription from "components/PlaceDescription/PlaceDescription";
import SearchInput from "components/SearchInput/SearchInput";
import PinLoader from "components/PinLoader/PinLoader";

import { useAuth } from "hooks/useAuth";
import { useDrawer } from "hooks/useDrawer";
import { useMapData } from "hooks/useMapData";

import getMarkerIcon from "helpers/iconMapper";
import { getCacheItem, setCacheItem } from "helpers/cache";
import { getImageUrl } from "helpers/imageUrlConstructor";

import { ArrowLIcon, ArrowRIcon } from "assets/icons";

import styles from "./AppDrawer.module.scss";
import { StyledBox, StyledButton } from "./styles";

interface IPlaceProps {
  address: string | undefined;
  rating: string | undefined;
  userRatingsTotal: string | undefined;
  type: string;
  photoUrlReference: string | undefined;
  placeId: string;
  name: string;
}

const AppDrawer = () => {
  const { isAuth } = useAuth();
  const {
    isOpen,
    isSearchDrawer,
    isFavoriteDrawer,
    infoPlaceCardId,
    isLoading,
    setOpen,
    setSerchDrawer,
    setFavoriteDrawer,
    setLoading,
    setInfoPlaceCardId,
  } = useDrawer();

  const { directions, favoritePlaces, setFavoritePlaces, setIsSaved } =
    useMapData();

  const handleOpen = () => {
    setOpen((prevState) => !prevState);
    isSearchDrawer && setSerchDrawer((prevState) => !prevState);
    isFavoriteDrawer && setFavoriteDrawer((prevState) => !prevState);
  };

  const handleRemoveFavorite = (placeId: string) => async () => {
    const db = getFirestore();
    const email = Cookies.get("email");

    if (email && placeId) {
      setLoading(true);
      await deleteItem(db, email, placeId);

      const favPlaces = await getCollection(db, email);

      setFavoritePlaces(favPlaces);
      setLoading(false);
    } else {
      console.error("Email не найден");
    }
  };

  const handlePlaceInfo = (placeId: string) => async () => {
    const db = getFirestore();
    const email = Cookies.get("email");

    if (email) {
      setIsSaved(await isPlaceSaved(db, email, placeId));
    } else {
      console.error("Email не найден");
    }

    await setCacheItem("placesCache", placeId);

    setOpen(true);
    setInfoPlaceCardId(placeId);
    isSearchDrawer && setSerchDrawer(false);
    isFavoriteDrawer && setFavoriteDrawer(false);
  };

  return (
    <div className={`${styles.container}`}>
      <StyledBox className={isOpen ? styles.open : styles.containerClosed}>
        <SearchInput placeholder="Место, адрес.." />
        <span className={styles.title}>
          {isSearchDrawer && "Искать:"}
          {isFavoriteDrawer && "Избранное:"}
        </span>
        {isAuth && isLoading && isFavoriteDrawer && isOpen && <PinLoader />}
        {directions && (
          <RouteCard
            distance={directions.routes[0].legs[0].distance?.text}
            time={directions.routes[0].legs[0].duration?.text}
          />
        )}
        <div className={styles.contentContainer}>
          {isAuth &&
            isFavoriteDrawer &&
            !isLoading &&
            favoritePlaces &&
            favoritePlaces.length > 0 &&
            favoritePlaces.map((place: IPlaceProps) => (
              <PlaceCard
                description={
                  <PlaceDescription
                    address={place.address}
                    raiting={place.rating}
                    userRatingsTotal={place.userRatingsTotal}
                  />
                }
                icon={getMarkerIcon(place.type)}
                image={getImageUrl(place.photoUrlReference, 150, 130)}
                key={place.placeId}
                name={place.name}
                onDelete={handleRemoveFavorite(place.placeId)}
                onMoreInfo={handlePlaceInfo(place.placeId)}
              />
            ))}
          {isAuth &&
            isFavoriteDrawer &&
            !isLoading &&
            favoritePlaces &&
            favoritePlaces.length === 0 && (
              <span
                className={isFavoriteDrawer ? styles.showText : styles.hideText}
              >
                Вы еще не добавили места в список избранных
              </span>
            )}
          {!isAuth && isFavoriteDrawer && isLoading && (
            <span
              className={isFavoriteDrawer ? styles.showText : styles.hideText}
            >
              Чтобы сохранять и просматривать список избранного, необходимо
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
                  userRatingsTotal={
                    getCacheItem(infoPlaceCardId).userRatingsTotal
                  }
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
