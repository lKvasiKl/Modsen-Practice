import { StyledCard } from "./styles";
import { IconButton } from "@mui/material";
import { ArrowRIcon, FavoriteIcon } from "assets/icons";

import styles from "./PlaceCard.module.scss";

interface IPlaceCardProps {
  image: string | undefined;
  icon: string | undefined;
  name: string;
  description: string;
}

const PlaceCard = ({ image, icon, name, description }: IPlaceCardProps) => {
  return (
    <StyledCard>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            width="150px"
            height="130px"
            src={image}
          />
          <img className={styles.icon} width="25px" height="25px" src={icon} />
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
