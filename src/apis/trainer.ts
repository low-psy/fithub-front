import { AxiosResponse } from 'axios';
import { authAxios } from './axios';
import { CareerType, TrainerInfoRes } from '../pages/user/trainerInfo/type';

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
