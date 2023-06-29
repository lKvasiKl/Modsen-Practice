import { Button, Card, IconButton } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import Cookies from "js-cookie";

import { addPlaceInfo, deleteItem } from "services/databaseService";

import { IPlaceCardProps } from "shared/interface/interface";

import { useMapData } from "hooks/useMapData";
import { useDrawer } from "hooks/useDrawer";

import { getCacheItem } from "helpers/cache";

import { ArrowRIcon, FavoriteIcon, PointIcon } from "assets/icons";

import styles from "./PlaceCard.module.scss";

const PlaceCard = ({
  image,
  icon,
  type,
  name,
  description,
  onDelete,
  onGetMoreInfo,
}: IPlaceCardProps) => {
  const { infoPlaceCardId } = useDrawer();
  const { position, directions, isSaved, setDirections, setIsSaved } =
    useMapData();

  const handleDirectionButtonClick = () => {
    if (!position) return;

    const service = new google.maps.DirectionsService();

    if (directions) {
      setDirections(undefined);
    } else {
      service.route(
        {
          origin: position,
          destination: getCacheItem(infoPlaceCardId).position,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        },
      );
    }
  };

  const handleSaveButtonClick = async () => {
    const db = getFirestore();
    const email = Cookies.get("email");

    if (email) {
      if (isSaved) {
        await deleteItem(db, email, infoPlaceCardId);
        setIsSaved(false);
      } else {
        await addPlaceInfo(db, email, getCacheItem(infoPlaceCardId));
        setIsSaved(true);
      }
    } else {
      console.error("Email не найден");
    }
  };

  return (
    <Card className={styles.card}>
      {type ? (
        <>
          <img
            alt="placePhoto"
            className={styles.image}
            height="300px"
            src={image}
            width="400px"
          />
          <img
            alt="placeIcon"
            className={styles.icon}
            height="30px"
            src={icon}
            width="30px"
          />
          <span className={styles.placeName}>{name}</span>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img
              alt="placePhoto"
              className={styles.image}
              height="130px"
              src={image}
              width="150px"
            />
            <img
              alt="placeIcon"
              className={styles.icon}
              height="25px"
              src={icon}
              width="25px"
            />
          </div>
          <span className={styles.placeName}>{name}</span>
        </div>
      )}
      <div
        className={type ? styles.placeFullDescription : styles.placeDescription}
      >
        {description}
      </div>
      <div
        className={type ? styles.buttonInfoContainer : styles.buttonContainer}
      >
        {type ? (
          <>
            <Button
              className={
                isSaved ? styles.savedButton : styles.savedActiveButton
              }
              onClick={handleSaveButtonClick}
            >
              <FavoriteIcon
                className={isSaved ? styles.icon : styles.iconActive}
              />
              {isSaved ? "Сохранено" : "Сохранить"}
            </Button>
            <Button
              className={
                directions ? styles.routeButton : styles.routeActiveButton
              }
              onClick={handleDirectionButtonClick}
            >
              <PointIcon
                className={directions ? styles.icon : styles.iconActive}
              />
              {directions ? "Сбросить" : "Маршрут"}
            </Button>
          </>
        ) : (
          <>
            <IconButton onClick={onDelete}>
              <FavoriteIcon className={styles.svgFavorite} />
            </IconButton>
            <IconButton onClick={onGetMoreInfo}>
              <ArrowRIcon className={styles.svgArrow} />
            </IconButton>
          </>
        )}
      </div>
    </Card>
  );
};

export default PlaceCard;
