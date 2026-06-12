import { vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retorna o valor inicial imediatamente", () => {
    const { result } = renderHook(() => useDebounce("inicial", 500));
    expect(result.current).toBe("inicial");
  });

  it("não atualiza antes do delay", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 500), {
      initialProps: { v: "a" },
    });
    rerender({ v: "b" });
    act(() => vi.advanceTimersByTime(400));
    expect(result.current).toBe("a");
  });

  it("atualiza após o delay", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 500), {
      initialProps: { v: "a" },
    });
    rerender({ v: "b" });
    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("b");
  });

  it("reinicia o timer em mudanças rápidas (só aplica o último valor)", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 500), {
      initialProps: { v: "original" },
    });

    rerender({ v: "intermediário" });
    act(() => vi.advanceTimersByTime(300));

    rerender({ v: "final" });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("original");

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("final");
  });

  it("usa 500 ms como delay padrão", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v), {
      initialProps: { v: "x" },
    });
    rerender({ v: "y" });
    act(() => vi.advanceTimersByTime(499));
    expect(result.current).toBe("x");
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("y");
  });

  it("funciona com tipos numéricos", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), {
      initialProps: { v: 0 },
    });
    rerender({ v: 42 });
    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe(42);
  });
});
