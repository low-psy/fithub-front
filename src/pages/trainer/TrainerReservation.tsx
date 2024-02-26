import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { TrainersReserveInfoDto } from '../../types/swagger/model/trainersReserveInfoDto';
import { formatPriceToKRW } from '../../utils/util';
import DefaultModal from '../../components/modal/DefaultModal';
import { postTrainerNoShow } from '../../apis/trainig';

const TrainerReservation: React.FC<{
  session: TrainersReserveInfoDto;
  selectedBtnId: number;
}> = ({ session, selectedBtnId }) => {
  const dateTime = new Date(session.trainingDateTime as Date);
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  const time = dateTime.getHours();
  const timeString = time <= 12 ? `오전 ${time}시` : `오후 ${time - 12}시`;
  const { trainingId } = session;
  const navigate = useNavigate();

  const [isNoShowModal, setIsNoShowModal] = useState<boolean>(false);

  const noShowClkHandler = async () => {
    try {
      const res = await postTrainerNoShow(trainingId as number);
      if (res.status === 200) {
        navigate('/trainer/home');
        setIsNoShowModal(false);
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
        navigate('/trainer/home');
      } else {
        alert('존재하지 않는 예약압니다');
        navigate('/trainer/home');
      }
    }
  };
  return (
    <>
      <div
        key={trainingId}
        className={`rounded-xl ${(selectedBtnId === 3 || selectedBtnId === 4) && 'opacity-50 '}  ${selectedBtnId === 1 && 'bg-sub'} bg-white  p-4 shadow-lg hover:opacity-100 ${selectedBtnId !== 3 && 'pointer-events-none'}`}
        onClick={() => {
          if (selectedBtnId !== 3) {
            return;
          }
          return setIsNoShowModal(true);
        }}
        role="presentation"
      >
        <p className="mb-6 text-2xl font-extrabold">{session.userName}</p>
        <div className="space-y-4">
          <div className="flex justify-between">
            <h2 className="flex items-center gap-x-1">
              <span className="material-symbols-rounded">calendar_month</span>
              예약일
            </h2>
            <p className="text-xl font-bold">{`${month}월 ${date}일`}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="flex items-center gap-x-1">
              <span className="material-symbols-rounded">schedule</span>
              예약시간
            </h2>
            <p className="text-xl font-bold">{timeString}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="flex items-center gap-x-1">
              <span className="material-symbols-rounded">sell</span>
              예약금액
            </h2>
            <p className="text-xl font-bold">
              {formatPriceToKRW(session.price as number)}원
            </p>
          </div>
        </div>
      </div>
      {selectedBtnId === 3 && (
        <DefaultModal
          isOpen={isNoShowModal}
          onClose={() => setIsNoShowModal(false)}
        >
          <div className="space-y-6 p-2 pr-4">
            <h2>
              회원님께서 트레이닝에 참석하지 않으셔서 노쇼 처리를 원하시나요?
            </h2>
            <div className="-mb-4 -mr-2 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-full bg-gray-300 px-8 py-2"
                onClick={noShowClkHandler}
              >
                네
              </button>
              <button
                type="button"
                className="rounded-full bg-accent_sub px-8 py-2"
                onClick={() => setIsNoShowModal(false)}
              >
                아니요
              </button>
            </div>
          </div>
        </DefaultModal>
      )}
    </>
  );
};

export default TrainerReservation;
