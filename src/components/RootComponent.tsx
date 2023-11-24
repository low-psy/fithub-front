import React from 'react';
import { WithChildren } from '../react-app-env';

const RootComponent: React.FunctionComponent<WithChildren> = ({ children }) => {
  return <div className="min-w-200 mx-10 mt-6 ">{children}</div>;
};

export default RootComponent;
