import React, { useState } from 'react';

interface IChangePasswordProps {
  resetActivatedTarget: () => void;
}

const ChangePassword = ({ resetActivatedTarget }: IChangePasswordProps) => {
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handlePwCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwCheck(e.target.value);
  };

  return (
    <div className="mt-4">
      <p className="mb-2 font-semibold">비밀번호 변경</p>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm">새 비밀번호</p>
          <input
            className="h-10 w-full max-w-md rounded border border-gray-500 px-4 py-1"
            value={pw}
            placeholder="새 비밀번호를 입력해주세요."
            onChange={handlePw}
          />
        </div>
        <div>
          <p className="text-sm">새 비밀번호 확인</p>
          <input
            className="h-10 w-full max-w-md rounded border border-gray-500 px-4 py-1"
            value={pwCheck}
            placeholder="새 비밀번호를 한번 더 입력해주세요."
            onChange={handlePwCheck}
          />
        </div>
      </div>
      {/* 버튼 영역 */}
      <div className="mt-4 flex  flex-row gap-10">
        <button
          type="button"
          className="h-12 w-32 rounded bg-main px-4 py-1 font-bold text-white hover:bg-[#8766ff]"
        >
          변경하기
        </button>
        <button
          type="button"
          className="h-12 w-20 rounded bg-rose-400 px-4 py-1 font-bold text-white hover:bg-rose-500"
          onClick={resetActivatedTarget}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
