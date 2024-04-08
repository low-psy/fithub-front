import { getTraining, postSearchTraining } from 'apis/trainig';
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
import { refreshResData } from 'types/common';
import { PageTrainingOutlineDto } from 'types/swagger/model/pageTrainingOutlineDto';
import { errorFunc, setRefreshToken } from 'utils/util';
import HomePage, { CategoryEnum } from '.';

async function loadTrainings(url: any) {
  const keyword = url.searchParams.get('searchInput') || undefined;
  const lowestPrice = Number(url.searchParams.get('lowestPrice')) || undefined;
  const highestPrice =
    Number(url.searchParams.get('highestPrice')) || undefined;
  const startDate = url.searchParams.get('startDate') || undefined;
  const endDate = url.searchParams.get('endDate') || undefined;
  const category =
    (url.searchParams.get('category') as CategoryEnum) || undefined;
  try {
    let response;
    if (
      keyword ||
      lowestPrice ||
      highestPrice ||
      startDate ||
      endDate ||
      category
    ) {
      response = await postSearchTraining({
        conditions: {
          keyword,
          lowestPrice,
          highestPrice,
          startDate,
          endDate,
          category,
        },
        pageable: { page: 0, size: 10 },
      });
    } else {
      response = await getTraining();
    }
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      const { accessToken } = response.data as refreshResData;
      setRefreshToken(accessToken);
      return redirect('');
    }
    throw new Error('server is trouble');
  } catch (err) {
    console.log(err, 'error called');
    errorFunc(err);
    return redirect('/login');
  }
}

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  return defer({ trainingData: loadTrainings(url) });
};

export default function HomeRoot() {
  const { trainingData } = useLoaderData() as {
    trainingData: AxiosResponse<PageTrainingOutlineDto>;
  };
  return (
    <React.Suspense fallback={<Loader text="트레이닝 찾는중..." />}>
      <Await resolve={trainingData}>
        <HomePage />
      </Await>
    </React.Suspense>
  );
}
