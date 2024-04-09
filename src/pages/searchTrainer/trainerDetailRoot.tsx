import {
  getTrainersInfos,
  getTrainersLicenses,
  getTrainersReviews,
} from 'apis/trainer';
import { AxiosResponse } from 'axios';
import Loader from 'components/common/Loader';
import React from 'react';
import {
  Await,
  defer,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import { TrainerOutlineDto } from 'types/swagger/model/trainerOutlineDto';
import { TrainerSearchAllLicenseDto } from 'types/swagger/model/trainerSearchAllLicenseDto';
import { TrainerSearchAllReviewDto } from 'types/swagger/model/trainerSearchAllReviewDto';
import { errorFunc } from 'utils/util';
import TrainerDetail from './trainerDetail';

async function trainderLoader(trainerId: string, callback: any) {
  try {
    if (trainerId) {
      const response = await callback(trainerId);
      if (response.status === 200) {
        return response;
      }
      throw new Error('server is trouble');
    } else {
      return redirect('/');
    }
  } catch (err) {
    errorFunc(err);
    return redirect('/');
  }
}

export const loader = (({ params }) => {
  const { trainerId } = params;
  return defer({
    reviews: trainderLoader(trainerId as string, getTrainersReviews),
    licenses: trainderLoader(trainerId as string, getTrainersLicenses),
    infos: trainderLoader(trainerId as string, getTrainersInfos),
  });
}) satisfies LoaderFunction;

export default function TrainerDetailRoot() {
  return <TrainerDetail />;
}
