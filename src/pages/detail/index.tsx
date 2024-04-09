import React, { useCallback, useEffect, useState } from 'react';
import {
  defer,
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { TrainingInfoDto } from 'types/swagger/model/trainingInfoDto';
import { TrainingReviewDto } from 'types/swagger/model/trainingReviewDto';
import ProfileSection from '../../components/common/ProfileSection';
import {
  getDetailTraining,
  getTrainingReviews,
  postPaymentOrder,
  postPaymentValidation,
} from '../../apis/trainig';
import {
  addressToPositions,
  errorFunc,
  formatDate,
  generateRandomString,
} from '../../utils/util';
import ReservationSection from './TrainingReservation';
import Line from '../../components/common/Line';
import ImageXScroll from '../../components/imageSlider/ImageXScroll';
import withAuth from '../../hocs/withAuth';
import SingleMap from '../../components/map/SingleMap';
import ClickBtn from '../../components/btn/ClickBtn';
import { RequestPayParams, RequestPayResponse } from '../../types/portone';

export interface DateObject {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
}

export const loader = (async ({ params }: LoaderFunctionArgs) => {
  const { trainingId } = params;
  try {
    const detailTraining = await getDetailTraining(Number(trainingId));
    const reviews = await getTrainingReviews(Number(trainingId));
    if (detailTraining.status === 200 && reviews.status === 200) {
      return defer({ detailTraining, reviews });
    }
    throw new Error('Server is Trouble');
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

const Detail = () => {
  const response = useLoaderData() as {
    detailTraining: AxiosResponse<TrainingInfoDto>;
    reviews: AxiosResponse<TrainingReviewDto[] | []>;
  };
  const trainingInfo = response.detailTraining.data;
  const trainingReviews = response.reviews.data;
  const navigate = useNavigate();
  const {
    images,
    startDate,
    endDate,
    id,
    price,
    availableDates,
    address,
    title,
    trainerInfoDto,
    content,
  } = trainingInfo;
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  const [plusReviews, setPlusReviews] = useState<number[]>([]);
  useEffect(() => {
    const func = async () => {
      if (address) {
        const position = await addressToPositions(address);
        setLocation(position);
      }
    };
    func();
  }, [address]);

  const imageUrls =
    images?.map((value) => {
      return value.url;
    }) || [];
  const formatStartDate = formatDate(startDate);
  const formatEndDate = formatDate(endDate);
  let date;
  if (startDate === endDate) {
    date = formatStartDate;
  } else {
    date = `${formatStartDate}~${formatEndDate}`;
  }

  const [selectedDateId, setSelectedDateId] = useState<number | undefined>();
  const [selectedTimeId, setSelectedTimeId] = useState<
    number | undefined | null
  >(null);
  const onSelectDateHandler = useCallback(
    (id: number | undefined) => {
      setSelectedDateId(id);
      if (selectedDateId) {
        setSelectedTimeId(null);
      }
    },
    [selectedDateId],
  );

  const timeSelectHandler = (id: number | undefined) => {
    setSelectedTimeId(id);
  };

  const payBtnCliHandler = async () => {
    if (!window.IMP) return;
    const { IMP } = window;
    IMP.init('imp44341270');

    if (!id) {
      return null;
    }
    try {
      const orderRsp = await postPaymentOrder({
        trainingId: id,
        reservationDateId: selectedDateId as number,
        reservationTimeId: selectedTimeId as number,
      });
      if (orderRsp.status !== 200) {
        alert('결제 검증에 실패하였습니다. 다시시도해 주세요');
        return navigate('/');
      }
      const reservationId = orderRsp.data;
      const data: RequestPayParams = {
        pg: 'html5_inicis.INIpayTest',
        pay_method: 'card', // 결제수단
        merchant_uid: `${generateRandomString()}`, // 주문번호
        amount: price as number, // 결제금액
        name: title, // 주문명
        buyer_name: '홍길동', // 구매자 이름
        buyer_tel: '01012341234', // 구매자 전화번호
        buyer_email: 'example@example.com', // 구매자 이메일
        buyer_addr: '신사동 661-16', // 구매자 주소
        buyer_postcode: '06018', // 구매자 우편번호
      };
      IMP.request_pay(data, async (rsp: RequestPayResponse) => {
        if (rsp.success && id) {
          try {
            const res = await postPaymentValidation({
              reservationId,
              payMethod: rsp.pay_method as string,
              impUid: rsp.imp_uid as string,
              merchantUid: rsp.merchant_uid,
            });
            if (res.status === 200) {
              navigate(`/success/${reservationId}`, {
                state: { isModal: true },
              });
            } else {
              throw new Error(`Server responded with status: ${res.status}`);
            }
          } catch (error) {
            errorFunc(error);
            navigate('/');
          }
        }
      });
    } catch (error) {
      errorFunc(error);
      navigate(`/detail/${id}`);
    }
  };
  const plusBtnHandler = (id: number) => {
    setPlusReviews((prev: number[]) => {
      if (prev.includes(id)) {
        return prev.filter((review) => review !== id);
      }
      return [...prev, id];
    });
  };
  return (
    <div className="mb-8 space-y-4">
      <h1 className=" break-keep  text-3xl font-bold">{trainingInfo.title}</h1>
      <ImageXScroll imageUrls={imageUrls as string[]} />
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="grow space-y-6 ">
          <ProfileSection
            profileImage={trainerInfoDto?.trainerProfileImg}
            profileName={trainerInfoDto?.name}
            location={trainerInfoDto?.address}
          />
          <Line />
          <div className="space-y-8">
            <h3 className="text-xl font-bold">트레이닝 내용</h3>
            <p className="mb-4 whitespace-pre-wrap  bg-white p-4 text-base leading-relaxed text-gray-800 ">
              {content}
            </p>
          </div>
          <Line />
          <div className="space-y-8 ">
            <h3 className="text-xl font-bold">트레이닝 기간</h3>
            <div className="inline-block rounded-md border-2 border-slate-700 p-4">
              <div>
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
              </div>
              <h3>{date}</h3>
            </div>
          </div>
          <Line />
          <div className="space-y-8">
            <h3 className="text-xl font-bold">트레이닝 리뷰</h3>
            <ul className="space-y-6">
              {trainingReviews.length < 1 && (
                <div className="bg-gray-400 p-6  ">등록된 리뷰가 없습니다</div>
              )}
              {trainingReviews.map((review, index) => {
                const { userInfo, createdDate, content, reviewId, star } =
                  review;
                const isPlusReview = plusReviews.includes(reviewId as number);
                const isDropBtn =
                  (content?.match(/\n/gi)?.length as number) > 3;
                return (
                  <li
                    key={reviewId}
                    className="relative w-full  bg-gray-50 p-4 shadow-md drop-shadow-md  lg:w-[500px]"
                  >
                    <div className="flex justify-between">
                      <ProfileSection
                        profileImage={userInfo?.profileUrl}
                        profileName={userInfo?.nickname}
                        date={createdDate?.toString()}
                      />
                      <div className="flex items-center text-2xl font-bold">
                        <span className="material-symbols-rounded filled text-3xl text-main">
                          star
                        </span>
                        {star?.toFixed(1)}
                      </div>
                    </div>
                    <div
                      className={` ${!isPlusReview && 'line-clamp-3'}  whitespace-pre-wrap p-2 text-base leading-relaxed text-gray-800 transition-transform `}
                    >
                      {content}
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                      {isDropBtn && (
                        <ClickBtn
                          onClick={() => plusBtnHandler(reviewId as number)}
                        >
                          <div className="flex rounded-full bg-main px-[6px] py-1 text-white">
                            <span className="material-symbols-rounded text-4xl font-extrabold">
                              expand_more
                            </span>
                          </div>
                        </ClickBtn>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Line />
          <div className="space-y-8">
            <h3 className="text-xl font-bold">트레이닝 위치</h3>
            <div className="aspect-square max-w-[450px] space-y-4">
              <SingleMap isMarker location={location} level={5} />
            </div>
          </div>
        </div>
        <ReservationSection
          availableDates={availableDates}
          onSelectDate={onSelectDateHandler}
          onTimeSelect={timeSelectHandler}
          selectedDateId={selectedDateId}
          selectedTimeId={selectedTimeId}
          price={price}
          onPay={payBtnCliHandler}
        />
      </div>
    </div>
  );
};

export default withAuth(Detail, 'user');
