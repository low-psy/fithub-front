import React, { FC, useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import withAuth from '../../../hocs/withAuth';
import { TrainerInfoRes } from './type';
import { fetchTrainerInfo } from '../../../apis/trainer';
import Location from './Location';
import License from './License';
import Career from './Career';

const TrainerInfo: FC = () => {
  const [resData, setResData] = useState<TrainerInfoRes>();

  const getTrainerInfo = useCallback(async () => {
    const res: AxiosResponse<TrainerInfoRes> = await fetchTrainerInfo();
    setResData(res?.data);
  }, []);

  useEffect(() => {
    getTrainerInfo();
  }, [getTrainerInfo]);

  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold">트레이너 정보</p>
      <div className="mb-4 mt-4 w-full border shadow-slate-500" />

      {/* 자격증 */}
      <License list={resData?.trainerLicenseList} />
      {/* 경력 */}
      <Career list={resData?.trainerCareerList} />
      {/* 위치 */}
      <Location value={resData?.address} />
    </div>
  );
};

export default withAuth(TrainerInfo, 'trainer');
