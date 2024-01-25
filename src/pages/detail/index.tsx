import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { AxiosError } from 'axios';
import { formatDate } from '../../components/item/TrainerItem';
import { createDetailFakeData } from '../../types/trainingClass';
import ImageSlider from '../../components/common/ImageSlice';
import ProfileSection from '../../components/item/ProfileSection';
import FilterLayout from '../../components/filter/FilterLayout';
import MapDisplay from '../../components/common/MapsDisplay';
import useMapDisplay from '../../hooks/mapDisplayHook';
import Calendar from '../../components/common/Calendar';
import { useAppSelector } from '../../hooks/reduxHooks';
import { TrainingAvailableDateDto } from '../../types/swagger/model/trainingAvailableDateDto';
import { SET_SELECTED_TIME } from '../../redux/slices/paymentSlice';
import { getDetailTraining } from '../../apis/trainig';

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

export const loader = (async ({ params, request }: LoaderFunctionArgs) => {
  const { trainingId } = params;
  try {
    const response = await getDetailTraining(Number(trainingId));
    if (response && response.status === 200) {
      console.log(response);
      return response;
    }
    return response;
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

const Detail = () => {
  const trainingInfo = createDetailFakeData();
  const images = trainingInfo.images.map((value) => {
    return value.url;
  });
  images.shift();
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

  const convertToDateObjects = (
    availableDates: Array<TrainingAvailableDateDto>,
  ) => {
    return availableDates
      .map((dateInfo) => {
        return dateInfo.availableTimes.map((timeInfo) => {
          const { hour, minute, second } = timeInfo.time;
          const dateTimeString = `${dateInfo.date}T${hour?.toString().padStart(2, '0')}:${minute?.toString().padStart(2, '0')}:${second?.toString().padStart(2, '0')}`;
          return new Date(dateTimeString);
        });
      })
      .flat();
  };
  const dateObjects = convertToDateObjects(trainingInfo.availableDates);

  const extractTimesForSelectedDate = (
    dateObjects: Date[],
    selectedDateString: string,
  ): string[] => {
    const selectedDate = new Date(selectedDateString);

    return dateObjects
      .filter(
        (dateObj) =>
          dateObj.getFullYear() === selectedDate.getFullYear() &&
          dateObj.getMonth() === selectedDate.getMonth() &&
          dateObj.getDate() === selectedDate.getDate(),
      )
      .map((dateObj) => {
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      });
  };

  const times = extractTimesForSelectedDate(
    dateObjects,
    selectedDate as string,
  );
  const dispatch = useDispatch();
  const timeSelectHandler = (time: string) => {
    dispatch(SET_SELECTED_TIME(time));
  };

  const selectedTime = useAppSelector((state) => state.payment.selectedTime);
  console.log(selectedTime);

  return (
    <div className="mb-8 space-y-4">
      <h1 className=" break-keep  text-3xl font-bold">{trainingInfo.title}</h1>
      <div className="flex max-h-[400px] items-center gap-4 overflow-hidden lg:h-[400px]">
        <div className="hidden h-full grow lg:block lg:shrink-0 lg:basis-1/2">
          <img
            src={trainingInfo.images[0].url}
            alt="트레이닝 이미지"
            className="
            h-full w-full  object-cover"
          />
        </div>
        <div className="h-full grow lg:basis-1/2">
          <ImageSlider postImages={images} />
        </div>
      </div>
      <div className="flex gap-8">
        <div className="grow space-y-6 ">
          <ProfileSection
            profileImage={trainingInfo.trainerInfoDto.trainerProfileImg}
            profileName={trainingInfo.trainerInfoDto.name}
            location={trainingInfo.trainerInfoDto.location}
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
        <FilterLayout>
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
                    {formatPriceToKRW(trainingInfo.price)}원
                  </h3>
                </div>
                <button
                  type="button"
                  className="w-full rounded-md bg-main p-4 text-center text-xl font-bold text-white"
                >
                  트레이닝 결제하기
                </button>
              </div>
            )}
          </div>
        </FilterLayout>
      </div>
    </div>
  );
};

export default Detail;
