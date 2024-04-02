import React from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { TrainersReserveInfoDto } from '../../types/swagger/model/trainersReserveInfoDto';
import { formatPriceToKRW } from '../../utils/util';
import DefaultModal from '../../components/modal/DefaultModal';
import { postTrainerNoShow } from '../../apis/trainig';
import useModal from '../../hooks/useModal';
import ConfirmationModal from '../../components/modal/ConfirmationModal';
import ReservationItem from './ReservationItem';

const TrainerReservation: React.FC<{
  session: TrainersReserveInfoDto;
  selectedBtnId: number;
}> = ({ session, selectedBtnId }) => {
  const dateTime = new Date(session.trainingDateTime as Date);
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  const time = dateTime.getHours();
  const timeString = time <= 12 ? `오전 ${time}시` : `오후 ${time - 12}시`;
  const { trainingId, reservationId } = session;
  const navigate = useNavigate();

  const noShowModal = useModal(); // 수정 모달 상태 관리

  const modlaToggleHandler = (selectedBtnId: number) => {
    if (selectedBtnId === 3) {
      noShowModal.toggle();
    }
  };

  const noShowClkHandler = async () => {
    try {
      const res = await postTrainerNoShow(reservationId as number);
      if (res.status === 200) {
        navigate(0);
        noShowModal.toggle();
      } else {
        throw new Error(`Server is Troubling : ${res.status}`);
      }
    } catch (error) {
      const err = error as AxiosError<unknown>;
      const status = err.response?.status;
      if (status === 401) {
        alert('로그인한 사용자만 사용 가능한 기능입니다');
        navigate('/');
      } else if (status === 403) {
        alert('트레이너 권한이 없는 사용자 입니다.');
        navigate('/');
      } else if (status === 400) {
        alert(
          '트레이닝이 예정 중이거나 진행중입니다. 트레이닝이 완료된 후 다시 시도해 주세요',
        );
        navigate(0);
      } else {
        alert('존재하지 않는 예약압니다');
        navigate(0);
      }
    }
  };
  return (
    <>
      <div
        key={trainingId}
        className={`rounded-xl ${selectedBtnId === 3 && 'opacity-50 '}  ${selectedBtnId === 1 && 'bg-sub'} bg-white  p-4 shadow-lg hover:opacity-100`}
        onClick={() => modlaToggleHandler(selectedBtnId)}
        role="presentation"
      >
        <p className="mb-6  truncate text-2xl font-extrabold">
          {session.title}
        </p>
        <div className="space-y-4">
          <ReservationItem
            title="예약자 이름"
            value={session.userName}
            iconString="badge"
          />
          <ReservationItem
            title="예약일"
            value={`${month}월 ${date}일`}
            iconString="calendar_month"
          />
          <ReservationItem
            title="예약시간"
            value={timeString}
            iconString="schedule"
          />
          <ReservationItem
            title="예약금액"
            value={`${formatPriceToKRW(session.price as number)}원`}
            iconString="sell"
          />
        </div>
      </div>
      <ConfirmationModal
        isOpen={noShowModal.isOpen}
        onClose={noShowModal.toggle}
        onConfirm={() => noShowClkHandler()}
        confirmText="네"
      >
        해당 예약을 회원님이 방문하지 않으셨나요?
      </ConfirmationModal>
    </>
  );
};

export default TrainerReservation;
