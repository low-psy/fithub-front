import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteLike, postLike } from '../apis/post';

const useLike = (
  postId: number | undefined,
  liked: boolean | undefined,
  onClick?: () => void,
) => {
  const navigate = useNavigate();
  const [isLiked, setLiked] = useState(liked);

  useEffect(() => {
    console.log(postId, liked);
    setLiked(liked);
  }, [liked, postId]);
  const toggleLike = async () => {
    // 먼저 UI 업데이트
    if (!postId) {
      return navigate('/login');
    }

    setLiked(!isLiked);

    try {
      let response;
      if (!postId) {
        return;
      }
      if (!isLiked) {
        // 현재 상태가 '좋아요'가 아니었으므로, 좋아요를 추가하는 API 호출
        response = await postLike(postId);
        if (onClick) {
          onClick();
        }
      } else {
        // 현재 상태가 '좋아요'였으므로, 좋아요를 제거하는 API 호출
        response = await deleteLike(postId);
        if (onClick) {
          onClick();
        }
      }
      // 응답 상태가 200이 아니면 롤백
      if (response.status !== 200) {
        setLiked(isLiked);
      }
    } catch (error) {
      console.error('Error toggling like', error);
      // 에러 발생 시 롤백
      setLiked(isLiked);
    }
  };

  return { isLiked, toggleLike };
};

export default useLike;
