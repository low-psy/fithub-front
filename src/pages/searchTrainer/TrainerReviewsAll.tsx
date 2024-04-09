import { AxiosResponse } from 'axios';
import ProfileSection from 'components/common/ProfileSection';
import { useEffect } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TrainerSearchAllReviewDto } from 'types/swagger/model/trainerSearchAllReviewDto';

interface TrainerReviewsProps {
  onSetAvg: (avg: number) => void;
}
export default function TrainerReviewsAll({ onSetAvg }: TrainerReviewsProps) {
  const reviews = useAsyncValue() as AxiosResponse<
    TrainerSearchAllReviewDto,
    any
  >;
  const { average, reviewNum, trainerId, usersReviewList } = reviews.data;
  useEffect(() => {
    if (typeof average === 'string' || average === undefined) {
      return onSetAvg(0);
    }
    onSetAvg(average as number);
  }, [onSetAvg, average]);
  return (
    <div key={trainerId}>
      <h2 className="mb-2 text-2xl font-extrabold">리뷰</h2>
      <div className="flex items-center gap-x-4 rounded-xl border-[1.5px] border-sub bg-white p-8">
        <div className="space-x-2 text-2xl font-extrabold text-gray-400">
          <span className="text-black">
            {typeof average === 'string' ? 0 : average}
          </span>
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
                    profileImage={trainerProfileImg}
                    key={reviewId}
                    date={createdDate?.toString() || modifiedDate?.toString()}
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
  );
}
