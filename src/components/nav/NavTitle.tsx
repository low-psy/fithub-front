import React from 'react';
import { Link } from 'react-router-dom';
import { NavTitleProps } from '../../types/nav';
import logo from '../../assets/fithub_logo.png';

const NavTitle: React.FC<NavTitleProps> = ({ title }) => {
  // NavTitle 컴포넌트의 렌더링 로직
  return (
    <div className="flex  md:basis-auto lg:basis-1/3">
      <Link to="/">
        <img className="h-full" src={logo} alt="logo" />
      </Link>

      <div className="main flex items-center  text-4xl font-extrabold text-main">
        {title}
      </div>
    </div>
  );
};

export default NavTitle;
