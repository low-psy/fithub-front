import React from 'react';

import { ILabelProps } from '../../types/form';

function FormLabel({ htmlFor, text, children }: ILabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex flex-col text-[#7f7f7f] font-semibold w-full"
    >
      {text}
      {children}
    </label>
  );
}

export default FormLabel;
