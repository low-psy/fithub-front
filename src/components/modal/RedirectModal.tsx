import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface RedirectModalProps {
  children: React.ReactElement | string;
}

const RedirectModal: React.FC<RedirectModalProps> = ({ children }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  return (
    <div className="fixed inset-0 bg-black p-20">
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-10 top-10"
      >
        <span className="material-symbols-outlined -mr-2  rounded-full bg-white">
          close
        </span>
      </button>
      <div className="flex h-full overflow-y-auto rounded-md bg-white">
        {children}
      </div>
    </div>
  );
};

export default RedirectModal;
