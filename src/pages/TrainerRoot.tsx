import React from 'react';
import { Outlet } from 'react-router-dom';
import TrainerHeader from './trainer/TrainerHeader';

const TrainerRoot = () => {
  return (
    <div className="mx-4 mt-4 md:mx-10 md:mt-6 ">
      <TrainerHeader />
      <main className="mt-8 md:mt-10 md:pb-10">
        <Outlet />
      </main>
    </div>
  );
};

export default TrainerRoot;
