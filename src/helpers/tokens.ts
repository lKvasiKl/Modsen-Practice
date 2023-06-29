import Cookies from "js-cookie";

const addSessionToCookie = (key: string, token: string): void => {
  Cookies.set(key, token);
};

const getSessionFromCookie = (key: string): string | null => {
  return Cookies.get(key) || null;
};

const removeSessionFromCookie = (key: string): void => {
  Cookies.remove(key);
};

export { addSessionToCookie, getSessionFromCookie, removeSessionFromCookie };
