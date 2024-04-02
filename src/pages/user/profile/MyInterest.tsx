import React, { FC } from 'react';

interface Prop {
  interests: string[];
}

const MyInterest: FC<Prop> = ({ interests }) => {
  return (
    <div>
      <p className="text-lg font-semibold">내 관심사</p>
      <div className="ml-10 mt-4 flex">
        {interests.map((interest, idx) => (
          <div
            key={idx}
            className="mr-5 flex h-10 items-center justify-center rounded-full bg-sub pl-5 pr-5"
          >
            <p className="font-semibold">{interest}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInterest;
