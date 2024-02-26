import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { errorFunc } from '../utils/util';
import { ErrorResponseDto } from '../types/swagger/model/errorResponseDto';

const useBook = (
  id: number | undefined,
  booked: boolean | undefined,
  postAction: (id: number) => Promise<any>, // 찜하기 API 호출 함수
  deleteAction: (id: number) => Promise<any>, // 찜 취소 API 호출 함수
) => {
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(booked);

  useEffect(() => {
    setIsBooked(booked);
  }, [booked, id]);

  const toggleBook = async () => {
    if (!id) {
      return navigate('/login');
    }
    const previousBookedState = isBooked;
    setIsBooked(!isBooked); // 먼저 UI 업데이트

    try {
      let response;
      if (!previousBookedState) {
        response = await postAction(id);
      } else {
        response = await deleteAction(id);
      }

      if (response.status !== 200) {
        // 요청이 실패한 경우, 원래 상태로 되돌림
        setIsBooked(previousBookedState);
      } else {
        navigate(0);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseDto>;

      // 에러가 발생한 경우, 원래 상태로 되돌림
      setIsBooked(previousBookedState);
      errorFunc(error);
      navigate('/');
    }
  };

  return { isBooked, toggleBook };
};

export default useBook;
