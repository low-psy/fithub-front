import React from 'react';
import { useLocation } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import SideMenuButton from './SideMenuButton';
import { useAppSelector } from '../../hooks/reduxHooks';

const SideMenu = () => {
  const location = useLocation();
  const clicked = location.pathname.split('/')[2];

  const profileUrl = '/user/profile';
  const postsUrl = '/user/posts';
  const reservationUrl = '/user/reservations';
  const cancellationUrl = '/user/cancellations';
  const trainerInfoUrl = '/user/trainerInfo';
  const { role } = useAppSelector((state) => state.user);

  return (
    <div className="hidden h-fit w-full max-w-[400px] rounded border shadow-slate-500 sm:block">
      {/* 프로필 이미지 */}
      <div className="flex justify-center">
        <ProfileImage />
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
          clicked={clicked === 'reservations'}
        />
        <SideMenuButton
          text="취소 / 노쇼 내역"
          to={cancellationUrl}
          clicked={clicked === 'cancellations'}
        />
        {role === 'trainer' && (
          <SideMenuButton
            text="트레이너 정보"
            to={trainerInfoUrl}
            clicked={clicked === 'trainerInfo'}
          />
        )}
      </div>
    </div>
  );
};

export default SideMenu;
