import React from 'react';

interface IProfileImageProps {
  imageSrc: string;
}

const ProfileImage = ({ imageSrc }: IProfileImageProps) => {
  return (
    <img
      className="my-12 h-32 w-32 rounded-full bg-gray-300"
      src={imageSrc}
      alt="profile_image"
    />
  );
};

export default ProfileImage;
