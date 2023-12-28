import React, { useEffect, useRef } from 'react';

import { IInputProps } from '../../types/form';

function FormInput({
  id,
  type,
  value,
  placeholder,
  onChange,
  error,
  disabled,
}: IInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.value);
  };

  const isError = !!error[id];
  const textColor = disabled ? 'text-gray-500' : 'text-black';

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
      className={`hover:outlined-none mt-2 h-10 rounded border bg-[#eaeaea] p-2 text-black focus:outline-none  ${
        isError && 'border border-red-400'
      } `}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

export default FormInput;
