import React from 'react';

const ProfileSection: React.FC<{
  profileName: string;
  profileImage: string;
  date: string;
}> = ({ profileName, profileImage, date }) => {
  return (
    <div className="flex gap-4 ">
      <div className="aspect-square w-12 overflow-hidden rounded-full border-2 border-gray-100">
        <img src={profileImage} alt="프로필 이미지" />
      </div>
      <div className="space-y-1">
        <h2 className="font-bold">{profileName}</h2>
        <div className="text-sm font-extralight">{date.slice(0, 10)}</div>
      </div>
    </div>
  );
};

export default ProfileSection;
