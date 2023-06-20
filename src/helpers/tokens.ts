interface ICookies {
  [key: string]: string;
}

const addSessionToCookie = (key: string, token: string): void => {
  document.cookie = `${key}=${token}`;
};

const getSessionFromCookie = (key: string): string | null => {
  const cookies: ICookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return cookies[key] || null;
};

const removeSessionFromCookie = (key: string): void => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export { addSessionToCookie, getSessionFromCookie, removeSessionFromCookie };
