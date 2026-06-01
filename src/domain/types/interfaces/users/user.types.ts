import type { ApiEntity, ID } from "../common.types";

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
