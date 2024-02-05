import React from 'react';
import { useDispatch } from 'react-redux';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
} from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { formatDate } from '../../components/item/TrainerItem';
import ImageSlider from '../../components/common/ImageSlice';
import ProfileSection from '../../components/item/ProfileSection';
import FilterLayout from '../../components/filter/FilterLayout';
import MapDisplay from '../../components/common/MapsDisplay';
import useMapDisplay from '../../hooks/mapDisplayHook';
import Calendar from '../../components/common/Calendar';
import { useAppSelector } from '../../hooks/reduxHooks';
import { SET_SELECTED_TIME } from '../../redux/slices/paymentSlice';
import {
  getDetailTraining,
  postPaymentOrder,
  postPaymentValidation,
} from '../../apis/trainig';
import { TrainingInfoDto } from '../../types/swagger/model/trainingInfoDto';
import RedirectModal from '../../components/common/module/RedirectModal';
import { RequestPayParams, RequestPayResponse } from '../../types/PortOne';
import {
  convertToDateObjects,
  createLocalDateTimeFunc,
  extractTimesForSelectedDate,
} from '../../utils/util';

export function formatPriceToKRW(price: number) {
  return price.toLocaleString();
}

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
  const trainingInfo = response.data;
  const imageUrls = trainingInfo.images?.map((value) => {
    return value.url;
  });
  const startDate = formatDate(trainingInfo.startDate);
  const endDate = formatDate(trainingInfo.endDate);
  let date;
  if (startDate === endDate) {
    date = startDate;
  } else {
    date = `${startDate}~${endDate}`;
  }
  const { finalLocation, finalAddress } = useMapDisplay({
    initialAddress: trainingInfo.location,
  });

  const selectedDate = useAppSelector(
    (state) => state.payment.selectedDate,
  ).startDate;

  console.log(selectedDate);

  const dateObjects = convertToDateObjects(trainingInfo.availableDates);
  console.log(dateObjects);

  const times = extractTimesForSelectedDate(
    dateObjects as Date[],
    selectedDate as string,
  );
  console.log(times);
  const dispatch = useDispatch();
  const timeSelectHandler = (time: string) => {
    dispatch(SET_SELECTED_TIME(time));
  };

  const selectedTime = useAppSelector((state) => state.payment.selectedTime);

  const location = useLocation();
  const isModal = location.state?.isModal;

  const payBtnCliHandler = async () => {
    if (!window.IMP) return;
    const reservedDateTime = createLocalDateTimeFunc(
      selectedDate as string,
      selectedTime,
    );
    const { IMP } = window;
    IMP.init('imp25272810');

    if (!trainingInfo.id) {
      return null;
    }

    const orderRsp = await postPaymentOrder({
      trainingId: trainingInfo.id,
      reserveDateTime: reservedDateTime,
    });

    const data: RequestPayParams = {
      pg: 'nice.nictest00m',
      pay_method: 'card', // 결제수단
      merchant_uid: `${orderRsp.data}`, // 주문번호
      amount: 100, // 결제금액
      name: trainingInfo.title, // 주문명
    };
    IMP.request_pay(data, async (rsp: RequestPayResponse) => {
      if (rsp.success && trainingInfo.id) {
        const res = await postPaymentValidation({
          reservationId: Number(rsp.merchant_uid),
          trainingId: trainingInfo.id,
          pg: (rsp.pg_provider as string) || (rsp.embb_pg_provider as string),
          payMethod: rsp.pay_method as string,
          impUid: rsp.imp_uid as string,
          merchantUid: rsp.merchant_uid,
        });
        if (res.status === 200) {
          console.log(res.data);
          redirect('./');
        } else {
          redirect('fail');
        }
      }
    });
  };

  return (
    <div className="mb-8 space-y-4">
      <h1 className=" break-keep  text-3xl font-bold">{trainingInfo.title}</h1>
      <div className="flex max-h-[400px] items-center  gap-4 overflow-hidden">
        <div className="hidden h-full w-full  items-center justify-center overflow-hidden bg-slate-100 lg:flex">
          <img
            src={trainingInfo.images?.[0].url}
            alt="트레이닝 이미지"
            className="
            max-h-full max-w-full"
          />
        </div>

        <div className="flex h-full w-full shrink-0 justify-center bg-slate-100 lg:basis-1/2">
          {imageUrls && <ImageSlider postImages={imageUrls} />}
        </div>
      </div>
      <div className="flex gap-8">
        <div className="grow space-y-6 ">
          <ProfileSection
            profileImage={trainingInfo.trainerInfoDto?.trainerProfileImg}
            profileName={trainingInfo.trainerInfoDto?.name}
            location={trainingInfo.trainerInfoDto?.location}
          />
          <div className="block h-[1px] rounded-full bg-slate-300" />
          <div className="space-y-8">
            <h3 className="text-xl font-bold">트레이닝 내용</h3>
            <p className="break-keep  ">{trainingInfo.content}</p>
          </div>
          <div className="block h-[1px] rounded-full bg-slate-300" />
          <div className="space-y-8">
            <h3 className="text-xl font-bold">트레이닝 정원</h3>
            <div className="inline-block rounded-md border-2   border-slate-700 p-4">
              <div>
                <span className="material-symbols-outlined">person</span>
              </div>
              <h3>인원 {trainingInfo.quota}명</h3>
            </div>
          </div>
          <div className="block h-[1px] rounded-full bg-slate-300" />
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
          <div className="block h-[1px] rounded-full bg-slate-300" />
          <div className="space-y-8">
            <h3 className="text-xl font-bold">트레이닝 위치</h3>
            <div className="space-y-4">
              <h3 className=" text-slate-700">{finalAddress}</h3>
              <MapDisplay location={finalLocation} draggable={false} />
            </div>
          </div>
        </div>
        <div className="space-y-8 rounded-md bg-white p-6 shadow-md drop-shadow-md">
          <div className="rounded-md border-2 border-black ">
            <Calendar
              availableDates={trainingInfo.availableDates}
              singleDateSelect
            />
          </div>
          {selectedDate && (
            <div className="space-y-2">
              {times.map((time) => {
                console.log(time);
                return (
                  <button
                    type="button"
                    className={`w-full rounded-md border-[2px] border-accent p-2 text-2xl font-semibold ${selectedTime && 'bg-accent'}`}
                    onClick={() => timeSelectHandler(time)}
                  >
                    {Number(time) < 12 ? `오전 ${time}` : `오후 ${time}`}
                  </button>
                );
              })}
            </div>
          )}

          {selectedTime && (
            <div className="space-y-4">
              <div className="block h-[1px] rounded-full bg-slate-300" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">총 합계</h3>
                <h3 className="text-lg font-bold">
                  {trainingInfo.price && formatPriceToKRW(trainingInfo.price)}원
                </h3>
              </div>
              <div>
                <button
                  type="button"
                  className="block w-full rounded-md bg-main p-4 text-center text-xl font-bold text-white"
                  onClick={payBtnCliHandler}
                >
                  트레이닝 결제하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModal && (
        <RedirectModal>
          <Outlet />
        </RedirectModal>
      )}
    </div>
  );
};

export default Detail;
