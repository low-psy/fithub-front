import React, { FC } from 'react';

interface Props {
  idx: number;
  text: string;
  editable?: boolean;
  isChecked?: boolean;
}

const Interest: FC<Props> = ({ idx, text, editable = false, isChecked }) => {
  // const handleClick = () => {
  //   if (editable) {
  //   }
  // };
  return (
    <div
      style={{ cursor: `${editable && 'pointer'}` }}
      key={idx}
      className="mr-5 flex h-10 w-[100px] items-center justify-center rounded-full bg-sub pl-5 pr-5"
      // onClick={handleClick}
    >
      <p className="font-semibold">{text}</p>
    </div>
  );
};

export default Interest;
