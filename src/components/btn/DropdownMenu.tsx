import React, { useEffect, useRef, useState } from 'react';

interface DropdownMenuProps {
  onMenuItemClick: (value: string) => void;
  menuArray: string[];
  children?: any;
  onToggleMenuClick?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onMenuItemClick,
  menuArray,
  children,
  onToggleMenuClick,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu((prev) => !prev);
    if (onToggleMenuClick) {
      onToggleMenuClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <button type="button" className="" onClick={toggleMenu}>
        {children || (
          <span className="material-symbols-outlined text-zinc-500">
            more_vert
          </span>
        )}
      </button>
      {showMenu && (
        <ul className="absolute right-7 top-0 z-20 w-36 overflow-hidden rounded-lg  bg-white shadow-md">
          {menuArray.map((value) => (
            <li
              key={value}
              className="p-2 hover:bg-accent_sub"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onMenuItemClick(value);
                setShowMenu(false);
              }}
              onKeyDown={() => onMenuItemClick(value)}
              role="presentation"
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
