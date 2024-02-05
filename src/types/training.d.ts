import { LoaderFunction } from 'react-router-dom';
import { TrainingOutlineDto } from './swagger/model/trainingOutlineDto';

export type LoaderData<TLoaderFn extends LoaderFunction> =
  Awaited<ReturnType<TLoaderFn>> extends Response | infer D ? D : never;

export class PaymentRequest {
  clientId: string;

  method: string;

  orderId: string;

  amount: number;

  goodsName: string;

  returnUrl: string;

  fnError: (result: { errorMsg: string }) => void;

  constructor(trainingInfo: {
    id: string;
    price: number;
    title: string;
    method: string;
  }) {
    this.clientId = 'S2_cebfac3f527448e988e6e872c9c59ad6';
    this.method = trainingInfo.method;
    this.orderId = trainingInfo.id;
    this.amount = trainingInfo.price;
    this.goodsName = trainingInfo.title;
    this.returnUrl = `http://localhost:3000/detail/${trainingInfo.id}/payment`;
    this.fnError = function (result: { errorMsg: string }) {
      alert(`개발자확인용: ${result.errorMsg}`);
    };
  }

  // 필요한 경우 추가 메서드를 여기에 정의할 수 있습니다.
}
