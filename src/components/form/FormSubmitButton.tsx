import React from 'react';

import { IFormSubmitButtonProps } from '../../types/form';

function FormSubmitButton({ text, className }: IFormSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`bg-main h-12 rounded text-white text-xl font-semibold hover:bg-[#976fff] mt-2 ${className}`}
    >
      {text}
    </button>
  );
}

export default FormSubmitButton;
