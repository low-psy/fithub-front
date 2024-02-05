import axios from 'axios';
import React, { useState } from 'react';
import { changePassword } from '../../../apis/user';

interface IChangePasswordProps {
  resetActivatedTarget: () => void;
  email: string;
}

const ChangePassword = ({
  resetActivatedTarget,
  email,
}: IChangePasswordProps) => {
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handlePwCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwCheck(e.target.value);
  };

  const handleChangePassword = async () => {
    // pw, pwCheck 검사하는 로직 들어가야함

    try {
      const response = await changePassword(email, pw);
      if (response && response.status === 200) {
        alert('비밀번호 변경이 완료되었습니다.');
        window.location.href = '/user';
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="mt-4">
      <p className="mb-2 font-semibold">비밀번호 변경</p>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm">새 비밀번호</p>
          <input
            className="h-10 w-full max-w-md rounded border border-gray-500 px-4 py-1"
            type="password"
            value={pw}
            placeholder="새 비밀번호를 입력해주세요."
            onChange={handlePw}
          />
        </div>
        <div>
          <p className="text-sm">새 비밀번호 확인</p>
          <input
            className="h-10 w-full max-w-md rounded border border-gray-500 px-4 py-1"
            type="password"
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
          onClick={handleChangePassword}
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
