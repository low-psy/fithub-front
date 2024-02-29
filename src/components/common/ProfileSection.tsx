import React from 'react';

const ProfileSection: React.FC<{
  profileName?: string | undefined;
  profileImage?: string | undefined;
  date?: string | undefined;
  location?: string;
  profileWidth?: string;
}> = ({ profileName, profileImage, date, location, profileWidth }) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className="aspect-square w-12  overflow-hidden rounded-full border-[1px] border-gray-300"
        style={{ width: profileWidth }}
      >
        <img
          src={profileImage}
          alt="프로필 이미지"
          className="h-full w-full object-cover "
        />
      </div>
      <div className="space-y-1">
        <h2 className="font-bold">{profileName}</h2>
        {date && <h3 className="text-sm font-extralight">{date}</h3>}
        {location && <h3 className="text-sm font-extralight">{location}</h3>}
      </div>
    </div>
  );
};

export default ProfileSection;
