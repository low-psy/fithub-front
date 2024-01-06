import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signup } from '../../apis/user';

import FormInput from '../../components/form/FormInput';
import FormLabel from '../../components/form/FormLabel';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import FormError, { ErrorText } from '../../components/form/FormError';
import { ISignupInputForm, ISignupFormError, Gender } from '../../types/user';
import { validateAdditionalInfoForm } from '../../validation/signup/signupFormValidation';

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
  // const [isCertified, setIsCertified] = useState<boolean>(false);

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
    // const email = localStorage.getItem('certifiedEmail') as string;
    // console.log(email);
    const { email, password, checkPassword, name, nickname, phone, gender } =
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
      console.log(response);
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
    <form
      className="flex flex-col gap-4 space-y-4 pb-6"
      onSubmit={handleSubmit}
      noValidate
    >
      {isSignupProcess()}
      {/* 이메일 */}
      <FormLabel htmlFor="email" text="이메일">
        <FormInput
          placeholder="이메일을 입력해주세요."
          id="email"
          type="email"
          value={formValue.email}
          onChange={handleFormInput}
          error={errorMsg}
        />
        <FormError>
          {errorMsg.email && <ErrorText text={errorMsg.email} />}
        </FormError>
      </FormLabel>
      {/* 비밀번호 */}
      <FormLabel htmlFor="password" text="비밀번호">
        <FormInput
          placeholder="비밀번호를 입력해주세요."
          id="password"
          type="password"
          value={formValue.password}
          onChange={handleFormInput}
          error={errorMsg}
        />
        <FormError>
          {errorMsg.password && <ErrorText text={errorMsg.password} />}
        </FormError>
      </FormLabel>
      {/* 비밀번호 확인 */}
      <FormLabel htmlFor="checkPassword" text="비밀번호 확인">
        <FormInput
          placeholder="다시 비밀번호를 입력해주세요."
          id="checkPassword"
          type="password"
          value={formValue.checkPassword}
          onChange={handleFormInput}
          error={errorMsg}
        />
        <FormError>
          {errorMsg.checkPassword && (
            <ErrorText text={errorMsg.checkPassword} />
          )}
        </FormError>
      </FormLabel>
      {/* 이름 */}
      <FormLabel htmlFor="nickname" text="이름">
        <FormInput
          placeholder="이름을 입력해주세요."
          id="name"
          type="text"
          value={formValue.name}
          onChange={handleFormInput}
          error={errorMsg}
        />
        <FormError>
          {errorMsg.name && <ErrorText text={errorMsg.name} />}
        </FormError>
      </FormLabel>
      {/* 닉네임 */}
      <FormLabel htmlFor="nickname" text="닉네임">
        <FormInput
          placeholder="닉네임을 입력해주세요."
          id="nickname"
          type="text"
          value={formValue.nickname}
          onChange={handleFormInput}
          error={errorMsg}
        />
        <FormError>
          {errorMsg.nickname && <ErrorText text={errorMsg.nickname} />}
        </FormError>
      </FormLabel>
      {/* 전화번호 */}
      <FormLabel htmlFor="phone" text="전화번호">
        <FormInput
          placeholder="'-' 없이 입력헤주세요."
          id="phone"
          type="text"
          value={formValue.phone}
          onChange={handleFormInput}
          error={errorMsg}
        />
        <FormError>
          {errorMsg.phone && <ErrorText text={errorMsg.phone} />}
        </FormError>
      </FormLabel>
      {/* 성별 */}
      <FormLabel htmlFor="gender" text="성별">
        <div className="mt-1 flex flex-row gap-4">
          <button
            type="button"
            className={`h-[40px] w-[120px] rounded-md text-lg ${
              formValue.gender === 'M'
            }`}
            value="M"
            onClick={handleGender}
          >
            남자
          </button>
          <button
            type="button"
            className={`h-[40px] w-[120px] rounded-md text-lg ${
              formValue.gender === 'F'
            }`}
            value="F"
            onClick={handleGender}
          >
            여자
          </button>
        </div>
      </FormLabel>
      <FormSubmitButton text="회원가입" />
    </form>
  );
}

export default Signup;
