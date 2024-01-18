import React, { useEffect, useRef, useState } from 'react';

interface DropdownMenuProps {
  onMenuItemClick: (value: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onMenuItemClick }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
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
    <div className="relative" ref={menuRef}>
      <button type="button" className="" onClick={toggleMenu}>
        <span className="material-symbols-outlined text-zinc-500">
          more_vert
        </span>
      </button>
      {showMenu && (
        <ul className="absolute right-3 z-20 w-36 bg-white shadow-md">
          {['수정하기', '삭제하기'].map((value) => (
            <li
              key={value}
              className="p-2 hover:bg-slate-50"
              onClick={() => onMenuItemClick(value)}
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
