import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../components/calendar/Calendar';
import { formatPriceToKRW } from '../../utils/util';
import { TrainingAvailableDateDto } from '../../types/swagger/model/trainingAvailableDateDto';
import { TrainingAvailableTimeDto } from '../../types/swagger/model/trainingAvailableTimeDto';

interface ReservationSectionProps {
  availableDates: TrainingAvailableDateDto[] | undefined;
  onSelectDate: (id: number | undefined) => void;
  onTimeSelect: (id: number | undefined) => void;
  selectedDateId?: number;
  selectedTimeId?: number | null;
  price?: number;
  onPay: () => void;
  isLogin: boolean;
}

const ReservationSection: React.FC<ReservationSectionProps> = ({
  availableDates,
  onSelectDate,
  onTimeSelect,
  selectedDateId,
  selectedTimeId,
  price,
  onPay,
  isLogin,
}) => {
  const selectedDate = availableDates?.find(
    (date) => date.id === selectedDateId,
  );
  const enableTimes = selectedDate?.availableTimes?.filter(
    (time) => time.enabled,
  );

  const navigate = useNavigate();
  const goToLogIn = () => {
    navigate('/login');
  };

  return (
    <div className="w-[450px] shrink-0 space-y-8 rounded-md bg-white lg:w-[500px]">
      <h3 className="text-xl font-bold">트레이닝 예약</h3>
      <div className="rounded-md border-2 border-black p-8">
        <Calendar
          availableDates={availableDates}
          singleDateSelect
          onSelectedId={onSelectDate}
        />
      </div>
      {selectedDateId && enableTimes && enableTimes.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {enableTimes.map((time: TrainingAvailableTimeDto) => (
            <button
              key={time.id}
              type="button"
              className={`w-full rounded-md border-[2px] border-accent p-2 text-2xl font-semibold ${selectedTimeId === time.id ? 'bg-accent text-white' : 'bg-white'}`}
              onClick={() => onTimeSelect(time.id)}
            >
              {(time.time as string).slice(0, 5)}
            </button>
          ))}
        </div>
      )}

      {selectedTimeId && (
        <div className="space-y-4">
          <div className="block h-[1px] rounded-full bg-slate-300" />
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">총 합계</h3>
            <h3 className="text-lg font-bold">
              {price && formatPriceToKRW(price)}원
            </h3>
          </div>
          {isLogin ? (
            <button
              type="button"
              className="block w-full rounded-md bg-main p-4 text-center text-xl font-bold text-white"
              onClick={onPay}
            >
              트레이닝 결제하기
            </button>
          ) : (
            <button
              type="button"
              className="block w-full rounded-md bg-main p-4 text-center text-xl font-bold text-white"
              onClick={goToLogIn}
            >
              로그인
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservationSection;
