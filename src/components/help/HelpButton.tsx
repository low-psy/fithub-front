import React from 'react';
import { Link } from 'react-router-dom';

import { IDefaultButtonProps, ILinkButtonProps } from '../../types/help';

export function DefaultButton({ text, onClick }: IDefaultButtonProps) {
  return (
    <button
      type="button"
      className="bg-main h-10 rounded text-white text-xl font-semibold hover:bg-[#976fff] mt-2 whitespace-nowrap py-2 px-6 text-center leading-6"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function LinkButton({ to, text }: ILinkButtonProps) {
  return (
    <Link to={to} className="flex flex-col">
      <DefaultButton text={text} />
    </Link>
  );
}
