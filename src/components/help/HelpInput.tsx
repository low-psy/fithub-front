import React, { useEffect, useRef } from 'react';

import { IInputProps } from '../../types/help';

function HelpInput({
  id,
  type,
  placeholder,
  value,
  onChange,
  error,
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
      className={`bg-[#eaeaea] rounded h-10 hover:outlined-none focus:outline-none p-2 text-black mt-2 w-full ${
        isError && 'border border-red-400'
      }`}
      value={value}
      onChange={onChange}
    />
  );
}

export default HelpInput;
