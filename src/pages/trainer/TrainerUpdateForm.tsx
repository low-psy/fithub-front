import React, { useEffect, useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import { AxiosError } from 'axios';
import SubmitButton from '../../components/form/FormSubmitButton';
import { FormErrors } from '../../types/common';
import FormImageSelect from '../../components/form/FormImageSelect';
import { TrainingInfoDto } from '../../types/swagger/model/trainingInfoDto';
import { getDetailTraining } from '../../apis/trainig';
import { ErrorResponseDto } from '../../types/swagger/model/errorResponseDto';
import { errorFunc } from '../../utils/util';
import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import FormError from '../../components/form/FormError';

const TrainerUpdateForm: React.FC<{ trainingId: number }> = ({
  trainingId,
}) => {
  const [trainingDto, setTrainingDto] = useState<TrainingInfoDto>();
  const errors = useActionData() as FormErrors;
  const images = trainingDto?.images?.map((image) => image.url);

  const className =
    'w-full rounded-xl bg-input_bg px-4 py-6 text-xl text-slate-700 outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 md:w-2/3 ';

  useEffect(() => {
    const trainingFetch = async () => {
      try {
        const res = await getDetailTraining(trainingId);
        if (res.status === 200) {
          setTrainingDto(res.data);
        } else {
          throw new Error(`server is trouble with${res.status}`);
        }
      } catch (err) {
        const error = err as AxiosError<ErrorResponseDto>;
        errorFunc(error);
      }
    };
    trainingFetch();
  }, [trainingId]);

  return (
    <Form
      method="PUT"
      action="/trainer/home?type=content"
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
            defaultValue={trainingDto?.title}
          />
          <input className="hidden" value={trainingDto?.id} name="id" />
          {errors?.content && <FormError>{errors?.content}</FormError>}
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
            defaultValue={trainingDto?.content}
          />
          {errors?.content && <FormError>{errors?.content}</FormError>}
        </FormLabel>
      </div>
      <div>
        <FormImageSelect value={images as string[]} />
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
            defaultValue={trainingDto?.price}
          />
          {errors?.price && <FormError>{errors?.price}</FormError>}
        </FormLabel>
      </div>
      <SubmitButton className="-mt-4 w-2/3 rounded-full py-5 text-2xl font-bold text-main">
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default TrainerUpdateForm;
