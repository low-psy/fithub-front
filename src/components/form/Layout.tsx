import React from 'react';

import { ILayoutProps } from '../../types/form';

function Layout({ children }: ILayoutProps) {
  return (
    <div className="flex min-h-screen flex-row justify-center bg-[#f5f5f5] ">
      <div className=" w-full bg-[#fff] px-6 py-12 shadow-md sm:w-[500px] md:w-[600px] ">
        {children}
      </div>
    </div>
  );
}

export default Layout;
