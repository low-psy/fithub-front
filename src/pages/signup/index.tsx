import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signup } from '../../apis/user';

import FormLogo from '../../components/form/FormLogo';
import Layout from '../../components/form/Layout';
import { ISignupFormError, ISignupInputForm, Gender } from '../../types/user';
import { validateAdditionalInfoForm } from '../../validation/signup/signupFormValidation';
import CurrentProcess from './CurrentProcess';

const initFormValue: ISignupInputForm = {
  email: '',
  password: '',
  checkPassword: '',
  name: '',
  nickname: '',
  phone: '',
  gender: 'M',
};

const initError: ISignupFormError = {
  email: '',
  password: '',
  checkPassword: '',
  name: '',
  nickname: '',
  phone: '',
};
type CurrentPage = 'email' | 'additional-info' | 'success';

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.split('/')[2] as CurrentPage;

  const [formValue, setFormValue] = useState<ISignupInputForm>(initFormValue);
  const [errorMsg, setErrorMsg] = useState<ISignupFormError>(initError);
  const [isCertified, setIsCertified] = useState<boolean>(false);

  // input handler
  const handleFormInput = (id: string, value: string) => {
    setFormValue((prevInput) => ({ ...prevInput, [id]: value }));
  };
  // gender handler
  const handleGender = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFormValue({
      ...formValue,
      gender: event.currentTarget.value as Gender,
    });
  };

  // 회원가입 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = localStorage.getItem('certifiedEmail') as string;
    const { password, checkPassword, name, nickname, phone, gender } =
      formValue;
    if (
      !validateAdditionalInfoForm(
        password,
        checkPassword,
        name,
        nickname,
        phone,
        setErrorMsg,
      )
    )
      return;

    try {
      const signupForm = {
        email,
        password,
        name,
        nickname,
        phone,
        gender,
      };
      const response = await signup(signupForm);
      if (response && response.status === 200) {
        navigate('/signup/success');
      }
    } catch (err) {
      const error = err as unknown as AxiosError;
      console.log(error);
      if (error.status === 409) {
        // eslint-disable-next-line no-alert
        alert('입력 형식이 올바르지 않습니다.');
      } else {
        // eslint-disable-next-line no-alert
        alert('회원가입 도중 문제가 발생하였습니다.');
      }
    }
  };

  const isSignupProcess = () => {
    if (
      currentPage === 'email' ||
      currentPage === 'additional-info' ||
      currentPage === 'success'
    )
      return true;
    return false;
  };

  return (
    <Layout>
      <FormLogo width="w-14" fontSize="text-lg" />
      {isSignupProcess() && <CurrentProcess currentPage={currentPage} />}
      <Outlet
        context={{
          formValue,
          handleFormInput,
          errorMsg,
          setErrorMsg,
          isCertified,
          setIsCertified,
          handleGender,
          handleSubmit,
        }}
      />
    </Layout>
  );
}

export default Signup;
