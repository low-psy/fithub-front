import React from 'react';
import { FilterItemsProps } from '../../types/common';

const FilterItem: React.FC<FilterItemsProps> = ({
  text,
  onClick,
  className,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Enter 또는 Space 키가 눌렸을 때 onClick 이벤트 핸들러 호출
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0} // 키보드 포커스를 받을 수 있도록 tabIndex 설정
      role="button" // 스크린 리더 사용자를 위한 역할(role) 설정
    >
      {text}
    </div>
  );
};

export default FilterItem;
