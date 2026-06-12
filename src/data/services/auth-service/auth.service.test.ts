import { vi } from "vitest";
import { login } from "./auth.service";
import { http } from "../http/http";

vi.mock("../http/http", () => ({
  http: { post: vi.fn() },
}));

const httpPost = vi.mocked(http.post);

describe("auth service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("envia POST para /auth/login com as credenciais", async () => {
      httpPost.mockResolvedValueOnce({ data: { access_token: "t", token_type: "bearer" } });

      await login({ email: "user@test.com", password: "123456" });

      expect(httpPost).toHaveBeenCalledWith("/auth/login", {
        email: "user@test.com",
        password: "123456",
      });
    });

    it("retorna access_token e token_type", async () => {
      httpPost.mockResolvedValueOnce({
        data: { access_token: "access-abc", token_type: "bearer" },
      });

      const result = await login({ email: "a@b.com", password: "pw" });

      expect(result.access_token).toBe("access-abc");
      expect(result.token_type).toBe("bearer");
    });

    it("propaga erro da API", async () => {
      httpPost.mockRejectedValueOnce(new Error("Credenciais inválidas"));

      await expect(login({ email: "x@x.com", password: "wrong" })).rejects.toThrow(
        "Credenciais inválidas",
      );
    });
  });
});
