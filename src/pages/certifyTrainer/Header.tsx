import React from 'react';

function Header() {
  return (
    <div className="mt-8 flex flex-col items-center sm:mt-0">
      <p className="-mt-4 text-2xl font-semibold text-main">트레이너 인증</p>
      <p className="text-sm text-gray-500 md:text-base">
        트레이너 인증을 통해 트레이너로서 서비스를 이용하실 수 있습니다.
      </p>
      <div className="my-4 flex w-full flex-row border-[0.5px] border-gray-300" />
    </div>
  );
}

export default Header;
