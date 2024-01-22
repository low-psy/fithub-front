import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import ChatIcon from '../../assets/icons/ChatIcon';
import ProfileIcon from '../../assets/icons/ProfileIcon';

const NavMenu = () => {
  const accessToken = useAppSelector((store) => store.token.accessToken);
  let profileTo = '/user';

  if (accessToken === 'initial access token') {
    profileTo = '/login';
  }
  return (
    <ul className="flex grow items-center justify-end gap-5   lg:basis-1/3">
      <li key="trainer" className="grow text-center">
        <Link
          to="/trainer/home"
          className="rounded-full px-4 py-3 hover:bg-slate-200"
        >
          트레이너신가요?
        </Link>
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
          <ProfileIcon />
        </Link>
      </li>
    </ul>
  );
};

export default NavMenu;
