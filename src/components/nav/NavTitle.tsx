import React from 'react';
import { NavTitleProps } from '../../models/nav/nav_model';
import logo from '../../source/fithub_logo.png';

const NavTitle: React.FC<NavTitleProps> = ({ title }) => {
  // NavTitle 컴포넌트의 렌더링 로직
  return (
    <div className="flex basis-full  md:basis-1/2 lg:basis-1/3">
      <img className="h-full" src={logo} alt="logo" />
      <div className="main flex items-center  text-4xl font-extrabold text-main">
        {title}
      </div>
    </div>
  );
};

export default NavTitle;
