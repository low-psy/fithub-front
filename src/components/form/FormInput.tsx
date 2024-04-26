import React, { useEffect, useRef } from 'react';

import { IInputProps } from '../../types/form';

function FormInput({ error, isTextArea, className, ...rest }: IInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (rest.onChange) {
      rest.onChange(rest.id, event.target.value);
    }
  };

  const isError = !!error?.[rest.id];
  const textColor = rest.disabled ? 'text-gray-400' : 'text-gray-700';

  useEffect(() => {
    if (isError) {
      ref.current?.focus();
    }
  }, [isError]);

  if (isTextArea) {
    return (
      <textarea
        id={rest.id}
        placeholder={rest.placeholder}
        className={`${className} hover:outlined-none mt-2 h-40 rounded border bg-[#eaeaea] p-2 focus:outline-none  ${
          isError && 'border-2 border-accent '
        } ${textColor} w-full`}
        disabled={rest.disabled}
        defaultValue={rest.defaultValue}
        name={rest.name}
      />
    );
  }

  return (
    <input
      {...rest}
      ref={ref}
      className={`${className}  hover:outlined-none mt-2 h-10 rounded border bg-[#eaeaea] p-2 focus:outline-none  ${
        isError && 'border-2 border-accent'
      } ${textColor} w-full`}
      onChange={handleChange}
      value={rest.value}
    />
  );
}

export default FormInput;
