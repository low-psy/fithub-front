import React from 'react';
import { NavMenuProps } from '../../models/nav/nav_model';

import BookmarkIcon from '../utilities/icons/BookmarkIcon';
import ChatIcon from '../utilities/icons/ChatIcon';
import ProfileIcon from '../utilities/icons/ProfileIcon';

const NavMenu: React.FunctionComponent<NavMenuProps> = ({ icons }) => {
  return (
    <ul className=" flex basis-1/2 items-center justify-end gap-5  start:max-md:hidden  lg:basis-1/3">
      {icons.map((iconString: string) => {
        switch (iconString) {
          case 'bookmark':
            return (
              <li key={iconString}>
                <BookmarkIcon />
              </li>
            );
          case 'chat':
            return (
              <li key={iconString}>
                <ChatIcon />
              </li>
            );
          case 'profile':
            return (
              <li key={iconString}>
                <ProfileIcon />
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
