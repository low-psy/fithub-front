import React, { useEffect, useRef } from 'react';

import { IInputProps } from '../../types/form';

function FormInput({
  id,
  type,
  value,
  placeholder,
  onChange,
  error,
}: IInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.value);
  };

  const isError = !!error[id];

  useEffect(() => {
    if (isError) {
      ref.current?.focus();
    }
  }, [isError]);

  return (
    <input
      ref={ref}
      id={id}
      type={type}
      placeholder={placeholder}
      className={`bg-[#eaeaea] rounded h-10 hover:outlined-none focus:outline-none p-2 text-black mt-2 border  ${
        isError && 'border border-red-400'
      }`}
      value={value}
      onChange={handleChange}
    />
  );
}

export default FormInput;
