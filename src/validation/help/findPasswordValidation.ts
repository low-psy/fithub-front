import React from 'react';
import { validateEmail } from '../formValidations';

export const validateHelpEmail = (
  email: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
) => {
  // 이메일
  const emailValidation = validateEmail(email);
  if (emailValidation.status === false) {
    setErrorMsg(emailValidation.errorMessage);
    return false;
  }

  setErrorMsg('');
  return true;
};

export const validateCertifyNumber = (
  certifyNumber: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
) => {
  if (certifyNumber.replace(/ /g, '').length === 0) {
    setErrorMsg('인증번호를 입력해주세요');
    return false;
  }

  setErrorMsg('');
  return true;
};
