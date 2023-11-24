import React from 'react';
import { WithChildren } from '../react-app-env';

const RootComponent: React.FunctionComponent<WithChildren> = ({ children }) => {
  return <div className="mx-10 mt-6 min-w-400 ">{children}</div>;
};

export default RootComponent;
