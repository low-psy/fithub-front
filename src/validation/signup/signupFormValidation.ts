import React from 'react';

import { ISignupFormError } from '../../types/form';

import {
  validateEmail,
  validateName,
  validateNickname,
  validatePassword,
  validatePasswordCheck,
  validatePhone,
} from '../formValidations';

const defaultErrorMsg: ISignupFormError = {
  email: '',
  password: '',
  checkPassword: '',
  name: '',
  nickname: '',
  phone: '',
};

const validateSignupForm = (
  email: string,
  password: string,
  checkPassword: string,
  name: string,
  nickname: string,
  phone: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<ISignupFormError>>,
) => {
  // 이메일
  const emailValidation = validateEmail(email);
  if (emailValidation.status === false) {
    setErrorMsg({ ...defaultErrorMsg, email: emailValidation.errorMessage });
    return false;
  }

  //  비밀번호
  const passwordValidation = validatePassword(password);
  if (passwordValidation.status === false) {
    setErrorMsg({
      ...defaultErrorMsg,
      password: passwordValidation.errorMessage,
    });
    return false;
  }

  // 비밀번호 확인
  const passwordCheckValidation = validatePasswordCheck(
    password,
    checkPassword,
  );
  if (passwordCheckValidation.status === false) {
    setErrorMsg({
      ...defaultErrorMsg,
      checkPassword: passwordCheckValidation.errorMessage,
    });
    return false;
  }

  // 이름
  const nameValidation = validateName(name);
  if (nameValidation.status === false) {
    setErrorMsg({
      ...defaultErrorMsg,
      name: nameValidation.errorMessage,
    });
    return false;
  }

  // 닉네임
  const nicknameValidation = validateNickname(nickname);
  if (nicknameValidation.status === false) {
    setErrorMsg({
      ...defaultErrorMsg,
      nickname: nicknameValidation.errorMessage,
    });
    return false;
  }

  // 전화번호
  const phoneValidation = validatePhone(phone);
  if (phoneValidation.status === false) {
    setErrorMsg({ ...defaultErrorMsg, phone: phoneValidation.errorMessage });
    return false;
  }

  setErrorMsg({ ...defaultErrorMsg });
  return true;
};

export default validateSignupForm;
