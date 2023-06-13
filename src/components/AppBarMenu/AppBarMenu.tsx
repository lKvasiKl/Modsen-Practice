import { LogoIcon, SearchIcon, FavoriteIcon } from "assets/icons";
import { Avatar } from "@mui/material";
import AppButton from "components/AppButton/AppButton";

import styles from "./AppBarMenu.module.scss";
import { StyledBox } from "./styles";

const AppBarMenu = () => {
  return (
    <StyledBox>
      <LogoIcon className={styles.logoIcon} />
      <div className={styles.buttonContainer}>
        <AppButton>
          <SearchIcon className={styles.svgIcon} />
        </AppButton>
        <AppButton>
          <FavoriteIcon className={styles.svgIcon} />
        </AppButton>
      </div>
      <div className={styles.avatarContainer}>
        <Avatar className={styles.avatar}>A</Avatar>
      </div>
    </StyledBox>
  );
};

export default AppBarMenu;
