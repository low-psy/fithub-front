import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import ChatIcon from '../../assets/icons/ChatIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';
import NavDropdown from './NavDropdown';

const NavMenu = () => {
  const { isLogin, role } = useAppSelector((state) => state.user);
  let profileTo = '/user/profile';

  let isCreateTrainer = true;
  const location = useLocation();
  if (location.pathname.startsWith('/newpost')) {
    isCreateTrainer = false;
  }
  const to = role === 'trainer' ? '/trainer/home' : '/certify-trainer';
  let menuArray = ['프로필', '로그아웃'];
  if (isLogin === false) {
    profileTo = '/login';
  } else {
    menuArray = [...menuArray, '저장한 게시물'];
  }
  return (
    <ul className="hidden items-center justify-end gap-5 md:flex  md:grow md:basis-1/3">
      <li key="trainer" className="grow text-center">
        {isCreateTrainer ? (
          <Link
            to={to}
            className="hidden whitespace-nowrap rounded-full px-4 py-3 hover:bg-slate-200 md:inline-block"
          >
            {role === 'trainer' ? '트레이너 모드 전환' : '트레이너신가요?'}
          </Link>
        ) : null}
      </li>
      <li key="book">
        <Link to="/book">
          <BookmarkIcon />
        </Link>
      </li>
      <li key="chat">
        <Link to="/chat">
          <ChatIcon />
        </Link>
      </li>
      <li key="user">
        <Link to={profileTo}>
          <NavDropdown menuArray={menuArray} />
        </Link>
      </li>
    </ul>
  );
};

export default NavMenu;
