import React from 'react';

const ReservationItem: React.FC<{
  title: string;
  value: string | undefined;
  iconString: string;
}> = ({ title, value, iconString }) => {
  return (
    <div className="flex justify-between">
      <h2 className="flex items-center gap-x-1">
        <span className="material-symbols-rounded">{iconString}</span>
        {title}
      </h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};
export default ReservationItem;
