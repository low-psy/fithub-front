import React from 'react';

interface ClickBtnProps {
  children: any;
  onClick: () => void;
  className?: string;
}

const ClickBtn: React.FC<ClickBtnProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default ClickBtn;
