import { useState, useEffect } from "react";

export default function useFetch(url: string, options?: RequestInit) {
  //use a generic array, as union types can cause errors here when accessing data
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    setData([]);
    setError(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data came through!");
        setData(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.log("Data encountered an error!");
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [url, options]); // Re-run if url or options change

  return { data, loading, error };
}