import { useState } from 'react';

const useFilter = (initialFilter: string | null) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    initialFilter,
  );

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  return { selectedFilter, handleFilterClick };
};

export default useFilter;
