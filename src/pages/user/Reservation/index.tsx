import React, { useEffect, useState } from 'react';
import Reservation from './Reservation';
import { UsersReserveInfoDto } from '../../../types/swagger/model/usersReserveInfoDto';
import { fetchTrainingReservation } from '../../../apis/user';

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
  const getReservations = async () => {
    const res: UsersReserveInfoDto[] = await fetchTrainingReservation();
    setReservationList(res);
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">예약 내역</p>
      <div className="flex flex-row gap-4">
        {reservationList?.map((reservation: UsersReserveInfoDto) => (
          <Reservation info={reservation} />
        ))}
      </div>
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />
      <p className="text-lg font-semibold">종료 내역</p>
      <div className="flex flex-row flex-wrap gap-4">
        {/* <Reservation closed /> */}
      </div>
    </div>
  );
};

export default Reservations;
