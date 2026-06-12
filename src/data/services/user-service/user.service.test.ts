import { vi } from "vitest";
import { createUser, searchUsers } from "./user.service";
import { http } from "../http/http";

vi.mock("../http/http", () => ({
  http: { get: vi.fn(), post: vi.fn() },
}));

const httpGet = vi.mocked(http.get);
const httpPost = vi.mocked(http.post);

const baseInput = {
  email: "alice@test.com",
  name: "Alice",
  password: "secure123",
  pix_key: "12345678901",
  pix_key_type: "cpf" as const,
};

describe("user service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createUser", () => {
    it("envia POST para /users com os dados do usuário", async () => {
      httpPost.mockResolvedValueOnce({ data: { token: "token-novo" } });

      await createUser(baseInput);

      expect(httpPost).toHaveBeenCalledWith("/users", baseInput);
    });

    it("retorna o token criado", async () => {
      httpPost.mockResolvedValueOnce({ data: { token: "meu-token" } });

      const result = await createUser(baseInput);

      expect(result.token).toBe("meu-token");
    });

    it("propaga erro de usuário já existente", async () => {
      httpPost.mockRejectedValueOnce(new Error("Email já cadastrado"));

      await expect(createUser(baseInput)).rejects.toThrow("Email já cadastrado");
    });
  });

  describe("searchUsers", () => {
    it("busca sem filtro quando name não é passado", async () => {
      httpGet.mockResolvedValueOnce({ data: [] });

      await searchUsers();

      expect(httpGet).toHaveBeenCalledWith("/users/", { params: undefined });
    });

    it("busca com filtro de nome", async () => {
      httpGet.mockResolvedValueOnce({ data: [] });

      await searchUsers("Alice");

      expect(httpGet).toHaveBeenCalledWith("/users/", { params: { name: "Alice" } });
    });

    it("retorna a lista de usuários encontrados", async () => {
      const users = [
        { id: "u-1", name: "Alice", email: "alice@test.com" },
        { id: "u-2", name: "Alícia", email: "alicia@test.com" },
      ];
      httpGet.mockResolvedValueOnce({ data: users });

      const result = await searchUsers("Al");

      expect(result).toEqual(users);
    });

    it("retorna array vazio quando não há resultados", async () => {
      httpGet.mockResolvedValueOnce({ data: [] });

      const result = await searchUsers("ninguem");

      expect(result).toHaveLength(0);
    });
  });
});
