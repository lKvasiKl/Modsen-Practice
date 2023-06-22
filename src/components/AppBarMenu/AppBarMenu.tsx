import { useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { Login, Logout, PersonAdd } from "@mui/icons-material";

import AppButton from "components/AppButton/AppButton";
import { theme } from "components/AppButton/styles";
import AuthForm from "components/AuthForm/AuthForm";

import { IAuthProps } from "shared/types";

import { useAuth } from "hooks/useAuth";

import { LogoIcon, SearchIcon, FavoriteIcon } from "assets/icons";

import { StyledBox } from "./styles";
import styles from "./AppBarMenu.module.scss";

const AppBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const open = Boolean(anchorEl);

  const { isAuth, login, register, logout } = useAuth();

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
    </StyledBox>
  );
};

export default AppBarMenu;
