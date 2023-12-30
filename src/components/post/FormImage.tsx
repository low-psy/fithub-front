import React, { useState } from 'react';
import { InputProps } from '../../types/common';

const FormImage: React.FC<InputProps> = ({ className, ...rest }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);
  let restCount;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const selectedFilesArray = filesArray.slice(0, 3); // 최대 3개 파일만 선택
      setImageCount(filesArray.length);
      const promises = selectedFilesArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then((images) => setImagePreviews(images))
        .catch((error) => console.error(error));
    }
  };

  if (imageCount > 3) {
    restCount = imageCount - 3;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-600 ">이미지 가져오기</h2>
      <div className="mt-4 flex gap-2 lg:w-2/3">
        {imagePreviews.map((image, index) => (
          <div className="aspect-square w-1/4 rounded-xl bg-sub p-1">
            <img
              className="w-full rounded-xl"
              src={image}
              alt={`Preview ${index + 1}`}
            />
          </div>
        ))}
        <label
          htmlFor="image"
          className={`${className} relative inline-block aspect-square w-1/4 cursor-pointer items-center justify-center rounded-xl bg-sub shadow-sm`}
        >
          <div className="absolute left-1/2 top-1/2 h-4 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          <div
            className="absolute left-1/2 top-1/2 h-4 w-2/3 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-white
          "
          />
        </label>
      </div>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
        multiple={rest.multiple}
        hidden
      />
      <p className="pt-2">{restCount ? `...외 이미지 ${restCount}개` : null}</p>
    </div>
  );
};

export default FormImage;
