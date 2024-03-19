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
import { TrainingDateReservationNumDto } from '../types/swagger/model/trainingDateReservationNumDto';
import { TrainingSearchConditionDto } from '../types/swagger/model/trainingSearchConditionDto';
import { Pageable } from '../types/swagger/model/pageable';

/**
 * [GET] 회원 트레이닝 첫페이지 조회
 * @returns AxiosResponse<PageTrainingOutlineDto>
 */
export const getTraining = async (): Promise<
  AxiosResponse<PageTrainingOutlineDto>
> => {
  return defaultAxios.get<PageTrainingOutlineDto>(
    '/training/all?page=0&size=10',
  );
};

/**
 * [GET] 회원 트레이닝 첫페이지 조회
 * @returns AxiosResponse<PageTrainingOutlineDto>
 */
type searchRequestDto = {
  conditions: TrainingSearchConditionDto;
  pageable: Pageable;
};
export const postSearchTraining = async (
  requestData: searchRequestDto,
): Promise<AxiosResponse<PageTrainingOutlineDto>> => {
  return defaultAxios.post<PageTrainingOutlineDto>(
    '/training/search',
    requestData,
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

/**
 * [GET] 회원 트레이닝 상제조회
 * @param trainingId 트레이닝 id
 * @returns AxiosResponse<TrainingInfoDto>
 */
export const getDetailTraining = async (
  trainingId: number,
): Promise<AxiosResponse<TrainingInfoDto>> => {
  return authAxios.get<TrainingInfoDto>(`/training?trainingId=${trainingId}`);
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

/**
 * [POST] 트레이너의 트레이닝 생성
 * @param data 트레이닝 생성 requestdto
 * @returns
 */
export const createTraining = async (data: TrainingCreateDto) => {
  const response = await authAxios.post(`/trainers/training`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

/**
 * [GET] 회원의 트레이닝 찜 여부 조회
 * @param
 * @returns  AxiosResponse<TrainingLikesInfoDto[]>
 */
export const getTrainingLikes = async (): Promise<
  AxiosResponse<TrainingLikesInfoDto[]>
> => {
  return authAxios.get<TrainingLikesInfoDto[]>('/users/training/like/all');
};

/**
 * [POST] 회원의 트레이닝 결제전 유효성 검증
 * @param postData 트레이닝 결제 유효성 검증에 필요한 data
 * @returns
 */
export const postPaymentOrder = async (postData: ReserveReqDto) => {
  return authAxios.post<number>(`/payment/order`, postData);
};

/**
 * [POST] 회원의 트레이닝 결제 완료 후 서버에 저장
 * @param postData 포트원으로부터 전달받은 데이터와 reservationId가 포함됨
 * @returns
 */
export const postPaymentValidation = async (postData: PaymentReqDto) => {
  return authAxios.post<PaymentReqDto>(`/payment/validation`, postData);
};

/**
 * [GET] 회원의 트레이닝 결제 내역 상세 조회
 * @param reverationId 예약 id
 * @returns AxiosResponse<UsersReserveInfoDto>
 */
export const getTrainingReservation = async (
  reverationId: number,
): Promise<AxiosResponse<UsersReserveInfoDto>> => {
  return authAxios.get<UsersReserveInfoDto>(
    `/users/training/reservation?reservationId=${reverationId}`,
  );
};

/**
 * [POST] 회원의 트레이닝 찜 추가
 * @param trainingId 찜하고 싶은 트레이닝 Id
 * @returns
 */
export const postTrainingLike = async (trainingId: number) => {
  return authAxios.post(`/users/training/like?trainingId=${trainingId}`);
};

/**
 * [DELETE] 회원의 트레이닝 찜 취소
 * @param trainingId 찜 취소하고 싶은 트레이닝 Id
 * @returns
 */
export const deleteTrainingLike = async (trainingId: number) => {
  return authAxios.delete(`/users/training/like?trainingId=${trainingId}`);
};

/**
 * [GET] 트레이너의 예약 조회
 * @param
 * @returns AxiosResponse<PageTrainersReserveInfoDto>
 */
export const getTrainersReserve = async (
  status: string | null,
): Promise<AxiosResponse<PageTrainersReserveInfoDto>> => {
  return authAxios.get<PageTrainersReserveInfoDto>(
    `/trainers/training/reservations/all?${status ? `status=${status}` : ''}`,
  );
};

/**
 * [GET] 트레이너가 생성한 트레이닝 조회
 * @param closed 진행중 | 모집중을 구분하는 boolean 값
 * @returns AxiosResponse<PageTrainersTrainingOutlineDto>
 */
export const getTrainersTraining = async (
  closed: boolean,
): Promise<AxiosResponse<PageTrainersTrainingOutlineDto>> => {
  return authAxios.get<PageTrainersTrainingOutlineDto>(
    `/trainers/training?closed=${closed}`,
  );
};

/**
 * [GET] 예약된 트레이닝의 날짜 및 시간 조회
 * @param trainingId 수정하고 싶은 트레이닝 id
 * @returns AxiosResponse<TrainingDateReservationNumDto>
 */
export const getTrainersReserveCount = async (
  trainingId: number,
): Promise<AxiosResponse<TrainingDateReservationNumDto[]>> => {
  return authAxios.get<TrainingDateReservationNumDto[]>(
    `/trainers/training/reservations/count?trainingId=${trainingId}`,
  );
};

/**
 * [PUT] 트레이너가 종료된 예약 노쇼처리
 * @param reservationId 노쇼처리 하고싶은 예약 Id
 * @returns
 */
export const postTrainerNoShow = async (reservationId: number) => {
  return authAxios.put(
    `/trainers/training/reservation/status/noshow?reservationId=${reservationId}`,
  );
};

/**
 * [DELETE] 트레이너가 트레이닝을 삭제
 * @param trainingId 삭제하고 싶은 트레이닝 id
 * @returns
 */
export const deleteTraining = async (trainingId: number) => {
  return authAxios.delete(`/trainers/training?trainingId=${trainingId}`);
};

/**
 * [PUT] 트레이너가 트레이닝을 마감
 * @param trainingId 마감하고 싶은 트레이닝 id
 * @returns
 */
export const closeTraining = async (trainingId: number) => {
  return authAxios.put(`/trainers/training/close?trainingId=${trainingId}`);
};

/**
 * [PUT] 트레이너가 트레이닝을 마감해제
 * @param reservationId 마감해제 하고싶은 트레이닝 Id
 * @returns
 */
export const openTraining = async (trainingId: number) => {
  return authAxios.put(`/trainers/training/open?trainingId=${trainingId}`);
};

/**
 * [PUT] 트레이너가 트레이닝을 수정
 * @param  trainingId 수정하고 싶은 트레이닝 id
 * @param  data title, content, price, trainingUpdate를 포함한 객체
 * @returns
 */
export const updateTraining = async (
  trainingId: number,
  data: {
    title: string;
    content: string;
    price: number;
    trainingImgUpdate: TrainingImgUpdateDto;
  },
) => {
  return authAxios.put(`/trainers/training?trainingId=${trainingId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * [PUT] 트레이너가 트레이닝의 날짜 파트를 수정
 * @param  trainingId 수정하고 싶은 트레이닝 id
 * @param  data startDate, endDate, unabledDates를 포함한 객체
 * @returns
 */
export const updateTrainingCalendar = async (
  trainingId: number,
  data: {
    startDate: string;
    endDate: string;
    unableDates: string[] | undefined;
  },
) => {
  return authAxios.put(
    `/trainers/training/update/date?trainingId=${trainingId}`,
    data,
  );
};

/**
 * [POST] 유저가 트레이닝 예약 취소
 */
export const cancelReservation = async (
  reservationId: number,
  impUid: string,
) => {
  await authAxios.post('/payment/cancel', {
    reservationId,
    impUid,
  });
};

/**
 * [GET] 트레이닝 리뷰 조회
 */
export const fetchTrainingReview = async (trainingId: number) => {
  const res = await authAxios.get(`/training/reviews?trainingId=${trainingId}`);
  return res.data;
};

/**
 * [DELETE] 트레이닝 리뷰 삭제
 */

export const deleteTrainingReview = async (reviewId: number) => {
  await authAxios.delete(
    `/users/training/reservation/review?reviewId=${reviewId}`,
  );
};
