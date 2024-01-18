import React from 'react';

export default function HeartIcon({ liked }) {
  let color = 'none';
  let stroke = 'black';
  if (liked) {
    color = 'red';
    stroke = 'red';
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="31"
      viewBox="0 0 34 31"
      fill={color}
    >
      <path
        d="M33 10.3796C33 12.8539 32.0499 15.2306 30.3533 16.9886C26.4478 21.0368 22.6598 25.2581 18.6085 29.1595C17.6798 30.0408 16.2067 30.0086 15.3181 29.0875L3.64601 16.9886C0.117996 13.3315 0.117996 7.42757 3.64601 3.77051C7.2087 0.0775195 13.0127 0.0775195 16.5754 3.77051L16.9997 4.21027L17.4237 3.77077C19.1318 1.9992 21.4582 1 23.8885 1C26.3187 1 28.645 1.9991 30.3533 3.77051C32.0501 5.52872 33 7.90523 33 10.3796Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
