import { useEffect, useState } from 'react';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { getTrainersReviews } from '../../apis/trainer';
import ProfileSection from '../../components/common/ProfileSection';
import SingleMap from '../../components/map/SingleMap';
import { LoaderData } from '../../types/common';
import { addressToPositions, errorFunc } from '../../utils/util';

export const loader = (async ({ params }) => {
  const { trainerId } = params;
  try {
    if (trainerId) {
      const trainerReviews = await getTrainersReviews(trainerId);
      if (trainerReviews.status === 200) {
        return { trainerReviews };
      }
      throw new Error('server is trouble');
    } else {
      return redirect('/');
    }
  } catch (err) {
    errorFunc(err);
    return redirect('/');
  }
}) satisfies LoaderFunction;

const TrainerDetail = () => {
  console.log('home trainer detail');
  const {
    trainerReviews: {
      data: { average, reviewNum, trainerId, usersReviewList },
    },
  } = useLoaderData() as LoaderData<typeof loader>;
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  // useEffect(() => {
  //   const func = async () => {
  //     if (address) {
  //       const position = await addressToPositions(address);
  //       setLocation(position);
  //     }
  //   };
  //   func();
  // }, [address]);
  return (
    <div className="mx-auto my-4 max-w-[1000px] items-start gap-x-10 space-y-6 md:flex">
      <div className="rounded-xl border-[1.5px] border-sub bg-white p-8 text-center md:min-w-[400px]">
        {/* <div className=" aspect-square h-[200px]  ">
          <img alt="trainer" src="/" className="h-full w-full rounded-full" />
        </div> */}
        <h2 className="text-xl font-bold">
          김핏헙 <span className="text-base font-normal">트레이너</span>
        </h2>
        <h3 className=" mt-2 inline-block border-b-2 text-base text-gray-500 ">
          핏헙 gym
        </h3>
        <div className="mt-3 flex items-center justify-center">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <span
                className={`material-symbols-rounded ${typeof average === 'number' && index < average ? 'filled' : 'unfilled'} -ml-1 text-xl text-main`}
              >
                star
              </span>
            );
          })}
          <div className="ml-2 text-sm text-gray-500">4.0(20)</div>
        </div>
        <div className="mt-4">&quot;운동 저와 함께 재밌게 해봐요&ldquo;</div>
        <div className="mt-4 font-bold">
          <div>
            자격검증 <span className="ml-2 font-normal">10개</span>
          </div>
          <div className="mt-1">
            자격검증 <span className="ml-2 font-normal">10개</span>
          </div>
        </div>
      </div>
      <div className="grow space-y-8">
        <div>
          <h2 className="mb-2 text-2xl font-extrabold">자격 사항</h2>
          <div className="rounded-xl border-[1.5px] border-sub bg-white p-8">
            <div className="flex items-center gap-x-4">
              <div className="inline-block rounded-full bg-accent p-3 ">
                <span className="material-symbols-rounded align-top">
                  trophy
                </span>
              </div>
              <p className="text-lg font-bold">이런 상을 받았습니다</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-extrabold">위치</h2>
          <div className="rounded-xl border-[1.5px] border-sub bg-white p-8">
            <div className="font-bold">주소입니다</div>
            <div className="mt-4 aspect-square max-w-[450px] space-y-4">
              <SingleMap isMarker location={location} level={5} />
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-extrabold">리뷰</h2>
          <div className="flex items-center gap-x-4 rounded-xl border-[1.5px] border-sub bg-white p-8">
            <div className="space-x-2 text-2xl font-extrabold text-gray-400">
              <span className="text-black">{average}</span>
              <span>/</span>
              <span>5</span>
            </div>
            <div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <span
                      className={`material-symbols-rounded ${typeof average === 'number' && index < average ? 'filled' : 'unfilled'} -ml-2 text-4xl text-main`}
                    >
                      star
                    </span>
                  );
                })}
              </div>
              <div className="-mt-1 text-xs font-bold ">리뷰 {reviewNum}개</div>
            </div>
            <div />
          </div>

          {usersReviewList && usersReviewList.length !== 0 ? (
            <div className="mt-4 space-y-4 rounded-xl border-[1.5px] border-sub bg-white p-8">
              {usersReviewList?.map(
                ({
                  content,
                  createdDate,
                  modifiedDate,
                  reviewId,
                  star,
                  trainerProfileImg,
                  trainingTitle,
                }) => {
                  return (
                    <div>
                      <ProfileSection
                        profileName="김팔두"
                        profileImage={trainerProfileImg}
                        key={reviewId}
                        date={
                          createdDate?.toString() || modifiedDate?.toString()
                        }
                      />
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => {
                          return (
                            <span
                              className={`material-symbols-rounded ${typeof star === 'number' && index < star ? 'filled' : 'unfilled'} -ml-2 text-4xl text-main`}
                            >
                              star
                            </span>
                          );
                        })}
                      </div>
                      <h2 className="text-gray-400">{trainingTitle}</h2>
                      <p className="bg-whitetext-base whitespace-pre-wrap leading-relaxed text-gray-800">
                        {content}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border-[1.5px] border-sub bg-white p-8">
              리뷰가 없음
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;
