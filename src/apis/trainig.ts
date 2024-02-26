import { AxiosResponse } from 'axios';
import qs from 'qs';
import { authAxios, defaultAxios } from './axios';
import { TrainingInfoDto } from '../types/swagger/model/trainingInfoDto';
import { PageTrainingOutlineDto } from '../types/swagger/model/pageTrainingOutlineDto';
import { TrainingCreateDto } from '../types/swagger/model/trainingCreateDto';
import { PaymentReqDto } from '../types/swagger/model/paymentReqDto';
import { ReserveReqDto } from '../types/swagger/model/reserveReqDto';
import { PageTrainersReserveInfoDto } from '../types/swagger/model/pageTrainersReserveInfoDto';
import { TrainingLikesInfoDto } from '../types/swagger/model/trainingLikesInfoDto';
import { UsersReserveInfoDto } from '../types/swagger/model/usersReserveInfoDto';
import { PageTrainersTrainingOutlineDto } from '../types/swagger/model/pageTrainersTrainingOutlineDto';
import { TrainingImgUpdateDto } from '../types/swagger/model/trainingImgUpdateDto';

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

/**
 * [GET] 회원 트레이닝 다음 페이지 조회
 * @param currentPage 이전 페이지 인덱스
 * @returns AxiosResponse<PageTrainingOutlineDto>
 */
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

export const getTrainingReservation = async (
  reverationId: number,
): Promise<AxiosResponse<UsersReserveInfoDto>> => {
  return authAxios.get<UsersReserveInfoDto>(
    `/users/training/reservation?reservationId=${reverationId}`,
  );
};

/**
 * [GET] 회원 트레이닝 찜 조회
 * @param trainingIdList 트레이닝 id 리스트
 * @returns AxiosResponse<boolean[]
 */
export const getUsersTrainingLikes = async (
  trainingIdList: number[],
): Promise<AxiosResponse<boolean[]>> => {
  return authAxios.post<boolean[]>(
    `/users/training/like/check/list`,
    trainingIdList,
  );
};

export const getTrainersReserve = async (): Promise<
  AxiosResponse<PageTrainersReserveInfoDto>
> => {
  return authAxios.get<PageTrainersReserveInfoDto>(
    '/trainer/training/reservations/all',
  );
};

export const getTrainersTraining = async (
  closed: boolean,
): Promise<AxiosResponse<PageTrainersTrainingOutlineDto>> => {
  return authAxios.get<PageTrainersTrainingOutlineDto>(
    `/trainer/training?closed=${closed}`,
  );
};

export const getTrainersClosedTraining = async (
  closed: boolean,
): Promise<AxiosResponse<PageTrainersTrainingOutlineDto>> => {
  return authAxios.get<PageTrainersTrainingOutlineDto>(
    `/trainer/training?closed=true`,
  );
};

export const postTrainerClosed = async (trainingId: number) => {
  return authAxios.put(`/trainer/training/close?trainingId=${trainingId}`);
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

export const deleteTraining = async (trainingId: number) => {
  return authAxios.delete(`/trainer/training?trainingId=${trainingId}`);
};

export const closeTraining = async (trainingId: number) => {
  return authAxios.put(`/trainer/training/close?trainingId=${trainingId}`);
};

export const openTraining = async (trainingId: number) => {
  return authAxios.put(`/trainer/training/open?trainingId=${trainingId}`);
};

export const updateTraining = async (
  trainingId: number,
  data: {
    title: string;
    content: string;
    price: number;
    trainingImgUpdate: TrainingImgUpdateDto;
  },
) => {
  return authAxios.put(`/trainer/training?trainingId=${trainingId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
