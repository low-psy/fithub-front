import React from 'react';

import { ImageUploadButton } from './CertificationAddButtons';

interface ILicenseImageInputProps {
  images: string[];
  handleDeleteImage: (idx: number) => void;
  handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LicenseImageInput({
  images,
  handleAddImage,
  handleDeleteImage,
}: ILicenseImageInputProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-max flex-row gap-4">
        {images.map((image, idx) => {
          return (
            <div className="flex flex-col " key={image}>
              <img src={image} alt={image} className="h-48 w-48" key={image} />
              <button
                type="button"
                onClick={() => handleDeleteImage(idx)}
                className="h-8 rounded border border-main font-semibold text-main hover:bg-main hover:text-white"
              >
                삭제하기
              </button>
            </div>
          );
        })}
        <ImageUploadButton handleAddImage={handleAddImage} />
      </div>
    </div>
  );
}

export default LicenseImageInput;
