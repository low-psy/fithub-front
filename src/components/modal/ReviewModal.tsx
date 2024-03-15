import React from 'react';

interface ReviewModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText?: string;
  children: React.ReactNode;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className=" overflow-hidden rounded-md bg-white"
        style={{ width: 850, maxHeight: 700 }}
      >
        <header className="flex justify-between bg-gray-200 px-5 py-3 text-xl font-bold">
          <h1>{title}</h1>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <span className="material-symbols-outlined -mr-2">close</span>
          </button>
        </header>
        <div className="flex flex-col items-center px-8 py-5">
          {children}
          <div className="mt-5">
            <button
              type="button"
              onClick={onClose}
              className=" mr-3 rounded bg-slate-200 px-6 py-2"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded bg-sub px-6 py-2"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
