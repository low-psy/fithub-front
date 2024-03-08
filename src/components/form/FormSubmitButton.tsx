import React from 'react';
import { SubmitButtonProps } from '../../types/common';

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="submit"
      className={`${className}  w-full rounded-3xl bg-sub px-4 py-3`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
