import { Box } from "@mui/material";

import styles from "./RouteCard.module.scss";

interface IRouteCardProps {
  distance: string;
  time: string;
}

const RouteCard = ({ distance, time }: IRouteCardProps) => {
  return (
    <Box className={styles.container}>
      <div className={styles.valueContainer}>
        <span className={styles.text}>{distance} km</span>
        <span className={styles.description}>дистанция</span>
      </div>
      <div className={styles.valueContainer}>
        <span className={styles.text}>{time} мин</span>
        <span className={styles.description}>примерное время</span>
      </div>
    </Box>
  );
};

export default RouteCard;
