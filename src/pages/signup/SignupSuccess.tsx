import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupSuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[40vh] px-6 ">
        <p className="text-xl md:text-2xl font-semibold">
          회원가입이 완료되었습니다!
        </p>
        <p className="text-gray-500 text-sm sm:text-base">
          로그인 후 모든 서비스를 이용하실 수 있습니다.
        </p>
        <button
          type="button"
          className="h-10 rounded text-lg bg-main font-semibold px-4 text-white w-full mt-10 hover:bg-hoverColor"
          onClick={() => navigate('/login')}
        >
          로그인 하러가기
        </button>
      </div>
      <div className="border-[0.5px] border-gray-300 w-full mt-10" />
      <div className="flex flex-col items-center mt-10 px-6 w-full">
        <p className="text-lg font-semibold">혹시 트레이너 이신가요?</p>
        <p className="text-gray-500 text-sm sm:text:base">
          트레이너 인증을 통해 트레이너로서 핏헙 서비스를 이용하실 수 있습니다!
        </p>
        <button
          type="button"
          className="h-10 rounded text-lg bg-main font-semibold px-4 text-white w-full mt-10 hover:bg-hoverColor"
          onClick={() => navigate('/signup/certify-trainer')}
        >
          트레이너 인증하기
        </button>
      </div>
    </div>
  );
}

export default SignupSuccess;
