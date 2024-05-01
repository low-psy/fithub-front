import React, { useCallback, useEffect, useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import { AxiosError } from 'axios';
import SubmitButton from '../../components/form/FormSubmitButton';
import { FormErrors } from '../../types/common';
import { ErrorResponseDto } from '../../types/swagger/model/errorResponseDto';
import { errorFunc } from '../../utils/util';
import FormLabel from '../../components/form/FormLabel';
import FormError from '../../components/form/FormError';
import { SelectedDates } from '../../redux/initialStates/initialStateTypes';
import { TrainingDateReservationNumDto } from '../../types/swagger/model/trainingDateReservationNumDto';
import {
  getTrainersDateList,
  getTrainersReserveCount,
} from '../../apis/trainig';
import Calendar from '../../components/calendar/Calendar';
import MultipleDateInput from '../../components/calendar/MultipleDate';

const TrainerCalendarUpdateForm: React.FC<{ trainingId: number }> = ({
  trainingId,
}) => {
  const [trainingCalendarDto, setTrainingCalendarDto] =
    useState<TrainingDateReservationNumDto[]>();
  const [selectUnabledDates, setSelectUnabledDates] = useState<string[]>();
  const errors = useActionData() as FormErrors;

  const dates = trainingCalendarDto?.map((training) => training.date);
  const defaultStartDate = dates?.[0];
  const defaultEndDate = dates?.[dates.length - 1];

  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: '',
    endDate: '',
  });
  const hasResrvationTraining = trainingCalendarDto?.filter(
    (training) => (training.reservationNum as number) > 0,
  );
  const defaultUnableDates = hasResrvationTraining?.map(
    (training) => training.date as string,
  );
  const { startDate } = selectedDates;
  let { endDate } = selectedDates;
  if (selectedDates.startDate) {
    if (!selectedDates.endDate) {
      endDate = startDate;
    }
  }

  useEffect(() => {
    const trainingFetch = async () => {
      try {
        const res = await getTrainersReserveCount(trainingId);
        const dateList = await getTrainersDateList();
        if (res.status === 200) {
          setTrainingCalendarDto(res.data);
        } else {
          throw new Error(`server is trouble with${res.status}`);
        }
        if (dateList.status === 200) {
          setSelectUnabledDates(dateList.data);
        }
      } catch (err) {
        const error = err as AxiosError<ErrorResponseDto>;
        errorFunc(error);
      }
    };
    trainingFetch();
  }, [trainingId]);

  const onSelectDateHandler = useCallback(
    (selectedDates: any) => setSelectedDates(selectedDates),
    [],
  );
  return (
    <Form
      method="PUT"
      action="/trainer/home?type=calendar"
      className="space-y-16 pb-6 pt-4"
      encType="multipart/form-data"
    >
      <div>
        <FormLabel htmlFor="date">
          <h2 className="mb-4 text-3xl text-zinc-800">트레이닝 기간 변경</h2>
          <h3 className="mb-4 text-sm text-accent">
            *수정 전의 트레이닝 시작일과 종료일을 기준으로 선택되어 있습니다.
            날짜 수정시에 시작일과 종료일을 다시 선택해주세요.*
          </h3>
          <input className="hidden" value={trainingId} name="id" />
          <div className="w-[500px]">
            <Calendar
              onSelectedDates={onSelectDateHandler}
              unavailabeDates={selectUnabledDates}
              defaultStartDate={defaultStartDate}
              defaultEndDate={defaultEndDate}
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
        <h2 className="mb-2 text-3xl font-semibold text-zinc-800">
          불가능한 날짜(선택사항)
        </h2>
        <h3 className="text-sm text-accent">
          *수정 전 기준으로 예약이 잡혀 있는 경우 날짜 수정이 불가능합니다*
        </h3>
        <MultipleDateInput unableDates={defaultUnableDates} />
      </div>

      <SubmitButton className="-mt-4 w-2/3 rounded-full py-5 text-2xl font-bold text-main">
        제출하기
      </SubmitButton>
    </Form>
  );
};

export default TrainerCalendarUpdateForm;
