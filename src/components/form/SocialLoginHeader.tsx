import React from 'react';

function SocialLoginHeader() {
  return (
    <div className="relative mt-10 h-px bg-gray-300 mb-8">
      <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
        <span className="bg-white px-4 text-xs text-gray-500 uppercase">
          간편 로그인
        </span>
      </div>
    </div>
  );
}

export default SocialLoginHeader;
