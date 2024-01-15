import React, { FormEvent, RefObject } from 'react';
import { postComment } from '../../apis/post';

interface CommentFormProps {
  parentCommentId: number;
  postId: number;
  inputValue: string;
  inputRef: RefObject<HTMLInputElement>;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentPosted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  inputValue,
  onInputChange,
  onCommentPosted,
  inputRef,
  parentCommentId,
}) => {
  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim()) return; // 빈 입력은 무시

    try {
      const response = await postComment(inputValue, postId, parentCommentId); // postComment API 호출
      if (response.status === 200) {
        onCommentPosted(); // 콜백 함수 실행
      } else {
        // 오류 처리
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment', error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex ">
      <input
        ref={inputRef}
        value={inputValue}
        placeholder="댓글 달기..."
        onChange={onInputChange}
        className="basis-10/12 rounded-md  outline-none"
      />
      <button type="submit" className=" grow rounded-full bg-sub px-4 py-2">
        제출
      </button>
    </form>
  );
};

export default CommentForm;
