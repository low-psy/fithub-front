import React, { useEffect, useState } from 'react';
import FormLabel from '../form/FormLabel';
import HelpInput from '../help/HelpInput';

const MultipleDateInput: React.FC<{ unableDates?: string[] }> = ({
  unableDates,
}) => {
  const [dates, setDates] = useState(unableDates || ['']);

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const addDateInput = () => {
    setDates([...dates, '']);
  };

  return (
    <div>
      <FormLabel htmlFor="impossible_date">
        {dates.map((date, index) => {
          let isDisabled = false;
          if (unableDates) {
            if (index < unableDates.length) {
              isDisabled = true;
            }
          }
          return (
            <HelpInput
              placeholder="불가능한 날짜 입력하세요"
              name="unable_date"
              type="date"
              id="impossible_date"
              key={date}
              onChange={(e) => handleDateChange(index, e.target.value)}
              className={`${isDisabled && 'opacity-50'} w-full rounded-xl bg-input_bg px-4 py-6 text-xl text-slate-700 outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 md:w-2/3 `}
              defaultValue={date}
              disabled={isDisabled}
            />
          );
        })}
      </FormLabel>

      <button
        type="button"
        onClick={addDateInput}
        className="mt-4 rounded-xl bg-accent p-3 text-xl font-extrabold text-white md:ml-3"
      >
        날짜 추가
      </button>
    </div>
  );
};

export default MultipleDateInput;
