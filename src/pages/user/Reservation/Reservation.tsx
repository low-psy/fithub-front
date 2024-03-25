import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import testImg from '../../../assets/newpostFilter.png';
import { UsersReserveInfoDto } from '../../../types/swagger/model/usersReserveInfoDto';
import {
  cancelReservation,
  deleteTrainingReview,
  fetchTrainingReview,
  getTrainingReservation,
} from '../../../apis/trainig';
import {
  fetchCompletedReservation,
  fetchTrainingReservation,
  writeReview,
} from '../../../apis/user';
import ConfirmationModal from '../../../components/modal/ConfirmationModal';
import { convertDateWithDay, getYesterday } from '../../../utils/util';
import ReviewModal from '../../../components/modal/ReviewModal';
import StarRating from '../../../components/StarRating';
import { TrainingReviewDto } from '../../../types/swagger/model/trainingReviewDto';

const ReservationStatusObj = {
  BEFORE: '예약완료',
  START: '시작',
  COMPLETE: '수업종료',
  CANCEL: '취소',
  NOSHOW: '노쇼',
};

interface IReservationProps {
  closed?: boolean;
  info: UsersReserveInfoDto;
  setReservationList: (newList: UsersReserveInfoDto[]) => void;
}

const Reservation = ({
  closed,
  info,
  setReservationList,
}: IReservationProps) => {
  const {
    title,
    paymentDateTime,
    location,
    reserveDateTime,
    status,
    reservationId,
    reviewWritten,
  } = info;
  const [cancelingInfo, setCancelingInfo] = useState<
    UsersReserveInfoDto | undefined
  >(undefined);
  const [reviewingInfo, setReviewingInfo] = useState<
    UsersReserveInfoDto | undefined
  >();
  const [currRate, setCurrRate] = useState<number>(0);
  const [reviewInput, setReviewInput] = useState<string>('');
  const [reviewList, setReviewList] = useState<TrainingReviewDto[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   deleteTrainingReview(13);
  // }, []);

  const openModal = async (type: 'cancel' | 'review') => {
    if (reservationId) {
      const { data } = await getTrainingReservation(reservationId);
      if (type === 'cancel') setCancelingInfo(data);
      if (type === 'review') {
        setReviewingInfo(data);
        // 리뷰가 이미 작성된 경우 리뷰리스트 조회
        if (reviewWritten && data?.trainingId) {
          const reviews = await fetchTrainingReview(data?.trainingId);
          setReviewList(reviews);
        }
      }
    }
  };

  const handleCancel = async () => {
    if (cancelingInfo && cancelingInfo.impUid && reservationId) {
      await cancelReservation(reservationId, cancelingInfo.impUid);
      const newReservationList: UsersReserveInfoDto[] =
        await fetchTrainingReservation();
      setReservationList(newReservationList);
    }
    setCancelingInfo(undefined);
  };

  const closeReviewModal = () => {
    // if (!reviewWritten) {
    setReviewingInfo(undefined);
    setReviewInput('');
    setCurrRate(0);
    // }
  };

  const handleWriteReview = async () => {
    if (!reservationId) return;
    await writeReview(reservationId, reviewInput, currRate);
    closeReviewModal();
    const newList = await fetchCompletedReservation();
    setReservationList(newList);
  };

  const cancelModalContent = (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">예약 취소 내역</h1>
      <p>
        <span className="mr-3">제목:</span> {cancelingInfo?.title}
      </p>
      <p>
        <span className="mr-3">예약일:</span>
        {cancelingInfo?.paymentDateTime &&
          convertDateWithDay(cancelingInfo?.paymentDateTime)}
      </p>
      <p>
        {' '}
        <span className="mr-3">장소:</span>
        {cancelingInfo?.address}
      </p>
      <p>
        <span className="mr-3">수업일시:</span>
        {cancelingInfo?.reserveDateTime &&
          convertDateWithDay(cancelingInfo?.reserveDateTime)}
      </p>
      <p>
        <span className="mr-3">취소가능일시:</span>
        {cancelingInfo?.reserveDateTime &&
          convertDateWithDay(
            new Date(getYesterday(new Date(cancelingInfo?.reserveDateTime))),
          )}
        까지
      </p>
      <h1 className="mt-2 text-xl font-semibold">예약을 취소하시겠습니까?</h1>
    </div>
  );

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInput(e.target.value);
  };

  // 트레이닝 페이지로 이동
  const goToTraining = () => {
    navigate(`/detail/${reviewingInfo?.trainingId}`);
  };

  // 리뷰작성
  const writingReviewContent = (
    <>
      <section className="mb-5 w-[100%] bg-white">
        <div className="mb-4 bg-sub p-2 font-semibold">
          <button type="button" onClick={goToTraining}>
            {reviewingInfo?.title}
          </button>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex">
            <button type="button" onClick={goToTraining}>
              <div className=" h-[170px] w-[130px] ">
                <img
                  src={reviewingInfo?.trainerProfileImgUrl}
                  alt="트레이너 이미지"
                />
              </div>
            </button>
            <div className="ml-5">
              <p>
                예약일: &nbsp;
                {reviewingInfo &&
                  reviewingInfo.paymentDateTime &&
                  convertDateWithDay(reviewingInfo?.paymentDateTime)}
              </p>
              <p>
                장소: &nbsp;{reviewingInfo?.address || reviewingInfo?.location}
              </p>
              <p>
                수업일시: &nbsp;
                {reviewingInfo &&
                  reviewingInfo.reserveDateTime &&
                  convertDateWithDay(reviewingInfo?.reserveDateTime)}
              </p>
              <p>가격: &nbsp;{reviewingInfo?.price}원</p>
              <p>상태: &nbsp;{reviewingInfo?.status}</p>
            </div>
          </div>
          <StarRating currRate={currRate} onChange={setCurrRate} />
        </div>
      </section>
      <textarea
        name="textarea"
        value={reviewInput}
        onChange={handleTextarea}
        cols={30}
        rows={10}
        className="w-[100%] resize-none bg-input_bg p-[1rem] outline-none"
        placeholder="후기를 입력해주세요"
      />
    </>
  );

  const editReview = () => {
    console.log(reviewingInfo);
  };

  // 리뷰조회
  const checkReviewContent = () => {
    return (
      <section className="mb-5 w-[100%] bg-white">
        {reviewList.map((item: TrainingReviewDto) => {
          return (
            <div className="mb-4 flex justify-between border border-solid border-input_bg p-4">
              <div className="flex">
                <div className="item-start border-gray h-10 w-10 overflow-hidden rounded-full border border-solid">
                  <img src={item.userInfo?.profileUrl} alt="" />
                </div>
                <div className="ml-6 flex flex-col">
                  <div className="flex items-center">
                    <p className="mr-4  font-bold">{item.userInfo?.nickname}</p>
                    {item.createdDate && (
                      <p className="text-sm text-gray-500">
                        {convertDateWithDay(item.createdDate)}
                      </p>
                    )}
                  </div>

                  <p className="mt-7">{item.content}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={editReview}
                  type="button"
                  className="flex h-[30px] w-fit items-center rounded-full bg-sub p-4"
                >
                  수정하기
                </button>
                {item?.star && <StarRating currRate={item?.star} />}
              </div>
            </div>
          );
        })}
      </section>
    );
  };

  return (
    <>
      <div className="flexflex-col border border-gray-300 text-sm shadow">
        {/* 제목 */}
        <div
          className={`flex h-[50px] w-full items-center justify-between p-4 font-semibold ${
            closed ? 'bg-gray-200' : 'bg-sub'
          }`}
        >
          <p>{title}</p>
          <button
            type="button"
            onClick={
              !closed ? () => openModal('cancel') : () => openModal('review')
            }
            className="flex h-[30px] items-center rounded-full p-[10px]"
            style={{ background: closed ? '#E0D1FF' : '#fcaaaa' }}
          >
            {!closed ? '예약 취소' : reviewWritten ? '리뷰 조회' : '리뷰 작성'}
          </button>
        </div>
        {/* 내용 */}
        <div className=" flex flex-row px-4 py-10">
          <img src={testImg} alt="training_img" className="mr-4 w-32" />
          <div className="flex flex-col gap-2">
            <p className=" text-sm">
              <span className="text-gray-600">예약일: </span>
              {paymentDateTime && convertDateWithDay(paymentDateTime)}
            </p>
            <p className=" text-sm">
              <span className="text-gray-600">장소: </span>
              {location}
            </p>
            <p className=" text-sm">
              <span className="text-gray-600">수업일시: </span>
              {reserveDateTime && convertDateWithDay(reserveDateTime)}
            </p>
            <p className=" text-sm">
              <span className="text-gray-600">취소가능일시: </span>
              {reserveDateTime &&
                convertDateWithDay(
                  new Date(getYesterday(new Date(reserveDateTime))),
                )}
              까지
            </p>
            <p className=" text-sm">
              <span className="text-gray-600">상태: </span>
              {status && ReservationStatusObj[status]}
            </p>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={cancelingInfo !== undefined}
        onClose={() => setCancelingInfo(undefined)}
        onConfirm={handleCancel}
        confirmText="네"
        cancelText="아니요"
        children={cancelModalContent}
      />
      <ReviewModal
        title={`${reviewWritten ? reviewingInfo?.title : ''} 후기 ${reviewWritten ? '조회' : '작성'}`}
        isOpen={reviewingInfo !== undefined}
        onClose={closeReviewModal}
        onConfirm={!reviewWritten ? handleWriteReview : undefined}
        confirmText="네"
        cancelText="아니요"
        children={reviewWritten ? checkReviewContent() : writingReviewContent}
      />
    </>
  );
};

export default Reservation;
