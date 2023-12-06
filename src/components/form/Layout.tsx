import React from 'react';

import { ILayoutProps } from '../../types/form';

function Layout({ children }: ILayoutProps) {
  return (
    <div className="flex flex-row min-h-screen justify-center bg-[#f5f5f5] ">
      <div className=" bg-[#fff] px-6 py-12 w-full sm:w-[500px] md:w-[600px] shadow-md ">
        {children}
      </div>
    </div>
  );
}

export default Layout;
