import React, { ReactElement } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode | ReactElement | string;
  modalWidth?: string;
  modalMaxHeight?: string;
  className?: string;
}

const DefaultModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  modalWidth,
  modalMaxHeight,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50 p-20"
      onClick={(e) => e.preventDefault}
      role="presentation"
    >
      <div
        className={`overflow-auto rounded-md bg-white p-4 ${className}`}
        style={{ width: modalWidth, maxHeight: modalMaxHeight }}
      >
        <div className="mr-2 text-end">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <span className="material-symbols-outlined -mr-2">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DefaultModal;
