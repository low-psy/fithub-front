import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBook, postBook } from '../apis/post';

const useBook = (postId: number | undefined, booked: boolean | undefined) => {
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(booked);

  useEffect(() => {
    setIsBooked(booked);
  }, [booked]);

  const toggleBook = async () => {
    if (!postId) {
      return navigate('/login');
    }
    const previousBookedState = isBooked;
    setIsBooked(!isBooked); // 먼저 UI 업데이트

    try {
      let response;
      if (!previousBookedState) {
        response = await postBook(postId);
      } else {
        response = await deleteBook(postId);
      }

      if (response.status !== 200) {
        // 요청이 실패한 경우, 원래 상태로 되돌림
        setIsBooked(previousBookedState);
      }
    } catch (error) {
      console.error('Error toggling book', error);
      // 에러가 발생한 경우, 원래 상태로 되돌림
      setIsBooked(previousBookedState);
    }
  };

  return { isBooked, toggleBook };
};

export default useBook;
