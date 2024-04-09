import { postSearchLocationTraining } from 'apis/trainig';
import { AxiosResponse } from 'axios';
import Loader from 'components/common/Loader';
import React from 'react';
import { Await, defer, redirect, useLoaderData } from 'react-router-dom';
import { TrainingOutlineDto } from 'types/swagger/model/trainingOutlineDto';
import { errorFunc, fetchLocation } from 'utils/util';
import UserMap from '.';

async function loadEvents() {
  try {
    let latitude = Number(localStorage.getItem('lat'));
    let longitude = Number(localStorage.getItem('lng'));
    if (!latitude && !longitude) {
      const { coords } = await fetchLocation();
      latitude = coords.latitude;
      longitude = coords.longitude;
    }
    const res = await postSearchLocationTraining({ latitude, longitude });
    localStorage.setItem('lat', latitude.toString());
    localStorage.setItem('lng', longitude.toString());
    return res;
  } catch (error) {
    errorFunc(error);
    return redirect('/');
  }
}

export const loader = () => {
  return defer({ mapData: loadEvents() });
};

export default function MapRoot() {
  const { mapData } = useLoaderData() as {
    mapData: AxiosResponse<TrainingOutlineDto[] | []>;
  };
  return (
    <React.Suspense fallback={<Loader text="위치 설정중..." />}>
      <Await resolve={mapData}>
        <UserMap />
      </Await>
    </React.Suspense>
  );
}
