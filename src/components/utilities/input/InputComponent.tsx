import React from 'react';
import { InputProps } from '../../../models/post/post_model';

const InputComponent: React.FC<InputProps> = ({ className, ...rest }) => {
  let classProps;
  if (rest.type === 'text') {
    classProps = `${className} mt-4 h-12 w-2/3 rounded-xl bg-input_bg px-4 text-xl text-slate-700 outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 py-4`;
  } else if (rest.type === 'file') {
    classProps = `${className} text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-main hover:file:bg-sub mt-4`;
  }

  return (
    <input
      className={classProps}
      type={rest.type}
      placeholder={rest.placeholder}
      value={rest.value}
      name={rest.name}
      id={rest.id}
      accept={rest.accept}
    />
  );
};

export default InputComponent;
