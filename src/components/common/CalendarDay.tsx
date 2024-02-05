import React from 'react';
import { SelectedDates } from '../../redux/initialStates/initialStateTypes';

interface CalendarDayProps {
  date: Date;
  isActive: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  inRange: boolean;
  handleDateClick: (dateString: string) => void;
  selectedDates: SelectedDates;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isActive,
  isSelected,
  isRangeStart,
  isRangeEnd,
  inRange,
  handleDateClick,
  selectedDates,
}) => {
  let dayClass = `flex aspect-square items-center justify-center rounded-full ${
    isSelected ? 'bg-accent' : isActive ? '' : 'cursor-not-allowed opacity-30'
  }`;

  if (isRangeStart) {
    // 범위의 시작 부분에 대한 스타일
    if (isRangeEnd || !selectedDates.endDate) {
      // endDate가 없거나, startDate와 endDate가 같은 경우 (하나만 선택된 경우)
      dayClass += ' rounded-full';
    } else {
      // startDate와 다른 endDate가 있는 경우 (두 개 선택된 경우)
      dayClass += ' rounded-r-none';
    }
  } else if (isRangeEnd) {
    // 범위의 끝 부분에 대한 스타일
    dayClass += ' rounded-l-none';
  } else if (inRange) {
    // 선택 범위 내에 있지만 시작 또는 끝이 아닌 경우
    dayClass += ' bg-accent rounded-none opacity-30';
  }

  const dateString = date.toISOString().split('T')[0];
  return (
    <button
      className={dayClass}
      disabled={!isActive}
      onClick={() => handleDateClick(dateString)}
      type="button"
    >
      {date.getDate()}
    </button>
  );
};

export default CalendarDay;
