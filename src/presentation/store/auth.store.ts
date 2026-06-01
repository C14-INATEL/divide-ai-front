import { create } from "zustand";
import type { AuthUser } from "../../domain/types/interfaces/users/user.types";
import { decodeToken, getToken } from "../../domain/utils/auth/auth";

interface AuthStore {
  user: AuthUser | null;
  setUser: (token: string) => void;
  clearUser: () => void;
}

function decodeFromStorage(): AuthUser | null {
  const token = getToken();
  return token ? decodeToken<AuthUser>(token) : null;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: decodeFromStorage(),
  setUser: (token) => set({ user: decodeToken<AuthUser>(token) }),
  clearUser: () => set({ user: null }),
}));
