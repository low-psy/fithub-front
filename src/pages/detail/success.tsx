import React from 'react';
import { AxiosError } from 'axios';
import {
  Link,
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
} from 'react-router-dom';
import { getTrainingReservation } from '../../apis/trainig';
import { LoaderData } from '../../types/common';
import { formatPriceToKRW } from '../../utils/util';

export const loader = (async ({ params }: LoaderFunctionArgs) => {
  const { reservationId } = params;
  console.log(reservationId);
  try {
    const response = await getTrainingReservation(Number(reservationId));
    if (response && response.status === 200) {
      return response;
    }
    throw new Error(`Server responded with status: ${response.status}`);
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

export default function SuccessPage() {
  const res = useLoaderData() as LoaderData<typeof loader>;
  const { data } = res;
  return (
    <div className="flex justify-center p-10">
      <div className="w-[800px] space-y-5">
        <div className="flex items-center gap-x-2">
          <span className="material-symbols-rounded text-4xl">verified</span>
          <h1 className="text-4xl font-extrabold">결제 성공</h1>
        </div>
        <div className="space-y-6 bg-gray-100 p-6">
          <div className="flex justify-between text-xl ">
            <p>트레이닝</p>
            <p className="max-w-[500px] truncate  text-right">{data.title}</p>
          </div>
          <div className="flex justify-between text-xl ">
            <p>가격</p>
            <p className="max-w-[500px] truncate  text-right">
              {formatPriceToKRW(data.price as number)}원
            </p>
          </div>
          <div className="flex justify-between text-xl ">
            <p>예약일시</p>
            <p className="max-w-[500px] truncate  text-right">
              {data.reserveDateTime?.toString()}
            </p>
          </div>
          <div className="flex justify-between text-xl ">
            <p>결제일시</p>
            <p className="max-w-[500px] truncate  text-right">
              {data.paymentDateTime?.toString()}
            </p>
          </div>
          <div className="flex justify-between text-xl ">
            <p>주문번호</p>
            <p className="max-w-[500px] truncate  text-right">{data.impUid}</p>
          </div>
          <div className="flex justify-between text-xl ">
            <p>상품번호</p>
            <p className="max-w-[500px] truncate  text-right">
              {data.reservationId}
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="block rounded-full bg-sub px-12 py-6 text-center text-2xl font-extrabold text-slate-900"
        >
          메인화면으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
