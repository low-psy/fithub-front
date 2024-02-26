import React from 'react';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { AxiosError } from 'axios';
import TrainerForm from './TrainerForm';
import { FormErrors } from '../../types/common';
import { createTraining } from '../../apis/trainig';
import { errorFunc } from '../../utils/util';
import { ErrorResponseDto } from '../../types/swagger/model/errorResponseDto';

const CreateTrainer = () => {
  return (
    <div className="space-y-8">
      <TrainerForm />
    </div>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const errors: FormErrors = {};
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const images = formData.getAll('image') as File[];
  const nonEmptyImageFiles =
    images.filter((file) => file.size > 0).length === 0
      ? undefined
      : images.filter((file) => file.size > 0);

  const location = formData.get('finalLocation') as string;
  const quota = formData.get('quota');
  const quotaNumber = quota ? Number(quota) : 0;
  const price = formData.get('price');
  const priceNumber = price ? Number(price) : 0;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const startHour = formData.get('startHour') as string;
  const endHour = formData.get('lastHour') as string;
  const unableDates = formData.getAll('unable_date') as string[];
  const nonEmptyUnableDates =
    unableDates.filter((date) => date).length === 0
      ? undefined
      : unableDates.filter((date) => date);

  // 필수 필드 유효성 검사
  if (!title || title.trim().length < 2 || title.trim().length > 100)
    errors.title = '제목은 2글자 이상 100글자 이하로 입력해야 합니다.';
  if (!content) errors.content = '내용을 입력해야 합니다.';
  if (images.length === 0) errors.images = '이미지를 업로드해야 합니다.';
  if (!location) errors.location = '위치를 입력해야 합니다.';
  if (!price) errors.price = '가격을 입력해야 합니다.';
  if (!startDate || !endDate || !startHour || !endHour) {
    errors.dateTime = '날짜와 시간을 입력해야 합니다';
  }

  const startDateTime = new Date(`${startDate}T${startHour}`);
  const endDateTime = new Date(`${endDate}T${endHour}`);
  if (startDateTime >= endDateTime) {
    errors.dateTime =
      '시작 날짜 및 시간이 종료 날짜 및 시간보다 빨라야 합니다.';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const trainingObj = {
    title,
    content,
    images: nonEmptyImageFiles,
    location,
    quota: quotaNumber,
    price: priceNumber,
    startDate,
    endDate,
    startHour,
    endHour,
    unableDates: nonEmptyUnableDates,
  };

  try {
    const response = await createTraining(trainingObj);

    if (response && response.status === 200) {
      return redirect('/');
    }
  } catch (err) {
    const error = err as AxiosError<ErrorResponseDto>;
    errorFunc(error);
    if (error.response?.data.code === 'PERMISSION_DENIED') {
      return redirect('/');
    }
    return redirect('/trainer/new/create');
  }
  return null;
};

export default CreateTrainer;
