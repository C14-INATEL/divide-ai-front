import axios from "axios";
import { clearToken, getToken } from "../../../domain/utils/auth/auth";
import { useAuthStore } from "../../../presentation/store/auth.store";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      useAuthStore.getState().clearUser();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  },
);

