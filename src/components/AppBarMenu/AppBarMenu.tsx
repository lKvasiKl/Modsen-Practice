import { Avatar, ThemeProvider } from "@mui/material";

import AppButton from "components/AppButton/AppButton";
import { theme } from "components/AppButton/styles";

import { LogoIcon, SearchIcon, FavoriteIcon } from "assets/icons";

import { StyledBox } from "./styles";
import styles from "./AppBarMenu.module.scss";

const AppBarMenu = () => {
  return (
    <StyledBox>
      <LogoIcon className={styles.logoIcon} />
      <div className={styles.buttonContainer}>
        <ThemeProvider theme={theme}>
          <AppButton color="primary">
            <SearchIcon className={styles.svgIcon} />
          </AppButton>
          <AppButton color="secondary">
            <FavoriteIcon className={styles.svgIcon} />
          </AppButton>
        </ThemeProvider>
      </div>
      <div className={styles.avatarContainer}>
        <Avatar className={styles.avatar}>A</Avatar>
      </div>
    </StyledBox>
  );
};

export default AppBarMenu;
