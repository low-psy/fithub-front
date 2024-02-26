import React from 'react';

import { ILabelProps } from '../../types/form';

function FormLabel({ htmlFor, text, children }: ILabelProps) {
  return (
    <label htmlFor={htmlFor} className="font-semibold text-[#7f7f7f]">
      {text}
      {children}
    </label>
  );
}

export default FormLabel;
