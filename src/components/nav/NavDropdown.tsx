import React, { useRef, useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { logout } from '../../apis/user';

import { TOGGLE_OPEN } from '../../redux/slices/profileDropdownSlice';
import DropdownMenu from '../btn/DropdownMenu';
import { errorFunc } from '../../utils/util';
import ProfileIcon from '../../assets/icons/ProfileIcon';

const NavDropdown: React.FC<{ menuArray: string[]; iconString?: string }> = ({
  menuArray,
  iconString,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
          localStorage.removeItem('trainer');
          localStorage.removeItem('email');
          navigate(0);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorFunc(error);
          navigate('/login');
        }
      }
    } else if (value === '북마크한 게시물') {
      navigate('/post?booked=true');
    } else if (value === '좋아요한 게시글') {
      navigate('/post?liked=true');
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
      <span className="material-symbols-outlined nav  text-5xl">
        {iconString}
      </span>
    </DropdownMenu>
  );
};

export default NavDropdown;
