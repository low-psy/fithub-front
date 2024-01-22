import React, { useState } from 'react';
import { InputProps } from '../../types/common';

const FormSingleImage: React.FC<InputProps> = ({ children }) => {
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-slate-600 ">{children}</h2>
      <label
        htmlFor="image"
        className="relative inline-block aspect-square w-[200px] cursor-pointer items-center justify-center rounded-full bg-sub shadow-sm"
      >
        <div className="absolute left-1/2 top-1/2 h-1 w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        <div
          className="absolute left-1/2 top-1/2 h-1 w-[100px] -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-white
          "
        />
        {imagePreview && (
          <div className="flex aspect-square w-[200px]">
            <img
              className="w-full rounded-full object-cover shadow-lg drop-shadow-sm"
              src={imagePreview}
              alt="Preview"
            />
          </div>
        )}
      </label>
      <input
        type="file"
        id="image"
        accept="image/*"
        name="image"
        onChange={handleImageChange}
        hidden
      />
    </div>
  );
};

export default FormSingleImage;
