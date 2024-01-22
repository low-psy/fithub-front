import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: any;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button" className=" ">
      {children}
    </button>
  );
};

export default Button;
