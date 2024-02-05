import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps<T> {
  initialData: T[];
  fetchData: (page: number) => Promise<T[] | []>;
}

const useInfiniteScroll = <T>({
  initialData,
  fetchData,
}: UseInfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loaderIndicator = useRef<HTMLDivElement | null>(null);

  const loadMoreData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const newData = await fetchData(page + 1);
    setData((prevData) => [...prevData, ...newData]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  }, [page, fetchData, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreData();
        }
      },
      { threshold: 1.0 },
    );

    const currentLoader = loaderIndicator.current;

    if (loaderIndicator.current) {
      observer.observe(loaderIndicator.current);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loaderIndicator, loadMoreData, isLoading]);

  return { data, loaderIndicator };
};

export default useInfiniteScroll;
