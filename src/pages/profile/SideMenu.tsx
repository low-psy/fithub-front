import React from 'react';
// import naverImg from '../../assets/naver_symbol.png';
import ProfileImage from '../../components/profile/ProfileImage';
import SideMenuButton from '../../components/profile/SideMenuButton';

interface ISideMenuProps {
  profileImg: string;
}

const SideMenu = ({ profileImg }: ISideMenuProps) => {
  return (
    <div className="h-fit w-full max-w-[400px] rounded border shadow-slate-500">
      {/* 프로필 이미지 */}
      <div className="flex justify-center">
        <ProfileImage imageSrc={profileImg} />
      </div>
      {/* 메뉴 리스트 */}
      <div className="flex flex-col">
        <SideMenuButton text="내정보" />
        <SideMenuButton text="내가 쓴 글" />
        <SideMenuButton text="예약 / 종료 내역" />
        <SideMenuButton text="취소 / 환불 내역" />
      </div>
    </div>
  );
};

export default SideMenu;
