import React, { FC, useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import withAuth from '../../../hocs/withAuth';
import { CareerType, LicenceType, TrainerInfoRes } from './type';
import { fetchTrainerInfo } from '../../../apis/trainer';
import Location from './Location';
import License from './License';
import Career from './Career';

const TrainerInfo: FC = () => {
  const [licenseList, setLicenseList] = useState<LicenceType[]>();
  const [careerList, setCareerList] = useState<CareerType[]>();

  const getTrainerInfo = useCallback(async () => {
    const { data }: AxiosResponse<TrainerInfoRes> = await fetchTrainerInfo();
    setLicenseList(data.trainerLicenseList);
    setCareerList(data.trainerCareerList);
  }, []);

  useEffect(() => {
    getTrainerInfo();
  }, [getTrainerInfo]);

  const editCertification = (id: number) => {
    // console.log('edit certi', id);
  };
  const editCareer = (id: number) => {
    // console.log('edit career', id);
  };
  const editLocation = (id: number) => {
    // console.log('edit location', id);
  };

  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold">트레이너 정보</p>
      <div className="mb-4 mt-4 w-full border shadow-slate-500" />

      {/* 자격증 */}
      <License list={licenseList} />
      {/* 경력 */}
      <Career list={careerList} />
      {/* 위치 */}
      <Location id={1} value="마포구 어울림로 152-88" />
    </div>
  );
};

export default withAuth(TrainerInfo, 'trainer');
