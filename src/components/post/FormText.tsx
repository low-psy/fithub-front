import React from 'react';
import { PostInputProps } from '../../types/post';
import ErrorMessage from './FormError';

const PostInput: React.FC<PostInputProps> = ({
  children,
  spanText,
  titleText,
  htmlFor,
  error,
}) => {
  return (
    <label htmlFor={htmlFor}>
      <span className="sr-only">{spanText}</span>
      <h2 className="text-3xl font-bold text-slate-600 ">{titleText}</h2>
      <div className="mt-2">
        {error && (
          <ErrorMessage className="w-full md:w-2/3">{error}</ErrorMessage>
        )}
      </div>
      {children}
    </label>
  );
};

export default PostInput;
