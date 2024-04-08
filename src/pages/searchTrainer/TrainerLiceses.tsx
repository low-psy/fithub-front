import { AxiosResponse } from 'axios';
import { useAsyncValue } from 'react-router-dom';
import { TrainerSearchAllLicenseDto } from 'types/swagger/model/trainerSearchAllLicenseDto';

export default function TrainerLiceses() {
  const {
    data: { licenses, totalCounts },
  } = useAsyncValue() as AxiosResponse<TrainerSearchAllLicenseDto>;
  return (
    <div>
      <h2 className="mb-2 text-2xl font-extrabold">자격 사항</h2>
      <div className="rounded-xl border-[1.5px] border-sub bg-white p-8">
        <ul className="grid grid-cols-3">
          {licenses?.map((license) => {
            return (
              <li
                className="flex items-center justify-center"
                key={license.licenseId}
              >
                <div className="h-[200px]">
                  <img
                    src={license.url}
                    alt="자격증명 이미지"
                    className="h-full max-w-full"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
