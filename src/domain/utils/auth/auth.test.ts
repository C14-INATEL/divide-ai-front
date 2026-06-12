import { vi } from "vitest";
import { getToken, setToken, clearToken, isAuthenticated, decodeToken } from "./auth";

const TOKEN_KEY = "auth_token";

describe("auth utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getToken", () => {
    it("retorna null quando não há token armazenado", () => {
      expect(getToken()).toBeNull();
    });

    it("retorna o token armazenado", () => {
      localStorage.setItem(TOKEN_KEY, "my-token");
      expect(getToken()).toBe("my-token");
    });
  });

  describe("setToken", () => {
    it("armazena o token no localStorage", () => {
      setToken("stored-token");
      expect(localStorage.getItem(TOKEN_KEY)).toBe("stored-token");
    });

    it("sobrescreve token existente", () => {
      setToken("first");
      setToken("second");
      expect(localStorage.getItem(TOKEN_KEY)).toBe("second");
    });
  });

  describe("clearToken", () => {
    it("remove o token do localStorage", () => {
      localStorage.setItem(TOKEN_KEY, "token");
      clearToken();
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });

    it("não lança erro quando não há token para remover", () => {
      expect(() => clearToken()).not.toThrow();
    });
  });

  describe("isAuthenticated", () => {
    it("retorna false quando não há token", () => {
      expect(isAuthenticated()).toBe(false);
    });

    it("retorna true quando há token armazenado", () => {
      localStorage.setItem(TOKEN_KEY, "any-token");
      expect(isAuthenticated()).toBe(true);
    });
  });

  describe("decodeToken", () => {
    function buildJwt(payload: object): string {
      return `header.${btoa(JSON.stringify(payload))}.signature`;
    }

    it("decodifica payload válido de JWT", () => {
      const payload = { sub: "user-1", name: "Alice", email: "alice@test.com", exp: 9999999999 };
      const result = decodeToken<typeof payload>(buildJwt(payload));
      expect(result).toEqual(payload);
    });

    it("retorna null para token sem partes suficientes", () => {
      expect(decodeToken("sem-ponto")).toBeNull();
    });

    it("retorna null para base64 inválido no payload", () => {
      expect(decodeToken("header.!!!invalido!!!.sig")).toBeNull();
    });

    it("retorna null para string vazia", () => {
      expect(decodeToken("")).toBeNull();
    });

    it("decodifica payload com campos unicode", () => {
      const payload = { name: "João García" };
      const result = decodeToken<typeof payload>(buildJwt(payload));
      expect(result?.name).toBe("João García");
    });
  });
});
