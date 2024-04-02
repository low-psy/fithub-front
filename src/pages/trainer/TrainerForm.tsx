import React, { useCallback, useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import SubmitButton from '../../components/form/FormSubmitButton';
import MultipleDateInput from '../../components/calendar/MultipleDate';
import { FormErrors } from '../../types/common';
import FormMultipleImage from '../../components/form/FormMultipleImage';
import Calendar from '../../components/calendar/Calendar';
import { SelectedDates } from '../../redux/initialStates/initialStateTypes';
import TimeSelector from '../../components/calendar/TimeSelector';
import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import FormError from '../../components/form/FormError';
import CheckBoxInput from '../../components/form/CheckboxInput';

const TrainerForm: React.FC<{ dateList?: string[] }> = ({ dateList }) => {
  const errors = useActionData() as FormErrors;
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: '',
    endDate: '',
  });
  const { startDate } = selectedDates;
  let { endDate } = selectedDates;
  if (selectedDates.startDate) {
    if (!selectedDates.endDate) {
      endDate = startDate;
    }
  }
  const onSelectDateHandler = useCallback(
    (selectedDates: any) => setSelectedDates(selectedDates),
    [],
  );

  const className =
    'w-full rounded-xl bg-input_bg px-4 py-6 text-xl text-slate-700 outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 md:w-2/3 ';

  const options = [
    { value: 'PILATES', text: '필라테스' },
    { value: 'PT', text: '피티' },
    { value: 'CROSSFIT', text: '크로스핏' },
    { value: 'YOGA', text: '요가' },
  ];

  return (
    <Form
      method="POST"
      action="/trainer/new/create"
      className="space-y-16 pb-6 pt-4"
      encType="multipart/form-data"
    >
      <div>
        <FormLabel htmlFor="title">
          <h2 className="text-3xl text-zinc-800">제목</h2>
          <FormInput
            placeholder="제목을 입력해주세요."
            id="title"
            name="title"
            error={errors}
            className={className}
            type="text"
          />
          {errors?.title && <FormError>{errors?.title}</FormError>}
        </FormLabel>
      </div>
      <div>
        <FormLabel htmlFor="content">
          <h2 className="text-3xl text-zinc-800">내용</h2>
          <FormInput
            placeholder="내용을 입력해주세요."
            id="content"
            name="content"
            error={errors}
            className={className}
            isTextArea
          />
          {errors?.content && <FormError>{errors?.content}</FormError>}
        </FormLabel>
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-zinc-800">이미지</h2>
        <FormMultipleImage multiple />
      </div>
      <div>
        <FormLabel htmlFor="categories">
          <h2 className="mb-4 text-3xl text-zinc-800">카테고리</h2>
          <CheckBoxInput options={options} />
          {errors?.title && <FormError>{errors?.title}</FormError>}
        </FormLabel>
      </div>
      <div>
        <FormLabel htmlFor="price">
          <h2 className="text-3xl text-zinc-800">가격</h2>
          <FormInput
            placeholder="트레이닝 가격을 입력하세요"
            type="number"
            id="price"
            min={100}
            step={10000}
            name="price"
            error={errors}
            className={className}
          />
          {errors?.price && <FormError>{errors?.price}</FormError>}
        </FormLabel>
      </div>
      <div>
        <FormLabel htmlFor="date">
          <h2 className="mb-4 text-3xl text-zinc-800">트레이닝 기간</h2>
          <div className="w-full rounded-md border-2 border-neutral-500 p-4 md:w-[500px]">
            <Calendar
              onSelectedDates={onSelectDateHandler}
              unavailabeDates={dateList}
            />
            <input
              name="startDate"
              value={startDate as string}
              className="hidden"
            />
            <input
              name="endDate"
              value={endDate as string}
              className="hidden"
            />
          </div>
          {errors?.dateTime && <FormError>{errors?.dateTime}</FormError>}
        </FormLabel>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-zinc-800">트레이닝 시간</h2>
        <FormLabel htmlFor="startHour">
          <TimeSelector inputName="startHour" />
        </FormLabel>
        <FormLabel htmlFor="endHour">
          <TimeSelector inputName="lastHour" />
        </FormLabel>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-zinc-800">
          불가능한 날짜(선택사항)
        </h2>
        <MultipleDateInput />
      </div>
      <SubmitButton className="-mt-4 w-2/3 rounded-full py-5 text-2xl font-bold text-main">
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default TrainerForm;
