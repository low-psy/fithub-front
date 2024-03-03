import { AxiosResponse } from 'axios';
import { authAxios } from './axios';
import { TrainerInfoRes } from '../pages/user/trainerInfo/trainerInfo';

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
