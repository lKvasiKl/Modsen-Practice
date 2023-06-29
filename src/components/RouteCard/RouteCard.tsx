import { Box } from "@mui/material";

import styles from "./RouteCard.module.scss";

interface IRouteCardProps {
  distance: string | undefined;
  time: string | undefined;
}

const RouteCard = ({ distance, time }: IRouteCardProps) => {
  return (
    <Box className={styles.container}>
      <div className={styles.valueContainer}>
        <span className={styles.text}>{distance}</span>
        <span className={styles.description}>дистанция</span>
      </div>
      <div className={styles.valueContainer}>
        <span className={styles.text}>{time}</span>
        <span className={styles.description}>примерное время</span>
      </div>
    </Box>
  );
};

export default RouteCard;
