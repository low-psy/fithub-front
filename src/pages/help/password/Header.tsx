import React from 'react';

const Header = () => {
  return (
    <div className="mb-4 text-sm text-[#585D69] md:text-base">
      <p>비밀번호 찾기</p>
      <p className="text-sm">이메일로 임시 비밀번호를 발급해드립니다.</p>
      <p className="text-sm">
        임시 비밀번호 발급 후 프로필 페이지에서 변경 가능합니다.
      </p>
    </div>
  );
};

export default Header;
