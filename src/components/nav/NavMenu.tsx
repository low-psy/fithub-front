import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import ChatIcon from '../../assets/icons/ChatIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';

const NavMenu = () => {
  const accessToken = useAppSelector((store) => store.token.accessToken);
  let profileTo = '/profile/myprofile';
  let isCreateTrainer = true;
  const location = useLocation();
  if (location.pathname === '/newpost') {
    isCreateTrainer = false;
  }
  if (accessToken === 'initial access token') {
    profileTo = '/login';
  }
  return (
    <ul className="hidden items-center justify-end gap-5 md:flex  md:grow md:basis-1/3">
      <li key="trainer" className="grow text-center">
        {isCreateTrainer ? (
          <Link
            to="/trainer/new"
            className="hidden whitespace-nowrap rounded-full px-4 py-3 hover:bg-slate-200 md:inline-block"
          >
            트레이너신가요?
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
      <li key="profile">
        <Link to={profileTo}>
          <ProfileIcon />
        </Link>
      </li>
    </ul>
  );
};

export default NavMenu;
