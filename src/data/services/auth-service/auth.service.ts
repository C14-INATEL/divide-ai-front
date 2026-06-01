import { http } from "../http/http";

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export async function login(input: LoginInput): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>("/auth/login", input);
  return data;
}
