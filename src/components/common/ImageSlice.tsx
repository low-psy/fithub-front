import React, { useState } from 'react';

interface ImageSliderProps {
  postImages: string[];
  imageSize: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  postImages,
  imageSize = '468',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  let bBtnOpacity = 'opacity-70';

  let nBtnOpacity = 'opacity-70';

  if (!isShowBBtn) {
    bBtnOpacity = 'opacity-0 cursor-auto';
  }
  if (!isShowNBtn) {
    nBtnOpacity = 'opacity-0 cursor-auto';
  }

  return (
    <div className=" flex items-center justify-center">
      <button type="button" onClick={handlePrevClick}>
        <span
          className={`material-symbols-outlined relative  z-10 -mr-14 rounded-full bg-white p-0.5 ${bBtnOpacity}`}
        >
          navigate_before
        </span>
      </button>
      <div className="flex aspect-square overflow-hidden">
        <div
          className="flex items-center  bg-black transition-transform duration-1000 ease-in-out"
          style={{
            width: `${imageSize}px`,
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {postImages.map((imageUrl, index) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={`게시물 이미지 ${index + 1}`}
              className="max-w-full "
            />
          ))}
        </div>
      </div>
      <button type="button" onClick={handleNextClick}>
        <span
          className={`material-symbols-outlined relative z-10 -ml-14 rounded-full bg-white p-0.5 ${nBtnOpacity}`}
        >
          navigate_next
        </span>
      </button>
    </div>
  );
};

export default ImageSlider;
