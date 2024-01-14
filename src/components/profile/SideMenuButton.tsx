import React from 'react';

interface ISideMenuButtonProps {
  text: string;
}

const SideMenuButton = ({ text }: ISideMenuButtonProps) => {
  const menuHoverCSS = 'hover:bg-[#f1f1f1]';

  return (
    <button type="button" className={`h-16 border-t-[1px] ${menuHoverCSS}`}>
      {text}
    </button>
  );
};

export default SideMenuButton;
