import React from 'react';
import { Link } from 'react-router-dom';

interface ISideMenuButtonProps {
  text: string;
  to: string;
  clicked: boolean;
}

const SideMenuButton = ({ text, to, clicked }: ISideMenuButtonProps) => {
  const menuHoverCSS = 'hover:bg-[#f1f1f1]';
  const clickedCSS = clicked && 'bg-[#f1f1f1]';

  return (
    <Link to={to}>
      <button
        type="button"
        className={`h-16 border-t-[1px] ${menuHoverCSS} w-full ${clickedCSS}`}
      >
        {text}
      </button>
    </Link>
  );
};

export default SideMenuButton;
