import { TrainingDto } from '../types/training';
import { defaultAxios } from './axios';

/**
 * [POST] 트레이닝 조회
 * @returns trainingdata와 status를 포함하는 object return
 */
const getTraining = async () => {
  const { data, status } = await defaultAxios.get<TrainingDto>(
    '/users/training/all',
  );
  return { data, status };
};

export default getTraining;
