import React from 'react';
import MyBio from '../../components/profile/MyBio';
import MyGrade from '../../components/profile/MyGrade';
import MyInfo from '../../components/profile/MyInfo';
import { Gender } from '../../types/user';

interface IMainMenuProps {
  name: string;
  nickname: string;
  gender: Gender;
  phone: string;
  email: string;
  grade: string;
  bio: string;
}

const MainMenu = ({
  name,
  nickname,
  gender,
  phone,
  email,
  grade,
  bio,
}: IMainMenuProps) => {
  return (
    <div className="w-full max-w-[800px] rounded border px-6 py-3 shadow-slate-500">
      {/* 내 정보 */}
      <MyInfo
        name={name}
        nickname={nickname}
        gender={gender}
        phone={phone}
        email={email}
      />
      <div className="my-10 w-full border shadow-slate-500" />
      {/* 내 등급 */}
      <MyGrade grade={grade} />
      <div className="my-10 w-full border shadow-slate-500" />
      <MyBio bio={bio} />
      <div className="my-10 w-full border shadow-slate-500" />
      <p className="mb-8 text-gray-500 hover:cursor-pointer">회원 탈퇴하기</p>
    </div>
  );
};

export default MainMenu;
