import React, { useRef } from 'react';

interface IImageUploadButtonProps {
  handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUploadButton({ handleAddImage }: IImageUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickImageUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleAddImage}
        className="hidden"
        ref={inputRef}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="h-48 w-48 rounded border border-main hover:cursor-pointer"
        viewBox="0 0 16 16"
        onClick={onClickImageUpload}
      >
        {' '}
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{' '}
      </svg>
    </div>
  );
}

interface ICareerUploadButton {
  handleAddCareerInputCount: () => void;
}

export function CareerUploadButton({
  handleAddCareerInputCount,
}: ICareerUploadButton) {
  return (
    <button
      type="button"
      className="text-semibold mb-2 h-[20px] rounded bg-main px-2 text-sm text-white md:h-[28px] md:text-lg"
      onClick={handleAddCareerInputCount}
    >
      추가
    </button>
  );
}
