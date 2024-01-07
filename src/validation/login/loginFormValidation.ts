import React from 'react';

import { ILoginFormError } from '../../types/form';
import { validateEmail, validatePassword } from '../formValidations';

const defaultErrorMsg: ILoginFormError = {
  email: '',
  password: '',
};

const validateLoginForm = (
  email: string,
  password: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<ILoginFormError>>,
) => {
  // 이메일
  const emailValidation = validateEmail(email);
  if (emailValidation.status === false) {
    setErrorMsg({ ...defaultErrorMsg, email: emailValidation.errorMessage });
    return false;
  }

  // 비밀번호
  const passwordValidation = validatePassword(password);
  if (passwordValidation.status === false) {
    setErrorMsg({
      ...defaultErrorMsg,
      password: passwordValidation.errorMessage,
    });
    return false;
  }

  setErrorMsg({ ...defaultErrorMsg });
  return true;
};

export default validateLoginForm;
