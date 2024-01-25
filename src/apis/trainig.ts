import { AxiosResponse } from 'axios';
import { TrainingDto } from '../types/training';
import { createFakeData } from '../types/trainingClass';
import { authAxios, defaultAxios } from './axios';
import { TrainingInfoDto } from '../types/swagger/model/trainingInfoDto';
import { ApiResponse } from '../types/common';

/**
 * [POST] 트레이닝 조회
 * @returns trainingdata와 status를 포함하는 object return
 */
export const getTraining = async () => {
  const { data, status } = await defaultAxios.get<TrainingDto>(
    '/users/training/all?page=0&size=10',
  );

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

type FormDataEntryValue = string | File;

export const createTraining = async (
  title: string,
  content: string,
  images: FormDataEntryValue[],
  location: string,
  quota: string,
  price: string,
  startDate: string,
  endDate: string,
  startHour: string,
  endHour: string,
  unableDates: string[],
) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append(`images`, image);
  });
  formData.append('title', title);
  formData.append('content', content);
  formData.append('location', location);
  formData.append('quota', quota);
  formData.append('price', price);
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);
  formData.append('startDate', startDate);
  formData.append('startHour', startHour);
  formData.append('endHour', endHour);
  unableDates.forEach((date) => {
    formData.append('unableDates', date);
  });

  const response = await authAxios.post('/trainer/training', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const getDetailTraining = async (
  trainingId: number,
): Promise<AxiosResponse<ApiResponse<TrainingInfoDto>>> => {
  return authAxios.get<ApiResponse<TrainingInfoDto>>(
    `/users/training?trainingId=${trainingId}`,
  );
};
