import React from 'react';
import { useLocation } from 'react-router-dom';
import NavTitle from './NavTitle';
import NavMenu from './NavMenu';
import NavSearch from './NavSearch';

const NavComponent = () => {
  const location = useLocation();
  let title;
  let isNavSearch = true;

  switch (location.pathname) {
    case '/post':
      title = '게시물 작성하기';
      isNavSearch = false;
      break;
    case '/login':
    case '/signup':
    case '/login/redirect':
    case '/help/password':
      title = '핏헙';
      isNavSearch = false;
      break;
    default:
      title = '핏헙';
  }
  return (
    <div className="flex h-16 justify-between ">
      <NavTitle title={title} />
      {isNavSearch ? <NavSearch /> : null}
      <NavMenu icons={['bookmark', 'chat', 'profile']} />
    </div>
  );
};

export default NavComponent;
