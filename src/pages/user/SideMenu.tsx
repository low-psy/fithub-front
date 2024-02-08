import React from 'react';
import { useLocation } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import SideMenuButton from './SideMenuButton';

interface ISideMenuProps {
  profileImg: string;
}

const SideMenu = ({ profileImg }: ISideMenuProps) => {
  const location = useLocation();
  const clicked = location.pathname.split('/')[2];

  const profileUrl = '/user/profile';
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
        <SideMenuButton
          text="내 정보"
          to={profileUrl}
          clicked={clicked === 'profile' || clicked === 'edit'}
        />
        <SideMenuButton
          text="내가 쓴 글"
          to={postsUrl}
          clicked={clicked === 'posts'}
        />
        <SideMenuButton
          text="예약 / 종료 내역"
          to={reservationUrl}
          clicked={clicked === 'reservation'}
        />
        <SideMenuButton
          text="취소 / 환불 내역"
          to={cancellationUrl}
          clicked={clicked === 'cancellation'}
        />
      </div>
    </div>
  );
};

export default SideMenu;
