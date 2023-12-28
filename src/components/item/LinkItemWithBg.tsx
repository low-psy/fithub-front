import React from 'react';
import { Link } from 'react-router-dom';
import { LinkButtonProps } from '../../types/common';

const FilterItem: React.FunctionComponent<LinkButtonProps> = ({
  bg,
  to,
  children,
}) => {
  return (
    <Link
      to={to}
      style={{ backgroundImage: `url(${bg})` }}
      className="bg flex h-full w-full items-center justify-center rounded-xl bg-cover bg-center text-2xl font-extrabold text-white drop-shadow-2xl xl:text-3xl"
    >
      {children}
    </Link>
  );
};

export default FilterItem;
