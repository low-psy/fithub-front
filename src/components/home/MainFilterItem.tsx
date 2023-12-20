import React from 'react';
import { Link } from 'react-router-dom';
import { LinkButtonProps } from '../../models/utility';

const MainFilterItem: React.FunctionComponent<LinkButtonProps> = ({
  children,
  bg,
  to,
}) => {
  return (
    <Link
      className="bg flex h-full w-full items-center justify-center rounded-xl bg-cover bg-center text-2xl font-extrabold text-white drop-shadow-2xl xl:text-3xl"
      style={{ backgroundImage: `url(${bg}` }}
      to={to}
    >
      {children}
    </Link>
  );
};

export default MainFilterItem;
