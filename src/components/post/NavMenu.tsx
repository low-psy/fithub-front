import React from 'react';
import { WithChildren } from '../../react-app-env';

const NavMenu: React.FunctionComponent<WithChildren> = ({ children }) => {
  return (
    <div className="flex sm:max-md:hidden">
      <ul className="flex items-center gap-5">
        {children.map((IconComponent: any) => {
          return (
            <li>
              <IconComponent />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavMenu;
