import { useEffect, useState } from "react";

type UseFetchOptions = {
  enabled?: boolean;
  deps?: unknown[];
};

export function useFetch<T>(
  fetcher: () => Promise<T>,
  { enabled = true, deps = [] }: UseFetchOptions = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);

  async function run(): Promise<T | undefined> {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!enabled) return;
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return { data, error, isLoading, refetch: run };
}
