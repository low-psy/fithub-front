import { authAxios, defaultAxios } from './axios';

import { Gender, ISignupProps } from '../types/user';
import { handleLoginSuccess } from '../utils/util';

/**
 * [POST] 일반 로그인
 * email, password를 인자로 받아 서버로 전송
 * @param email
 * @param password
 * @returns
 */
export const defaultLogin = async (email: string, password: string) => {
  const data = {
    email,
    password,
  };
  const response = await defaultAxios.post('/auth/sign-in', data);

  const accessToken = response.headers.authorization.split(' ')[1];
  handleLoginSuccess(accessToken);

  return response;
};

/**
 * [POST] 소셜 로그인
 * platform(kakao, naver, google)과 code(소셜 서비스에서 받아온 인가코드)를 인자로 받아 서버로 전송
 * @param platform kakao | naver | google
 * @param code authentication code
 * @returns
 */
export const socialLogin = async (platform: string, code: string) => {
  const response = await defaultAxios.post(`/auth/login?code=${code}`);

  return response;
};

/**
 * [POST] 일반 회원가입
 * nickname, email, password, phone, gender를 인자로 받아 서버로 전송
 * @param props nickname, email, password, phone, gender를 담은 객체
 * @returns
 */
export const signup = async (props: ISignupProps, profileImg = '') => {
  const signupDto = { ...props, bio: 'dummyBio' };
  const blob = new Blob([JSON.stringify(signupDto)], {
    type: 'application/json',
  });

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
 * @returns
 */
export const sendCertifyNumber = async (email: string) => {
  const response = defaultAxios.post('/auth/email/send', { to: email });

  return response;
};

/**
 * [POST] 이메일로 받은 인증번호를 서버에 생성된 인증번호와 비교 요청
 * number를 인자로 받아 서버로 전송
 * @param certificationNumber 이메일로 받은 인증번호
 * @param email 사용자 이메일
 * @returns
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

/**
 * [POST] 소셜 회원가입 (소셜 로그인을 이용하기 위한 최초 1회 인증)
 * 쿼리 파라미터로 이메일을, 요청 바디에 데이터를 전달
 * @param email 사용자 이메일
 * @param name 사용자 이름
 * @param phone 사용자 전화번호
 * @param gender 사용자 성별
 *  @param providerId 소셜 provider id
 * @returns
 */
export const socialSignup = async (
  email: string,
  name: string,
  phone: string,
  gender: Gender,
  providerId: string,
) => {
  const data = {
    email,
    name,
    phone,
    bio: 'dummyBio',
    gender,
    providerId,
  };
  const response = defaultAxios.post('/auth/oauth/regist', data);

  return response;
};

/**
 * [PATCH] 임시 비밀번호 발급
 * @param email 사용자 이메일
 * @returns
 */
export const getTempPassword = (email: string) => {
  const response = defaultAxios.patch('/auth/email/send/temporary-password', {
    to: email,
  });

  return response;
};

/**
 * [POST] 비밀번호 변경
 * @param email 사용자 이메일
 * @param password 변경 후 비밀번호
 * @returns
 */
export const changePassword = (email: string, password: string) => {
  const response = authAxios.post('/auth/change/password', {
    email,
    password,
  });

  return response;
};

/**
 * [PUT] 프로필 정보 변경
 * @param name
 * @param nickname
 * @param phone
 * @param gender
 * @param bio
 * @returns
 */
export const updateProfile = async (
  name: string,
  nickname: string,
  phone: string,
  gender: Gender,
  bio: string,
) => {
  const response = await authAxios.put('/users/profile/update', null, {
    params: {
      name,
      nickname,
      phone,
      gender,
      bio,
    },
  });

  return response;
};

/**
 * [PUT] 프로필 이미지 변경
 * @param formData
 * @returns
 */
export const updateProfileImg = async (formData: FormData) => {
  const response = await authAxios.put('/users/image/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

/**
 * [DELETE] 로그아웃
 * @returns
 */
export const logout = async () => {
  const params = { accessToken: localStorage.getItem('accessToken') };

  const response = await authAxios.delete('/auth/sign-out', { params });

  return response;
};

/**
 * [GET] 예약리스트
 */
export const fetchTrainingReservation = async () => {
  const response = await authAxios.get('/users/training/reservation/all');
  return response.data.content;
};
