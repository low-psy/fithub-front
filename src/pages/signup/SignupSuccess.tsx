import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomButtonLayout from '../../components/form/BottomButtonLayout';

const NavigateCertifyTrainer = () => {
  const navigate = useNavigate();

  const navigateCertifyTrainer = () => {
    navigate('/certify-trainer');
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <p className="text-lg font-semibold">혹시 트레이너 이신가요?</p>
      <p className="sm:text:base px-6 text-sm text-gray-500">
        트레이너 인증을 통해 트레이너로서 핏헙 서비스를 이용하실 수 있습니다!
      </p>
      <p
        className="cursor-pointer text-gray-500 underline underline-offset-2"
        onClick={navigateCertifyTrainer}
        aria-hidden
      >
        트레이너 인증하러가기
      </p>
    </div>
  );
};

const CelebrationSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
    <path
      fill="#9766FF"
      d="m2.667 29.333 6.666-18.666 12 12-18.666 6.666Zm16.733-12.6-1.4-1.4 7.466-7.466c.712-.711 1.567-1.067 2.567-1.067 1 0 1.856.356 2.567 1.067l.8.8-1.4 1.4-.8-.8c-.311-.311-.7-.467-1.167-.467-.466 0-.855.156-1.167.467L19.4 16.733ZM14.067 11.4l-1.4-1.4.8-.8c.31-.311.466-.689.466-1.133 0-.445-.155-.823-.466-1.134l-.867-.866 1.4-1.4.867.866c.71.711 1.066 1.556 1.066 2.534 0 .977-.355 1.822-1.066 2.533l-.8.8Zm2.666 2.667-1.4-1.4 4.8-4.8c.311-.311.467-.7.467-1.167 0-.467-.156-.856-.467-1.167L18 3.4 19.4 2l2.133 2.133C22.244 4.844 22.6 5.7 22.6 6.7c0 1-.356 1.856-1.067 2.567l-4.8 4.8Zm5.334 5.333-1.4-1.4 2.133-2.133c.71-.711 1.566-1.067 2.566-1.067 1 0 1.856.356 2.567 1.067L30.067 18l-1.4 1.4-2.134-2.133c-.31-.311-.7-.467-1.167-.467-.466 0-.855.156-1.166.467L22.067 19.4Z"
    />
  </svg>
);

const SuccessMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex-fow flex gap-2">
        <CelebrationSVG />
        <p className="text-xl font-semibold md:text-2xl">
          회원가입이 완료되었습니다!
        </p>
      </div>
      <p className="text-sm text-gray-500 sm:text-base">
        로그인 후 모든 서비스를 이용하실 수 있습니다.
      </p>
    </div>
  );
};

function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mt-10 flex w-full flex-col items-center">
        <SuccessMessage />
        <NavigateCertifyTrainer />
      </div>
      <BottomButtonLayout>
        <button
          type="button"
          className="hover:bg-hoverColor mt-10 h-10 w-full rounded bg-main px-4 text-lg font-semibold text-white"
          onClick={() => navigate('/login')}
        >
          로그인 하러가기
        </button>
      </BottomButtonLayout>
    </div>
  );
}

export default SignupSuccess;
