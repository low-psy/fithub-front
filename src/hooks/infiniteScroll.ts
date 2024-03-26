import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps<T> {
  initialData: T[];
  fetchData: (page: number) => Promise<T[] | []>;
  last?: boolean;
  page: number;
}

// 무한 스크롤 훅
const useInfiniteScroll = <T>({
  initialData,
  fetchData,
  last,
  page,
}: UseInfiniteScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loaderIndicator = useRef<HTMLDivElement | null>(null);

  const loadMoreData = useCallback(async () => {
    if (isLoading || last) return;
    setIsLoading(true);
    const newData = await fetchData(page + 1);
    setData((prevData) => [...prevData, ...newData]);
    setIsLoading(false);
  }, [page, fetchData, isLoading, last]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !last) {
          loadMoreData();
        }
      },
      { threshold: 1.0 },
    );

    const currentLoader = loaderIndicator.current;
    if (currentLoader && !last) {
      observer.observe(currentLoader);
    } else if (currentLoader) {
      observer.unobserve(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loaderIndicator, loadMoreData, isLoading, last]);

  return { data, loaderIndicator };
};

export default useInfiniteScroll;
