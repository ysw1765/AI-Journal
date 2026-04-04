const ACCESS_TOKEN_KEY = "ai-diary-token";

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY) ?? window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string, persist: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  if (persist) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function clearAccessToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}
