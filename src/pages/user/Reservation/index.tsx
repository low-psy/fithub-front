import React, { useEffect, useState } from 'react';
import Reservation from './Reservation';
import { UsersReserveInfoDto } from '../../../types/swagger/model/usersReserveInfoDto';
import {
  fetchCompletedReservation,
  fetchTrainingReservation,
} from '../../../apis/user';

export interface ReservationType {
  reservationId: number;
  trainingId: number;
  title: string;
  reserveDateTime: string;
  location: string;
  paymentDateTime: string;
  modifiedDateTime: string;
  status: string;
}

const Reservations = () => {
  const [reservationList, setReservationList] = useState<UsersReserveInfoDto[]>(
    [],
  );
  const [completedReservationList, setCompletedReservationList] =
    useState<UsersReserveInfoDto[]>();

  const getReservations = async () => {
    const res: UsersReserveInfoDto[] = await fetchTrainingReservation('BEFORE');
    setReservationList(res);
    const completedRes = await fetchCompletedReservation();
    setCompletedReservationList(completedRes);
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">예약 내역</p>
      <div className="grid grid-cols-2 gap-4">
        {reservationList?.map((reservation: UsersReserveInfoDto) => (
          <Reservation info={reservation} setList={setReservationList} />
        ))}
      </div>
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />
      <p className="mb-[1rem] text-lg font-semibold">종료 내역</p>
      <div className="grid grid-cols-2 gap-4">
        {completedReservationList?.map((reservation: UsersReserveInfoDto) => (
          <Reservation
            closed
            info={reservation}
            setList={setCompletedReservationList}
          />
        ))}
      </div>
    </div>
  );
};

export default Reservations;
