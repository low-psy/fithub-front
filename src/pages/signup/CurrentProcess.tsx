import React from 'react';

interface ISignupProcessProps {
  currentPage: 'email' | 'additional-info' | 'success';
}

function SuccessSVG() {
  return (
    <svg
      className="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  );
}

function CurrentProcess({ currentPage }: ISignupProcessProps) {
  const firstSection = {
    svg: (currentPage === 'additional-info' || currentPage === 'success') && (
      <SuccessSVG />
    ),
    css: 'text-blue-600 dark:text-blue-500',
  };

  const secondSection = {
    svg: currentPage === 'success' && <SuccessSVG />,
    css:
      (currentPage === 'additional-info' || currentPage === 'success') &&
      'text-blue-600 dark:text-blue-500',
  };

  const lastSection = {
    svg: currentPage === 'success' && <SuccessSVG />,
    css: currentPage === 'success' && 'text-blue-600 dark:text-blue-500',
  };

  return (
    <ol className="mb-4 flex w-full items-center justify-between text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
      <li
        className={`after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full ${firstSection.css}`}
      >
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['-'] dark:after:text-gray-500 sm:after:hidden">
          {firstSection.svg}
          <p className="whitespace-nowrap">이메일</p>{' '}
          <span className="hidden whitespace-nowrap sm:ms-2 sm:inline-flex">
            인증
          </span>
        </span>
      </li>
      <li
        className={`after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full ${secondSection.css}`}
      >
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['-'] dark:after:text-gray-500 sm:after:hidden">
          {secondSection.svg}
          <p className="whitespace-nowrap">추가정보</p>{' '}
          <span className="hidden whitespace-nowrap sm:ms-2 sm:inline-flex">
            입력
          </span>
        </span>
      </li>
      <li className={`flex  items-center ${lastSection.css}`}>
        <span className="flex items-center after:mx-2 after:text-gray-200 dark:after:text-gray-500 sm:after:hidden">
          {lastSection.svg}
          <p className="whitespace-nowrap">회원가입 완료</p>{' '}
        </span>
      </li>
    </ol>
  );
}

export default CurrentProcess;
