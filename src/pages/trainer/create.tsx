import React from 'react';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import TrainerForm from '../../components/trainer/TrainerForm';
import { FormErrors } from '../../types/common';
import { createTraining } from '../../apis/trainig';
import { fileToBase64 } from '../../utils/util';

const CreateTrainer = () => {
  return (
    <div className="space-y-8">
      <TrainerForm useCase="create" />
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
  const startHour = formData.get('start_hour') as string;
  const startHourString = `${startHour}:00`;
  const endHour = formData.get('last_hour') as string;
  const endHourString = `${endHour}:00`;
  const unableDates = formData.getAll('unable_date') as string[];
  const nonEmptyUnableDates =
    unableDates.filter((date) => date).length === 0
      ? undefined
      : unableDates.filter((date) => date);

  console.log(nonEmptyUnableDates);

  // 필수 필드 유효성 검사
  if (!title || title.trim().length < 2 || title.trim().length > 100)
    errors.title = '제목은 2글자 이상 100글자 이하로 입력해야 합니다.';
  if (!content) errors.content = '내용을 입력해야 합니다.';
  if (images.length === 0) errors.images = '이미지를 업로드해야 합니다.';
  if (!location) errors.location = '위치를 입력해야 합니다.';
  if (!quota) errors.quota = '최소 모집인원(1명) 이상 입력해주세요.';
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

  try {
    const response = await createTraining({
      title,
      content,
      images: nonEmptyImageFiles,
      location,
      quota: quotaNumber,
      price: priceNumber,
      startDate,
      endDate,
      startHour: startHourString,
      endHour: endHourString,
      unableDates: nonEmptyUnableDates,
    });
    if (response && response.status === 200) {
      return redirect('/');
    }
  } catch (err) {
    console.log(err);
    return '/trainer/new/create';
  }

  return redirect('/trainer/home');
};

export default CreateTrainer;
