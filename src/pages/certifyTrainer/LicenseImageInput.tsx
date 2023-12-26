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
      <div className="flex flex-row gap-4 w-max">
        {images.map((image, idx) => {
          return (
            <div className="flex flex-col " key={image}>
              <img src={image} alt={image} className="w-48 h-48" key={image} />
              <button
                type="button"
                onClick={() => handleDeleteImage(idx)}
                className="border border-main rounded text-main hover:bg-main hover:text-white font-semibold"
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
