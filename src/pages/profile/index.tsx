import React from 'react';
import { useLoaderData } from 'react-router-dom';
// import { authAxios } from '../../apis/axios';
import withAuth from '../../hocs/withAuth';
import { IProfile } from '../../types/profile';
import MainMenu from './MainMenu';
import SideMenu from './SideMenu';

const Profile = () => {
  const profile = useLoaderData() as IProfile;
  console.log(profile);

  return (
    <div className="flex flex-row justify-center gap-x-10 px-10 py-4">
      {profile && (
        <>
          <SideMenu profileImg={profile.profileImg} />
          <MainMenu
            name="서울로그"
            nickname={profile.nickname}
            gender={profile.gender}
            phone={profile.phone}
            email={profile.email}
            grade={profile.grade}
            bio={profile.bio}
          />
        </>
      )}
    </div>
  );
};

export default withAuth(Profile, true, '/profile');
