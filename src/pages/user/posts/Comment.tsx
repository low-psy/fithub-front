import React, { useState } from 'react';
import testImg from '../../../assets/naver_symbol.png';
import Replys from './Replys';

const Comment = () => {
  const [replyDisplay, setReplyDisplay] = useState<boolean>(false);
  const handleReplyDisplay = () => {
    setReplyDisplay(!replyDisplay);
  };

  return (
    <div className="p-2">
      <div className="flex w-full justify-between">
        {/* 댓글 정보 */}
        <div className="flex flex-row items-center ">
          <img src={testImg} alt="test_img" className="h-10 w-10" />
          <div className="ml-2">
            <p className="font-semibold ">송민우</p>
            <p className="text-sm">3분할 루틴 공유 부탁드려요!!!</p>
          </div>
        </div>
        {/* 날짜 */}
        <div className="h-full">
          <p className="font-gray-500 text-sm">3주</p>
        </div>
      </div>
      {/* 답글달기, 수정, 삭제 */}
      <div className="ml-12 mt-1 flex flex-row gap-4 text-sm">
        <p
          className="cursor-pointer text-gray-400"
          onClick={handleReplyDisplay}
          aria-hidden
        >
          대댓글 보기
        </p>
        <p className="cursor-pointer text-gray-400">수정</p>
        <p className="cursor-pointer text-gray-400">삭제</p>
      </div>
      {replyDisplay && <Replys />}
    </div>
  );
};

export default Comment;
