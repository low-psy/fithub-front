import React from 'react';
import { SubmitButtonProps } from '../../models/utility';

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, className }) => {
  return (
    <button
      type="submit"
      className={`${className}  rounded-3xl bg-sub px-4 py-2`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
