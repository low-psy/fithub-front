import React from 'react';

const CheckBoxInput: React.FC<{
  options: { text: string; value: string }[];
}> = ({ options }) => {
  return (
    <div className="space-y-4 text-lg font-bold">
      {options.map((option) => (
        <div key={option.text}>
          <input
            type="checkbox"
            id={option.text}
            name="categories"
            value={option.value}
            className="mr-2"
          />
          <label htmlFor={option.text}>{option.text}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxInput;
