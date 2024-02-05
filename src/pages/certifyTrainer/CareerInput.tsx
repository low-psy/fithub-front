import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

interface ICareer {
  [key: string]: string | boolean | (() => void);
  company: string;
  work: string;
  startDate: string;
  endDate: string;
  working: 'true' | 'false';
}

interface ICareerInputProps {
  career: ICareer;
  handleCareerInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCareerDate: (date: Date, id: string) => void;
  handleCareerWorking: () => void;
  handleCareerReset: () => void;
  handleAddCareerList: () => void;
}

function CareerInput({
  career,
  handleCareerInput,
  handleCareerDate,
  handleCareerWorking,
  handleCareerReset,
  handleAddCareerList,
}: ICareerInputProps) {
  return (
    <div className="flex flex-col gap-2 px-2">
      <label htmlFor="company" className="font-semibold text-main">
        회사명
        <input
          id="company"
          placeholder="회사명을 입력해주세요."
          className="h-10 w-full rounded border border-main bg-white p-2 text-black hover:outline-none focus:outline-none"
          onChange={handleCareerInput}
          value={career.company}
        />
      </label>
      {/* 날짜 */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex h-16 flex-col gap-2">
          <p className="font-semibold text-main">입사</p>
          <div className="flex flex-row gap-2">
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
            <ReactDatePicker
              id="startDate"
              locale={ko}
              className="w-36 cursor-pointer rounded border border-main px-2 text-black"
              selected={
                career.startDate ? new Date(career.startDate) : new Date()
              }
              onChange={(date: Date) => handleCareerDate(date, 'startDate')}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="hidden sm:h-16 sm:pt-8 sm:align-middle sm:leading-4">
          ~
        </div>
        <div className="flex h-16 flex-col gap-2">
          <div className="flex flex-row items-center">
            <p
              className={`font-semibold ${
                career.working === 'true'
                  ? 'text-gray-500 line-through'
                  : 'text-main'
              }`}
            >
              퇴사
            </p>
            <div
              role="presentation"
              onClick={handleCareerWorking}
              className={`m-1 h-4 w-4 rounded border  ${
                career.working === 'false'
                  ? 'border-gray-600 bg-white'
                  : 'border-none bg-green-500'
              } `}
            />
            <span className="text-sm">현재 재직중</span>
          </div>
          <div className="flex flex-row gap-2">
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
            <ReactDatePicker
              disabled={career.working === 'true'}
              locale={ko}
              className={`w-36  rounded border px-2 ${
                career.working === 'false'
                  ? 'cursor-pointer border-main text-black'
                  : 'text-gray-500 '
              }`}
              selected={career.endDate ? new Date(career.endDate) : new Date()}
              onChange={(date: Date) => handleCareerDate(date, 'endDate')}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
      </div>
      {/* 담당업무 */}
      <label htmlFor="work" className="font-semibold text-main">
        주요 업무
        <input
          id="work"
          placeholder="주요 업무를 입력해주세요."
          className="h-10 w-full rounded border border-main bg-white p-2 text-black hover:outline-none focus:outline-none"
          onChange={handleCareerInput}
          value={career.work}
        />
      </label>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="h-10 w-full rounded bg-red-400 px-2 text-white hover:bg-red-300"
          onClick={handleCareerReset}
        >
          모두 지우기
        </button>
        <button
          type="button"
          className="hover:bg-hoverColor w-full rounded bg-main px-2 text-white"
          onClick={handleAddCareerList}
        >
          추가하기
        </button>
      </div>
    </div>
  );
}

export default CareerInput;
