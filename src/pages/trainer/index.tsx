import React, { useState } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { AxiosError } from 'axios';
import SelectableButtons from '../../components/common/SelectedBtn';
import { LoaderData } from '../../types/training';
import { getTrainersReserve } from '../../apis/trainig';
import { formatPriceToKRW } from '../../utils/util';
import TrainerReservation from '../../components/trainer/TrainerRservation';
import TrainerNotReservation from '../../components/trainer/TrainerNotReservation';

export const loader = (async () => {
  try {
    const response = await getTrainersReserve();
    if (response && response.status === 200) {
      return response;
    }
    throw new Error('server is troubling');
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

const TrainerHome = () => {
  const res = useLoaderData() as LoaderData<typeof loader>;
  const [selectedButtonId, setSelectedButtonId] = useState<number>(1);
  const bookBtnHandler = (id: number) => {
    setSelectedButtonId(id);
  };
  let isNotFilteredText;
  // 선택된 id에 따라 필터링 조건 설정
  const statusFilter = (id: number) => {
    switch (id) {
      case 1:
        isNotFilteredText = '현재 진행중인 트레이닝이 없습니다';
        return 'START';
      case 2:
        isNotFilteredText = '예정된 트레이닝이 없습니다';
        return 'BEFORE';
      case 3:
        isNotFilteredText = '취소된 트레이닝이 없습니다';
        return 'COMPLETE';
      case 4:
        isNotFilteredText = '노쇼한 트레이닝이 없습니다';
        return 'NOSHOW';
      default:
        return '';
    }
  };
  const filteredData = res.data.content?.filter(
    (session) => session.status === statusFilter(selectedButtonId),
  );
  return (
    <div className="mx-8">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">예약</h1>
        <div className="flex gap-x-1">
          <SelectableButtons
            id={1}
            selectedBtnId={selectedButtonId}
            onClick={bookBtnHandler}
          >
            진행
          </SelectableButtons>
          <SelectableButtons
            id={2}
            selectedBtnId={selectedButtonId}
            onClick={bookBtnHandler}
          >
            예정
          </SelectableButtons>
          <SelectableButtons
            id={3}
            selectedBtnId={selectedButtonId}
            onClick={bookBtnHandler}
          >
            종료
          </SelectableButtons>
          <SelectableButtons
            id={4}
            selectedBtnId={selectedButtonId}
            onClick={bookBtnHandler}
          >
            노쇼
          </SelectableButtons>
        </div>
        <div className="relative min-h-[200px] space-y-2 rounded-lg bg-gray-200 p-8">
          {selectedButtonId === 3 && (
            <h3 className="break-keep text-main">
              *회원님이 트레이닝에 참석하지 않으셨다면 진행 완료된 트레이닝을
              노쇼 처리 해주세요*
            </h3>
          )}
          {filteredData && filteredData.length < 1 && (
            <TrainerNotReservation>
              <div className="space-y-2 text-center">
                <span className="material-symbols-rounded">no_backpack</span>
                <h2>{isNotFilteredText}</h2>
              </div>
            </TrainerNotReservation>
          )}
          <div className="grid grid-cols-1 gap-6  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData &&
              filteredData.map((session) => {
                return (
                  <TrainerReservation
                    selectedBtnId={selectedButtonId}
                    session={session}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainerHome;
