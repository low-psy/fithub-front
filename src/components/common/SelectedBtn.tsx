import React, { useState } from 'react';

// 버튼을 나타내는 타입 정의
type ButtonOption = {
  id: number;
  children: string;
  selectedBtnId: number;
  onClick: (id: number) => void;
};

const SelectableButtons: React.FC<ButtonOption> = ({
  id,
  children,
  selectedBtnId,
  onClick,
}) => {
  // 선택된 버튼의 ID를 상태로 관리

  // 버튼 선택 핸들러
  const handleSelectButton = (id: number) => {
    onClick(id);
  };

  return (
    <button
      key={id}
      onClick={() => handleSelectButton(id)}
      // 선택된 버튼에 다른 스타일 적용
      className={`shrink-0 rounded-full border-2 ${selectedBtnId === id ? 'border-black' : 'border-slate-200'} border-black ${selectedBtnId === id ? 'bg-slate-100' : 'bg-white'} px-8 py-2`}
      type="button"
    >
      {children}
    </button>
  );
};

export default SelectableButtons;
