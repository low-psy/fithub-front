import React, { useEffect, useState } from 'react';
import Cancellation from './Cancellation';
import { fetchTrainingReservation } from '../../../apis/user';
import { UsersReserveInfoDto } from '../../../types/swagger/model/usersReserveInfoDto';

const Cancellations = () => {
  const [cancelList, setCancelList] = useState<UsersReserveInfoDto[]>();
  const [noshowList, setNoshowList] = useState<UsersReserveInfoDto[]>();

  const getList = async () => {
    const cancelRes = await fetchTrainingReservation('CANCEL');
    setCancelList(cancelRes);
    const noshowRes = await fetchTrainingReservation('NOSHOW');
    setNoshowList(noshowRes);
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <p className="mb-4 text-lg font-semibold">취소 내역</p>
      <div className="grid grid-cols-2 gap-4">
        {cancelList?.map((item: UsersReserveInfoDto) => (
          <Cancellation info={item} />
        ))}
      </div>
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />
      <p className="mb-[1rem] text-lg font-semibold">노쇼 내역</p>
      <div className="grid grid-cols-2 gap-4">
        {noshowList?.map((item: UsersReserveInfoDto) => (
          <Cancellation info={item} />
        ))}
      </div>
    </div>
  );
};

export default Cancellations;
