import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getUserInfos } from 'apis/user';
import { ProfileDto } from 'types/swagger/model/profileDto';
import MyBio from './MyBio';
import MyGrade from './MyGrade';
import MyInfo from './MyInfo';
import MyAccount from './MyAccount';
import withAuth from '../../../hocs/withAuth';
import MyInterest from './MyInterest';

const Profile = () => {
  const [profile, setProfile] = useState<ProfileDto | undefined>();
  const fetchProfile = async () => {
    const res = await getUserInfos();
    setProfile(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col">
      {/* 내 정보 */}
      <MyInfo
        name={profile?.name || ''}
        nickname={profile?.nickname || ''}
        gender={profile?.gender || ''}
        phone={profile?.phone || ''}
        email={profile?.email || ''}
      />
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />

      {/* 내 소개 */}
      <MyBio bio={profile?.bio || ''} />
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />

      {/* 내 등급 */}
      {/* <MyGrade grade={grade} />
      <div className="mb-4 mt-8 w-full border shadow-slate-500" /> */}

      {/* 내 관심사 */}
      <MyInterest interests={profile?.interests || []} />
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />

      {/* 비밀번호 변경, 회원 탈퇴 */}
      <MyAccount email={profile?.email || ''} />
    </div>
  );
};

export default withAuth(Profile, 'user');
