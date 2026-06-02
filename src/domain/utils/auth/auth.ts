const TOKEN_KEY = "auth_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const isAuthenticated = () => !!getToken();

export function decodeToken<T>(token: string): T | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload)) as T;
  } catch {
    return null;
  }
}
