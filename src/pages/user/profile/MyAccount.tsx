import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import Withdraw from './Withdraw';

type ActivatedTarget = 'change-password' | 'withdraw';
interface IMyAccountProps {
  email: string;
}

const LockSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
    <path
      fill="#6b7280"
      d="M10 14.167A1.667 1.667 0 0 1 8.333 12.5 1.666 1.666 0 1 1 10 14.167Zm5 2.5V8.333H5v8.334h10Zm0-10a1.667 1.667 0 0 1 1.667 1.666v8.334A1.667 1.667 0 0 1 15 18.333H5a1.667 1.667 0 0 1-1.667-1.666V8.333A1.66 1.66 0 0 1 5 6.667h.833V5a4.167 4.167 0 0 1 8.334 0v1.667H15ZM10 2.5A2.5 2.5 0 0 0 7.5 5v1.667h5V5A2.5 2.5 0 0 0 10 2.5Z"
    />
  </svg>
);

const InfoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
    <path
      fill="#000000"
      d="M10 1.25a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5Zm0 16.25a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm.938-3.438a.938.938 0 1 1-1.876 0 .938.938 0 0 1 1.876 0ZM10 5a.625.625 0 0 1 .625.625v5.625a.624.624 0 1 1-1.25 0V5.625A.625.625 0 0 1 10 5Z"
    />
  </svg>
);

const MyAccount = ({ email }: IMyAccountProps) => {
  const [activatiedTarget, setActivatedTarget] = useState<
    ActivatedTarget | boolean
  >(false);

  const handleActivateTarget = (e: React.MouseEvent<HTMLElement>) => {
    setActivatedTarget(e.currentTarget.id as ActivatedTarget);
  };

  const resetActivatedTarget = () => {
    setActivatedTarget(false);
  };

  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold">계정</p>

      <div className="ml-10 mt-2 flex flex-col gap-4">
        {/* 비밀번호 변경 */}
        <div
          className="flex flex-row items-center gap-2 hover:cursor-pointer"
          onClick={handleActivateTarget}
          aria-hidden="true"
          id="change-password"
        >
          <InfoSVG />
          <p
            className={`${
              activatiedTarget === 'change-password' &&
              'underline underline-offset-4'
            }`}
          >
            비밀번호 변경하기
          </p>
        </div>
        {/* 회원 탈퇴 */}
        <div
          className="flex flex-row items-center gap-2 hover:cursor-pointer"
          onClick={handleActivateTarget}
          aria-hidden="true"
          id="withdraw"
        >
          <LockSVG />
          <p
            className={`text-gray-500 ${
              activatiedTarget === 'withdraw' &&
              'underline decoration-gray-500 underline-offset-4'
            }`}
          >
            회원 탈퇴하기
          </p>
        </div>
      </div>

      {/* 해당 target 영역 */}
      <div className="ml-10">
        {activatiedTarget === 'change-password' && (
          <ChangePassword
            resetActivatedTarget={resetActivatedTarget}
            email={email}
          />
        )}
        {activatiedTarget === 'withdraw' && (
          <Withdraw resetActivatedTarget={resetActivatedTarget} />
        )}
      </div>
    </div>
  );
};

export default MyAccount;
