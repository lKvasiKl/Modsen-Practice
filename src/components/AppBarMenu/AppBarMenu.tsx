import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Login, Logout, PersonAdd } from "@mui/icons-material";
import { Button } from "@mui/base";

import AuthForm from "components/AuthForm/AuthForm";
import AppDrawer from "components/AppDrawer/AppDrawer";

import { IAuthProps } from "shared/interface/interface";

import { useAuth } from "hooks/useAuth";
import { useDrawer } from "hooks/useDrawer";

import { LogoIcon, SearchIcon, FavoriteIcon } from "assets/icons";

import styles from "./AppBarMenu.module.scss";

const AppBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const { isAuth, login, register, logout } = useAuth();
  const {
    isSearchDrawer,
    isFavoriteDrawer,
    infoPlaceCardId,
    setOpen,
    setSerchDrawer,
    setFavoriteDrawer,
    setInfoPlaceCardId,
  } = useDrawer();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleLogin = () => {
    showRegisterForm && setShowRegisterForm(false);
    setShowLoginForm(true);
    setAnchorEl(null);
  };

  const handleLoginFormSubmit = async (form: IAuthProps) => {
    await login(form);
    setShowLoginForm(false);
  };

  const handleRegister = () => {
    showLoginForm && setShowLoginForm(false);
    setShowRegisterForm(true);
    setAnchorEl(null);
  };

  const handleRegisterFormSubmit = async (form: IAuthProps) => {
    await register(form);
    setShowRegisterForm(false);
  };

  const handleSearch = () => {
    setOpen(true);
    isFavoriteDrawer && setFavoriteDrawer((prevState) => !prevState);
    infoPlaceCardId && setInfoPlaceCardId("");
    setSerchDrawer((prevState) => !prevState);
  };

  const handleFavorite = () => {
    setOpen(true);
    isSearchDrawer && setSerchDrawer((prevState) => !prevState);
    infoPlaceCardId && setInfoPlaceCardId("");
    setFavoriteDrawer((prevState) => !prevState);
  };

  return (
    <>
      <Box className={styles.menuContainer}>
        <LogoIcon className={styles.logoIcon} />
        <div className={styles.buttonContainer}>
          <Button
            className={isSearchDrawer ? styles.searchOpen : styles.searchButton}
            onClick={handleSearch}
          >
            <SearchIcon className={styles.svgIcon} />
          </Button>
          <Button
            className={isFavoriteDrawer ? styles.favOpen : styles.favButton}
            onClick={handleFavorite}
          >
            <FavoriteIcon className={styles.svgIcon} />
          </Button>
        </div>
        <div className={styles.avatarContainer}>
          <IconButton onClick={handleClick}>
            <Avatar className={styles.avatar}>A</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            open={open}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            onClose={handleClose}
          >
            {isAuth
              ? [
                  <MenuItem key="logout" onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>,
                ]
              : [
                  <MenuItem key="login" onClick={handleLogin}>
                    <ListItemIcon>
                      <Login fontSize="small" />
                    </ListItemIcon>
                    Login
                  </MenuItem>,
                  <MenuItem key="register" onClick={handleRegister}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Create account
                  </MenuItem>,
                ]}
          </Menu>
        </div>
        {showLoginForm && (
          <AuthForm
            linkText="Don't have an account?"
            linkTo="Register"
            onClick={handleRegister}
            onClose={handleClose}
            onSubmit={handleLoginFormSubmit}
          >
            Login
          </AuthForm>
        )}
        {showRegisterForm && (
          <AuthForm
            linkText="Already have an account?"
            linkTo="Login"
            onClick={handleLogin}
            onClose={handleClose}
            onSubmit={handleRegisterFormSubmit}
          >
            Register
          </AuthForm>
        )}
      </Box>
      <AppDrawer />
    </>
  );
};

export default AppBarMenu;
