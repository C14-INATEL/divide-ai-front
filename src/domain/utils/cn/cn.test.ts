import { cn } from "./cn";

describe("cn", () => {
  it("junta múltiplas classes", () => {
    expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("ignora valores falsy (false, undefined, null)", () => {
    expect(cn("base", false && "skip", undefined, null as never, "end")).toBe("base end");
  });

  it("resolve conflitos Tailwind mantendo a última declaração", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("aceita notação de objeto condicional", () => {
    expect(cn({ "font-bold": true, "font-light": false })).toBe("font-bold");
  });

  it("retorna string vazia quando não há classes", () => {
    expect(cn()).toBe("");
  });

  it("combina notação de objeto e string", () => {
    expect(cn("flex", { "items-center": true, "justify-end": false }, "gap-2")).toBe(
      "flex items-center gap-2",
    );
  });
});
