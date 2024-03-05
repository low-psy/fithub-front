import React, { useState } from 'react';

interface ImageSliderProps {
  postImages: (string | undefined)[];
  imageSize?: string;
}

const ImageBtnSlider: React.FC<ImageSliderProps> = ({
  postImages,
  imageSize = '468',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  if (!postImages) {
    return <div>no-images</div>;
  }

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < postImages.length - 1 ? prevIndex + 1 : prevIndex,
    );
  };

  const isShowBBtn = postImages.length > 1 && currentIndex > 0;

  const isShowNBtn =
    postImages.length > 1 && currentIndex < postImages.length - 1;

  let bBtnOpacity = 'opacity-80';

  let nBtnOpacity = 'opacity-80';

  if (!isShowBBtn) {
    bBtnOpacity = 'opacity-0 cursor-auto';
  }
  if (!isShowNBtn) {
    nBtnOpacity = 'opacity-0 cursor-auto';
  }

  return (
    <div className="relative flex items-center overflow-hidden bg-gray-50">
      <button
        type="button"
        onClick={handlePrevClick}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2"
      >
        <span
          className={`material-symbols-outlined relative  rounded-full bg-white  ${bBtnOpacity}`}
        >
          navigate_before
        </span>
      </button>
      {postImages.map((imageUrl, index) => (
        <div
          className="flex w-full shrink-0 items-center justify-center transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          <img
            key={imageUrl as string}
            src={imageUrl as string}
            alt={`게시물 이미지 ${index + 1}`}
            className="max-h-full max-w-full object-cover"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2"
      >
        <span
          className={`material-symbols-outlined relative rounded-full bg-white p-0.5 ${nBtnOpacity}`}
        >
          navigate_next
        </span>
      </button>
    </div>
  );
};

export default ImageBtnSlider;
