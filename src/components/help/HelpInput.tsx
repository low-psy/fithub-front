import React, { useEffect, useRef } from 'react';

import { IInputProps } from '../../types/help';

function HelpInput({
  id,
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  className,
}: IInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const isError = !!error;

  useEffect(() => {
    if (isError && ref.current != null) {
      ref.current.focus();
    }
  }, [isError]);

  return (
    <input
      ref={ref}
      id={id}
      type={type}
      placeholder={placeholder}
      className={`${className} hover:outlined-none mt-2 h-10 w-full rounded bg-[#eeeeee] p-2 focus:outline-none ${
        isError && 'border border-red-400'
      } ${disabled ? 'text-gray-500' : 'text-black'}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

export default HelpInput;
