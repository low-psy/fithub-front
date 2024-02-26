import React from 'react';

interface ClickBtnProps {
  children: string;
  onClick: () => void;
}

const ClickBtn: React.FC<ClickBtnProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="h-full w-full rounded-full bg-gray-200 px-5 py-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ClickBtn;
