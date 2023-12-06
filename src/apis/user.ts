import { defaultAxios } from './axios';

import { ISignupProps } from '../types/user';

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
export const signup = async (props: ISignupProps) => {
  const data = {
    ...props,
    bio: 'dummy',
  };
  const response = await defaultAxios.post('/auth/sign-up', data);

  return response;
};

/**
 * [POST] 비밀번호 찾기를 위한 인증번호 요청
 * email을 인자로 받아 서버로 전송
 * @param email
 * @returns 일단 response 반환
 */
export const sendAuthentication = async (email: string) => {
  const response = defaultAxios.post('/auth/email/send', { to: email });

  return response;
};

/**
 * [POST] 이메일로 받은 인증번호를 서버에 생성된 인증번호와 비교 요청
 * number를 인자로 받아 서버로 전송
 * @param number 이메일로 받은 인증번호
 * @returns 일단 response 반환
 */
export const certifyNumber = async (number: string) => {
  const response = defaultAxios.post('/auth/email/check', { number });

  return response;
};
