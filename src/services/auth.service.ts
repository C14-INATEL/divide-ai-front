import { http } from "./http";

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function login(input: LoginInput): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>("/auth/login", input);
  return data;
}

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  token: string;
};

export async function register(input: RegisterInput): Promise<RegisterResponse> {
  const { data } = await http.post<RegisterResponse>("/auth/register", input);
  return data;
}
