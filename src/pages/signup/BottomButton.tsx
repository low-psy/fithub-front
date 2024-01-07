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
    <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 sm:bottom-8 md:px-2">
      <div className="mx-2 flex flex-row justify-center gap-4">
        <button
          type={type === 'button' ? 'button' : 'submit'}
          className={`h-12 w-full min-w-[120px] whitespace-nowrap rounded px-2  text-lg font-semibold ${
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
