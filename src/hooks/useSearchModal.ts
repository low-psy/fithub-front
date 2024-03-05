// hooks/useSearchModal.ts
import { useState } from 'react';

const useSearchModal = () => {
  const [enteredText, setEnteredText] = useState<string>();
  const [isClick, setIsClick] = useState<boolean>(false);

  const inputChangeHandler = (value: string) => {
    setEnteredText(value);
  };
  const clickHandler = (isClick: boolean) => {
    setIsClick(isClick);
  };

  return {
    enteredText,
    isClick,
    inputChangeHandler,
    clickHandler,
  };
};

export default useSearchModal;
