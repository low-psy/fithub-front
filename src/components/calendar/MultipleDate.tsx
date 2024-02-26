import React, { useState } from 'react';
import FormLabel from '../form/FormLabel';
import HelpInput from '../help/HelpInput';

const MultipleDateInput = () => {
  const [dates, setDates] = useState(['']);

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
        {dates.map((date, index) => (
          <HelpInput
            placeholder="불가능한 날짜 입력하세요"
            name="unable_date"
            type="date"
            id="impossible_date"
            key={date}
            onChange={(e) => handleDateChange(index, e.target.value)}
            className="w-full rounded-xl bg-input_bg px-4 py-6 text-xl text-slate-700 outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 md:w-2/3 "
          />
        ))}
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
