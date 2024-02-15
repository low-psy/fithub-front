import React, { useEffect, useState } from 'react';

interface IconComponentProps {
  children: string;
  iconColor?: string;
  onClick?: () => void;
  defaultState?: boolean;
}

const FloatRoundedIcon: React.FC<IconComponentProps> = ({
  children,
  iconColor,
  onClick,
  defaultState,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isStarFilled, setIsStarFilled] = useState(defaultState || false);

  useEffect(() => {
    setIsStarFilled(defaultState as boolean);
  }, [defaultState]);

  const handleIconClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 네비게이션이나 기본 동작 방지
    if (onClick) {
      onClick();
    }
    setIsStarFilled(!isStarFilled); // 아이콘 상태 토글
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150); // 애니메이션 후 상태 초기화
  };

  return (
    <button
      onClick={handleIconClick}
      className="absolute left-3 top-3"
      type="button"
    >
      <span
        className={`material-symbols-rounded  ${isStarFilled ? 'filled' : 'unfilled'}  font-main text-5xl sm:text-4xl ${iconColor || 'text-main'} transition-transform duration-150 ${isClicked ? 'scale-125' : 'scale-100'} opacity-75`}
      >
        {children}
      </span>
    </button>
  );
};

export default FloatRoundedIcon;
