import React, { FC } from 'react';
import testImg from '../../../assets/newpostFilter.png';
import { UsersReserveInfoDto } from '../../../types/swagger/model/usersReserveInfoDto';

const ReservationStatusObj = {
  BEFORE: '예약완료',
  START: '시작',
  COMPLETE: '수업종료',
  CANCEL: '취소',
  NOSHOW: '노쇼',
};

// 2024-03-05 03:11:29 => 2024.03.05(화)
const convertDate = (date: Date) => {
  const dateObj = new Date(date);
  const isoStr = dateObj.toISOString();
  const newDate = isoStr.split('T')[0].split('-').join('.');
  const day = dateObj.getDay();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${newDate}(${days[day]})`;
};

interface IReservationProps {
  closed?: boolean;
  info: UsersReserveInfoDto;
}

const Reservation = ({ closed, info }: IReservationProps) => {
  const { title, paymentDateTime, reserveDateTime, status } = info;

  const handleCancle = () => {
    //
  };

  return (
    <div className="flex flex-col border border-gray-300 text-sm shadow">
      {/* 제목 */}
      <div
        className={`flex h-10 w-full items-center justify-between p-4 font-semibold ${
          closed ? 'bg-gray-300' : 'bg-sub'
        }`}
      >
        <p>{title}</p>
        <button
          type="button"
          onClick={handleCancle}
          className="h-[30px] w-[70px] rounded-full bg-red-200"
        >
          취소
        </button>
      </div>
      {/* 내용 */}
      <div className=" flex flex-row px-4 py-10">
        <img src={testImg} alt="training_img" className="mr-4 w-32" />
        <div className="flex flex-col gap-2">
          <p className=" text-sm">
            <span className="text-gray-600">예약일: </span>
            {paymentDateTime && convertDate(paymentDateTime)}
          </p>
          {/* <p className=" text-sm">
            <span className="text-gray-600">장소: </span>
            {location}
          </p> */}
          <p className=" text-sm">
            <span className="text-gray-600">수업일시: </span>
            {reserveDateTime && convertDate(reserveDateTime)}
          </p>
          <p className=" text-sm">
            <span className="text-gray-600">취소가능일시: </span>
            {reserveDateTime && convertDate(reserveDateTime)}
          </p>
          <p className=" text-sm">
            <span className="text-gray-600">상태: </span>
            {status && ReservationStatusObj[status]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
