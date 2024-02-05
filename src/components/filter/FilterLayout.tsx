import React from 'react';
import { DivProps } from '../../types/common';

const FilterLayout: React.FunctionComponent<DivProps> = ({ children }) => {
  return (
    <aside className="hidden w-[400px]  shrink-0 lg:block">
      <div className="">{children}</div>
    </aside>
  );
};

export default FilterLayout;
