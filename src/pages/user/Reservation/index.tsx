import React from 'react';
import Reservation from './Reservation';

const Reservations = () => {
  return (
    <div>
      <p className="mb-4 text-lg font-semibold">예약 내역</p>
      <div className="flex flex-row flex-wrap gap-4">
        <Reservation />
        <Reservation />
        <Reservation />
        <Reservation />
      </div>
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />
      <p className="text-lg font-semibold">종료 내역</p>
      <div className="flex flex-row flex-wrap gap-4">
        <Reservation closed />
        <Reservation closed />
        <Reservation closed />
        <Reservation closed />
      </div>
    </div>
  );
};

export default Reservations;
