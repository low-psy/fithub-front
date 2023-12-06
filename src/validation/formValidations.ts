// RegExp
const emailRegExp =
  // eslint-disable-next-line no-useless-escape
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const korRegExp = /^[가-힣]*$/;
const engRegExp = /^[a-zA-Z]*$/;
const hyphenRegExp = /-/g;
const phoneRegExp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

// Utility Functions
const isEntered = (input: string) => input.replace(/ /g, '').length > 0;
const isEmailValid = (email: string) => emailRegExp.test(email);
const isPasswordValid = (password: string) => passwordRegExp.test(password);
const isEqual = (str1: string, str2: string) => str1 === str2;
const isNameValid = (name: string) => {
  const n = name.replace(/ /g, '');
  return korRegExp.test(n) || engRegExp.test(n);
};
const hasHypen = (phone: string) => hyphenRegExp.test(phone);
const isPhoneValid = (phone: string) => phoneRegExp.test(phone);

// Specific Validation
export const validateEmail = (email: string) => {
  if (!isEntered(email))
    return { status: false, errorMessage: '이메일을 입력해주세요' };
  if (!isEmailValid(email))
    return { status: false, errorMessage: '올바른 이메일 형식이 아닙니다.' };
  return { status: true, errorMessage: '' };
};

export const validatePassword = (password: string) => {
  if (!isEntered(password))
    return { status: false, errorMessage: '비밀번호를 입력해주세요' };
  if (!isPasswordValid(password))
    return {
      status: false,
      errorMessage:
        '비밀번호는 영문, 숫자, 특수기호를 모두 사용하면서 8~15자 이어야 합니다.',
    };
  return { status: true, errorMessage: '' };
};

export const validatePasswordCheck = (
  password: string,
  checkPassword: string,
) => {
  if (!isEqual(password, checkPassword))
    return { status: false, errorMessage: '비밀번호가 일치하지 않습니다.' };
  return { status: true, errorMessage: '' };
};

export const validateName = (name: string) => {
  if (!isEntered(name))
    return { status: false, errorMessage: '이름을 입력해주세요' };
  if (!isNameValid(name))
    return {
      status: false,
      errorMessage: '이름은 한글 또는 영어로 입력해주세요.',
    };
  return { status: true, errorMessage: '' };
};

export const validateNickname = (nickname: string) => {
  if (!isEntered(nickname))
    return { status: false, errorMessage: '닉네임을 입력해주세요.' };
  return { status: true, errorMessage: '' };
};

export const validatePhone = (phone: string) => {
  if (!isEntered(phone))
    return { status: false, errorMessage: '전화번호를 입력해주세요' };
  if (hasHypen(phone))
    return {
      status: false,
      errorMessage: '하이픈(-) 없이 숫자로만 입력해주세요.',
    };
  if (!isPhoneValid(phone))
    return {
      status: false,
      errorMessage: '유효한 전화번호 형식이 아닙니다.',
    };
  return { status: true, errorMessage: '' };
};
