import { TrainingDto } from '../types/training';
import { createFakeData } from '../types/trainingClass';
import { defaultAxios } from './axios';

/**
 * [POST] 트레이닝 조회
 * @returns trainingdata와 status를 포함하는 object return
 */
export const getTraining = async () => {
  const { data, status } = await defaultAxios.get<TrainingDto>(
    '/users/training/all?page=0&size=10',
  );

  console.log(data);
  return { data, status };
};

export const getNextPageData = async (currentPage: number) => {
  // try {
  //   const response = await fetch(
  //     `/users/training/all?page=${currentPage + 1}&size=10`,
  //   );
  //   if (!response.ok) {
  //     throw new Error('Server response was not OK');
  //   }
  //   const data: ApiResponse = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Failed to fetch next page data:', error);
  //   return null;
  // }
  const response = createFakeData();
  return {
    ...response,
    number: currentPage,
    content: response.content.map((trainer) => {
      return { ...trainer, title: `${trainer.title}_${currentPage}page` };
    }),
  };
};
