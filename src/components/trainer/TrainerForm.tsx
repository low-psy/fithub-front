import React, { useState } from 'react';
import { Form, FormMethod, useActionData } from 'react-router-dom';
import PostInput from '../post/FormText';
import InputComponent from '../post/FormInput';
import TextareaComponent from '../post/FormTextarea';
import SubmitButton from '../post/FormSubmitButton';
import FormSingleImage from '../post/FormSingleImage';
import LocationSearchInput from '../common/LocationSearchInput';
import DetailLocationInput from '../common/DetailLocation';
import MultipleDateInput from '../common/MultipleDate';
import { FormErrors } from '../../types/common';

interface TrainerFormProps {
  content?: string;
  images?: string[];
  hashTags?: string[];
  useCase: string;
  id?: number;
  title?: string;
}

const TrainerForm: React.FC<TrainerFormProps> = ({
  title,
  content,
  images,
  hashTags,
  useCase,
  id,
}) => {
  const errors = useActionData() as FormErrors;
  const [showDetailInput, setShowDetailInput] = useState(false);
  const [formattedAddress, setformattedAddress] = useState('');
  const [finalAddress, setFinalAddress] = useState('');

  const handleLocationSelect = (address: string) => {
    setformattedAddress(address);
    setShowDetailInput(true);
  };

  let method: FormMethod = 'post';
  let action;
  if (useCase === 'create') {
    method = 'post';
    action = '/trainer/new/create';
  } else if (useCase === 'update') {
    method = 'put';
    action = '/trainer/update';
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const handleDetailLocationInput = (detail: string) => {
    const fullAddress = `${formattedAddress}, ${detail}`;
    setFinalAddress(fullAddress);
  };

  return (
    <Form
      method={method}
      action={action}
      className="space-y-16 pb-6 pt-4"
      encType="multipart/form-data"
    >
      <div>
        <PostInput
          spanText="write title"
          htmlFor="title"
          titleText="트레이닝 제목"
          error={errors?.title}
        >
          <InputComponent
            placeholder="제목을 입력하세요"
            name="title"
            type="text"
            id="title"
            value={title}
          />
        </PostInput>
      </div>
      <div>
        <input hidden name="id" value={id} />
        <PostInput
          spanText="write content"
          htmlFor="content"
          titleText="트레이닝 내용"
          error={errors?.content}
        >
          <TextareaComponent
            placeholder="내용을 입력해 주세요"
            name="content"
            className="h-48"
            id="content"
            value={content}
          />
        </PostInput>
      </div>
      <div>
        <FormSingleImage value={images}>
          트레이너 프로필 이미지(1개만 선택)
        </FormSingleImage>
      </div>
      <div className="space-y-4">
        <PostInput
          spanText="input location"
          htmlFor="location"
          titleText="트레이너 위치"
          error={errors?.location}
        >
          <LocationSearchInput onLocationSelect={handleLocationSelect} />
          <input name="finalLocation" value={finalAddress} hidden />
        </PostInput>
        {showDetailInput && (
          <DetailLocationInput
            onDetailLocationInput={handleDetailLocationInput}
          />
        )}
      </div>
      <div>
        <PostInput
          spanText="write keyword"
          htmlFor="price"
          titleText="트레이닝 단일 가격"
          error={errors?.price}
        >
          <InputComponent
            placeholder="트레이닝 가격을 입력하세요"
            name="price"
            type="number"
            id="price"
            min={10000}
            step={10000}
          />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="write keyword"
          htmlFor="quota"
          titleText="트레이닝 정원"
          error={errors?.quota}
        >
          <InputComponent
            placeholder="최대 정원을 입력하세요"
            name="quota"
            type="number"
            id="quota"
            min={1}
            step={1}
          />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="시작일을 입력하세요"
          htmlFor="start_date"
          titleText="트레이닝 기간"
          error={errors?.dateTime}
        >
          <InputComponent
            placeholder="시작일을 입력하세요"
            name="start_date"
            type="date"
            id="start_date"
          />
        </PostInput>
        <PostInput
          spanText="마감일을 입력하세요"
          htmlFor="last_date"
          titleText=""
        >
          <InputComponent
            placeholder="마감일을 입력하세요"
            name="last_date"
            type="date"
            id="last_date"
          />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="시간을 입력하세요"
          htmlFor="start_hour"
          titleText="트레이닝 시간"
        >
          <InputComponent
            placeholder="시작 시간을 입력하세요"
            name="start_hour"
            type="time"
            id="start_hour"
          />
        </PostInput>
        <PostInput
          spanText="시간을 입력하세요"
          htmlFor="last_hour"
          titleText=""
        >
          <InputComponent
            placeholder="마감 시간을 입력하세요"
            name="last_hour"
            type="time"
            id="last_hour"
          />
        </PostInput>
      </div>

      <MultipleDateInput />
      <SubmitButton className="-mt-4 w-2/3 rounded-full py-5 text-2xl font-bold text-main">
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default TrainerForm;
