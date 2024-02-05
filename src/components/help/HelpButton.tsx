import React from 'react';
import { Link } from 'react-router-dom';

import { IDefaultButtonProps, ILinkButtonProps } from '../../types/help';

export function DefaultButton({ text, onClick }: IDefaultButtonProps) {
  return (
    <button
      type="button"
      className="h-12 w-full whitespace-nowrap rounded bg-main py-2 text-lg font-semibold text-white hover:bg-[#976fff] md:text-xl"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export function LinkButton({ to, text }: ILinkButtonProps) {
  return (
    <Link to={to} className="flex w-full flex-col">
      <DefaultButton text={text} />
    </Link>
  );
}
