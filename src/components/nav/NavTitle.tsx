import React from 'react';
import { Link } from 'react-router-dom';
import { NavTitleProps } from '../../types/nav';
import logo from '../../assets/fithub_logo.png';

const NavTitle: React.FC<NavTitleProps> = ({ title, to = '/' }) => {
  // NavTitle 컴포넌트의 렌더링 로직
  return (
    <Link
      to={to}
      className="hidden items-center p-2 md:flex md:basis-auto lg:basis-1/3"
    >
      <div className="w-12">
        <img src={logo} alt="logo" />
      </div>
      <div className="hidden text-4xl font-extrabold text-main lg:block">
        {title}
      </div>
    </Link>
  );
};

export default NavTitle;
