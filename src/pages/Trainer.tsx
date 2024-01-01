import React from 'react';
import { Outlet } from 'react-router-dom';
import TrainerHeader from '../components/trainer/TrainerHeader';

const Trainer = () => {
  return (
    <div className="min-w-200 mx-10 mt-6 space-y-4 ">
      <TrainerHeader />
      <Outlet />
    </div>
  );
};

export default Trainer;
