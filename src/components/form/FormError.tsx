import React from 'react';
import { DivProps } from '../../types/common';

const FormError: React.FC<DivProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} rounded-md bg-accent_sub py-2 text-center text-lg font-bold text-accent`}
    >
      {children}
    </div>
  );
};
export default FormError;
