import React from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';

import { logout } from '../../apis/user';

import { TOGGLE_OPEN } from '../../redux/slices/profileDropdownSlice';

const NavDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      navigate('/');
      const response = await logout();
      if (response && response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      }
    }
  };

  return (
    <div className="absolute right-0 z-50 mt-1 rounded bg-white pt-2 shadow-md">
      <ul className="whitespace-nowrap text-center font-semibold">
        <li
          className="mb-2 w-full cursor-pointer rounded px-4 py-2 hover:bg-sub"
          onClick={() => {
            navigate('/user/profile');
            dispatch(TOGGLE_OPEN());
          }}
          aria-hidden
        >
          프로필
        </li>
        <li
          className="mb-2 w-full cursor-pointer rounded px-4 py-2 hover:bg-sub"
          onClick={handleLogout}
          aria-hidden
        >
          로그아웃
        </li>
      </ul>
    </div>
  );
};

export default NavDropdown;
