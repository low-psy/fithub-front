import React from 'react';
// import naverImg from '../../assets/naver_symbol.png';
import ProfileImage from './ProfileImage';
import SideMenuButton from './SideMenuButton';

interface ISideMenuProps {
  profileImg: string;
}

const SideMenu = ({ profileImg }: ISideMenuProps) => {
  const profileUrl = '/user';
  const postsUrl = '/user/posts';
  const reservationUrl = '/user/reservation';
  const cancellationUrl = '/user/cancellation';

  return (
    <div className="hidden h-fit w-full max-w-[400px] rounded border shadow-slate-500 sm:block">
      {/* 프로필 이미지 */}
      <div className="flex justify-center">
        <ProfileImage imageSrc={profileImg} />
      </div>
      {/* 메뉴 리스트 */}
      <div className="flex flex-col">
        <SideMenuButton text="내 정보" to={profileUrl} />
        <SideMenuButton text="내가 쓴 글" to={postsUrl} />
        <SideMenuButton text="예약 / 종료 내역" to={reservationUrl} />
        <SideMenuButton text="취소 / 환불 내역" to={cancellationUrl} />
      </div>
    </div>
  );
};

export default SideMenu;
