import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";

import { IAuthProps, IProviderProps } from "shared/interface/interface";

import { getSessionFromCookie, removeSessionFromCookie } from "helpers/tokens";

import * as authService from "../services/authService";

export const AuthContext = createContext<{
  isAuth: boolean;
  register: (form: IAuthProps) => void;
  login: (form: IAuthProps) => void;
  logout: () => void;
}>({
  isAuth: false,
  register: () => undefined,
  login: () => undefined,
  logout: () => undefined,
});

const AuthProvider = ({ children }: IProviderProps) => {
  const [isAuth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = getSessionFromCookie("accessToken") || false;

    if (accessToken) {
      setAuth(true);
    }
  }, []);

  const register = async (form: IAuthProps) => {
    await authService.register(form);
    setAuth(true);
  };

  const login = async (form: IAuthProps) => {
    await authService.login(form);
    setAuth(true);
  };

  const logout = () => {
    setAuth(false);
    removeSessionFromCookie("accessToken");
    Cookies.remove("email");
  };

  const value = {
    isAuth,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
