import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputProps } from '../../types/common';
import { useAppSelector } from '../../hooks/reduxHooks';
import {
  INITIALIZE_IMAGE,
  SET_DELETE_IMAGE,
  SET_UPDATE_IMAGE,
} from '../../redux/slices/updateImageSlice';

const FormImageSelect: React.FC<InputProps> = ({
  children,
  className,
  ...rest
}) => {
  const documentUpdateDto = useAppSelector((state) => state.images);
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState<string>('false');

  useEffect(() => {
    if (rest.value) {
      dispatch(INITIALIZE_IMAGE({ awsS3Url: rest.value as string[] }));
    }
  }, [dispatch, rest.value]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number | undefined,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      dispatch(SET_UPDATE_IMAGE({ image: file, index }));
    }
  };

  const imageDeleteHandler = (index: number) => {
    setIsDeleted('true');
    dispatch(SET_DELETE_IMAGE({ index }));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-600">{children}</h2>
      <ul className="mt-4 flex gap-4 overflow-x-auto p-4">
        {documentUpdateDto.map((image, index) => {
          // 수정한 이미지가 있다면, FileReader를 사용하여 미리보기 URL 생성
          const imageUrl = image.image
            ? URL.createObjectURL(image.image)
            : image.awsS3Url;

          return (
            <li
              className="flex aspect-square w-1/4 shrink-0 items-center justify-center rounded-xl bg-white shadow-lg drop-shadow-sm"
              key={index}
            >
              <input className="hidden" name="imgDeleted" value={isDeleted} />
              <label
                htmlFor={`image-${index}`}
                className="relative flex h-full w-full cursor-pointer items-center justify-center"
              >
                <img
                  className="max-h-full max-w-full object-cover"
                  src={imageUrl}
                  alt={`Preview ${index + 1}`}
                />
                <button
                  className="absolute right-2 top-2"
                  type="button"
                  onClick={() => imageDeleteHandler(index)}
                >
                  <span className="material-symbols-rounded rounded-full bg-white ">
                    close
                  </span>
                </button>
              </label>
              <input
                type="file"
                id={`image-${index}`}
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                hidden
              />
            </li>
          );
        })}
        <label
          htmlFor="image-new"
          className={`${className} relative inline-block aspect-square w-1/4 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-sub shadow-sm `}
        >
          <div className="absolute left-1/2 top-1/2 h-4 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          <div
            className="absolute left-1/2 top-1/2 h-4 w-2/3 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-white
          "
          />
        </label>
        <input
          type="file"
          id="image-new"
          accept="image/*"
          onChange={(e) => handleImageChange(e, undefined)}
          hidden
        />
      </ul>
    </div>
  );
};

export default FormImageSelect;
