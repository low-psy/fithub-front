import React from 'react';
import { Link } from 'react-router-dom';

import { IDefaultButtonProps, ILinkButtonProps } from '../../types/help';

export function DefaultButton({ text, onClick }: IDefaultButtonProps) {
  return (
    <button
      type="button"
      className="mt-2 h-10 whitespace-nowrap rounded bg-main px-6 py-2 text-center text-xl font-semibold leading-6 text-white hover:bg-[#976fff]"
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
