import { AxiosResponse } from 'axios';
import { createFakeData } from '../types/trainingClass';
import { authAxios, defaultAxios } from './axios';
import { TrainingInfoDto } from '../types/swagger/model/trainingInfoDto';
import { PageTrainingOutlineDto } from '../types/swagger/model/pageTrainingOutlineDto';
import { TrainingCreateDto } from '../types/swagger/model/trainingCreateDto';
import { PaymentReqDto } from '../types/swagger/model/paymentReqDto';
import { ReserveReqDto } from '../types/swagger/model/reserveReqDto';

/**
 * [POST] 트레이닝 조회
 * @returns trainingdata와 status를 포함하는 object return
 */

export const getTraining = async (): Promise<
  AxiosResponse<PageTrainingOutlineDto>
> => {
  return defaultAxios.get<PageTrainingOutlineDto>(
    '/training/all?page=0&size=10',
  );
};

export const getNextPageData = async (
  currentPage: number,
): Promise<AxiosResponse<PageTrainingOutlineDto>> => {
  return defaultAxios.get<PageTrainingOutlineDto>(
    `/training/all?page=${currentPage + 1}&size=10`,
  );
};

export const createTraining = async (data: TrainingCreateDto) => {
  const response = await authAxios.post('/trainer/training', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const getDetailTraining = async (
  trainingId: number,
): Promise<AxiosResponse<TrainingInfoDto>> => {
  return authAxios.get<TrainingInfoDto>(`/training?trainingId=${trainingId}`);
};

export const postPaymentOrder = async (postData: ReserveReqDto) => {
  return authAxios.post<number>(`/payment/order`, postData);
};

export const postPaymentValidation = async (postData: PaymentReqDto) => {
  return authAxios.post<PaymentReqDto>(`/payment/validation`, postData);
};
