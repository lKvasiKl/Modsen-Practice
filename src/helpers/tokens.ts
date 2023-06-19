const addSessionToStorage = (key: string, token: string): void =>
  localStorage.setItem(key, `${token}`);

const getSessionFromStorage = (key: string): string | null =>
  localStorage.getItem(key);

const removeSessionFromStorage = (key: string): void =>
  localStorage.removeItem(key);

export { addSessionToStorage, getSessionFromStorage, removeSessionFromStorage };
