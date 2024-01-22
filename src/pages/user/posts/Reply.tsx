import React from 'react';
import testImg from '../../../assets/naver_symbol.png';

const Reply = () => {
  return (
    <div className="flex w-full justify-between py-1">
      {/* 댓글 정보 */}
      <div className="flex flex-row items-center ">
        <img src={testImg} alt="test_img" className="h-10 w-10" />
        <div className="ml-2">
          <p className="font-semibold ">송민우</p>
          <p className="text-sm">그것은 극비 사항입니다...</p>
        </div>
      </div>
      {/* 날짜 */}
      <div className="h-full">
        <p className="font-gray-500 text-sm">3주</p>
      </div>
    </div>
  );
};

export default Reply;
