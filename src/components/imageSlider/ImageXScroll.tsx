import React from 'react';

interface ImageScrollSliderProps {
  imageUrls: string[];
}

const ImageXScroll: React.FC<ImageScrollSliderProps> = ({ imageUrls }) => {
  if (imageUrls.length < 1) {
    return (
      <div className="flex h-[300px] items-center justify-center bg-gray-50">
        <span className="material-symbols-rounded mr-2">image</span>
        이미지가 없습니다
      </div>
    );
  }

  return (
    <div className="relative min-h-[300px] bg-gray-50">
      <div className="flex snap-x gap-x-4 overflow-auto p-4">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="flex h-[300px] w-[500px] shrink-0 snap-center items-center justify-center"
          >
            <img
              src={url}
              alt={`세부 조회 이미지 ${index + 1}`}
              className="max-h-full max-w-full shadow-lg drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageXScroll;
