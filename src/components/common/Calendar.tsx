import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TrainingAvailableDateDto } from '../../types/swagger/model/trainingAvailableDateDto';
import { SET_SELECTED_DATE } from '../../redux/slices/paymentSlice';
import CalendarDay from './CalendarDay';

interface SelectedDates {
  startDate: string | null;
  endDate: string | null;
}

interface CalendarProps {
  availableDates?: TrainingAvailableDateDto[];
  onSelectedDates?: (dates: SelectedDates) => void;
  singleDateSelect?: boolean;
  defaultStartDate?: string;
  defaultEndDate?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  availableDates,
  onSelectedDates,
  singleDateSelect = false,
  defaultStartDate,
  defaultEndDate,
}) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: defaultStartDate || null,
    endDate: defaultEndDate || null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (onSelectedDates) {
      onSelectedDates?.(selectedDates);
    } else {
      dispatch(SET_SELECTED_DATE(selectedDates));
    }
  }, [selectedDates, dispatch, onSelectedDates]);

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentYear, currentMonth + delta);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
  };

  // 현재 달의 첫 날과 마지막 날을 구합니다.
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  // 첫 날의 요일 인덱스와 마지막 날짜를 구합니다.
  const firstDayIndex = firstDayOfMonth.getDay();
  const lastDateOfMonth = lastDayOfMonth.getDate();

  // 달력에 표시할 날짜 배열을 생성합니다.
  const datesOfMonth = Array.from({ length: lastDateOfMonth }, (_, i) => i + 1);

  const getDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = getDateString(date);

    if (singleDateSelect) {
      setSelectedDates({ startDate: dateString, endDate: null });
    } else if (!selectedDates.startDate) {
      setSelectedDates({ startDate: dateString, endDate: null });
    } else if (!selectedDates.endDate) {
      if (selectedDates.startDate > dateString) {
        setSelectedDates({
          startDate: dateString,
          endDate: selectedDates.startDate,
        });
      } else {
        setSelectedDates({ ...selectedDates, endDate: dateString });
      }
    } else {
      setSelectedDates({ startDate: dateString, endDate: null });
    }
  };

  const isActiveDate = (dateString: string) => {
    if (!availableDates) {
      return true;
    }
    return availableDates?.some((d) => d.date === dateString && d.enabled);
  };

  const isSelectedDate = (date: string) => {
    return date === selectedDates.startDate || date === selectedDates.endDate;
  };

  const isInRange = (dateString: string) => {
    const date = new Date(dateString);
    const startDate = selectedDates.startDate
      ? new Date(selectedDates.startDate)
      : null;
    const endDate = selectedDates.endDate
      ? new Date(selectedDates.endDate)
      : null;

    if (startDate && endDate) {
      return date > startDate && date < endDate;
    }
    return false;
  };

  return (
    <div className="space-y-8 rounded-md  bg-white p-6 drop-shadow-md ">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">날짜 선택</h1>
        <div className="flex items-center ">
          <button
            className="inline-block"
            type="button"
            onClick={() => changeMonth(-1)}
          >
            <span className="material-symbols-outlined flex items-center ">
              navigate_before
            </span>
          </button>
          <div>
            {currentYear}년 {currentMonth + 1}월
          </div>
          <button
            className="flex items-center"
            type="button"
            onClick={() => changeMonth(1)}
          >
            <span className="material-symbols-outlined ">navigate_Next</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 ">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex aspect-square items-center justify-center rounded-full "
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayIndex }).map((v) => (
          <div key={`empty-start-${v}`} className="text-center " /> // 첫 주의 비어있는 날짜
        ))}
        {datesOfMonth.map((day) => {
          const date = new Date(currentYear, currentMonth, day);
          const dateString = getDateString(date);
          const isActive = isActiveDate(dateString);
          const isSelected = isSelectedDate(dateString);
          const isRangeStart = selectedDates.startDate === dateString;
          const isRangeEnd = selectedDates.endDate === dateString;
          const inRange = isInRange(dateString);

          return (
            <CalendarDay
              key={day}
              date={date}
              isActive={isActive}
              isSelected={isSelected}
              isRangeStart={isRangeStart}
              isRangeEnd={isRangeEnd}
              inRange={inRange}
              handleDateClick={() => handleDateClick(day)}
              selectedDates={selectedDates}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
