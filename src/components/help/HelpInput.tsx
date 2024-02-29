import React, { useEffect, useRef } from 'react';

import { IInputProps } from '../../types/help';

function HelpInput({ onChange, error, className, ...rest }: IInputProps) {
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
      className={`${className} hover:outlined-none mt-2 h-10 w-full rounded bg-[#eeeeee] p-2 focus:outline-none ${
        isError && 'border border-red-400'
      } ${rest.disabled ? 'text-gray-500' : 'text-black'}`}
      onChange={onChange}
      {...rest}
    />
  );
}

export default HelpInput;
