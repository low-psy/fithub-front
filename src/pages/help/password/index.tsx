import React, { useState } from 'react';
import axios from 'axios';

import { getTempPassword } from '../../../apis/user';

import HelpInput from '../../../components/help/HelpInput';
import FormError from '../../../components/form/FormError';
import { DefaultButton, LinkButton } from '../../../components/help/HelpButton';
import { validateHelpEmail } from '../../../validation/help/findPasswordValidation';
import FormLabel from '../../../components/form/FormLabel';
import Header from './Header';
import Guide from './Guide';

function FindPassword() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSendTempPassword = async () => {
    // validation
    if (!validateHelpEmail(email, setEmailError)) return;

    setIsSent(true);
    try {
      const response = await getTempPassword(email);
      if (response && response.status === 200) {
        setIsSent(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsSent(false);
        setErrorMsg(error.response?.data.message);
      }
    }
  };

  const onSendTempPasswordAgain = async () => {
    setIsSent(true);
    try {
      const response = await getTempPassword(email);
      if (response && response.status === 200) {
        setIsSent(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsSent(false);
        setErrorMsg(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex min-w-max flex-col gap-2">
      <Header />

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
          disabled={isSent}
        />
      </div>
      <FormError>{emailError}</FormError>

      {/* 이메일 전송 이후 안내 */}
      {isSent && <Guide onClick={onSendTempPasswordAgain} />}

      {/* 에러가 발생한 경우 */}
      {errorMsg.length > 0 && (
        <p className="my-2 text-red-500">에러 : {errorMsg}</p>
      )}

      {/* 하단 버튼 */}
      <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 sm:bottom-8 md:px-2">
        <div className="mx-2 flex flex-row justify-center gap-4">
          {isSent ? (
            <LinkButton to="/login" text="로그인 하러가기" />
          ) : (
            <DefaultButton
              text="임시 비밀번호 발급받기"
              onClick={onSendTempPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FindPassword;
