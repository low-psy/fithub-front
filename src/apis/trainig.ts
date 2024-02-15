import { AxiosResponse } from 'axios';
import { authAxios, defaultAxios } from './axios';
import { TrainingInfoDto } from '../types/swagger/model/trainingInfoDto';
import { PageTrainingOutlineDto } from '../types/swagger/model/pageTrainingOutlineDto';
import { TrainingCreateDto } from '../types/swagger/model/trainingCreateDto';
import { PaymentReqDto } from '../types/swagger/model/paymentReqDto';
import { ReserveReqDto } from '../types/swagger/model/reserveReqDto';
import { PageTrainersReserveInfoDto } from '../types/swagger/model/pageTrainersReserveInfoDto';
import { TrainingLikesInfoDto } from '../types/swagger/model/trainingLikesInfoDto';

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
  const response = await authAxios.post(`/trainer/training`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const updateTraining = async (
  data: TrainingCreateDto,
  trainingId: number,
) => {
  const response = await authAxios.post(
    `/trainer/training?${trainingId}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
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

export const getTrainersReserve = async (): Promise<
  AxiosResponse<PageTrainersReserveInfoDto>
> => {
  return authAxios.get<PageTrainersReserveInfoDto>(
    '/trainer/training/reservations',
  );
};

export const postTrainerNoShow = async (reservationId: number) => {
  return authAxios.put(
    `/trainer/training/reservation/status/noshow?reservationId=${reservationId}`,
  );
};

export const postTrainingLike = async (trainingId: number) => {
  return authAxios.post(`/users/training/like?trainingId=${trainingId}`);
};

export const deleteTrainingLike = async (trainingId: number) => {
  return authAxios.delete(`/users/training/like?trainingId=${trainingId}`);
};

export const getTrainingLikes = async (): Promise<
  AxiosResponse<TrainingLikesInfoDto[]>
> => {
  return authAxios.get<TrainingLikesInfoDto[]>('/users/training/like/all');
};
