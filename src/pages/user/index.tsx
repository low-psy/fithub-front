import React, { useState, useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { getUserInfos } from 'apis/user';
import { useAppDispatch } from 'hooks/reduxHooks';
import { SET_PROFILE_URL } from 'redux/slices/userSlice';
import withAuth from '../../hocs/withAuth';
import { IProfile } from '../../types/profile';
import SideMenu from './SideMenu';

const User = () => {
  const [profileImg, setProfileImg] = useState<string>();
  const profile = useLoaderData() as IProfile;
  const dispatch = useAppDispatch();

  const fetchUserInfo = async () => {
    const res = await getUserInfos();
    setProfileImg(res.data.profileImg);
  };

  useEffect(() => {
    fetchUserInfo();
    dispatch(SET_PROFILE_URL(profileImg));
  }, [dispatch, profileImg]);

  return (
    <div className="flex flex-row justify-center gap-x-10 px-10 py-4">
      <SideMenu />
      <div className="w-full max-w-[1000px] rounded border px-6 py-3 shadow-slate-500">
        <Outlet
          context={{
            profile,
          }}
        />
      </div>
    </div>
  );
};

export default withAuth(User, 'user');
