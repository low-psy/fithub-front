import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/fithub_logo.png';

const TrainerHeader = () => {
  const location = useLocation().pathname;
  let to = '/trainer/home';
  let isNew = false;
  if (location.startsWith('/trainer/new')) {
    isNew = true;
    to = '/';
  }
  return (
    <header>
      <div className="flex h-12 items-center justify-between">
        <Link
          to={to}
          className=" items-center p-2 md:flex md:basis-auto lg:basis-1/3"
        >
          <div className="w-12">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        {!isNew && (
          <button
            className="flex items-center rounded-full border-2 border-neutral-400 p-2"
            type="button"
          >
            <span className="material-symbols-outlined text-neutral-500">
              menu
            </span>
          </button>
        )}
      </div>
    </header>
  );
};

export default TrainerHeader;
