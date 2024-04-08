import { getMapList } from 'apis/trainer';
import { AxiosResponse } from 'axios';
import Loader from 'components/common/Loader';
import React from 'react';
import { Await, defer, redirect, useLoaderData } from 'react-router-dom';
import { MapDto } from 'types/swagger/model/mapDto';
import { errorFunc, fetchLocation } from 'utils/util';
import MapList from '.';

async function mapListLoader() {
  try {
    let latitude = Number(localStorage.getItem('lat'));
    let longitude = Number(localStorage.getItem('lng'));
    if (!latitude && !longitude) {
      const { coords } = await fetchLocation();
      latitude = coords.latitude;
      longitude = coords.longitude;
    }
    const req = await getMapList({ page: 1, x: latitude, y: longitude });
    if (req.status === 200) {
      return req;
    }
    throw new Error('server is trouble');
  } catch (e) {
    errorFunc(e);
    return redirect('/');
  }
}

export const loader = () => {
  return defer({ mapList: mapListLoader() });
};

export default function MapListRoot() {
  const { mapList } = useLoaderData() as { mapList: AxiosResponse<MapDto> };
  return (
    <React.Suspense fallback={<Loader text="헬스장 찾는중..." />}>
      <Await resolve={mapList}>
        <MapList />
      </Await>
    </React.Suspense>
  );
}
