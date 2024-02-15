import React from 'react';
import Cancellation from './Cancellation';

const Cancellations = () => {
  return (
    <div>
      <p className="mb-4 text-lg font-semibold">취소 / 환불 내역</p>
      <div className="flex flex-row flex-wrap gap-4">
        <Cancellation />
        <Cancellation />
        <Cancellation />
      </div>
    </div>
  );
};

export default Cancellations;
