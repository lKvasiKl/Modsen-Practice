import { Button, Card, IconButton } from "@mui/material";

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
}: IPlaceCardProps) => {
  const { position, setDirections } = useMapData();
  const { infoPlaceCardId } = useDrawer();

  const handleDirectionButtonClick = () => {
    if (!position) return;

    const service = new google.maps.DirectionsService();
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
            <Button className={styles.savedButton}>
              <FavoriteIcon className={styles.icon} />
              Сохранено
            </Button>
            <Button
              className={styles.routeButton}
              onClick={handleDirectionButtonClick}
            >
              <PointIcon />
              Маршрут
            </Button>
          </>
        ) : (
          <>
            <IconButton>
              <FavoriteIcon className={styles.svgFavorite} />
            </IconButton>
            <IconButton>
              <ArrowRIcon className={styles.svgArrow} />
            </IconButton>
          </>
        )}
      </div>
    </Card>
  );
};

export default PlaceCard;
