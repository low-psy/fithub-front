import { AxiosResponse } from 'axios';
import qs from 'qs';
import { TrainerOutlineDto } from 'types/swagger/model/trainerOutlineDto';
import { TrainerSearchAllLicenseDto } from 'types/swagger/model/trainerSearchAllLicenseDto';
import { TrainerRecommendationOutlineDto } from 'types/swagger/model/trainerRecommendationOutlineDto';
import { authAxios, defaultAxios } from './axios';
import { CareerType, TrainerInfoRes } from '../pages/user/trainerInfo/type';
import { PageTrainerOutlineDto } from '../types/swagger/model/pageTrainerOutlineDto';
import { TrainerSearchAllReviewDto } from '../types/swagger/model/trainerSearchAllReviewDto';
import { MapDto } from '../types/swagger/model/mapDto';

const certifyTrainer = (formData: FormData) => {
  const response = authAxios.post('/auth/trainer/certificate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const fetchTrainerInfo = async (): Promise<
  AxiosResponse<TrainerInfoRes>
> => {
  const response = await authAxios.get('/trainers/spec');
  return response;
};

export default certifyTrainer;

// 트레이너정보 자격증 1개 추가
export const addTrainerLicense = async (file: FormData) => {
  await authAxios.post('/trainers/licenses', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 트레이너정보 자격증 1개 삭제
export const deleteTrainerLicense = async (licenseId: number) => {
  await authAxios.delete(`/trainers/licenses?licenseId=${licenseId}`);
};

// 트레이너 경력 하나 조회
export const fetchCareerInfo = async (careerId: number) => {
  const res = await authAxios.get(`/trainers/careers?careerId=${careerId}`);
  return res.data;
};

// 트레이너 경력 하나 수정
export const editTrainerCareer = async (careerId: number, data: CareerType) => {
  await authAxios.put(`/trainers/careers?careerId=${careerId}`, { ...data });
};

// 트레이너 경력 추가
export const addTrainerCareer = async (data: any) => {
  const res = await authAxios.post('/trainers/careers', { ...data });
  return res.data;
};

// 트레이너 경력 하나 삭제
export const deleteTrainerCareer = async (careerId: number) => {
  await authAxios.delete(`/trainers/careers?careerId=${careerId}`);
};

type getTrainerProps = {
  page: number;
  size: number;
  sort: string[];
  interest?: string;
  keyword?: string;
  gender?: string;
};
export const getTrainers = async (requestData: getTrainerProps) => {
  const queryString = qs.stringify(requestData);
  const url = `/search/trainers?${queryString}`;
  return defaultAxios.get<PageTrainerOutlineDto>(url);
};

export const getTrainersReviews = async (trainerId: string) => {
  return defaultAxios.get<TrainerSearchAllReviewDto>(
    `/search/trainers/reviews?trainerId=${trainerId}`,
  );
};

export const getTrainersLicenses = async (trainerId: string) => {
  return defaultAxios.get<TrainerSearchAllLicenseDto>(
    `/search/trainers/licenses?trainerId=${trainerId}`,
  );
};

export const getTrainersInfos = async (trainerId: string) => {
  return defaultAxios.get<TrainerOutlineDto>(`/search/trainers/${trainerId}`);
};

export const getMapList = async (requestData: {
  page: number;
  x: number;
  y: number;
}) => {
  const queryString = qs.stringify(requestData);
  const url = `/auth/map?${queryString}`;
  return authAxios.get<MapDto>(url);
};

export const getRecommendTrainers = async (requestData: {
  latitude: number;
  longitude: number;
  size: number;
}) => {
  const queryString = qs.stringify(requestData);
  const url = `/users/trainer/recommendation?${queryString}`;
  return authAxios.get<TrainerRecommendationOutlineDto>(url);
};
