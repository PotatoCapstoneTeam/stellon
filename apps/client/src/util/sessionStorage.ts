export function getSessionStorageItem(key: string) {
  const value = sessionStorage.getItem(key);
  return value === null ? '' : value;
}

export function setSessionStorageItem(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

export function removeSessionStorageItem(key: string) {
  sessionStorage.removeItem(key);
}
