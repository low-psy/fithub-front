import React from 'react';
import { WithChildren } from '../react-app-env';

const MainComponent: React.FC<WithChildren> = ({ children }) => {
  return <div className="mt-10 ">{children}</div>;
};

export default MainComponent;
