import type { ApiEntity, ID } from "../common.types";

export interface AuthUser {
  sub: string;
  name: string;
  email: string;
  exp: number;
  iat: number;
}

export interface PixKey {
  type: "CPF" | "EMAIL" | "PHONE" | "RANDOM";
  value: string;
}

export interface User extends ApiEntity {
  name: string;
  email: string;
  avatarUrl?: string | null;
  pixKey?: PixKey | null;
}

export interface UserSummary {
  id: ID;
  name: string;
  avatarUrl?: string | null;
}
