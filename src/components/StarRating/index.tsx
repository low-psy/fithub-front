import React, { FC } from 'react';
import Star from './Star';

interface Props {
  maxRate?: number;
  currRate: number;
  onChange?: (n: number) => void | undefined;
}

const StarRating: FC<Props> = ({ maxRate = 5, currRate, onChange }) => {
  const handleChange = (i: number) => {
    if (onChange) {
      onChange(i);
    }
  };
  return (
    <div className="flex h-[100%]">
      {Array.from({ length: maxRate }, (_, i) => (
        <Star isFull={i < currRate} handleClick={() => handleChange(i + 1)} />
      ))}
    </div>
  );
};

export default StarRating;
