import React from 'react';
import { TextAreaProps } from '../../../models/post/post_model';

const TextareaComponent: React.FC<TextAreaProps> = ({ className, ...rest }) => {
  const classProp = `${className} focus: mt-4 h-12 w-2/3 rounded-xl bg-input_bg px-4 text-xl text-slate-700 outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 py-4`;

  return (
    <textarea
      className={classProp}
      placeholder={rest.placeholder}
      value={rest.value}
      name={rest.name}
      id={rest.id}
    />
  );
};

export default TextareaComponent;
