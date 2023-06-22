import { useState, useEffect, createContext } from "react";

import { IAuthProps } from "shared/types";

import { getSessionFromCookie, removeSessionFromCookie } from "helpers/tokens";

import * as authService from "../services/authService";

interface IAuthProviderProps {
  children: React.ReactNode;
}

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

const AuthProvider = ({ children }: IAuthProviderProps) => {
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
