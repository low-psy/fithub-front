import React from 'react';

interface IMyBioProps {
  bio: string;
}

const MyBio = ({ bio }: IMyBioProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold">내 소개</p>
      <p className="ml-10 mt-4">{bio}</p>
    </div>
  );
};

export default MyBio;
