import React from 'react';

function SocialLoginHeader() {
  return (
    <div className="relative mb-8 mt-10 h-px w-full max-w-[600px] bg-gray-300">
      <div className="absolute left-0 top-0 -mt-2 flex w-full justify-center">
        <span className=" bg-white px-4 text-xs uppercase text-gray-500">
          간편 로그인
        </span>
      </div>
    </div>
  );
}

export default SocialLoginHeader;
