import { useAppSelector } from 'hooks/reduxHooks';
import React from 'react';

const ProfileImage = () => {
  const { profileUrl } = useAppSelector((state) => state.user);
  return profileUrl ? (
    <img
      className="my-12 h-32 w-32 rounded-full bg-gray-300"
      src={profileUrl}
      alt="profile_image"
    />
  ) : (
    <img
      className="my-12 h-32 w-32 rounded-full bg-gray-300"
      alt="profile_image"
    />
  );
};

export default ProfileImage;
