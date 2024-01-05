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
              <p className="mr-2 h-10 w-8 pl-4 text-lg font-semibold leading-10 text-main">
                {idx + 1}.
              </p>
              <input
                id={`${idx}`}
                maxLength={40}
                placeholder="자격증 이름을 입력해주세요."
                className="h-10 w-full rounded border border-main bg-white p-2 hover:outline-none focus:outline-none"
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
