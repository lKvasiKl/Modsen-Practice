import { useState, useEffect, createContext } from "react";

import { IAuthProps } from "shared/types";

import { getSessionFromCookie, removeSessionFromCookie } from "helpers/tokens";

import * as authService from "../services/authService";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({});

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = getSessionFromCookie("accessToken") || false;

    if (accessToken) {
      setAuth(true);
    }
  }, []);

  const register = (form: IAuthProps) => {
    authService.register(form);
    setAuth(true);
  };

  const login = (form: IAuthProps) => {
    authService.login(form);
    setAuth(true);
  };

  const logout = () => {
    setAuth(false);
    removeSessionFromCookie("accessToken");
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
