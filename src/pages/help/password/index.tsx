import React, { useState } from 'react';

import { certifyNumber, sendAuthentication } from '../../../apis/user';

import Layout from '../../../components/form/Layout';
import FormLogo from '../../../components/form/FormLogo';
import HelpInput from '../../../components/help/HelpInput';
import FormError, { ErrorText } from '../../../components/form/FormError';
import { DefaultButton, LinkButton } from '../../../components/help/HelpButton';
import {
  validateCertifyNumber,
  validateHelpEmail,
} from '../../../validation/help/findPasswordValidation';

function FindPassword() {
  const [email, setEmail] = useState<string>('');
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  const [isCertified, setIsCertified] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [certifyError, setCertifyError] = useState<string>('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCertifyNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertificationNumber(event.target.value);
  };

  // 인증번호 전송 함수
  const sendCertifyNumber = async () => {
    // validation
    if (!validateHelpEmail(email, setEmailError)) return;
    // server
    try {
      const response = await sendAuthentication(email);

      if (response.status === 200) {
        setEmailError('인증번호가 전송되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 인증번호 처리 함수
  const requestCertifyNumber = async () => {
    // validation
    if (!validateCertifyNumber(certificationNumber, setCertifyError)) return;
    // server
    try {
      const response = await certifyNumber(certificationNumber);

      if (response.status === 200) {
        setIsCertified(true);
        setCertifyError('인증이 완료되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <FormLogo width="w-14" fontSize="text-lg" />
      <div className="flex flex-col min-w-max gap-2">
        <div className="text-[#585D69] text-sm md:text-base mb-4">
          <p>비밀번호를 잊으셨나요?</p>
          <p>이메일 인증을 통해 비밀번호를 찾을 수 있습니다.</p>
        </div>

        {/* 이메일 input, 전송 button */}
        <div className="flex flex-row w-full justify-between gap-4 items-center">
          <HelpInput
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={handleEmail}
            error={emailError}
          />
          <DefaultButton text="전송" onClick={sendCertifyNumber} />
        </div>
        <FormError>{emailError && <ErrorText text={emailError} />}</FormError>

        {/* 인증번호 input */}
        <HelpInput
          id="authNumber"
          type="string"
          placeholder="전송받은 인증번호를 입력해주세요."
          value={certificationNumber}
          onChange={handleCertifyNumber}
          error={certifyError}
        />
        <FormError>
          {certifyError && <ErrorText text={certifyError} />}
        </FormError>

        {/* 인증하기 button, 로그인 하러가기  button */}
        {isCertified ? (
          <LinkButton to="/login" text="로그인 하러가기" />
        ) : (
          <DefaultButton text="인증하기" onClick={requestCertifyNumber} />
        )}
      </div>
    </Layout>
  );
}

export default FindPassword;
