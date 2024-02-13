export interface ISignupProps {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  gender: 'M' | 'F';
}

export type Gender = 'M' | 'F';

export interface ISignupInputForm {
  email: string;
  password: string;
  checkPassword: string;
  name: string;
  nickname: string;
  phone: string;
  gender: Gender;
}

export interface ISignupFormError {
  [key: string]: string;
  email: string;
  password: string;
  checkPassword: string;
  name: string;
  nickname: string;
  phone: string;
}

export type ROLE = 'guest' | 'user' | 'trainer' | 'admin';
