import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import { signup } from '../../apis/user';

import FormInput from '../../components/form/FormInput';
import FormLabel from '../../components/form/FormLabel';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import FormError, { ErrorText } from '../../components/form/FormError';

import { Gender, ISignupFormError, ISignupFormValue } from '../../types/user';

import validateSignupForm from '../../validation/signup/signupFormValidation';

function Signup() {
  const navigate = useNavigate();
  const selectedButtonStyle = 'bg-[#BC9CFF] text-white ';
  const unSelectedButtonStyle = ' border border-[#BC9CFF] text-[#7F7F7F]';

  const initFormValue: ISignupFormValue = {
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

  const [formValue, setFormValue] = useState<ISignupFormValue>(initFormValue);
  const [errorMsg, setErrorMsg] = useState<ISignupFormError>(initError);

  const handleChange = (id: string, value: string) => {
    setFormValue((prevInput) => ({ ...prevInput, [id]: value }));
  };

  const handleGender = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFormValue({
      ...formValue,
      gender: event.currentTarget.value as Gender,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, checkPassword, name, nickname, phone, gender } =
      formValue;

    // validation
    if (
      !validateSignupForm(
        email,
        password,
        checkPassword,
        name,
        nickname,
        phone,
        setErrorMsg,
      )
    )
      return;

    // send to server
    try {
      const signupFormData = {
        email,
        password,
        name,
        nickname,
        phone,
        gender,
      };
      const response = await signup(signupFormData);
      if (response && response.status === 200) {
        // eslint-disable-next-line no-alert
        alert('회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다.');
        navigate('/login');
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

  return (
    <form
      className="flex flex-col gap-4 space-y-4 pb-6"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* 이메일 */}
      <FormLabel htmlFor="email" text="이메일">
        <FormInput
          placeholder="이메일을 입력해주세요."
          id="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
                ? selectedButtonStyle
                : unSelectedButtonStyle
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
                ? selectedButtonStyle
                : unSelectedButtonStyle
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
