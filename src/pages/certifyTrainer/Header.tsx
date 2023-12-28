import React from 'react';

function Header() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-semibold text-main -mt-4">트레이너 인증</p>
      <p className="text-sm md:text-base text-gray-500">
        트레이너 인증을 통해 트레이너로서 서비스를 이용하실 수 있습니다.
      </p>
      <div className="border-[0.5px] border-gray-300 w-full my-4 flex flex-row" />
    </div>
  );
}

export default Header;
