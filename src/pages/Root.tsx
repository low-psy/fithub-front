import React from 'react';
import { ActionFunctionArgs, Outlet } from 'react-router-dom';
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

export const action = ({ request }: ActionFunctionArgs) => {
  console.log(request);
  return null;
};
export default Root;
