import React from 'react';

import { IErrorTextProps, IFormErrorProps } from '../../types/form';

export function ErrorText({ text }: IErrorTextProps) {
  return <p className="text-sm md:text-base text-red-400 ">{text}</p>;
}

function FormError({ children }: IFormErrorProps) {
  // return <div className="h-[12px] sm:h-[20px]">{children}</div>;
  return <div className="">{children}</div>;
}

export default FormError;
