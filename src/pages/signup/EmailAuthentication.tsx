import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import FormError, { ErrorText } from '../../components/form/FormError';
import { ISignupFormError, ISignupInputForm } from '../../types/user';
import { compareCertifyNumber, sendCertifyNumber } from '../../apis/user';
import HelpInput from '../../components/help/HelpInput';
import { validateCertifyNumber } from '../../validation/help/findPasswordValidation';
import { validateEmailForm } from '../../validation/signup/signupFormValidation';

interface IEmailAuthenticationProps {
  formValue: ISignupInputForm;
  handleFormInput: (id: string, value: string) => void;
  errorMsg: ISignupFormError;
  setErrorMsg: React.Dispatch<React.SetStateAction<ISignupFormError>>;
  setIsCertified: React.Dispatch<React.SetStateAction<boolean>>;
  isCertified: boolean;
}

function EmailAuthentication() {
  const {
    formValue,
    handleFormInput,
    errorMsg,
    setErrorMsg,
    setIsCertified,
    isCertified,
  } = useOutletContext<IEmailAuthenticationProps>();
  const navigate = useNavigate();

  const [isSent, setIsSent] = useState<boolean>(false);
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  const [certificationNumberError, setCertificationNumberError] =
    useState<string>('');

  const disabledCSS = 'border border-main text-gray-500';
  const availabledCSS = 'bg-main text-white hover:bg-hoverColor';

  // 인증번호 handler
  const handleCertifyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificationNumber(e.target.value);
  };

  // 인증번호 전송 함수
  const onSendCertifyNumber = async () => {
    setIsSent(true);
    if (!validateEmailForm(formValue.email, setErrorMsg)) {
      setIsSent(false);
      return;
    }

    try {
      const response = await sendCertifyNumber(formValue.email);
      if (response && response.status === 200) {
        setIsSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 인증번호 처리 함수
  const onCompareCertifyNumber = async () => {
    if (
      !validateCertifyNumber(certificationNumber, setCertificationNumberError)
    )
      return;

    try {
      const response = await compareCertifyNumber(
        certificationNumber,
        formValue.email,
      );
      if (response && response.status === 200) {
        localStorage.setItem('certifiedEmail', formValue.email);
        setIsCertified(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex w-full flex-col gap-4">
      {/* 이메일 */}
      <FormLabel htmlFor="email" text="이메일">
        <div className="flex w-full flex-row gap-2">
          <FormInput
            placeholder="이메일을 입력해주세요."
            id="email"
            type="email"
            value={formValue.email}
            onChange={handleFormInput}
            error={errorMsg}
            disabled={isSent}
          />
          <button
            type="button"
            className="w-30 mt-2 h-10 whitespace-nowrap rounded bg-main px-2 text-lg font-semibold text-white hover:bg-[#976fff]"
            onClick={onSendCertifyNumber}
          >
            인증번호 전송
          </button>
        </div>
        <FormError>
          {errorMsg.email && <ErrorText text={errorMsg.email} />}
        </FormError>
      </FormLabel>
      {/* 인증번호 */}
      {isSent && (
        <FormLabel htmlFor="certifyNumber" text="인증번호 입력">
          <div className="flex w-full flex-row gap-2">
            <HelpInput
              placeholder="인증번호를 입력해주세요"
              id="certifyNumber"
              type="text"
              value={certificationNumber}
              onChange={handleCertifyNumber}
              error={certificationNumberError}
            />
            <button
              type="button"
              className="w-30 mt-2 h-10 whitespace-nowrap rounded bg-main px-2 text-lg font-semibold text-white hover:bg-[#976fff]"
              onClick={onCompareCertifyNumber}
            >
              인증하기
            </button>
          </div>
          <p className="text-sm">
            인증번호 전송까지 약간의 시간이 소요될 수 있습니다.
          </p>
          <FormError>
            {certificationNumberError && (
              <ErrorText text={certificationNumberError} />
            )}
          </FormError>
        </FormLabel>
      )}
      <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 sm:bottom-8 md:px-2">
        <div className="mx-2 flex flex-row justify-center gap-4">
          <button
            type="button"
            className={`h-12 w-full min-w-[120px] whitespace-nowrap rounded px-2  text-lg font-semibold ${
              isCertified ? availabledCSS : disabledCSS
            }`}
            disabled={!isCertified}
            onClick={() => navigate('/signup/additional-info')}
          >
            다음 페이지로 이동하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailAuthentication;
