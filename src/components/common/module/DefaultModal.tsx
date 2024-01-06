import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalWidth?: string;
  modalMaxHeight?: string;
}

const DefaultModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  modalWidth,
  modalMaxHeight,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`max-h-[${modalMaxHeight}px] w-[${modalWidth}px] overflow-auto rounded-md bg-white p-4`}
      >
        <div className="text-end">
          <button type="button" onClick={onClose}>
            <span className="material-symbols-outlined -mr-2">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DefaultModal;
