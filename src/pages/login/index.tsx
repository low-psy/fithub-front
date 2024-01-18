import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { SET_TOKEN } from '../../redux/slices/tokenSlice';

import { defaultLogin } from '../../apis/user';

import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import FormError, { ErrorText } from '../../components/form/FormError';
import FormHelperLink from '../../components/form/FormHelperLink';
import SocialLoginButton from '../../components/form/SocialLoginButton';
import SocialLoginHeader from '../../components/form/SocialLoginHeader';
import FormSubmitButton from '../../components/form/FormSubmitButton';

import kakaoBtn from '../../assets/kakao_symbol.png';
import naverBtn from '../../assets/naver_symbol.png';
import googleBtn from '../../assets/google_symbol.png';

import { ILoginFormError, ILoginFormValue } from '../../types/form';

import validateLoginForm from '../../validation/login/loginFormValidation';
import FormLogo from '../../components/form/FormLogo';
import Layout from '../../components/form/Layout';

function Login() {
  const kakaoSocialLoginRequestUrl = `${process.env.REACT_APP_BASE_SERVER_URL}/oauth2/authorization/kakao`;
  const naverSocialLoginRequestUrl = `${process.env.REACT_APP_BASE_SERVER_URL}/oauth2/authorization/naver`;
  const googleSocialLoginRequestUrl = `${process.env.REACT_APP_BASE_SERVER_URL}/oauth2/authorization/google`;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.redirectPath
    ? location.state.redirectPath
    : false;

  const initFormValue: ILoginFormValue = {
    email: '',
    password: '',
  };

  const initFormError: ILoginFormError = {
    email: '',
    password: '',
  };

  const [formValue, setFormValue] = useState<ILoginFormValue>(initFormValue);
  const [errorMsg, setErrorMsg] = useState<ILoginFormError>(initFormError);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formValue;

    // validation
    if (!validateLoginForm(email, password, setErrorMsg)) return;

    // send to server
    try {
      const response = await defaultLogin(email, password);
      if (response && response.status === 200) {
        console.log(response);
        dispatch(SET_TOKEN(response.data.accessToken));
        navigate(redirectPath || '/');
      }
    } catch (err) {
      const error = err as unknown as AxiosError;
      console.log(error);
      if (error.status === 403) {
        // eslint-disable-next-line no-alert
        alert('비밀번호가 일치하지 않습니다.');
      } else if (error.status === 404) {
        // eslint-disable-next-line no-alert
        alert('존재하지 않는 회원입니다.');
      } else {
        // eslint-disable-next-line no-alert
        alert('로그인 도중 문제가 발생하였습니다.');
      }
    }
  };

  const handleChange = (id: string, value: string) => {
    setFormValue((prevInput) => ({ ...prevInput, [id]: value }));
  };

  return (
    // <div className="flex w-full flex-col items-center justify-center p-10">
    <Layout>
      <FormLogo width="w-14" />
      {/* 이메일, 비밀번호 입력 form */}
      <form
        className="flex  w-full max-w-[600px] flex-col gap-6"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* 이메일 */}
        <FormLabel htmlFor="email" text="이메일">
          <FormInput
            id="email"
            type="email"
            placeholder="Email"
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
            id="password"
            type="password"
            placeholder="Password"
            value={formValue.password}
            onChange={handleChange}
            error={errorMsg}
          />
          <FormError>
            {errorMsg.password && <ErrorText text={errorMsg.password} />}
          </FormError>
        </FormLabel>

        {/* 회원가입하기 <-> 아이디, 비밀번호 찾기 */}
        <div className="mt-8 flex flex-row justify-between text-[#575757]">
          <FormHelperLink to="/signup/email" content="이메일로 회원가입하기" />
          <FormHelperLink to="/help/password" content="비밀번호 찾기" />
        </div>

        <FormSubmitButton text="로그인" />
      </form>

      {/* 소셜로그인 */}
      <SocialLoginHeader />
      <div className="mt-4 flex flex-row justify-center gap-8">
        {/* 카카오 */}
        <SocialLoginButton
          to={kakaoSocialLoginRequestUrl}
          alt="kakao_login_btn"
          src={kakaoBtn}
          className="flex items-center justify-center rounded-full bg-[#FEE500]"
        />
        {/* 네이버 */}
        <SocialLoginButton
          to={naverSocialLoginRequestUrl}
          alt="naver_login_btn"
          src={naverBtn}
        />
        {/* 구글 */}
        <SocialLoginButton
          to={googleSocialLoginRequestUrl}
          alt="google_login_button"
          src={googleBtn}
        />
      </div>
    </Layout>
    // </div>
  );
}

export default Login;
