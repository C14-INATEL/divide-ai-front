import { http } from "../http/http";

export type PixKeyType = "cpf" | "email" | "phone" | "random";

export type CreateUserInput = {
  email: string;
  name: string;
  password: string;
  pix_key: string;
  pix_key_type: PixKeyType;
};

export type CreateUserResponse = {
  token: string;
};

export async function createUser(input: CreateUserInput): Promise<CreateUserResponse> {
  const { data } = await http.post<CreateUserResponse>("/users", input);
  return data;
}
