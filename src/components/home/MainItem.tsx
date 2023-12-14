import React from 'react';

const MainItem = () => {
  return (
    <div className=" rounded-md bg-red-200">
      <div className="aspect-square">image</div>
      <div>
        <div className="flex justify-between">
          <h2>트레이닝 제목</h2>
          <h3>모집중</h3>
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
