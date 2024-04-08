import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { Await, useRouteLoaderData } from 'react-router-dom';
import { TrainerOutlineDto } from 'types/swagger/model/trainerOutlineDto';
import { TrainerSearchAllLicenseDto } from 'types/swagger/model/trainerSearchAllLicenseDto';
import { TrainerSearchAllReviewDto } from 'types/swagger/model/trainerSearchAllReviewDto';
import TrainerInfos from './TrainerInfos';
import TrainerLiceses from './TrainerLiceses';
import TrainerLocation from './TrainerLocation';
import TrainerReviewsAll from './TrainerReviewsAll';

interface TrainerLoaderType {
  reviews: AxiosResponse<TrainerSearchAllReviewDto>;
  licenses: AxiosResponse<TrainerSearchAllLicenseDto>;
  infos: AxiosResponse<TrainerOutlineDto>;
}

const TrainerDetail = () => {
  const { reviews, licenses, infos } = useRouteLoaderData(
    'trainer-detail',
  ) as TrainerLoaderType;

  const [average, setAverage] = useState<number>(0);
  return (
    <div className="mx-auto my-4 max-w-[1000px] items-start gap-x-10 space-y-6 md:flex">
      <React.Suspense>
        <Await resolve={infos}>
          <TrainerInfos average={average} />
        </Await>
      </React.Suspense>
      <div className="grow space-y-6">
        <React.Suspense>
          <Await resolve={licenses}>
            <TrainerLiceses />
          </Await>
        </React.Suspense>
        <React.Suspense>
          <Await resolve={infos}>
            <TrainerLocation />
          </Await>
        </React.Suspense>
        <React.Suspense>
          <Await resolve={reviews}>
            <TrainerReviewsAll onSetAvg={(avg: number) => setAverage(avg)} />
          </Await>
        </React.Suspense>
      </div>
    </div>
  );
};

export default TrainerDetail;
