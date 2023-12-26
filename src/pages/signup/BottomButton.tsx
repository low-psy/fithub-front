import React from 'react';

interface IBottomButtonProps {
  type: 'button' | 'submit';
  isCertified?: boolean;
  text: string;
  // onClick?: () => void;
  // onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

function BottomButton({ type, isCertified, text }: IBottomButtonProps) {
  const disabledCSS = 'border border-main text-gray-500';
  const availabledCSS = 'bg-main text-white hover:bg-hoverColor';

  return (
    <div className="md:px-2 absolute bottom-4 sm:bottom-8 w-full left-1/2 -translate-x-1/2">
      <div className="flex flex-row justify-center gap-4 mx-2">
        <button
          type={type === 'button' ? 'button' : 'submit'}
          className={`whitespace-nowrap rounded text-lg font-semibold px-2 h-12  min-w-[120px] w-full ${
            isCertified ? availabledCSS : disabledCSS
          }`}
          disabled={!isCertified}
        >
          {text}
        </button>
      </div>
    </div>
  );
}

export default BottomButton;
