import React from 'react';
import { Outlet } from 'react-router-dom';
import NavComponent from '../components/nav/NavComponent';

const Root = () => {
  return (
    <div className="min-w-200 mx-10 mt-6 ">
      <NavComponent />
      <main className="mt-10 ">
        <Outlet />
      </main>
    </div>
  );
};
export default Root;
