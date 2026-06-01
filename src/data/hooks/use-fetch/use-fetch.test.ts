import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useFetch } from "./use-fetch";

describe("use-fetch", () => {
  test("should start in loading state and populate data when fetcher resolves", async () => {
    const fetcher = vi.fn().mockResolvedValue({ id: 1, name: "Tiago" });

    const { result } = renderHook(() => useFetch(fetcher));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual({ id: 1, name: "Tiago" });
    expect(result.current.error).toBeNull();
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  test("should expose the error and stop loading when fetcher rejects", async () => {
    const failure = new Error("request failed");
    const fetcher = vi.fn().mockRejectedValue(failure);

    const { result } = renderHook(() => useFetch(fetcher));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe(failure);
    expect(result.current.data).toBeNull();
  });

  test("should re-run the fetcher and update data when refetch is called", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce("first")
      .mockResolvedValueOnce("second");

    const { result } = renderHook(() => useFetch(fetcher));

    await waitFor(() => expect(result.current.data).toBe("first"));

    await act(async () => {
      await result.current.refetch();
    });

    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(result.current.data).toBe("second");
    expect(result.current.isLoading).toBe(false);
  });

  test("should clear previous error on a successful refetch", async () => {
    const fetcher = vi
      .fn()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValueOnce("recovered");

    const { result } = renderHook(() => useFetch(fetcher));

    await waitFor(() => expect(result.current.error).not.toBeNull());

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.data).toBe("recovered");
  });

  test("should return to loading state while refetching", async () => {
    let resolveSecond: ((value: string) => void) | undefined;
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce("initial")
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const { result } = renderHook(() => useFetch(fetcher));

    await waitFor(() => expect(result.current.data).toBe("initial"));
    expect(result.current.isLoading).toBe(false);

    let refetchPromise!: Promise<unknown>;
    act(() => {
      refetchPromise = result.current.refetch();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));

    await act(async () => {
      resolveSecond?.("final");
      await refetchPromise;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe("final");
  });

  test("should re-run the request when deps change", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce("user-1")
      .mockResolvedValueOnce("user-2");

    const { result, rerender } = renderHook(
      ({ id }: { id: number }) => useFetch(fetcher, { deps: [id] }),
      { initialProps: { id: 1 } },
    );

    await waitFor(() => expect(result.current.data).toBe("user-1"));

    rerender({ id: 2 });

    await waitFor(() => expect(result.current.data).toBe("user-2"));
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  test("should not re-run the request when deps stay the same", async () => {
    const fetcher = vi.fn().mockResolvedValue("stable");

    const { result, rerender } = renderHook(
      ({ id }: { id: number }) => useFetch(fetcher, { deps: [id] }),
      { initialProps: { id: 1 } },
    );

    await waitFor(() => expect(result.current.data).toBe("stable"));

    rerender({ id: 1 });
    rerender({ id: 1 });

    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  test("should not auto-run when enabled is false and only fire on refetch", async () => {
    const fetcher = vi.fn().mockResolvedValue("manual");

    const { result } = renderHook(() => useFetch(fetcher, { enabled: false }));

    expect(result.current.isLoading).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();

    let returned: unknown;
    await act(async () => {
      returned = await result.current.refetch();
    });

    expect(returned).toBe("manual");
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe("manual");
  });

  test("refetch should resolve to undefined when the fetcher rejects", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("nope"));

    const { result } = renderHook(() => useFetch(fetcher, { enabled: false }));

    let returned: unknown = "unset";
    await act(async () => {
      returned = await result.current.refetch();
    });

    expect(returned).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
