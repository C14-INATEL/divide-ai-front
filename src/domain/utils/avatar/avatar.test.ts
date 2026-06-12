import { getAvatarUrl } from "./avatar";

describe("getAvatarUrl", () => {
  it("contém o nome codificado na URL", () => {
    expect(getAvatarUrl("John Doe")).toContain("John%20Doe");
  });

  it("usa a API ui-avatars.com", () => {
    expect(getAvatarUrl("Alice")).toContain("ui-avatars.com/api/");
  });

  it("inclui os parâmetros obrigatórios", () => {
    const url = getAvatarUrl("Test");
    expect(url).toContain("background=random");
    expect(url).toContain("color=fff");
    expect(url).toContain("bold=true");
    expect(url).toContain("size=128");
  });

  it("codifica caracteres especiais no nome", () => {
    const name = "João & Maria";
    expect(getAvatarUrl(name)).toContain(encodeURIComponent(name));
  });

  it("retorna uma string não vazia para qualquer nome", () => {
    expect(getAvatarUrl("X").length).toBeGreaterThan(0);
  });
});
