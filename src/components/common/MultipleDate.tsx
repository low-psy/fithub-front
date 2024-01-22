import React, { useState } from 'react';
import PostInput from '../post/FormText';
import FormInput from '../post/FormInput';

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
      <PostInput
        spanText="불가능한 날짜를 입력하세요"
        htmlFor="impossible_date"
        titleText="불가능한 날짜 (선택)"
      >
        {dates.map((date, index) => (
          <FormInput
            placeholder="불가능한 날짜 입력하세요"
            name="unable_date"
            type="date"
            id="impossible_date"
            key={date}
            onChange={(e) => handleDateChange(index, e.target.value)}
          />
        ))}
      </PostInput>

      <button
        type="button"
        onClick={addDateInput}
        className="mt-4 rounded-xl bg-accent p-3 text-xl font-extrabold text-white md:ml-4 md:mt-0"
      >
        날짜 추가
      </button>
    </div>
  );
};

export default MultipleDateInput;
