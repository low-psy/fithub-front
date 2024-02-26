import React, { useCallback, useState } from 'react';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import ProfileSection from '../../components/common/ProfileSection';
import MapDisplay from '../../components/common/MapsDisplay';
import useMapDisplay from '../../hooks/mapDisplayHook';
import {
  getDetailTraining,
  postPaymentOrder,
  postPaymentValidation,
} from '../../apis/trainig';
import { TrainingInfoDto } from '../../types/swagger/model/trainingInfoDto';
import { RequestPayParams, RequestPayResponse } from '../../types/PortOne';
import { errorFunc, formatDate, generateRandomString } from '../../utils/util';
import ReservationSection from './TrainingReservation';
import Line from '../../components/common/Line';
import ImageXScroll from '../../components/imageSlider/ImageXScroll';
import withAuth from '../../hocs/withAuth';

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
    const response = await getDetailTraining(Number(trainingId));
    if (response && response.status === 200) {
      return response;
    }
    return response;
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

const Detail = () => {
  const response = useLoaderData() as AxiosResponse<TrainingInfoDto>;
  const navigate = useNavigate();
  const trainingInfo = response.data;
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
  const { finalLocation, finalAddress } = useMapDisplay({
    initialAddress: address,
  });
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
        amount: 100, // 결제금액
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

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className=" break-keep  text-3xl font-bold">
          {trainingInfo.title}
        </h1>
      </div>
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
            <h3 className="text-xl font-bold">트레이닝 위치</h3>
            <div className="space-y-4">
              <h3 className=" text-slate-700">{finalAddress}</h3>
              <MapDisplay location={finalLocation} draggable={false} />
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
