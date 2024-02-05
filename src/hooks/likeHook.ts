import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteLike, postLike } from '../apis/post';

const useLike = (
  postId: number | undefined,
  liked: boolean | undefined,
  defaultCount: number | undefined,
) => {
  const navigate = useNavigate();
  const [isLiked, setLiked] = useState(liked);
  const [likesCount, setLikesCount] = useState(defaultCount || 0);

  useEffect(() => {
    setLiked(liked);
  }, [liked]);

  const toggleLike = async () => {
    // 먼저 UI 업데이트
    if (!postId) {
      return navigate('/login');
    }

    setLiked(!isLiked);
    if (likesCount !== undefined) {
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    }

    try {
      let response;
      if (!postId || likesCount === undefined) {
        return;
      }
      if (!isLiked) {
        // 현재 상태가 '좋아요'가 아니었으므로, 좋아요를 추가하는 API 호출
        response = await postLike(postId);
      } else {
        // 현재 상태가 '좋아요'였으므로, 좋아요를 제거하는 API 호출
        response = await deleteLike(postId);
      }

      // 응답 상태가 200이 아니면 롤백
      if (response.status !== 200) {
        setLiked(isLiked);
        setLikesCount(likesCount);
      }
    } catch (error) {
      console.error('Error toggling like', error);
      // 에러 발생 시 롤백
      if (likesCount === undefined) {
        return;
      }
      setLiked(isLiked);
      setLikesCount(likesCount);
    }
  };

  return { isLiked, likesCount, toggleLike };
};

export default useLike;
