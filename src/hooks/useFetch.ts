import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const cache = new Map();

const useFetch = <T>(fetchData: (signal: AbortSignal) => Promise<T[] | []>) => {
  const location = useLocation();
  const cacheKey = location.key + URL;
  const cached = cache.get(cacheKey);

  const [data, setData] = useState<T[]>(() => {
    // initialize from the cache
    return cached || null;
  });

  const [state, setState] = useState(() => {
    // avoid the fetch if cached
    return cached ? 'done' : 'loading';
  });

  const loadData = useCallback(async () => {
    const controller = new AbortController();
    const data = await fetchData(controller.signal);
    if (controller.signal.aborted) return;
    // set the cache
    cache.set(cacheKey, data);
    setData(data);
    return () => controller.abort();
  }, [cacheKey, fetchData]);

  useEffect(() => {
    if (state === 'loading') {
      loadData();
    }
  }, [state, cacheKey]);

  useEffect(() => {
    setState('loading');
  }, [URL]);

  return data;
};

export default useFetch;
