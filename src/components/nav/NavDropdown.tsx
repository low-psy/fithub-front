import React, { useRef, useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { logout } from '../../apis/user';

import { TOGGLE_OPEN } from '../../redux/slices/profileDropdownSlice';
import DropdownMenu from '../btn/DropdownMenu';
import { errorFunc } from '../../utils/util';
import ProfileIcon from '../../assets/icons/ProfileIcon';

const NavDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuArray = ['프로필', '로그아웃'];

  const { isLogin } = useAppSelector((state) => state.user);

  const navMenuClickHandler = async (value: string) => {
    if (!isLogin) {
      return navigate('/login');
    }
    if (value === '프로필') {
      navigate('/user/profile');
      dispatch(TOGGLE_OPEN());
    } else if (value === '로그아웃') {
      try {
        const response = await logout();
        if (response && response.status === 200) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('expirationTime');
          navigate(0);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorFunc(error);
          navigate('/login');
        }
      }
    }
  };

  const toggleMenuClickHandler = () => {
    if (!isLogin) {
      navigate('/login');
    }
  };

  return (
    <DropdownMenu
      menuArray={menuArray}
      onMenuItemClick={navMenuClickHandler}
      onToggleMenuClick={toggleMenuClickHandler}
    >
      <ProfileIcon />
    </DropdownMenu>
  );
};

export default NavDropdown;
