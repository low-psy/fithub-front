import React from 'react';

const ReservationItem: React.FC<{
  title: string;
  value: string | undefined;
  iconString: string;
}> = ({ title, value, iconString }) => {
  return (
    <div className="flex justify-between gap-x-6">
      <h2 className="flex shrink-0 items-center gap-x-1">
        <span className="material-symbols-rounded">{iconString}</span>
        {title}
      </h2>
      <p className="truncate  text-xl font-bold">{value}</p>
    </div>
  );
};
export default ReservationItem;
