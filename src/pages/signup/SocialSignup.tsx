import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { compareCertifyNumber, sendCertifyNumber } from '../../apis/user';
import FormError, { ErrorText } from '../../components/form/FormError';
import FormInput from '../../components/form/FormInput';
import FormLabel from '../../components/form/FormLabel';
import FormLogo from '../../components/form/FormLogo';
import Layout from '../../components/form/Layout';
import HelpInput from '../../components/help/HelpInput';
import { Gender } from '../../types/user';
import { validateCertifyNumber } from '../../validation/help/findPasswordValidation';

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
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const phone = searchParams.get('phone');
  const gender = searchParams.get('gender');
  const provider = searchParams.get('provider');

  if (email) console.log('이메일 있음');
  if (name) console.log('이름 있음');
  if (phone) console.log('전화번호 있음');
  if (gender !== 'UNDEFINED') console.log('성별 있음');

  const defaultFormValue = {
    email: email || '',
    name: name || '',
    phone: phone || '',
    gender: gender !== 'UNDEFINED' ? (gender as Gender) : 'M',
  };

  const defaultErrorMsg = {
    email: '',
    name: '',
    phone: '',
  };

  const selectedButtonStyle = 'bg-[#BC9CFF] text-white ';
  const unSelectedButtonStyle = ' border border-[#BC9CFF] text-[#7F7F7F]';

  const [formValue, setFormValue] =
    useState<ISocialSignupFormValue>(defaultFormValue);
  console.log(formValue.gender);
  // const [errorMsg, setErrorMsg] =
  //   useState<ISocialSignupErrorMsg>(defaultErrorMsg);
  const [errorMsg] = useState<ISocialSignupErrorMsg>(defaultErrorMsg);

  // 이메일 인증 관련 state
  const [isSent, setIsSent] = useState<boolean>(false);
  // const [emailCertified, setEmailCertified] = useState<boolean>(!!email);
  const [emailCertified, setEmailCertified] = useState<boolean>(
    provider !== 'kakao',
  );
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  const [cerfiticationError, setCertificationError] = useState<string>('');

  const handleCertificationNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCertificationNumber(e.target.value);
  };

  const onSendCertificationNumber = async () => {
    setIsSent(true);

    if (formValue.email.replace(/ /g, '').length === 0) {
      // eslint-disable-next-line no-alert
      alert('이메일을 입력해주세요');
      return;
    }
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
        localStorage.setItem('certifiedNumber', formValue.email);
        setEmailCertified(true);
      }
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line no-alert
      alert('인증번호 확인 중 오류가 발생하였습니다.');
    }
  };

  const handleSubmitSocialSignup = () => {
    console.log(formValue);
  };

  const handleChangeInputValue = (id: string, value: string) => {
    setFormValue((prevInput) => ({ ...prevInput, [id]: value }));
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
      <div className="flex flex-col items-center  mb-2">
        <p className="font-semibold">
          소셜 로그인을 이용하기 위한 추가정보를 입력
        </p>
        <p className="text-slate-500 text-sm">
          추가정보 입력은 최초 소셜로그인 에만 요구됩니다.
        </p>
      </div>
      <form onSubmit={handleSubmitSocialSignup}>
        {/* 이메일 입력, 인증번호 요청 */}
        <FormLabel htmlFor="email" text="이메일">
          <div className="flex flex-row w-full gap-2">
            <FormInput
              id="email"
              type="email"
              placeholder="Email"
              value={formValue.email || ''}
              onChange={handleChangeInputValue}
              error={errorMsg}
            />
            <button
              type="button"
              className="w-30 whitespace-nowrap bg-main h-10 rounded text-white text-lg font-semibold mt-2 px-2 hover:bg-[#976fff]"
              onClick={onSendCertificationNumber}
            >
              인증번호 전송
            </button>
          </div>
          <FormError>
            {errorMsg?.email && <ErrorText text={errorMsg.email} />}
          </FormError>
        </FormLabel>
        {/* 인증번호 입력 */}
        {isSent && (
          <FormLabel htmlFor="certificationNumber" text="인증번호 입력">
            <div className="flex flex-row w-full gap-2">
              <HelpInput
                placeholder="인증번호를 입력해주세요"
                id="certificationNumber"
                type="text"
                value={certificationNumber}
                onChange={handleCertificationNumber}
                error={cerfiticationError}
              />
              <button
                type="button"
                className="w-30 whitespace-nowrap bg-main h-10 rounded text-white text-lg font-semibold mt-2 px-2 hover:bg-[#976fff]"
                onClick={handleCompareCertifyNumber}
              >
                인증하기
              </button>
            </div>
          </FormLabel>
        )}
        {emailCertified && (
          <div className="flex flex-col gap-2 mt-2">
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
              <FormError>
                {errorMsg.name && <ErrorText text={errorMsg.name} />}
              </FormError>
            </FormLabel>
            {/* 전화번호 */}
            <FormLabel htmlFor="phone" text="전화번호">
              <FormInput
                placeholder="'-' 없이 입력헤주세요."
                id="phone"
                type="text"
                value={formValue.phone}
                onChange={handleChangeInputValue}
                error={errorMsg}
              />
              <FormError>
                {errorMsg.phone && <ErrorText text={errorMsg.phone} />}
              </FormError>
            </FormLabel>
            <div className="flex flex-row gap-4 mt-2">
              <button
                type="button"
                className={`w-[120px] h-[40px] rounded-md text-lg ${
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
                className={`w-[120px] h-[40px] rounded-md text-lg ${
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
      </form>
    </Layout>
  );
}

export default SocialSignup;
