import React from 'react';
import { Link } from 'react-router-dom';
import { NavMenuProps } from '../../models/nav/nav_model';
import { useAppSelector } from '../../hooks/reduxHooks';
import BookmarkIcon from '../utilities/icons/BookmarkIcon';
import ChatIcon from '../utilities/icons/ChatIcon';
import ProfileIcon from '../utilities/icons/ProfileIcon';

const NavMenu: React.FunctionComponent<NavMenuProps> = ({ icons }) => {
  const accessToken = useAppSelector((store) => store.token.accessToken);
  let profileTo = '/profile';

  if (accessToken === 'initial access token') {
    profileTo = '/login';
  }
  return (
    <ul className="flex basis-1/2 items-center justify-end gap-5   start:max-md:hidden md:grow lg:basis-1/3">
      <li key="trainer" className="grow text-center">
        <Link
          to="/trainer"
          className="rounded-full px-4 py-3 hover:bg-slate-200"
        >
          트레이너신가요?
        </Link>
      </li>
      {icons.map((iconString: string) => {
        switch (iconString) {
          case 'bookmark':
            return (
              <li key={iconString}>
                <Link to="/book">
                  <BookmarkIcon />
                </Link>
              </li>
            );
          case 'chat':
            return (
              <li key={iconString}>
                <Link to="/chat">
                  <ChatIcon />
                </Link>
              </li>
            );
          case 'profile':
            return (
              <li key={iconString}>
                <Link to={profileTo}>
                  <ProfileIcon />
                </Link>
              </li>
            );
          default:
            return null;
        }
      })}
    </ul>
  );
};

export default NavMenu;
