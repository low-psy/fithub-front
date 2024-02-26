import React from 'react';
import { SubmitButtonProps } from '../../types/common';

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, className }) => {
  return (
    <button
      type="submit"
      className={`${className} h-full w-full rounded-3xl bg-sub px-4 py-3`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
