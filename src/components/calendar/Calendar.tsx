import React, { useEffect, useState } from 'react';
import { TrainingAvailableDateDto } from '../../types/swagger/model/trainingAvailableDateDto';
import CalendarDay from './CalendarDay';
import { getDateString } from '../../utils/util';

export interface SelectedDates {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  id?: number | undefined;
}

interface CalendarProps {
  availableDates?: TrainingAvailableDateDto[];
  onSelectedDates?: (dates: SelectedDates) => void;
  onSelectedId?: (id: number | undefined) => void;
  singleDateSelect?: boolean;
  defaultStartDate?: string;
  defaultEndDate?: string;
  calendarClassName?: string;
  titleClassName?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  availableDates,
  onSelectedDates,
  singleDateSelect = false,
  defaultStartDate,
  defaultEndDate,
  onSelectedId,
  calendarClassName,
  titleClassName,
}) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: defaultStartDate || null,
    endDate: defaultEndDate || null,
    id: undefined,
  });

  useEffect(() => {
    if (defaultEndDate && defaultStartDate) {
      setSelectedDates({
        startDate: defaultStartDate,
        endDate: defaultEndDate,
      });
    }
  }, [defaultStartDate, defaultEndDate]);

  useEffect(() => {
    if (onSelectedDates) {
      onSelectedDates(selectedDates);
    } else if (onSelectedId) {
      onSelectedId(selectedDates.id);
    }
  }, [selectedDates, onSelectedDates, onSelectedId]);

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

  const handleDateClick = (day: number, id: number | undefined) => {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = getDateString(date);

    if (singleDateSelect) {
      setSelectedDates({ startDate: dateString, endDate: null, id });
    } else if (!selectedDates.startDate) {
      setSelectedDates({ startDate: dateString, endDate: null, id });
    } else if (!selectedDates.endDate) {
      if (selectedDates.startDate > dateString) {
        setSelectedDates({
          startDate: dateString,
          endDate: selectedDates.startDate,
          id,
        });
      } else {
        setSelectedDates({ ...selectedDates, endDate: dateString });
      }
    } else {
      setSelectedDates({ startDate: dateString, endDate: null, id });
    }
  };

  const isActiveDate = (dateString: string) => {
    if (!availableDates) {
      const date = new Date();
      return new Date(dateString) >= date;
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
    <div className={`space-y-8 rounded-md  bg-white  ${calendarClassName}`}>
      <div className="flex justify-between">
        <h1 className={`${titleClassName || 'text-xl font-bold '}`}>
          날짜 선택
        </h1>
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
          const availableDate = availableDates?.filter(
            (availableDate) => availableDate.date === dateString,
          );
          let id: number | undefined;
          if (availableDate && availableDate.length > 0) {
            id = availableDate[0].id;
          }

          return (
            <CalendarDay
              key={dateString}
              date={date}
              isActive={isActive}
              isSelected={isSelected}
              isRangeStart={isRangeStart}
              isRangeEnd={isRangeEnd}
              inRange={inRange}
              handleDateClick={() => handleDateClick(day, id)}
              selectedDates={selectedDates}
              id={id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
