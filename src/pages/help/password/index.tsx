import React, { useState } from 'react';

import { sendCertifyNumber, compareCertifyNumber } from '../../../apis/user';

import HelpInput from '../../../components/help/HelpInput';
import FormError, { ErrorText } from '../../../components/form/FormError';
import { DefaultButton, LinkButton } from '../../../components/help/HelpButton';
import {
  validateCertifyNumber,
  validateHelpEmail,
} from '../../../validation/help/findPasswordValidation';
import Layout from '../../../components/form/Layout';
import FormLogo from '../../../components/form/FormLogo';
import FormLabel from '../../../components/form/FormLabel';

function FindPassword() {
  // input (이메일, 인증번호)
  const [email, setEmail] = useState<string>('');
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  // 인증번호 전송 여부, 인증 완료 여부
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isCertified, setIsCertified] = useState<boolean>(false);
  // 에러
  const [emailError, setEmailError] = useState<string>('');
  const [certifyError, setCertifyError] = useState<string>('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCertifyNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertificationNumber(event.target.value);
  };

  // 인증번호 전송
  const onSendCertifyNumber = async () => {
    // validation
    if (!validateHelpEmail(email, setEmailError)) return;
    setIsSent(true);
    // server
    try {
      const response = await sendCertifyNumber(email);

      if (response.status === 200) {
        setEmailError('인증번호가 전송되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 인증번호 처리
  const onCompareCertifyNumber = async () => {
    // validation
    if (!validateCertifyNumber(certificationNumber, setCertifyError)) return;
    // server
    try {
      const response = await compareCertifyNumber(certificationNumber, email);

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
      <FormLogo width="w-14" />
      <div className="flex min-w-max flex-col gap-2">
        <div className="mb-4 text-sm text-[#585D69] md:text-base">
          <p>비밀번호 찾기</p>
          <p className="text-sm">
            이메일 인증을 통해 비밀번호를 찾을 수 있습니다.
          </p>
        </div>

        {/* 이메일 input, 전송 button */}
        <FormLabel htmlFor="email" text="이메일" />
        <div className="flex w-full flex-row items-center justify-end gap-4">
          <HelpInput
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={handleEmail}
            error={emailError}
          />
          <DefaultButton text="전송" onClick={onSendCertifyNumber} />
        </div>
        <FormError>{emailError && <ErrorText text={emailError} />}</FormError>

        {/* 인증번호 input */}
        {isSent && (
          <>
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
          </>
        )}
        {/* 인증하기 button, 로그인 하러가기  button */}
        {isCertified ? (
          <LinkButton to="/login" text="로그인 하러가기" />
        ) : (
          <DefaultButton text="인증하기" onClick={onCompareCertifyNumber} />
        )}
      </div>
    </Layout>
  );
}

export default FindPassword;
