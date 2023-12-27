import React from 'react';
import { PostInputProps } from '../../types/post';

const PostInput: React.FC<PostInputProps> = ({
  children,
  spanText,
  titleText,
  htmlFor,
}) => {
  return (
    <label htmlFor={htmlFor}>
      <span className="sr-only">{spanText}</span>
      <h2 className="text-3xl font-bold text-slate-600 ">{titleText}</h2>
      {children}
    </label>
  );
};

export default PostInput;
