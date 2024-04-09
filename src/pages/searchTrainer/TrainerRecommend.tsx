import { AxiosResponse } from 'axios';
import Loader from 'components/common/Loader';
import React from 'react';
import {
  Await,
  defer,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import { TrainerRecommendationOutlineDto } from 'types/swagger/model/trainerRecommendationOutlineDto';
import { getRecommendTrainers } from '../../apis/trainer';
import UndefinedCover from '../../components/common/UndefinedCover';
import { LoaderData, refreshResData } from '../../types/common';
import {
  errorFunc,
  fetchLocation,
  isRefreshResData,
  setRefreshToken,
} from '../../utils/util';
import ReservationItem from '../trainer/ReservationItem';

async function trainerLoader() {
  let latitude = Number(localStorage.getItem('lat'));
  let longitude = Number(localStorage.getItem('lng'));
  if (!latitude && !longitude) {
    const { coords } = await fetchLocation();
    latitude = coords.latitude;
    longitude = coords.longitude;
  }
  try {
    const res = await getRecommendTrainers({ latitude, longitude, size: 10 });
    if (res.status === 200) {
      return res;
    }
    if (res.status === 201) {
      if (isRefreshResData(res.data)) {
        const { accessToken } = res.data as refreshResData;
        setRefreshToken(accessToken);
        return redirect('/');
      }
    }
    throw new Error('server is trouble');
  } catch (error) {
    errorFunc(error);
    return redirect('/');
  }
}

export const loader = () => {
  return defer({ trainer: trainerLoader() });
};

const TrainerRecommend = () => {
  const { trainer } = useLoaderData() as {
    trainer: AxiosResponse<TrainerRecommendationOutlineDto, any>;
  };

  return (
    <React.Suspense fallback={<Loader text="트레이너 추천중..." />}>
      <Await resolve={trainer}>
        {(trainerData: AxiosResponse<TrainerRecommendationOutlineDto, any>) => {
          const { interest, trainerRecommendationList } = trainerData.data;
          return (
            <div>
              {trainerRecommendationList &&
              trainerRecommendationList.length !== 0 ? (
                <>
                  <h2 className="text-2xl font-extrabold">검색한 트레이너</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {trainerRecommendationList.map(
                      ({
                        address,
                        interests,
                        name,
                        trainerId,
                        rating,
                        profileUrl,
                        totalReviews,
                      }) => {
                        const ratingText = `${rating}/5 (${totalReviews})`;
                        return (
                          <Link
                            key={trainerId}
                            className="rounded-xl bg-white p-8 shadow-lg hover:opacity-100"
                            to={`/search/trainer/${trainerId}`}
                          >
                            <div className=" mb-4 inline-block aspect-square h-[200px]">
                              <img
                                alt="trainer"
                                src={profileUrl}
                                className="h-full w-full rounded-full"
                              />
                            </div>
                            <p className="mb-6  mt-4 truncate text-2xl font-extrabold">
                              {name}
                            </p>
                            <div className="space-y-4">
                              <ReservationItem
                                title="평점"
                                value={ratingText}
                                iconString="star"
                              />
                              <ReservationItem
                                title="주소"
                                value={address}
                                iconString="home"
                              />
                              <ReservationItem
                                title="카테고리"
                                value={interests?.[0]}
                                iconString="sell"
                              />
                            </div>
                          </Link>
                        );
                      },
                    )}
                  </div>
                </>
              ) : (
                <div className="relative h-[300px] w-full bg-slate-200">
                  <UndefinedCover>
                    주변에 추천할 수 있는 트레이너가 없습니다
                  </UndefinedCover>
                </div>
              )}
            </div>
          );
        }}
      </Await>
    </React.Suspense>
  );
};

export default TrainerRecommend;
