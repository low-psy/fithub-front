import React from 'react';
import { NavTitleProps } from '../../models/nav/nav_model';

const NavTitle: React.FC<NavTitleProps> = ({ children }) => {
  // NavTitle 컴포넌트의 렌더링 로직
  return (
    <div className="flex basis-full  md:basis-1/2 lg:basis-1/3">{children}</div>
  );
};

export default NavTitle;
