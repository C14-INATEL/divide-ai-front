import { vi } from "vitest";
import { useAuthStore } from "./auth.store";

function buildJwt(payload: object): string {
  return `h.${btoa(JSON.stringify(payload))}.s`;
}

describe("useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null });
  });

  describe("setUser", () => {
    it("decodifica o token e define o usuário no estado", () => {
      const payload = { sub: "u-99", name: "Alice", email: "alice@test.com", exp: 9999999999, iat: 0 };
      useAuthStore.getState().setUser(buildJwt(payload));

      const { user } = useAuthStore.getState();
      expect(user?.sub).toBe("u-99");
      expect(user?.name).toBe("Alice");
      expect(user?.email).toBe("alice@test.com");
    });

    it("define user como null quando o token é inválido", () => {
      useAuthStore.getState().setUser("token-invalido");
      expect(useAuthStore.getState().user).toBeNull();
    });
  });

  describe("clearUser", () => {
    it("define user como null", () => {
      const payload = { sub: "u-1", name: "Bob", email: "b@b.com", exp: 9999, iat: 0 };
      useAuthStore.getState().setUser(buildJwt(payload));
      expect(useAuthStore.getState().user).not.toBeNull();

      useAuthStore.getState().clearUser();
      expect(useAuthStore.getState().user).toBeNull();
    });
  });

  it("inicia com user null quando localStorage está vazio", () => {
    expect(useAuthStore.getState().user).toBeNull();
  });
});
