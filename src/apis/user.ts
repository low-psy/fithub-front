import { defaultAxios } from './axios';

import { Gender, ISignupProps } from '../types/user';

/**
 * [POST] 일반 로그인
 * email, password를 인자로 받아 서버로 전송
 * @param email
 * @param password
 * @returns 일단 response 반환
 */
export const defaultLogin = async (email: string, password: string) => {
  const data = {
    email,
    password,
  };
  const response = await defaultAxios.post('/auth/sign-in', data);

  return response;
};

/**
 * [POST] 소셜 로그인
 * platform(kakao, naver, google)과 code(소셜 서비스에서 받아온 인가코드)를 인자로 받아 서버로 전송
 * @param platform kakao | naver | google
 * @param code authentication code
 * @returns 일단 response 반환
 */
export const socialLogin = async (platform: string, code: string) => {
  const response = await defaultAxios.post(`/auth/login?code=${code}`);

  return response;
};

/**
 * [POST] 일반 회원가입
 * nickname, email, password, phone, gender를 인자로 받아 서버로 전송
 * @param props nickname, email, password, phone, gender를 담은 객체
 * @returns 일단 response 반환
 */
export const signup = async (props: ISignupProps, profileImg = '') => {
  const signupDto = { ...props, bio: 'dummyBio' };
  const blob = new Blob([JSON.stringify(signupDto)], {
    type: 'application/json',
  });
  console.log(signupDto);
  console.log(blob);

  const formData = new FormData();
  formData.append('signUpDto', blob);
  formData.append('profileImg', profileImg);

  const response = await defaultAxios.post('/auth/sign-up', formData);

  return response;
};

/**
 * [POST] 이메일 인증 (인증번호 전송)
 * email을 인자로 받아 서버로 전송
 * @param email
 * @returns 일단 response 반환
 */
export const sendCertifyNumber = async (email: string) => {
  const response = defaultAxios.post('/auth/email/send', { to: email });

  return response;
};

/**
 * [POST] 이메일로 받은 인증번호를 서버에 생성된 인증번호와 비교 요청
 * number를 인자로 받아 서버로 전송
 * @param number 이메일로 받은 인증번호
 * @returns 일단 response 반환
 */
export const compareCertifyNumber = async (
  certificationNumber: string,
  email: string,
) => {
  const response = defaultAxios.post('/auth/email/check', {
    certificationNumber,
    email,
  });

  return response;
};

export const socialSignup = async (
  name: string,
  phone: string,
  gender: Gender,
  email: string,
) => {
  const data = {
    name,
    phone,
    gender,
    bio: 'dummyBio',
  };
  const response = defaultAxios.post('/auth/oauth/regist', data, {
    params: email,
  });

  return response;
};
