import React, { FC, useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
// import withAuth from '../../../hocs/withAuth';
import {
  Career,
  License,
  TrainerInfoRes,
  TrainerInfoType,
} from './trainerInfo';
import { authAxios } from '../../../apis/axios';
import { fetchTrainerInfo } from '../../../apis/trainer';
import Info from './Info';

const TrainerInfo: FC = () => {
  const [licenseList, setLicenseList] = useState<License[]>();
  const [careerList, setCareerList] = useState<Career[]>();

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
      <Info
        type={TrainerInfoType.License}
        list={licenseList}
        handleEdit={editCertification}
      />
      {/* 경력 */}
      <Info
        type={TrainerInfoType.Career}
        list={careerList}
        handleEdit={editCareer}
      />
      {/* 위치 */}
      <Info
        type={TrainerInfoType.Location}
        list={[{ id: 1, value: '마포구 어울림로 152-88' }]} // TODO
        handleEdit={editLocation}
      />
    </div>
  );
};

export default TrainerInfo;
// export default withAuth(TrainerInfo, 'trainer');
