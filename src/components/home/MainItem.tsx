import React from 'react';

const MainItem = () => {
  return (
    <div className="rounded-xl bg-white ">
      <div className="aspect-square">image</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="grow-0 basis-36 truncate  text-lg font-bold xl:basis-48">
            트레이닝 제목
          </h2>
          <h3 className="rounded-full bg-sub px-2 py-1 font-bold xl:px-4 xl:py-2 ">
            모집중
          </h3>
        </div>
        <div>
          <h3>서울 마포구 2.3km 거리</h3>
          <h3>11월 27일~11월 31일</h3>
        </div>
        <div>price</div>
      </div>
    </div>
  );
};

export default MainItem;
