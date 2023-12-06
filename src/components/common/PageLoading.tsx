import React from 'react';

interface IPageLoadingProps {
  text: string;
}

function PageLoading({ text }: IPageLoadingProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="text-[#504E48] text-2xl mb-4">{text}</p>
      <div
        className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#504E48]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ! [clip:rect(0,0,0,0)]" />
      </div>
    </div>
  );
}

export default PageLoading;
