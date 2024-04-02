import React, { useCallback, useMemo, useState } from 'react';
import {
  ActionFunctionArgs,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { AxiosError } from 'axios';
import SelectableButtons from '../../components/btn/SelectedBtn';
import { FormErrors, LoaderData } from '../../types/common';
import {
  getTrainersReserve,
  getTrainersTraining,
  updateTraining,
  updateTrainingCalendar,
} from '../../apis/trainig';
import TrainerReservation from './TrainerReservation';
import { ErrorResponseDto } from '../../types/swagger/model/errorResponseDto';
import { errorFunc } from '../../utils/util';
import { getImages } from '../../redux/slices/updateImageSlice';
import store from '../../redux/store';
import TrainingItem from './TrainingItem';
import UndefinedCover from '../../components/common/UndefinedCover';

export const loader = (async ({ request }) => {
  const url = new URL(request.url);
  const isClosed = url.searchParams.get('isClosed');
  const status = url.searchParams.get('status');
  try {
    const reservation = await getTrainersReserve(status);
    const training = await getTrainersTraining(!!isClosed);
    if (reservation.status === 200 && training.status === 200) {
      return {
        reservation,
        training,
      };
    }
  } catch (err) {
    const errorStatus = errorFunc(err);
    console.log(errorStatus);
    if (errorStatus === 401) {
      console.log('redirect');
      return redirect('/login');
    }
  }
}) satisfies LoaderFunction;

const TrainerHome = () => {
  const res = useLoaderData() as LoaderData<typeof loader>;
  const [selectedButtonId, setSelectedButtonId] = useState<number>(1);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const trainingDefaultNum = location.search ? 2 : 1;
  const [selectedTrainingButtonId, setSelectedTrainingButtonId] =
    useState<number>(trainingDefaultNum);

  const btnHandler = useCallback(
    (id: number, setFunc: (id: number) => void) => {
      setFunc(id);

      if (setFunc === setSelectedTrainingButtonId) {
        if (id === 2) {
          searchParams.set('isClosed', 'true');
        } else {
          searchParams.delete('isClosed');
        }
      } else if (setFunc === setSelectedButtonId) {
        const status =
          id === 1
            ? 'START'
            : id === 2
              ? 'BEFORE'
              : id === 3
                ? 'COMPLETE'
                : id === 4
                  ? 'NOSHOW'
                  : id === 5
                    ? 'CANCEL'
                    : '';
        if (status) {
          searchParams.set('status', status);
        } else {
          searchParams.delete('status');
        }
      }

      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  // 선택된 id에 따라 필터링 조건 설정
  const statusFilter = useCallback((id: number) => {
    switch (id) {
      case 1:
        return 'START';
      case 2:
        return 'BEFORE';
      case 3:
        return 'COMPLETE';
      case 4:
        return 'NOSHOW';
      default:
        return '';
    }
  }, []);

  const trainingStatusFilter = useCallback((id: number) => {
    switch (id) {
      case 1:
        return false;
      case 2:
        return true;
      default:
        return false;
    }
  }, []);

  const noReservationText = useCallback(() => {
    switch (selectedButtonId) {
      case 1:
        return '현재 진행중인 트레이닝이 없습니다.';
      case 2:
        return '예정된 트레이닝이 없습니다.';
      case 3:
        return '종료된 트레이닝이 없습니다.';
      case 4:
        return '노쇼한 트레이닝이 없습니다.';
      default:
        return '예약된 트레이닝이 없습니다.';
    }
  }, [selectedButtonId]);

  const noTrainingText = useCallback(() => {
    switch (selectedTrainingButtonId) {
      case 1:
        return '현재 모집중인 트레이닝이 없습니다.';
      case 2:
        return '마감된 트레이닝이 없습니다.';
      default:
        return '생성한 트레이닝이 없습니다.';
    }
  }, [selectedTrainingButtonId]);

  const reservationfilteredData = useMemo(() => {
    return res?.reservation.data.content?.filter(
      (session) => session.status === statusFilter(selectedButtonId),
    );
  }, [res?.reservation, selectedButtonId, statusFilter]);

  const trainingfilteredData = useMemo(() => {
    return res?.training.data.content?.filter(
      (session) =>
        session.closed === trainingStatusFilter(selectedTrainingButtonId),
    );
  }, [res?.training, selectedTrainingButtonId, trainingStatusFilter]);

  const buttonInfos = [
    { id: 1, text: '진행' },
    { id: 2, text: '예정' },
    { id: 3, text: '종료' },
    { id: 4, text: '노쇼' },
    { id: 5, text: '취소' },
  ];

  const btnTrainingInfos = [
    { id: 1, text: '모집중' },
    { id: 2, text: '마감' },
  ];

  const renderNoReservation = (textFunc: () => string) => (
    <UndefinedCover>
      <div className="space-y-2 text-center">
        <span className="material-symbols-rounded">no_backpack</span>
        <h2>{textFunc()}</h2>
      </div>
    </UndefinedCover>
  );

  return (
    <div className="mx-8 space-y-8">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">예약</h1>
        <div className="flex gap-x-1">
          {buttonInfos.map(({ id, text }) => (
            <SelectableButtons
              key={id}
              id={id}
              selectedBtnId={selectedButtonId}
              onClick={(id) => btnHandler(id, setSelectedButtonId)}
            >
              {text}
            </SelectableButtons>
          ))}
        </div>
        <div className="relative min-h-[200px] space-y-2 rounded-lg bg-gray-200 p-8">
          {selectedButtonId === 3 && (
            <h3 className="-mt-2 break-keep font-bold text-accent">
              *회원님이 트레이닝에 참석하지 않으셨다면 진행 완료된 트레이닝을
              노쇼 처리 해주세요*
            </h3>
          )}
          {reservationfilteredData && reservationfilteredData.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {reservationfilteredData &&
                reservationfilteredData.map((session) => (
                  <TrainerReservation
                    key={session.trainingId}
                    selectedBtnId={selectedButtonId}
                    session={session}
                  />
                ))}
            </div>
          ) : (
            renderNoReservation(noReservationText)
          )}
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">트레이닝</h1>
          <Link
            to="/trainer/new"
            className="shrink-0 rounded-full bg-slate-50 px-4 py-4"
          >
            트레이닝 생성하기
          </Link>
        </div>
        <div className="flex gap-x-1">
          {btnTrainingInfos.map(({ id, text }) => (
            <SelectableButtons
              key={id}
              id={id}
              selectedBtnId={selectedTrainingButtonId}
              onClick={(id) => btnHandler(id, setSelectedTrainingButtonId)}
            >
              {text}
            </SelectableButtons>
          ))}
        </div>
        <div className="relative min-h-[200px] space-y-2 rounded-lg bg-gray-200 p-8">
          {trainingfilteredData && trainingfilteredData.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {trainingfilteredData &&
                trainingfilteredData.map((session) => {
                  const isClosed = selectedTrainingButtonId === 2;
                  return (
                    <div className={`rounded-md bg-white  p-4 shadow-xl `}>
                      <TrainingItem
                        trainerInfoDto={session}
                        isClosed={isClosed}
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            renderNoReservation(noTrainingText)
          )}
        </div>
      </section>
    </div>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  const formData = await request.formData();
  const id = formData.get('id') as string;
  const errors: FormErrors = {};
  if (type === 'content') {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imgDeleted = formData.get('imgDeleted') as string;

    const documentDto = getImages(store.getState());
    const unModifiedImgList: string[] = [];
    const newImgList: Blob[] = [];

    documentDto.forEach((document) => {
      if (document.image) {
        newImgList.push(document.image);
      } else {
        unModifiedImgList.push(document.awsS3Url as string);
      }
    });
    const imgAdded = newImgList[0];
    const updateImgDto = {
      imgDeleted: !!imgDeleted,
      imgAdded: !!imgAdded,
      unModifiedImgList,
      newImgList,
    };

    const price = formData.get('price');
    const priceNumber = price ? Number(price) : 0;

    // 필수 필드 유효성 검사
    if (
      content.replace(/ /g, '').length < 2 ||
      content.replace(/ /g, '').length > 100
    )
      errors.title = '제목은 2글자 이상 100글자 이하로 입력해야 합니다.';
    if (content.replace(/ /g, '').length === 0)
      errors.content = '내용을 입력해야 합니다.';
    if (!price) errors.price = '가격을 입력해야 합니다.';

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    const trainingObj = {
      title,
      content,
      trainingImgUpdate: updateImgDto,
      price: priceNumber,
    };

    try {
      const response = await updateTraining(Number(id), trainingObj);

      if (response && response.status === 200) {
        console.log('success');
        return redirect('/');
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseDto>;
      errorFunc(error);
      return redirect('/trainer/new/create');
    }
  } else if (type === 'calendar') {
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const unableDates = formData.getAll('unable_date') as string[];
    const nonEmptyUnableDates =
      unableDates.filter((date) => date).length === 0
        ? undefined
        : unableDates.filter((date) => date);
    const requestData = {
      startDate,
      endDate,
      unableDates: nonEmptyUnableDates,
    };

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    try {
      const res = await updateTrainingCalendar(Number(id), requestData);
      if (res.status === 200) {
        console.log('success');
        return redirect('/');
      }
      if (res.status === 201) {
        return redirect('/login');
      }
      throw new Error(`server is trobule with${res.status}`);
    } catch (err) {
      const status = errorFunc(err);
      if (status === 401) {
        return redirect('/login');
      }
      return redirect('/trainer/home');
    }
  }
  return null;
};

export default TrainerHome;
