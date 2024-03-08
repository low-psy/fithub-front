import React, { useEffect, useState } from 'react';

interface IconComponentProps {
  children: string;
  iconColor?: string;
  onClick?: () => void;
  defaultState?: boolean;
}

const RoundedIcon: React.FC<IconComponentProps> = ({
  children,
  iconColor,
  onClick,
  defaultState,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isIconFilled, setIsIconFilled] = useState(defaultState || false);

  useEffect(() => {
    if (defaultState) {
      setIsIconFilled(defaultState);
    }
  }, [defaultState]);

  const handleIconClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 네비게이션이나 기본 동작 방지
    if (onClick) {
      onClick();
    }
    setIsIconFilled(!isIconFilled); // 아이콘 상태 토글
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150); // 애니메이션 후 상태 초기화
  };

  return (
    <button
      onClick={handleIconClick}
      type="button"
      className="  flex align-top"
    >
      <span
        className={`material-symbols-rounded  ${isIconFilled ? 'filled' : 'unfilled'}  font-main text-5xl ${iconColor} transition-transform duration-150 ${isClicked ? 'scale-125' : 'scale-100'}  opacity-75`}
      >
        {children}
      </span>
    </button>
  );
};

export default RoundedIcon;
