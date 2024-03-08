import { AxiosResponse } from 'axios';
import { authAxios } from './axios';
import { TrainerInfoRes } from '../pages/user/trainerInfo/type';

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

export const fetchCareerInfo = async (careerId: number) => {
  const res = await authAxios.get(`/trainers/careers?careerId=${careerId}`);
  return res.data;
};

// 트레이너정보 경력 수정
export const editTrainerCareer = async (
  careerId: number,
  company: string,
  work: string,
  address: string,
  longitude: number,
  latitude: number,
  startDate: string,
  endDate: string,
  working: boolean,
) => {
  await authAxios.put(`/trainers/careers?careerId=${careerId}`, {
    careerId,
    company,
    work,
    address,
    longitude,
    latitude,
    startDate,
    endDate,
    working,
  });
};
