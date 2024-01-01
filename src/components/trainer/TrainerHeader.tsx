import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/fithub_logo.png';

const TrainerHeader = () => {
  const location = useLocation();
  return (
    <header className="h-14 ">
      <div className="flex h-full justify-between">
        <img src={logo} alt="logo" className="h-full" />
        {location.pathname === '/trainer/home' ? (
          <Link
            to="/trainer/become-trainer"
            className="flex items-center rounded-md bg-main px-16 text-2xl font-extrabold text-white"
          >
            트레이너 생성하기
          </Link>
        ) : (
          <Link to="trainer/home" className="flex items-center">
            처음으로 돌아가기
          </Link>
        )}
      </div>
    </header>
  );
};

export default TrainerHeader;
