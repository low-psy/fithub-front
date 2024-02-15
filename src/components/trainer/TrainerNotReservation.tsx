import React from 'react';

const TrainerNotReservation: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="absolute inset-0 ">
      <div className="flex h-full items-center justify-center">{children}</div>
    </div>
  );
};

export default TrainerNotReservation;
