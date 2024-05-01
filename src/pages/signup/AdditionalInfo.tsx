/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FormInput from '../../components/form/FormInput';
import FormLabel from '../../components/form/FormLabel';
import FormError from '../../components/form/FormError';
import { ISignupFormError, ISignupInputForm } from '../../types/user';

interface IAdditionalInfoProps {
  formValue: ISignupInputForm;
  handleFormInput: (id: string, value: string) => void;
  errorMsg: ISignupFormError;
  handleGender: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  // handleInterest: (e: any) => void;
}
const interestArr = ['PILATES', 'HEALTH', 'PT', 'CROSSFIT', 'YOGA'];

function AdditionalInfo() {
  const {
    formValue,
    handleFormInput,
    errorMsg,
    handleGender,
    handleSubmit,
    // handleInterest,
  } = useOutletContext<IAdditionalInfoProps>();

  const selectedButtonStyle = 'bg-[#BC9CFF] text-white ';
  const unSelectedButtonStyle = ' border border-[#BC9CFF] text-[#7F7F7F]';

  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);

  const handleInterestClick = (interest: string) => {
    // 관심사 삭제
    if (selectedInterest.includes(interest)) {
      setSelectedInterest((prev) => prev.filter((e) => e !== interest));
    } else {
      // 관심사 추가
      setSelectedInterest((prev) => [...prev, interest]);
    }
  };
  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit} noValidate>
      <FormLabel htmlFor="password" text="비밀번호">
        <FormInput
          placeholder="비밀번호를 입력해주세요."
          id="password"
          type="password"
          value={formValue.password}
          onChange={handleFormInput}
          error={errorMsg}
        />
        {errorMsg.password && <FormError>{errorMsg.password}</FormError>}
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
        {errorMsg.checkPassword && (
          <FormError>{errorMsg.checkPassword}</FormError>
        )}
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
        {errorMsg.name && <FormError>{errorMsg.name}</FormError>}
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
        {errorMsg.nickname && <FormError>{errorMsg.nickname}</FormError>}
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
        {errorMsg.phone && <FormError>{errorMsg.phone}</FormError>}
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
      {/* 관심사 */}
      {/* <FormLabel htmlFor="interest" text="관심사">
        <div className="mt-3 flex">
          {interestArr.map((interest) => (
            <div
              key={interest}
              className="mr-5 flex h-10 w-[100px] cursor-pointer items-center justify-center rounded-full  pl-5 pr-5"
              style={{
                background: `${selectedInterest.includes(interest) ? '#E0D1FF' : '#ECEEEF'}`,
              }}
              onClick={() => handleInterestClick(interest)}
            >
              <p className="font-semibold">{interest}</p>
            </div>
          ))}
        </div>
      </FormLabel> */}
      <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 sm:bottom-8 md:px-2">
        <div className="mx-2 flex flex-row justify-center gap-4">
          <button
            type="submit"
            className="hover:bg-hoverColor h-12 w-full min-w-[120px] whitespace-nowrap rounded  bg-main px-2 text-lg font-semibold text-white"
          >
            회원가입하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default AdditionalInfo;
