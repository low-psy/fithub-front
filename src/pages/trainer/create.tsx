import React from 'react';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import TrainerForm from '../../components/trainer/TrainerForm';
import { FormErrors } from '../../types/common';
import { createTraining } from '../../apis/trainig';

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
  const images = formData.get('image') as string;
  console.log(images);
  const location = formData.get('finalLocation') as string;
  const quota = formData.get('quota') as string;
  const price = formData.get('price') as string;
  const startDate = formData.get('start_date') as string;
  const endDate = formData.get('last_date') as string;
  const startHour = formData.get('start_hour') as string;
  const endHour = formData.get('last_hour') as string;
  const unableDates = formData.getAll('unable_date') as string[];

  // 필수 필드 유효성 검사
  if (!title) errors.title = '제목을 입력해야 합니다.';
  if (!content) errors.content = '내용을 입력해야 합니다.';
  if (images.length === 0) errors.images = '이미지를 업로드해야 합니다.';
  if (!location) errors.location = '위치를 입력해야 합니다.';
  if (!quota) errors.quota = '정원을 입력해야 합니다.';
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
    const response = await createTraining(
      title,
      content,
      images,
      location,
      quota,
      price,
      startDate,
      endDate,
      startHour,
      endHour,
      unableDates,
    );
    if (response && response.status === 200) {
      return redirect('/');
    }
  } catch (err) {
    console.log(err);
  }

  return redirect('/trainer/home');
};

export default CreateTrainer;
