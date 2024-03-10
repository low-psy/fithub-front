import React, { FC, useRef } from 'react';
import { LicenceType } from './type';

interface Prop {
  imgs: LicenceType[] | undefined;
  handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAdding: boolean;
  setIdToDelete: (licenseId: number) => void;
}

const ImageUpload: FC<Prop> = ({
  imgs,
  handleAddImage,
  isAdding,
  setIdToDelete,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickImageUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className="flex">
      {imgs?.map(({ licenseId, url }) => {
        return (
          <div
            className="relative flex w-[20%] flex-col pr-[1rem]"
            key={licenseId}
          >
            <img
              src={url}
              alt={String(licenseId)}
              className="h-48 w-48"
              key={licenseId}
            />
            <button
              type="button"
              onClick={() => setIdToDelete(licenseId)}
              className="absolute right-0 top-[-10px]  z-[1] h-7 w-7 rounded-full border bg-accent font-semibold text-white hover:bg-rose-400"
            >
              X
            </button>
          </div>
        );
      })}
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
        className=" w-[20%] rounded border border-main hover:cursor-pointer "
        viewBox="0 0 16 16"
        onClick={onClickImageUpload}
        style={{ display: isAdding ? 'block' : 'none' }}
      >
        {' '}
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{' '}
      </svg>
    </div>
  );
};

export default ImageUpload;
