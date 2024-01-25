import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import { IProfile } from '../../types/profile';
import SideMenu from './SideMenu';

const User = () => {
  const profile = useLoaderData() as IProfile;
  const name = '서울로그';

  return (
    <div className="flex flex-row justify-center gap-x-10 px-10 py-4">
      <SideMenu profileImg={profile.profileImg} />
      <div className="w-full max-w-[1000px] rounded border px-6 py-3 shadow-slate-500">
        <Outlet
          context={{
            profile,
            name,
          }}
        />
      </div>
    </div>
  );
};

export default withAuth(User, true, '/user');
