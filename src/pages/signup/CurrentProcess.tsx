import React from 'react';

interface ISignupProcessProps {
  currentPage: 'email' | 'additional-info' | 'success';
}

function SuccessSVG() {
  return (
    <svg
      className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
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
    <ol className="flex justify-between items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-4">
      <li
        className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 dark:after:border-gray-700 ${firstSection.css}`}
      >
        <span className="flex items-center after:content-['-'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          {firstSection.svg}
          <p className="whitespace-nowrap">이메일</p>{' '}
          <span className="hidden sm:inline-flex sm:ms-2 whitespace-nowrap">
            인증
          </span>
        </span>
      </li>
      <li
        className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 dark:after:border-gray-700 ${secondSection.css}`}
      >
        <span className="flex items-center after:content-['-'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          {secondSection.svg}
          <p className="whitespace-nowrap">추가정보</p>{' '}
          <span className="hidden sm:inline-flex sm:ms-2 whitespace-nowrap">
            입력
          </span>
        </span>
      </li>
      <li className={`flex  items-center ${lastSection.css}`}>
        <span className="flex items-center sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
          {lastSection.svg}
          <p className="whitespace-nowrap">회원가입 완료</p>{' '}
        </span>
      </li>
    </ol>
  );
}

export default CurrentProcess;
