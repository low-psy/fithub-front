import React, { useEffect, useRef, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  SET_REPLY_INITIALIZE,
  SET_REPLY_TO,
} from '../../redux/slices/commentSlice';

interface CommentFormProps {
  parentCommentId: number | undefined;
  postId: number | undefined;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentCommentId,
}) => {
  const cmt = useAppSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [replyTo, setReplyTo] = useState<string>('');
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const fetcher = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setReplyTo(cmt.replyTo);
    if (fetcher.data?.comment) {
      setInputValue(''); // input value 초기화
      dispatch(SET_REPLY_INITIALIZE());
      navigate(0);
    }
  }, [fetcher.data, cmt.replyTo, navigate, postId, dispatch]);

  const handleChange = () => {
    setInputValue(inputRef.current?.value);
  };

  const replytToClick = () => {
    dispatch(SET_REPLY_TO({ replyId: null, replyTo: '' }));
  };

  return (
    <fetcher.Form
      className="flex items-center"
      action={`/post/${postId}`}
      method="post"
    >
      <div className="flex grow rounded-md">
        <div
          className="shrink-0 cursor-pointer rounded-md bg-slate-400"
          style={{
            padding: replyTo ? '8px' : '0px',
            marginRight: replyTo ? '8px' : '0px',
          }}
          onClick={replytToClick}
          role="presentation"
        >
          {replyTo}
        </div>
        <input
          name="content"
          onChange={handleChange}
          value={inputValue}
          ref={inputRef}
          className=" inline-block  w-full py-2 outline-none"
          placeholder="댓글을 입력하세요..."
        />
      </div>
      <input name="postId" className="hidden" value={postId} />
      <input
        name="parentCommentId"
        className="hidden"
        value={parentCommentId}
      />
      <div>
        <button
          type="submit"
          className="block w-[80px] rounded-full bg-sub py-2 "
        >
          제출
        </button>
      </div>
    </fetcher.Form>
  );
};

export default CommentForm;
