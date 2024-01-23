import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MyBio from './MyBio';
import MyGrade from './MyGrade';
import MyInfo from './MyInfo';
import { IProfile } from '../../../types/profile';
import MyAccount from './MyAccount';

interface IProfileOutletContext {
  name: string;
  profile: IProfile;
}

const Profile = () => {
  const { name, profile } = useOutletContext<IProfileOutletContext>();
  const { nickname, gender, phone, email, grade, bio } = profile;

  return (
    <div className="flex flex-col">
      {/* 내 정보 */}
      <MyInfo
        name={name}
        nickname={nickname}
        gender={gender}
        phone={phone}
        email={email}
      />
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />

      {/* 내 소개 */}
      <MyBio bio={bio} />
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />

      {/* 내 등급 */}
      <MyGrade grade={grade} />
      <div className="mb-4 mt-8 w-full border shadow-slate-500" />

      {/* 비밀번호 변경, 회원 탈퇴 */}
      <MyAccount />
    </div>
  );
};

export default Profile;
