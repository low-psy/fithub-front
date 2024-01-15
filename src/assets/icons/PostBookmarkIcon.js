import React from 'react';

export default function PostBookmarkIcon({ booked }) {
  let color = 'none';
  let stroke = 'black';
  if (booked) {
    color = 'black';
    stroke = 'black';
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="34"
      viewBox="0 0 26 34"
      fill={color}
    >
      <path
        d="M1 32.0122V4.4458C1 2.54274 2.53502 1 4.42857 1H21.5714C23.465 1 25 2.54274 25 4.4458V32.0122L14.854 25.4571C13.7246 24.7273 12.2754 24.7273 11.146 25.4571L1 32.0122Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
