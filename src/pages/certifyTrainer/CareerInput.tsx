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
    <div className="px-2 flex flex-col gap-2">
      <label htmlFor="company" className="text-main font-semibold">
        회사명
        <input
          id="company"
          placeholder="회사명을 입력해주세요."
          className="w-full bg-white rounded h-10 hover:outline-none focus:outline-none p-2 border border-main text-black"
          onChange={handleCareerInput}
          value={career.company}
        />
      </label>
      {/* 날짜 */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-2 h-16">
          <p className="text-main font-semibold">입사</p>
          <div className="flex flex-row gap-2">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="border border-main px-2 w-36 text-black rounded cursor-pointer"
              selected={
                career.startDate ? new Date(career.startDate) : new Date()
              }
              onChange={(date: Date) => handleCareerDate(date, 'startDate')}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="hidden sm:h-16 sm:leading-4 sm:align-middle sm:pt-8">
          ~
        </div>
        <div className="flex flex-col gap-2 h-16">
          <div className="flex flex-row items-center">
            <p
              className={`font-semibold ${
                career.working === 'true'
                  ? 'line-through text-gray-500'
                  : 'text-main'
              }`}
            >
              퇴사
            </p>
            <div
              role="presentation"
              onClick={handleCareerWorking}
              className={`h-4 w-4 m-1 rounded border  ${
                career.working === 'false'
                  ? 'bg-white border-gray-600'
                  : 'bg-green-500 border-none'
              } `}
            />
            <span className="text-sm">현재 재직중</span>
          </div>
          <div className="flex flex-row gap-2">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className={`border  px-2 w-36 rounded ${
                career.working === 'false'
                  ? 'cursor-pointer text-black border-main'
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
      <label htmlFor="work" className="text-main font-semibold">
        담당 업무
        <input
          id="work"
          placeholder="담당 업무를 입력해주세요."
          className="w-full bg-white rounded h-10 hover:outline-none focus:outline-none p-2 border border-main text-black"
          onChange={handleCareerInput}
          value={career.work}
        />
      </label>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="bg-red-400 text-white px-2 rounded w-full h-8 hover:bg-red-300"
          onClick={handleCareerReset}
        >
          모두 지우기
        </button>
        <button
          type="button"
          className="bg-main text-white px-2 rounded w-full hover:bg-hoverColor"
          onClick={handleAddCareerList}
        >
          추가하기
        </button>
      </div>
    </div>
  );
}

export default CareerInput;
