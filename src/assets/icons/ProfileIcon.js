import React from 'react';
import { useDispatch } from 'react-redux';

import { TOGGLE_OPEN } from '../../redux/slices/profileDropdownSlice';

export default function ProfileIcon() {
  const dispatch = useDispatch();

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => dispatch(TOGGLE_OPEN())}
      className="cursor-pointer"
    >
      <path
        d="M24.6673 2C12.1485 2 2 12.1485 2 24.6673C2 37.186 12.1485 47.3346 24.6673 47.3346C37.186 47.3346 47.3346 37.186 47.3346 24.6673C47.3346 12.1485 37.186 2 24.6673 2Z"
        stroke="black"
        strokeWidth="3.4001"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.14771 39.0513C7.14771 39.0513 12.2003 32.6008 24.6673 32.6008C37.1343 32.6008 42.1871 39.0513 42.1871 39.0513"
        stroke="black"
        strokeWidth="3.4001"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.6674 24.6673C28.4231 24.6673 31.4676 21.6228 31.4676 17.8671C31.4676 14.1115 28.4231 11.0669 24.6674 11.0669C20.9116 11.0669 17.8672 14.1115 17.8672 17.8671C17.8672 21.6228 20.9116 24.6673 24.6674 24.6673Z"
        stroke="black"
        strokeWidth="3.4001"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
