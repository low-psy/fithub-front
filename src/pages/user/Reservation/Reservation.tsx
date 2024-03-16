import React, { useState } from 'react';
import testImg from '../../../assets/newpostFilter.png';
import { UsersReserveInfoDto } from '../../../types/swagger/model/usersReserveInfoDto';
import {
  cancelReservation,
  getTrainingReservation,
} from '../../../apis/trainig';
import { fetchTrainingReservation } from '../../../apis/user';
import ConfirmationModal from '../../../components/modal/ConfirmationModal';
import {
  convertDateWithDay,
  getYesterday,
  handleDateToString,
} from '../../../utils/util';

const ReservationStatusObj = {
  BEFORE: '예약완료',
  START: '시작',
  COMPLETE: '수업종료',
  CANCEL: '취소',
  NOSHOW: '노쇼',
};

interface IReservationProps {
  closed?: boolean;
  info: UsersReserveInfoDto;
  setReservationList: (newList: UsersReserveInfoDto[]) => void;
}

<<<<<<< HEAD
const Reservation = ({ closed, info }: IReservationProps) => {
  const { title, paymentDateTime, reserveDateTime, status } = info;
=======
const Reservation = ({
  closed,
  info,
  setReservationList,
}: IReservationProps) => {
  const {
    title,
    paymentDateTime,
    location,
    reserveDateTime,
    status,
    reservationId,
  } = info;
  const [cancelingInfo, setCancelingInfo] = useState<
    UsersReserveInfoDto | undefined
  >(undefined);
>>>>>>> 2ce28b9d5e2bc92f19f1e8a750a2f975badef154

  const openCancelModal = async () => {
    if (reservationId) {
      const { data } = await getTrainingReservation(reservationId);
      setCancelingInfo(data);
    }
  };

  const handleCancel = async () => {
    if (cancelingInfo && cancelingInfo.impUid && reservationId) {
      await cancelReservation(reservationId, cancelingInfo.impUid);
      const newReservationList: UsersReserveInfoDto[] =
        await fetchTrainingReservation();
      setReservationList(newReservationList);
    }
    setCancelingInfo(undefined);
  };

  const handleWriteReview = () => {
    console.log(reservationId, '++');
  };

  const cancelModalContent = () => {
    return (
      <div className="grid gap-4">
        <h1 className="text-xl font-semibold">예약 취소 내역</h1>
        <p>
          <span className="mr-3">제목:</span> {cancelingInfo?.title}
        </p>
        <p>
          <span className="mr-3">예약일:</span>
          {cancelingInfo?.paymentDateTime &&
            convertDateWithDay(cancelingInfo?.paymentDateTime)}
        </p>
        <p>
          {' '}
          <span className="mr-3">장소:</span>
          {cancelingInfo?.address}
        </p>
        <p>
          <span className="mr-3">수업일시:</span>
          {cancelingInfo?.reserveDateTime &&
            convertDateWithDay(cancelingInfo?.reserveDateTime)}
        </p>
        <p>
          <span className="mr-3">취소가능일시:</span>
          {cancelingInfo?.reserveDateTime &&
            convertDateWithDay(
              new Date(getYesterday(new Date(cancelingInfo?.reserveDateTime))),
            )}
          까지
        </p>
        <h1 className="mt-2 text-xl font-semibold">예약을 취소하시겠습니까?</h1>
      </div>
    );
  };

  return (
    <>
      <div className="flexflex-col border border-gray-300 text-sm shadow">
        {/* 제목 */}
        <div
          className={`flex h-[50px] w-full items-center justify-between p-4 font-semibold ${
            closed ? 'bg-gray-200' : 'bg-sub'
          }`}
        >
<<<<<<< HEAD
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
=======
          <p>{title}</p>
          <button
            type="button"
            onClick={closed ? handleWriteReview : openCancelModal}
            className="flex h-[30px] items-center rounded-full p-[10px]"
            style={{ background: closed ? '#E0D1FF' : '#fcaaaa' }}
          >
            {closed ? '리뷰 작성' : '취소'}
          </button>
        </div>
        {/* 내용 */}
        <div className=" flex flex-row px-4 py-10">
          <img src={testImg} alt="training_img" className="mr-4 w-32" />
          <div className="flex flex-col gap-2">
            <p className=" text-sm">
              <span className="text-gray-600">예약일: </span>
              {paymentDateTime && convertDateWithDay(paymentDateTime)}
            </p>
            <p className=" text-sm">
              <span className="text-gray-600">장소: </span>
              {location}
            </p>
            <p className=" text-sm">
              <span className="text-gray-600">수업일시: </span>
              {reserveDateTime && convertDateWithDay(reserveDateTime)}
            </p>
            <p className=" text-sm">
              <span className="text-gray-600">취소가능일시: </span>
              {reserveDateTime && convertDateWithDay(reserveDateTime)}까지
            </p>
            <p className=" text-sm">
              <span className="text-gray-600">상태: </span>
              {status && ReservationStatusObj[status]}
            </p>
          </div>
>>>>>>> 2ce28b9d5e2bc92f19f1e8a750a2f975badef154
        </div>
      </div>
      <ConfirmationModal
        isOpen={cancelingInfo !== undefined}
        onClose={() => setCancelingInfo(undefined)}
        onConfirm={handleCancel}
        confirmText="네"
        cancelText="아니요"
        children={cancelModalContent()}
      />
    </>
  );
};

export default Reservation;
