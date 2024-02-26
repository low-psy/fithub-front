import React from 'react';
import DefaultModal from './DefaultModal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText: string;
  children: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  confirmText,
  children,
}) => {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose} modalMaxHeight="400px">
      <div className="w-[400px] space-y-6">
        <div>{children}</div>
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-full bg-slate-200 px-6 py-1"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </DefaultModal>
  );
};

export default ConfirmationModal;
