import { StyledCard } from "components/PlaceCard/styles";
import { IPlaceCardProps } from "shared/types";
import { Button } from "@mui/material";
import { FavoriteIcon, PointIcon } from "assets/icons";

import styles from "./PlaceInfoCard.module.scss";

const PlaceInfoCard = ({ image, icon, name, description }: IPlaceCardProps) => {
  return (
    <StyledCard>
      <img className={styles.image} width="400px" height="300px" src={image} />
      <img className={styles.icon} width="30px" height="30px" src={icon} />
      <span className={styles.placeName}>{name}</span>
      <span className={styles.placeDescription}>{description}</span>
      <div className={styles.buttonContainer}>
        <Button className={styles.savedButton}>
          <FavoriteIcon className={styles.icon} />
          Сохранено
        </Button>
        <Button className={styles.routeButton}>
          <PointIcon />
          Маршрут
        </Button>
      </div>
    </StyledCard>
  );
};

export default PlaceInfoCard;
