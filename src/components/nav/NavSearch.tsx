import React from 'react';
import { NavSearchProps } from '../../models/nav/nav_model';

const NavSearch: React.FC<NavSearchProps> = ({ children }) => {
  // NavSearch 컴포넌트의 렌더링 로직
  return (
    <div className="flex basis-1/3 items-center justify-center start:max-lg:hidden ">
      {children}
    </div>
  );
};

export default NavSearch;
