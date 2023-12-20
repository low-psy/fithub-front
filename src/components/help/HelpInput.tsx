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
      className={`hover:outlined-none mt-2 h-10 w-full rounded bg-[#eaeaea] p-2 text-black focus:outline-none ${
        isError && 'border border-red-400'
      }`}
      value={value}
      onChange={onChange}
    />
  );
}

export default HelpInput;
