import React, { useState } from 'react';
import { Form, FormMethod, useActionData } from 'react-router-dom';
import PostInput from '../post/FormText';
import InputComponent from '../post/FormInput';
import TextareaComponent from '../post/FormTextarea';
import SubmitButton from '../post/FormSubmitButton';
import LocationSearchInput from '../common/LocationSearchInput';
import DetailLocationInput from '../common/DetailLocation';
import MultipleDateInput from '../common/MultipleDate';
import { FormErrors } from '../../types/common';
import FormMultipleImage from '../post/FormMultipleImage';
import Calendar from '../common/Calendar';
import { SelectedDates } from '../../redux/initialStates/initialStateTypes';
import TimeSelector from '../common/TimeSelector';
import { TrainingInfoDto } from '../../types/swagger/model/trainingInfoDto';

interface TrainerFormProps {
  useCase: string;
  id?: number;
  res?: TrainingInfoDto;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ useCase, id, res }) => {
  const errors = useActionData() as FormErrors;
  const [showDetailInput, setShowDetailInput] = useState(false);
  const [formattedAddress, setformattedAddress] = useState('');
  const [finalAddress, setFinalAddress] = useState('');

  const handleLocationSelect = (address: string) => {
    setformattedAddress(address);
    setShowDetailInput(true);
  };

  let method: FormMethod = 'post';
  if (useCase === 'create') {
    method = 'post';
  } else if (useCase === 'update') {
    method = 'put';
  }

  const handleDetailLocationInput = (detail: string) => {
    const fullAddress = `${formattedAddress}, ${detail}`;
    setFinalAddress(fullAddress);
  };
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: res?.startDate || null,
    endDate: res?.endDate || null,
  });
  const { startDate } = selectedDates;
  let { endDate } = selectedDates;
  if (selectedDates.startDate) {
    if (!selectedDates.endDate) {
      endDate = startDate;
    }
  }

  return (
    <Form
      method={method}
      action="/trainer/new/create"
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
            value={res?.title}
          />
          <input className="hidden" name="trainingId" value={res?.id} />
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
            value={res?.content}
          />
        </PostInput>
      </div>
      <div>
        {res && (
          <h3 className="font-bold text-main">
            *이미지를 다시 선택해주세요. 선택하지 않을 시 트레이닝 이미지가
            표시되지 않습니다*
          </h3>
        )}
        <FormMultipleImage multiple>이미지 선택</FormMultipleImage>
      </div>
      <div className="space-y-4">
        {res && (
          <h3 className="font-bold text-main">
            *위치를 다시 입력해주세요. 입력하지 않을 시 위치가 존재하지
            않게됩니다*
          </h3>
        )}
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
            value={res?.price}
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
            value={res?.quota}
          />
        </PostInput>
      </div>
      <div>
        <PostInput
          spanText="트레이닝 기간을 입력하세요"
          htmlFor="date"
          titleText="트레이닝 기간"
          error={errors?.dateTime}
        >
          <div className="w-full md:w-[500px]">
            <Calendar
              onSelectedDates={(selectedDates) =>
                setSelectedDates(selectedDates)
              }
              defaultStartDate={res?.startDate}
              defaultEndDate={res?.endDate}
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
        </PostInput>
      </div>
      <div className="space-y-4">
        {res && (
          <h3 className="font-bold text-main">
            *시간을 다시 입력해주세요. 입력하지 않을 시 시간을 설정할 수
            없습니다*
          </h3>
        )}
        <PostInput
          spanText="시간을 입력하세요"
          htmlFor="startHour"
          titleText="트레이닝 시간"
        >
          <TimeSelector inputName="startHour" />
        </PostInput>
        <PostInput spanText="시간을 입력하세요" htmlFor="lastHour" titleText="">
          <TimeSelector inputName="lastHour" />
        </PostInput>
      </div>
      <div>
        {res && (
          <h3 className="font-bold text-main">
            *불가능한 날짜를 다시 입력해주세요. 입력하지 않을 시 불가능한 날짜는
            없는걸로 간주됩니다*
          </h3>
        )}
        <MultipleDateInput />
      </div>
      <SubmitButton className="-mt-4 w-2/3 rounded-full py-5 text-2xl font-bold text-main">
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default TrainerForm;
