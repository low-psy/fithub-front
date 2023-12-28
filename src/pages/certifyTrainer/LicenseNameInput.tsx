import React from 'react';

interface ILicenseNameInputProps {
  images: string[];
  licenseNames: string[];
  handleLicenseName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LicenseNameInput({
  images,
  licenseNames,
  handleLicenseName,
}: ILicenseNameInputProps) {
  return (
    <div>
      {images.map((license, idx) => {
        return (
          <div key={(license + idx) as string} className="mb-2">
            <label className="flex flex-row">
              <p className="h-10 mr-2 leading-10 text-main font-semibold text-lg w-8 pl-4">
                {idx + 1}.
              </p>
              <input
                id={`${idx}`}
                maxLength={40}
                placeholder="자격증 이름을 입력해주세요."
                className="w-full bg-white rounded h-10 hover:outline-none focus:outline-none p-2 border border-main"
                value={licenseNames[idx] || ''}
                onChange={handleLicenseName}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default LicenseNameInput;
