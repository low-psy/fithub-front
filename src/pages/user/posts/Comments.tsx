import React, { useState } from 'react';
import Comment from './Comment';

interface ICommentsProps {
  display: boolean;
}

const Comments = ({ display }: ICommentsProps) => {
  const [input, setInput] = useState<string>('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div className={`${!display && 'hidden'} py-2`}>
      {/* 작성된 댓글 영역 */}
      <div className="flex flex-col gap-2">
        {/* 메인 댓글 */}
        <Comment />
        <Comment />
      </div>
      {/* 댓글 입력 */}
      <div className="flex flex-row gap-2">
        <input
          value={input}
          onChange={handleInput}
          className="h-10 w-full rounded border border-gray-400 p-2"
        />
        <button
          type="button"
          className="whitespace-nowrap rounded bg-main px-4 py-1 font-semibold text-white"
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
};

export default Comments;
