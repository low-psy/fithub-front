import React from 'react';
import { NavProps } from '../../models/nav/nav_model';

const NavComponent: React.FC<NavProps> = ({ children }) => {
  return <div className="flex h-full justify-between ">{children}</div>;
};

export default NavComponent;
