import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupSuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex h-[40vh] flex-col items-center justify-center px-6 ">
        <p className="text-xl font-semibold md:text-2xl">
          회원가입이 완료되었습니다!
        </p>
        <p className="text-sm text-gray-500 sm:text-base">
          로그인 후 모든 서비스를 이용하실 수 있습니다.
        </p>
        <button
          type="button"
          className="hover:bg-hoverColor mt-10 h-10 w-full rounded bg-main px-4 text-lg font-semibold text-white"
          onClick={() => navigate('/login')}
        >
          로그인 하러가기
        </button>
      </div>
      <div className="mt-10 w-full border-[0.5px] border-gray-300" />
      <div className="mt-10 flex w-full flex-col items-center px-6">
        <p className="text-lg font-semibold">혹시 트레이너 이신가요?</p>
        <p className="sm:text:base text-sm text-gray-500">
          트레이너 인증을 통해 트레이너로서 핏헙 서비스를 이용하실 수 있습니다!
        </p>
        <button
          type="button"
          className="hover:bg-hoverColor mt-10 h-10 w-full rounded bg-main px-4 text-lg font-semibold text-white"
          onClick={() => navigate('/signup/certify-trainer')}
        >
          트레이너 인증하기
        </button>
      </div>
    </div>
  );
}

export default SignupSuccess;
