import React from 'react';

interface IGradeProps {
  kor: string;
  rounded?: string;
  selected?: boolean;
}

interface IMyGradeProps {
  grade: string;
}

const Grade = ({ kor, rounded, selected }: IGradeProps) => {
  const bgColor = selected ? 'bg-sub' : 'bg-gray-200';
  const additionalCSS = `${rounded} ${bgColor}`;

  return (
    <div
      className={`flex h-12 w-16 items-center justify-center text-center ${additionalCSS}`}
    >
      <p className="font-semibold">{kor}</p>
    </div>
  );
};

const MyGrade = ({ grade }: IMyGradeProps) => {
  const grades = [
    { id: 0, kor: '입문', eng: 'INTRODUCTORY' },
    { id: 1, kor: '초급', eng: 'BEGINNER' },
    { id: 2, kor: '중급', eng: 'INTERMEDIATE' },
    { id: 3, kor: '고급', eng: 'ADVANCED' },
  ];

  const getRounded = (idx: number) => {
    if (idx === 0) return 'rounded-l-full';
    if (idx === 3) return 'rounded-r-full';
    return 'rounded-none';
  };

  return (
    <div>
      <p className="text-lg font-semibold">내 등급</p>
      <div className="ml-10 mt-4 flex">
        {grades.map((item, idx) => (
          <Grade
            key={item.id}
            kor={item.kor}
            rounded={getRounded(idx)}
            selected={item.eng === grade}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGrade;
