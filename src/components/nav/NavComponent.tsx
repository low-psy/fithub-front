import React from 'react';
import { useLocation } from 'react-router-dom';
import NavTitle from './NavTitle';
import NavMenu from './NavMenu';
import NavSearch from './NavSearch';

const NavComponent = () => {
  const location = useLocation();
  let title;
  let isNavSearch = true;

  if (location.pathname.startsWith('/newpost')) {
    title = '게시물 작성하기';
  } else if (
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/signup') ||
    location.pathname.startsWith('/help/password')
  ) {
    title = '핏헙';
    isNavSearch = false;
  } else {
    title = '핏헙';
  }
  return (
    <nav className=" flex h-14 justify-between ">
      <NavTitle title={title} />
      {isNavSearch ? <NavSearch /> : null}
      <NavMenu />
    </nav>
  );
};

export default NavComponent;
