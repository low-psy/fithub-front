import React from 'react';
import { WithChildren } from '../react-app-env';

const HeaderComponent: React.FC<WithChildren> = ({ children }) => {
  return <div className="h-14">{children}</div>;
};

export default HeaderComponent;
