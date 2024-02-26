import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  compareCertifyNumber,
  sendCertifyNumber,
  socialSignup,
  // socialSignup,
} from '../../apis/user';
import FormError from '../../components/form/FormError';
import FormInput from '../../components/form/FormInput';
import FormLabel from '../../components/form/FormLabel';
import FormLogo from '../../components/form/FormLogo';
import Layout from '../../components/form/Layout';
import HelpInput from '../../components/help/HelpInput';
import { Gender } from '../../types/user';
import { validateCertifyNumber } from '../../validation/help/findPasswordValidation';
import { validateSocialSignupForm } from '../../validation/signup/signupFormValidation';

interface ISocialSignupFormValue {
  [key: string]: string;
  email: string;
  name: string;
  phone: string;
  gender: Gender;
}

interface ISocialSignupErrorMsg {
  [key: string]: string;
  email: string;
  name: string;
  phone: string;
}

function SocialSignup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultEmail = searchParams.get('email');
  const defaultName = searchParams.get('name');
  const defaultPhone = searchParams.get('phone');
  const defaultGender = searchParams.get('gender');
  const provider = searchParams.get('provider');

  const isEmailRequire = provider === 'kakao';

  const defaultFormValue = {
    email: defaultEmail || '',
    name: defaultName || '',
    phone: defaultPhone || '',
    gender: defaultGender !== 'UNDEFINED' ? (defaultGender as Gender) : 'M',
  };

  const defaultErrorMsg = {
    email: '',
    name: '',
    phone: '',
  };

  const selectedButtonStyle = 'bg-[#BC9CFF] text-white ';
  const unSelectedButtonStyle = ' border border-[#BC9CFF] text-[#7F7F7F]';
  const abledButtonCss = 'bg-main hover:bg-main text-white';
  const disabledButtonCSS = 'border border-gray-500 text-gray-500';

  const [formValue, setFormValue] =
    useState<ISocialSignupFormValue>(defaultFormValue);
  const [errorMsg, setErrorMsg] =
    useState<ISocialSignupErrorMsg>(defaultErrorMsg);
  // const [errorMsg] = useState<ISocialSignupErrorMsg>(defaultErrorMsg);

  // 이메일 인증 관련 state
  // 인증번호 전송 여부
  const [isSent, setIsSent] = useState<boolean>(false);
  // 아메일 인증 여부
  const [emailCertified, setEmailCertified] = useState<boolean>(
    provider === 'google',
  );
  // 인증번호
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  // 인증번호 input error
  const [cerfiticationError, setCertificationError] = useState<string>('');

  const handleCertificationNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCertificationNumber(e.target.value);
  };

  const onSendCertificationNumber = async () => {
    if (formValue.email.replace(/ /g, '').length === 0) {
      // eslint-disable-next-line no-alert
      alert('이메일을 입력해주세요');
      return;
    }
    setIsSent(true);

    try {
      const response = await sendCertifyNumber(formValue.email);
      if (response && response.status === 200) {
        setIsSent(true);
      }
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line no-alert
      alert('인증번호 전송 중 오류가 발생하였습니다.');
    }
  };

  const handleCompareCertifyNumber = async () => {
    if (!validateCertifyNumber(certificationNumber, setCertificationError))
      return;

    try {
      const response = await compareCertifyNumber(
        certificationNumber,
        formValue.email,
      );

      if (response && response.status === 200) {
        localStorage.setItem('certifiedEmail', formValue.email);
        setEmailCertified(true);
      }
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line no-alert
      alert('인증번호 확인 중 오류가 발생하였습니다.');
    }
  };

  const handleSubmitSocialSignup = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const { email, name, phone, gender } = formValue;
    const providerId = searchParams.get('providerId') as string;

    // validation
    if (!validateSocialSignupForm(email, name, phone, setErrorMsg)) return;

    // send to server
    try {
      const response = await socialSignup(
        email,
        name,
        phone,
        gender,
        providerId,
      );

      if (response && response.status === 200) {
        // eslint-disable-next-line no-alert
        alert('회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다.');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInputValue = (id?: string, value?: string) => {
    if (id && value) {
      setFormValue((prevInput) => ({ ...prevInput, [id]: value }));
    }
  };

  const handleGender = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFormValue({
      ...formValue,
      gender: e.currentTarget.value as Gender,
    });
  };

  return (
    <Layout>
      <FormLogo width="w-14" fontSize="text-lg" />
      <div className="mb-2 flex flex-col  items-center">
        <p className="font-semibold">
          소셜 로그인을 이용하기 위한 추가정보를 입력
        </p>
        <p className="text-sm text-slate-500">
          추가정보 입력은 최초 소셜로그인 에만 요구됩니다.
        </p>
      </div>
      <form onSubmit={handleSubmitSocialSignup} className="flex flex-col gap-2">
        {/* 이메일 입력, 인증번호 요청 */}
        <FormLabel htmlFor="email" text="이메일">
          <div className="flex w-full flex-row gap-2">
            <FormInput
              id="email"
              type="email"
              placeholder="Email"
              value={formValue.email || ''}
              onChange={handleChangeInputValue}
              error={errorMsg}
              disabled={!isEmailRequire || emailCertified}
            />
            {isEmailRequire && (
              <button
                type="button"
                className="w-30 mt-2 h-10 whitespace-nowrap rounded bg-main px-2 text-lg font-semibold text-white hover:bg-[#976fff]"
                onClick={onSendCertificationNumber}
              >
                인증번호 전송
              </button>
            )}
          </div>
          <FormError>{errorMsg?.email}</FormError>
        </FormLabel>
        {/* 인증번호 입력 */}
        {isSent && (
          <FormLabel htmlFor="certificationNumber" text="인증번호 입력">
            <div className="flex w-full flex-row gap-2">
              <HelpInput
                placeholder="인증번호를 입력해주세요"
                id="certificationNumber"
                type="text"
                value={certificationNumber}
                onChange={handleCertificationNumber}
                error={cerfiticationError}
                disabled={emailCertified}
              />
              <button
                type="button"
                className="w-30 mt-2 h-10 whitespace-nowrap rounded bg-main px-2 text-lg font-semibold text-white hover:bg-[#976fff]"
                onClick={handleCompareCertifyNumber}
              >
                인증하기
              </button>
            </div>
          </FormLabel>
        )}
        {/* 이름, 전화번호, 성별 */}
        {emailCertified && (
          <div className="mt-2 flex flex-col gap-2">
            {/* 이름 */}
            <FormLabel htmlFor="name" text="이름">
              <FormInput
                placeholder="이름을 입력해주세요."
                id="name"
                type="text"
                value={formValue.name}
                onChange={handleChangeInputValue}
                error={errorMsg}
              />
              {errorMsg.name && <FormError>{errorMsg.name}</FormError>}
            </FormLabel>
            {/* 전화번호 */}
            <FormLabel htmlFor="phone" text="전화번호">
              <FormInput
                placeholder="'-' 없이 입력해주세요."
                id="phone"
                type="text"
                value={formValue.phone}
                onChange={handleChangeInputValue}
                error={errorMsg}
              />
              {errorMsg.phone && <FormError>{errorMsg.phone}</FormError>}
            </FormLabel>
            {/* 성별 */}
            <div className="mt-2 flex flex-row gap-4">
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
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 sm:bottom-8 md:px-2">
          <div className="mx-2 flex flex-row justify-center gap-4">
            <button
              type="submit"
              className={`h-12 w-full min-w-[120px] whitespace-nowrap rounded px-2  text-lg font-semibold ${
                emailCertified ? abledButtonCss : disabledButtonCSS
              }`}
              disabled={!emailCertified}
            >
              소셜 회원가입하기
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default SocialSignup;
