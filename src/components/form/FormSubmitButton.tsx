import React from 'react';

import { IFormSubmitButtonProps } from '../../types/form';

function FormSubmitButton({ text, className }: IFormSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`mt-2 h-12 rounded bg-main text-xl font-semibold text-white hover:bg-[#976fff] ${className} w-full`}
    >
      {text}
    </button>
  );
}

export default FormSubmitButton;
