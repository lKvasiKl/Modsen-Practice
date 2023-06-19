import { StyledCard } from "./styles";
import { IconButton } from "@mui/material";
import { ArrowRIcon, FavoriteIcon } from "assets/icons";
import { IPlaceCardProps } from "shared/types";

import styles from "./PlaceCard.module.scss";

const PlaceCard = ({ image, icon, name, description }: IPlaceCardProps) => {
  return (
    <StyledCard>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            height="130px"
            src={image}
            width="150px"
          />
          <img className={styles.icon} height="25px" src={icon} width="25px" />
        </div>
        <span className={styles.placeName}>{name}</span>
      </div>
      <span className={styles.placeDescription}>{description}</span>
      <div className={styles.buttonContainer}>
        <IconButton>
          <FavoriteIcon className={styles.svgFavorite} />
        </IconButton>
        <IconButton>
          <ArrowRIcon className={styles.svgArrow} />
        </IconButton>
      </div>
    </StyledCard>
  );
};

export default PlaceCard;
