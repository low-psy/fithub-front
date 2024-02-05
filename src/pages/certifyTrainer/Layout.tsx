import React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex w-full justify-center px-10 py-4">{children}</div>
  );
};

export default Layout;
