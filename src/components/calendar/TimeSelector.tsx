import React, { useState } from 'react';

const TimeSelector: React.FC<{ inputName: string; defaultTime?: string }> = ({
  inputName,
  defaultTime,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>(
    defaultTime || '06:00:00',
  );

  const generateTimes = () => {
    const times: { label: string; value: string }[] = []; // value를 string으로 변경
    for (let hour = 6; hour <= 24; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      const label = hour <= 12 ? `오전 ${hour}시` : `오후 ${hour - 12}시`;
      const value = `${formattedHour}:00:00`; // value를 "HH:00:00" 형식의 문자열로 설정
      times.push({ label, value });
    }
    return times;
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value); // 선택된 value를 직접 사용
    console.log(event.target.value);
  };

  return (
    <div className="mt-5 space-y-3">
      <h2>{inputName === 'startHour' ? '시작 시간' : '종료 시간'}</h2>
      <select
        id={inputName}
        value={selectedTime}
        onChange={handleTimeChange}
        name={inputName}
        className="w-full rounded-xl bg-input_bg px-4 py-4 text-xl text-slate-700 outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 md:w-2/3"
      >
        {generateTimes().map((time) => (
          <option key={time.label} value={time.value}>
            {time.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelector;
