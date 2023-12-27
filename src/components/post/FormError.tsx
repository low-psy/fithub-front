import React from 'react';
import { DivProps } from '../../types/common';

const ErrorMessage: React.FC<DivProps> = ({ children, className }) => {
  return (
    <div className={`${className}  bg-accent_sub py-2 text-center text-accent`}>
      {children}
    </div>
  );
};
export default ErrorMessage;
